
import React, { useState } from 'react';
import { Asset3D } from '../types';
import { SparklesIcon, ScanIcon } from './Icons';

interface AssetDetailProps {
  asset: Asset3D;
  onClose: () => void;
}

const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onClose }) => {
  const [activeModel, setActiveModel] = useState(asset.modelUrl);
  const [activeVersionIndex, setActiveVersionIndex] = useState(asset.versions ? asset.versions.length - 1 : 0);
  
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
          
          <div className="w-full h-full transition-all duration-1000">
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

          {/* Evolution Timeline Overlay */}
          {asset.versions && asset.versions.length > 1 && (
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
             </div>
          </div>
        </div>

        {/* Right: Asset Intelligence (35%) */}
        <div className="flex-1 p-10 lg:p-14 overflow-y-auto space-y-14 bg-slate-950/60 border-l border-white/5">
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
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Description</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <p className="text-xl leading-relaxed text-slate-200 font-light text-justify">{asset.description}</p>
                
                {asset.tags && (
                   <div className="flex flex-wrap gap-2">
                      {asset.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-gray-400">#{tag}</span>
                      ))}
                   </div>
                )}
              </div>

              <div className="pt-10 flex flex-col gap-4">
                 <button className="w-full py-6 bg-white text-black font-black rounded-3xl hover:scale-[1.02] transition-transform active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.05)] text-sm tracking-widest">DOWNLOAD MASTER RECON</button>
                 <button className="w-full py-6 glass border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all text-sm tracking-widest uppercase">Augment Reality Link</button>
              </div>
            </div>
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
