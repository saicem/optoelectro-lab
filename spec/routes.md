# 路由定义

路由路径统一由 `src/constants/routes.ts` 中的 `ROUTES` 常量管理。所有页面组件均通过常量引用路径，不得硬编码。

## 学习页面

| 路由 key | 路径 | 页面组件 | 篇章 |
|----------|------|----------|------|
| `ROUTES.LEARN.WAVE_BASICS` | `/learn/wave-basics` | LearnWaveBasics | Part 1 · 基础篇 |
| `ROUTES.LEARN.LASER` | `/learn/laser` | LearnLaser | Part 2 · 光源与传输篇 |
| `ROUTES.LEARN.FIBER_OPTICS` | `/learn/fiber-optics` | LearnFiberOptics | Part 2 · 光源与传输篇 |
| `ROUTES.LEARN.OPTOELECTRONIC_MATERIALS` | `/learn/optoelectronic-materials` | LearnOptoelectronicMaterials | Part 2 · 光源与传输篇 |
| `ROUTES.LEARN.MODULATION_BASICS` | `/learn/modulation-basics` | LearnModulationBasics | Part 3 · 调制器篇 |
| `ROUTES.LEARN.INTERFERENCE` | `/learn/interference` | LearnInterference | Part 3 · 调制器篇 |
| `ROUTES.LEARN.MZ_MODULATOR` | `/learn/mz-modulator` | LearnMZModulator | Part 3 · 调制器篇 |
| `ROUTES.LEARN.IQ_MODULATOR` | `/learn/iq-modulator` | LearnIQModulator | Part 3 · 调制器篇 |
| `ROUTES.LEARN.POLARIZATION` | `/learn/polarization` | LearnPolarization | Part 3 · 调制器篇 |
| `ROUTES.LEARN.NYQUIST_OFDM` | `/learn/nyquist-ofdm` | LearnNyquistOFDM | Part 3 · 调制器篇 |
| `ROUTES.LEARN.PCS_CODING` | `/learn/pcs-coding` | LearnPCSCoding | Part 3 · 调制器篇 |
| `ROUTES.LEARN.RECEIVER` | `/learn/receiver` | LearnReceiver | Part 4 · 系统篇 |
| `ROUTES.LEARN.WDM_AMPLIFIER` | `/learn/wdm-amplifier` | LearnWDMAmplifier | Part 4 · 系统篇 |
| `ROUTES.LEARN.SYSTEM_OVERVIEW` | `/learn/system-overview` | LearnSystemOverview | Part 4 · 系统篇 |
| `ROUTES.LEARN.GLOSSARY` | `/learn/glossary` | LearnGlossary | 附录 |

## 实验页面

| 路由 key | 路径 | 页面组件 | 关联学习章节 |
|----------|------|----------|-------------|
| `ROUTES.PLAYGROUND.INTERFERENCE` | `/playground/interference` | InterferencePage | 干涉原理 |
| `ROUTES.PLAYGROUND.MZ_MODULATOR` | `/playground/mz-modulator` | MZModulatorPage | MZ 调制器 |
| `ROUTES.PLAYGROUND.IQ_MODULATOR` | `/playground/iq-modulator` | IQModulatorPage | IQ 调制器 |
| `ROUTES.PLAYGROUND.POLARIZATION` | `/playground/polarization` | PolarizationPage | 偏振复用 |
| `ROUTES.PLAYGROUND.RECEIVER` | `/playground/receiver` | ReceiverPage | 光接收器 |

## 章节索引

章节顺序与索引由 `src/constants/chapters.ts` 中的 `CHAPTERS` 数组统一管理。各 Learn 页面通过 `useChapterNavigation` hook 自动计算 `currentIndex`，无需手动维护。
