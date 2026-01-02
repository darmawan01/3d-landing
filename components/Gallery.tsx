
import React, { useState, useMemo } from 'react';
import { SAMPLE_ASSETS } from '../constants';
import { Asset3D } from '../types';
import AssetDetail from './AssetDetail';
import { PlusIcon, BoxIcon, ScanIcon, SparklesIcon } from './Icons';

const Gallery: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset3D | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Object', 'Environment', 'Personal', 'Art'];
  
  const highlightedAssets = useMemo(() => SAMPLE_ASSETS.filter(a => a.isHighlighted), []);

  const filteredAssets = useMemo(() => {
    return SAMPLE_ASSETS.filter(a => {
      const matchesFilter = filter === 'All' || a.category === filter;
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  const groupedAssets = useMemo(() => {
    const groups: Record<string, Asset3D[]> = {};
    filteredAssets.forEach(asset => {
      const date = new Date(asset.date);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) groups[monthYear] = [];
      groups[monthYear].push(asset);
    });
    return Object.entries(groups);
  }, [filteredAssets]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-24">
      
      {/* Highlighted Moments Carousel (Thinking Harder) */}
      <section className="animate-in fade-in slide-in-from-top-12 duration-1000">
        <div className="flex items-center gap-4 mb-10">
           <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
           <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">Core Highlighted Moments</h2>
        </div>
        
        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-10 -mx-4 px-4">
          {highlightedAssets.map((asset) => (
            <div 
              key={asset.id} 
              onClick={() => setSelectedAsset(asset)}
              className="flex-shrink-0 w-[300px] md:w-[450px] group cursor-pointer"
            >
              <div className="relative aspect-[16/10] glass-card rounded-[3rem] overflow-hidden border-white/10 group-hover:border-indigo-500/50 transition-all">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-transparent z-10" />
                <model-viewer
                  src={asset.modelUrl}
                  auto-rotate
                  interaction-prompt="none"
                  rotation-per-second="20deg"
                  class="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute bottom-10 left-10 z-20 space-y-1">
                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{asset.category}</span>
                  <h3 className="text-3xl font-black text-white leading-none">{asset.title}</h3>
                </div>
                <div className="absolute top-10 right-10 z-20 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white transition-all">
                  <PlusIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-white/5 w-full" />

      {/* Grid Controls */}
      <div className="sticky top-24 z-30 flex flex-col md:flex-row gap-6 items-center justify-between glass border-white/5 rounded-3xl p-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat ? 'bg-white text-black' : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"><ScanIcon /></div>
          <input 
            type="text" 
            placeholder="Search Memory Archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>
      </div>

      {/* Grouped Memories Grid */}
      <div className="space-y-32">
        {groupedAssets.map(([month, assets]) => (
          <div key={month} className="space-y-12 animate-in fade-in slide-in-from-bottom-12">
            <div className="flex flex-col gap-2">
               <h2 className="text-5xl font-black tracking-tighter">{month}</h2>
               <div className="flex items-center gap-4 text-gray-500">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{assets.length} Captured Instances</span>
                  <div className="h-px flex-1 bg-white/5" />
               </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {assets.map((asset) => (
                <div key={asset.id} onClick={() => setSelectedAsset(asset)} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden glass-card border-white/5 group-hover:border-indigo-500/30 group-hover:shadow-[0_40px_80px_rgba(99,102,241,0.15)] transition-all">
                    <img src={asset.thumbnail} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{asset.category}</span>
                        <h3 className="text-2xl font-black text-white leading-none">{asset.title}</h3>
                      </div>
                      <div className="w-10 h-10 glass rounded-full flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 6v12m6-6H6"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedAsset && <AssetDetail asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
    </div>
  );
};

export default Gallery;
