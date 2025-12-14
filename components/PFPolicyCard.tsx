import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Badge, Button } from './ui/Primitives';
import { ArrowRight, Briefcase, Calendar, Percent, IndianRupee } from 'lucide-react';
import { PFPolicy } from '../types';

interface PFPolicyCardProps {
    policy: PFPolicy;
}

const DetailRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors group">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-md shadow-sm text-slate-500 group-hover:text-blue-600 transition-colors">
                <Icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-600">{label}</span>
        </div>
        <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
);

export const PFPolicyCard: React.FC<PFPolicyCardProps> = ({ policy }) => {
  return (
    <Card className="h-full hover:shadow-md transition-all duration-300 border-t-4 border-t-blue-600">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div>
            <CardTitle className="text-xl">Current PF Policy</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Provident Fund Regulations</p>
        </div>
        <Badge variant={policy.status === 'Active' ? 'success' : 'default'} className="px-3 py-1">
          {policy.status}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <DetailRow icon={Percent} label="Employer Contrib." value={policy.employer} />
             <DetailRow icon={Percent} label="Employee Contrib." value={policy.employee} />
             <DetailRow icon={IndianRupee} label="Wage Limit" value={policy.wageLimit} />
             <DetailRow icon={Calendar} label="Effective Date" value={policy.effectiveDate} />
         </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-slate-100 mt-2">
         <Button variant="ghost" className="w-full justify-between text-blue-600 hover:text-blue-700 hover:bg-blue-50">
            View Policy Details
            <ArrowRight className="w-4 h-4" />
         </Button>
      </CardFooter>
    </Card>
  );
};