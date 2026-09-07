import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const HLS_URL =
  "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

/**
 * Hero 背景层：本地极光 PNG 兜底 + HLS 视频层（Mux）
 * hero-bg-layer 类配合黑场动画时序淡入
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
      video.addEventListener("playing", onPlaying, { once: true });
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

      return () => {
        cancelled = true;
        if (hls) hls.destroy();
        video.pause();
      };
    }
  }, []);

  return (
    <>
      {/* 静态极光背景 — 兜底层 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg-layer"
        style={{ backgroundImage: "url('/pages/nyro-aurora.png')" }}
      />

      {/* HLS 视频层 — hero-bg-layer 控制淡入时序 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 hero-bg-layer ${
          videoReady ? "opacity-60 mix-blend-screen" : "opacity-0"
        }`}
      />

      {/* 绿色统一层 — hue 混合 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hero-bg-layer"
        style={{ backgroundColor: "#10b981", mixBlendMode: "hue" }}
      />
    </>
  );
}
