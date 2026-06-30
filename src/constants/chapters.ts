export const CHAPTERS = [
  { key: 'WAVE_BASICS',      path: '/learn/wave-basics',       title: '光波基础与物理量',   part: 'Part 1 · 基础篇' },
  { key: 'LASER',            path: '/learn/laser',              title: '激光器',             part: 'Part 2 · 光源与传输篇' },
  { key: 'FIBER_OPTICS',     path: '/learn/fiber-optics',        title: '光纤与光波导',        part: 'Part 2 · 光源与传输篇' },
  { key: 'OPTOELECTRONIC_MATERIALS', path: '/learn/optoelectronic-materials', title: '光电材料',            part: 'Part 2 · 光源与传输篇' },
  { key: 'MODULATION_BASICS',path: '/learn/modulation-basics',  title: '光调制基础',         part: 'Part 3 · 调制器篇' },
  { key: 'INTERFERENCE',     path: '/learn/interference',       title: '干涉原理',           part: 'Part 3 · 调制器篇' },
  { key: 'MZ_MODULATOR',     path: '/learn/mz-modulator',       title: 'MZ 调制器',          part: 'Part 3 · 调制器篇' },
  { key: 'IQ_MODULATOR',     path: '/learn/iq-modulator',       title: 'IQ 调制器',          part: 'Part 3 · 调制器篇' },
  { key: 'POLARIZATION',     path: '/learn/polarization',       title: '偏振复用',           part: 'Part 3 · 调制器篇' },
  { key: 'NYQUIST_OFDM',     path: '/learn/nyquist-ofdm',       title: 'Nyquist 与 OFDM',    part: 'Part 3 · 调制器篇' },
  { key: 'PCS_CODING',       path: '/learn/pcs-coding',         title: '概率星座整形与编码', part: 'Part 3 · 调制器篇' },
  { key: 'RECEIVER',         path: '/learn/receiver',           title: '光接收器',           part: 'Part 4 · 系统篇' },
  { key: 'WDM_AMPLIFIER',    path: '/learn/wdm-amplifier',      title: 'WDM 与光放大器',    part: 'Part 4 · 系统篇' },
  { key: 'SYSTEM_OVERVIEW',  path: '/learn/system-overview',    title: '完整光通信系统',     part: 'Part 4 · 系统篇' },
  { key: 'GLOSSARY',         path: '/learn/glossary',           title: '术语表',             part: '附录' },
] as const

export const TOTAL_CHAPTERS = CHAPTERS.length
