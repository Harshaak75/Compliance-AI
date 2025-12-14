
import React from 'react';
import { Policy } from '../../types';
import { Badge, Button } from '../ui/Primitives';
import { Eye, Edit, FileText } from 'lucide-react';

interface PolicyTableProps {
  policies: Policy[];
  onView: (policy: Policy) => void;
}

export const PolicyTable: React.FC<PolicyTableProps> = ({ policies, onView }) => {
  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Under Review': return 'warning';
      case 'Expired': return 'danger';
      case 'Draft': return 'outline';
      default: return 'default';
    }
  };

  const getCategoryColor = (cat: string) => {
      switch(cat) {
          case 'Payroll': return 'text-blue-700 bg-blue-50 ring-blue-600/20';
          case 'Leave': return 'text-purple-700 bg-purple-50 ring-purple-600/20';
          case 'Benefits': return 'text-pink-700 bg-pink-50 ring-pink-600/20';
          case 'Statutory': return 'text-amber-700 bg-amber-50 ring-amber-600/20';
          default: return 'text-slate-700 bg-slate-50 ring-slate-600/20';
      }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 font-semibold text-slate-700">Policy Title</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Category</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Last Updated</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Owner</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                        <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {policies.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                No policies found matching your criteria.
                            </td>
                        </tr>
                    ) : (
                        policies.map((policy) => (
                            <tr key={policy.id} className="group hover:bg-slate-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{policy.title}</div>
                                    <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[200px]">
                                        {policy.versions[0]?.changeSummary || "Standard Policy"}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getCategoryColor(policy.category)}`}>
                                        {policy.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {policy.lastUpdated}
                                </td>
                                <td className="px-6 py-4">
                                     <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                            {policy.owner.charAt(0)}
                                        </div>
                                        <span className="text-slate-600">{policy.owner}</span>
                                     </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={getStatusVariant(policy.status)}>{policy.status}</Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50" onClick={() => onView(policy)} title="View Details">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 cursor-not-allowed" disabled title="Edit (Coming Soon)">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
  );
};
