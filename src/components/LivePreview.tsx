import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Grid, 
  Download, 
  Maximize2, 
  Sparkles, 
  Sun, 
  Moon, 
  Laptop,
  Layers,
  MousePointer,
  Activity,
  Check
} from 'lucide-react';
import { PreviewConfig } from '../types';
import { generateStandaloneHTML, formatHTML, formatCSS } from '../utils/codeFormatter';
import { downloadFile } from '../utils/share';

interface LivePreviewProps {
  html: string;
  css: string;
  config: PreviewConfig;
  onUpdateConfig: (updater: (prev: PreviewConfig) => PreviewConfig) => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  html,
  css,
  config,
  onUpdateConfig,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fps, setFps] = useState<number>(60);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate complete iframe HTML document
  const constructSrcDoc = () => {
    const pauseCss = config.isPaused
      ? `* { animation-play-state: paused !important; transition: none !important; }`
      : '';

    const hoverCss = config.forceHover
      ? `
        .art-card .mini-pupil, .mini-character .mini-pupil { transform: translate(3px, -3px) !important; }
        .art-card .mini-mouth, .mini-character .mini-mouth { height: 14px !important; width: 14px !important; border-bottom: 0 !important; background: #1e1b4b !important; left: 38px !important; border-radius: 50% !important; }
        .art-card .brush, .palette .brush { transform: rotate(55deg) translateY(-12px) !important; }
        .ghost .ghost-mouth { width: 16px !important; height: 12px !important; border-radius: 0 0 12px 12px !important; left: 37px !important; }
        .cyber-button { background: #00f0ff !important; color: #000000 !important; box-shadow: 0 0 45px rgba(0, 240, 255, 0.8) !important; transform: scale(1.05) !important; }
        .cyber-button::after { opacity: 1 !important; }
      `
      : '';

    const bgStyle =
      config.bgColor === 'checkerboard'
        ? `background-color: #0d111c; background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px); background-size: 16px 16px;`
        : `background-color: ${config.bgColor};`;

    return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      ${bgStyle}
      font-family: system-ui, -apple-system, sans-serif;
    }

    .preview-stage {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
      transform: scale(${config.zoom});
      transform-origin: center center;
      transition: transform 0.2s ease;
    }

    /* Target styling */
    ${css}

    /* Pause and Hover Overrides */
    ${pauseCss}
    ${hoverCss}
  </style>
</head>
<body>
  <div class="preview-stage">
    ${html}
  </div>
</body>
</html>`;
  };

  // Measure FPS roughly
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleDownloadHtml = () => {
    const fullHtml = generateStandaloneHTML(formatHTML(html), formatCSS(css), 'Pure CSS Art');
    downloadFile('pure-css-art.html', fullHtml, 'text/html');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full bg-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
    >
      {/* Live Preview Header Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#050505] border-b border-white/10 flex-wrap gap-2">
        {/* Left Controls: Play/Pause, Hover Simulator */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-white mr-1 tracking-wide">
            <Eye className="w-4 h-4 text-[#FF4E00]" />
            Anteprima Istantanea
          </span>

          {/* Pause/Play Animation */}
          <button
            onClick={() => onUpdateConfig((prev) => ({ ...prev, isPaused: !prev.isPaused }))}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              config.isPaused
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
            title={config.isPaused ? 'Riprendi animazioni CSS' : 'Pausa animazioni CSS per ispezionare i frame'}
          >
            {config.isPaused ? (
              <>
                <Play className="w-3.5 h-3.5 fill-amber-300" />
                Play
              </>
            ) : (
              <>
                <Pause className="w-3.5 h-3.5 fill-emerald-300" />
                Pausa
              </>
            )}
          </button>

          {/* Force Hover State */}
          <button
            onClick={() => onUpdateConfig((prev) => ({ ...prev, forceHover: !prev.forceHover }))}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              config.forceHover
                ? 'bg-[#FF4E00]/20 text-[#FF4E00] border-[#FF4E00]/50 shadow-sm'
                : 'bg-white/[0.05] text-white/60 border-white/10 hover:text-white'
            }`}
            title="Simula il passaggio del mouse (:hover) in modo permanente"
          >
            <MousePointer className="w-3.5 h-3.5 text-[#FF4E00]" />
            Simula Hover
          </button>
        </div>

        {/* Right Controls: Background, Zoom, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Background Presets */}
          <div className="flex items-center bg-black/60 border border-white/10 p-1 rounded-lg gap-1">
            <button
              onClick={() => onUpdateConfig((prev) => ({ ...prev, bgColor: '#0A0A0A' }))}
              className={`w-5 h-5 rounded-md border ${
                config.bgColor === '#0A0A0A' ? 'border-[#FF4E00] ring-2 ring-[#FF4E00]/40' : 'border-white/20'
              } bg-[#0A0A0A]`}
              title="Sfondo Nero Art"
            />
            <button
              onClick={() => onUpdateConfig((prev) => ({ ...prev, bgColor: '#18181b' }))}
              className={`w-5 h-5 rounded-md border ${
                config.bgColor === '#18181b' ? 'border-[#FF4E00] ring-2 ring-[#FF4E00]/40' : 'border-white/20'
              } bg-[#18181b]`}
              title="Sfondo Scuro Slate"
            />
            <button
              onClick={() => onUpdateConfig((prev) => ({ ...prev, bgColor: '#E5E5E5' }))}
              className={`w-5 h-5 rounded-md border ${
                config.bgColor === '#E5E5E5' ? 'border-[#FF4E00] ring-2 ring-[#FF4E00]/40' : 'border-white/20'
              } bg-[#E5E5E5]`}
              title="Sfondo Chiaro Studio"
            />
            <button
              onClick={() => onUpdateConfig((prev) => ({ ...prev, bgColor: 'checkerboard' }))}
              className={`w-5 h-5 rounded-md border ${
                config.bgColor === 'checkerboard' ? 'border-[#FF4E00] ring-2 ring-[#FF4E00]/40' : 'border-white/20'
              } bg-[#0A0A0A] bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:8px_8px]`}
              title="Sfondo Griglia Trasparente"
            />
          </div>

          {/* Zoom controls */}
          <div className="flex items-center bg-black/60 border border-white/10 rounded-lg px-2 py-1 gap-1 text-xs">
            <button
              onClick={() =>
                onUpdateConfig((prev) => ({ ...prev, zoom: Math.max(0.5, prev.zoom - 0.15) }))
              }
              className="text-white/60 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[#FF4E00] w-10 text-center select-none font-semibold">
              {Math.round(config.zoom * 100)}%
            </span>
            <button
              onClick={() =>
                onUpdateConfig((prev) => ({ ...prev, zoom: Math.min(2.5, prev.zoom + 0.15) }))
              }
              className="text-white/60 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onUpdateConfig((prev) => ({ ...prev, zoom: 1 }))}
              className="text-[10px] text-white/40 hover:text-white font-mono ml-1"
              title="Reset Zoom"
            >
              100%
            </button>
          </div>

          {/* Download HTML */}
          <button
            onClick={handleDownloadHtml}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#FF4E00] hover:bg-[#ff611a] text-white rounded-full shadow-md shadow-[#FF4E00]/25 transition-all"
            title="Scarica file .html autonomo con codice puro"
          >
            <Download className="w-3.5 h-3.5" />
            Esporta
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-white/60 hover:text-white bg-white/[0.05] hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
            title="Schermo intero anteprima"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Preview IFrame Stage */}
      <div className="flex-1 min-h-0 relative overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
        <iframe
          ref={iframeRef}
          srcDoc={constructSrcDoc()}
          title="CSS Art Live Preview"
          className="w-full h-full border-none pointer-events-auto"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* Preview Footer / Performance Bar */}
      <div className="px-3.5 py-1.5 bg-[#050505] border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-mono text-[#FF4E00]">
            <Activity className="w-3.5 h-3.5 text-[#FF4E00]" />
            {fps} FPS Render
          </span>
          <span className="text-white/20">|</span>
          <span className="text-white/60">
            {config.isPaused ? '⏸️ Animazioni in pausa' : '▶️ Rendering GPU'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/40 text-[10px]">Pure Vector HTML/CSS Engine</span>
        </div>
      </div>
    </div>
  );
};
