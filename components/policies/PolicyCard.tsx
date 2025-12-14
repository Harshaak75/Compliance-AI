
import React from 'react';
import { Policy } from '../../types';
import { Card, CardContent, Badge, Button } from '../ui/Primitives';
import { Calendar, Eye, User, FileText } from 'lucide-react';

interface PolicyCardProps {
    policy: Policy;
    onView: (policy: Policy) => void;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({ policy, onView }) => {
  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Under Review': return 'warning';
      case 'Expired': return 'danger';
      default: return 'outline';
    }
  };

  const getCategoryColor = (cat: string) => {
      switch(cat) {
          case 'Payroll': return 'text-blue-600 bg-blue-50 border-blue-100';
          case 'Leave': return 'text-purple-600 bg-purple-50 border-purple-100';
          case 'Benefits': return 'text-pink-600 bg-pink-50 border-pink-100';
          case 'Statutory': return 'text-amber-600 bg-amber-50 border-amber-100';
          default: return 'text-slate-600 bg-slate-100 border-slate-200';
      }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardContent className="p-4 space-y-4">
            <div className="flex items-start justify-between">
                <div>
                     <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded border mb-2 ${getCategoryColor(policy.category)}`}>
                         {policy.category}
                     </span>
                     <h3 className="text-base font-semibold text-slate-900 leading-tight">{policy.title}</h3>
                </div>
                <Badge variant={getStatusVariant(policy.status)}>{policy.status}</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{policy.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate">Owner: {policy.owner}</span>
                </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex gap-2">
                <Button variant="secondary" size="sm" className="w-full h-8 text-xs" onClick={() => onView(policy)}>
                    <Eye className="w-3 h-3 mr-2" /> View
                </Button>
            </div>
        </CardContent>
    </Card>
  );
};
