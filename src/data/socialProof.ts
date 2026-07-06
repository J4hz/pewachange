/**
 * Social proof / momentum data, used by <SocialProof> (currently not
 * rendered on the homepage — see README "Social proof"). `supporterCount`
 * stays null until real signups exist; endorsements and ward captains stay
 * empty until real ones are confirmed. Never fabricate a count, quote, or
 * name — add real entries here and render <SocialProof/> again on Home.
 */

export interface Endorsement {
  quote: string;
  name: string;
  role: string;
  photo?: string;
}

export interface WardCaptain {
  name: string;
  ward: string;
  photo?: string;
}

export const supporterCount: number | null = null;

export const endorsements: Endorsement[] = [];

export const wardCaptains: WardCaptain[] = [];
