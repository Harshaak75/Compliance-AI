import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Primitives';
import { PlusCircle, FileText, ClipboardList, Send, Users } from 'lucide-react';

export const QuickActionsCard: React.FC = () => {
    const actions = [
        { label: 'Add Policy', icon: PlusCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Gen Report', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Approvals', icon: ClipboardList, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Notify Staff', icon: Send, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3">
            {actions.map((action) => (
                <button 
                    key={action.label}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:shadow-sm hover:bg-slate-50 transition-all group"
                >
                    <div className={`p-2 rounded-full ${action.bg} ${action.color} mb-2 group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-slate-700">{action.label}</span>
                </button>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};