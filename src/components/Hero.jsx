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

  // 检测 CSS transition 是否工作
  useEffect(() => {
    let t1;
    t1 = setTimeout(async () => {
      setRevealed(true);
      document.body.classList.add("hero-revealed");
      const works = await supportsTransition();
      if (!works) document.body.classList.add("no-csstransition");
    }, 100);
    return () => {
      clearTimeout(t1);
      document.body.classList.remove("hero-revealed");
      document.body.classList.remove("no-csstransition");
    };
  }, []);

  function supportsTransition() {
    return new Promise((resolve) => {
      const el = document.createElement("div");
      el.style.cssText = "position:absolute;opacity:0;transition:opacity 10ms;left:-9999px;";
      document.body.appendChild(el);
      void el.offsetHeight;
      el.style.opacity = "1";
      setTimeout(() => {
        resolve(getComputedStyle(el).opacity === "1");
        document.body.removeChild(el);
      }, 50);
    });
  }

  // 滚动视差 — 仅 Hero 可见时更新，性能友好
  useEffect(() => {
    let timer = null;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      timer = setTimeout(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          // 只在 Hero 顶部还在视口内时才更新（0 ~ viewportHeight）
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            setScrollY(window.scrollY);
          }
        }
        ticking = false;
      }, 16);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
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
            <p className="m-0 font-sans text-[12px] font-medium tracking-[0.12em] text-white/90 md:text-[13px]">
              Vibe coding
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* 底部：优势一句话 + 大标题 + 中文名/过往公司 — 0.15x 视差 */}
        <div
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12"
          style={{ transform: `translate3d(0, ${-titleParallax}px, 0)` }}
        >
          <div className="flex flex-col gap-4 md:gap-5">
            <p className="intro-fade m-0 font-display text-[clamp(15px,1.7vw,22px)] font-medium tracking-[0.02em] text-white/95">
              深入业务的 B端/C端全链路设计师
            </p>
            <h1 className="hero-title m-0 whitespace-nowrap font-display text-[clamp(44px,7.5vw,150px)] font-medium leading-[0.95] tracking-[-0.03em] text-white">
              Ethan—sun
            </h1>
            <p className="intro-fade m-0 font-sans text-[13px] tracking-[0.04em] md:text-[14px]">
              <span className="text-white/50">中文名：</span>
              <span className="text-white/90">孙正男</span>
              <span className="mx-2 text-white/35">·</span>
              <span className="text-white/50">过往公司：</span>
              <span className="text-white/90">百度 / 联汇科技</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
