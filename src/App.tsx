import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/common/Layout";
import HomePage from "@/pages/HomePage";

import LearnLightBasics from "@/pages/learn/LearnLightBasics";
import LearnLaser from "@/pages/learn/LearnLaser";
import LearnInterference from "@/pages/learn/LearnInterference";
import LearnMZModulator from "@/pages/learn/LearnMZModulator";
import LearnIQModulator from "@/pages/learn/LearnIQModulator";
import LearnPolarization from "@/pages/learn/LearnPolarization";
import LearnDualPolarization from "@/pages/learn/LearnDualPolarization";
import LearnReceiver from "@/pages/learn/LearnReceiver";
import LearnGlossary from "@/pages/learn/LearnGlossary";

import InterferencePage from "@/pages/playground/InterferencePage";
import MZModulatorPage from "@/pages/playground/MZModulatorPage";
import IQModulatorPage from "@/pages/playground/IQModulatorPage";
import PolarizationPage from "@/pages/playground/PolarizationPage";
import ReceiverPage from "@/pages/playground/ReceiverPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/learn/light-basics" element={<LearnLightBasics />} />
          <Route path="/learn/laser" element={<LearnLaser />} />
          <Route path="/learn/interference" element={<LearnInterference />} />
          <Route path="/learn/mz-modulator" element={<LearnMZModulator />} />
          <Route path="/learn/iq-modulator" element={<LearnIQModulator />} />
          <Route path="/learn/polarization" element={<LearnPolarization />} />
          <Route path="/learn/dual-polarization" element={<LearnDualPolarization />} />
          <Route path="/learn/receiver" element={<LearnReceiver />} />
          <Route path="/learn/glossary" element={<LearnGlossary />} />

          <Route path="/playground/interference" element={<InterferencePage />} />
          <Route path="/playground/mz-modulator" element={<MZModulatorPage />} />
          <Route path="/playground/iq-modulator" element={<IQModulatorPage />} />
          <Route path="/playground/polarization" element={<PolarizationPage />} />
          <Route path="/playground/receiver" element={<ReceiverPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
