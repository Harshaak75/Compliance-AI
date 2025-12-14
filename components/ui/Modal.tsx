import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './Primitives';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children, footer }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Content */}
      <div className="relative z-50 grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg animate-in fade-in-0 zoom-in-95">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-900">{title}</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
               <X className="h-4 w-4" />
            </Button>
          </div>
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
        
        <div className="py-2">
          {children}
        </div>

        {footer && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};