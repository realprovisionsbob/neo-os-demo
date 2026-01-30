'use client';

import { useState, useEffect } from 'react';

const glyphs = ['·', '✻', '✽', '✶', '✳', '✢'];

interface NeoStatusProps {
  tasks?: { description: string; progress: number }[];
}

export function NeoStatus({ tasks = [] }: NeoStatusProps) {
  const [glyphIndex, setGlyphIndex] = useState(0);
  const [isActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setGlyphIndex((prev) => (prev + 1) % glyphs.length);
    }, 200);
    return () => clearInterval(interval);
  }, [isActive]);

  const currentTask = tasks.length > 0 
    ? tasks[0] 
    : { description: 'Monitoring your world', progress: -1 };

  return (
    <div className="glass rounded-xl p-4 flex items-center gap-4">
      {/* Animated Glyph */}
      <div className={`w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center ${isActive ? 'neo-active' : ''}`}>
        <span className="text-emerald-400 text-xl font-mono">
          {isActive ? glyphs[glyphIndex] : '●'}
        </span>
      </div>
      
      {/* Status Text */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Neo</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
            {isActive ? 'Active' : 'Idle'}
          </span>
        </div>
        <p className="text-sm text-white/60 truncate">
          {currentTask.description}
        </p>
        {currentTask.progress >= 0 && (
          <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${currentTask.progress}%` }}
            />
          </div>
        )}
      </div>
      
      {/* Task Count */}
      {tasks.length > 1 && (
        <div className="text-xs text-white/40">
          +{tasks.length - 1} more
        </div>
      )}
    </div>
  );
}
