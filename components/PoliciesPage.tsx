
import React, { useState, useMemo } from 'react';
import { Policy } from '../types';
import { FiltersBar } from './policies/FiltersBar';
import { PolicyTable } from './policies/PolicyTable';
import { PolicyCard } from './policies/PolicyCard';
import { ViewPolicyModal } from './policies/ViewPolicyModal';
import { Button } from './ui/Primitives';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_POLICIES: Policy[] = [
    {
        id: "POL-001",
        title: "Employee Provident Fund (EPF) Policy",
        category: "Payroll",
        status: "Active",
        lastUpdated: "2024-01-15",
        owner: "Finance Team",
        description: "Comprehensive guidelines regarding EPF contributions, withdrawals, and eligibility criteria for all full-time employees. This policy aligns with the latest EPFO regulations and amendments.",
        versions: [
            { version: "2.1", date: "2024-01-15", changedBy: "S. Sharma", changeSummary: "Updated wage ceiling limits" },
            { version: "2.0", date: "2023-04-01", changedBy: "A. Morgan", changeSummary: "Annual revision" }
        ],
        attachments: [
            { name: "EPF_Guidelines_v2.1.pdf", size: "2.4 MB", type: "pdf", url: "#" }
        ]
    },
    {
        id: "POL-002",
        title: "Prevention of Sexual Harassment (POSH)",
        category: "Statutory",
        status: "Active",
        lastUpdated: "2023-11-20",
        owner: "HR Compliance",
        description: "Zero-tolerance policy towards sexual harassment at the workplace. Defines the constitution of the Internal Committee (IC) and the redressal mechanism.",
        versions: [
            { version: "1.5", date: "2023-11-20", changedBy: "Legal Team", changeSummary: "Updated IC members list" }
        ],
        attachments: [
            { name: "POSH_Policy_2024.pdf", size: "1.1 MB", type: "pdf", url: "#" }
        ]
    },
    {
        id: "POL-003",
        title: "Remote Work & Hybrid Model Guidelines",
        category: "General",
        status: "Under Review",
        lastUpdated: "2024-02-10",
        owner: "HR Operations",
        description: "Guidelines defining the eligibility, core hours, and communication protocols for employees opting for the hybrid work model.",
        versions: [
            { version: "3.0-draft", date: "2024-02-10", changedBy: "A. Morgan", changeSummary: "Drafting new 3-day office rule" }
        ],
        attachments: []
    },
    {
        id: "POL-004",
        title: "Travel & Expense Reimbursement",
        category: "Benefits",
        status: "Expired",
        lastUpdated: "2022-12-01",
        owner: "Finance Team",
        description: "Rules for claiming business travel expenses, including flight bookings, accommodation limits, and daily allowances.",
        versions: [
            { version: "1.0", date: "2022-12-01", changedBy: "Finance Head", changeSummary: "Initial Release" }
        ],
        attachments: [
            { name: "Expense_Claim_Form.docx", size: "45 KB", type: "doc", url: "#" }
        ]
    },
    {
        id: "POL-005",
        title: "Maternity & Paternity Benefit Policy",
        category: "Leave",
        status: "Active",
        lastUpdated: "2023-08-05",
        owner: "HR Benefits",
        description: "Entitlements for maternity and paternity leave as per the Maternity Benefit Act, including paid leave duration and work-from-home options.",
        versions: [
            { version: "2.0", date: "2023-08-05", changedBy: "A. Morgan", changeSummary: "Added adoption leave clauses" }
        ],
        attachments: [
            { name: "Maternity_Act_Summary.pdf", size: "800 KB", type: "pdf", url: "#" }
        ]
    },
    {
        id: "POL-006",
        title: "IT Assets & Security Policy",
        category: "IT & Security",
        status: "Active",
        lastUpdated: "2024-01-05",
        owner: "IT Dept",
        description: "Acceptable use policy for company-issued laptops, mobile devices, and software licenses. Includes data protection protocols.",
        versions: [
            { version: "4.2", date: "2024-01-05", changedBy: "CTO Office", changeSummary: "Updated VPN protocols" }
        ],
        attachments: []
    },
];

export const PoliciesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredPolicies = useMemo(() => {
        return MOCK_POLICIES.filter(policy => {
            const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  policy.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'All' || policy.category === categoryFilter;
            const matchesStatus = statusFilter === 'All' || policy.status === statusFilter;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [searchTerm, categoryFilter, statusFilter]);

    const handleViewPolicy = (policy: Policy) => {
        setSelectedPolicy(policy);
        setIsModalOpen(true);
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Policies</h2>
                <p className="text-slate-500 mt-1">Manage and track internal company policies and compliance documents.</p>
            </div>

            {/* Filters */}
            <FiltersBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Content */}
            <div className="min-h-[400px]">
                {/* Desktop Table View */}
                <div className="hidden lg:block">
                    <PolicyTable policies={filteredPolicies} onView={handleViewPolicy} />
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden">
                    {filteredPolicies.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                            <p className="text-slate-500">No policies found.</p>
                        </div>
                    ) : (
                        filteredPolicies.map(policy => (
                            <PolicyCard key={policy.id} policy={policy} onView={handleViewPolicy} />
                        ))
                    )}
                </div>
            </div>

            {/* Pagination (Mock UI) */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPolicies.length}</span> of <span className="font-medium">{filteredPolicies.length}</span> results
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                        <ChevronLeft className="w-4 h-4" /> Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                        Next <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Modal */}
            <ViewPolicyModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                policy={selectedPolicy} 
            />
        </div>
    );
};
