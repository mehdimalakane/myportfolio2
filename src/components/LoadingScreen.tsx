import React from 'react';
import { Music } from 'lucide-react';

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  // Ensure progress is a valid number and within bounds
  const validProgress = Math.min(Math.max(0, Math.round(progress || 0)), 100);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="relative">
        <Music className="w-16 h-16 text-purple-500 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 animate-shimmer" />
      </div>
      <div className="mt-8 w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${validProgress}%` }}
        />
      </div>
      <p className="mt-4 text-gray-400 font-medium">
        Loading resources... {validProgress}%
      </p>
      <div className="mt-2 text-sm text-gray-500">
        Loading fonts...
      </div>
    </div>
  );
}