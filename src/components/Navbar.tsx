import React, { useState } from 'react';
import { 
  Sparkles, 
  Layout, 
  Bookmark, 
  PlusCircle, 
  Share2, 
  FolderOpen, 
  Palette, 
  Check, 
  Wand2, 
  ChevronRight,
  Code2,
  Box,
  Flame
} from 'lucide-react';
import { Template } from '../types';
import { TEMPLATES } from '../data/templates';
import { encodeStateToHash } from '../utils/share';

interface NavbarProps {
  currentTemplateId: string;
  onSelectTemplate: (template: Template) => void;
  onOpenGallery: () => void;
  onOpenSaved: () => void;
  onNewBlank: () => void;
  html: string;
  css: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTemplateId,
  onSelectTemplate,
  onOpenGallery,
  onOpenSaved,
  onNewBlank,
  html,
  css,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  // Quick shortcuts for top bar
  const quickTemplates = TEMPLATES.filter((t) =>
    ['mini-character', 'artist-palette', 'cute-ghost', 'cosmic-solar-system', '3d-rotating-cube', 'cyber-neon-button'].includes(t.id)
  );

  const handleShare = () => {
    const hash = encodeStateToHash(html, css);
    const fullUrl = `${window.location.origin}${window.location.pathname}${hash}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <header className="bg-[#050505] border-b border-white/10 sticky top-0 z-40 shadow-2xl">
      <div className="max-w-[1800px] mx-auto px-5 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* App Title & Brand (Georgia Serif Italic Logo) */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF4E00] flex items-center justify-center shadow-lg shadow-[#FF4E00]/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-serif italic text-xl tracking-tight text-white flex items-center gap-2">
                CSS Art Studio
                <span className="not-italic text-[10px] font-sans font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#FF4E00]/15 text-[#FF4E00] border border-[#FF4E00]/30">
                  v1.0 • Puro Codice
                </span>
              </h1>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenGallery}
              className="px-3 py-1.5 text-xs uppercase font-semibold tracking-wider bg-[#FF4E00] text-white rounded-full flex items-center gap-1"
            >
              <Layout className="w-3.5 h-3.5" />
              Template
            </button>
          </div>
        </div>

        {/* TOP MENU TEMPLATE CAROUSEL / RAIL */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 custom-scrollbar">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center gap-1.5 shrink-0 mr-1">
            <Flame className="w-3.5 h-3.5 text-[#FF4E00]" />
            Template:
          </div>

          {quickTemplates.map((template) => {
            const isSelected = currentTemplateId === template.id;
            return (
              <button
                key={template.id}
                onClick={() => onSelectTemplate(template)}
                className={`px-3 py-1.5 rounded-lg text-xs tracking-wide transition-all flex items-center gap-1.5 shrink-0 border ${
                  isSelected
                    ? 'bg-[#FF4E00]/10 text-[#FF4E00] border-[#FF4E00] font-semibold shadow-sm shadow-[#FF4E00]/20'
                    : 'bg-white/[0.03] text-white/70 hover:text-white border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                }`}
              >
                <span>{template.title.split(' ')[0]} {template.title.split(' ')[1] || ''}</span>
              </button>
            );
          })}

          {/* Open Full Gallery Modal Button */}
          <button
            onClick={onOpenGallery}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#FF4E00] bg-[#FF4E00]/10 hover:bg-[#FF4E00]/20 border border-[#FF4E00]/40 flex items-center gap-1 shrink-0 ml-1 transition-all"
          >
            <Layout className="w-3.5 h-3.5" />
            Tutti ({TEMPLATES.length})
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Right Menu Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/[0.05] hover:bg-white/10 text-white/80 hover:text-white rounded-lg border border-white/10 transition-colors"
            title="I miei progetti salvati nel browser"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#FF4E00]" />
            Progetti Salvati
          </button>

          <button
            onClick={onNewBlank}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/[0.05] hover:bg-white/10 text-white/80 hover:text-white rounded-lg border border-white/10 transition-colors"
            title="Pulisci l'editor e crea da zero"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            Crea da Zero
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-5 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#FF4E00] hover:bg-[#ff611a] text-white rounded-full shadow-lg shadow-[#FF4E00]/25 transition-all"
            title="Genera link univoco con il tuo codice"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copiato!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Condividi</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
