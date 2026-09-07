import { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";

/**
 * Hero 区段 — 参考 fabrica.framer.media 黑场开屏
 * 核心差异（vs 上一版本）：
 *  1. 无独立 overlay 遮罩 — 靠 body bg-ink(#070b0a) 自身充当"黑场"
 *  2. 标题整段 translateY(640px) → 0 + fade in（2.1s, ease [0.56,0.22,0.05,0.99]）
 *  3. revealed 在 t=0 立即挂到 section — 动画由 CSS transition-delay 精确编排
 *  4. 保留：绿色块展开（原创设计，fabrica 没有）
 *
 * 时间线：
 *   t=0     revealed class 挂载 → 标题开始 2.1s 上移（此时 body 深色 = 黑场）
 *   t≈1s    绿色块开始展开（delay 1s）
 *   t≈1.2s  极光 + 视频 + hue 层开始淡入（delay 1.2s）
 *   t≈1.5s  导航 + 信息带开始淡入（delay 1.5s）
 */
export default function Hero() {
  // t=0 立即 revealed — 动画全靠 CSS transition-delay 编排
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // 关键帧：revealed 先 false 一帧（让初始 opacity/transform 生效），
    // 下一帧再 true，确保 CSS transition 能捕获状态变化
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="home"
      className={`relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink ${
        revealed ? "hero-revealed" : ""
      }`}
    >
      <VideoBackground />

      {/* 左侧 → 透明 渐变 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-ink to-transparent"
      />
      {/* 底部向上 渐变 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
      />

      {/* 中央顶部椭圆光晕 */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2"
        width="1100"
        height="420"
        viewBox="0 0 1100 420"
        fill="none"
      >
        <defs>
          <filter
            id="esGlow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
          >
            <feGaussianBlur stdDeviation="25" />
          </filter>
          <radialGradient id="esGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5ed29c" stopOpacity="0.4" />
            <stop offset="35%" stopColor="#22d3ee" stopOpacity="0.14" />
            <stop offset="70%" stopColor="#134e39" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#070b0a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="550"
          cy="60"
          rx="520"
          ry="120"
          fill="url(#esGlowGrad)"
          filter="url(#esGlow)"
        />
      </svg>

      {/* 文字布局 */}
      <div className="absolute inset-0 z-20 flex flex-col px-6 pb-10 md:px-10 md:pb-12">
        <div className="flex-1" />

        {/* 中部信息带 — intro-fade 延迟淡入 */}
        <div className="intro-fade flex items-center justify-between gap-6">
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {[
              { label: "01/简历Resume", href: "#resume" },
              { label: "02/项目Project", href: "#projects" },
              { label: "03/联系contact", href: "#contact" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-sans text-[14px] font-medium tracking-[0.04em] text-white/90 transition-colors duration-200 hover:text-accent md:text-[15px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-10 md:gap-16">
            <p className="m-0 flex items-center gap-3 font-sans text-[12px] font-medium tracking-[0.12em] text-white/90 md:text-[13px]">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Vibe coding
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* 底部：标题整段上移 + 绿色块展开 */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
          <h1 className="hero-title m-0 whitespace-nowrap font-display text-[clamp(44px,7.5vw,150px)] font-medium leading-[0.95] tracking-[-0.03em] text-white">
            Ethan—sun
            <span
              aria-hidden="true"
              className="hero-block ml-[0.08em] inline-block h-[0.13em] w-[0.6em] bg-accent"
            />
          </h1>
        </div>
      </div>
    </section>
  );
}
