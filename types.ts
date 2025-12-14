
export interface PFPolicy {
  employer: string;
  employee: string;
  wageLimit: string;
  effectiveDate: string;
  status: 'Active' | 'Inactive';
}

export type UpdateStatus = 'New' | 'Reviewed';
export type ImpactLevel = 'High' | 'Medium' | 'Low';

export interface GovtUpdate {
  id: number;
  title: string;
  date: string; // Publish Date
  fetchedDate?: string; // System Fetched Date
  status: UpdateStatus;
  summary: string;
  source: string;
  // New Enhanced Fields
  category: string; // e.g., 'Payroll', 'Tax', 'Labor Law'
  impact: ImpactLevel;
  tags: string[];
  internalStatus: 'Pending Review' | 'Applied' | 'Rejected';
  affectedGroup: string;
  costImpact: string;
  approvedBy?: string;
  downloadUrl?: string; // For PDF downloads
}

export interface UserProfile {
  name: string;
  role: string;
  avatarUrl: string;
}

// --- New Policy Types ---

export interface PolicyVersion {
  version: string;
  date: string;
  changedBy: string;
  changeSummary: string;
}

export interface PolicyAttachment {
  name: string;
  size: string;
  type: string; // 'pdf', 'doc', etc.
  url: string;
}

export type PolicyCategory = 'Payroll' | 'Leave' | 'Benefits' | 'Statutory' | 'General' | 'IT & Security';
export type PolicyStatus = 'Active' | 'Under Review' | 'Expired' | 'Draft';

export interface Policy {
  id: string;
  title: string;
  category: PolicyCategory;
  status: PolicyStatus;
  lastUpdated: string;
  description: string;
  owner: string;
  versions: PolicyVersion[];
  attachments: PolicyAttachment[];
}