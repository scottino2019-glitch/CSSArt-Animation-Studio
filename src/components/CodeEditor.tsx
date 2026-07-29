import React, { useState, useRef, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-tomorrow.css';
import { 
  Code2, 
  Palette, 
  Wand2, 
  Copy, 
  Check, 
  Sparkles, 
  Type, 
  Maximize2, 
  Minimize2,
  FileCode2,
  Layers,
  HelpCircle
} from 'lucide-react';
import { EditorTab } from '../types';
import { CSS_SNIPPETS } from '../data/snippets';

interface CodeEditorProps {
  html: string;
  css: string;
  onHtmlChange: (val: string) => void;
  onCssChange: (val: string) => void;
  onFormatCode: () => void;
  onInsertSnippet: (snippetCode: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  html,
  css,
  onHtmlChange,
  onCssChange,
  onFormatCode,
  onInsertSnippet,
}) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('split');
  const [copied, setCopied] = useState(false);
  const [showSnippetsPopover, setShowSnippetsPopover] = useState(false);
  const [fontSize, setFontSize] = useState<number>(14);

  // Line count helpers
  const htmlLines = html.split('\n').length;
  const cssLines = css.split('\n').length;

  const copyCurrentTabCode = () => {
    let textToCopy = '';
    if (activeTab === 'html') textToCopy = html;
    else if (activeTab === 'css') textToCopy = css;
    else textToCopy = `/* --- CSS STYLES --- */\n${css}\n\n<!-- --- HTML STRUCTURE --- -->\n${html}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLineNumbers = (linesCount: number) => {
    return Array.from({ length: Math.max(1, linesCount) }, (_, i) => (
      <div key={i + 1} className="text-slate-600 select-none text-right pr-3 font-mono text-xs leading-6">
        {i + 1}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full bg-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl text-slate-200">
      {/* Editor Sub-Header / Tab Navigation */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-[#050505] border-b border-white/10 flex-wrap gap-2">
        {/* Code Tabs */}
        <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/10">
          <button
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'html'
                ? 'bg-[#FF4E00]/20 text-[#FF4E00] border border-[#FF4E00]/40 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5 text-[#FF4E00]" />
            HTML
            <span className="ml-1 text-[10px] bg-black/50 text-white/50 px-1.5 py-0.2 rounded-full font-mono">
              {htmlLines}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('css')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'css'
                ? 'bg-[#FF4E00]/20 text-[#FF4E00] border border-[#FF4E00]/40 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-[#FF4E00]" />
            CSS (Keyframe)
            <span className="ml-1 text-[10px] bg-black/50 text-white/50 px-1.5 py-0.2 rounded-full font-mono">
              {cssLines}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
              activeTab === 'split'
                ? 'bg-[#FF4E00]/20 text-[#FF4E00] border border-[#FF4E00]/40 shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#FF4E00]" />
            Split Editor
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick CSS Snippets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSnippetsPopover(!showSnippetsPopover)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-[#FF4E00]/10 text-[#FF4E00] border border-[#FF4E00]/30 rounded-lg hover:bg-[#FF4E00]/20 transition-colors"
              title="Inserisci snippet CSS pronti"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
              Snippet CSS
            </button>

            {showSnippetsPopover && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#0A0A0A] border border-white/20 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider px-2 py-1 border-b border-white/10 mb-1 flex items-center justify-between font-mono">
                  <span>Snippet Pronti</span>
                  <button onClick={() => setShowSnippetsPopover(false)} className="text-white/50 hover:text-white">✕</button>
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {CSS_SNIPPETS.map((snip) => (
                    <button
                      key={snip.id}
                      onClick={() => {
                        onInsertSnippet(snip.code);
                        setShowSnippetsPopover(false);
                      }}
                      className="w-full text-left p-2 rounded-lg hover:bg-[#FF4E00]/15 hover:border-[#FF4E00]/30 border border-transparent transition-all group"
                    >
                      <div className="text-xs font-semibold text-[#FF4E00] group-hover:text-white">
                        {snip.title}
                      </div>
                      <div className="text-[10px] text-white/50 truncate">
                        {snip.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Format Code */}
          <button
            onClick={onFormatCode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-white/[0.05] hover:bg-white/10 text-white/80 hover:text-white rounded-lg border border-white/10 transition-colors"
            title="Formatta e ordina codice HTML e CSS"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#FF4E00]" />
            Formatta
          </button>

          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center gap-1 bg-black/60 border border-white/10 rounded-lg px-2 py-1">
            <span className="text-[10px] text-white/40 font-mono">Font</span>
            <button
              onClick={() => setFontSize(Math.max(11, fontSize - 1))}
              className="text-xs text-white/60 hover:text-white px-1 font-bold"
            >
              -
            </button>
            <span className="text-xs font-mono text-[#FF4E00] px-0.5">{fontSize}</span>
            <button
              onClick={() => setFontSize(Math.min(22, fontSize + 1))}
              className="text-xs text-white/60 hover:text-white px-1 font-bold"
            >
              +
            </button>
          </div>

          {/* Copy Code */}
          <button
            onClick={copyCurrentTabCode}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-white/[0.05] hover:bg-white/10 text-white/80 hover:text-white rounded-lg border border-white/10 transition-colors"
            title="Copia codice negli appunti"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copiato!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-white/60" />
                <span>Copia</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 min-h-0 overflow-hidden relative flex flex-col md:flex-row bg-[#0F0F0F]">
        {/* HTML Editor Panel */}
        {(activeTab === 'html' || activeTab === 'split') && (
          <div
            className={`flex flex-col h-full overflow-hidden border-r border-white/10 ${
              activeTab === 'split' ? 'w-full md:w-1/2' : 'w-full'
            }`}
          >
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#050505] border-b border-white/10 text-xs font-mono text-[#FF4E00] font-medium select-none">
              <span className="flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5" />
                index.html
              </span>
              <span className="text-[10px] text-white/40">{html.length} chars</span>
            </div>

            <div className="flex-1 overflow-auto flex relative bg-[#0F0F0F] custom-scrollbar">
              {/* Line Numbers */}
              <div className="py-3 bg-[#050505] border-r border-white/10 select-none">
                {renderLineNumbers(htmlLines)}
              </div>

              {/* Code Editor */}
              <div className="flex-1 relative font-mono overflow-auto p-1">
                <Editor
                  value={html}
                  onValueChange={onHtmlChange}
                  highlight={(code) => Prism.highlight(code, Prism.languages.markup, 'markup')}
                  padding={10}
                  style={{
                    fontFamily: '"Courier New", Courier, monospace',
                    fontSize: `${fontSize}px`,
                    lineHeight: '1.6',
                    minHeight: '100%',
                    backgroundColor: 'transparent',
                    color: '#C9D1D9',
                  }}
                  className="focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* CSS Editor Panel */}
        {(activeTab === 'css' || activeTab === 'split') && (
          <div
            className={`flex flex-col h-full overflow-hidden ${
              activeTab === 'split' ? 'w-full md:w-1/2' : 'w-full'
            }`}
          >
            <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#050505] border-b border-white/10 text-xs font-mono text-[#FF4E00] font-medium select-none">
              <span className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                styles.css
              </span>
              <span className="text-[10px] text-white/40">{css.length} chars</span>
            </div>

            <div className="flex-1 overflow-auto flex relative bg-[#0F0F0F] custom-scrollbar">
              {/* Line Numbers */}
              <div className="py-3 bg-[#050505] border-r border-white/10 select-none">
                {renderLineNumbers(cssLines)}
              </div>

              {/* Code Editor */}
              <div className="flex-1 relative font-mono overflow-auto p-1">
                <Editor
                  value={css}
                  onValueChange={onCssChange}
                  highlight={(code) => Prism.highlight(code, Prism.languages.css, 'css')}
                  padding={10}
                  style={{
                    fontFamily: '"Courier New", Courier, monospace',
                    fontSize: `${fontSize}px`,
                    lineHeight: '1.6',
                    minHeight: '100%',
                    backgroundColor: 'transparent',
                    color: '#C9D1D9',
                  }}
                  className="focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Editor Status Bar */}
      <div className="px-3.5 py-1.5 bg-[#050505] border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Synced
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-white/40">
            Press <kbd className="px-1 py-0.5 bg-white/10 rounded border border-white/20 text-white/80">Tab</kbd> to indent
          </span>
        </div>
        <div>
          Artistic Studio • 60fps
        </div>
      </div>
    </div>
  );
};
