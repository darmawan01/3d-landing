
import React from 'react';
import { ScanIcon, BoxIcon, SparklesIcon, LayersIcon } from './Icons';
// Import types to ensure global JSX declarations are recognized
import '../types';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="relative min-h-screen">
      {/* Cinematic Hero */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-indigo-600/10 blur-[180px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
            <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" />
              <span className="text-[10px] font-heading font-black tracking-[0.3em] uppercase text-gray-300">Live Global Archive v4.2</span>
            </div>
            
            <h1 className="text-7xl md:text-[6.5rem] font-heading font-black leading-[0.85] tracking-tighter">
              Archive <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">
                Your Reality.
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-xl font-light leading-relaxed">
              Volo3D converts ephemeral moments into immutable 3D memories. High-density neural reconstruction for objects, spaces, and artifacts.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <button 
                onClick={onLogin}
                className="px-10 py-6 bg-white text-black font-black rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Enter Archive Studio
              </button>
              <button className="px-10 py-6 glass border-white/10 text-white font-black rounded-[1.5rem] hover:bg-white/5 transition-all">
                Sample Cloud v12
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative h-[600px] animate-in fade-in zoom-in duration-1000 delay-300">
            {/* Live 3D Preview in Hero */}
            <div className="absolute inset-0 z-10 glass-card rounded-[4rem] overflow-hidden border-white/5 shadow-[0_0_80px_rgba(99,102,241,0.15)] group">
               {/* model-viewer custom element recognized via global declaration in types.ts */}
               {/* @ts-ignore */}
               <model-viewer
                 src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                 auto-rotate
                 rotation-per-second="15deg"
                 camera-controls
                 interaction-prompt="none"
                 shadow-intensity="1"
                 environment-image="neutral"
                 exposure="1.2"
               />
               
               <div className="absolute bottom-10 left-10 p-6 glass rounded-3xl border-white/10 backdrop-blur-md">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Live Asset Stream</p>
                 <p className="text-2xl font-heading font-black">Archive-412.glb</p>
               </div>
            </div>

            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="border-y border-white/5 bg-white/[0.02] py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: "Assets Saved", value: "1.2M+" },
            { label: "Scan Fidelity", value: "99.9%" },
            { label: "Capture Time", value: "< 2s" },
            { label: "Nodes Active", value: "12.4k" }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-1">
               <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
               <p className="text-3xl font-heading font-black">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <ScanIcon />, color: "text-indigo-400", title: "Photographic Pulse", desc: "Our engine accepts standard JPEG/PNG inputs from any device, building a neural volume instantly." },
            { icon: <SparklesIcon />, color: "text-purple-400", title: "Gemini Intelligence", desc: "Every scan is analyzed by AI to generate semantic metadata, tags, and descriptive narratives." },
            { icon: <LayersIcon />, color: "text-emerald-400", title: "Seamless Export", desc: "Access USDZ for iOS AR, GLB for web, and STL for physical fabrication at any time." }
          ].map((feat, i) => (
            <div key={i} className="group p-10 glass-card rounded-[3rem] space-y-8 hover:bg-white/[0.04]">
              <div className={`w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center ${feat.color} group-hover:scale-110 transition-transform`}>
                {feat.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-heading font-black">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
