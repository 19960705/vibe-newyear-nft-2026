# 🐉 Vibe 年神兽 (Vibe New Year NFT)

> **Build on Sui · Build the Vibe**
>
> 🏆 **2026 Sui Vibe Hackathon 参赛作品**

![Vibe New Year NFT Preview](https://vibe-newyear-nft.vercel.app/assets/beasts/dragon.png)

## 🌊 项目简介 | Overview

**Vibe 年神兽** 是一款结合了 **AI 艺术生成** 与 **Sui 区块链技术** 的 2026 新年限量版 NFT 互动应用。

我们为 2026 丙午年（赤马年）创作了 12 只采用 **3D 萌系潮玩风格（Pop Mart Style）** 的守护生肖。用户可以通过“唤醒、注入、缔结”三部曲，召唤出属于自己的链上守护灵，并获得由 AI 深度定制的神话寓意批命。

**🔗 立即体验**: [vibe-newyear-nft.vercel.app](https://vibe-newyear-nft.vercel.app)

---

## ✨ 核心特性 | Key Features

### 1. 🎨 3D 萌系潮玩艺术 (Pop Mart Style Art)
拒绝平庸的 2D 平面，我们利用顶级 AI 模型生成了一套极具质感的 3D 树脂材质生肖形象。细腻的光影渲染与 Q 版造型，完美适配 Web3 社交头像。

### 2. 🪄 AI 灵启寓意引擎 (AI-Powered Divination)
每一只神兽不仅有其形，更有其魂。接入 **DeepSeek-V3** 模型，根据用户的姓名、选定的灵气颜色与 2026 丙午年运势，实时生成一段极具文学底蕴的独特寓意。

### 3. 🖱️ 沉浸式交互 Vibe (Immersive UX)
*   **3D 视差倾斜**: 卡片随鼠标指针产生 3D 偏移，如实物在手。
*   **全息扫光动效**: 模拟镭射卡纸的高级反光质感。
*   **动态极光背景**: 针对“彩虹”属性，实现了平滑流动的背景渐变动画。

### 4. 🪙 Sui 链上原生契约 (Sui On-chain Contract)
*   **Move 2024 标准**: 采用最新的 Sui Move 语法编写智能合约。
*   **Display 标准集成**: 铸造成功后，NFT 图片可在所有兼容 Sui 的钱包（Sui Wallet, OKX 等）中完美渲染。
*   **测试网丝滑体验**: 全流程已在 Sui Testnet 跑通。

---

## 🛠️ 技术架构 | Tech Stack

*   **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
*   **Blockchain**: Sui SDK (`@mysten/sui`, `@mysten/dapp-kit`), `@tanstack/react-query`
*   **AI Integration**: Anyrouter (DeepSeek-V3), Gemini (Image Design)
*   **Hosting**: Vercel

---

## 🤖 AI 使用披露 | AI Usage Disclosure

根据赛事要求，本项目在开发过程中深度利用了 AI 技术：

1.  **代码辅助**: 使用 **OpenClaw** 与 **Claude 3.5 Sonnet / Gemini 2.0 Flash** 辅助编写 React 组件逻辑、Sui 合约结构及 UI 动效。
2.  **图像创作**: 
    *   **工具**: Gemini
    *   **Prompt 策略**: `Chibi 3D cute [Zodiac], Pop Mart style, high-quality resin material, glossy finish, soft studio lighting, vibrant colors, 4k render.`
3.  **文案生成**: 
    *   **工具**: Anyrouter (DeepSeek-V3)
    *   **Prompt**: 模拟一位精通神话的占卜专家，为 2026 丙午马年生成玄妙且温情的解读。

---

## 🚀 快速启动 | Quick Start

### 1. 克隆项目
```bash
git clone https://github.com/19960705/vibe-newyear-nft-2026.git
cd vibe-newyear-nft-2026
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量
在根目录创建 `.env` 文件：
```env
VITE_ANYROUTER_API_KEY=你的_API_KEY
VITE_AI_MODEL=deepseek/deepseek-chat
```

### 4. 本地开发
```bash
npm run dev
```

---

## 📂 目录结构 | Folder Structure

```text
vibe-newyear-nft/
├── move/                # Sui Move 智能合约
├── public/assets/       # 高清 3D 神兽资源
├── src/
│   ├── components/      # UI 组件
│   ├── pages/           # Generator 与 Gallery 核心页面
│   ├── services/        # AI 与 Sui 交互服务
│   └── types.ts         # TypeScript 类型定义
└── tailwind.config.js   # 动效与主题配置
```

---

## 🤝 参赛信息

*   **赛道**: Sui Tech Stack (Track 3)
*   **开发者**: Jinny Lee
*   **理念**: 用 AI 赋能创意，用 Sui 记录 Vibe。

---

© 2026 Vibe New Year NFT Project. Built with ❤️ for Sui Vibe Hackathon.
