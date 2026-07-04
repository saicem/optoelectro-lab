# 部署方案

## GitHub Pages 自动部署

使用 GitHub Actions 实现推送 `main` 分支后自动构建并部署到 GitHub Pages。

### 工作流配置

- **配置文件**: `.github/workflows/deploy.yml`
- **触发条件**: push 到 `main` 分支，或手动触发 (`workflow_dispatch`)
- **构建环境**: Ubuntu latest + Node.js 24 + pnpm 11

### 部署流程

```
Push to main → Checkout → Install pnpm → Install deps → Build → Create .nojekyll → Upload artifact → Deploy to Pages
```

### 构建说明

- 使用 `pnpm build`（TypeScript 编译 + Vite 构建）
- 构建产物位于 `dist/` 目录
- 部署前创建 `dist/.nojekyll` 文件，确保 GitHub Pages 正确处理不带 `.html` 扩展名的路径
- 所有页面静态 import 到单个 JS bundle

### Vite 配置

- `base: '/optoelectro-lab/'` 适配 GitHub Pages 子路径
- `HashRouter` 无需服务端 URL 重写
- `cssCodeSplit: false` 产生单个 CSS 文件
- `manualChunks: undefined` 无代码分割

### 仓库设置

GitHub 仓库 Settings → Pages → Source 选择 **GitHub Actions**。
