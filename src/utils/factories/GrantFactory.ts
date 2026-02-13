/**
 * Grant Factory
 * Handles test data for Grants module (all tabs/sections)
 */

import { BaseTestDataFactory, TestDataTracker } from './BaseTestDataFactory';

/* ==================== GRANT INTERFACES ==================== */

export interface GrantBasicInfo {
  grantCode: string;
  grantName: string;
  programCode?: string; // Link to program
  grantAmount: string;
  grantPeriod: string;
  grantStartDate: string;
  grantEndDate: string;
  description: string;
}

export interface GrantEligibility {
  eligibilityType: string;
  criteria: string[];
  restrictions?: string;
}

export interface GrantBudgetCategory {
  categoryName: string;
  allocatedAmount: string;
  description?: string;
}

export interface CompleteGrantData {
  basicInfo: GrantBasicInfo;
  eligibility?: GrantEligibility;
  budgetCategories?: GrantBudgetCategory[];
}

/* ==================== GRANT FACTORY ==================== */

export class GrantFactory extends BaseTestDataFactory {
  
  /**
   * Generate grant code
   */
  static generateGrantCode(prefix: string = 'GNT'): string {
    return this.generateUniqueId(prefix);
  }

  /**
   * Generate grant name
   */
  static generateGrantName(baseName: string = 'Test Grant'): string {
    return `${baseName} ${this.generateTimestamp()}`;
  }

  /**
   * Generate basic grant information
   */
  static generateBasicInfo(overrides: Partial<GrantBasicInfo> = {}): GrantBasicInfo {
    const grantCode = this.generateGrantCode();
    const grantName = this.generateGrantName();
    
    const basicInfo: GrantBasicInfo = {
      grantCode,
      grantName,
      grantAmount: '50000',
      grantPeriod: '12 months',
      grantStartDate: this.generateFutureDate(7),
      grantEndDate: this.generateFutureDate(365),
      description: 'Auto-generated test grant',
      ...overrides
    };

    TestDataTracker.trackGrant(basicInfo.grantCode, basicInfo.grantName, basicInfo.programCode);

    return basicInfo;
  }

  /**
   * Generate grant for specific program
   */
  static generateGrantForProgram(programCode: string): GrantBasicInfo {
    return this.generateBasicInfo({
      programCode,
      grantName: `Grant for ${programCode} ${this.generateTimestamp()}`
    });
  }

  /**
   * Generate grant eligibility
   */
  static generateEligibility(): GrantEligibility {
    return {
      eligibilityType: 'Non-Profit Organizations',
      criteria: [
        '501(c)(3) status required',
        'Operating for at least 2 years',
        'Annual budget under $1M'
      ],
      restrictions: 'No religious or political organizations'
    };
  }

  /**
   * Generate budget categories
   */
  static generateBudgetCategories(): GrantBudgetCategory[] {
    return [
      { categoryName: 'Personnel', allocatedAmount: '25000', description: 'Staff salaries' },
      { categoryName: 'Equipment', allocatedAmount: '15000', description: 'Necessary equipment' },
      { categoryName: 'Travel', allocatedAmount: '5000', description: 'Project-related travel' },
      { categoryName: 'Other', allocatedAmount: '5000', description: 'Miscellaneous expenses' }
    ];
  }

  /**
   * Generate complete grant data
   */
  static generateCompleteGrant(overrides: Partial<CompleteGrantData> = {}): CompleteGrantData {
    return {
      basicInfo: this.generateBasicInfo(overrides.basicInfo),
      eligibility: overrides.eligibility || this.generateEligibility(),
      budgetCategories: overrides.budgetCategories || this.generateBudgetCategories()
    };
  }

  /**
   * Get created grants
   */
  static getCreatedGrants() {
    return TestDataTracker.getGrants();
  }

  /**
   * Clear tracking
   */
  static clearTracking(): void {
    TestDataTracker.clearGrants();
  }
}

/* ==================== FUNDING SOURCE INTERFACES ==================== */

export interface FundingSourceBasicInfo {
  sourceCode: string;
  sourceName: string;
  fundingAmount: string;
  fiscalYear: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface FundingSourceAllocation {
  programCode: string;
  allocatedAmount: string;
  purpose: string;
}

export interface CompleteFundingSourceData {
  basicInfo: FundingSourceBasicInfo;
  allocations?: FundingSourceAllocation[];
}

/* ==================== FUNDING SOURCE FACTORY ==================== */

export class FundingSourceFactory extends BaseTestDataFactory {
  
  /**
   * Generate funding source code
   */
  static generateSourceCode(prefix: string = 'FND'): string {
    return this.generateUniqueId(prefix);
  }

  /**
   * Generate funding source name
   */
  static generateSourceName(baseName: string = 'Test Funding Source'): string {
    return `${baseName} ${this.generateTimestamp()}`;
  }

  /**
   * Generate basic funding source information
   */
  static generateBasicInfo(overrides: Partial<FundingSourceBasicInfo> = {}): FundingSourceBasicInfo {
    const sourceCode = this.generateSourceCode();
    const sourceName = this.generateSourceName();
    
    const basicInfo: FundingSourceBasicInfo = {
      sourceCode,
      sourceName,
      fundingAmount: '500000',
      fiscalYear: '2026',
      startDate: this.generateFutureDate(1),
      endDate: this.generateFutureDate(365),
      description: 'Auto-generated test funding source',
      ...overrides
    };

    TestDataTracker.trackFundingSource(basicInfo.sourceCode, basicInfo.sourceName);

    return basicInfo;
  }

  /**
   * Generate funding allocations
   */
  static generateAllocations(programCodes: string[]): FundingSourceAllocation[] {
    return programCodes.map(code => ({
      programCode: code,
      allocatedAmount: '100000',
      purpose: `Funding for ${code}`
    }));
  }

  /**
   * Generate complete funding source
   */
  static generateCompleteFundingSource(overrides: Partial<CompleteFundingSourceData> = {}): CompleteFundingSourceData {
    return {
      basicInfo: this.generateBasicInfo(overrides.basicInfo),
      allocations: overrides.allocations || []
    };
  }

  /**
   * Generate federal funding source
   */
  static generateFederalFunding(): FundingSourceBasicInfo {
    return this.generateBasicInfo({
      sourceName: `Federal Grant ${this.generateTimestamp()}`,
      fundingAmount: '2000000'
    });
  }

  /**
   * Generate state funding source
   */
  static generateStateFunding(): FundingSourceBasicInfo {
    return this.generateBasicInfo({
      sourceName: `State Grant ${this.generateTimestamp()}`,
      fundingAmount: '1000000'
    });
  }

  /**
   * Get created funding sources
   */
  static getCreatedFundingSources() {
    return TestDataTracker.getFundingSources();
  }

  /**
   * Clear tracking
   */
  static clearTracking(): void {
    TestDataTracker.clearFundingSources();
  }
}