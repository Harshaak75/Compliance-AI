import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui/Primitives';
import { Eye, CheckCircle2, AlertCircle, ExternalLink, CalendarClock, TrendingUp, Users, ShieldAlert, BookOpen } from 'lucide-react';
import { GovtUpdate } from '../types';
import { Modal } from './ui/Modal';

interface GovtUpdatesListProps {
  updates: GovtUpdate[];
  onMarkReviewed: (id: number) => void;
}

export const GovtUpdatesList: React.FC<GovtUpdatesListProps> = ({ updates, onMarkReviewed }) => {
  const [selectedUpdate, setSelectedUpdate] = useState<GovtUpdate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (update: GovtUpdate) => {
    setSelectedUpdate(update);
    setIsModalOpen(true);
  };

  const handleMarkAsReviewed = () => {
    if (selectedUpdate) {
        onMarkReviewed(selectedUpdate.id);
        setIsModalOpen(false);
    }
  };

  const getImpactColor = (impact: string) => {
      switch(impact) {
          case 'High': return 'bg-rose-50 text-rose-700 border-rose-100';
          case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-100';
          default: return 'bg-slate-50 text-slate-600 border-slate-100';
      }
  };

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-slate-50 bg-slate-50/30">
          <div>
            <CardTitle className="text-xl">Government Updates</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Regulatory alerts & compliance revisions</p>
          </div>
          <div className="flex gap-2">
             <Badge variant="outline" className="bg-white">
                 All Systems Normal
             </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-0">
          <div className="divide-y divide-slate-100">
            {updates.map((update) => (
              <div 
                key={update.id} 
                className="group p-4 hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                         <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${update.status === 'New' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                         
                         <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{update.category}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${getImpactColor(update.impact)}`}>
                                    {update.impact} Impact
                                </span>
                            </div>
                            
                            <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors cursor-pointer" onClick={() => handleView(update)}>
                                {update.title}
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <CalendarClock className="w-3 h-3" />
                                    {update.date}
                                </span>
                                {update.tags.map(tag => (
                                    <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                         </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {update.status === 'New' && (
                             <Badge variant="danger" className="hidden sm:inline-flex">Action Req</Badge>
                        )}
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => handleView(update)}
                            className="h-8 px-3 text-xs"
                        >
                            Review
                        </Button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedUpdate && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Compliance Impact Analysis"
            footer={
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-end">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                    <Button variant="default" className="gap-2">
                         <BookOpen className="w-4 h-4" />
                         Create Task
                    </Button>
                    {selectedUpdate.status === 'New' && (
                        <Button onClick={handleMarkAsReviewed} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Ack & Close
                        </Button>
                    )}
                </div>
            }
          >
            <div className="space-y-6 py-2">
                {/* Header Info */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                     <div>
                        <h3 className="text-lg font-bold text-slate-900">{selectedUpdate.title}</h3>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{selectedUpdate.category}</Badge>
                            <Badge variant={selectedUpdate.impact === 'High' ? 'danger' : 'warning'}>
                                {selectedUpdate.impact} Priority
                            </Badge>
                        </div>
                     </div>
                     <div className="text-right text-xs text-slate-500">
                        <p>Ref ID: #{selectedUpdate.id}2025</p>
                        <p className="mt-1">{selectedUpdate.date}</p>
                     </div>
                </div>

                {/* Summary Box */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                     <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Executive Summary</h4>
                     <p className="text-sm text-slate-700 leading-relaxed">{selectedUpdate.summary}</p>
                     <a 
                        href={selectedUpdate.source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline mt-3"
                    >
                        Read Official Gazette Notification
                        <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                </div>

                {/* Impact Grid */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-slate-500" />
                        Impact Assessment
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-3 border border-slate-200 rounded-lg">
                            <span className="text-xs text-slate-500 block mb-1">Financial Impact</span>
                            <span className="text-sm font-semibold text-slate-900">{selectedUpdate.costImpact}</span>
                        </div>
                        <div className="p-3 border border-slate-200 rounded-lg">
                             <span className="text-xs text-slate-500 block mb-1">Affected Group</span>
                             <div className="flex items-center gap-1.5">
                                 <Users className="w-3 h-3 text-slate-400" />
                                 <span className="text-sm font-semibold text-slate-900">{selectedUpdate.affectedGroup}</span>
                             </div>
                        </div>
                         <div className="p-3 border border-slate-200 rounded-lg">
                             <span className="text-xs text-slate-500 block mb-1">Internal Status</span>
                             <span className="text-sm font-medium text-amber-600 flex items-center gap-1">
                                 <ShieldAlert className="w-3 h-3" />
                                 {selectedUpdate.internalStatus}
                             </span>
                        </div>
                         <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                             <span className="text-xs text-slate-500 block mb-1">Reviewer</span>
                             <span className="text-sm font-medium text-slate-700">{selectedUpdate.approvedBy || "Not Assigned"}</span>
                        </div>
                    </div>
                </div>
            </div>
          </Modal>
      )}
    </>
  );
};