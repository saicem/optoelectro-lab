import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/common/Layout";
import HomePage from "@/pages/HomePage";
import InterferencePage from "@/pages/InterferencePage";
import MZModulatorPage from "@/pages/MZModulatorPage";
import IQModulatorPage from "@/pages/IQModulatorPage";
import PolarizationPage from "@/pages/PolarizationPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
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
