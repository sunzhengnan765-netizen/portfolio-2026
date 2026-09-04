# Ethan UX Portfolio 2026

Ethan 2026 年 UX/UI 作品集，纯 HTML + CSS + 原生 JS 实现。

## 项目结构
- `index.html` — 主入口
- `pages/` — 各页面静态图（38 张）
- `loading-demo.mp4` / `loading-demo.gif` — 加载动效
- `page-23-bg.jpg` / `page-35-bg.jpg` / `page-38-bg.jpg` / `page-39-bg.jpg` — 特殊页背景

## 本地预览
```bash
cd portfolio-2026
python3 -m http.server 8765
# 访问 http://localhost:8765
```

## Cloudflare Pages 部署
1. 登录 https://dash.cloudflare.com
2. Workers & Pages → Create application → Pages → Connect to Git
3. 选择 `sunzhengnan765-netizen/portfolio-2026` 仓库
4. Build settings:
   - Framework preset: None
   - Build command: 留空
   - Build output: `/`（根目录）
5. Save and Deploy

## 导航
- 翻页：`J` / `K` 键，或滚动
- 跳转：点击页码 `#p1`...`#p39`
- 项目首页：
  - 乔司监狱 → `#p4`
  - 汽水音乐 → `#p23`
  - 百度优选 → `#p37`
- 上一项目/下一项目 自动定位到项目首页
