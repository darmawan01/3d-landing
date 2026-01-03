import React from 'react';
import { Asset3D } from '../types';

interface AssetCardProps {
  asset: Asset3D;
  onClick: () => void;
  className?: string;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick, className = '' }) => {
  return (
    <div 
      className={`group relative rounded-[2rem] overflow-hidden cursor-pointer bg-[#1A1D24] ${className}`}
      onClick={onClick}
    >
      {/* 3D Model / Thumbnail */}
        {/* @ts-ignore */}
        <model-viewer
          src={asset.modelUrl}
          poster={asset.thumbnail}
          alt={asset.title}
          auto-rotate
          rotation-per-second="30deg" // Slightly faster spin for small cards vs hero
          interaction-prompt="none"
          camera-controls // Allow users to spin it if they want
          disable-zoom // Keep grid layout stable
          shadow-intensity="1"
          environment-image="neutral"
          class="w-full h-full object-cover"
          style={{ width: '100%', height: '100%', minHeight: '300px' }} // Ensure it takes space
        />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-between pointer-events-none">
         
         {/* Top Tag */}
         <div className="self-end">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-medium text-white">
               {asset.tags?.[0] || 'Asset'}
            </span>
         </div>

         {/* Bottom Info */}
         <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white font-bold text-lg leading-tight mb-2">{asset.title}</h3>
            
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  {asset.author?.avatar && (
                     <img src={asset.author.avatar} className="w-5 h-5 rounded-full border border-white/20" alt="author" />
                  )}
                  <span className="text-xs text-gray-400 font-medium">{asset.author?.name || 'Unknown'}</span>
               </div>
               
               <button className="w-8 h-8 rounded-full bg-[#1A1D24] border border-emerald-500/30 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300 pointer-events-auto">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AssetCard;
