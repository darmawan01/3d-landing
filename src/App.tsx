
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Gallery from './components/Gallery';
import { AppView, User } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = () => {
    // Simulated Google Login
    const mockUser: User = {
      name: 'Alex Rivers',
      email: 'alex.rivers@gmail.com',
      avatar: 'https://picsum.photos/seed/alex/200',
      isLoggedIn: true
    };
    setUser(mockUser);
    setView('gallery');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen">
      {/* Dynamic Navbar - Only on Landing Page */}
      {view === 'landing' && (
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center glass border-b border-white/5">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('landing')}
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">
              V
            </div>
            <span className="text-2xl font-black tracking-tighter">VOLO<span className="text-indigo-500">3D</span></span>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setView('gallery')}
                className="text-sm font-semibold text-gray-500 hover:text-white transition-colors"
              >
                Gallery
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/50 cursor-pointer" onClick={handleLogout}>
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Enter Studio
            </button>
          )}
        </nav>
      )}

      {/* Main Content Area */}
      <main className="animate-in fade-in duration-700">
        {view === 'landing' && <LandingPage onLogin={handleLogin} />}
        {view === 'gallery' && <Gallery onLogout={handleLogout} />}
      </main>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>&copy; 2024 Volo3D Technologies. Future-proof your perspective.</p>
      </footer>
    </div>
  );
};

export default App;
