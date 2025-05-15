import { BusinessSetupOptions, CostBreakdownType } from '../types';

// Get license fees based on business type and activity
const getLicenseFees = (businessType: string, licenseType: string, activityType: string): number => {
  // This is a simplified version; in a real application, these would be more comprehensive
  const fees: {[key: string]: {[key: string]: {[key: string]: number}}} = {
    mainland: {
      commercial: {
        general_trading: 15000,
        electronics: 12000,
        food: 14000
      },
      professional: {
        consulting: 10000,
        marketing: 9000,
        it_services: 11000
      },
      industrial: {
        manufacturing: 20000,
        processing: 18000
      }
    },
    freezone: {
      trading: {
        general_trading: 12000,
        specific_trading: 9000
      },
      service: {
        consulting: 8000,
        tech: 10000
      },
      logistics: {
        freight: 14000
      }
    },
    offshore: {
      trading: {
        international: 9000
      },
      holding: {
        asset: 8000,
        investment: 8500
      }
    }
  };
  
  if (!businessType || !licenseType || !activityType) return 0;
  return fees[businessType]?.[licenseType]?.[activityType] || 0;
};

// Get initial approval fees
const getInitialApprovalFees = (businessType: string): number => {
  const fees: {[key: string]: number} = {
    mainland: 5000,
    freezone: 3500,
    offshore: 2000
  };
  
  return fees[businessType] || 0;
};

// Get office costs
const getOfficeCosts = (businessType: string, officeType: string, officeSize: number): number => {
  if (!businessType || !officeType) return 0;
  
  const officeTypes: {[key: string]: {[key: string]: {pricePerSqFt?: number, fixedPrice?: number}}} = {
    mainland: {
      physical: { pricePerSqFt: 110 },
      shared: { fixedPrice: 15000 }
    },
    freezone: {
      physical: { pricePerSqFt: 130 },
      flexi_desk: { fixedPrice: 12000 },
      virtual: { fixedPrice: 8000 }
    },
    offshore: {
      virtual: { fixedPrice: 5000 }
    }
  };
  
  const office = officeTypes[businessType]?.[officeType];
  if (!office) return 0;
  
  if (office.fixedPrice) {
    return office.fixedPrice;
  } else if (office.pricePerSqFt) {
    return officeSize * office.pricePerSqFt;
  }
  
  return 0;
};

// Get visa costs
const getVisaCosts = (visaCount: number): number => {
  const costPerVisa = 7500;
  return visaCount * costPerVisa;
};

// Get additional services costs
const getAdditionalServicesCosts = (services: string[]): number => {
  const serviceCosts: {[key: string]: number} = {
    corporate_bank: 2500,
    trademark: 6800,
    accounting: 4500,
    legal: 3000,
    website: 5000,
    marketing: 5500
  };
  
  return services.reduce((total, service) => total + (serviceCosts[service] || 0), 0);
};

export const calculateTotalCost = (options: BusinessSetupOptions): CostBreakdownType => {
  const licenseFees = getLicenseFees(options.businessType, options.licenseType, options.activityType);
  const initialApprovalFees = getInitialApprovalFees(options.businessType);
  const officeCosts = getOfficeCosts(options.businessType, options.officeType, options.officeSize);
  const visaFees = getVisaCosts(options.visaCount);
  const additionalServicesFees = getAdditionalServicesCosts(options.additionalServices);
  
  return {
    licenseFees,
    initialApprovalFees,
    officeCosts,
    visaFees,
    additionalServicesFees
  };
};