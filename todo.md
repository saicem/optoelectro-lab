# 光通信调制实验室 - 项目优化待办清单

## 📁 文件结构优化

### 高优先级
- [ ] **统一 Playground 页面目录**：将 `src/pages/` 根目录下的 `InterferencePage.tsx`、`MZModulatorPage.tsx`、`IQModulatorPage.tsx`、`PolarizationPage.tsx` 移动到 `src/pages/playground/` 目录下，与 `DualPolarizationPage.tsx`、`ReceiverPage.tsx` 保持一致
- [ ] **删除空文件**：删除 `src/pages/Home.tsx`（空组件，无实际用途）
- [ ] **清理冗余路由**：移除 `App.tsx` 中第 46-49 行的旧路径路由（`/interference`、`/mz-modulator`、`/iq-modulator`、`/polarization`），统一使用 `/playground/xxx` 路径

### 中优先级
- [ ] **组件目录整理**：考虑将 `Empty.tsx` 移到 `components/common/` 或删除（确认是否使用）
- [ ] **资源文件清理**：检查 `src/assets/react.svg` 是否使用，未使用则删除

## 🐛 代码质量修复（Lint 错误）

### 高优先级
- [ ] **MathRenderer.tsx**：修复第 35 行未使用的变量 `e`
- [ ] **IQCanvas.tsx**：修复第 280 行未使用的变量 `decodeGap`（删除或使用）
- [ ] **MZCanvas.tsx**：移除第 3 行未使用的导入 `mzTransferFunction`
- [ ] **PolarizationCanvas.tsx**：
  - 修复第 120 行未使用的变量 `pointColor`
  - 修复第 293 行 useEffect 缺少依赖 `getStokes` 的警告
- [ ] **useCanvas.ts**：将第 26-27 行的 `let width/height` 改为 `const`
- [ ] **dualPolarizationMath.ts**：修复第 92 行未使用的 `_polRotation` 参数（实现偏振旋转功能或确认设计意图）

### 中优先级
- [ ] **useAnimationFrame.ts**：修复 useEffect 缺少依赖的警告（`options.autoStart`、`start`、`stop`）
- [ ] **运行 lint --fix**：自动修复可自动修复的 lint 问题

## ⚡ 功能完善

### 高优先级
- [ ] **实现双偏振 IQ 调制器的偏振旋转功能**：`calcDPIQ` 函数中的 `polRotation` 参数当前未使用，偏振旋转加热器调节没有实际效果。需要实现真正的偏振旋转计算逻辑
- [ ] **Learn 页面添加 Playground 跳转引导**：在每个 Learn 章节末尾添加"去实验"按钮，跳转到对应的 Playground 页面，形成学习→实践的闭环

### 中优先级
- [ ] **Playground 页面增加原理简述跳转**：在每个 Playground 页面添加"学习原理"按钮，跳转到对应的 Learn 章节
- [ ] **接收器 Playground 增强**：
  - 增加星座点的实时轨迹动画
  - 增加 BER vs SNR 曲线图
  - 增加误差向量幅度 (EVM) 显示
- [ ] **双偏振 IQ Playground 增强**：
  - 增加庞加莱球显示偏振态
  - 增加眼图显示
  - 增加各 MZM 偏置点的自动寻优功能

### 低优先级
- [ ] **增加预设场景**：为各 Playground 增加常用预设（如 QPSK 背靠背、16QAM 最佳偏置等）
- [ ] **增加数据导出功能**：支持导出仿真数据（CSV/JSON 格式）

## 🎨 UI/UX 优化

### 高优先级
- [ ] **移动端导航优化**：当前移动端导航只显示图标，用户体验不佳。考虑：
  - 增加底部导航栏或侧边抽屉
  - 或在图标下方增加文字标签
- [ ] **统一 Playground 页面布局**：各 Playground 页面的 Canvas 容器高度不统一（有的用 `aspect-video`，有的用固定高度），需要统一规范

### 中优先级
- [ ] **增加页面加载骨架屏**：改善首屏和页面切换时的视觉体验
- [ ] **优化控制面板响应式**：在小屏幕上控制面板改为底部抽屉式布局
- [ ] **增加暗色/亮色主题切换**：当前只有暗色主题，可考虑增加亮色模式

### 低优先级
- [ ] **增加动画性能优化**：Canvas 动画可考虑使用 `OffscreenCanvas` 或 Web Worker
- [ ] **增加键盘快捷键支持**：如空格键播放/暂停，R 键重置等

## 📚 内容补充

### 中优先级
- [ ] **Learn 页面增加交互式演示**：在 Learn 页面中嵌入小型交互式演示（如可调参数的简化版 Canvas），让学习更直观
- [ ] **增加章节测验/小问题**：每个 Learn 章节末尾增加 1-2 个小问题，检验学习效果
- [ ] **增加术语表**：添加光通信常用术语的解释页面
- [ ] **增加参考资料链接**：在各章节末尾推荐相关论文、标准或延伸阅读材料

### 低优先级
- [ ] **增加中文/英文双语切换**：支持中英文内容切换
- [ ] **增加公式推导详解**：对重要公式提供更详细的推导过程

## 🔧 工程化改进

### 中优先级
- [ ] **更新项目名称**：`package.json` 中的 `name` 字段 `opto-electronic-visualizer` 可考虑改为更符合"光通信调制实验室"定位的名称
- [ ] **增加单元测试**：为数学工具函数（`dualPolarizationMath.ts`、`modulationMath.ts` 等）添加单元测试
- [ ] **增加 E2E 测试**：使用 Playwright 或 Cypress 进行端到端测试
- [ ] **增加 CI 检查**：在 GitHub Actions 中增加 lint、type check、build 检查

### 低优先级
- [ ] **Bundle 体积优化**：分析并优化构建产物大小
- [ ] **增加 PWA 支持**：支持离线访问和添加到主屏幕
- [ ] **增加错误边界**：添加 React Error Boundary 处理运行时错误

## 🎯 优先级总结

### 立即修复（高优先级）
1. 修复所有 Lint 错误（7 个 error + 2 个 warning）
2. 统一 Playground 页面目录结构
3. 实现双偏振 IQ 调制器的偏振旋转功能
4. 清理冗余路由和空文件

### 近期优化（中优先级）
1. Learn 与 Playground 互相跳转引导
2. 移动端导航优化
3. 统一 Playground 页面布局
4. 增加单元测试

### 长期规划（低优先级）
1. 更多 Playground 交互功能
2. 内容深化与双语支持
3. PWA 与性能优化
4. E2E 测试与 CI/CD 完善
