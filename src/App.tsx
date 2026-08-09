import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import HomePage from '@/pages/HomePage';
import { ROUTES } from '@/constants/routes';

import LearnWaveBasics from '@/pages/learn/LearnWaveBasics';
import LearnCrystalStructure from '@/pages/learn/LearnCrystalStructure';
import LearnSemiconductorBasics from '@/pages/learn/LearnSemiconductorBasics';
import LearnPNJunctionBasics from '@/pages/learn/LearnPNJunctionBasics';
import LearnRecombination from '@/pages/learn/LearnRecombination';
import LearnLightMatterInteraction from '@/pages/learn/LearnLightMatterInteraction';
import LearnHeterojunction from '@/pages/learn/LearnHeterojunction';
import LearnSemiconductorEquations from '@/pages/learn/LearnSemiconductorEquations';
import LearnPNJunctionAdvanced from '@/pages/learn/LearnPNJunctionAdvanced';
import LearnOptoelectronicMaterials from '@/pages/learn/LearnOptoelectronicMaterials';
import LearnLaser from '@/pages/learn/LearnLaser';
import LearnFiberOptics from '@/pages/learn/LearnFiberOptics';
import LearnModulationBasics from '@/pages/learn/LearnModulationBasics';
import LearnInterference from '@/pages/learn/LearnInterference';
import LearnMZModulator from '@/pages/learn/LearnMZModulator';
import LearnIQModulator from '@/pages/learn/LearnIQModulator';
import LearnPolarization from '@/pages/learn/LearnPolarization';
import LearnNyquistOFDM from '@/pages/learn/LearnNyquistOFDM';
import LearnPCSCoding from '@/pages/learn/LearnPCSCoding';
import LearnReceiver from '@/pages/learn/LearnReceiver';
import LearnWDMAmplifier from '@/pages/learn/LearnWDMAmplifier';
import LearnSystemOverview from '@/pages/learn/LearnSystemOverview';
import LearnGlossary from '@/pages/learn/LearnGlossary';

import InterferencePage from '@/pages/playground/InterferencePage';
import MZModulatorPage from '@/pages/playground/MZModulatorPage';
import IQModulatorPage from '@/pages/playground/IQModulatorPage';
import PolarizationPage from '@/pages/playground/PolarizationPage';
import ReceiverPage from '@/pages/playground/ReceiverPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.LEARN.WAVE_BASICS} element={<LearnWaveBasics />} />
          <Route path={ROUTES.LEARN.CRYSTAL_STRUCTURE} element={<LearnCrystalStructure />} />
          <Route path={ROUTES.LEARN.SEMICONDUCTOR_BASICS} element={<LearnSemiconductorBasics />} />
          <Route path={ROUTES.LEARN.PN_JUNCTION_BASICS} element={<LearnPNJunctionBasics />} />
          <Route path={ROUTES.LEARN.RECOMBINATION} element={<LearnRecombination />} />
          <Route path={ROUTES.LEARN.LIGHT_MATTER_INTERACTION} element={<LearnLightMatterInteraction />} />
          <Route path={ROUTES.LEARN.HETEROJUNCTION} element={<LearnHeterojunction />} />
          <Route path={ROUTES.LEARN.SEMICONDUCTOR_EQUATIONS} element={<LearnSemiconductorEquations />} />
          <Route path={ROUTES.LEARN.PN_JUNCTION_ADVANCED} element={<LearnPNJunctionAdvanced />} />
          <Route path={ROUTES.LEARN.OPTOELECTRONIC_MATERIALS} element={<LearnOptoelectronicMaterials />} />
          <Route path={ROUTES.LEARN.LASER} element={<LearnLaser />} />
          <Route path={ROUTES.LEARN.FIBER_OPTICS} element={<LearnFiberOptics />} />
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
