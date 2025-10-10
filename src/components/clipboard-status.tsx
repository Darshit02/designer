"use client";
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/redux/store';
import { CheckCircle, Copy, Clipboard } from 'lucide-react';

export const ClipboardStatus: React.FC = () => {
  const clipboard = useAppSelector((state) => state.shapes.clipboard);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const [showPasteFeedback, setShowPasteFeedback] = useState(false);

  useEffect(() => {
    if (clipboard.length > 0) {
      setShowCopyFeedback(true);
      const timer = setTimeout(() => setShowCopyFeedback(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [clipboard.length]);

  const handlePaste = () => {
    setShowPasteFeedback(true);
    const timer = setTimeout(() => setShowPasteFeedback(false), 2000);
    return () => clearTimeout(timer);
  };

  if (clipboard.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          {showCopyFeedback ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Copied {clipboard.length} shape{clipboard.length > 1 ? 's' : ''}</span>
            </>
          ) : showPasteFeedback ? (
            <>
              <Clipboard className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600">Pasted {clipboard.length} shape{clipboard.length > 1 ? 's' : ''}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-gray-600" />
              <span className="text-gray-600">{clipboard.length} shape{clipboard.length > 1 ? 's' : ''} in clipboard</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
