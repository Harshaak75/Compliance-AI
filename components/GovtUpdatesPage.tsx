import React, { useState, useMemo } from 'react';
import { GovtUpdate } from '../types';
import { UpdatesFilterBar } from './updates/UpdatesFilterBar';
import { GovtUpdateCard } from './updates/GovtUpdateCard';
import { ViewUpdateModal } from './updates/ViewUpdateModal';

// Enhanced Mock Data
const MOCK_UPDATES: GovtUpdate[] = [
    {
        id: 1,
        title: "PF Wage Cap Revision Proposal",
        date: "2025-02-28",
        fetchedDate: "2025-02-28 10:30 AM",
        status: "New",
        category: "PF",
        impact: "High",
        tags: ["EPF", "Wage Limit"],
        internalStatus: "Pending Review",
        affectedGroup: "Employees earning < ₹21k",
        costImpact: "High Increase in Employer Contribution",
        summary: "The Ministry of Labour is actively considering increasing the wage ceiling for mandatory EPF coverage from ₹15,000 to ₹21,000. This move aligns with the recent wage indexations and aims to bring more workers under the social security net.",
        source: "#",
        downloadUrl: "#"
    },
    {
        id: 2,
        title: "New ESI Contribution Filing Window",
        date: "2025-02-25",
        fetchedDate: "2025-02-26 09:15 AM",
        status: "New",
        category: "ESI",
        impact: "Medium",
        tags: ["ESI", "Compliance"],
        internalStatus: "Pending Review",
        affectedGroup: "HR Operations",
        costImpact: "Process Change Only",
        summary: "The ESIC has announced a reduction in the grace period for filing monthly contributions from 15 days to 10 days, effective from the next financial quarter. HR teams must adjust payroll cycles accordingly.",
        source: "#",
        downloadUrl: "#"
    },
    {
        id: 3,
        title: "TDS on Virtual Digital Assets",
        date: "2025-02-15",
        fetchedDate: "2025-02-15 14:00 PM",
        status: "Reviewed",
        category: "Tax",
        impact: "Low",
        tags: ["TDS", "Crypto"],
        internalStatus: "Applied",
        affectedGroup: "Finance",
        costImpact: "None",
        summary: "Clarification issued regarding TDS deduction on perquisites provided in the form of Virtual Digital Assets. The threshold remains at ₹10,000 per annum.",
        source: "#"
    },
    {
        id: 4,
        title: "Changes in Leave Encashment Tax Exemption",
        date: "2025-01-20",
        fetchedDate: "2025-01-21 11:45 AM",
        status: "Reviewed",
        category: "Leave",
        impact: "Medium",
        tags: ["Tax", "Leave Policy"],
        internalStatus: "Applied",
        affectedGroup: "Retiring Employees",
        costImpact: "Benefit for Employees",
        summary: "The tax exemption limit for leave encashment for non-government employees has been hiked to ₹25 Lakhs, bringing significant relief to retiring private sector workforce.",
        source: "#",
        downloadUrl: "#"
    },
    {
        id: 5,
        title: "Minimum Wages Revision - Karnataka",
        date: "2025-01-10",
        fetchedDate: "2025-01-11 09:00 AM",
        status: "New",
        category: "Payroll",
        impact: "High",
        tags: ["Minimum Wages", "State Law"],
        internalStatus: "Pending Review",
        affectedGroup: "Blue Collar Workers",
        costImpact: "Moderate Increase",
        summary: "Karnataka State Government has released the draft notification for the revision of minimum wages across scheduled employments for the year 2025-26.",
        source: "#"
    }
];

export const GovtUpdatesPage: React.FC = () => {
    const [updates, setUpdates] = useState<GovtUpdate[]>(MOCK_UPDATES);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedUpdate, setSelectedUpdate] = useState<GovtUpdate | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredUpdates = useMemo(() => {
        return updates.filter(update => {
            const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  update.summary.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'All' || update.category === categoryFilter;
            const matchesPriority = priorityFilter === 'All' || update.impact === priorityFilter;
            const matchesStatus = statusFilter === 'All' || update.status === statusFilter;
            
            return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
        });
    }, [updates, searchTerm, categoryFilter, priorityFilter, statusFilter]);

    const handleViewUpdate = (update: GovtUpdate) => {
        setSelectedUpdate(update);
        setIsModalOpen(true);
    };

    const handleMarkReviewed = (id: number) => {
        setUpdates(prev => prev.map(u => 
            u.id === id ? { ...u, status: 'Reviewed' } : u
        ));
        // In a real app, we would show a Toast notification here
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Government Policy Updates</h2>
                <p className="text-slate-500 mt-1">Latest compliance changes from official authorities tracked in real-time.</p>
            </div>

            {/* Filters */}
            <UpdatesFilterBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />

            {/* Content List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredUpdates.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                        <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                            <span className="text-2xl">🔍</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No updates found</h3>
                        <p className="text-slate-500">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    filteredUpdates.map(update => (
                        <GovtUpdateCard 
                            key={update.id} 
                            update={update} 
                            onView={handleViewUpdate} 
                        />
                    ))
                )}
            </div>

            {/* Modal */}
            <ViewUpdateModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                update={selectedUpdate}
                onMarkReviewed={handleMarkReviewed}
            />
        </div>
    );
};