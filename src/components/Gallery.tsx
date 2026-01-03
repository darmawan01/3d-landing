import React, { useState, useMemo } from 'react';
import { SAMPLE_ASSETS } from '../constants';
import { Asset3D } from '../types';
import AssetDetail from './AssetDetail';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import AssetCard from './AssetCard';

interface GalleryProps {
  onLogout: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ onLogout }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset3D | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'edit'>('feed');

  // Hardcoded current user for demo
  const currentUser = {
    name: 'Brooklyn',
    email: 'brooklyn@example.com',
    avatar: 'https://i.pravatar.cc/150?u=brooklyn',
    isLoggedIn: true
  };

  const categories = [
    { label: 'Nature', icon: '🌳' },
    { label: 'Technology', icon: '🔋' },
    { label: 'Animals', icon: '🦄' },
    { label: 'Food', icon: '🍔' },
    { label: 'Building', icon: '🏠' },
    { label: 'Sport', icon: '⚽' },
    { label: 'Car', icon: '🚗' },
  ];

  const filteredAssets = useMemo(() => {
    return SAMPLE_ASSETS.filter(a => {
      // Very simple mapping for the new categories vs old ones
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
      // In a real app, match categories properly. 
      // Here just ignoring strict category matching to show content.
      return matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="flex min-h-screen font-sans overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar user={currentUser} onLogout={onLogout} />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen relative">
        <div className="max-w-[1600px] mx-auto">
          
          <DashboardHeader 
             searchQuery={searchQuery} 
             setSearchQuery={setSearchQuery} 
             activeTab={activeTab}
             setActiveTab={setActiveTab}
          />

          {/* Filter Bar */}
          <div className="flex items-center gap-4 mb-8 overflow-x-auto no-scrollbar pb-2">
             <button
                onClick={() => setFilter('All')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'All' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-[#1A1D24] text-gray-400 hover:text-white border border-transparent'}`}
             >
                All
             </button>
             {categories.map(cat => (
                <button
                  key={cat.label}
                  onClick={() => setFilter(cat.label)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    filter === cat.label 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                      : 'bg-[#1A1D24] text-gray-400 hover:text-white border border-transparent hover:bg-[#252830]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
             ))}
             <button className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-colors">
                More 
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
             </button>
          </div>

          {/* Asset Grid - Masonry/Staggered Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
             {filteredAssets.map((asset, i) => {
               // Deterministic random height for staggered look
               const heights = ['h-[280px]', 'h-[380px]', 'h-[440px]', 'h-[320px]'];
               const heightClass = heights[i % heights.length];
               
               return (
                <div key={asset.id} className="break-inside-avoid">
                  <AssetCard 
                    asset={asset} 
                    onClick={() => setSelectedAsset(asset)} 
                    className={`${heightClass} w-full`}
                  />
                </div>
               );
             })}
             
              {/* Add a few duplicate cards just to fill the grid for visual fidelity to the mock */}
              {filteredAssets.map((asset, i) => {
                 const heights = ['h-[350px]', 'h-[300px]', 'h-[480px]', 'h-[400px]'];
                 // Offset index for variety
                 const heightClass = heights[(i + 2) % heights.length];

                 return (
                  <div key={`${asset.id}-dup`} className="break-inside-avoid">
                    <AssetCard 
                      asset={{...asset, id: `${asset.id}-dup`, title: `${asset.title} (Copy)`}} 
                      onClick={() => setSelectedAsset(asset)} 
                      className={`${heightClass} w-full`}
                    />
                  </div>
                 );
             })}
          </div>

        </div>
      </main>

      {/* Asset Detail Overlay (Keeping existing functionality) */}
      {selectedAsset && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="relative w-full max-w-6xl h-[90vh] bg-[#0B0F15] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex">
              <button 
                onClick={() => setSelectedAsset(null)}
                className="absolute top-8 right-8 z-50 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-white"
              >
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <AssetDetail asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
           </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
