import { useEffect, useRef } from "react";

/**
 * Liquid Gradient — WebGL 着色器背景
 * 移植自 Framer Shader 组件（thrivingwriting.framer.website）
 * 鼠标移动时产生拖拽扰动，松手后逐渐消散
 */
export default function LiquidGradient({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    // === 顶点着色器 ===
    const vs = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // === Push buffer 片元着色器（鼠标拖拽反馈场）===
    const pushFS = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_push_buffer;
      uniform vec2 u_resolution;
      uniform float u_deltaTime;
      uniform vec4 u_mousePosition;
      uniform float u_mouseHover;
      uniform float u_mousePush;
      uniform float u_mouseRadius;
      uniform float u_mouseStretch;
      uniform float u_mousePersist;

      void main() {
        float aspect = u_resolution.x / u_resolution.y;
        vec2 aspectFix = vec2(aspect, 1.0);
        vec2 texel = 1.0 / u_resolution;

        vec4 prev = texture2D(u_push_buffer, v_uv);
        vec2 c = prev.xy;
        vec2 nl = texture2D(u_push_buffer, v_uv - vec2(texel.x, 0.0)).xy;
        vec2 nr = texture2D(u_push_buffer, v_uv + vec2(texel.x, 0.0)).xy;
        vec2 nd = texture2D(u_push_buffer, v_uv - vec2(0.0, texel.y)).xy;
        vec2 nu = texture2D(u_push_buffer, v_uv + vec2(0.0, texel.y)).xy;

        vec2 blurred = (nl + nr + nd + nu) * 0.25;
        vec2 field = mix(c, blurred, 0.12);

        float r = clamp(u_deltaTime * 60.0, 0.0, 3.0);
        float decay = pow(mix(0.86, 0.985, clamp(u_mousePersist, 0.0, 1.0)), r);
        field *= decay;

        vec2 rawVel = u_mousePosition.zw * aspectFix * u_mouseHover;
        float smoothK = 1.0 - pow(0.75, r);
        vec2 mouseVel = mix(prev.zw, rawVel, smoothK);

        float speed = length(mouseVel);
        float brush = max(u_mouseRadius * 0.1, 0.001);
        float speedPerSec = speed / max(u_deltaTime, 1e-4);
        float moving = 1.0 - exp(-speedPerSec * 0.5);

        vec2 dir = speed > 1e-5 ? mouseVel / speed : vec2(1.0, 0.0);
        vec2 ortho = vec2(-dir.y, dir.x);
        vec2 toMouse = (v_uv - u_mousePosition.xy) * aspectFix;

        float along = dot(toMouse, dir);
        float across = dot(toMouse, ortho);
        float ra = brush * (1.0 + u_mouseStretch * moving);
        float rb = brush;
        float d2 = (along * along) / (ra * ra) + (across * across) / (rb * rb);
        float falloff = exp(-d2);

        field += mouseVel * falloff * (u_mousePush * 0.1) * u_mouseHover;
        field = clamp(field, -1.0, 1.0);

        gl_FragColor = vec4(field, mouseVel);
      }
    `;

    // === 主片元着色器（Liquid Gradient）===
    const mainFS = `
      precision highp float;
      varying vec2 v_uv;
      uniform sampler2D u_push_buffer;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform float u_seed;
      uniform float u_speed;
      uniform float u_loop;
      uniform float u_scale;
      uniform float u_turbAmp;
      uniform float u_turbFreq;
      uniform float u_turbIter;
      uniform float u_waveFreq;
      uniform float u_distBias;
      uniform float u_jellify;
      uniform float u_ditherMode;
      uniform float u_dither;
      uniform float u_exposure;
      uniform float u_contrast;
      uniform float u_saturation;
      uniform float u_pixelRatio;
      uniform int u_colors_length;
      uniform vec3 u_colors[8];

      const float GOLDEN_ANGLE = 2.3999632;
      const float TAU = 6.28318530;

      vec3 seedRandom(float seedVal) {
        float s = fract(sin(seedVal) * 43758.5453);
        float s2 = fract(sin(seedVal * 1.5 + 7.31) * 43758.5453);
        float s3 = fract(sin(seedVal * 2.7 + 13.37) * 43758.5453);
        return vec3(s, s2, s3);
      }

      vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }
      vec3 toSrgb(vec3 c) { return pow(clamp(c, 0.0, 1.0), vec3(0.4545)); }

      vec3 linearToOklab(vec3 c) {
        float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
        float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
        float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
        l = pow(max(l, 0.0), 1.0/3.0);
        m = pow(max(m, 0.0), 1.0/3.0);
        s = pow(max(s, 0.0), 1.0/3.0);
        return vec3(
          0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
          1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
          0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
        );
      }

      vec3 oklabToLinear(vec3 c) {
        float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
        float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
        float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
        l = l * l * l; m = m * m * m; s = s * s * s;
        return vec3(
          +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
          -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
          -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
        );
      }

      vec3 oklabToLch(vec3 lab) { return vec3(lab.x, length(lab.yz), atan(lab.z, lab.y)); }
      vec3 lchToOklab(vec3 lch) { return vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z)); }

      vec3 mixLch(vec3 lab0, vec3 lab1, float t) {
        vec3 lch0 = oklabToLch(lab0);
        vec3 lch1 = oklabToLch(lab1);
        if (lch0.y < 0.05) lch0.z = lch1.z;
        if (lch1.y < 0.05) lch1.z = lch0.z;
        float dh = lch1.z - lch0.z;
        if (dh > 3.14159265) dh -= 6.28318530;
        if (dh < -3.14159265) dh += 6.28318530;
        return lchToOklab(vec3(mix(lch0.x, lch1.x, t), mix(lch0.y, lch1.y, t), lch0.z + dh * t));
      }

      vec3 getColor(int idx) {
        if (u_colors_length < 1) return vec3(0.0);
        int safeIdx = int(clamp(float(idx), 0.0, float(u_colors_length - 1)));
        if (safeIdx == 0) return u_colors[0];
        if (safeIdx == 1) return u_colors[1];
        if (safeIdx == 2) return u_colors[2];
        if (safeIdx == 3) return u_colors[3];
        if (safeIdx == 4) return u_colors[4];
        if (safeIdx == 5) return u_colors[5];
        if (safeIdx == 6) return u_colors[6];
        return u_colors[7];
      }

      vec3 paletteN(float t, int count) {
        if (count < 1) return vec3(0.0);
        if (count < 2) return toLinear(getColor(0));
        float segmentSize = 1.0 / float(count - 1);
        t = clamp(t, 0.0, 1.0);
        int idx = int(min(float(int(floor(t / segmentSize))), float(count - 2)));
        float localT = clamp((t - float(idx) * segmentSize) / segmentSize, 0.0, 1.0);
        vec3 lab0 = linearToOklab(toLinear(getColor(idx)));
        vec3 lab1 = linearToOklab(toLinear(getColor(idx + 1)));
        return oklabToLinear(mixLch(lab0, lab1, localT));
      }

      float getDither(vec2 I, float mode) {
        if (mode < 0.5) return 0.5;
        if (mode < 1.5) return fract(52.9829189 * fract(dot(I, vec2(0.06711056, 0.00583715))));
        return fract(sin(dot(I, vec2(12.9898, 78.233))) * 43758.5453);
      }

      vec3 softGamutMap(vec3 linearRgb) {
        float maxC = max(linearRgb.r, max(linearRgb.g, linearRgb.b));
        float minC = min(linearRgb.r, min(linearRgb.g, linearRgb.b));
        if (minC >= 0.0 && maxC <= 1.0) return linearRgb;
        vec3 lab = linearToOklab(max(linearRgb, 0.0));
        float L = clamp(lab.x, 0.0, 1.0);
        float C = length(lab.yz);
        float h = atan(lab.z, lab.y);
        float maxChroma = 0.4 * (1.0 - pow(abs(2.0 * L - 1.0), 2.0));
        if (C > maxChroma * 0.7) {
          float knee = maxChroma * 0.7;
          float tx = (C - knee) / (maxChroma - knee + 0.001);
          float tanhX = (exp(2.0 * tx) - 1.0) / (exp(2.0 * tx) + 1.0);
          C = knee + (maxChroma - knee) * tanhX;
        }
        return clamp(oklabToLinear(vec3(L, C * cos(h), C * sin(h))), 0.0, 1.0);
      }

      vec3 applyContrastSaturation(vec3 linearRgb, float contrast, float saturation) {
        vec3 lab = linearToOklab(linearRgb);
        float C = length(lab.yz);
        float h = atan(lab.z, lab.y);
        lab.x = clamp((lab.x - 0.5) * contrast + 0.5, 0.0, 1.0);
        C *= saturation;
        lab.y = C * cos(h);
        lab.z = C * sin(h);
        return oklabToLinear(lab);
      }

      void main() {
        vec2 fragCoord = v_uv * u_resolution;
        vec2 r = u_resolution;
        vec2 p = (fragCoord * 2.0 - r) / r.y;

        int colorCount = u_colors_length;
        if (colorCount < 1) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
          return;
        }

        float t = u_time * 0.3;
        float looping = step(0.5, u_loop);
        float phase = TAU * u_time / max(u_loop, 0.01);
        float radius = u_loop * u_speed * 0.3 / TAU;
        float tA = sin(phase) * radius;
        float tB = (1.0 - cos(phase)) * radius;

        vec3 seedOffset = seedRandom(u_seed);
        vec3 seedOffset2 = seedRandom(u_seed + 100.0);
        float seedAngle = u_seed * GOLDEN_ANGLE;
        vec2 seedPhase = (seedOffset2.xy - 0.5) * TAU;

        float cs = cos(seedAngle);
        float sn = sin(seedAngle);
        mat2 rot = mat2(cs, -sn, sn, cs);
        p = rot * p;

        vec2 pushField = texture2D(u_push_buffer, v_uv).xy;
        p -= rot * pushField * 2.0;

        float dither = getDither(floor(fragCoord / u_pixelRatio), u_ditherMode);

        float totalVal = 0.0;
        float totalWeight = 0.0;
        int turbIter = int(u_turbIter);
        float freq = 1.0 / max(u_turbFreq, 0.01);

        for (float i = 0.0; i < 4.0; i++) {
          float eph = i / 4.0;
          vec2 q = p * u_scale;
          float sq = eph * eph;
          if (u_jellify > 0.5) {
            q.yx *= mix(1.0, 0.5, 1.0 - exp(-sq));
          }
          float a = seedPhase.x;
          float d = seedPhase.y;
          for (int j = 2; j < 13; j++) {
            if (j >= turbIter) break;
            float fj = float(j);
            float t1 = mix(t * u_speed, tA, looping);
            float t2 = mix(t * u_speed, tB, looping);
            q += u_turbAmp * sin(q.yx / freq * fj + t1 + vec2(a, d) + seedOffset.xy * fj) / fj;
            a += cos(fj + d * 1.2 + q.x * 2.0 - t1 + seedOffset2.z + t2 * 0.3 * looping);
            d += sin(fj * q.y + a + seedOffset.z + t1 + seedOffset2.y + t2 * 0.3 * looping);
          }
          float v = 0.5 + 0.5 * sin(length(q.yx + vec2(a, d) * 0.2) * u_waveFreq + i * i + seedOffset.x);
          float weight = smoothstep(0.0, 0.5, eph) * smoothstep(1.0, 0.5, eph);
          totalVal += v * weight;
          totalWeight += weight;
        }

        float val = totalVal / totalWeight;
        val = clamp((val - 0.3) / 0.4, 0.0, 1.0);
        val = pow(val, exp(-u_distBias));
        val = clamp(val + (dither - 0.5) * u_dither, 0.0, 1.0);

        vec3 col = paletteN(val, colorCount);
        col *= u_exposure;
        col = applyContrastSaturation(col, u_contrast, u_saturation);
        col = softGamutMap(col);
        col = toSrgb(col);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type, src) {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(sh));
      }
      return sh;
    }

    function createProgram(fsSrc) {
      const prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSrc));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(prog));
      }
      return prog;
    }

    const pushProg = createProgram(pushFS);
    const mainProg = createProgram(mainFS);

    // 全屏四边形
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    function createFBO(w, h) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return { tex, fbo };
    }

    // 参数（还原 thrivingwriting.framer.website 实例配置）
    const colors = [
      [0.0, 0.0, 0.0],        // rgb(0, 0, 0) 黑
      [0.0196, 0.0392, 0.1804], // rgb(5, 10, 46) 深藏青
      [0.1725, 0.2471, 0.8196], // rgb(44, 63, 209) 靛蓝
      [0.2902, 0.3725, 1.0],    // rgb(74, 95, 255) 亮蓝
      [0.0392, 0.0392, 0.0706], // rgb(10, 10, 18) 近黑
    ];
    const params = {
      seed: 648, speed: 0.12, loop: 0, scale: 0.6,
      turbAmp: 0.5, turbFreq: 0.1, turbIter: 7, waveFreq: 2.6,
      distBias: 0, jellify: 0, ditherMode: 2, dither: 0.08,
      exposure: 1.1, contrast: 1.2, saturation: 1,
      mousePush: 0.5, mouseRadius: 1, mouseStretch: 0, mousePersist: 0.8,
    };

    let width = 0, height = 0;
    let pushA = createFBO(2, 2);
    let pushB = createFBO(2, 2);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (w === width && h === height) return;
      width = w; height = h;
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      // 重建 push buffer（半分辨率）
      gl.deleteTexture(pushA.tex); gl.deleteFramebuffer(pushA.fbo);
      gl.deleteTexture(pushB.tex); gl.deleteFramebuffer(pushB.fbo);
      pushA = createFBO(Math.max(2, Math.floor(w / 2)), Math.max(2, Math.floor(h / 2)));
      pushB = createFBO(Math.max(2, Math.floor(w / 2)), Math.max(2, Math.floor(h / 2)));
    }

    // 监听尺寸变化
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const mouse = { x: 0.5, y: 0.5, vx: 0, vy: 0, hover: 0, lastX: 0, lastY: 0 };
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1 - (e.clientY - rect.top) / rect.height;
      mouse.vx = nx - mouse.lastX;
      mouse.vy = ny - mouse.lastY;
      mouse.lastX = nx; mouse.lastY = ny;
      mouse.x = nx; mouse.y = ny;
      mouse.hover = 1;
    }
    function onLeave() { mouse.hover = 0; mouse.vx = 0; mouse.vy = 0; }
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    let lastTime = performance.now();
    let time = 0;
    let rafId = 0;

    function setUniforms(prog, extra) {
      const u = {};
      const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(prog, i);
        u[info.name] = gl.getUniformLocation(prog, info.name);
      }
      return u;
    }

    const pushU = setUniforms(pushProg);
    const mainU = setUniforms(mainProg);

    function drawQuad(prog) {
      gl.useProgram(prog);
      const posLoc = gl.getAttribLocation(prog, "a_pos");
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function render() {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      time += dt;

      resize();

      // === Pass 1: 更新 push buffer ===
      gl.bindFramebuffer(gl.FRAMEBUFFER, pushB.fbo);
      gl.viewport(0, 0, pushB.tex.width || Math.floor(width / 2), pushB.tex.height || Math.floor(height / 2));
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pushA.tex);
      gl.useProgram(pushProg);
      if (pushU.u_push_buffer) gl.uniform1i(pushU.u_push_buffer, 0);
      if (pushU.u_resolution) gl.uniform2f(pushU.u_resolution, pushA.tex.width, pushA.tex.height);
      if (pushU.u_deltaTime) gl.uniform1f(pushU.u_deltaTime, dt);
      if (pushU.u_mousePosition) gl.uniform4f(pushU.u_mousePosition, mouse.x, mouse.y, mouse.vx, mouse.vy);
      if (pushU.u_mouseHover) gl.uniform1f(pushU.u_mouseHover, mouse.hover);
      if (pushU.u_mousePush) gl.uniform1f(pushU.u_mousePush, params.mousePush);
      if (pushU.u_mouseRadius) gl.uniform1f(pushU.u_mouseRadius, params.mouseRadius);
      if (pushU.u_mouseStretch) gl.uniform1f(pushU.u_mouseStretch, params.mouseStretch);
      if (pushU.u_mousePersist) gl.uniform1f(pushU.u_mousePersist, params.mousePersist);
      drawQuad(pushProg);

      // 交换 push buffer
      [pushA, pushB] = [pushB, pushA];

      // === Pass 2: 主渲染 ===
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, width, height);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pushA.tex);
      gl.useProgram(mainProg);
      if (mainU.u_push_buffer) gl.uniform1i(mainU.u_push_buffer, 0);
      if (mainU.u_resolution) gl.uniform2f(mainU.u_resolution, width, height);
      if (mainU.u_time) gl.uniform1f(mainU.u_time, time);
      if (mainU.u_seed) gl.uniform1f(mainU.u_seed, params.seed);
      if (mainU.u_speed) gl.uniform1f(mainU.u_speed, params.speed);
      if (mainU.u_loop) gl.uniform1f(mainU.u_loop, params.loop);
      if (mainU.u_scale) gl.uniform1f(mainU.u_scale, params.scale);
      if (mainU.u_turbAmp) gl.uniform1f(mainU.u_turbAmp, params.turbAmp);
      if (mainU.u_turbFreq) gl.uniform1f(mainU.u_turbFreq, params.turbFreq);
      if (mainU.u_turbIter) gl.uniform1f(mainU.u_turbIter, params.turbIter);
      if (mainU.u_waveFreq) gl.uniform1f(mainU.u_waveFreq, params.waveFreq);
      if (mainU.u_distBias) gl.uniform1f(mainU.u_distBias, params.distBias);
      if (mainU.u_jellify) gl.uniform1f(mainU.u_jellify, params.jellify);
      if (mainU.u_ditherMode) gl.uniform1f(mainU.u_ditherMode, params.ditherMode);
      if (mainU.u_dither) gl.uniform1f(mainU.u_dither, params.dither);
      if (mainU.u_exposure) gl.uniform1f(mainU.u_exposure, params.exposure);
      if (mainU.u_contrast) gl.uniform1f(mainU.u_contrast, params.contrast);
      if (mainU.u_saturation) gl.uniform1f(mainU.u_saturation, params.saturation);
      if (mainU.u_pixelRatio) gl.uniform1f(mainU.u_pixelRatio, window.devicePixelRatio || 1);
      if (mainU.u_colors_length) gl.uniform1i(mainU.u_colors_length, colors.length);
      // 设置颜色数组
      const flat = [];
      for (const c of colors) flat.push(c[0], c[1], c[2]);
      for (let i = 0; i < 8; i++) {
        const loc = gl.getUniformLocation(mainProg, `u_colors[${i}]`);
        if (loc) gl.uniform3f(loc, flat[i*3]||0, flat[i*3+1]||0, flat[i*3+2]||0);
      }
      drawQuad(mainProg);

      // 重置鼠标速度（每帧衰减）
      mouse.vx *= 0.5;
      mouse.vy *= 0.5;

      rafId = setTimeout(render, 1000 / 60);
    }

    rafId = setTimeout(render, 1000 / 60);

    return () => {
      clearTimeout(rafId);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      gl.deleteTexture(pushA.tex); gl.deleteFramebuffer(pushA.fbo);
      gl.deleteTexture(pushB.tex); gl.deleteFramebuffer(pushB.fbo);
      gl.deleteBuffer(quad);
      gl.deleteProgram(pushProg);
      gl.deleteProgram(mainProg);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
