import React, { useState, useEffect } from 'react';
import { Bookmark, X, Trash2, ExternalLink, Plus, Save, Clock, FolderHeart } from 'lucide-react';
import { SavedArt } from '../types';

interface SavedArtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadSaved: (art: SavedArt) => void;
  currentHtml: string;
  currentCss: string;
}

export const SavedArtModal: React.FC<SavedArtModalProps> = ({
  isOpen,
  onClose,
  onLoadSaved,
  currentHtml,
  currentCss,
}) => {
  const [savedArts, setSavedArts] = useState<SavedArt[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadArtsFromStorage();
    }
  }, [isOpen]);

  const loadArtsFromStorage = () => {
    try {
      const data = localStorage.getItem('pure_css_saved_art');
      if (data) {
        setSavedArts(JSON.parse(data));
      }
    } catch (e) {
      console.warn('Could not load saved art:', e);
    }
  };

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newArt: SavedArt = {
      id: 'art_' + Date.now(),
      title: newTitle.trim(),
      html: currentHtml,
      css: currentCss,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updated = [newArt, ...savedArts];
    setSavedArts(updated);
    localStorage.setItem('pure_css_saved_art', JSON.stringify(updated));
    setNewTitle('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedArts.filter((a) => a.id !== id);
    setSavedArts(updated);
    localStorage.setItem('pure_css_saved_art', JSON.stringify(updated));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF4E00] flex items-center justify-center shadow-lg shadow-[#FF4E00]/30">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-serif italic text-xl tracking-tight text-white">Progetti Salvati</h2>
              <p className="text-xs text-white/50">
                Gestisci e ricarica le tue creazioni conservate nel browser
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

        {/* Save Current Project Box */}
        <div className="p-6 bg-[#050505]/80 border-b border-white/10">
          <form onSubmit={handleSaveCurrent} className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Assegna un titolo al tuo progetto corrente..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF4E00] focus:ring-1 focus:ring-[#FF4E00]"
            />
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-5 py-2 bg-[#FF4E00] hover:bg-[#ff611a] disabled:opacity-50 text-white uppercase tracking-wider font-semibold text-xs rounded-full flex items-center gap-2 transition-all shadow-md shadow-[#FF4E00]/25"
            >
              <Save className="w-4 h-4" />
              Salva
            </button>
          </form>

          {saveSuccess && (
            <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1 font-mono">
              ✓ Progetto salvato con successo nei tuoi salvataggi locali!
            </div>
          )}
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar bg-[#0A0A0A]">
          {savedArts.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              <FolderHeart className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#FF4E00]" />
              <p className="text-sm font-semibold text-white/70">Nessun progetto salvato ancora</p>
              <p className="text-xs text-white/40 mt-1">
                Scrivi il titolo nel campo qui sopra e clicca "Salva" per conservare la tua opera.
              </p>
            </div>
          ) : (
            savedArts.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onLoadSaved(art);
                  onClose();
                }}
                className="group cursor-pointer p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#FF4E00] hover:bg-[#FF4E00]/5 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#FF4E00]/10 border border-[#FF4E00]/30 flex items-center justify-center text-[#FF4E00] font-mono font-bold">
                    CSS
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FF4E00] transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-[11px] text-white/40 flex items-center gap-1 mt-0.5 font-mono">
                      <Clock className="w-3 h-3 text-[#FF4E00]" />
                      {new Date(art.createdAt).toLocaleDateString('it-IT', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDelete(art.id, e)}
                    className="p-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Elimina salvataggio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-1.5 bg-white/10 group-hover:bg-[#FF4E00] group-hover:text-white text-white/80 font-semibold uppercase tracking-wider text-xs rounded-full transition-all flex items-center gap-1">
                    Carica
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
