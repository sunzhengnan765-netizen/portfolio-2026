import { useEffect, useRef, useState } from "react";
import VideoBackground from "./VideoBackground";

/**
 * Hero 区段 — 参考 fabrica.framer.media
 * 滚动效果：视频/背景 0.3x 视差，标题 0.15x 视差，形成层次
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // 入场动画触发
  useEffect(() => {
    let raf1, raf2;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setRevealed(true);
        document.body.classList.add("hero-revealed");
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      document.body.classList.remove("hero-revealed");
    };
  }, []);

  // 滚动视差 — 仅 Hero 可见时更新，性能友好
  useEffect(() => {
    let raf = null;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          // 只在 Hero 顶部还在视口内时才更新（0 ~ viewportHeight）
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            setScrollY(window.scrollY);
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // 视差变换值（scrollY * 系数，负号 = 向上移动比页面慢）
  const bgParallax = scrollY * 0.3;   // 视频/极光：最慢
  const titleParallax = scrollY * 0.15; // 标题：中等

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-ink ${
        revealed ? "hero-revealed" : ""
      }`}
    >
      {/* 视频 + 极光背景 — 0.3x 视差（比页面慢） */}
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${-bgParallax}px, 0)` }}
      >
        <VideoBackground />
      </div>

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

      {/* 中央顶部椭圆光晕 — 0.5x 视差 */}
      <svg
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute left-1/2 top-0 z-10"
        width="1100"
        height="420"
        viewBox="0 0 1100 420"
        fill="none"
        style={{ transform: `translate3d(-50%, ${-scrollY * 0.5}px, 0)` }}
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
        <div className="intro-fade flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-6">
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {[
              { label: "01/简历Resume", href: "#resume" },
              { label: "02/项目Project", href: "#projects" },
              { label: "03/联系contact", href: "#contact" },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-sans text-[13px] font-medium tracking-[0.04em] text-white/90 transition-colors duration-200 hover:text-accent md:text-[15px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex md:items-center md:gap-16">
            <p className="m-0 flex items-center gap-3 font-sans text-[12px] font-medium tracking-[0.12em] text-white/90 md:text-[13px]">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Vibe coding
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* 底部：标题整段上移 + 绿色块展开 — 0.15x 视差 */}
        <div
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12"
          style={{ transform: `translate3d(0, ${-titleParallax}px, 0)` }}
        >
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
