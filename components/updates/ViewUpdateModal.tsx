import React from 'react';
import { Modal } from '../ui/Modal';
import { Button, Badge } from '../ui/Primitives';
import { GovtUpdate } from '../../types';
import { ExternalLink, Calendar, CheckCircle2, Clock, AlertOctagon } from 'lucide-react';

interface ViewUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  update: GovtUpdate | null;
  onMarkReviewed: (id: number) => void;
}

export const ViewUpdateModal: React.FC<ViewUpdateModalProps> = ({ isOpen, onClose, update, onMarkReviewed }) => {
  if (!update) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Details"
      footer={
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-end">
             <Button variant="outline" onClick={onClose}>Close</Button>
             {update.status === 'New' ? (
                 <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    onClick={() => {
                        onMarkReviewed(update.id);
                        onClose();
                    }}
                 >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Reviewed
                 </Button>
             ) : (
                 <Button variant="secondary" disabled className="gap-2 opacity-70">
                    <CheckCircle2 className="w-4 h-4" />
                    Already Reviewed
                 </Button>
             )}
        </div>
      }
    >
      <div className="space-y-5">
        
        {/* Header Block */}
        <div>
            <div className="flex gap-2 mb-2">
                <Badge variant="blue">{update.category}</Badge>
                <Badge variant={update.impact === 'High' ? 'danger' : update.impact === 'Medium' ? 'warning' : 'success'}>
                    {update.impact} Priority
                </Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">{update.title}</h2>
            
            <a 
                href={update.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline mt-2"
            >
                View Official Source <ExternalLink className="w-3 h-3 ml-1" />
            </a>
        </div>

        {/* Timestamps */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
             <div className="flex items-center gap-2 text-sm text-slate-600">
                 <Calendar className="w-4 h-4 text-slate-400" />
                 <span className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Published</span>
                    {update.date}
                 </span>
             </div>
             <div className="flex items-center gap-2 text-sm text-slate-600">
                 <Clock className="w-4 h-4 text-slate-400" />
                 <span className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Fetched</span>
                    {update.fetchedDate || "N/A"}
                 </span>
             </div>
        </div>

        {/* Summary */}
        <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Full Summary</h4>
            <div className="p-4 bg-white border border-slate-200 rounded-lg max-h-[200px] overflow-y-auto text-sm text-slate-600 leading-relaxed shadow-sm">
                {update.summary}
                <br /><br />
                The changes are expected to be implemented immediately. Employers are advised to update their payroll systems accordingly.
            </div>
        </div>

        {/* Impact Notes Input Placeholder */}
        <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-slate-500" /> 
                Compliance Impact Notes
            </h4>
            <textarea 
                className="w-full h-24 p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none placeholder:text-slate-400"
                placeholder="Add internal notes regarding impact on current policies..."
            ></textarea>
        </div>

      </div>
    </Modal>
  );
};