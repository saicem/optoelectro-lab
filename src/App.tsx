import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/common/Layout";
import HomePage from "@/pages/HomePage";
import InterferencePage from "@/pages/InterferencePage";
import MZModulatorPage from "@/pages/MZModulatorPage";
import IQModulatorPage from "@/pages/IQModulatorPage";
import PolarizationPage from "@/pages/PolarizationPage";

import LearnLightBasics from "@/pages/learn/LearnLightBasics";
import LearnInterference from "@/pages/learn/LearnInterference";
import LearnMZModulator from "@/pages/learn/LearnMZModulator";
import LearnIQModulator from "@/pages/learn/LearnIQModulator";
import LearnPolarization from "@/pages/learn/LearnPolarization";
import LearnDualPolarization from "@/pages/learn/LearnDualPolarization";

import DualPolarizationPage from "@/pages/playground/DualPolarizationPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/learn/light-basics" element={<LearnLightBasics />} />
          <Route path="/learn/interference" element={<LearnInterference />} />
          <Route path="/learn/mz-modulator" element={<LearnMZModulator />} />
          <Route path="/learn/iq-modulator" element={<LearnIQModulator />} />
          <Route path="/learn/polarization" element={<LearnPolarization />} />
          <Route path="/learn/dual-polarization" element={<LearnDualPolarization />} />

          <Route path="/playground/interference" element={<InterferencePage />} />
          <Route path="/playground/mz-modulator" element={<MZModulatorPage />} />
          <Route path="/playground/iq-modulator" element={<IQModulatorPage />} />
          <Route path="/playground/polarization" element={<PolarizationPage />} />
          <Route path="/playground/dual-polarization" element={<DualPolarizationPage />} />

          <Route path="/interference" element={<InterferencePage />} />
          <Route path="/mz-modulator" element={<MZModulatorPage />} />
          <Route path="/iq-modulator" element={<IQModulatorPage />} />
          <Route path="/polarization" element={<PolarizationPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const base = import.meta.env.BASE_URL || '/';
  return (
    <Router basename={base}>
      <AnimatedRoutes />
    </Router>
  );
}
