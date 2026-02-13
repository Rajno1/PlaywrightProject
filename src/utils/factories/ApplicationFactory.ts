/**
 * Application Factory
 * Handles test data for Application submission (all sections)
 */

import { BaseTestDataFactory, TestDataTracker } from './BaseTestDataFactory';

/* ==================== APPLICATION INTERFACES ==================== */

export interface ApplicationBasicInfo {
  applicationId: string;
  grantCode?: string; // Grant applying for
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  organizationName: string;
  organizationEIN?: string;
  projectTitle: string;
  requestedAmount: string;
}

export interface ApplicationNarrative {
  problemStatement: string;
  proposedSolution: string;
  goals: string[];
  timeline: string;
  sustainability: string;
}

export interface ApplicationBudget {
  totalProjectCost: string;
  requestedAmount: string;
  matchingFunds: string;
  budgetBreakdown: Array<{
    category: string;
    amount: string;
  }>;
}

export interface CompleteApplicationData {
  basicInfo: ApplicationBasicInfo;
  narrative?: ApplicationNarrative;
  budget?: ApplicationBudget;
  attachments?: string[]; // File paths
}

/* ==================== APPLICATION FACTORY ==================== */

export class ApplicationFactory extends BaseTestDataFactory {
  
  /**
   * Generate application ID
   */
  static generateApplicationId(prefix: string = 'APP'): string {
    return this.generateUniqueId(prefix);
  }

  /**
   * Generate EIN (Employer Identification Number)
   */
  static generateEIN(): string {
    const part1 = this.generateRandomNumber(10, 99);
    const part2 = this.generateRandomNumber(1000000, 9999999);
    return `${part1}-${part2}`;
  }

  /**
   * Generate basic application information
   */
  static generateBasicInfo(overrides: Partial<ApplicationBasicInfo> = {}): ApplicationBasicInfo {
    const applicationId = this.generateApplicationId();
    const timestamp = this.generateTimestamp();
    
    const basicInfo: ApplicationBasicInfo = {
      applicationId,
      applicantName: `Test Applicant ${timestamp}`,
      applicantEmail: this.generateEmail('applicant'),
      applicantPhone: this.generatePhoneNumber(),
      organizationName: `Test Organization ${timestamp}`,
      organizationEIN: this.generateEIN(),
      projectTitle: `Test Project ${timestamp}`,
      requestedAmount: '25000',
      ...overrides
    };

    TestDataTracker.trackApplication(basicInfo.applicationId, basicInfo.applicantEmail);

    return basicInfo;
  }

  /**
   * Generate application for specific grant
   */
  static generateApplicationForGrant(grantCode: string, requestedAmount?: string): ApplicationBasicInfo {
    return this.generateBasicInfo({
      grantCode,
      projectTitle: `Application for ${grantCode} ${this.generateTimestamp()}`,
      requestedAmount: requestedAmount || '25000'
    });
  }

  /**
   * Generate application narrative
   */
  static generateNarrative(): ApplicationNarrative {
    return {
      problemStatement: 'Auto-generated problem statement for testing purposes.',
      proposedSolution: 'Auto-generated proposed solution that addresses the problem.',
      goals: [
        'Goal 1: Complete project planning phase',
        'Goal 2: Implement solution',
        'Goal 3: Evaluate outcomes'
      ],
      timeline: '12 months - Quarterly milestones',
      sustainability: 'Project will continue through diversified funding sources.'
    };
  }

  /**
   * Generate application budget
   */
  static generateBudget(requestedAmount: string = '25000'): ApplicationBudget {
    const requested = parseInt(requestedAmount);
    const matching = Math.floor(requested * 0.25); // 25% match
    
    return {
      totalProjectCost: String(requested + matching),
      requestedAmount: requestedAmount,
      matchingFunds: String(matching),
      budgetBreakdown: [
        { category: 'Personnel', amount: String(Math.floor(requested * 0.5)) },
        { category: 'Equipment', amount: String(Math.floor(requested * 0.3)) },
        { category: 'Travel', amount: String(Math.floor(requested * 0.1)) },
        { category: 'Other', amount: String(Math.floor(requested * 0.1)) }
      ]
    };
  }

  /**
   * Generate complete application
   */
  static generateCompleteApplication(overrides: Partial<CompleteApplicationData> = {}): CompleteApplicationData {
    const basicInfo = this.generateBasicInfo(overrides.basicInfo);
    
    return {
      basicInfo,
      narrative: overrides.narrative || this.generateNarrative(),
      budget: overrides.budget || this.generateBudget(basicInfo.requestedAmount),
      attachments: overrides.attachments || []
    };
  }

  /**
   * Generate minimal application (only required fields)
   */
  static generateMinimalApplication(): ApplicationBasicInfo {
    return this.generateBasicInfo();
  }

  /**
   * Get created applications
   */
  static getCreatedApplications() {
    return TestDataTracker.getApplications();
  }

  /**
   * Clear tracking
   */
  static clearTracking(): void {
    TestDataTracker.clearApplications();
  }
}

/* ==================== USER INTERFACES ==================== */

export interface UserBasicInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userType: 'individual' | 'organization' | 'staff';
}

export interface OrganizationInfo {
  organizationName: string;
  organizationEIN: string;
  organizationType: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface CompleteUserData {
  basicInfo: UserBasicInfo;
  organizationInfo?: OrganizationInfo; // For organization users
}

/* ==================== USER FACTORY ==================== */

export class UserFactory extends BaseTestDataFactory {
  
  /**
   * Generate user email
   */
  static generateUserEmail(prefix: string = 'user'): string {
    return this.generateEmail(prefix);
  }

  /**
   * Generate password
   */
  static generatePassword(): string {
    // Generate a secure test password
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  /**
   * Generate basic user information
   */
  static generateBasicInfo(
    userType: 'individual' | 'organization' | 'staff' = 'individual',
    overrides: Partial<UserBasicInfo> = {}
  ): UserBasicInfo {
    const timestamp = this.generateTimestamp();
    
    const basicInfo: UserBasicInfo = {
      firstName: `TestUser`,
      lastName: timestamp,
      email: this.generateUserEmail(`${userType.toLowerCase()}`),
      password: 'Test@1234', // Default password for easy testing
      phone: this.generatePhoneNumber(),
      userType,
      ...overrides
    };

    TestDataTracker.trackUser(basicInfo.email, basicInfo.password, basicInfo.userType);

    return basicInfo;
  }

  /**
   * Generate organization information
   */
  static generateOrganizationInfo(): OrganizationInfo {
    const timestamp = this.generateTimestamp();
    
    return {
      organizationName: `Test Organization ${timestamp}`,
      organizationEIN: ApplicationFactory.generateEIN(),
      organizationType: 'Non-Profit',
      address: {
        street: `${this.generateRandomNumber(100, 9999)} Test Street`,
        city: 'Test City',
        state: 'CA',
        zipCode: String(this.generateRandomNumber(10000, 99999))
      }
    };
  }

  /**
   * Generate individual user
   */
  static generateIndividualUser(overrides: Partial<UserBasicInfo> = {}): UserBasicInfo {
    return this.generateBasicInfo('individual', overrides);
  }

  /**
   * Generate organization user (with org info)
   */
  static generateOrganizationUser(): CompleteUserData {
    return {
      basicInfo: this.generateBasicInfo('organization'),
      organizationInfo: this.generateOrganizationInfo()
    };
  }

  /**
   * Generate staff user
   */
  static generateStaffUser(overrides: Partial<UserBasicInfo> = {}): UserBasicInfo {
    return this.generateBasicInfo('staff', overrides);
  }

  /**
   * Get last registered user
   */
  static getLastRegisteredUser(userType?: 'individual' | 'organization' | 'staff') {
    return TestDataTracker.getLastUser(userType);
  }

  /**
   * Get all registered users
   */
  static getRegisteredUsers() {
    return TestDataTracker.getUsers();
  }

  /**
   * Clear tracking
   */
  static clearTracking(): void {
    TestDataTracker.clearUsers();
  }
}