export interface TermData {
  term: string;
  english?: string;
  definition: string;
  detail?: string;
}

export interface CategoryData {
  id: string;
  name: string;
  iconName: string;
  terms: TermData[];
}

export const glossaryData: CategoryData[] = [
  {
    id: 'light-basics',
    name: '光波基础',
    iconName: 'Lightbulb',
    terms: [
      {
        term: '波长',
        english: 'Wavelength',
        definition: '光在一个振动周期内传播的距离，常用符号 λ (lambda) 表示，单位通常为纳米 (nm)。',
        detail:
          '在真空中，波长与频率的关系为 c = λ·f，其中 c 是光速 (≈3×10⁸ m/s)。光通信中常用的波段包括：O波段 (1260-1360 nm)、C波段 (1530-1565 nm)、L波段 (1565-1625 nm)。',
      },
      {
        term: '频率',
        english: 'Frequency',
        definition: '单位时间内光振动的次数，常用符号 f 表示，单位为赫兹 (Hz)。',
        detail: '可见光的频率范围约为 430-790 THz。光的频率决定了光子的能量 E = hf，其中 h 是普朗克常数。',
      },
      {
        term: '振幅',
        english: 'Amplitude',
        definition: '光波电场或磁场振动的最大位移量，常用符号 A 表示。',
        detail: '光的强度 (能流密度) 与振幅的平方成正比，即 I ∝ A²。在强度调制直接调制光的振幅。',
      },
      {
        term: '相位',
        english: 'Phase',
        definition: '描述波动在某一时刻所处的振动状态，常用符号 φ 表示，单位为弧度 (rad)。',
        detail: '相位是相对的概念，通常讨论的是两束光之间的相位差。相位调制是现代光通信的核心技术之一。',
      },
      {
        term: '干涉',
        english: 'Interference',
        definition: '两束或多束光在空间相遇时，在重叠区域内光强重新分布的现象。',
        detail:
          '当两束相干光同相时，光强增强 (相长干涉)；反相时，光强减弱甚至抵消 (相消干涉)。马赫-曾德尔干涉仪是光调制器的基础结构。',
      },
      {
        term: '衍射',
        english: 'Diffraction',
        definition: '光遇到障碍物或小孔时，偏离直线传播路径而绕到障碍物后面的现象。',
        detail: '衍射是波动的固有特性。光栅、阵列波导光栅 (AWG) 等器件都基于衍射原理工作。',
      },
      {
        term: '相干光',
        english: 'Coherent Light',
        definition: '频率相同、振动方向相同、相位差恒定的光。',
        detail:
          '激光器发出的光是相干光。相干性分为时间相干性 (线宽) 和空间相干性。相干光通信利用光的全部信息 (幅度、相位、偏振) 进行调制和检测，大幅提升频谱效率。',
      },
      {
        term: '光程差',
        english: 'Optical Path Difference (OPD)',
        definition: '两束光从同一点出发到达观察点所经过的光程之差。光程等于几何路程乘以介质折射率，常用符号 ΔL 表示。',
        detail:
          '光程差决定了两束光干涉的结果：光程差为波长的整数倍时相长干涉，为半波长的奇数倍时相消干涉。马赫-曾德调制器就是通过改变一臂的光程来调制光强。',
      },
      {
        term: '相长干涉',
        english: 'Constructive Interference',
        definition: '两束相干光相位差为 2π 的整数倍时，振幅相加、光强增强的干涉现象。',
      },
      {
        term: '相消干涉',
        english: 'Destructive Interference',
        definition: '两束相干光相位差为 π 的奇数倍时，振幅相减、光强减弱甚至抵消的干涉现象。',
      },
      {
        term: '直接调制',
        english: 'Direct Modulation',
        definition: '通过直接改变激光器的注入电流或偏置电压来调制输出光强的调制方式。',
        detail:
          '直接调制的优点是结构简单、成本低，缺点是会产生严重的啁啾 (Chirp)，且调制带宽受限于激光器的弛豫振荡频率，通常不超过 10 GHz。适用于短距离低速光通信。',
      },
      {
        term: '外部调制',
        english: 'External Modulation',
        definition: '对连续输出的激光使用独立的调制器进行调制的调制方式。',
        detail:
          '外部调制的优点是啁啾小、调制带宽高（可达 100 GHz 以上），缺点是需要额外的调制器器件，成本和复杂度较高。中长距离高速光通信系统均使用外部调制。',
      },
      {
        term: '光调制器',
        english: 'Optical Modulator',
        definition: '将电信号转换为光信号变化的核心光电器件，通过改变光的强度、相位、偏振等参数来加载信息。',
        detail:
          '光调制器是光通信发射端的核心器件。按调制原理分有电光调制器、热光调制器、声光调制器等；按调制方式分有强度调制器、相位调制器、IQ 调制器等。',
      },
    ],
  },
  {
    id: 'modulators',
    name: '调制器类',
    iconName: 'CircuitBoard',
    terms: [
      {
        term: 'MZ 调制器',
        english: 'Mach-Zehnder Modulator',
        definition: '基于马赫-曾德尔干涉结构的光调制器，通过改变两臂的相位差来实现强度调制。',
        detail:
          'MZM 由输入光被分束器分成两束，分别通过两臂，每臂上有电极可加电压改变折射率，从而改变光相位，最后两束光合束产生干涉输出。通过控制电压使两臂相位差为 π 时，输出消光比最大。',
      },
      {
        term: 'IQ 调制器',
        english: 'IQ Modulator',
        definition: '由两个 MZ 调制器组成的正交调制器，可以同时调制光的同相 (I) 和正交 (Q) 分量。',
        detail:
          'IQ 调制器可以实现复杂的调制格式如 QPSK、QAM 等。一个 IQ 调制器包含两个 MZM，分别调制 I 和 Q 路，然后通过 90° 相移将 Q 路，最后合束输出。',
      },
      {
        term: 'DP-IQ 调制器',
        english: 'Dual-Polarization IQ Modulator (DP-IQM)',
        definition: '将两个 IQ 调制器分别调制两个正交偏振态，实现偏振复用的高级调制器。',
        detail:
          'DP-IQ 调制器是现代 100G 及以上速率光通信系统的核心发射器件。它先将激光分为 X 和 Y 两个偏振态，分别用 IQ 调制器调制，最后偏振合束输出，容量是单偏振 IQ 调制器的两倍。',
      },
      {
        term: 'Nyquist 脉冲整形',
        english: 'Nyquist Pulse Shaping',
        definition: '通过升余弦滤波器等将信号带宽限制在奈奎斯特频率以内的脉冲整形技术。',
        detail:
          'Nyquist 脉冲整形可以消除码间干扰 (ISI)，同时实现接近理论极限的频谱效率。滚降因子 α 越小，频带利用率越高，但对定时误差越敏感。',
      },
      {
        term: 'OFDM',
        english: 'Orthogonal Frequency Division Multiplexing (OFDM)',
        definition: '将高速数据流分配到多个正交子载波上并行传输的多载波调制技术。',
        detail:
          '光 OFDM (O-OFDM) 通过多个正交子载波承载数据，对色散和 PMD 有良好的容忍度，频谱利用率高。缺点是峰均功率比 (PAPR) 较高，对非线性效应敏感。',
      },
      {
        term: '概率星座整形',
        english: 'Probabilistic Constellation Shaping (PCS)',
        definition: '通过不等概率使用星座点来逼近香农极限的调制优化技术。',
        detail:
          'PCS 使内部星座点出现概率高、外部星座点出现概率低，相当于在传统 QAM 基础上获得约 1-1.5 dB 的成形增益。已被 ITU-T 推荐用于 400G/800G 光传输系统。',
      },
      {
        term: '电光效应',
        english: 'Electro-optic Effect',
        definition: '某些晶体材料的折射率随外加电场变化的物理效应。',
        detail:
          '电光效应分为普克尔效应 (线性电光效应，折射率变化与电场成正比) 和克尔效应 (二次电光效应，折射率变化与电场平方成正比)。铌酸锂 (LiNbO₃) 调制器主要利用普克尔效应。',
      },
      {
        term: '热光效应',
        english: 'Thermo-optic Effect',
        definition: '材料的折射率随温度变化的效应。',
        detail:
          '硅的热光系数约为 1.8×10⁻⁴ /°C。热光效应常用于热光调制器或热光开关，结构简单但速度较慢 (微秒量级)，远低于电光调制器 (皮秒量级)。',
      },
      {
        term: 'Vπ',
        english: 'Half-wave Voltage',
        definition: '使调制器产生 π 相位差所需的驱动电压，也称为半波电压。',
        detail:
          'Vπ 是衡量调制器效率的重要参数，Vπ 越小，调制器越高效。对于 MZ 调制器，当驱动电压等于 Vπ 时，输出光强从最大变到最小 (或相反)。Vπ 与电极长度成反比，电极越长，Vπ 越小。',
      },
      {
        term: '啁啾',
        english: 'Chirp',
        definition:
          '调制过程中产生的瞬时频率漂移现象。频率随时间增加称为正啁啾 (up-chirp)，减少称为负啁啾 (down-chirp)。',
        detail:
          '啁啾会导致光脉冲在光纤中传输时展宽，限制传输距离。单臂 MZM 产生的啁啾最大，推挽结构可有效抑制啁啾。有时也利用适当的啁啾来预补偿光纤色散。',
      },
      {
        term: '消光比',
        english: 'Extinction Ratio (ER)',
        definition: '调制器输出最大光功率与最小光功率的比值，通常用 dB 表示。',
        detail:
          '消光比越高，"0"和"1"电平的区分度越好，系统误码率越低。理想 MZM 的消光比无限大，实际器件因分束比不完美、损耗不平衡等因素，消光比通常在 20-40 dB 之间。',
      },
      {
        term: '插入损耗',
        english: 'Insertion Loss (IL)',
        definition: '光通过调制器后的功率损失，包括耦合损耗、传播损耗等，通常用 dB 表示。',
        detail:
          '插入损耗越低，系统功率预算越充足。MZM 的典型插入损耗为 3-6 dB，包括光纤-芯片耦合损耗、分束/合束器损耗、波导传播损耗等。',
      },
      {
        term: '调制带宽',
        english: 'Modulation Bandwidth',
        definition: '调制器能够有效工作的最高频率，即电光响应下降 3 dB 时的频率。',
        detail:
          '调制带宽由电极结构和材料特性决定。行波电极可突破 RC 限制，现代高速调制器带宽可达 100 GHz 以上。3 dB 带宽 ≈ 0.35/上升时间。',
      },
      {
        term: '马赫-曾德干涉仪',
        english: 'Mach-Zehnder Interferometer (MZI)',
        definition: '一种分振幅双光束干涉装置，由两个 3dB 耦合器（分束/合束）和两臂波导组成。',
        detail:
          'MZI 是 MZ 调制器的基本干涉结构。两臂的长度差或折射率差产生光程差，导致合束时发生干涉。通过改变一臂的折射率（电光/热光效应）即可控制输出光强。',
      },
      {
        term: '铌酸锂',
        english: 'Lithium Niobate (LiNbO₃)',
        definition: '一种人工晶体材料，具有优良的电光效应（普克尔效应）和声光效应，是传统光调制器的主流材料平台。',
        detail:
          '铌酸锂调制器具有电光系数大、啁啾小、带宽高等优点，但尺寸较大、难以与 CMOS 工艺集成。近年来薄膜铌酸锂 (TFLN) 技术在保持性能优势的同时大幅减小了尺寸。',
      },
      {
        term: '硅光',
        english: 'Silicon Photonics',
        definition: '以硅 (Si) 材料为基础的光集成技术平台，利用成熟的 CMOS 工艺制造光电器件。',
        detail:
          '硅光的核心优势是成本低、集成度高、可与电子芯片共封装。但硅本身没有电光效应，需通过载流子色散效应实现调制，或与其他材料（如铌酸锂薄膜）异质集成。',
      },
    ],
  },
  {
    id: 'polarization',
    name: '偏振类',
    iconName: 'Compass',
    terms: [
      {
        term: '偏振态',
        english: 'State of Polarization (SOP)',
        definition: '描述光的电场矢量振动方向随时间变化的方式。',
        detail:
          '常见的偏振态有线偏振、圆偏振和椭圆偏振。线偏振的电场矢量在一条直线上振动；圆偏振的电场矢量端点做圆周运动；椭圆偏振是最一般的情况。',
      },
      {
        term: '斯托克斯矢量',
        english: 'Stokes Vector',
        definition: '由四个参数 (S₀, S₁, S₂, S₃) 组成的矢量，用于描述光的偏振态。',
        detail:
          'S₀ 是总光强，S₁ 是 0° 和 90° 线偏振分量的光强差，S₂ 是 45° 和 135° 线偏振分量的光强差，S₃ 是右旋和左旋圆偏振分量的光强差。斯托克斯矢量可以通过功率测量得到。',
      },
      {
        term: '庞加莱球',
        english: 'Poincaré Sphere',
        definition: '偏振态的几何表示，将归一化的斯托克斯参数 (S₁, S₂, S₃) 作为三维坐标。',
        detail:
          '庞加莱球面上的每一个点对应一种完全偏振态。球面上两点之间的角距离对应偏振态之间的关系。两个对径点对应正交的偏振态。',
      },
      {
        term: '偏振复用',
        english: 'Polarization Division Multiplexing (PDM)',
        definition: '利用光的两个正交偏振态作为独立信道传输数据，使传输容量翻倍的技术。',
        detail:
          '在发射端用偏振合束器 (PBC) 将两个偏振态合在一起，在接收端用偏振分束器 (PBS) 分开。配合数字信号处理 (DSP) 可以补偿传输中的偏振态变化。',
      },
      {
        term: '偏振度',
        english: 'Degree of Polarization (DOP)',
        definition: '描述光的偏振程度的物理量。',
        detail:
          'DOP = √(S₁² + S₂² + S₃²) / S₀。DOP = 1 表示完全偏振光；DOP = 0 表示自然光 (完全非偏振光)；0 < DOP < 1 表示部分偏振光。',
      },
      {
        term: '偏振模色散 (PMD)',
        english: 'Polarization Mode Dispersion (PMD)',
        definition: '光纤中两个正交偏振态（HE₁₁^x 和 HE₁₁^y 模）由于有效折射率不同而传播速度不同导致的脉冲展宽现象。',
        detail:
          'PMD 是高速光通信的关键限制因素之一。与色度色散不同，PMD 沿光纤随机变化，难以用固定方法补偿。PMD 值用 ps/√km 表示，新型光纤的 PMD 系数通常小于 0.1 ps/√km。',
      },
      {
        term: '偏振相关损耗',
        english: 'Polarization Dependent Loss (PDL)',
        definition: '光器件对不同偏振态的光产生的损耗差异。',
        detail:
          'PDL 会导致信号 SNR 退化，系统设计中需严格控制各器件的 PDL 指标。多个器件的 PDL 会累积，并通过偏振模色散产生复杂的相互作用。',
      },
      {
        term: '偏振分束器',
        english: 'Polarization Beam Splitter (PBS)',
        definition: '将输入光按两个正交偏振态分开输出的无源器件。',
        detail:
          'PBS 在偏振复用光收发模块中用于分离 X 和 Y 偏振态的光。通常与偏振旋转器配合使用，将分离后的光耦合到对应的调制器或探测器。',
      },
    ],
  },
  {
    id: 'modulation-formats',
    name: '调制格式类',
    iconName: 'BarChart3',
    terms: [
      {
        term: 'QPSK',
        english: 'Quadrature Phase Shift Keying',
        definition: '正交相移键控，一种四相位调制格式，每个符号携带 2 比特信息。',
        detail:
          'QPSK 有四个相位状态，通常为 0°、90°、180°、270° (或 π/4、3π/4、5π/4、7π/4)。QPSK 具有较好的抗噪声性能，是相干光通信中常用的调制格式。',
      },
      {
        term: '16QAM',
        english: '16 Quadrature Amplitude Modulation',
        definition: '16 进制正交幅度调制，每个符号携带 4 比特信息。',
        detail:
          '16QAM 的星座图有 16 个点，排列成 4×4 的方阵。相比 QPSK，16QAM 的频谱效率更高，但对噪声和非线性更敏感。',
      },
      {
        term: '64QAM',
        english: '64 Quadrature Amplitude Modulation',
        definition: '64 进制正交幅度调制，每个符号携带 6 比特信息。',
        detail:
          '64QAM 的星座图有 64 个点，排列成 8×8 的方阵。64QAM 的频谱效率更高，但需要更高的信噪比才能保证相同的误码率。',
      },
      {
        term: '星座图',
        english: 'Constellation Diagram',
        definition: '用复平面上的点表示调制信号的幅度和相位的图形。',
        detail:
          '星座图的横轴是同相分量 (I)，纵轴是正交分量 (Q)。每个点代表一个符号。星座图可以直观地显示调制格式和信号质量。',
      },
      {
        term: '符号率',
        english: 'Symbol Rate / Baud Rate',
        definition: '单位时间内传输的符号数，单位为波特 (Baud)。',
        detail: '符号率 = 比特率 / 每符号比特数。例如，28 GBaud 的 QPSK 系统比特率为 56 Gbit/s。',
      },
      {
        term: '比特率',
        english: 'Bit Rate',
        definition: '单位时间内传输的比特数，单位为 bit/s (bps)。',
        detail: '比特率 = 符号率 × log₂(M)，其中 M 是调制阶数。对于偏振复用系统，还要乘以 2。',
      },
    ],
  },
  {
    id: 'receiver',
    name: '接收类',
    iconName: 'Radio',
    terms: [
      {
        term: 'SNR',
        english: 'Signal-to-Noise Ratio',
        definition: '信噪比，信号功率与噪声功率的比值，通常用分贝 (dB) 表示。',
        detail: 'SNR = 10·log₁₀(P_signal / P_noise) dB。信噪比越高，信号质量越好，误码率越低。',
      },
      {
        term: 'BER',
        english: 'Bit Error Rate',
        definition: '误码率，传输中出错的比特数与总传输比特数的比值。',
        detail: 'BER 是衡量通信系统性能的最终指标。常见的目标 BER 通常为 10⁻³ (前向纠错前) 或 10⁻¹² (前向纠错后)。',
      },
      {
        term: 'EVM',
        english: 'Error Vector Magnitude',
        definition: '误差矢量幅度，衡量实际接收符号与理想符号位置之间的偏差。',
        detail: 'EVM 通常用百分比或 dB 表示。EVM 越小，信号质量越好。EVM 综合反映了各种损伤对信号的影响。',
      },
      {
        term: '相干接收',
        english: 'Coherent Detection',
        definition: '利用本振光与信号光混频，检测信号的幅度和相位信息的接收方式。',
        detail:
          '相干接收可以检测光的全部信息 (幅度、相位、偏振)，配合数字信号处理 (DSP) 可以补偿色度色散、偏振模色散等传输损伤。',
      },
      {
        term: '光电二极管',
        english: 'Photodiode (PD)',
        definition: '将光信号转换为电信号的器件。',
        detail:
          '光电二极管基于光电效应工作。常见的类型有 PIN 光电二极管和雪崩光电二极管 (APD)。APD 有内部增益，灵敏度更高。',
      },
      {
        term: 'AWGN',
        english: 'Additive White Gaussian Noise',
        definition: '加性高斯白噪声，一种理想的噪声模型。',
        detail:
          'AWGN 的功率谱密度在整个频带内均匀分布 (白)，幅度服从高斯分布。光通信中，放大器的自发辐射噪声 (ASE) 近似为 AWGN。',
      },
      {
        term: '光电效应',
        english: 'Photoelectric Effect',
        definition: '光照射到某些材料表面时，光子能量被电子吸收，使电子逸出材料表面或改变材料电导率的现象。',
        detail:
          '光电二极管基于内光电效应工作：光子被半导体材料吸收后产生电子-空穴对，在外加电场作用下形成光电流。光子能量必须大于半导体禁带宽度才能产生光电效应。',
      },
      {
        term: 'PIN 光电二极管',
        english: 'PIN Photodiode',
        definition: '由 P 型层、本征层 (Intrinsic) 和 N 型层组成的 PIN 结构光电二极管。',
        detail:
          'PIN 管中间的 I 层拓宽了耗尽区，提高了响应速度和量子效率。PIN 管响应度高、噪声低、工作电压低，是光通信中最常用的光电探测器。',
      },
      {
        term: 'APD 雪崩光电二极管',
        english: 'Avalanche Photodiode (APD)',
        definition: '利用雪崩倍增效应实现内部增益的光电二极管，通过高反向偏压使光生载流子发生雪崩式倍增。',
        detail:
          'APD 提供 10-100 倍内部增益，灵敏度比 PIN 管高 5-15 dB，但需要更高的工作电压（数十伏），且雪崩过程引入额外噪声。适用于长距离或弱信号接收场景。',
      },
      {
        term: '响应度',
        english: 'Responsivity (R)',
        definition: '光电二极管将光功率转换为光电流的效率，单位 A/W。',
        detail:
          '响应度 R = I_photo / P_opt。理想情况下 R = η·q/(h·f)，其中 η 是量子效率。对于 1550 nm 波段，InGaAs PIN 管的典型响应度为 0.8-1.0 A/W。',
      },
      {
        term: '直接检测',
        english: 'Direct Detection / IM-DD',
        definition: '仅检测光的强度（功率）而不恢复相位和偏振信息的接收方式。',
        detail:
          '直接检测 (Intensity Modulation - Direct Detection, IM-DD) 结构简单、成本低，但只利用了光的强度维度，频谱效率低。短距离（<10 km）光互连和数据中心应用广泛。',
      },
      {
        term: '本振光',
        english: 'Local Oscillator (LO)',
        definition: '在相干接收系统中，与信号光混频的本地激光光源，提供频率稳定的参考光。',
        detail:
          '本振光功率通常比信号光高 10-20 dBm，用以放大微弱信号。本振光的频率稳定性和线宽直接影响相干接收的性能。商用相干光模块中的本振通常为可调谐窄线宽激光器。',
      },
      {
        term: '90° 光混频器',
        english: '90° Optical Hybrid',
        definition: '将信号光和本振光混合产生四路正交输出（I+, I-, Q+, Q-）的光学器件。',
        detail:
          '90° 光混频器是相干接收机的核心光学组件，通常基于自由空间光学或平面光波导技术实现。它将信号光和本振光以 0°、90°、180° 和 270° 四个相位关系混合，输出两对平衡信号。',
      },
      {
        term: '平衡探测器',
        english: 'Balanced Photodetector',
        definition: '由两个特性相同的 PD 和差分放大电路组成的探测器，输出为两路光电流的差值。',
        detail:
          '平衡探测可以有效抑制共模噪声（如本振光强度噪声），提高接收信噪比约 3 dB。每个平衡探测器包含两个 PD，一个 90° 光混频器需要两个平衡探测器。',
      },
      {
        term: '接收灵敏度',
        english: 'Receiver Sensitivity',
        definition: '接收机在满足给定误码率要求下所需的最小输入光功率，通常用 dBm 表示。',
        detail:
          '灵敏度越高（数值越小），接收机越能检测微弱信号。APD 接收机灵敏度通常优于 PIN 接收机 5-15 dB。相干接收机灵敏度接近量子极限。',
      },
    ],
  },
  {
    id: 'laser',
    name: '激光器类',
    iconName: 'Flame',
    terms: [
      {
        term: '激光器',
        english: 'Laser',
        definition: '通过受激辐射产生光放大的器件，输出相干光。',
        detail:
          'Laser 是 Light Amplification by Stimulated Emission of Radiation 的缩写。激光器由增益介质、泵浦源和谐振腔三部分组成。',
      },
      {
        term: '受激辐射',
        english: 'Stimulated Emission',
        definition: '处于激发态的原子在入射光子的作用下，跃迁到低能级并辐射出与入射光子完全相同的光子的过程。',
        detail: '受激辐射产生的光子与入射光子具有相同的频率、相位、偏振和传播方向。这是激光产生的基础。',
      },
      {
        term: '谐振腔',
        english: 'Resonant Cavity',
        definition: '由两个或多个反射镜组成的光学结构，用于提供光反馈。',
        detail:
          '谐振腔使光在两个反射镜之间来回反射，多次通过增益介质获得放大。只有满足谐振条件的波长才能在腔内振荡。谐振腔决定了激光的纵模和横模特性。',
      },
      {
        term: '线宽',
        english: 'Linewidth',
        definition: '激光器输出光谱的宽度，通常用 3 dB 带宽表示。',
        detail:
          '线宽反映了激光的单色性和时间相干性。线宽越窄，相干性越好。分布式反馈激光器 (DFB) 的线宽通常为 MHz 量级，外腔激光器 (ECL) 的线宽可窄至 kHz 量级。',
      },
      {
        term: '自发辐射',
        english: 'Spontaneous Emission',
        definition: '处于高能级的粒子在不受外界光子激发的情况下，自发地从高能级跃迁到低能级并辐射出光子的过程。',
        detail:
          '自发辐射产生的光子相位、方向随机，是 LED 和非相干光源的工作基础。激光器工作时需要抑制自发辐射（使其转化为受激辐射），但完全消除是不可能的，自发辐射也是激光器噪声的来源。',
      },
      {
        term: '受激吸收',
        english: 'Stimulated Absorption',
        definition: '处于低能级的粒子吸收一个入射光子后被激发到高能级的过程。',
        detail:
          '受激吸收与受激辐射互为逆过程。在激光器中，需要先通过泵浦使受激吸收占主导产生粒子数反转，然后才能通过受激辐射实现光放大。',
      },
      {
        term: '粒子数反转',
        english: 'Population Inversion',
        definition: '高能级的粒子数多于低能级的非热平衡状态，是产生激光的必要条件。',
        detail:
          '在热平衡状态下，低能级粒子数总是多于高能级。要实现粒子数反转，需要通过外部能量（泵浦）将粒子从低能级"抽运"到高能级。粒子数反转的程度决定了增益介质的增益系数。',
      },
      {
        term: '泵浦',
        english: 'Pumping / Optical Pumping',
        definition: '通过外部能量（光、电、化学等）将粒子从低能级激发到高能级的过程。',
        detail:
          '半导体激光器使用电泵浦（注入电流），固体激光器使用光泵浦（闪光灯或其他激光器）。泵浦效率是影响激光器整体效率的关键因素。',
      },
      {
        term: '激光阈值',
        english: 'Laser Threshold',
        definition: '激光器产生激光所需的最小泵浦功率（或电流）。只有当增益大于损耗时，激光才能产生。',
        detail:
          '阈值以下激光器工作于自发辐射模式（类似 LED），阈值以上才进入受激辐射模式（激光）。低阈值电流是高性能激光器的重要指标。',
      },
      {
        term: '纵模',
        english: 'Longitudinal Mode',
        definition: '沿谐振腔轴向满足驻波条件的频率模式，决定了激光器的输出波长和频谱特性。',
        detail:
          '纵模间隔由 Δλ = λ²/(2nL) 决定（L 为腔长，n 为折射率）。单纵模激光器（如 DFB）输出单一波长，多纵模激光器输出多波长。相干光通信需要单纵模窄线宽激光器。',
      },
      {
        term: '横模',
        english: 'Transverse Mode',
        definition: '光场在垂直于传播方向截面上的横向分布模式，决定了激光的光束质量和远场特性。',
        detail:
          '基横模 (TEM₀₀) 具有高斯分布的光斑，聚焦性能最好。高阶横模光斑更大、发散角更大。单模光纤只能传输基横模。',
      },
      {
        term: 'DFB 激光器',
        english: 'Distributed Feedback Laser (DFB)',
        definition: '分布反馈激光器，在谐振腔内集成布拉格光栅实现单纵模输出的半导体激光器。',
        detail:
          'DFB 是光通信中最常用的激光器类型。布拉格光栅替代了传统法布里-珀罗腔的端面反射镜，只选择满足布拉格条件的单一纵模。DFB 线宽通常为 1-10 MHz，输出功率 10-50 mW。',
      },
      {
        term: '外腔激光器',
        english: 'External Cavity Laser (ECL)',
        definition: '将增益介质与外部谐振腔（含窄带滤波元件）结合的激光器，可实现极窄线宽输出。',
        detail:
          'ECL 通过更长的腔长和外部滤波元件将线宽压缩到 kHz 量级，是相干光通信的优选光源。但结构复杂、成本高，主要用于高速长距离系统。',
      },
      {
        term: 'EDFA',
        english: 'Erbium-Doped Fiber Amplifier (EDFA)',
        definition: '掺铒光纤放大器，利用掺铒光纤中的铒离子受激辐射放大光信号的光放大器。',
        detail:
          'EDFA 是光通信系统中最广泛使用的光放大器，工作在 1550 nm 波段（C波段和L波段）。它可以同时放大多个波长信道，是实现波分复用 (WDM) 长距离传输的关键器件。典型增益 20-40 dB，噪声系数 4-6 dB。',
      },
      {
        term: '光纤放大器',
        english: 'Optical Fiber Amplifier',
        definition: '利用掺杂稀土元素（如铒、镱）的光纤作为增益介质，对光信号进行直接放大的器件。',
        detail:
          '光纤放大器无需光电转换，可直接在光域放大信号。除 EDFA 外，还有掺镱光纤放大器 (YDFA) 用于 1030-1080 nm 波段，掺钍光纤放大器 (TDFA) 用于 S 波段等。',
      },
      {
        term: '噪声系数',
        english: 'Noise Figure (NF)',
        definition: '放大器输出信噪比与输入信噪比的比值，衡量放大器引入噪声的多少。',
        detail:
          'NF = SNR_in / SNR_out，理想放大器 NF = 1（即 0 dB）。EDFA 的噪声系数通常为 4-6 dB，主要由自发辐射 (ASE) 噪声决定。级联放大器的噪声会累积。',
      },
      {
        term: 'ASE 噪声',
        english: 'Amplified Spontaneous Emission (ASE)',
        definition: '光纤放大器中自发辐射被放大后产生的宽带噪声，是光放大系统的主要噪声来源。',
        detail:
          'ASE 噪声功率谱密度在整个放大带宽内近似均匀分布，可近似为加性高斯白噪声 (AWGN)。ASE 是限制长距离光传输信噪比的根本因素。',
      },
    ],
  },
  {
    id: 'fiber',
    name: '光纤传输',
    iconName: 'Cable',
    terms: [
      {
        term: '单模光纤',
        english: 'Single-Mode Fiber (SMF)',
        definition: '只允许基模 (HE₁₁) 传输的光纤，芯径约 8-10 μm，用于长距离高速光通信。',
        detail:
          '单模光纤消除了多模光纤中的模式色散，可实现数百公里的高速传输。标准单模光纤 (G.652) 在 1550 nm 波段的损耗约 0.2 dB/km，色散约 17 ps/(nm·km)。',
      },
      {
        term: '多模光纤',
        english: 'Multi-Mode Fiber (MMF)',
        definition: '允许多个模式同时传输的光纤，芯径较大（50 或 62.5 μm），用于短距离低速传输。',
        detail:
          '多模光纤成本较低、连接容易，但模式色散严重限制传输距离和速率。OM3/OM4 多模光纤配合 VCSEL 可支持数百米的 40G/100G 传输，主要用于数据中心内部。',
      },
      {
        term: '光纤损耗',
        english: 'Fiber Attenuation/Loss',
        definition: '光信号在光纤中传播时的功率衰减，单位为 dB/km。',
        detail:
          '光纤损耗主要来自瑞利散射和材料吸收。石英光纤在 1550 nm 处损耗最低（约 0.2 dB/km），这也是为什么光通信主要工作在 C 波段的原因。',
      },
      {
        term: '色度色散',
        english: 'Chromatic Dispersion (CD)',
        definition: '不同波长的光在光纤中传播速度不同导致的脉冲展宽现象。',
        detail:
          '色度色散由材料色散和波导色散组成。标准单模光纤在 1550 nm 处色散约 17 ps/(nm·km)，需要通过 DSP 或色散补偿光纤进行补偿。',
      },
      {
        term: '非线性效应',
        english: 'Nonlinear Effects',
        definition: '高功率光信号在光纤中引起的非线性光学现象，包括自相位调制、交叉相位调制、四波混频等。',
        detail:
          '非线性效应是限制长距离大容量光传输的关键因素。自相位调制 (SPM) 导致脉冲相位畸变，四波混频 (FWM) 在 WDM 系统中产生串扰。可通过降低入纤功率、采用大有效面积光纤等方式缓解。',
      },
      {
        term: '自相位调制 (SPM)',
        english: 'Self-Phase Modulation (SPM)',
        definition: '光脉冲自身的强度变化引起光纤折射率变化，从而调制脉冲自身相位的现象。',
        detail: 'SPM 会导致脉冲频谱展宽，与色散相互作用可能加剧或缓解脉冲畸变，取决于色散符号和啁啾方向。',
      },
      {
        term: '交叉相位调制 (XPM)',
        english: 'Cross-Phase Modulation (XPM)',
        definition: '不同波长或偏振的信号相互引起相位调制，在 WDM 系统中产生信道间串扰。',
        detail: 'XPM 主要发生在相邻波长信道之间，可通过增大信道间隔或降低功率来减轻。',
      },
      {
        term: '四波混频 (FWM)',
        english: 'Four-Wave Mixing (FWM)',
        definition: '三个或更多光波在光纤非线性介质中相互作用产生新的频率分量的现象。',
        detail:
          'FWM 在色散较小的波段（如零色散点附近）尤为严重，产生的寄生波长会干扰原有信道。增大信道间隔或使用色散管理可有效抑制 FWM。',
      },
    ],
  },
  {
    id: 'wdm',
    name: '波分复用',
    iconName: 'Waves',
    terms: [
      {
        term: 'WDM',
        english: 'Wavelength Division Multiplexing (WDM)',
        definition: '波分复用，在同一根光纤中同时传输多个不同波长信道的技术。',
        detail:
          'WDM 是光通信容量提升的核心技术。CWDM（粗波分复用）信道间隔 20 nm，约 18 个信道；DWDM（密集波分复用）信道间隔 0.4-0.8 nm，可达 80-160 个信道。现代海底光缆系统采用超密集 WDM，单纤容量已达 Tb/s 量级。',
      },
      {
        term: 'DWDM',
        english: 'Dense Wavelength Division Multiplexing (DWDM)',
        definition: '密集波分复用，信道间隔为 0.4 nm (50 GHz) 或更小的波分复用技术。',
        detail:
          'DWDM 可在单根光纤中传输数十到上百个波长信道，配合 EDFA 放大，实现长距离大容量传输。标准 DWDM 系统工作在 C 波段 (1530-1565 nm)，部分系统扩展到 L 波段。',
      },
      {
        term: 'CWDM',
        english: 'Coarse Wavelength Division Multiplexing (CWDM)',
        definition: '粗波分复用，信道间隔为 20 nm 的低成本波分复用方案。',
        detail:
          'CWDM 波长范围覆盖 1270-1610 nm，共 18 个信道。由于间隔大，激光器无需温度控制，成本低。但信道数少，且部分波段不能使用 EDFA，主要用于短距离城域网。',
      },
      {
        term: 'C 波段',
        english: 'C-Band (Conventional Band)',
        definition: '光通信的标准工作波段，波长范围 1530-1565 nm (约 4 THz 带宽)。',
        detail:
          'C 波段是 EDFA 的主要放大窗口，损耗最低，是 DWDM 系统的主要工作波段。ITU-T 定义的标准 C 波段包含约 40 个 DWDM 信道（100 GHz 间隔）。',
      },
      {
        term: 'L 波段',
        english: 'L-Band (Long-wavelength Band)',
        definition: '长波长波段，波长范围 1565-1625 nm，用于扩展 WDM 系统容量。',
        detail:
          'L 波段可通过扩展的 EDFA 进行放大，与 C 波段配合可使 WDM 系统容量翻倍。L 波段光纤损耗略高于 C 波段（约 0.25 dB/km）。',
      },
      {
        term: 'O 波段',
        english: 'O-Band (Original Band)',
        definition: '原始波段，波长范围 1260-1360 nm，是单模光纤零色散点所在的波段。',
        detail:
          'O 波段色散最小，适合高速短距离传输。数据中心互联和部分城域网使用 O 波段。但 O 波段没有合适的光放大器，不适合超长距离传输。',
      },
      {
        term: '光合波器',
        english: 'Wavelength Multiplexer (MUX)',
        definition: '将多个波长信道合并到一根光纤输出的无源器件。',
        detail:
          '光合波器类型包括薄膜滤波器 (TFF)、阵列波导光栅 (AWG)、光纤布拉格光栅 (FBG) 等。AWG 是高密度 DWDM 系统的首选，可集成数十个信道。',
      },
      {
        term: '光分波器',
        english: 'Wavelength Demultiplexer (DEMUX)',
        definition: '将一根光纤中的多个波长信道分开输出到不同端口的无源器件。',
        detail: '光分波器与光合波器结构类似，工作原理相反。接收端使用分波器将各波长信道分离后，分别进行解调和检测。',
      },
      {
        term: 'AWG',
        english: 'Arrayed Waveguide Grating (AWG)',
        definition: '阵列波导光栅，基于平面光波导技术的高密度波长复用/解复用器件。',
        detail:
          'AWG 利用波导阵列的相位干涉原理实现波长分离，可集成数十到上百个信道，信道间隔可达 50 GHz 或更小。AWG 是 DWDM 系统的核心器件。',
      },
      {
        term: '信道间隔',
        english: 'Channel Spacing',
        definition: 'WDM 系统中相邻波长信道之间的频率或波长间隔。',
        detail:
          'ITU-T 规定的标准信道间隔有 100 GHz (0.8 nm)、50 GHz (0.4 nm)、25 GHz 等。间隔越小，频谱效率越高，但对激光器稳定性和滤波器精度要求越高。',
      },
    ],
  },
  {
    id: 'advanced',
    name: '高级调制',
    iconName: 'Zap',
    terms: [
      {
        term: '香农极限',
        english: 'Shannon Limit',
        definition:
          '由克劳德·香农提出的信道容量上限 C = B·log₂(1+S/N)，标志在给定带宽和信噪比下可靠传输的理论最大数据速率。光通信的终极目标就是逼近这个极限。',
      },
      {
        term: '频谱效率',
        english: 'Spectral Efficiency',
        definition:
          'Spectral Efficiency，每赫兹带宽每秒传输的信息量，单位 bit/s/Hz。是衡量调制格式和传输系统性能的核心指标。',
      },
      {
        term: '码间干扰 (ISI)',
        english: 'Inter-Symbol Interference (ISI)',
        definition:
          '相邻符号在时间上相互重叠导致的判决错误。当信号带宽超过信道带宽时，脉冲在时域展宽并串扰到相邻符号周期。',
      },
      {
        term: '色散',
        english: 'Dispersion',
        definition:
          '光纤中不同频率/波长的光传播速度不同导致的脉冲展宽现象。包括材料色散和波导色散，是限制长距离传输速率的主要因素之一。',
      },
      {
        term: '偏振模色散 (PMD)',
        english: 'Polarization Mode Dispersion (PMD)',
        definition:
          '光纤中两个正交偏振态由于折射率不同而传播速度不同导致的色散。PMD 随机变化且难以补偿，是高速系统的严峻挑战。',
      },
      {
        term: '峰均功率比 (PAPR)',
        english: 'Peak-to-Average Power Ratio (PAPR)',
        definition:
          '信号瞬时峰值功率与平均功率的比值。OFDM 的多载波叠加导致 PAPR 较高，高 PAPR 信号通过非线性器件（如 MZM、光纤）时会产生严重失真。',
      },
      {
        term: '成形增益',
        english: 'Shaping Gain',
        definition:
          '通过使信号幅度分布更接近高斯分布（而非均匀分布）所带来的信噪比改善。二维理想成形增益上限为 1.53 dB，PCS 可实际实现约 1-1.5 dB，相当于同等 SNR 下传输距离增加 15-25%。',
      },
      {
        term: '数字信号处理 (DSP)',
        english: 'Digital Signal Processing (DSP)',
        definition:
          '包括色散预补偿、脉冲整形滤波、PCS 分布匹配、FEC 编码等一系列处理算法的统称。现代 400G 以上光模块的 DSP ASIC 功耗已达数瓦级别。',
      },
      {
        term: '恒参分布匹配器 (CCDM)',
        english: 'Constant Composition Distribution Matcher (CCDM)',
        definition:
          'PCS 的工程实现方案。将均匀分布的输入比特映射为具有特定概率分布的星座点序列，确保每个输出块中星座点的出现比例严格满足目标概率分布。',
      },
      {
        term: 'LDPC 纠错码',
        english: 'Low-Density Parity-Check Code (LDPC)',
        definition:
          '一种接近香农极限的信道编码方案，已被 ITU-T 采纳为光通信标准前向纠错 (FEC) 方案，显著降低系统所需的信噪比。',
      },
      {
        term: 'QAM 调制',
        english: 'Quadrature Amplitude Modulation (QAM)',
        definition:
          '同时改变载波的幅度和相位来携带信息的调制方式。16QAM 每个符号携带 4 比特，64QAM 携带 6 比特，阶数越高频谱效率越高但对信噪比要求也越高。',
      },
      {
        term: '星座点',
        english: 'Constellation Point',
        definition:
          '调制符号在 IQ 复数平面上的坐标位置。例如 16QAM 有 16 个星座点，每个点对应一个唯一的 4 比特组合。星座点之间的最小距离决定了抗噪声能力。',
      },
      {
        term: 'DAC/ADC',
        english: 'Digital-to-Analog / Analog-to-Digital Converter',
        definition:
          '数模转换器/模数转换器。高速 DAC/ADC 是实现现代相干光通信的关键硬件，其采样率和分辨率直接决定信号质量。',
      },
      {
        term: '波特率',
        english: 'Baud Rate',
        definition:
          '符号速率，即每秒传输的符号数 (symbol/s)。在光通信中常与比特率混淆：对 QPSK 每符号 2 比特，100 GBaud = 200 Gb/s。',
      },
      {
        term: '均衡器',
        english: 'Equalizer',
        definition:
          '补偿信道失真（色散、PMD 等）的数字信号处理模块。OFDM 将宽带信道分割为多个窄带子信道，每个子信道近似平坦，因此无需复杂的时域均衡。',
      },
      {
        term: 'FFT/IFFT',
        english: 'Fast Fourier Transform / Inverse FFT',
        definition:
          '快速傅里叶变换/逆变换。OFDM 的调制解调可通过 FFT/IFFT 在数字域高效实现，复杂度远低于传统多载波方案。',
      },
      {
        term: 'CO-OFDM',
        english: 'Coherent Optical OFDM',
        definition:
          '相干光 OFDM。结合相干接收技术的光 OFDM 系统，使用本地振荡器与信号光混频来恢复完整的电场信息（幅度和相位），是光 OFDM 最主要的实现方案。',
      },
      {
        term: 'Nyquist-WDM',
        english: 'Nyquist Wavelength Division Multiplexing',
        definition:
          '将 Nyquist 脉冲整形与波分复用 (WDM) 结合的技术。每个波长通道的信号带宽被严格限制，通道间隔可以压缩到接近波特率，实现极高的频谱效率。',
      },
      {
        term: '信噪比 (SNR)',
        english: 'Signal-to-Noise Ratio (SNR)',
        definition:
          'Signal-to-Noise Ratio，信号功率与噪声功率的比值，通常以 dB 表示。是决定通信系统误码率的核心参数。SNR 越高，可支持的调制阶数越高，传输速率越大。',
      },
      {
        term: 'NRZ 调制',
        english: 'Non-Return-to-Zero Modulation',
        definition:
          '非归零调制，最简单的强度调制格式，仅用两个光功率电平（高/低）分别表示比特 1 和 0。频谱利用率低，已无法满足高速需求。',
      },
      {
        term: '奈奎斯特频率',
        english: 'Nyquist Frequency',
        definition:
          '根据奈奎斯特 ISI 准则，无码间干扰传输所需的最小带宽为符号速率的一半 (1/2T)。超过此频率的信号分量可被完全滤除而不影响判决。',
      },
      {
        term: '滚降因子 α',
        english: 'Roll-off Factor (α)',
        definition:
          '升余弦滤波器的关键参数 (0 ≤ α ≤ 1)，决定滤波器的过渡带宽度。α 越小，带宽越窄但实现越困难；α 为 0 时为理想矩形滤波器（物理不可实现）。',
      },
      {
        term: '偏振合束器 (PBC)',
        english: 'Polarization Beam Combiner (PBC)',
        definition: '将两个正交偏振态的光重新合并到同一根光纤输出的无源器件，与偏振分束器功能相反。',
      },
      {
        term: '旁瓣',
        english: 'Sidelobe',
        definition: '频谱主峰（主瓣）两侧的次要能量分布。旁瓣越宽，信号占用的总带宽越大，相邻波道之间的串扰越严重。',
      },
    ],
  },
];

export function getAllTerms(): TermData[] {
  return glossaryData.flatMap((cat) => cat.terms);
}

export function getTermByName(name: string): TermData | undefined {
  return getAllTerms().find((t) => t.term === name);
}
