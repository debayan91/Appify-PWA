import { X } from 'lucide-react';

interface GeminiToastProps {
  message: string;
  onClose: () => void;
}

const GeminiToast = ({ message, onClose }: GeminiToastProps) => {
  return (
    <div className="fixed bottom-[40vh] left-0 right-0 z-50 flex justify-center px-4">
      <div className="toast-card">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-lg font-semibold text-foreground leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-secondary transition-colors active:scale-95"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiToast;
