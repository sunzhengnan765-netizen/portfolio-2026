import Reveal from "./Reveal";

/**
 * Footer —— 参考 fabrica.framer.media 三段式布局
 * 上半：2 列网格（导航链接 + 社交链接，纯文本）
 * 下半：版权条（border-top）
 */
const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/sunzhengnan765-netizen" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-white/15 bg-ink px-6 pb-10 pt-16 md:px-[9vw] md:pt-24">
      {/* 上半：导航 + 社交 */}
      <Reveal delay={0}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr] md:gap-[clamp(40px,6vw,100px)]">
          {/* 左列：导航 */}
          <div className="flex flex-col gap-4">
            <span className="mb-2 text-[12px] tracking-[0.08em] text-white/40">Explore</span>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[14px] tracking-[0.01em] text-white/60 no-underline transition-colors duration-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* 右列：社交 */}
          <div className="flex flex-col gap-4">
            <span className="mb-2 text-[12px] tracking-[0.08em] text-white/40">Follow</span>
            {socialLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] tracking-[0.01em] text-white/60 no-underline transition-colors duration-300 hover:text-white"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 下半：版权条 */}
      <Reveal delay={0.1}>
        <div className="mt-16 border-t border-white/15 pt-6 text-[12px] tracking-[0.02em] text-white/40 md:mt-24">
          © 2026 Ethan Sun. All rights reserved.
        </div>
      </Reveal>
    </footer>
  );
}
