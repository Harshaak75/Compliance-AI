import React from 'react';
import { Input, Select } from '../ui/Primitives';
import { Search, Filter, RefreshCcw } from 'lucide-react';

interface UpdatesFilterBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  priorityFilter: string;
  setPriorityFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export const UpdatesFilterBar: React.FC<UpdatesFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
                placeholder="Search updates..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Filters Group */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto text-slate-500">
                <Filter className="w-4 h-4 hidden sm:block" />
                <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full sm:w-32">
                    <option value="All">Category: All</option>
                    <option value="PF">PF</option>
                    <option value="ESI">ESI</option>
                    <option value="Payroll">Payroll</option>
                    <option value="Tax">Tax</option>
                    <option value="Leave">Leave</option>
                    <option value="Labor Law">Labor Law</option>
                </Select>
            </div>
            
            <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="w-full sm:w-32">
                <option value="All">Priority: All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </Select>

            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full sm:w-32">
                <option value="All">Status: All</option>
                <option value="New">New</option>
                <option value="Reviewed">Reviewed</option>
            </Select>

            <button 
                className="p-2.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500 transition-colors"
                title="Refresh Feed"
            >
                <RefreshCcw className="w-4 h-4" />
            </button>
        </div>
    </div>
  );
};