import { lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { ROUTES } from '@/constants/routes';
import { registerLoader } from '@/lib/routeLoaders';

function lazyWithPreload(path: string, imp: () => Promise<{ default: React.ComponentType }>) {
  registerLoader(path, imp);
  return lazy(imp);
}

const HomePage = lazy(() => import('@/pages/HomePage'));

const LearnWaveBasics = lazyWithPreload(ROUTES.LEARN.WAVE_BASICS, () => import('@/pages/learn/LearnWaveBasics'));
const LearnLaser = lazyWithPreload(ROUTES.LEARN.LASER, () => import('@/pages/learn/LearnLaser'));
const LearnFiberOptics = lazyWithPreload(ROUTES.LEARN.FIBER_OPTICS, () => import('@/pages/learn/LearnFiberOptics'));
const LearnOptoelectronicMaterials = lazyWithPreload(ROUTES.LEARN.OPTOELECTRONIC_MATERIALS, () => import('@/pages/learn/LearnOptoelectronicMaterials'));
const LearnModulationBasics = lazyWithPreload(ROUTES.LEARN.MODULATION_BASICS, () => import('@/pages/learn/LearnModulationBasics'));
const LearnInterference = lazyWithPreload(ROUTES.LEARN.INTERFERENCE, () => import('@/pages/learn/LearnInterference'));
const LearnMZModulator = lazyWithPreload(ROUTES.LEARN.MZ_MODULATOR, () => import('@/pages/learn/LearnMZModulator'));
const LearnIQModulator = lazyWithPreload(ROUTES.LEARN.IQ_MODULATOR, () => import('@/pages/learn/LearnIQModulator'));
const LearnPolarization = lazyWithPreload(ROUTES.LEARN.POLARIZATION, () => import('@/pages/learn/LearnPolarization'));
const LearnNyquistOFDM = lazyWithPreload(ROUTES.LEARN.NYQUIST_OFDM, () => import('@/pages/learn/LearnNyquistOFDM'));
const LearnPCSCoding = lazyWithPreload(ROUTES.LEARN.PCS_CODING, () => import('@/pages/learn/LearnPCSCoding'));
const LearnReceiver = lazyWithPreload(ROUTES.LEARN.RECEIVER, () => import('@/pages/learn/LearnReceiver'));
const LearnWDMAmplifier = lazyWithPreload(ROUTES.LEARN.WDM_AMPLIFIER, () => import('@/pages/learn/LearnWDMAmplifier'));
const LearnSystemOverview = lazyWithPreload(ROUTES.LEARN.SYSTEM_OVERVIEW, () => import('@/pages/learn/LearnSystemOverview'));
const LearnGlossary = lazyWithPreload(ROUTES.LEARN.GLOSSARY, () => import('@/pages/learn/LearnGlossary'));

const InterferencePage = lazyWithPreload(ROUTES.PLAYGROUND.INTERFERENCE, () => import('@/pages/playground/InterferencePage'));
const MZModulatorPage = lazyWithPreload(ROUTES.PLAYGROUND.MZ_MODULATOR, () => import('@/pages/playground/MZModulatorPage'));
const IQModulatorPage = lazyWithPreload(ROUTES.PLAYGROUND.IQ_MODULATOR, () => import('@/pages/playground/IQModulatorPage'));
const PolarizationPage = lazyWithPreload(ROUTES.PLAYGROUND.POLARIZATION, () => import('@/pages/playground/PolarizationPage'));
const ReceiverPage = lazyWithPreload(ROUTES.PLAYGROUND.RECEIVER, () => import('@/pages/playground/ReceiverPage'));

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.LEARN.WAVE_BASICS} element={<LearnWaveBasics />} />
          <Route path={ROUTES.LEARN.LASER} element={<LearnLaser />} />
          <Route path={ROUTES.LEARN.FIBER_OPTICS} element={<LearnFiberOptics />} />
          <Route path={ROUTES.LEARN.OPTOELECTRONIC_MATERIALS} element={<LearnOptoelectronicMaterials />} />
          <Route path={ROUTES.LEARN.MODULATION_BASICS} element={<LearnModulationBasics />} />
          <Route path={ROUTES.LEARN.INTERFERENCE} element={<LearnInterference />} />
          <Route path={ROUTES.LEARN.MZ_MODULATOR} element={<LearnMZModulator />} />
          <Route path={ROUTES.LEARN.IQ_MODULATOR} element={<LearnIQModulator />} />
          <Route path={ROUTES.LEARN.POLARIZATION} element={<LearnPolarization />} />
          <Route path={ROUTES.LEARN.NYQUIST_OFDM} element={<LearnNyquistOFDM />} />
          <Route path={ROUTES.LEARN.PCS_CODING} element={<LearnPCSCoding />} />
          <Route path={ROUTES.LEARN.RECEIVER} element={<LearnReceiver />} />
          <Route path={ROUTES.LEARN.WDM_AMPLIFIER} element={<LearnWDMAmplifier />} />
          <Route path={ROUTES.LEARN.SYSTEM_OVERVIEW} element={<LearnSystemOverview />} />
          <Route path={ROUTES.LEARN.GLOSSARY} element={<LearnGlossary />} />
          <Route path={ROUTES.PLAYGROUND.INTERFERENCE} element={<InterferencePage />} />
          <Route path={ROUTES.PLAYGROUND.MZ_MODULATOR} element={<MZModulatorPage />} />
          <Route path={ROUTES.PLAYGROUND.IQ_MODULATOR} element={<IQModulatorPage />} />
          <Route path={ROUTES.PLAYGROUND.POLARIZATION} element={<PolarizationPage />} />
          <Route path={ROUTES.PLAYGROUND.RECEIVER} element={<ReceiverPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
