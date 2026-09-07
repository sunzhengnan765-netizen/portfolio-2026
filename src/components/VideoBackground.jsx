import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const HLS_URL =
  "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

/**
 * Hero 背景层：本地极光 PNG 作为永久兜底层 + HLS 视频在成功 autoplay 时叠加。
 * 视频层用 opacity-60 + mix-blend-screen 与极光图融合，HLS 失败时不影响 hero 整体观感。
 */
export default function VideoBackground() {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls = null;
    let cancelled = false;

    // Safari / iOS 原生 HLS
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
      const onPlaying = () => !cancelled && setVideoReady(true);
      video.addEventListener("playing", onPlaying);
      video.play().catch(() => {});
      return () => {
        cancelled = true;
        video.removeEventListener("playing", onPlaying);
        video.pause();
        video.removeAttribute("src");
        video.load();
      };
    }

    // Chrome / Firefox：hls.js
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: false, lowLatencyMode: false });
      hls.loadSource(HLS_URL);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (cancelled) return;
        video.play().then(() => setVideoReady(true)).catch(() => {});
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          // 沙箱 / CORS / autoplay 拒绝 — 静默回退到极光图
          // eslint-disable-next-line no-console
          console.warn("[hero-bg] HLS failed, aurora image fallback only:", data.type);
        }
      });

      return () => {
        cancelled = true;
        if (hls) hls.destroy();
        video.pause();
      };
    }
  }, []);

  return (
    <>
      {/* 静态极光背景 — 永远显示，作为视频层兜底 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/pages/nyro-aurora.png')" }}
      />

      {/* HLS 视频层 — HLS 成功加载时显示，60% 透明 + screen 混合与极光图融合 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-60 mix-blend-screen" : "opacity-0"
        }`}
      />

      {/* 绿色统一层 — hue 混合：去掉橙粉紫色相，整片统一为绿色调（保留明暗纹理与饱和度） */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "#10b981", mixBlendMode: "hue" }}
      />
    </>
  );
}
