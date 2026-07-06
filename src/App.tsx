import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ScrollToHash } from "@/components/ScrollToHash";
import { features } from "@/config/features";
import Home from "@/pages/Home";
import Plan from "@/pages/Plan";
import Stats from "@/pages/Stats";
import About from "@/pages/About";
import GetInvolved from "@/pages/GetInvolved";
import News from "@/pages/News";

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {features.plan && <Route path="/plan" element={<Plan />} />}
          {features.stats && <Route path="/stats" element={<Stats />} />}
          {features.about && <Route path="/about" element={<About />} />}
          {features.getInvolved && (
            <Route path="/get-involved" element={<GetInvolved />} />
          )}
          {features.news && <Route path="/news" element={<News />} />}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
