import React from 'react';
import { Building, Building2, BookOpen } from 'lucide-react';

interface BusinessTypeSelectorProps {
  selectedType: string;
  onChange: (type: string) => void;
}

export const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({ 
  selectedType, 
  onChange 
}) => {
  const businessTypes = [
    {
      id: 'mainland',
      title: 'Mainland',
      description: 'Operate across the UAE with no foreign ownership restrictions',
      icon: Building,
      benefits: ['100% foreign ownership', 'No restrictions on business activities', 'Access to government projects', 'Full market access'],
    },
    {
      id: 'freezone',
      title: 'Free Zone',
      description: 'Benefit from tax exemptions and 100% ownership in specific zones',
      icon: Building2,
      benefits: ['0% corporate & personal tax', '100% foreign ownership', 'No currency restrictions', 'Easier setup process'],
    },
    {
      id: 'offshore',
      title: 'Offshore',
      description: 'Ideal for asset protection, investments, and international business',
      icon: BookOpen,
      benefits: ['Asset protection', 'Privacy and confidentiality', 'No minimum capital', 'No physical presence required'],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Select Business Jurisdiction</h3>
        <p className="text-gray-600 mt-1">Choose the type of business entity you want to establish in Dubai</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {businessTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${
              selectedType === type.id
                ? 'border-blue-900 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-lg ${
                selectedType === type.id ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-900'
              }`}>
                <type.icon size={24} />
              </div>
              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                selectedType === type.id ? 'border-blue-900' : 'border-gray-300'
              }`}>
                {selectedType === type.id && (
                  <div className="h-3 w-3 rounded-full bg-blue-900"></div>
                )}
              </div>
            </div>

            <h4 className="text-lg font-semibold mt-4 text-gray-800">{type.title}</h4>
            <p className="text-gray-600 text-sm mt-2">{type.description}</p>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {type.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};