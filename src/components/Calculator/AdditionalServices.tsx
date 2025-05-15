import React from 'react';
//import { InfoTooltip } from '../UI/InfoTooltip';

interface AdditionalServicesProps {
  selectedServices: string[];
  onChange: (services: string[]) => void;
}

export const AdditionalServices: React.FC<AdditionalServicesProps> = ({
  selectedServices,
  onChange,
}) => {
  const services = [
    { id: 'corporate_bank', name: 'Corporate Bank Account', fee: 2500, description: 'Assistance with opening a corporate bank account' },
    { id: 'trademark', name: 'Trademark Registration', fee: 6800, description: 'Register your company trademark in the UAE' },
    { id: 'accounting', name: 'Accounting Services', fee: 4500, description: 'Basic accounting and bookkeeping for 1 year' },
    { id: 'legal', name: 'Legal Documentation', fee: 3000, description: 'Drafting of basic legal documents' },
    { id: 'website', name: 'Business Website', fee: 5000, description: 'Basic business website with 5 pages' },
    { id: 'marketing', name: 'Digital Marketing Setup', fee: 5500, description: 'Basic digital marketing setup and strategy' },
  ];

  const handleToggleService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onChange(selectedServices.filter(id => id !== serviceId));
    } else {
      onChange([...selectedServices, serviceId]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Additional Services</h3>
        <p className="text-gray-600 mt-1">Select any optional services you may require</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedServices.includes(service.id)
                ? 'border-blue-900 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handleToggleService(service.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium text-gray-800">{service.name}</h5>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-3">AED {service.fee.toLocaleString()}</span>
                <div className={`h-5 w-5 rounded border flex items-center justify-center ${
                  selectedServices.includes(service.id) 
                    ? 'bg-blue-900 border-blue-900' 
                    : 'border-gray-300'
                }`}>
                  {selectedServices.includes(service.id) && (
                    <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h5 className="font-medium">Additional Services Total</h5>
              <p className="text-sm text-gray-600">{selectedServices.length} service(s) selected</p>
            </div>
            <div className="text-xl font-semibold text-blue-900">
              AED {services
                .filter(service => selectedServices.includes(service.id))
                .reduce((total, service) => total + service.fee, 0)
                .toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};