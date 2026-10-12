import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ScrollToHash } from "@/components/ScrollToHash";
import { features } from "@/config/features";
import { flushQueuedSubmissions } from "@/lib/queue";
import Home from "@/pages/Home";
import Plan from "@/pages/Plan";
import Stats from "@/pages/Stats";
import About from "@/pages/About";
import GetInvolved from "@/pages/GetInvolved";
import Appearances from "@/pages/Appearances";
import News from "@/pages/News";
import Unsubscribe from "@/pages/Unsubscribe";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";
import Donate from "@/pages/Donate";

export default function App() {
  // Re-send any form submission parked by an earlier visit (endpoint not yet
  // configured, visitor offline, request failed). Fire-and-forget: anything
  // that still fails stays queued for next time and never reaches the UI.
  useEffect(() => {
    void flushQueuedSubmissions();
  }, []);

  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {features.plan && <Route path="/plan" element={<Plan />} />}
          {features.stats && <Route path="/stats" element={<Stats />} />}
          {features.about && <Route path="/about" element={<About />} />}
          {features.appearances && (
            <Route path="/appearances" element={<Appearances />} />
          )}
          {features.getInvolved && (
            <Route path="/get-involved" element={<GetInvolved />} />
          )}
          {features.news && <Route path="/news" element={<News />} />}
          {features.donate && <Route path="/donate" element={<Donate />} />}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
