import React, { useState, useEffect } from 'react';
import { BusinessTypeSelector } from './BusinessTypeSelector';
import { LicenseOptions } from './LicenseOptions';
import { OfficeTypeSelector } from './OfficeTypeSelector';
import { StaffOptions } from './StaffOptions';
import { AdditionalServices } from './AdditionalServices';
import { CostBreakdown } from './CostBreakdown';
import { ResultsSummary } from './ResultsSummary';
import { calculateTotalCost } from '../../utils/calculateTotalCost';
import { BusinessSetupOptions, CostBreakdownType } from '../../types';
import html2pdf from 'html2pdf.js';

export const CostCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currency, setCurrency] = useState<'AED' | 'USD'>('AED');
  const [options, setOptions] = useState<BusinessSetupOptions>({
    businessType: '',
    licenseType: '',
    activityType: '',
    officeType: '',
    officeSize: 0,
    visaCount: 1,
    additionalServices: []
  });
  
  const [costBreakdown, setCostBreakdown] = useState<CostBreakdownType>({
    licenseFees: 0,
    initialApprovalFees: 0,
    officeCosts: 0,
    visaFees: 0,
    additionalServicesFees: 0
  });

  useEffect(() => {
    const newCostBreakdown = calculateTotalCost(options);
    setCostBreakdown(newCostBreakdown);
  }, [options]);

  const totalCost = Object.values(costBreakdown).reduce((sum, cost) => sum + cost, 0);

  const handleOptionChange = (name: keyof BusinessSetupOptions, value: any) => {
    setOptions(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCurrencyToggle = () => {
    setCurrency(prev => prev === 'AED' ? 'USD' : 'AED');
  };

  const handleSavePDF = () => {
    const element = document.getElementById('summary-section');
    if (element) {
      const opt = {
        margin: 1,
        filename: 'dubai-business-setup-summary.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500">
        <div className="px-6 py-8 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <h2 className="text-2xl font-bold">Dubai Business Setup Cost Calculator</h2>
          <p className="mt-2 text-blue-100">Estimate the costs to establish your business presence in Dubai</p>
          
          {/* Progress indicator */}
          <div className="mt-8 flex justify-between">
            {[1, 2, 3, 4, 5].map(step => (
              <div 
                key={step} 
                className={`relative flex flex-col items-center ${currentStep >= step ? 'text-white' : 'text-blue-300'}`}
              >
                <div 
                  className={`h-10 w-10 rounded-full border-2 flex items-center justify-center font-semibold
                    ${currentStep >= step 
                      ? 'border-amber-400 bg-blue-800' 
                      : 'border-blue-400 bg-blue-700'}`}
                >
                  {step}
                </div>
                <div className="mt-2 text-xs text-center">
                  {step === 1 && "Business Type"}
                  {step === 2 && "License"}
                  {step === 3 && "Office"}
                  {step === 4 && "Visas"}
                  {step === 5 && "Summary"}
                </div>
                {step < 5 && (
                  <div className={`absolute top-5 left-full w-full h-0.5 -ml-2.5 
                    ${currentStep > step ? 'bg-amber-400' : 'bg-blue-400'}`}>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Currency toggle */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  currency === 'AED'
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setCurrency('AED')}
              >
                AED
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  currency === 'USD'
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setCurrency('USD')}
              >
                USD
              </button>
            </div>
          </div>

          {/* Step content */}
          <div className="min-h-[400px]">
            {currentStep === 1 && (
              <BusinessTypeSelector 
                selectedType={options.businessType}
                onChange={(value) => handleOptionChange('businessType', value)} 
              />
            )}
            
            {currentStep === 2 && (
              <LicenseOptions 
                businessType={options.businessType}
                licenseType={options.licenseType}
                activityType={options.activityType}
                onLicenseTypeChange={(value) => handleOptionChange('licenseType', value)}
                onActivityTypeChange={(value) => handleOptionChange('activityType', value)}
              />
            )}
            
            {currentStep === 3 && (
              <OfficeTypeSelector 
                businessType={options.businessType}
                officeType={options.officeType}
                officeSize={options.officeSize}
                onOfficeTypeChange={(value) => handleOptionChange('officeType', value)}
                onOfficeSizeChange={(value) => handleOptionChange('officeSize', value)}
              />
            )}
            
            {currentStep === 4 && (
              <StaffOptions 
                visaCount={options.visaCount}
                onVisaCountChange={(value) => handleOptionChange('visaCount', value)}
              />
            )}
            
            {currentStep === 5 && (
              <div id="summary-section" className="space-y-8">
                <AdditionalServices 
                  selectedServices={options.additionalServices}
                  onChange={(value) => handleOptionChange('additionalServices', value)}
                />
                
                <CostBreakdown 
                  breakdown={costBreakdown}
                  currency={currency}
                />
                
                <ResultsSummary 
                  options={options}
                  totalCost={totalCost}
                  currency={currency}
                />
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="mt-10 flex justify-between">
            <button
              onClick={handlePrevStep}
              className={`px-6 py-2 rounded-lg ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-blue-900 text-blue-900 hover:bg-blue-50'
              }`}
              disabled={currentStep === 1}
            >
              Back
            </button>
            
            <div className="flex items-center">
              {currentStep < 5 && (
                <div className="flex flex-col items-end mr-8">
                  <span className="font-semibold text-lg">Estimated Total</span>
                  <span className="text-2xl font-bold text-blue-900">
                    {currency === 'AED' ? 'AED ' : '$'}
                    {currency === 'AED' 
                      ? totalCost.toLocaleString('en-US')
                      : (totalCost / 3.67).toLocaleString('en-US', {maximumFractionDigits: 0})
                    }
                  </span>
                </div>
              )}
              
              {currentStep < 5 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300"
                >
                  Continue
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button 
                    onClick={handleSavePDF}
                    className="px-6 py-2 bg-white border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors duration-300 flex items-center"
                  >
                    Save PDF
                  </button>
                  <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300 flex items-center">
                    Get Consultation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};