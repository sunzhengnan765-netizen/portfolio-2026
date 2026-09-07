import VideoBackground from "./VideoBackground";

/**
 * Hero 区段叠加顺序（z 自下而上）：
 *  0  极光 PNG 兜底层 + HLS 视频（VideoBackground 内部）+ 绿色 hue 统一层
 * 10  左侧暗渐变 + 底部暗渐变
 * 10  中央顶部椭圆光晕（cyan/暗绿色调，25px Gaussian blur）
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink"
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

      {/* 中央顶部椭圆光晕（cyan/暗绿色调，25px Gaussian blur — 原 CodeNest spec 版式） */}
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

      {/* 文字布局 — 参考 davies home-tunnel：
          左中 01/02/03 锚点列表 · 右中绿点状态 + © 2026
          左下超大字标 + 绿色下划块 · 右下段落 + 描边按钮 */}
      <div className="absolute inset-0 z-20 flex flex-col px-6 pb-10 md:px-10 md:pb-12">
        <div className="flex-1" />

        {/* 中部信息带 */}
        <div className="flex items-center justify-between gap-6">
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

        {/* 底部信息带 */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
          <h1 className="m-0 whitespace-nowrap font-display text-[clamp(44px,7.5vw,150px)] font-medium leading-[0.95] tracking-[-0.03em] text-white">
            ETHAN SUN
            <span
              aria-hidden="true"
              className="ml-[0.08em] inline-block h-[0.13em] w-[0.6em] bg-accent"
            />
          </h1>
        </div>
      </div>
    </section>
  );
}
