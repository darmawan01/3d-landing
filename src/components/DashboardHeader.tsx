import React from 'react';
import { ScanIcon } from './Icons';

interface DashboardHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTab: 'feed' | 'edit';
  setActiveTab: (t: 'feed' | 'edit') => void;
  onMenuClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab,
  onMenuClick
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
      
      {/* Title & Menu Toggle */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
         <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-white">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
         </button>
         <h1 className="text-4xl font-heading font-medium text-white tracking-tight">Dashboard</h1>
      </div>
      
      {/* Tabs */}
      <div className="flex items-center gap-8 relative">
        <button 
          onClick={() => setActiveTab('feed')}
          className={`text-lg font-medium transition-colors relative py-2 ${activeTab === 'feed' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
        >
          Feed
          {activeTab === 'feed' && (
             <div className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          )}
        </button>
        <button 
           onClick={() => setActiveTab('edit')}
           className={`text-lg font-medium transition-colors relative py-2 ${activeTab === 'edit' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
        >
          Edit
          {activeTab === 'edit' && (
             <div className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full md:w-80 group">
         <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
         </div>
         <input 
            type="text" 
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1D24] text-white text-sm rounded-full pl-12 pr-4 py-3 border border-transparent focus:border-emerald-500/50 focus:bg-[#1A1D24] focus:outline-none transition-all placeholder:text-gray-600"
         />
      </div>
    </div>
  );
};

export default DashboardHeader;
