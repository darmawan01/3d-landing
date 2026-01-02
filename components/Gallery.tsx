
import React, { useState, useMemo } from 'react';
import { SAMPLE_ASSETS } from '../constants';
import { Asset3D } from '../types';
import AssetDetail from './AssetDetail';
import { PlusIcon, BoxIcon, ScanIcon } from './Icons';

const Gallery: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset3D | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Object', 'Environment', 'Personal', 'Art'];
  
  const filteredAssets = useMemo(() => {
    return SAMPLE_ASSETS.filter(a => {
      const matchesFilter = filter === 'All' || a.category === filter;
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  // Grouping by "Month" for a Memory feel
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
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 animate-in fade-in slide-in-from-top-8 duration-700">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Personal Cloud
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Your Archive.</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Managing <span className="text-white font-bold">{SAMPLE_ASSETS.length}</span> high-fidelity reconstructions captured across your journey.
          </p>
        </div>
        
        <button className="group relative px-8 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-600/20">
          <PlusIcon />
          <span>New Neural Capture</span>
          <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-100 transition-transform origin-center" />
        </button>
      </header>

      {/* Interactive Controls Bar */}
      <div className="sticky top-24 z-30 mb-16 glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between border-white/5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat 
                  ? 'bg-white text-black' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
             <ScanIcon />
          </div>
          <input 
            type="text" 
            placeholder="Search artifacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>
      </div>

      {/* Grouped Grid View */}
      <div className="space-y-24">
        {groupedAssets.map(([month, assets]) => (
          <div key={month} className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold uppercase tracking-[0.3em] text-gray-500 whitespace-nowrap">{month}</h2>
              <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {assets.map((asset) => (
                <div 
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden glass-card mb-4 group-hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)]">
                    <img 
                      src={asset.thumbnail} 
                      alt={asset.title}
                      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="space-y-1 translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{asset.category}</span>
                        <h3 className="text-xl font-bold leading-none">{asset.title}</h3>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black p-3 rounded-full scale-50 group-hover:scale-100 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {groupedAssets.length === 0 && (
          <div className="py-32 text-center space-y-4 animate-in fade-in zoom-in">
             <div className="text-slate-700 mx-auto w-24 h-24 mb-6">
                <BoxIcon />
             </div>
             <h3 className="text-2xl font-black text-slate-500">No memories found.</h3>
             <p className="text-slate-600">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>

      {selectedAsset && (
        <AssetDetail 
          asset={selectedAsset} 
          onClose={() => setSelectedAsset(null)} 
        />
      )}
    </div>
  );
};

export default Gallery;
