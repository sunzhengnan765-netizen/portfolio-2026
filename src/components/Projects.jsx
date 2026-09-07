import { useState } from "react";
import Reveal from "./Reveal";

/**
 * Projects —— 参考 fabrica.framer.media Services 的手风琴交互
 * - 标准手风琴：同时只展开一行
 * - 展开动画：max-height + opacity + translateY（纯 CSS transition）
 * - 展开态右侧图标：减号 −；折叠态：加号 +
 * - 保留详情页入口：展开内容底部「查看完整项目 →」
 */
const projects = [
  {
    num: "01",
    name: ["乔司监狱", "视觉 AI 安防系统"],
    desc: "B2G 实习项目，负责视觉 AI 安防系统的交互与界面设计，从需求梳理到界面落地",
    period: "2025.12 ～ 2026.02 · 19 pages",
    tags: ["B2G", "AI 安防", "交互设计", "界面落地"],
    thumbs: [
      "/pages/qiaosi-preview-1.jpg",
      "/pages/qiaosi-preview-2.jpg",
      "/pages/qiaosi-preview-3.jpg",
    ],
    href: "/project-qiaosi.html",
  },
  {
    num: "02",
    name: ["汽水音乐", "AI 混合电台"],
    desc: "C 端个人项目，围绕 AI 个性化电台探索推荐、播放与情绪感知的体验闭环",
    period: "2026.08 ～ 2026.09 · 14 pages",
    tags: ["C 端", "AI 推荐", "情绪感知", "体验闭环"],
    thumbs: [
      "/pages/qishui-preview-1.jpg",
      "/pages/qishui-preview-2.jpg",
      "/pages/qishui-preview-3.jpg",
    ],
    href: "/project-qishui.html",
  },
  {
    num: "03",
    name: ["百度优选", "省心选活动 KV"],
    desc: "C 端电商项目，负责活动主视觉 KV 与系列延展，把控从草图到上线的整体视觉节奏",
    period: "2026.03 · 3 pages",
    tags: ["电商", "活动 KV", "视觉延展", "主视觉"],
    thumbs: [
      "/pages/baidu-preview-1.jpg",
      "/pages/baidu-preview-2.jpg",
      "/pages/baidu-preview-3.jpg",
    ],
    href: "/project-baidu.html",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="projects"
      className="relative w-full bg-ink px-6 py-20 md:px-[9vw] md:py-24"
    >
      {/* 顶部 eyebrow + 描述 */}
      <Reveal className="mb-10" delay={0}>
        <div className="flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-start md:gap-[30px]">
          <h2 className="m-0 text-[12px] font-normal uppercase tracking-[0.12em] text-white/55">
            ✣ Project
          </h2>
          <p className="m-0 whitespace-nowrap text-right font-sans text-[clamp(15px,1.6vw,22px)] font-normal leading-[1.18] tracking-[-0.03em] text-white md:max-w-none">
            B2G / C 端 / 电商项目，从策略到落地的完整记录
          </p>
        </div>
      </Reveal>

      {/* 手风琴列表 */}
      <Reveal delay={0.15}>
        <div className="border-t border-white/20">
        {projects.map((p, i) => {
          const isOpen = activeIndex === i;
          return (
            <div
              key={p.num}
              className="project-row border-b border-white/20 py-4"
              data-open={isOpen}
            >
              {/* 触发行 */}
              <button
                type="button"
                onClick={() => setActiveIndex(isOpen ? -1 : i)}
                className="project-trigger group flex w-full items-center gap-4 bg-transparent py-8 text-left text-white no-underline transition-colors duration-300 hover:bg-white/[0.02] md:py-9"
                aria-expanded={isOpen}
              >
                {/* 编号 */}
                <span className="w-[52px] flex-shrink-0 text-[12px] tracking-[0.08em] text-white/50 transition-colors duration-300 group-hover:text-white/80 md:w-[64px]">
                  — {p.num}
                </span>

                {/* 项目名 + period（桌面端 period 跟项目名同行） */}
                <span className="flex-1 font-sans text-[clamp(26px,3.4vw,52px)] font-normal leading-[1.05] tracking-[-0.05em]">
                  {p.name[0]}
                  <br />
                  <span className="text-white/75">{p.name[1]}</span>
                </span>

                {/* 右侧：时间 + 图标（桌面端） */}
                <span className="hidden items-center gap-5 md:flex">
                  <span className="text-right text-[13px] leading-[1.5] text-white/35">
                    {p.period.replace(/\s*·\s*\d+\s*pages?$/i, "")}
                  </span>
                  {/* 展开/折叠图标 */}
                  <span className={`accordion-icon flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/[0.04] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "rotate-90" : ""}`}>
                    <span className="relative block h-[2px] w-[16px] bg-white/80">
                      {/* 竖线，仅折叠态可见 */}
                      <span className={`absolute left-1/2 top-1/2 block h-[16px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-white/80 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
                    </span>
                  </span>
                </span>

                {/* 移动端图标 */}
                <span className={`accordion-icon-mobile flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/30 transition-transform duration-500 md:hidden ${isOpen ? "rotate-90" : ""}`}>
                  <span className="relative block h-[1.5px] w-[12px] bg-white/80">
                    <span className={`absolute left-1/2 top-1/2 block h-[12px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-white/80 transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
                  </span>
                </span>
              </button>

              {/* 展开内容 */}
              <div className={`project-content ${isOpen ? "is-open" : ""}`}>
                <div className="project-content-inner">
                  {/* 缩略图 — 移动端横向可滚动窄卡片，桌面端固定尺寸 */}
                  <div className="mb-6 flex gap-3 overflow-x-auto pb-1 md:overflow-visible">
                    {p.thumbs.map((src, ti) => (
                      <div
                        key={ti}
                        className="aspect-video w-[70vw] flex-shrink-0 overflow-hidden rounded-xl bg-white/5 md:h-[120px] md:w-[220px]"
                      >
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* 描述（桌面端 + 移动端都显示） */}
                  <p className="mb-5 text-[13px] leading-[1.6] text-white/60">
                    {p.desc}
                  </p>

                  {/* 标签 */}
                  <div className="mb-7 flex flex-wrap gap-2">
                    {p.tags.map((tag, tgi) => (
                      <span
                        key={tgi}
                        className="rounded-full border border-white/20 bg-white/[0.04] px-3 py-1.5 text-[12px] text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* 查看完整项目 */}
                  <a
                    href={p.href}
                    className="inline-flex items-center gap-2 text-[13px] tracking-[0.02em] text-white/90 transition-colors hover:text-white"
                  >
                    查看完整项目
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </Reveal>
    </section>
  );
}
