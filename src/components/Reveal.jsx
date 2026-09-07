import { useEffect, useRef, useState } from "react";

/**
 * 视口进入动画 — 参考 fabrica.framer.media：
 * 内容进入视口时 opacity + translateY 淡入上移，一次性播放。
 * rootMargin -35%：内容升起约三分之一视口时触发，保证动画播放过程肉眼可见。
 * zoom：图片整屏页变体，叠加缩放浮现。
 */
export default function Reveal({ children, delay = 0, className = "", zoom = false }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -35% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-block ${zoom ? "reveal-zoom" : ""} ${
        inView ? "is-inview" : ""
      } ${className}`}
      style={{ "--reveal-delay": `${delay}s` }}
    >
      {children}
    </div>
  );
}
