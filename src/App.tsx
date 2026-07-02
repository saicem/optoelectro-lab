import { lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { ROUTES } from '@/constants/routes';

const HomePage = lazy(() => import('@/pages/HomePage'));

const LearnWaveBasics = lazy(() => import('@/pages/learn/LearnWaveBasics'));
const LearnLaser = lazy(() => import('@/pages/learn/LearnLaser'));
const LearnFiberOptics = lazy(() => import('@/pages/learn/LearnFiberOptics'));
const LearnOptoelectronicMaterials = lazy(() => import('@/pages/learn/LearnOptoelectronicMaterials'));
const LearnModulationBasics = lazy(() => import('@/pages/learn/LearnModulationBasics'));
const LearnInterference = lazy(() => import('@/pages/learn/LearnInterference'));
const LearnMZModulator = lazy(() => import('@/pages/learn/LearnMZModulator'));
const LearnIQModulator = lazy(() => import('@/pages/learn/LearnIQModulator'));
const LearnPolarization = lazy(() => import('@/pages/learn/LearnPolarization'));
const LearnNyquistOFDM = lazy(() => import('@/pages/learn/LearnNyquistOFDM'));
const LearnPCSCoding = lazy(() => import('@/pages/learn/LearnPCSCoding'));
const LearnReceiver = lazy(() => import('@/pages/learn/LearnReceiver'));
const LearnWDMAmplifier = lazy(() => import('@/pages/learn/LearnWDMAmplifier'));
const LearnSystemOverview = lazy(() => import('@/pages/learn/LearnSystemOverview'));
const LearnGlossary = lazy(() => import('@/pages/learn/LearnGlossary'));

const InterferencePage = lazy(() => import('@/pages/playground/InterferencePage'));
const MZModulatorPage = lazy(() => import('@/pages/playground/MZModulatorPage'));
const IQModulatorPage = lazy(() => import('@/pages/playground/IQModulatorPage'));
const PolarizationPage = lazy(() => import('@/pages/playground/PolarizationPage'));
const ReceiverPage = lazy(() => import('@/pages/playground/ReceiverPage'));

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
