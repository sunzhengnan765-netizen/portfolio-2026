import LiquidGradient from "./LiquidGradient";

/**
 * Hero 背景层：Liquid Gradient WebGL 着色器
 * 移植自 thrivingwriting.framer.website 的 Framer Shader
 * 鼠标移动产生拖拽扰动，松手后逐渐消散
 */
export default function VideoBackground() {
  return <LiquidGradient className="hero-bg-layer" />;
}
