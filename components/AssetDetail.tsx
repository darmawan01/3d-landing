
import React, { useEffect, useState } from 'react';
import { Asset3D } from '../types';
import { generateAssetStory } from '../services/geminiService';
import { SparklesIcon, BoxIcon, LayersIcon, ScanIcon } from './Icons';

interface AssetDetailProps {
  asset: Asset3D;
  onClose: () => void;
}

const AssetDetail: React.FC<AssetDetailProps> = ({ asset, onClose }) => {
  const [aiStory, setAiStory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Simulate high-density neural processing
    const timer = setTimeout(() => setIsProcessing(false), 1500);
    
    const fetchStory = async () => {
      setLoading(true);
      const story = await generateAssetStory(asset.title, asset.description || '');
      setAiStory(story || '');
      setLoading(false);
    };
    fetchStory();
    return () => clearTimeout(timer);
  }, [asset]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="relative w-full max-w-7xl h-full lg:h-[90vh] glass border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-500">
        
        {/* Left: 3D Engine Viewport */}
        <div className="flex-1 bg-[#030303] relative overflow-hidden flex items-center justify-center">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-6 animate-pulse">
              <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
              <div className="space-y-2 text-center">
                <p className="text-xs font-mono text-indigo-400 tracking-[0.3em] uppercase">Initializing Neural Render</p>
                <p className="text-[10px] text-gray-600 font-mono uppercase">Optimizing Texture Maps...</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative group">
               {/* 3D Model Renderer */}
               {asset.modelUrl ? (
                 <model-viewer
                   src={asset.modelUrl}
                   alt={asset.title}
                   auto-rotate
                   camera-controls
                   shadow-intensity="1"
                   environment-image="neutral"
                   exposure="1"
                 />
               ) : (
                 <img 
                    src={asset.thumbnail} 
                    alt={asset.title}
                    className="w-full h-full object-contain p-20 opacity-50 grayscale"
                 />
               )}

              {/* Viewport UI Controls */}
              <div className="absolute top-8 left-8 space-y-3 pointer-events-none">
                <div className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                   <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Live Studio Engine 4.0</span>
                </div>
                <div className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl flex flex-col gap-1">
                   <span className="text-[9px] text-gray-500 uppercase font-bold">Latency</span>
                   <span className="text-xs font-mono text-emerald-400">12ms Response</span>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 flex gap-3">
                <div className="px-6 py-4 glass-card rounded-2xl flex items-center gap-4">
                  <div className="text-indigo-400"><ScanIcon /></div>
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold">Polygon Count</p>
                    <p className="text-lg font-black tracking-tighter">{asset.polyCount}</p>
                  </div>
                </div>
                <div className="px-6 py-4 glass-card rounded-2xl flex items-center gap-4">
                  <div className="text-purple-400"><BoxIcon /></div>
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-bold">Data Volume</p>
                    <p className="text-lg font-black tracking-tighter">{asset.fileSize}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group z-10"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Right: Asset Intelligence Panel */}
        <div className="w-full lg:w-[450px] p-10 overflow-y-auto space-y-12 border-t lg:border-t-0 lg:border-l border-white/10 bg-slate-950/50">
          <header className="space-y-6">
             <div className="flex items-center gap-3 text-indigo-400">
                <SparklesIcon />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Gemini AI Record</span>
             </div>
             <h2 className="text-5xl font-black tracking-tighter leading-none">{asset.title}</h2>
             <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-bold rounded-lg text-indigo-300 uppercase tracking-widest">{asset.category}</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] font-bold rounded-lg text-gray-400 uppercase tracking-widest">ID: {asset.id.padStart(4, '0')}</span>
             </div>
          </header>

          <section className="space-y-6">
             <div className="flex items-center gap-4">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.3em] whitespace-nowrap">Provenance Record</h3>
                <div className="h-px w-full bg-white/10" />
             </div>
             {loading ? (
                <div className="space-y-4">
                   <div className="h-4 bg-white/5 rounded-lg w-full animate-pulse" />
                   <div className="h-4 bg-white/5 rounded-lg w-5/6 animate-pulse" />
                   <div className="h-4 bg-white/5 rounded-lg w-4/6 animate-pulse" />
                </div>
             ) : (
                <p className="text-xl leading-relaxed text-slate-200 font-light italic">
                  "{aiStory}"
                </p>
             )}
          </section>

          <section className="space-y-6">
             <div className="flex items-center gap-4">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 tracking-[0.3em] whitespace-nowrap">Contextual Data</h3>
                <div className="h-px w-full bg-white/10" />
             </div>
             <div className="space-y-4">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                   <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Metadata Summary</p>
                   <p className="text-sm text-slate-400 leading-relaxed">
                     {asset.description || "Historical preservation entry. Automated neural reconstruction from 360° photographic source data."}
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-gray-500">
                   <div className="p-3 glass-card rounded-xl">DATE: {asset.date}</div>
                   <div className="p-3 glass-card rounded-xl">LOC: CLOUD-NODE-07</div>
                </div>
             </div>
          </section>

          <div className="pt-10 flex flex-col gap-4">
             <button className="w-full py-5 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5">
                <LayersIcon />
                DOWNLOAD DIGITAL TWIN
             </button>
             <button className="w-full py-5 glass border-white/10 text-white font-bold rounded-2xl transition-all hover:bg-white/10">
                OPEN IN AUGMENTED REALITY
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
