import { useState } from "react";
import Reveal from "./Reveal";

const contactRows = [
  { label: "Email", value: "zstu_1225@163.com", href: "mailto:zstu_1225@163.com", copy: null },
  { label: "Phone", value: "19818968846", href: "tel:19818968846", copy: null },
  { label: "Wechat", value: "Ethan_sun12", href: null, copy: "Ethan_sun12" },
];

function ContactRow({ row }) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e) => {
    if (row.copy) {
      e.preventDefault();
      try { navigator.clipboard.writeText(row.copy); } catch {}
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const Tag = row.href ? "a" : "button";
  const extraProps = row.href ? { href: row.href } : { type: "button" };

  return (
    <Tag
      {...extraProps}
      onClick={handleClick}
      className="group flex w-full items-baseline justify-between gap-6 border-b border-white/10 py-3 text-left text-white/55 no-underline transition-[color,padding-left] duration-300 ease-out hover:pl-2 hover:text-white"
    >
      <span className="text-[12px] tracking-[0.08em] text-white/40">
        {row.label}
      </span>
      <span className="text-[14px] tracking-[0.01em] text-white/85">
        {copied ? "Copied ✓" : row.value}
      </span>
    </Tag>
  );
}

/**
 * Contact —— 参考 fabrica.framer.media Let's talk. 布局
 * 双列网格：左列联系方式列表 + 右列超大标题 + mailto CTA
 * 保持深色背景不变，复刻排版结构和交互
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full bg-ink px-6 py-24 md:px-[9vw] md:py-32"
    >
      {/* 主双列 */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.7fr_1fr] md:gap-[clamp(40px,6vw,100px)]">
        {/* 左列：联系方式 + 个人信息 */}
        <Reveal delay={0}>
          <div className="flex flex-col gap-10">
            {/* 个人信息 */}
            <div className="flex items-center gap-4">
              <img
                src="/pages/avatar.jpg"
                alt="Ethan Sun"
                className="h-[60px] w-[60px] flex-shrink-0 rounded-full object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                style={{ objectPosition: "50% 32%" }}
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-medium tracking-[-0.01em] text-white">
                  Ethan Sun
                </span>
                <span className="text-[12px] tracking-[0.02em] text-white/45">
                  UX/UI Designer · 中国
                </span>
              </div>
            </div>

            {/* 联系方式列表 */}
            <div className="flex flex-col">
              {contactRows.map((row) => (
                <ContactRow key={row.label} row={row} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* 右列：超大标题 + CTA */}
        <Reveal delay={0.15}>
          <div className="flex flex-col gap-8">
            <h2
              className="m-0 font-sans text-[clamp(48px,7vw,99px)] font-semibold leading-[0.92] tracking-[-0.06em] text-white"
              style={{ letterSpacing: "-0.06em" }}
            >
              Let&rsquo;s talk<span className="text-white/40">.</span>
            </h2>

            <p className="max-w-[420px] text-[14px] leading-[1.6] text-white/55">
              Hardcore Vibe Coder — Available for new opportunities. Quick response, clear next steps, and something meaningful to build together.
            </p>

            {/* fabrica 风格 Send Message 按钮（mailto 链接） */}
            <a
              href="mailto:zstu_1225@163.com"
              className="mt-2 inline-flex h-[56px] w-fit items-center rounded-[50px] bg-white px-8 text-[12px] font-normal tracking-[0.02em] text-black no-underline transition-transform duration-300 hover:scale-[1.03]"
            >
              Send Message →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
