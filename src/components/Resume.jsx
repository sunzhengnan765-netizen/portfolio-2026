/**
 * Resume 简历组件
 * 从 Figma 导出的 CSS 图层重构为响应式 HTML
 * Figma 原尺寸：1920×1080 | PC 左右双栏 / 移动端上下堆叠
 */

const projects = [
  {
    company: "联汇科技（杭州）",
    sub1: "业务方向：B端AI产品领域",
    role: "岗位：UE设计实习生",
    period: "2025.11~2026.3",
    title: "乔司监狱视觉AI安防系统（B2G）实习项目",
    bullets: [
      "面向乔司监狱夜巡场景，针对民警长时间盯屏、异常确认与上报链路割裂的痛点，确立减负盯屏、提效确认的设计目标。",
      "主导预警大屏与告警详情页信息重构，聚合 AI 识别、视频证据与人员/床铺信息，提升告警真实性研判效率。",
      "设计告警确认、人工校正、上报与处置记录的一体化操作流程，形成可判断、可校正、可追踪的告警处置闭环。",
    ],
  },
  {
    company: "汽水音乐AI混合电台（C端）",
    sub1: "",
    role: "",
    period: "2026.8~2026.9",
    title: "",
    bullets: [
      '针对用户早晨首次打开汽水音乐的通勤场景，设计 AI 电台主动推送场景化音频节目，实现"免选歌、打开即听"。',
      "主导从首页触发、节目推荐、试听进入到收听反馈的完整交互流程，降低用户从被动接收推荐到开始收听的决策成本。",
      "AI 作为设计协作工具贯穿项目全程，辅助梳理 PRD 与场景需求、快速生成原型方案并通过 Vibe Coding 高保真还原关键动效。",
    ],
  },
  {
    company: "百度（北京）",
    sub1: "业务方向：c端电商",
    role: "岗位：视觉设计实习生",
    period: "2024.12~2025.4",
    title: "百度优选·省心选活动 实习项目",
    bullets: [
      '针对珠宝行业线上营销激烈竞争，负责百度优选·省心选"珠宝推荐官招募"活动主视觉 KV 设计，以差异化视觉吸引创作者参与。',
      "围绕带货赢百万流量主题，以清新自然山水为基底融入精致珠宝元素，营造高端氛围，既呼应珠宝特质，又场景化传递活动价值。",
      "KV 助力活动招募推广，强化百度优选珠宝营销场景辨识度，打通创作者与平台、珠宝业务的连接，推动珠宝内容生态构建。",
    ],
  },
];

const skills = [
  "B端/C端设计",
  "深入业务",
  "运营视觉设计",
  "Vibe coding",
  "Figma",
  "taonow",
  "Adobe工具",
  "C4D",
];

const edu = [
  { school: "大连科技学院", degree: "本科/动画", period: "2019.9~2023.6" },
  { school: "浙江理工大学", degree: "硕士/艺术设计", period: "2023.9~2026.6" },
];

export default function Resume() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-16 md:px-6 md:py-24">
      {/* 顶部 URL 栏样式 */}
      <div className="mb-10 flex flex-col items-start gap-4 md:mb-16 md:flex-row md:items-center md:gap-6">
        {/* Resume 大标题 — Figma 渐变文字 */}
        <h2
          className="font-display text-[clamp(64px,11vw,120px)] font-medium leading-[1.0] tracking-[-0.02em]"
          style={{
            background:
              "linear-gradient(90deg, #ECECEC 0%, rgba(134,134,134,0.5) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Resume
        </h2>

        {/* URL 胶囊 */}
        <div className="flex h-[35px] flex-1 items-center gap-2 rounded-[17.5px] border border-white bg-white/15 px-4">
          <span className="h-2 w-2 rounded-full bg-white/60" />
          <span className="font-['FZLanTingHeiS-HC-GB'] text-[13px] tracking-wide text-white/95">
            https://SZN/ETHAN
          </span>
        </div>
      </div>

      {/* 主体布局：移动端竖排 / PC 双栏 */}
      <div className="flex flex-col gap-10 md:flex-row md:gap-10">
        {/* ========== 左栏 ========== */}
        <aside className="flex flex-col gap-6 md:w-[320px] md:flex-shrink-0 md:gap-8">
          {/* 头像 */}
          <div className="h-[clamp(80px,12vw,122px)] w-[clamp(80px,12vw,122px)] overflow-hidden rounded-full bg-white/5">
            <img
              src="/pages/avatar.jpg"
              alt="Ethan Sun 头像"
              className="h-full w-full object-cover"
              onError={(e) => (e.currentTarget.style.background = "#1a1a1a")}
            />
          </div>

          {/* 姓名 */}
          <div>
            <h3 className="font-display text-[clamp(22px,3vw,32px)] font-medium leading-[1.2] text-white">
              孙正男
            </h3>
          </div>

          {/* 教育经历 */}
          <div className="flex flex-col gap-6">
            {edu.map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex flex-wrap gap-2 font-display text-[clamp(16px,1.4vw,20px)] text-white/95">
                  <span>{item.school}</span>
                  <span className="text-white/60">{item.degree}</span>
                </div>
                <span className="font-display text-[clamp(13px,1.2vw,18px)] text-white/60">
                  {item.period}
                </span>
              </div>
            ))}
          </div>

          {/* 联系方式 */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-[clamp(18px,1.6vw,24px)] font-medium text-white">
              联系方式
            </h4>
            <ul className="flex list-none flex-col gap-1 p-0">
              <li className="font-display text-[clamp(13px,1.2vw,18px)] text-white/95">
                Wechat：Ethan_sun12
              </li>
              <li className="font-display text-[clamp(13px,1.2vw,18px)] text-white/95">
                Phone：19818968846
              </li>
              <li className="font-display text-[clamp(13px,1.2vw,18px)] break-all text-white/95">
                Email：zstu_1225@163.com
              </li>
            </ul>
          </div>

          {/* 工作技能 */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-[clamp(18px,1.6vw,24px)] font-medium text-white">
              工作技能
            </h4>
            <div className="grid grid-cols-3 gap-1">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex h-6 items-center justify-center rounded-full border border-white/80 px-3 font-display text-[clamp(10px,0.9vw,12px)] font-medium text-white/95 leading-none"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* ========== 右栏：项目经历 ========== */}
        <section className="min-w-0 flex-1 w-full">
          {/* 标题 */}
          <div className="mb-6 flex items-center gap-3 md:mb-8">
            <h3 className="font-display text-[clamp(22px,2vw,32px)] font-medium text-white">
              项目经历
            </h3>
            <span className="font-display text-[clamp(14px,1.3vw,20px)] font-medium text-white/70">
              Internship experience
            </span>
          </div>

          {/* 时间线 + 卡片列表 */}
          <div className="relative flex flex-col gap-5 md:gap-6">
            {/* 左侧时间线装饰：虚线 + 顶/底圆点 — PC 端用负 margin 伸到 section 外侧对齐左栏 */}
            <div aria-hidden="true" className="pointer-events-none absolute top-0 flex h-full w-[2px] flex-col justify-between left-[-22px] md:left-[-13px]">
              {/* 顶部圆点 */}
              <span className="absolute -left-[3px] top-0 block h-[8px] w-[8px] rounded-full bg-white" />
              {/* 虚线 */}
              <span
                className="absolute left-0 top-[8px] h-[calc(100%-16px)] w-[2px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(244,244,244,0.4) 50%, transparent 50%)",
                  backgroundSize: "2px 8px",
                  backgroundRepeat: "repeat-y",
                }}
              />
              {/* 底部圆点 */}
              <span className="absolute -left-[3px] bottom-0 block h-[8px] w-[8px] rounded-full bg-white" />
            </div>

            {projects.map((p, i) => (
              <article
                key={i}
                className="relative w-full rounded-2xl bg-white/10 p-4 pl-6 md:p-5 md:pl-6"
              >
                {/* 头部信息行 */}
                <header className="mb-3 flex flex-col gap-2 md:mb-4 md:flex-row md:items-baseline md:gap-4">
                  <h4 className="font-display text-[clamp(16px,1.6vw,24px)] font-semibold text-white">
                    {p.company}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 font-display text-[clamp(12px,1.1vw,15px)] text-white/70">
                    {p.sub1 && <span>{p.sub1}</span>}
                    {p.role && <span>{p.role}</span>}
                  </div>
                  <span className="ml-auto font-display text-[clamp(12px,1.1vw,15px)] font-medium text-white/70">
                    {p.period}
                  </span>
                </header>

                {/* 项目标题（如果有的话） */}
                {p.title && (
                  <h5 className="mb-3 font-display text-[clamp(14px,1.4vw,18px)] font-semibold text-white/90">
                    {p.title}
                  </h5>
                )}

                {/* 分点描述 — 每点可换行 */}
                <ul className="m-0 list-none space-y-2 pl-0 font-display text-[clamp(13px,1.1vw,16px)] leading-[1.6] text-white/80">
                  {p.bullets.map((b, bi) => (
                    <li key={bi} className="md:whitespace-nowrap">
                      <span className="mr-2 inline-block h-[6px] w-[6px] translate-y-[-2px] rounded-full bg-white/30" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
