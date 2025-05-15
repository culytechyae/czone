import React from 'react';
import { InfoTooltip } from '../UI/InfoTooltip';
import { RangeInput } from '../UI/RangeInput';

interface OfficeTypeSelectorProps {
  businessType: string;
  officeType: string;
  officeSize: number;
  onOfficeTypeChange: (type: string) => void;
  onOfficeSizeChange: (size: number) => void;
}

export const OfficeTypeSelector: React.FC<OfficeTypeSelectorProps> = ({
  businessType,
  officeType,
  officeSize,
  onOfficeTypeChange,
  onOfficeSizeChange,
}) => {
  // Office types based on business jurisdiction
  const officeTypes = {
    mainland: [
      { id: 'physical', name: 'Physical Office', description: 'Commercial space in business districts', minSize: 200, maxSize: 5000, pricePerSqFt: 110 },
      { id: 'shared', name: 'Shared Office Space', description: 'Co-working or shared office solutions', minSize: 0, maxSize: 0, fixedPrice: 15000 },
    ],
    freezone: [
      { id: 'physical', name: 'Physical Office', description: 'Office within the Free Zone', minSize: 250, maxSize: 3000, pricePerSqFt: 130 },
      { id: 'flexi_desk', name: 'Flexi Desk', description: 'Shared workspace within the Free Zone', minSize: 0, maxSize: 0, fixedPrice: 12000 },
      { id: 'virtual', name: 'Virtual Office', description: 'Business address without physical presence', minSize: 0, maxSize: 0, fixedPrice: 8000 },
    ],
    offshore: [
      { id: 'virtual', name: 'Virtual Office', description: 'Registered address with mail handling', minSize: 0, maxSize: 0, fixedPrice: 5000 },
    ],
  };

  // Get relevant office types for the selected business type
  const availableOfficeTypes = businessType ? officeTypes[businessType as keyof typeof officeTypes] : [];

  // Get details of the selected office type
  const selectedOfficeDetails = availableOfficeTypes.find(type => type.id === officeType);

  // Calculate the office cost
  const calculateOfficeCost = () => {
    if (!selectedOfficeDetails) return 0;
    
    if (selectedOfficeDetails.fixedPrice) {
      return selectedOfficeDetails.fixedPrice;
    } else {
      return selectedOfficeDetails.pricePerSqFt * officeSize;
    }
  };

  const officeCost = calculateOfficeCost();

  if (!businessType) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please select a business type first</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Select Office Solution</h3>
        <p className="text-gray-600 mt-1">Choose the workspace option that suits your business needs</p>
      </div>

      {/* Office Type Selection */}
      <div>
        <div className="flex items-center mb-3">
          <h4 className="text-md font-medium text-gray-700">Office Type</h4>
          <InfoTooltip content="Different office solutions have varying costs and requirements" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableOfficeTypes.map((office) => (
            <div
              key={office.id}
              onClick={() => {
                onOfficeTypeChange(office.id);
                // If switching to a physical office, set a default size
                if (office.minSize > 0 && officeSize === 0) {
                  onOfficeSizeChange(office.minSize);
                }
              }}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                officeType === office.id
                  ? 'border-blue-900 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h5 className="font-medium">{office.name}</h5>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                  officeType === office.id ? 'border-blue-900' : 'border-gray-300'
                }`}>
                  {officeType === office.id && (
                    <div className="h-3 w-3 rounded-full bg-blue-900"></div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{office.description}</p>
              
              <div className="mt-3 text-sm font-medium">
                {office.fixedPrice ? (
                  <span>Annual Cost: AED {office.fixedPrice.toLocaleString()}</span>
                ) : (
                  <span>Per sq ft: AED {office.pricePerSqFt}/year</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Office Size Selector (only for physical offices) */}
      {officeType && selectedOfficeDetails?.minSize > 0 && (
        <div className="mt-8">
          <div className="flex items-center mb-3">
            <h4 className="text-md font-medium text-gray-700">Office Size (sq ft)</h4>
            <InfoTooltip content="Select the approximate size for your office space" />
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 text-sm">Min: {selectedOfficeDetails.minSize} sq ft</span>
              <span className="text-gray-600 text-sm">Max: {selectedOfficeDetails.maxSize} sq ft</span>
            </div>
            
            <RangeInput
              min={selectedOfficeDetails.minSize}
              max={selectedOfficeDetails.maxSize}
              step={50}
              value={officeSize}
              onChange={onOfficeSizeChange}
            />
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                <span className="text-xl font-semibold">{officeSize} sq ft</span>
                <span className="ml-2 text-sm text-gray-500">selected</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">Estimated Annual Cost:</span>
                <span className="ml-2 text-lg font-semibold text-blue-900">AED {(selectedOfficeDetails.pricePerSqFt * officeSize).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display cost information */}
      {officeType && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h5 className="font-medium">Total Office Cost</h5>
              <p className="text-sm text-gray-600">Annual lease/rental fee</p>
            </div>
            <div className="text-xl font-semibold text-blue-900">
              AED {officeCost.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};