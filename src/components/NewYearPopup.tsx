import React, { useState, useEffect } from 'react';
import { Snowflake, Sparkles } from 'lucide-react';

export function NewYearPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem('newYearPopupShown');
    if (!hasShown) {
      setShow(true);
      localStorage.setItem('newYearPopupShown', 'true');
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-gradient-to-b from-purple-900 to-blue-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Animated snowflakes */}
        {[...Array(20)].map((_, i) => (
          <Snowflake
            key={i}
            className="absolute text-white/20 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}px`,
              animation: `fall ${3 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Sparkles */}
        <div className="absolute top-4 right-4">
          <Sparkles className="text-yellow-300 animate-pulse" />
        </div>
        
        <div className="text-center relative z-10">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-200 mb-4">
            Cheers to a fantastic New Year ahead!!
          </h2>
          <p className="text-purple-100 mb-6">
            from IEEE SPS Society
          </p>
          <button
            onClick={() => setShow(false)}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            Continue to Game
          </button>
        </div>
      </div>
    </div>
  );
}