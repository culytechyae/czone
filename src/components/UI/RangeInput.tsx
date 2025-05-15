import React from 'react';

interface RangeInputProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  step,
  value,
  onChange,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
        }}
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 2px solid #1e3a8a;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 2px solid #1e3a8a;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};