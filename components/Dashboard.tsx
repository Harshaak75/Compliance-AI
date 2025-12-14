import React, { useState } from 'react';
import { PFPolicy, GovtUpdate } from '../types';
import { PFPolicyCard } from './PFPolicyCard';
import { GovtUpdatesList } from './GovtUpdatesList';
import { ComplianceScoreCard } from './ComplianceScoreCard';
import { QuickActionsCard } from './QuickActionsCard';

// Mock Data
const INITIAL_PF_POLICY: PFPolicy = {
  employer: "12%",
  employee: "12%",
  wageLimit: "₹15000",
  effectiveDate: "01 Jan 2024",
  status: 'Active'
};

const INITIAL_GOVT_UPDATES: GovtUpdate[] = [
  {
    id: 1,
    title: "PF Wage Cap Revision Proposal",
    date: "2025-02-28",
    status: "New",
    category: "Payroll",
    impact: "High",
    tags: ["EPF", "Wage Limit", "Budget 2025"],
    internalStatus: "Pending Review",
    affectedGroup: "Employees earning < ₹21k",
    costImpact: "₹300/emp monthly increase (est)",
    summary: "The Government is considering a proposal to increase the wage ceiling for coverage under the Employees' Provident Fund (EPF) scheme from the existing ₹15,000 to ₹21,000. This change is expected to bring millions more workers under the social security net.",
    source: "https://example.com/govt-pf-update"
  },
  {
    id: 2,
    title: "New TDS Guidelines for FY25",
    date: "2025-02-15",
    status: "Reviewed",
    category: "Tax",
    impact: "Medium",
    tags: ["TDS", "Finance Act", "Contractors"],
    internalStatus: "Applied",
    affectedGroup: "Finance Dept, Contractors",
    costImpact: "Neutral (Process Change only)",
    approvedBy: "S. Sharma (CFO)",
    summary: "Updated Tax Deducted at Source (TDS) guidelines have been released for the upcoming financial year. Key changes include revised thresholds for contract payments and new sections for virtual digital assets.",
    source: "https://example.com/tds-update"
  },
  {
      id: 3,
      title: "Maternity Benefit Clarification",
      date: "2025-01-20",
      status: "Reviewed",
      category: "Labor Law",
      impact: "Low",
      tags: ["Maternity", "WFH", "Diversity"],
      internalStatus: "Applied",
      affectedGroup: "Female Employees",
      costImpact: "None",
      approvedBy: "A. Morgan (HR)",
      summary: "Ministry of Labour has issued a clarification regarding the 'Work from Home' option for nursing mothers post-maternity leave period.",
      source: "https://example.com/maternity-update"
  },
  {
      id: 4,
      title: "State Professional Tax Amendment",
      date: "2025-01-05",
      status: "Reviewed",
      category: "Payroll",
      impact: "Medium",
      tags: ["PT", "Karnataka", "Compliance"],
      internalStatus: "Applied",
      affectedGroup: "KA Based Employees",
      costImpact: "Marginal adjustment",
      summary: "Karnataka state government has amended the professional tax slabs for high-income earners effective April 1st.",
      source: "https://example.com/pt-update"
  }
];

export const Dashboard: React.FC = () => {
  const [updates, setUpdates] = useState<GovtUpdate[]>(INITIAL_GOVT_UPDATES);
  const [pfPolicy] = useState<PFPolicy>(INITIAL_PF_POLICY);

  const handleMarkReviewed = (id: number) => {
    setUpdates(prev => prev.map(u => 
        u.id === id ? { ...u, status: 'Reviewed' as const, internalStatus: 'Applied' as const } : u
    ));
  };

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
           <p className="text-slate-500 mt-1">Welcome back, Alex. You have <span className="text-rose-600 font-medium">3 high-priority</span> alerts.</p>
        </div>
        <div className="flex gap-3">
             <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg text-sm hover:bg-slate-50 transition-colors">
                Export Audit Report
             </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        
        {/* Left Column: Widgets (4 columns wide on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Health Score */}
            <div className="flex-none">
                <ComplianceScoreCard />
            </div>

            {/* 2. Quick Actions */}
            <div className="flex-none">
                <QuickActionsCard />
            </div>

            {/* 3. PF Policy - Visual Indicator */}
            <div className="flex-1 min-h-[250px]">
                <PFPolicyCard policy={pfPolicy} />
            </div>

        </div>

        {/* Right Column: Detailed Feed (8 columns wide on lg) */}
        <div className="lg:col-span-8 min-h-[600px]">
            <GovtUpdatesList updates={updates} onMarkReviewed={handleMarkReviewed} />
        </div>
      </div>
    </div>
  );
};