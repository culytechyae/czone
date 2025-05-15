import React from 'react';
import { InfoTooltip } from '../UI/InfoTooltip';

interface LicenseOptionsProps {
  businessType: string;
  licenseType: string;
  activityType: string;
  onLicenseTypeChange: (type: string) => void;
  onActivityTypeChange: (type: string) => void;
}

export const LicenseOptions: React.FC<LicenseOptionsProps> = ({
  businessType,
  licenseType,
  activityType,
  onLicenseTypeChange,
  onActivityTypeChange,
}) => {
  // License types based on business type
  const licenseTypes = {
    mainland: [
      { id: 'commercial', name: 'Commercial License', description: 'For trading activities and retail businesses' },
      { id: 'professional', name: 'Professional License', description: 'For service providers, consultants, and professionals' },
      { id: 'industrial', name: 'Industrial License', description: 'For manufacturing and production activities' }
    ],
    freezone: [
      { id: 'trading', name: 'Trading License', description: 'For import, export and trading activities' },
      { id: 'service', name: 'Service License', description: 'For consultancy and service-based businesses' },
      { id: 'logistics', name: 'Logistics License', description: 'For logistics and supply chain operations' }
    ],
    offshore: [
      { id: 'trading', name: 'Trading License', description: 'For international trade and commerce' },
      { id: 'holding', name: 'Holding License', description: 'For holding assets and investments' }
    ]
  };

  // Activity types based on license type
  const getActivityTypes = (businessType: string, licenseType: string) => {
    // This is a simplified version, in a real app these would be comprehensive
    const activityMapping: {[key: string]: {[key: string]: {id: string, name: string, fee: number}[]}} = {
      mainland: {
        commercial: [
          { id: 'general_trading', name: 'General Trading', fee: 15000 },
          { id: 'electronics', name: 'Electronics Trading', fee: 12000 },
          { id: 'food', name: 'Food & Beverage', fee: 14000 }
        ],
        professional: [
          { id: 'consulting', name: 'Business Consulting', fee: 10000 },
          { id: 'marketing', name: 'Marketing Services', fee: 9000 },
          { id: 'it_services', name: 'IT Services', fee: 11000 }
        ],
        industrial: [
          { id: 'manufacturing', name: 'Manufacturing', fee: 20000 },
          { id: 'processing', name: 'Food Processing', fee: 18000 }
        ]
      },
      freezone: {
        trading: [
          { id: 'general_trading', name: 'General Trading', fee: 12000 },
          { id: 'specific_trading', name: 'Specific Trading', fee: 9000 }
        ],
        service: [
          { id: 'consulting', name: 'Consulting', fee: 8000 },
          { id: 'tech', name: 'Technology Services', fee: 10000 }
        ],
        logistics: [
          { id: 'freight', name: 'Freight & Forwarding', fee: 14000 }
        ]
      },
      offshore: {
        trading: [
          { id: 'international', name: 'International Trade', fee: 9000 }
        ],
        holding: [
          { id: 'asset', name: 'Asset Holding', fee: 8000 },
          { id: 'investment', name: 'Investment Holding', fee: 8500 }
        ]
      }
    };

    return businessType && licenseType 
      ? (activityMapping[businessType]?.[licenseType] || []) 
      : [];
  };

  const activities = getActivityTypes(businessType, licenseType);

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
        <h3 className="text-xl font-semibold text-gray-800">Select License Type</h3>
        <p className="text-gray-600 mt-1">Choose the appropriate license for your business activities</p>
      </div>

      {/* License Type Selection */}
      <div>
        <div className="flex items-center mb-3">
          <h4 className="text-md font-medium text-gray-700">License Type</h4>
          <InfoTooltip content="The license determines what kind of business activities you can perform" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {licenseTypes[businessType as keyof typeof licenseTypes]?.map((license) => (
            <div
              key={license.id}
              onClick={() => onLicenseTypeChange(license.id)}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                licenseType === license.id
                  ? 'border-blue-900 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h5 className="font-medium">{license.name}</h5>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                  licenseType === license.id ? 'border-blue-900' : 'border-gray-300'
                }`}>
                  {licenseType === license.id && (
                    <div className="h-3 w-3 rounded-full bg-blue-900"></div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{license.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Activity Selection */}
      {licenseType && (
        <div className="mt-8">
          <div className="flex items-center mb-3">
            <h4 className="text-md font-medium text-gray-700">Business Activity</h4>
            <InfoTooltip content="Specific activity determines your license fee and regulations" />
          </div>

          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => onActivityTypeChange(activity.id)}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  activityType === activity.id
                    ? 'border-blue-900 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">{activity.name}</h5>
                    <p className="text-sm text-gray-600 mt-1">License Fee: AED {activity.fee.toLocaleString()}</p>
                  </div>
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    activityType === activity.id ? 'border-blue-900' : 'border-gray-300'
                  }`}>
                    {activityType === activity.id && (
                      <div className="h-3 w-3 rounded-full bg-blue-900"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};