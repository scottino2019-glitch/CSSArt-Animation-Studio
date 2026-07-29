export type CategoryType = 'all' | 'characters' | 'art' | '3d' | 'ui' | 'animations' | 'saved';

export interface Template {
  id: string;
  title: string;
  description: string;
  category: 'characters' | 'art' | '3d' | 'ui' | 'animations';
  tags: string[];
  html: string;
  css: string;
  previewBg?: string;
}

export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  type: 'css' | 'html';
  category: 'keyframes' | 'effects' | 'layout' | 'shapes';
}

export interface SavedArt {
  id: string;
  title: string;
  html: string;
  css: string;
  createdAt: number;
  updatedAt: number;
}

export interface PreviewConfig {
  bgColor: string;
  zoom: number;
  isPaused: boolean;
  forceHover: boolean;
  showCardFrame: boolean;
  cardGlowColor: string;
  gridOverlay: boolean;
}

export type EditorTab = 'html' | 'css' | 'split';
