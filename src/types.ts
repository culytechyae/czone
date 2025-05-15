export interface BusinessSetupOptions {
  businessType: string;
  licenseType: string;
  activityType: string;
  officeType: string;
  officeSize: number;
  visaCount: number;
  additionalServices: string[];
}

export interface CostBreakdownType {
  licenseFees: number;
  initialApprovalFees: number;
  officeCosts: number;
  visaFees: number;
  additionalServicesFees: number;
}