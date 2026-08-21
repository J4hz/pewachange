/**
 * Ombaka 2027 — lead & message collector (Google Apps Script Web App).
 *
 * Receives JSON submissions from the campaign site and appends them to the
 * bound Google Sheet: lead-capture signups to a "Leads" tab, Get Involved
 * messages to a "Messages" tab. This is what VITE_LEADS_ENDPOINT and
 * VITE_CONTACT_ENDPOINT point at (both at the same Web App URL — the
 * payload's `form` field decides where a row lands).
 *
 * This file is NOT bundled with the site. It is a copy of what should be
 * pasted into the Apps Script editor, kept in the repo so the deployed
 * script is reviewable and recoverable. See README, "Wiring up lead capture
 * and campaign updates", for the full deploy steps.
 *
 * Re-sends are expected: the site queues undeliverable submissions and
 * retries them on a later visit, so the same payload can arrive twice. Rows
 * are de-duplicated on the payload's `id`.
 */

var LEAD_SHEET = "Leads";
var MESSAGE_SHEET = "Messages";

var LEAD_HEADERS = [
  "Received",
  "Submitted",
  "Name",
  "Phone",
  "Ward",
  "Email",
  "Help type",
  "Page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "Unsubscribed",
  "ID",
];

var MESSAGE_HEADERS = [
  "Received",
  "Submitted",
  "Name",
  "Phone",
  "Ward",
  "Email",
  "Message",
  "ID",
];

/**
 * Notification target for new Get Involved messages. Leave as "" to switch
 * email alerts off and just collect rows in the sheet.
 */
var NOTIFY_EMAIL = "info@pewachange.ke";

function doPost(e) {
  // One writer at a time: two submissions landing together would otherwise
  // race on "what is the next empty row" and overwrite each other.
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return jsonResponse({ ok: false, error: "busy" });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "empty request" });
    }

    var payload = JSON.parse(e.postData.contents);

    // Submissions queued before the `form` field existed have no marker, so
    // fall back to shape: only the contact form carries a message body.
    var isMessage =
      payload.form === "contact" || (!payload.form && payload.message);

    if (isMessage) {
      appendMessage(payload);
    } else {
      appendLead(payload);
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Browsers may probe the URL with a GET before/instead of posting, and it is
 * useful to be able to open the deployment in a tab to confirm it is live.
 * Deliberately returns nothing about the collected data.
 */
function doGet() {
  return jsonResponse({ ok: true, service: "ombaka-2027-collector" });
}

function appendLead(payload) {
  var sheet = getSheet(LEAD_SHEET, LEAD_HEADERS);
  if (alreadyRecorded(sheet, LEAD_HEADERS, payload.id)) return;

  var utm = payload.utm || {};
  sheet.appendRow([
    new Date(),
    payload.submittedAt || "",
    payload.name || "",
    normalisePhone(payload.phone),
    payload.ward || "",
    payload.email || "",
    payload.helpType || "",
    payload.page || "",
    utm.utm_source || "",
    utm.utm_medium || "",
    utm.utm_campaign || "",
    utm.utm_content || "",
    utm.utm_term || "",
    "", // Unsubscribed — set to "yes" by hand or by the STOP handler.
    payload.id || "",
  ]);
}

function appendMessage(payload) {
  var sheet = getSheet(MESSAGE_SHEET, MESSAGE_HEADERS);
  if (alreadyRecorded(sheet, MESSAGE_HEADERS, payload.id)) return;

  sheet.appendRow([
    new Date(),
    payload.submittedAt || "",
    payload.name || "",
    normalisePhone(payload.phone),
    payload.ward || "",
    payload.email || "",
    payload.message || "",
    payload.id || "",
  ]);

  notify(payload);
}

function notify(payload) {
  if (!NOTIFY_EMAIL) return;
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New message from pewachange.ke — " + (payload.name || "unknown"),
      body:
        "Name: " + (payload.name || "") + "\n" +
        "Phone: " + normalisePhone(payload.phone) + "\n" +
        "Email: " + (payload.email || "") + "\n" +
        "Ward: " + (payload.ward || "") + "\n\n" +
        (payload.message || ""),
    });
  } catch (err) {
    // Quota exhausted or mail disabled — the row is already saved, which is
    // the part that must not fail. Swallow so the visitor still sees success.
  }
}

/**
 * Stores phone numbers in one canonical +2547XXXXXXXX / +2541XXXXXXXX form,
 * so the same person entering "0712..." on one visit and "+254712..." on
 * another is visibly the same row, and so the list can be handed to a bulk
 * SMS provider without further cleaning. The leading apostrophe keeps Sheets
 * from mangling it into a number and dropping the +.
 */
function normalisePhone(phone) {
  if (!phone) return "";
  var digits = String(phone).replace(/[^0-9]/g, "");
  if (digits.indexOf("254") === 0) digits = digits.slice(3);
  else if (digits.indexOf("0") === 0) digits = digits.slice(1);
  return "'+254" + digits;
}

function getSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

/** True if this submission id is already in the sheet (a retried send). */
function alreadyRecorded(sheet, headers, id) {
  if (!id) return false; // Pre-id submission — can't dedupe, better to keep.
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  var idColumn = headers.indexOf("ID") + 1;
  var values = sheet.getRange(2, idColumn, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (values[i][0] === id) return true;
  }
  return false;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
