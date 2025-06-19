// components/AIGeneratingOverlay.js
import React from 'react';

const AIGeneratingOverlay = () => {
  return (
    <div className="absolute inset-0 z-10 bg-white/70 flex flex-col items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-gray-600 animate-pulse">Generating content with AI...</p>
    </div>
  );
};

export default AIGeneratingOverlay;
