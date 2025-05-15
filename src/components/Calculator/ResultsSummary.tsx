import React, { useRef } from 'react';
import { Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { BusinessSetupOptions } from '../../types';
import html2pdf from 'html2pdf.js';

interface ResultsSummaryProps {
  options: BusinessSetupOptions;
  totalCost: number;
  currency: 'AED' | 'USD';
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  options,
  totalCost,
  currency
}) => {
  const summaryRef = useRef<HTMLDivElement>(null);
  const exchangeRate = 3.67; // 1 USD = 3.67 AED

  const formatCurrency = (amount: number) => {
    if (currency === 'AED') {
      return `AED ${amount.toLocaleString()}`;
    } else {
      return `$${(amount / exchangeRate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
    }
  };

  const handleSavePDF = () => {
    if (summaryRef.current) {
      const opt = {
        margin: 1,
        filename: 'dubai-business-setup-summary.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(summaryRef.current).save();
    }
  };

  // Business type details
  const businessTypeDetails = {
    mainland: {
      name: 'Mainland Company',
      timeline: '2-3 weeks',
      ownership: '100% foreign ownership allowed',
      restrictions: 'No restrictions on business activities',
      benefits: [
        'Full market access across UAE',
        'Eligible for government tenders',
        'No restriction on number of visas',
        'Multiple business activities allowed'
      ]
    },
    freezone: {
      name: 'Free Zone Company',
      timeline: '1-2 weeks',
      ownership: '100% foreign ownership',
      restrictions: 'Cannot operate directly in local market',
      benefits: [
        '0% corporate and personal income tax',
        'Full repatriation of capital and profits',
        'No currency restrictions',
        'Simplified import/export procedures'
      ]
    },
    offshore: {
      name: 'Offshore Company',
      timeline: '3-5 days',
      ownership: '100% foreign ownership',
      restrictions: 'Cannot conduct business within UAE',
      benefits: [
        'High level of privacy',
        'Asset protection',
        'No requirement for physical presence',
        'Minimal reporting requirements'
      ]
    }
  };

  const selectedBusinessType = options.businessType ? 
    businessTypeDetails[options.businessType as keyof typeof businessTypeDetails] : 
    null;

  if (!selectedBusinessType) {
    return <div className="text-center text-gray-500">Please complete all previous steps</div>;
  }

  return (
    <div ref={summaryRef} className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Summary & Next Steps</h3>
        <p className="text-gray-600 mt-1">Review your business setup details and estimated costs</p>
      </div>

      {/* Business Setup Overview */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-6 py-5 bg-blue-800 text-white">
          <h4 className="text-lg font-semibold">Business Setup Overview</h4>
          <p className="text-blue-100 text-sm mt-1">Your selected business structure and options</p>
        </div>
        
        <div className="px-6 py-5 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <p className="text-sm text-gray-500">Business Type</p>
              <p className="font-semibold text-lg">{selectedBusinessType.name}</p>
            </div>
            <div className="mt-3 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Estimated Timeline: {selectedBusinessType.timeline}
              </span>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500 text-sm">Ownership Structure</p>
            <p className="font-medium mt-1">{selectedBusinessType.ownership}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Restrictions</p>
            <p className="font-medium mt-1">{selectedBusinessType.restrictions}</p>
          </div>
        </div>
        
        <div className="px-6 py-5 bg-gray-50">
          <p className="font-medium text-gray-700 mb-3">Key Benefits</p>
          <div className="space-y-2">
            {selectedBusinessType.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg text-white p-6">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div>
            <h4 className="text-lg font-semibold">Total Investment Required</h4>
            <p className="text-blue-100 text-sm">Complete business setup cost</p>
          </div>
          <div className="mt-4 md:mt-0 text-3xl font-bold">
            {formatCurrency(totalCost)}
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h4 className="font-semibold text-gray-800">Required Documents</h4>
        </div>
        <div className="divide-y">
          {[
            'Passport copies of all shareholders (valid for at least 6 months)',
            'Residence visa copies for UAE residents',
            'Emirates ID copies for UAE residents',
            'Proof of address (utility bill or bank statement)',
            'Passport-sized photographs',
            'Business plan (for certain business activities)',
            'CV/Resume of shareholders'
          ].map((document, index) => (
            <div key={index} className="px-6 py-3 flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{document}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
        <div className="flex items-start">
          <AlertCircle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-800">Important Notes</h4>
            <ul className="mt-2 space-y-2 text-gray-700 text-sm">
              <li>• Costs provided are estimates and may vary based on specific requirements and authority fees.</li>
              <li>• Additional costs may apply depending on shareholding structure and specific business activities.</li>
              <li>• Processing times are approximate and may vary based on government procedures.</li>
              <li>• For precise quotation and timeframe, please book a consultation with our business setup experts.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};