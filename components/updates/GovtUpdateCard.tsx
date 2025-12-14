import React from 'react';
import { GovtUpdate } from '../../types';
import { Card, CardContent, Badge, Button } from '../ui/Primitives';
import { Eye, Download, FilePlus, Calendar, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface GovtUpdateCardProps {
    update: GovtUpdate;
    onView: (update: GovtUpdate) => void;
}

export const GovtUpdateCard: React.FC<GovtUpdateCardProps> = ({ update, onView }) => {
    const getPriorityColor = (impact: string) => {
        switch(impact) {
            case 'High': return 'text-rose-600 bg-rose-50 border-rose-100';
            case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
            default: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        }
    };

    const getCategoryColor = (cat: string) => {
        switch(cat) {
            case 'PF': return 'text-blue-700 bg-blue-50 ring-blue-700/10';
            case 'Tax': return 'text-purple-700 bg-purple-50 ring-purple-700/10';
            default: return 'text-slate-700 bg-slate-50 ring-slate-600/10';
        }
    };

    return (
        <Card className={`group transition-all duration-300 hover:shadow-md border-l-4 ${update.impact === 'High' ? 'border-l-rose-500' : update.impact === 'Medium' ? 'border-l-amber-400' : 'border-l-emerald-400'}`}>
            <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Content Section */}
                    <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2">
                             <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getCategoryColor(update.category)}`}>
                                 {update.category}
                             </span>
                             {update.status === 'New' ? (
                                 <Badge variant="danger" className="animate-pulse">New</Badge>
                             ) : (
                                 <Badge variant="success">Reviewed</Badge>
                             )}
                             <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 ${getPriorityColor(update.impact)}`}>
                                 <AlertTriangle className="w-3 h-3" />
                                 {update.impact} Impact
                             </span>
                        </div>
                        
                        <div>
                            <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors cursor-pointer" onClick={() => onView(update)}>
                                {update.title}
                            </h3>
                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                                {update.summary}
                            </p>
                        </div>

                        {/* Metadata Footer */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
                            <div className="flex items-center gap-1.5" title="Date Published">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Pub: {update.date}</span>
                            </div>
                            {update.fetchedDate && (
                                <div className="flex items-center gap-1.5" title="System Fetched Time">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Fetched: {update.fetchedDate}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Section */}
                    <div className="flex sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto justify-start text-slate-600 hover:text-blue-600 hover:bg-blue-50" onClick={() => onView(update)}>
                            <Eye className="w-4 h-4 mr-2 sm:mr-0 lg:mr-2" />
                            <span className="sm:hidden lg:inline">View</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full sm:w-auto justify-start text-slate-500 hover:text-slate-900" title="Add Note">
                            <FilePlus className="w-4 h-4 mr-2 sm:mr-0 lg:mr-2" />
                            <span className="sm:hidden lg:inline">Note</span>
                        </Button>
                        {update.downloadUrl && (
                            <Button variant="ghost" size="sm" className="w-full sm:w-auto justify-start text-slate-500 hover:text-slate-900" title="Download PDF">
                                <Download className="w-4 h-4 mr-2 sm:mr-0 lg:mr-2" />
                                <span className="sm:hidden lg:inline">PDF</span>
                            </Button>
                        )}
                    </div>
                </div>
                
                {/* Impact Note Bottom Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/50 -mx-5 -mb-5 px-5 py-2 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                     <p className="text-xs text-slate-600 font-medium italic">
                         Analysis: {update.costImpact} | Affected: {update.affectedGroup}
                     </p>
                </div>
            </CardContent>
        </Card>
    );
};