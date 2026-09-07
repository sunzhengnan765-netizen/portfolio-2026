const projects = [
  {
    num: "01",
    name: ["乔司监狱", "视觉 AI 安防系统"],
    meta: "B2G 实习项目，负责视觉 AI 安防系统的交互与界面设计，从需求梳理到界面落地",
    period: "2025.12 ～ 2026.02 · 19 pages",
    href: "/project-qiaosi.html",
  },
  {
    num: "02",
    name: ["汽水音乐", "AI 混合电台"],
    meta: "C 端个人项目，围绕 AI 个性化电台探索推荐、播放与情绪感知的体验闭环",
    period: "2026.08 ～ 2026.09 · 14 pages",
    href: "/project-qishui.html",
  },
  {
    num: "03",
    name: ["百度优选", "省心选活动 KV"],
    meta: "C 端电商项目，负责活动主视觉 KV 与系列延展，把控从草图到上线的整体视觉节奏",
    period: "2026.03 · 3 pages",
    href: "/project-baidu.html",
  },
];

/**
 * Projects 列表 — 沿用 Ethan 原版的 dir-list 风格（横向 2 列布局：项目名 + meta），
 * 桌面端宽距，移动端单列堆叠。每个项目行是 `<a>` 整行可点击。
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative flex min-h-screen w-full flex-col justify-center px-6 py-20 md:px-[9vw] md:py-16"
    >
      {/* 顶部 eyebrow + 描述 */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-start md:gap-[30px]">
        <h2 className="m-0 text-[12px] font-normal uppercase tracking-[0.12em] text-white/55">
          ✣ Project
        </h2>
        <p className="m-0 whitespace-nowrap text-right font-sans text-[clamp(15px,1.6vw,22px)] font-normal leading-[1.18] tracking-[-0.03em] text-white md:max-w-none">
          B2G / C 端 / 电商项目，从策略到落地的完整记录
        </p>
      </div>

      {/* dir-list */}
      <ul className="m-0 list-none border-t border-white/20 p-0">
        {projects.map((p) => (
          <li key={p.num} className="border-b border-white/20">
            <a
              href={p.href}
              className="group relative grid grid-cols-1 items-start gap-4 py-8 text-white no-underline transition-colors duration-300 hover:text-white md:grid-cols-[1fr_1.4fr] md:gap-[60px] md:py-9"
            >
              {/* 编号 — 绝对定位左上，移动端相对 */}
              <span className="block text-[12px] tracking-[0.05em] text-white/50 transition-colors duration-300 group-hover:text-white/80 md:absolute md:left-0 md:top-[38px]">
                — {p.num}
              </span>

              {/* 项目名 */}
              <span
                className="relative block pl-0 text-left font-sans text-[clamp(28px,3.6vw,56px)] font-normal leading-[1.05] tracking-[-0.05em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 md:pl-[60px]"
                style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
              >
                {p.name[0]}
                <br />
                {p.name[1]}
              </span>

              {/* meta — 描述 + 时间 */}
              <span className="block pt-0 text-right font-sans text-[clamp(13px,1.05vw,16px)] leading-[1.5] tracking-[0.01em] text-white/60 md:pt-[14px]">
                {p.meta}
                <br />
                <span className="mt-1 inline-block text-white/40">
                  {p.period}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
