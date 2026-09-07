/**
 * 200×200 液态玻璃卡（带 1.4px 锐利渐变边框）。
 * Ethan 极光风格版本：内容用作品集语言。
 * 视觉定义在 src/index.css 的 .glass-card（@layer components）。
 */
export default function GlassCard() {
  return (
    <div
      className="glass-card z-20 flex flex-col items-center justify-center px-5 py-6 text-center
                 -translate-y-[50px]"
    >
      <span className="mb-2 text-[14px] tracking-widest text-white/80">
        [ 2026 ]
      </span>
      <p className="text-[18px] font-medium leading-tight text-white">
        Design that ships
        <br />
        <span className="font-serif italic text-white/95">real</span> impact
      </p>
      <p className="mt-3 text-[11px] leading-snug text-white/60">
        B2G systems · AI music · e-commerce visuals
      </p>
    </div>
  );
}
