# 技术架构

## 架构图

```
graph TB
    subgraph 前端层
        Router["HashRouter + Layout scrollToTop"] --> Routes["React Router 页面路由"]
        Routes --> Pages["页面组件（Learn / Playground）"]
        Pages --> Stores["Zustand 状态管理（5 个 store）"]
        Pages --> Util["数学工具函数（utils/）"]
        Stores --> Canvas["Canvas 2D 可视化组件"]
        Canvas --> Anim["动画控制器（useAnimationFrame）"]
    end
    subgraph 样式层
        Styles["Tailwind CSS v4 工具类"] --> Pages
        Sheet["CSS 自定义属性（laser-cyan/red/green 等）"] --> Styles
    end
    subgraph 基础层
        Constants["constants/（路由 + 章节常量）"]
        Types["types/（IQPoint, ModulationFormat）"]
        Lib["lib/（cn, setupCanvas, drawGrid, kaTeXScheduler）"]
        Lucide["Lucide React 图标库"]
        Katex["KaTeX 数学公式渲染"]
    end
    Constants --> Routes
    Types --> Stores
    Lib --> Canvas
```

## 技术选型

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19.x | UI 框架 |
| TypeScript | 5.7 | 类型安全 |
| Vite | 8.x | 构建工具 |
| Tailwind CSS | 4.x | 样式框架 |
| Zustand | 5.x | 状态管理 |
| React Router | 7.x | 页面路由 |
| Lucide React | 最新 | 图标库 |
| KaTeX | 最新 | 数学公式渲染 |

## 打包策略

- **单文件 bundle**：所有页面静态 import，无 `React.lazy` / 动态导入
- **无 code-splitting**：`manualChunks: undefined`，单个 `index.js` 约 1.1 MB（319 kB gzip）
- **单 CSS**：`cssCodeSplit: false`，一个 CSS 文件
- **加载屏**：CSS-only 青色旋转 spinner + "LOADING" 文字，内联在 `index.html`，不依赖 JS

## 目录结构

```
src/
├── constants/       # 路由/章节常量（集中管理，避免硬编码）
├── types/           # 共享类型定义（IQPoint, ModulationFormat）
├── lib/             # 基础工具函数（cn, setupCanvas, drawGrid, kaTeXScheduler）
├── utils/           # 数学工具函数（waveMath, modulationMath, polarizationMath）
├── hooks/           # 自定义 Hook（useAnimationFrame, useChapterNavigation）
├── stores/          # Zustand 状态管理（5 个独立 store）
├── data/            # 数据源（glossaryData）
├── components/      # UI 组件
│   ├── common/      # 公共组件（Layout, LearnLayout, PlaygroundLayout 等）
│   ├── interference/
│   ├── iq-modulator/
│   ├── mz-modulator/
│   ├── polarization/
│   └── receiver/
└── pages/           # 页面组件
    ├── learn/       # 14 个章节页面
    └── playground/  # 5 个实验页面
```

## Canvas 渲染策略

- 使用 `requestAnimationFrame` 实现 60fps 动画
- 波形使用 Canvas 2D API 直接绘制
- 星座图点使用 `fillRect`/`arc` 绘制
- 响应式 Canvas 尺寸调整（`setupCanvas` 工具函数处理 DPR）

## 性能优化

- Zustand 选择性订阅避免不必要渲染
- Canvas 绘制使用 `useEffect` + `useRef` 管理
- 动画状态（time）单独管理
- 使用 `createPortal` 处理弹层（TermNote）避免父容器裁剪
- KaTeX 公式异步渲染，通过逐批调度避免阻塞主线程
