import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Sparkles, 
  Smile, 
  Palette, 
  Box, 
  MousePointer, 
  Activity, 
  Check, 
  ChevronRight,
  Flame
} from 'lucide-react';
import { CategoryType, Template } from '../types';
import { TEMPLATES } from '../data/templates';

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
  currentTemplateId: string;
}

export const TemplateGalleryModal: React.FC<TemplateGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  currentTemplateId,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Tutti i Template', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { id: 'characters', label: 'Personaggi', icon: <Smile className="w-4 h-4 text-indigo-400" /> },
    { id: 'art', label: 'Arte e Oggetti', icon: <Palette className="w-4 h-4 text-pink-400" /> },
    { id: '3d', label: '3D & Spazio', icon: <Box className="w-4 h-4 text-cyan-400" /> },
    { id: 'ui', label: 'Componenti UI', icon: <MousePointer className="w-4 h-4 text-emerald-400" /> },
    { id: 'animations', label: 'Animazioni', icon: <Activity className="w-4 h-4 text-violet-400" /> },
  ];

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF4E00] flex items-center justify-center shadow-lg shadow-[#FF4E00]/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-serif italic text-xl tracking-tight text-white flex items-center gap-2">
                Galleria Template CSS
                <span className="not-italic text-[10px] font-sans font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FF4E00]/15 text-[#FF4E00] border border-[#FF4E00]/30">
                  Puro Codice
                </span>
              </h2>
              <p className="text-xs text-white/50">
                Scegli un opera vettoriale da caricare nell'editor e personalizzare
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white bg-white/[0.05] hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="px-6 py-3 bg-[#050505]/80 border-b border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto custom-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-[#FF4E00] text-white border-[#FF4E00] shadow-md shadow-[#FF4E00]/25'
                    : 'bg-white/[0.03] text-white/60 hover:text-white border-white/10 hover:bg-white/5'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cerca per nome o tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF4E00] focus:ring-1 focus:ring-[#FF4E00]"
            />
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 custom-scrollbar bg-[#0A0A0A]">
          {filteredTemplates.map((template) => {
            const isCurrent = currentTemplateId === template.id;

            return (
              <div
                key={template.id}
                onClick={() => {
                  onSelectTemplate(template);
                  onClose();
                }}
                className={`group cursor-pointer rounded-2xl bg-white/[0.02] border transition-all duration-200 overflow-hidden flex flex-col justify-between hover:scale-[1.02] ${
                  isCurrent
                    ? 'border-[#FF4E00] ring-1 ring-[#FF4E00]/40 bg-[#FF4E00]/5'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {/* Visual Preview Box */}
                <div
                  className="h-36 relative flex items-center justify-center overflow-hidden border-b border-white/10 p-3"
                  style={{ backgroundColor: template.previewBg || '#0A0A0A' }}
                >
                  <iframe
                    srcDoc={`<!DOCTYPE html><html><head><script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script><style>html,body{margin:0;padding:0;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden;background:transparent;}${template.css}</style></head><body>${template.html}</body></html>`}
                    title={template.title}
                    className="w-full h-full border-none pointer-events-none scale-75 transform-origin-center"
                  />

                  {isCurrent && (
                    <div className="absolute top-2 right-2 bg-[#FF4E00] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <Check className="w-3 h-3" />
                      In Uso
                    </div>
                  )}
                </div>

                {/* Card Information */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#FF4E00] transition-colors">
                        {template.title}
                      </h3>
                    </div>
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed mb-3">
                      {template.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono bg-black/60 text-white/50 px-2 py-0.5 rounded-full border border-white/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      className={`w-full py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? 'bg-white/10 text-white/80 border border-white/20'
                          : 'bg-[#FF4E00] group-hover:bg-[#ff611a] text-white shadow-md shadow-[#FF4E00]/25'
                      }`}
                    >
                      {isCurrent ? 'In Uso' : 'Carica in Editor'}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#050505] border-t border-white/10 flex items-center justify-between text-xs text-white/40 font-mono">
          <span>{filteredTemplates.length} template disponibili</span>
          <span>HTML + CSS vettoriale puro</span>
        </div>
      </div>
    </div>
  );
};
