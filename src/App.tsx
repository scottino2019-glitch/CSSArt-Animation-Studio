import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CodeEditor } from './components/CodeEditor';
import { LivePreview } from './components/LivePreview';
import { TemplateGalleryModal } from './components/TemplateGalleryModal';
import { SavedArtModal } from './components/SavedArtModal';
import { TEMPLATES } from './data/templates';
import { Template, PreviewConfig, SavedArt } from './types';
import { formatHTML, formatCSS } from './utils/codeFormatter';
import { decodeHashToState } from './utils/share';

export default function App() {
  const defaultTemplate = TEMPLATES[0]; // Mini character

  const [currentTemplateId, setCurrentTemplateId] = useState<string>(defaultTemplate.id);
  const [html, setHtml] = useState<string>(defaultTemplate.html);
  const [css, setCss] = useState<string>(defaultTemplate.css);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  const [previewConfig, setPreviewConfig] = useState<PreviewConfig>({
    bgColor: '#0f172a',
    zoom: 1,
    isPaused: false,
    forceHover: false,
    showCardFrame: false,
    cardGlowColor: 'indigo',
    gridOverlay: false,
  });

  // Load from URL Hash if present, or LocalStorage
  useEffect(() => {
    const hashState = decodeHashToState();
    if (hashState) {
      setHtml(hashState.html);
      setCss(hashState.css);
      setCurrentTemplateId('shared_link');
      return;
    }

    try {
      const savedState = localStorage.getItem('pure_css_current_workspace');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        if (parsed.html && parsed.css) {
          setHtml(parsed.html);
          setCss(parsed.css);
          if (parsed.templateId) setCurrentTemplateId(parsed.templateId);
        }
      }
    } catch (e) {
      console.warn('Could not restore workspace state:', e);
    }
  }, []);

  // Auto-save current workspace state on edit
  useEffect(() => {
    try {
      localStorage.setItem(
        'pure_css_current_workspace',
        JSON.stringify({ html, css, templateId: currentTemplateId })
      );
    } catch (e) {
      console.warn('Auto-save workspace error:', e);
    }
  }, [html, css, currentTemplateId]);

  const handleSelectTemplate = (template: Template) => {
    setCurrentTemplateId(template.id);
    setHtml(template.html);
    setCss(template.css);
    if (template.previewBg) {
      setPreviewConfig((prev) => ({ ...prev, bgColor: template.previewBg! }));
    }
  };

  const handleFormatCode = () => {
    setHtml(formatHTML(html));
    setCss(formatCSS(css));
  };

  const handleInsertSnippet = (snippetCode: string) => {
    setCss((prevCss) => prevCss + '\n\n' + snippetCode);
  };

  const handleNewBlank = () => {
    const blank = TEMPLATES.find((t) => t.id === 'blank-canvas') || TEMPLATES[TEMPLATES.length - 1];
    handleSelectTemplate(blank);
  };

  const handleLoadSaved = (art: SavedArt) => {
    setHtml(art.html);
    setCss(art.css);
    setCurrentTemplateId(art.id);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 flex flex-col font-sans selection:bg-[#FF4E00] selection:text-white overflow-x-hidden">
      {/* MENU SOPRA CON TEMPLATE (Navbar) */}
      <Navbar
        currentTemplateId={currentTemplateId}
        onSelectTemplate={handleSelectTemplate}
        onOpenGallery={() => setIsGalleryOpen(true)}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onNewBlank={handleNewBlank}
        html={html}
        css={css}
      />

      {/* SOTTO IL MENU: EDITOR E ANTEPRIMA ISTANTANEA */}
      <main className="flex-1 p-3 md:p-4 max-w-[1800px] w-full mx-auto flex flex-col min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-80px)] min-h-[650px]">
          {/* Integrated Code Editor (HTML & CSS) */}
          <div className="h-full min-h-[300px]">
            <CodeEditor
              html={html}
              css={css}
              onHtmlChange={(val) => {
                setHtml(val);
                setCurrentTemplateId('custom');
              }}
              onCssChange={(val) => {
                setCss(val);
                setCurrentTemplateId('custom');
              }}
              onFormatCode={handleFormatCode}
              onInsertSnippet={handleInsertSnippet}
            />
          </div>

          {/* Anteprima Istantanea (Live Preview) */}
          <div className="h-full min-h-[300px]">
            <LivePreview
              html={html}
              css={css}
              config={previewConfig}
              onUpdateConfig={setPreviewConfig}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <TemplateGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        onSelectTemplate={handleSelectTemplate}
        currentTemplateId={currentTemplateId}
      />

      <SavedArtModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        onLoadSaved={handleLoadSaved}
        currentHtml={html}
        currentCss={css}
      />
    </div>
  );
}
