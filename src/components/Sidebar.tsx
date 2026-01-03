import React from 'react';
import { User } from '../types';
import { LayersIcon, ScanIcon, BoxIcon, SparklesIcon } from './Icons';

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const menuItems = [
    { icon: <div className="w-5 h-5 grid place-items-center"><BoxIcon /></div>, label: 'Dashboard', active: true },
    { icon: <div className="w-5 h-5 grid place-items-center"><ScanIcon /></div>, label: 'Explore' },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>, label: 'Bookmark' },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>, label: 'Downloads' },
  ];

  const bottomItems = [
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: 'Settings' },
    { icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, label: 'Help' },
  ];

  return (
    <div className="w-64 h-screen fixed left-0 top-0 glass border-r border-white/5 flex flex-col p-6 z-50">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-10 px-2">
         <span className="text-xl font-heading font-bold text-white tracking-tight">STGallery</span>
         <span className="text-emerald-500 text-xs">←</span>
      </div>

      {/* Main Menu */}
      <div className="space-y-1 mb-8">
        <p className="px-3 text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Dashboard</p>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
              item.active 
                ? 'bg-white/5 text-emerald-400 border-l-2 border-emerald-500' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            {item.label}
            {item.label === 'Dashboard' && (
              <svg className="ml-auto w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
        ))}
        
         <button className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <div className="flex items-center gap-3">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
               Notification
            </div>
            <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded">12</span>
         </button>
      </div>

      {/* Promo Card */}
      <div className="mt-auto mb-8 p-4 rounded-3xl bg-[#13161C] border border-white/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full" />
         <div className="relative z-10">
           <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
             <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                 <div className="w-4 h-1 bg-emerald-500 rounded-full" />
             </div>
           </div>
           <p className="text-white font-bold text-sm mb-1 leading-tight">Upload your photos according to the</p>
           <div className="flex items-center gap-1">
             <span className="text-emerald-400 font-bold text-sm">Calendar!</span>
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
           </div>
         </div>
      </div>

      {/* Bottom Params */}
      <div className="space-y-1 mb-8">
         {bottomItems.map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
               {item.icon}
               {item.label}
            </button>
         ))}
      </div>

       {/* User Profile */}
       {user && (
         <div className="flex items-center gap-3 px-2 pt-4 border-t border-white/5 cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-all" onClick={onLogout}>
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white/10" />
            <div className="flex-1 min-w-0">
               <p className="text-sm font-bold text-white truncate">{user.name}</p>
               <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Account Pro
               </p>
            </div>
         </div>
       )}
    </div>
  );
};

export default Sidebar;
