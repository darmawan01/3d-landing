
import React, { useEffect, useState } from 'react';
import { Asset3D, AssetVersion } from '../types';
import { generateAssetStory, suggestRemix } from '../services/geminiService';
import { SparklesIcon, BoxIcon, LayersIcon, ScanIcon, PlusIcon } from './Icons';

interface AssetDetailProps {
  asset: Asset3D;
  onClose: () => void;
}

const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onClose }) => {
  const [activeModel, setActiveModel] = useState(asset.modelUrl);
  const [activeVersionIndex, setActiveVersionIndex] = useState(asset.versions ? asset.versions.length - 1 : 0);
  const [aiStory, setAiStory] = useState<string>('');
  const [loadingStory, setLoadingStory] = useState(true);
  
  // Remix States
  const [remixPrompt, setRemixPrompt] = useState('');
  const [remixResult, setRemixResult] = useState<string | null>(null);
  const [isRemixing, setIsRemixing] = useState(false);
  const [mode, setMode] = useState<'view' | 'remix'>('view');
  const [isVisualOverride, setIsVisualOverride] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      setLoadingStory(true);
      const story = await generateAssetStory(asset.title, asset.description || '');
      setAiStory(story || '');
      setLoadingStory(false);
    };
    fetchStory();
  }, [asset]);

  const handleRemix = async () => {
    if (!remixPrompt) return;
    setIsRemixing(true);
    const result = await suggestRemix(asset.title, remixPrompt);
    setRemixResult(result || '');
    setIsRemixing(false);
    setIsVisualOverride(true); // Simulate material application
  };

  const handleVersionChange = (index: number) => {
    if (!asset.versions) return;
    setActiveVersionIndex(index);
    setActiveModel(asset.versions[index].modelUrl);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-10">
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative w-full max-w-[1700px] h-full glass border-white/5 md:rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_0_120px_rgba(0,0,0,0.8)] animate-in zoom-in duration-500">
        
        {/* Left: Studio Viewport (65%) */}
        <div className="flex-[2] bg-[#020202] relative overflow-hidden group">
          {/* Diagnostic Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay" 
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
          />
          
          <div className={`w-full h-full transition-all duration-1000 ${isVisualOverride ? 'brightness-125 saturate-150 contrast-125 hue-rotate-[180deg]' : ''}`}>
            {/* @ts-ignore */}
            <model-viewer
              src={activeModel}
              alt={asset.title}
              auto-rotate
              camera-controls
              shadow-intensity="2"
              environment-image="neutral"
              exposure="1.4"
              class="w-full h-full"
            />
          </div>

          {/* Visual Overlay Scan Line */}
          {isRemixing && <div className="scan-line" />}

          {/* Evolution Timeline Overlay */}
          {asset.versions && asset.versions.length > 1 && mode === 'view' && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[85%] max-w-2xl px-10 py-8 glass rounded-[2.5rem] border-white/10 flex flex-col gap-6 animate-in slide-in-from-bottom-12 shadow-2xl">
              <div className="flex justify-between items-center text-[11px] font-black tracking-[0.3em] uppercase text-indigo-400">
                <span className="flex items-center gap-2">
                  <ScanIcon /> Temporal Sequence
                </span>
                <span>Archive: {asset.versions[activeVersionIndex].date}</span>
              </div>
              <div className="relative h-2.5 bg-white/10 rounded-full flex items-center">
                <input 
                  type="range" 
                  min="0" 
                  max={asset.versions.length - 1} 
                  value={activeVersionIndex}
                  onChange={(e) => handleVersionChange(parseInt(e.target.value))}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="absolute h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full transition-all duration-300" style={{ width: `${(activeVersionIndex / (asset.versions.length - 1)) * 100}%` }} />
                {asset.versions.map((_, i) => (
                  <div key={i} className={`absolute w-4 h-4 rounded-full border-2 transition-all ${i <= activeVersionIndex ? 'bg-indigo-500 border-indigo-300 scale-110 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-800 border-white/10'}`} style={{ left: `${(i / (asset.versions.length - 1)) * 100}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                 <p>{asset.versions[0].label}</p>
                 <p className="text-white">{asset.versions[activeVersionIndex].label}</p>
                 <p>{asset.versions[asset.versions.length - 1].label}</p>
              </div>
            </div>
          )}

          {/* Viewport UI Controls */}
          <div className="absolute top-12 left-12 space-y-4">
             <div className="flex gap-2">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-mono text-gray-300 uppercase tracking-widest">Core Synchronized</span>
                </div>
                {isVisualOverride && (
                   <button 
                    onClick={() => setIsVisualOverride(false)}
                    className="px-4 py-2 bg-indigo-600 border border-indigo-400 rounded-xl text-[10px] font-mono text-white uppercase tracking-widest hover:bg-indigo-500 transition-colors"
                   >
                     Reset Visuals
                   </button>
                )}
             </div>
          </div>

          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex p-2 glass rounded-2xl border-white/10 shadow-xl z-20">
            <button onClick={() => setMode('view')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'view' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>Archive View</button>
            <button onClick={() => setMode('remix')} className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'remix' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-500 hover:text-white'}`}>Neural Remix</button>
          </div>
        </div>

        {/* Right: Asset Intelligence (35%) */}
        <div className="flex-1 p-10 lg:p-14 overflow-y-auto space-y-14 bg-slate-950/60 border-l border-white/5">
          {mode === 'view' ? (
            <div className="space-y-14 animate-in fade-in slide-in-from-right-10 duration-700">
              <header className="space-y-6">
                <div className="flex items-center gap-3 text-indigo-400 font-black text-[11px] uppercase tracking-[0.5em]">
                  <SparklesIcon /> Provenance Archive v.2
                </div>
                <h2 className="text-6xl font-black tracking-tighter leading-none">{asset.title}</h2>
                <div className="flex flex-wrap gap-3">
                   <div className="px-5 py-3 glass-card rounded-2xl border-white/10">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Density</p>
                      <p className="text-xl font-black">{asset.polyCount}</p>
                   </div>
                   <div className="px-5 py-3 glass-card rounded-2xl border-white/10">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Archive Load</p>
                      <p className="text-xl font-black">{asset.fileSize}</p>
                   </div>
                </div>
              </header>

              <div className="space-y-8">
                <div className="flex items-center gap-5">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Semantic Reconstruction</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                {loadingStory ? (
                  <div className="space-y-4 animate-pulse"><div className="h-4 bg-white/5 w-full rounded-lg"/><div className="h-4 bg-white/5 w-3/4 rounded-lg"/><div className="h-4 bg-white/5 w-1/2 rounded-lg"/></div>
                ) : (
                  <p className="text-2xl leading-[1.4] text-slate-200 font-light italic">"{aiStory}"</p>
                )}
              </div>

              <div className="pt-10 flex flex-col gap-4">
                 <button className="w-full py-6 bg-white text-black font-black rounded-3xl hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.05)] text-sm tracking-widest">DOWNLOAD MASTER RECON</button>
                 <button className="w-full py-6 glass border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all text-sm tracking-widest uppercase">Augment Reality Link</button>
              </div>
            </div>
          ) : (
            <div className="space-y-14 animate-in fade-in slide-in-from-right-10 duration-700">
              <header className="space-y-6">
                <div className="flex items-center gap-3 text-purple-400 font-black text-[11px] uppercase tracking-[0.5em]">
                  <SparklesIcon /> Remix Laboratory
                </div>
                <h2 className="text-6xl font-black tracking-tighter leading-none">Modify Essence.</h2>
                <p className="text-slate-400 font-light text-lg leading-relaxed">Leverage the Gemini Neural Engine to synthesize new material properties and lighting environments for this capture.</p>
              </header>

              <div className="space-y-8">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Neural Prompt</p>
                    <textarea 
                      value={remixPrompt}
                      onChange={(e) => setRemixPrompt(e.target.value)}
                      placeholder="Describe a material shift (e.g. 'Liquid obsidian with internal neon core')..."
                      className="w-full h-40 p-8 glass border-white/10 rounded-[2.5rem] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-lg font-light resize-none placeholder:text-gray-700"
                    />
                 </div>
                 <button 
                  onClick={handleRemix}
                  disabled={isRemixing || !remixPrompt}
                  className={`w-full py-6 bg-indigo-600 text-white font-black rounded-3xl flex items-center justify-center gap-4 transition-all hover:bg-indigo-500 active:scale-95 disabled:opacity-30 tracking-widest ${isRemixing ? 'animate-pulse' : ''}`}
                 >
                  {isRemixing ? 'SYNTESIZING TOPOLOGY...' : 'GENERATE VISUAL REMIX'}
                 </button>
              </div>

              {remixResult && (
                <div className="p-10 glass bg-indigo-500/5 border-indigo-500/20 rounded-[3rem] space-y-6 animate-in zoom-in duration-500 shadow-2xl">
                  <div className="flex items-center gap-3 text-indigo-400">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Predicted Variant Record</span>
                  </div>
                  <p className="text-xl leading-relaxed text-indigo-100 font-light italic">"{remixResult}"</p>
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full w-fit">
                    <span className="text-[10px] font-black uppercase tracking-widest">Visual Override Active</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-12 right-12 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group z-[120] backdrop-blur-xl"
        >
          <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
};

export default AssetDetail;
