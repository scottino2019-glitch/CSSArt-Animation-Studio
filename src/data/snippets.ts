import { Snippet } from '../types';

export const CSS_SNIPPETS: Snippet[] = [
  {
    id: 'keyframe-float',
    title: '@keyframes float',
    description: 'Animazione di galleggiamento morbido su e giù',
    type: 'css',
    category: 'keyframes',
    code: `@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}`
  },
  {
    id: 'keyframe-pulse-glow',
    title: '@keyframes pulse-glow',
    description: 'Pulsazione di scala e bagliore shadow neon',
    type: 'css',
    category: 'keyframes',
    code: `@keyframes pulseGlow {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
  }
  50% {
    transform: scale(1.08);
    box-shadow: 0 0 35px rgba(168, 85, 247, 0.8);
  }
}`
  },
  {
    id: 'keyframe-spin',
    title: '@keyframes spin',
    description: 'Rotazione continua a 360 gradi',
    type: 'css',
    category: 'keyframes',
    code: `@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`
  },
  {
    id: 'keyframe-blink',
    title: '@keyframes blink (occhi)',
    description: 'Chiusura temporanea degli occhi in scala Y',
    type: 'css',
    category: 'keyframes',
    code: `@keyframes blink {
  0%, 95%, 100% {
    transform: scaleY(1);
  }
  98% {
    transform: scaleY(0.1);
  }
}`
  },
  {
    id: 'glassmorphism',
    title: 'Glassmorphism Style',
    description: 'Sfondo semi-trasparente sfocato con bordo luminoso',
    type: 'css',
    category: 'effects',
    code: `background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.15);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
border-radius: 20px;`
  },
  {
    id: 'flex-center',
    title: 'Flex Centering',
    description: 'Centraggio perfetto degli elementi figli',
    type: 'css',
    category: 'layout',
    code: `display: flex;
justify-content: center;
align-items: center;`
  },
  {
    id: 'pseudo-before-after',
    title: '::before & ::after Template',
    description: 'Struttura per pseudo-elementi decorativi',
    type: 'css',
    category: 'shapes',
    code: `.element::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #6366f1;
  border-radius: 50%;
  z-index: -1;
}`
  }
];
