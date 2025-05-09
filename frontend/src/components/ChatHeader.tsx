import React, { useState } from 'react';
import { useAuthState } from '../hooks/useAuthState';
import PayModal from './PayModal';

interface ChatHeaderProps {
  title?: string;
}

export default function ChatHeader({ title = 'Untitled Chat' }: ChatHeaderProps) {
  const { status } = useAuthState();
  const [showPayModal, setShowPayModal] = useState(false);

  // Status badge styles based on auth status
  const getBadgeStyles = () => {
    switch (status) {
      case 'paid':
        return 'bg-accent/20 text-accent border-accent';
      case 'waitlist':
        return 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]';
      default:
        return 'bg-text-muted/20 text-text-muted border-text-muted';
    }
  };

  // Status badge text
  const getStatusText = () => {
    switch (status) {
      case 'paid':
        return 'Premium';
      case 'waitlist':
        return 'Waitlist';
      default:
        return 'Guest';
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-[#262626] px-4 h-12">
      {/* Chat Title */}
      <h1 className="text-text-primary font-medium truncate">
        {title}
      </h1>
      
      <div className="flex items-center gap-3">
        {/* Status Badge */}
        <div className={`text-xs px-2 py-0.5 rounded-full border ${getBadgeStyles()}`}>
          {getStatusText()}
        </div>
        
        {/* Early-Bird Button (only show for non-paid users) */}
        {status !== 'paid' && (
          <button
            onClick={() => setShowPayModal(true)}
            className="text-sm border border-accent text-accent px-3 py-1 rounded-md hover:bg-accent/10 transition-colors"
          >
            Early-Bird
          </button>
        )}
      </div>
      
      {/* Payment Modal */}
      {showPayModal && (
        <PayModal onClose={() => setShowPayModal(false)} />
      )}
    </header>
  );
}