
import React from 'react';
import { Input, Select, Button } from '../ui/Primitives';
import { Search, Filter, Plus } from 'lucide-react';

interface FiltersBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
                placeholder="Search internal policies..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Filters Group */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
                <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full sm:w-40">
                    <option value="All">All Categories</option>
                    <option value="Payroll">Payroll</option>
                    <option value="Leave">Leave</option>
                    <option value="Benefits">Benefits</option>
                    <option value="Statutory">Statutory</option>
                    <option value="General">General</option>
                    <option value="IT & Security">IT & Security</option>
                </Select>
            </div>
            
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full sm:w-40">
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Expired">Expired</option>
                <option value="Draft">Draft</option>
            </Select>

            <Button className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Policy</span>
                <span className="sm:hidden">Add</span>
            </Button>
        </div>
    </div>
  );
};
