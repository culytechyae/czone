import * as React from 'react';
import { InfoTooltip } from '../UI/InfoTooltip';

interface StaffOptionsProps {
  visaCount: number;
  onVisaCountChange: (count: number) => void;
}

export const StaffOptions: React.FC<StaffOptionsProps> = ({
  visaCount,
  onVisaCountChange,
}) => {
  // Visa costs
  const visaFeePerPerson = 7500; // AED

  // Fee breakdown per visa
  const visaBreakdown = [
    { name: 'Entry Permit', fee: 1500 },
    { name: 'Change Status', fee: 750 },
    { name: 'Medical Fitness Test', fee: 550 },
    { name: 'Emirates ID', fee: 370 },
    { name: 'Visa Stamping', fee: 4330 },
  ];

  // Common visa packages
  const visaPackages = [
    { count: 1, description: 'Small startup - Owner only' },
    { count: 3, description: 'Startup with small team' },
    { count: 5, description: 'Small business' },
    { count: 10, description: 'Medium business' },
    { count: 25, description: 'Large business' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Visa Requirements</h3>
        <p className="text-gray-600 mt-1">Specify the number of employment visas you need</p>
      </div>

      {/* Visa Packages */}
      <div>
        <div className="flex items-center mb-3">
          <h4 className="text-md font-medium text-gray-700">Common Packages</h4>
          <InfoTooltip content="Select a preset visa allocation or customize below" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {visaPackages.map((pkg) => (
            <div
              key={pkg.count}
              onClick={() => onVisaCountChange(pkg.count)}
              className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${
                visaCount === pkg.count
                  ? 'border-blue-900 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold text-lg">{pkg.count}</div>
              <div className="text-sm text-gray-600">{pkg.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Visa Count */}
      <div className="mt-6">
        <div className="flex items-center mb-3">
          <h4 className="text-md font-medium text-gray-700">Custom Number of Visas</h4>
          <InfoTooltip content="Specify the exact number of employment visas you need" />
        </div>
        
        <div className="flex items-center">
          <button
            onClick={() => onVisaCountChange(Math.max(1, visaCount - 1))}
            className="border border-gray-300 rounded-l-lg px-4 py-2 bg-gray-50 hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </button>
          
          <input
            type="number"
            min="1"
            max="100"
            value={visaCount}
            onChange={(e) => onVisaCountChange(parseInt(e.target.value) || 1)}
            className="w-20 text-center border-t border-b py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
          />
          
          <button
            onClick={() => onVisaCountChange(visaCount + 1)}
            className="border border-gray-300 rounded-r-lg px-4 py-2 bg-gray-50 hover:bg-gray-100"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          
          <span className="ml-3 text-gray-600">Visa(s)</span>
        </div>
      </div>

      {/* Visa Fee Breakdown */}
      <div className="mt-8 p-5 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-3">Visa Fee Breakdown (per person)</h4>
        
        <div className="space-y-2">
          {visaBreakdown.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name}</span>
              <span className="font-medium">AED {item.fee.toLocaleString()}</span>
            </div>
          ))}
          
          <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-medium">
            <span>Total per visa</span>
            <span>AED {visaFeePerPerson.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Total Visa Costs */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-medium">Total Visa Costs</h5>
            <p className="text-sm text-gray-600">For {visaCount} visa(s)</p>
          </div>
          <div className="text-xl font-semibold text-blue-900">
            AED {(visaFeePerPerson * visaCount).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};