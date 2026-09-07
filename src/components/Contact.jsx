import { useState } from "react";

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
      try {
        navigator.clipboard.writeText(row.copy);
      } catch {
        // 沙箱里 clipboard API 可能不可用 — 静默失败
      }
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
      className="group flex w-full items-baseline justify-between gap-6 border-b border-white/10 py-3 text-left text-white/60 no-underline transition-[color,padding-left] duration-300 ease-out hover:pl-2 hover:text-white"
    >
      <span className="text-[clamp(12px,0.95vw,14px)] tracking-[0.05em] text-white/45">
        {row.label}
      </span>
      <b className="min-w-0 break-all text-right text-[clamp(14px,1.1vw,17px)] font-normal tracking-[0.01em] text-white/90">
        {copied ? "Copied ✓" : row.value}
      </b>
    </Tag>
  );
}

/**
 * Contact 区块 — 左侧：头像 + 姓名 + 三行联系方式（Email/Phone/Wechat）
 *            右侧：大标题 + subtitle
 * 整段沿用 Ethan 原版 nyro-contact 视觉，移动端单列堆叠。
 */
export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto flex min-h-screen max-w-[1200px] w-full flex-col justify-center px-6 py-20 md:px-[5vw] md:py-16"
    >
      <div className="grid grid-cols-1 gap-12 text-white md:grid-cols-[minmax(260px,0.42fr)_1fr] md:items-center md:gap-[clamp(40px,6vw,110px)]">
        {/* 左侧 — 头像 + 联系方式 */}
        <div className="flex flex-col gap-9">
          {/* Profile */}
          <div className="flex items-center gap-4">
            <img
              src="/pages/avatar.jpg"
              alt="Ethan Sun"
              className="h-[60px] w-[60px] flex-shrink-0 rounded-full object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
              style={{ objectPosition: "50% 32%" }}
            />
            <div className="flex min-w-0 flex-col gap-0.5">
              <b className="text-[clamp(17px,1.4vw,21px)] font-medium tracking-[-0.01em] text-white">
                Ethan Sun
              </b>
              <small className="text-[clamp(12px,0.95vw,14px)] tracking-[0.02em] text-white/50">
                UX/UI Designer
              </small>
            </div>
          </div>

          {/* Contact list */}
          <div className="flex flex-col gap-[18px]">
            <h3 className="m-0 mb-1 text-[clamp(12px,1vw,14px)] font-normal uppercase tracking-[0.1em] text-white/50">
              Contact me
            </h3>
            {contactRows.map((row) => (
              <ContactRow key={row.label} row={row} />
            ))}
          </div>
        </div>

        {/* 右侧 — 大标题 + subtitle（移动端居中 / PC 右对齐） */}
        <div className="pb-2 text-center md:text-right">
          <h2 className="m-0 font-sans text-[clamp(36px,5.5vw,72px)] font-normal leading-[0.95] tracking-[-0.06em] text-white">
            Hardcore Vibe Coder
          </h2>
          <p className="mt-6 whitespace-nowrap text-[clamp(14px,1.1vw,17px)] leading-[1.55] tracking-[0.01em] text-white/55 max-md:whitespace-normal">
            Available for new opportunities — let&rsquo;s create something
            meaningful together.
          </p>
        </div>
      </div>
    </section>
  );
}
