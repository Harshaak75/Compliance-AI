
import React from 'react';
import { Modal } from '../ui/Modal';
import { Button, Badge } from '../ui/Primitives';
import { Policy } from '../../types';
import { FileText, Calendar, User, Download, History, File, ShieldCheck } from 'lucide-react';

interface ViewPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policy: Policy | null;
}

export const ViewPolicyModal: React.FC<ViewPolicyModalProps> = ({ isOpen, onClose, policy }) => {
  if (!policy) return null;

  const getStatusVariant = (status: string) => {
    switch(status) {
      case 'Active': return 'success';
      case 'Under Review': return 'warning';
      case 'Expired': return 'danger';
      case 'Draft': return 'outline';
      default: return 'default';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Policy Details"
      footer={
        <div className="flex gap-2 justify-end w-full">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
            </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Header Info */}
        <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between">
                 <h2 className="text-xl font-bold text-slate-900">{policy.title}</h2>
                 <Badge variant={getStatusVariant(policy.status)}>{policy.status}</Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {policy.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Updated: {policy.lastUpdated}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> Owner: {policy.owner}</span>
            </div>
        </div>

        {/* Description */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 max-h-[150px] overflow-y-auto">
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Policy Overview</h4>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{policy.description}</p>
        </div>

        {/* Attachments */}
        <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <File className="w-4 h-4 text-slate-500" /> Attachments
            </h4>
            <div className="grid grid-cols-1 gap-2">
                {policy.attachments.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-50 text-red-600 rounded">
                                <FileText className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{file.name}</p>
                                <p className="text-xs text-slate-500">{file.size} • {file.type.toUpperCase()}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-blue-600">
                            <Download className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>

        {/* Version History */}
        <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <History className="w-4 h-4 text-slate-500" /> Version History
            </h4>
            <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                 {policy.versions.map((v, i) => (
                     <div key={i} className="p-3 flex items-center justify-between">
                         <div>
                             <p className="text-sm font-medium text-slate-900">Version {v.version}</p>
                             <p className="text-xs text-slate-500">{v.changeSummary}</p>
                         </div>
                         <div className="text-right">
                             <p className="text-xs font-medium text-slate-600">{v.date}</p>
                             <p className="text-[10px] text-slate-400">by {v.changedBy}</p>
                         </div>
                     </div>
                 ))}
            </div>
        </div>
      </div>
    </Modal>
  );
};
