import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Primitives';
import { Progress } from './ui/Primitives';
import { ShieldCheck, AlertTriangle, FileCheck } from 'lucide-react';

export const ComplianceScoreCard: React.FC = () => {
  return (
    <Card className="h-full border-l-4 border-l-emerald-500">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Compliance Health</CardTitle>
            <span className="text-2xl font-bold text-emerald-600">85%</span>
        </div>
        <p className="text-sm text-slate-500">Overall risk status: <span className="text-emerald-600 font-medium">Good</span></p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
            <div className="flex justify-between text-xs mb-1.5 font-medium text-slate-600">
                <span>Notifications Reviewed</span>
                <span>85/100</span>
            </div>
            <Progress value={85} className="h-2" indicatorClassName="bg-emerald-500" />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Pending</span>
                </div>
                <span className="text-xl font-bold text-slate-900">3</span>
                <span className="text-[10px] text-slate-500">Items require attention</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-1">
                 <div className="flex items-center gap-2 text-blue-600">
                    <FileCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Last Audit</span>
                </div>
                <span className="text-sm font-bold text-slate-900 truncate">Passed</span>
                <span className="text-[10px] text-slate-500">Jan 15, 2025</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};