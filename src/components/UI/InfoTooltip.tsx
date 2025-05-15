import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative ml-2">
      <Info 
        className="h-4 w-4 text-gray-400 cursor-help" 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      
      {isVisible && (
        <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg">
          <div className="relative">
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
};