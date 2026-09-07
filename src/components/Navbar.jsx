/**
 * Capsule navigation — 胶囊导航栏
 * 左侧：圆形头像 + 名字
 * 右侧：Work / Projects / Resume 链接
 * position: fixed, top: 24px, 水平居中
 */
export default function Navbar() {
  const navLinks = [
    { label: "Work", href: "#projects" },
    { label: "Projects", href: "#projects" },
    { label: "Resume", href: "#contact" },
  ];

  return (
    <nav
      aria-label="Primary"
      className="intro-fade fixed left-1/2 top-6 z-50 flex w-max -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1.5 backdrop-blur-[5px] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_4px_20px_rgba(0,0,0,0.4)]"
    >
      {/* 左侧 — 头像 + 名字 */}
      <a
        href="#home"
        className="flex items-center gap-2 pr-2 no-underline transition-opacity hover:opacity-80"
      >
        <img
          src="/pages/avatar.jpg"
          alt="Ethan Sun"
          className="h-[32px] w-[32px] flex-shrink-0 rounded-full object-cover"
          style={{ objectPosition: "50% 32%" }}
        />
        <span className="text-[14px] font-semibold tracking-tight text-white">
          Ethan Sun
        </span>
      </a>

      {/* 分隔点 */}
      <span className="h-4 w-px bg-white/20" />

      {/* 右侧 — 导航链接 */}
      <div className="flex items-center gap-0.5">
        {navLinks.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            className={`rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight text-white/80 no-underline transition-colors hover:bg-white/10 hover:text-white ${
              i === navLinks.length - 1 ? "pr-3" : ""
            }`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
