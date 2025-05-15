import React from 'react';
import { CostBreakdownType } from '../../types';

interface CostBreakdownProps {
  breakdown: CostBreakdownType;
  currency: 'AED' | 'USD';
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({ 
  breakdown, 
  currency 
}) => {
  const exchangeRate = 3.67; // 1 USD = 3.67 AED

  const formatCurrency = (amount: number) => {
    if (currency === 'AED') {
      return `AED ${amount.toLocaleString()}`;
    } else {
      return `$${(amount / exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
  };

  const totalCost = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);

  // Calculate percentages for visualization
  const getPercentage = (value: number) => {
    return totalCost > 0 ? (value / totalCost) * 100 : 0;
  };

  const costs = [
    { name: 'License Fees', value: breakdown.licenseFees, color: 'bg-blue-600' },
    { name: 'Initial Approval', value: breakdown.initialApprovalFees, color: 'bg-amber-500' },
    { name: 'Office Space', value: breakdown.officeCosts, color: 'bg-green-500' },
    { name: 'Visa & Staff', value: breakdown.visaFees, color: 'bg-purple-500' },
    { name: 'Additional Services', value: breakdown.additionalServicesFees, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Cost Breakdown</h3>
        <p className="text-gray-600 mt-1">Detailed breakdown of your business setup costs</p>
      </div>

      {/* Visual cost breakdown */}
      <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden flex">
        {costs.map((cost, index) => (
          <div 
            key={index}
            className={`${cost.color} h-full transition-all duration-500`}
            style={{ width: `${getPercentage(cost.value)}%` }}
            title={`${cost.name}: ${formatCurrency(cost.value)}`}
          ></div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {costs.map((cost, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-4 h-4 rounded-sm ${cost.color} mr-2`}></div>
            <div className="text-sm">
              <div className="font-medium">{cost.name}</div>
              <div>{formatCurrency(cost.value)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed costs */}
      <div className="mt-6 bg-white border rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h4 className="font-semibold text-gray-800">Detailed Cost Breakdown</h4>
        </div>
        <div className="divide-y">
          {costs.map((cost, index) => (
            <div key={index} className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-sm ${cost.color} mr-3`}></div>
                <span className="text-gray-700">{cost.name}</span>
              </div>
              <div className="font-medium">
                {formatCurrency(cost.value)}
                <span className="text-gray-500 text-sm ml-2">
                  ({getPercentage(cost.value).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
          
          <div className="px-6 py-4 flex justify-between items-center bg-blue-50">
            <span className="font-semibold text-gray-800">Total Investment</span>
            <span className="text-xl font-bold text-blue-900">{formatCurrency(totalCost)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};