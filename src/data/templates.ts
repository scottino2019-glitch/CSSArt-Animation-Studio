import { Template } from '../types';

export const TEMPLATES: Template[] = [
  {
    id: 'mini-character',
    title: 'Mini Character (Opera in CSS)',
    description: 'Personaggio animato in CSS con occhi che lampeggiano, pupille reattive all\'hover e animazione di fluttuazione.',
    category: 'characters',
    tags: ['character', 'keyframes', 'hover', 'animation', 'cute'],
    previewBg: '#0f172a',
    html: `<div class="art-card rounded-3xl block overflow-hidden cursor-pointer group">
    <div class="card-glow bg-gradient-to-b from-indigo-600/40 to-transparent"></div>
    
    <!-- OPERA IN CSS -->
    <div class="css-art-container border-b border-white/5">
        <div class="mini-character">
            <div class="mini-ear left"></div>
            <div class="mini-ear right"></div>
            <div class="mini-eye left"><div class="mini-pupil"></div></div>
            <div class="mini-eye right"><div class="mini-pupil"></div></div>
            <div class="mini-mouth"></div>
        </div>
    </div>
</div>`,
    css: `.css-art-container {
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
}

.mini-character {
    position: relative;
    width: 90px;
    height: 80px;
    background: #6366f1;
    border-radius: 45px;
    animation: float-char 4s ease-in-out infinite;
    box-shadow: inset -10px -10px 20px rgba(0,0,0,0.3), 0 20px 30px rgba(99,102,241,0.3);
}

.mini-ear {
    position: absolute;
    width: 28px;
    height: 28px;
    background: #4f46e5;
    top: 28px;
    z-index: -1;
}
.mini-ear.left { left: -14px; border-radius: 50% 10% 10% 50%; }
.mini-ear.right { right: -14px; border-radius: 10% 50% 50% 10%; }

.mini-eye {
    position: absolute;
    width: 24px;
    height: 24px;
    background: #fff;
    border-radius: 50%;
    top: 22px;
    animation: blink 4s infinite;
}
.mini-eye.left { left: 16px; }
.mini-eye.right { right: 16px; }

.mini-pupil {
    position: absolute;
    width: 11px;
    height: 11px;
    background: #0f172a;
    border-radius: 50%;
    top: 6px;
    left: 6px;
    transition: transform 0.3s;
}

/* Reazione al passaggio del mouse */
.art-card:hover .mini-pupil,
.mini-character:hover .mini-pupil {
    transform: translate(3px, -3px);
}

.mini-mouth {
    position: absolute;
    width: 18px;
    height: 10px;
    border-bottom: 3px solid #1e1b4b;
    border-radius: 50%;
    bottom: 16px;
    left: 36px;
    transition: all 0.3s;
}

.art-card:hover .mini-mouth,
.mini-character:hover .mini-mouth { 
    height: 14px;
    width: 14px;
    border-bottom: 0;
    background: #1e1b4b;
    left: 38px; 
    border-radius: 50%;
}

@keyframes float-char {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
}

@keyframes blink {
    0%, 96%, 100% { transform: scaleY(1); }
    98% { transform: scaleY(0.1); }
}`
  },
  {
    id: 'artist-palette',
    title: 'Artist Palette & Brush',
    description: 'Tavolozza d\'artista in CSS con macchie di colore sfumate e pennello rotante al passaggio del mouse.',
    category: 'art',
    tags: ['palette', 'brush', 'rotation', 'color', 'art-studio'],
    previewBg: '#09090b',
    html: `<div class="art-card rounded-3xl block overflow-hidden cursor-pointer group">
    <div class="card-glow bg-gradient-to-b from-violet-600/40 to-transparent"></div>

    <!-- OPERA IN CSS -->
    <div class="css-art-container border-b border-white/5">
        <div class="palette">
            <div class="palette-hole"></div>
            <div class="color-blob c-1"></div>
            <div class="color-blob c-2"></div>
            <div class="color-blob c-3"></div>
            <div class="brush"></div>
        </div>
    </div>
</div>`,
    css: `.css-art-container {
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 10;
}

.palette {
    position: relative;
    width: 110px;
    height: 85px;
    background: #e9d5ff;
    border-radius: 50% 60% 40% 50%;
    animation: float-palette 5s ease-in-out infinite reverse;
    box-shadow: inset -8px -8px 15px rgba(0,0,0,0.15), 0 15px 25px rgba(168,85,247,0.25);
}

.palette-hole {
    position: absolute;
    width: 22px;
    height: 22px;
    background: #09090b;
    border-radius: 50%;
    bottom: 16px;
    right: 16px;
}

.color-blob {
    position: absolute;
    border-radius: 50%;
    box-shadow: inset -2px -2px 5px rgba(0,0,0,0.2);
}

.c-1 { width: 20px; height: 20px; background: #ef4444; top: 16px; left: 16px; }
.c-2 { width: 24px; height: 24px; background: #fbbf24; top: 12px; left: 45px; }
.c-3 { width: 18px; height: 18px; background: #3b82f6; top: 38px; left: 22px; }

.brush {
    position: absolute;
    width: 9px;
    height: 75px;
    background: #d97706;
    top: -22px;
    right: 32px;
    transform: rotate(35deg);
    border-radius: 4px;
    z-index: 2;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.brush::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 28px;
    background: #f43f5e;
    top: -22px;
    left: -4px;
    border-radius: 50% 50% 10% 10%;
}

.brush::after {
    content: '';
    position: absolute;
    width: 11px;
    height: 9px;
    background: #9ca3af;
    top: 0px;
    left: -1px;
}

/* Rotazione pennello al passaggio del mouse */
.art-card:hover .brush,
.palette:hover .brush { 
    transform: rotate(55deg) translateY(-12px); 
}

@keyframes float-palette {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-14px) rotate(-3deg); }
}`
  },
  {
    id: 'cute-ghost',
    title: 'Cute Bouncing Ghost',
    description: 'Fantasmino fluttuante con braccia morbide, ombreggiatura dinamica ed espressione giocosa.',
    category: 'characters',
    tags: ['ghost', 'character', 'floating', 'shadow', 'glow'],
    previewBg: '#0f172a',
    html: `<div class="ghost-wrapper">
  <div class="ghost">
    <div class="ghost-eyes">
      <div class="eye"></div>
      <div class="eye"></div>
    </div>
    <div class="ghost-blush left"></div>
    <div class="ghost-blush right"></div>
    <div class="ghost-mouth"></div>
    <div class="ghost-arm left"></div>
    <div class="ghost-arm right"></div>
    <div class="ghost-skirt">
      <div class="ruffle"></div>
      <div class="ruffle"></div>
      <div class="ruffle"></div>
      <div class="ruffle"></div>
    </div>
  </div>
  <div class="ghost-shadow"></div>
</div>`,
    css: `.ghost-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 220px;
  position: relative;
}

.ghost {
  position: relative;
  width: 90px;
  height: 110px;
  background: #f8fafc;
  border-radius: 45px 45px 0 0;
  animation: floatGhost 3s ease-in-out infinite;
  box-shadow: inset -8px -8px 12px rgba(0,0,0,0.06), 0 0 20px rgba(255,255,255,0.4);
}

.ghost-eyes {
  display: flex;
  justify-content: space-between;
  width: 44px;
  position: absolute;
  top: 36px;
  left: 23px;
}

.eye {
  width: 12px;
  height: 12px;
  background: #0f172a;
  border-radius: 50%;
  position: relative;
}

.eye::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
}

.ghost-blush {
  width: 14px;
  height: 8px;
  background: #f472b6;
  border-radius: 50%;
  position: absolute;
  top: 48px;
  opacity: 0.6;
}
.ghost-blush.left { left: 12px; }
.ghost-blush.right { right: 12px; }

.ghost-mouth {
  width: 10px;
  height: 10px;
  background: #0f172a;
  border-radius: 50%;
  position: absolute;
  top: 46px;
  left: 40px;
  transition: all 0.3s;
}

.ghost:hover .ghost-mouth {
  width: 16px;
  height: 12px;
  border-radius: 0 0 12px 12px;
  left: 37px;
}

.ghost-arm {
  width: 22px;
  height: 12px;
  background: #f8fafc;
  position: absolute;
  top: 50px;
}
.ghost-arm.left {
  left: -12px;
  border-radius: 12px 0 0 12px;
  transform: rotate(-20deg);
  transform-origin: right center;
  animation: waveLeft 3s ease-in-out infinite;
}
.ghost-arm.right {
  right: -12px;
  border-radius: 0 12px 12px 0;
  transform: rotate(20deg);
  transform-origin: left center;
  animation: waveRight 3s ease-in-out infinite;
}

.ghost-skirt {
  display: flex;
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
}

.ruffle {
  flex: 1;
  height: 14px;
  background: #f8fafc;
  border-radius: 0 0 50% 50%;
}

.ghost-shadow {
  width: 70px;
  height: 12px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  margin-top: 15px;
  animation: shadowPulse 3s ease-in-out infinite;
}

@keyframes floatGhost {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-18px); }
}

@keyframes shadowPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(0.7); opacity: 0.15; }
}

@keyframes waveLeft {
  0%, 100% { transform: rotate(-20deg); }
  50% { transform: rotate(-40deg); }
}`
  },
  {
    id: 'cosmic-solar-system',
    title: 'Cosmic Solar System',
    description: 'Sistema solare 3D in codice CSS con sole pulsante, orbite concentriche e pianeti in rotazione continua.',
    category: '3d',
    tags: ['solar-system', 'space', 'orbit', 'keyframes', '3d-transform'],
    previewBg: '#050508',
    html: `<div class="solar-system">
  <div class="sun"></div>
  
  <div class="orbit mercury-orbit">
    <div class="planet mercury"></div>
  </div>
  
  <div class="orbit venus-orbit">
    <div class="planet venus"></div>
  </div>
  
  <div class="orbit earth-orbit">
    <div class="planet earth">
      <div class="moon"></div>
    </div>
  </div>
  
  <div class="orbit mars-orbit">
    <div class="planet mars"></div>
  </div>
</div>`,
    css: `.solar-system {
  position: relative;
  width: 260px;
  height: 260px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sun {
  position: absolute;
  width: 44px;
  height: 44px;
  background: radial-gradient(circle, #fde047 30%, #f97316 100%);
  border-radius: 50%;
  box-shadow: 0 0 35px #f97316, 0 0 60px rgba(253, 224, 71, 0.4);
  animation: sunGlow 4s ease-in-out infinite alternate;
  z-index: 10;
}

.orbit {
  position: absolute;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mercury-orbit { width: 90px; height: 90px; animation: rotate 3s linear infinite; }
.venus-orbit { width: 130px; height: 130px; animation: rotate 6s linear infinite; }
.earth-orbit { width: 180px; height: 180px; animation: rotate 10s linear infinite; }
.mars-orbit { width: 230px; height: 230px; animation: rotate 15s linear infinite; }

.planet {
  position: absolute;
  border-radius: 50%;
  top: -6px;
}

.mercury {
  width: 10px; height: 10px;
  background: #cbd5e1;
  box-shadow: 0 0 6px #cbd5e1;
}

.venus {
  width: 14px; height: 14px;
  background: #fb923c;
  box-shadow: 0 0 8px #fb923c;
}

.earth {
  width: 16px; height: 16px;
  background: #38bdf8;
  box-shadow: 0 0 10px #38bdf8;
}

.moon {
  position: absolute;
  width: 5px; height: 5px;
  background: #f8fafc;
  border-radius: 50%;
  top: -8px; left: 5px;
}

.mars {
  width: 12px; height: 12px;
  background: #ef4444;
  box-shadow: 0 0 8px #ef4444;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes sunGlow {
  0% { transform: scale(1); box-shadow: 0 0 35px #f97316; }
  100% { transform: scale(1.08); box-shadow: 0 0 50px #fde047, 0 0 80px #f97316; }
}`
  },
  {
    id: 'steaming-coffee-cup',
    title: 'Steaming Coffee Cup',
    description: 'Tazza da caffè minimalista in CSS con fumo fluttuante animato ed onde di vapore.',
    category: 'art',
    tags: ['coffee', 'steam', 'art', 'particles', 'relax'],
    previewBg: '#18181b',
    html: `<div class="coffee-container">
  <div class="steam-wrapper">
    <span class="steam s1"></span>
    <span class="steam s2"></span>
    <span class="steam s3"></span>
  </div>
  
  <div class="cup">
    <div class="coffee"></div>
    <div class="cup-handle"></div>
  </div>
  
  <div class="plate"></div>
</div>`,
    css: `.coffee-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 220px;
  position: relative;
}

.steam-wrapper {
  display: flex;
  gap: 12px;
  height: 50px;
  margin-bottom: 5px;
}

.steam {
  width: 8px;
  height: 40px;
  background: linear-gradient(to top, rgba(255,255,255,0.4), transparent);
  border-radius: 10px;
  filter: blur(4px);
  animation: steamRise 2.5s ease-out infinite;
}

.s1 { animation-delay: 0s; }
.s2 { animation-delay: 0.6s; }
.s3 { animation-delay: 1.2s; }

.cup {
  position: relative;
  width: 100px;
  height: 80px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 0 0 40px 40px;
  box-shadow: inset 0 -10px 15px rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.3);
  overflow: visible;
}

.coffee {
  position: absolute;
  top: 6px;
  left: 8px;
  width: 84px;
  height: 18px;
  background: #3f2314;
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.6);
}

.cup-handle {
  position: absolute;
  top: 14px;
  right: -20px;
  width: 30px;
  height: 45px;
  border: 7px solid #e2e8f0;
  border-radius: 0 20px 20px 0;
}

.plate {
  width: 140px;
  height: 12px;
  background: #cbd5e1;
  border-radius: 50%;
  margin-top: -4px;
  box-shadow: 0 10px 15px rgba(0,0,0,0.4);
}

@keyframes steamRise {
  0% { transform: translateY(10px) scaleX(1); opacity: 0; }
  50% { opacity: 0.7; }
  100% { transform: translateY(-30px) scaleX(2); opacity: 0; }
}`
  },
  {
    id: '3d-rotating-cube',
    title: '3D Isometric Glass Cube',
    description: 'Cubo 3D vettoriale in codice CSS puro con facce traslucide e rotazione prospettica continua.',
    category: '3d',
    tags: ['3d', 'cube', 'preserve-3d', 'geometry', 'transform'],
    previewBg: '#090d16',
    html: `<div class="cube-scene">
  <div class="cube">
    <div class="face front">CSS</div>
    <div class="face back">ART</div>
    <div class="face right">3D</div>
    <div class="face left">PURE</div>
    <div class="face top">CODE</div>
    <div class="face bottom">CUBE</div>
  </div>
</div>`,
    css: `.cube-scene {
  width: 200px;
  height: 200px;
  perspective: 600px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cube {
  width: 90px;
  height: 90px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(-20deg) rotateY(30deg);
  animation: rotateCube 8s linear infinite;
}

.face {
  position: absolute;
  width: 90px;
  height: 90px;
  background: rgba(99, 102, 241, 0.25);
  border: 2px solid rgba(129, 140, 248, 0.8);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 15px rgba(99, 102, 241, 0.4);
  letter-spacing: 1px;
}

.front  { transform: rotateY(0deg) translateZ(45px); }
.back   { transform: rotateY(180deg) translateZ(45px); background: rgba(236, 72, 153, 0.25); border-color: rgba(244, 114, 182, 0.8); }
.right  { transform: rotateY(90deg) translateZ(45px); background: rgba(16, 185, 129, 0.25); border-color: rgba(52, 211, 153, 0.8); }
.left   { transform: rotateY(-90deg) translateZ(45px); background: rgba(245, 158, 11, 0.25); border-color: rgba(251, 191, 36, 0.8); }
.top    { transform: rotateX(90deg) translateZ(45px); background: rgba(14, 165, 233, 0.25); border-color: rgba(56, 189, 248, 0.8); }
.bottom { transform: rotateX(-90deg) translateZ(45px); background: rgba(139, 92, 246, 0.25); border-color: rgba(167, 139, 250, 0.8); }

@keyframes rotateCube {
  0% { transform: rotateX(-20deg) rotateY(0deg); }
  100% { transform: rotateX(-20deg) rotateY(360deg); }
}`
  },
  {
    id: 'cyber-neon-button',
    title: 'Cyberpunk Neon Glitch Button',
    description: 'Pulsante stile Cyberpunk con bagliore neon, scansioni di luce e reazione glitch animata.',
    category: 'ui',
    tags: ['button', 'cyberpunk', 'neon', 'ui', 'hover'],
    previewBg: '#080811',
    html: `<div class="btn-container">
  <button class="cyber-button">
    <span class="btn-content">START STUDIO</span>
    <span class="btn-glitch"></span>
    <span class="btn-tag">R25</span>
  </button>
</div>`,
    css: `.btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.cyber-button {
  position: relative;
  padding: 18px 42px;
  background: #000000;
  border: 2px solid #00f0ff;
  color: #00f0ff;
  font-family: monospace;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 3px;
  cursor: pointer;
  outline: none;
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
  transition: all 0.2s ease;
}

.cyber-button::after {
  content: '';
  position: absolute;
  top: -2px; left: -2px; right: -2px; bottom: -2px;
  background: #ff0055;
  z-index: -1;
  clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
  opacity: 0;
  transition: opacity 0.2s;
}

.cyber-button:hover {
  background: #00f0ff;
  color: #000000;
  box-shadow: 0 0 45px rgba(0, 240, 255, 0.8);
  transform: scale(1.05);
}

.cyber-button:hover::after {
  opacity: 1;
}

.btn-tag {
  position: absolute;
  bottom: 2px;
  right: 4px;
  font-size: 8px;
  background: #ff0055;
  color: #fff;
  padding: 1px 4px;
}`
  },
  {
    id: 'glowing-neon-loader',
    title: 'Glowing Multi-Ring Loader',
    description: 'Spinner di caricamento futuristico con anelli neon concentrici e bagliore sfumato.',
    category: 'animations',
    tags: ['loader', 'spinner', 'neon', 'rings', 'keyframe'],
    previewBg: '#030712',
    html: `<div class="loader-container">
  <div class="loader-ring outer"></div>
  <div class="loader-ring middle"></div>
  <div class="loader-ring inner"></div>
  <div class="loader-core"></div>
</div>`,
    css: `.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  position: relative;
}

.loader-ring {
  position: absolute;
  border-radius: 50%;
  border: 3px solid transparent;
}

.outer {
  width: 100px;
  height: 100px;
  border-top-color: #6366f1;
  border-bottom-color: #a855f7;
  animation: spin 1.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

.middle {
  width: 70px;
  height: 70px;
  border-left-color: #ec4899;
  border-right-color: #06b6d4;
  animation: spinReverse 1.2s linear infinite;
  box-shadow: 0 0 15px rgba(236, 72, 153, 0.5);
}

.inner {
  width: 40px;
  height: 40px;
  border-top-color: #10b981;
  border-bottom-color: #f59e0b;
  animation: spin 0.8s ease-in-out infinite;
}

.loader-core {
  width: 14px;
  height: 14px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 20px #ffffff;
  animation: pulseCore 1.5s ease-in-out infinite alternate;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spinReverse {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes pulseCore {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.3); opacity: 1; }
}`
  },
  {
    id: 'blank-canvas',
    title: 'Carta Bianca (Blank Canvas)',
    description: 'Struttura minima vuota per creare da zero il tuo codice HTML e CSS personalizzato.',
    category: 'art',
    tags: ['blank', 'starter', 'custom', 'scratch'],
    previewBg: '#0f172a',
    html: `<div class="my-art-container">
  <div class="my-shape">
    <div class="inner-element"></div>
  </div>
</div>`,
    css: `.my-art-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
}

.my-shape {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulseShape 3s infinite ease-in-out;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
}

.inner-element {
  width: 40px;
  height: 40px;
  background: #ffffff;
  border-radius: 50%;
}

@keyframes pulseShape {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.15) rotate(180deg); }
}`
  },
  {
    id: 'cosmic-jellyfish',
    title: 'Bioluminescent Cosmic Jellyfish',
    description: 'Medusa cosmica trasparente in codice CSS con tentacoli fluttuanti, onde organiche e bolle luminose.',
    category: 'characters',
    tags: ['jellyfish', 'bioluminescence', 'tentacles', 'cosmic', 'glow'],
    previewBg: '#050814',
    html: `<div class="jellyfish-stage">
  <div class="jellyfish">
    <div class="jelly-dome">
      <div class="jelly-inner-glow"></div>
      <div class="jelly-eye left"></div>
      <div class="jelly-eye right"></div>
    </div>
    <div class="tentacles">
      <div class="tentacle t1"></div>
      <div class="tentacle t2"></div>
      <div class="tentacle t3"></div>
      <div class="tentacle t4"></div>
      <div class="tentacle t5"></div>
    </div>
  </div>
  <div class="bubble b1"></div>
  <div class="bubble b2"></div>
  <div class="bubble b3"></div>
</div>`,
    css: `.jellyfish-stage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  position: relative;
  overflow: hidden;
}

.jellyfish {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: floatJelly 4s ease-in-out infinite;
}

.jelly-dome {
  position: relative;
  width: 90px;
  height: 60px;
  background: radial-gradient(circle at 50% 20%, rgba(255, 78, 0, 0.9), rgba(168, 85, 247, 0.7));
  border-radius: 50px 50px 18px 18px;
  box-shadow: 0 0 25px rgba(255, 78, 0, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.jelly-inner-glow {
  position: absolute;
  top: 10px;
  left: 15px;
  width: 60px;
  height: 25px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  filter: blur(4px);
}

.jelly-eye {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  top: 32px;
  box-shadow: 0 0 8px #fff;
}
.jelly-eye.left { left: 28px; }
.jelly-eye.right { right: 28px; }

.tentacles {
  display: flex;
  gap: 6px;
  margin-top: -4px;
}

.tentacle {
  width: 5px;
  height: 65px;
  background: linear-gradient(to bottom, rgba(255, 78, 0, 0.8), rgba(168, 85, 247, 0.2));
  border-radius: 10px;
  transform-origin: top center;
  animation: waveTentacle 3s ease-in-out infinite alternate;
}

.t1 { animation-delay: 0s; height: 55px; }
.t2 { animation-delay: 0.4s; height: 70px; width: 6px; }
.t3 { animation-delay: 0.8s; height: 75px; }
.t4 { animation-delay: 0.2s; height: 68px; width: 6px; }
.t5 { animation-delay: 0.6s; height: 50px; }

.bubble {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: riseBubble 4s linear infinite;
}
.b1 { width: 10px; height: 10px; left: 25%; bottom: 10px; animation-delay: 0s; }
.b2 { width: 6px; height: 6px; left: 70%; bottom: 10px; animation-delay: 1.5s; }
.b3 { width: 14px; height: 14px; left: 80%; bottom: 10px; animation-delay: 2.8s; }

@keyframes floatJelly {
  0%, 100% { transform: translateY(0) scaleY(1); }
  50% { transform: translateY(-18px) scaleY(1.05); }
}

@keyframes waveTentacle {
  0% { transform: rotate(-12deg); }
  100% { transform: rotate(12deg); }
}

@keyframes riseBubble {
  0% { transform: translateY(0); opacity: 0.8; }
  100% { transform: translateY(-200px); opacity: 0; }
}`
  },
  {
    id: 'retro-turntable',
    title: 'Retro Vinyl Turntable',
    description: 'Giradischi vintage animato con disco in vinile rotante, braccio del fonografo e VU meter pulsante.',
    category: 'art',
    tags: ['vinyl', 'music', 'retro', 'turntable', 'spin'],
    previewBg: '#121212',
    html: `<div class="turntable-deck">
  <div class="vinyl-platter">
    <div class="vinyl-record">
      <div class="groove g1"></div>
      <div class="groove g2"></div>
      <div class="vinyl-label">
        <div class="center-hole"></div>
      </div>
    </div>
  </div>
  
  <div class="tonearm-assembly">
    <div class="tonearm-base"></div>
    <div class="tonearm-stick"></div>
    <div class="cartridge"></div>
  </div>

  <div class="vu-meter">
    <div class="vu-needle"></div>
  </div>
</div>`,
    css: `.turntable-deck {
  width: 210px;
  height: 160px;
  background: #2a1f1a;
  border-radius: 16px;
  border: 4px solid #4a382c;
  box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1);
  position: relative;
  margin: 30px auto;
  display: flex;
  align-items: center;
  padding: 12px;
}

.vinyl-platter {
  width: 125px;
  height: 125px;
  background: #111;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.8);
}

.vinyl-record {
  width: 118px;
  height: 118px;
  background: radial-gradient(circle, #222 0%, #050505 100%);
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spinVinyl 3s linear infinite;
  box-shadow: inset 0 0 10px rgba(255,255,255,0.15);
}

.groove {
  position: absolute;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 50%;
}
.g1 { width: 95px; height: 95px; }
.g2 { width: 70px; height: 70px; }

.vinyl-label {
  width: 42px;
  height: 42px;
  background: #FF4E00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

.center-hole {
  width: 8px;
  height: 8px;
  background: #121212;
  border-radius: 50%;
}

.tonearm-assembly {
  position: absolute;
  top: 18px;
  right: 22px;
  width: 30px;
  height: 100px;
  pointer-events: none;
}

.tonearm-base {
  width: 22px;
  height: 22px;
  background: #71717a;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0,0,0,0.4);
}

.tonearm-stick {
  width: 4px;
  height: 75px;
  background: #a1a1aa;
  position: absolute;
  top: 10px;
  left: 9px;
  transform-origin: top center;
  transform: rotate(-24deg);
}

.cartridge {
  width: 10px;
  height: 16px;
  background: #FF4E00;
  position: absolute;
  bottom: 12px;
  right: 18px;
  border-radius: 2px;
}

.vu-meter {
  position: absolute;
  bottom: 12px;
  right: 18px;
  width: 32px;
  height: 18px;
  background: #000;
  border: 1px solid #4a382c;
  border-radius: 4px;
  overflow: hidden;
}

.vu-needle {
  width: 2px;
  height: 14px;
  background: #FF4E00;
  margin: 2px auto 0;
  transform-origin: bottom center;
  animation: swingNeedle 1.2s ease-in-out infinite alternate;
}

@keyframes spinVinyl {
  100% { transform: rotate(360deg); }
}

@keyframes swingNeedle {
  0% { transform: rotate(-30deg); }
  100% { transform: rotate(30deg); }
}`
  },
  {
    id: 'neko-waving-cat',
    title: 'Kawaii Neko Cat (Waving Paw)',
    description: 'Gatto portafortuna Maneki Neko con zampina che saluta, coda dondolante e musetto vettoriale.',
    category: 'characters',
    tags: ['cat', 'neko', 'kawaii', 'waving', 'cute'],
    previewBg: '#120907',
    html: `<div class="neko-container">
  <div class="neko-body">
    <div class="neko-ear left"><div class="inner-ear"></div></div>
    <div class="neko-ear right"><div class="inner-ear"></div></div>
    
    <div class="neko-face">
      <div class="neko-eye left"></div>
      <div class="neko-eye right"></div>
      <div class="neko-nose"></div>
      <div class="neko-whiskers left"><span></span><span></span></div>
      <div class="neko-whiskers right"><span></span><span></span></div>
    </div>

    <div class="neko-paw waving-paw">
      <div class="paw-pad"></div>
    </div>

    <div class="neko-tail"></div>
  </div>
</div>`,
    css: `.neko-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
}

.neko-body {
  position: relative;
  width: 100px;
  height: 110px;
  background: #f1f5f9;
  border-radius: 50px 50px 35px 35px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3), inset -6px -6px 12px rgba(0,0,0,0.08);
}

.neko-ear {
  position: absolute;
  top: -16px;
  width: 32px;
  height: 32px;
  background: #f1f5f9;
  border-radius: 8px 24px 0 0;
}
.neko-ear.left { left: 4px; transform: rotate(-12deg); }
.neko-ear.right { right: 4px; transform: rotate(12deg) scaleX(-1); }

.inner-ear {
  width: 18px;
  height: 18px;
  background: #f472b6;
  margin: 7px 0 0 5px;
  border-radius: 4px 16px 0 0;
}

.neko-face {
  position: relative;
  top: 28px;
}

.neko-eye {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #0f172a;
  border-radius: 50%;
}
.neko-eye.left { left: 24px; }
.neko-eye.right { right: 24px; }

.neko-nose {
  width: 8px;
  height: 6px;
  background: #f472b6;
  border-radius: 50%;
  margin: 18px auto 0;
}

.neko-whiskers {
  position: absolute;
  top: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.neko-whiskers span {
  width: 18px;
  height: 2px;
  background: #94a3b8;
  border-radius: 2px;
}
.neko-whiskers.left { left: -6px; transform: rotate(5deg); }
.neko-whiskers.right { right: -6px; transform: rotate(-5deg); }

.waving-paw {
  position: absolute;
  top: 45px;
  right: -12px;
  width: 26px;
  height: 38px;
  background: #f1f5f9;
  border-radius: 14px;
  transform-origin: top left;
  animation: wavePaw 1.5s ease-in-out infinite alternate;
  box-shadow: 2px 4px 8px rgba(0,0,0,0.15);
}

.paw-pad {
  width: 10px;
  height: 10px;
  background: #f472b6;
  border-radius: 50%;
  margin: 20px auto 0;
}

.neko-tail {
  position: absolute;
  bottom: 10px;
  left: -20px;
  width: 12px;
  height: 50px;
  background: #f1f5f9;
  border-radius: 10px;
  transform-origin: bottom right;
  animation: wagTail 2.5s ease-in-out infinite alternate;
  z-index: -1;
}

@keyframes wavePaw {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-35deg); }
}

@keyframes wagTail {
  0% { transform: rotate(-15deg); }
  100% { transform: rotate(25deg); }
}`
  },
  {
    id: 'cyber-radio-tower',
    title: 'Cyberpunk Radio Signal Tower',
    description: 'Torre di trasmissione cyberpunk con onde radio elettromagnetiche concentriche in espansione.',
    category: '3d',
    tags: ['cyberpunk', 'tower', 'radar', 'radio', 'pulse'],
    previewBg: '#05050A',
    html: `<div class="radar-scene">
  <div class="pulse-ring r1"></div>
  <div class="pulse-ring r2"></div>
  <div class="pulse-ring r3"></div>

  <div class="radio-tower">
    <div class="beacon-light"></div>
    <div class="dish"></div>
    <div class="spire"></div>
    <div class="struts"></div>
  </div>
</div>`,
    css: `.radar-scene {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  position: relative;
  overflow: hidden;
}

.radio-tower {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.beacon-light {
  width: 14px;
  height: 14px;
  background: #FF4E00;
  border-radius: 50%;
  box-shadow: 0 0 20px #FF4E00, 0 0 40px #FF4E00;
  animation: beaconFlash 1s ease-in-out infinite alternate;
}

.spire {
  width: 4px;
  height: 45px;
  background: linear-gradient(to bottom, #FF4E00, #38bdf8);
}

.dish {
  width: 32px;
  height: 12px;
  background: #0284c7;
  border-radius: 0 0 16px 16px;
  border-top: 2px solid #38bdf8;
  margin-top: -6px;
}

.struts {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 75px solid #1e293b;
  position: relative;
  margin-top: -2px;
}

.pulse-ring {
  position: absolute;
  border: 2px solid #FF4E00;
  border-radius: 50%;
  animation: expandWave 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
  opacity: 0;
}

.r1 { animation-delay: 0s; }
.r2 { animation-delay: 1s; }
.r3 { animation-delay: 2s; }

@keyframes expandWave {
  0% { width: 10px; height: 10px; opacity: 1; }
  100% { width: 260px; height: 260px; opacity: 0; border-color: #38bdf8; }
}

@keyframes beaconFlash {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.3); }
}`
  },
  {
    id: 'morphing-lava-lamp',
    title: 'Fluid Morphing Lava Lamp',
    description: 'Lampada Lava anni \'70 con bolle liquide fluide in morphing continuo e sfumature iridescenti.',
    category: 'animations',
    tags: ['lava-lamp', 'fluid', 'morphing', 'border-radius', 'psychedelic'],
    previewBg: '#0d021a',
    html: `<div class="lava-lamp">
  <div class="lamp-cap"></div>
  <div class="lamp-glass">
    <div class="lava-blob b-1"></div>
    <div class="lava-blob b-2"></div>
    <div class="lava-blob b-3"></div>
  </div>
  <div class="lamp-base"></div>
</div>`,
    css: `.lava-lamp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 220px;
}

.lamp-cap {
  width: 45px;
  height: 18px;
  background: linear-gradient(135deg, #a1a1aa, #3f3f46);
  border-radius: 8px 8px 2px 2px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.lamp-glass {
  width: 70px;
  height: 130px;
  background: rgba(255, 78, 0, 0.15);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px 20px 10px 10px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(2px);
  box-shadow: 0 0 20px rgba(255, 78, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.1);
}

.lamp-base {
  width: 60px;
  height: 35px;
  background: linear-gradient(135deg, #52525b, #18181b);
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
  margin-top: -2px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

.lava-blob {
  position: absolute;
  background: linear-gradient(45deg, #FF4E00, #ec4899);
  box-shadow: 0 0 15px #FF4E00;
  animation: morphFloat 6s ease-in-out infinite alternate;
}

.b-1 {
  width: 38px;
  height: 38px;
  left: 16px;
  bottom: 10px;
  animation-duration: 5s;
}

.b-2 {
  width: 26px;
  height: 26px;
  left: 22px;
  bottom: 50px;
  animation-duration: 7s;
  animation-delay: -2s;
}

.b-3 {
  width: 18px;
  height: 18px;
  left: 30px;
  bottom: 85px;
  animation-duration: 4s;
  animation-delay: -1s;
}

@keyframes morphFloat {
  0% {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    transform: translateY(0);
  }
  50% {
    border-radius: 60% 40% 30% 70% / 50% 30% 70% 40%;
    transform: translateY(-40px);
  }
  100% {
    border-radius: 50% 50% 40% 60% / 30% 60% 40% 70%;
    transform: translateY(-80px);
  }
}`
  }
];

