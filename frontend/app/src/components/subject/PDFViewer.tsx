import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X,
  Loader2,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PDFViewerProps {
  fileUrl: string | null;
  fileName: string;
  isLoading?: boolean;
  onClose: () => void;
}

export function PDFViewer({ fileUrl, fileName, isLoading, onClose }: PDFViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`bg-white rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col ${
        isFullscreen ? 'fixed inset-4 z-50' : ''
      }`}
    >
      {/* Backdrop for fullscreen */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/50 -z-10"
          onClick={onClose}
        />
      )}

      {/* Header — NO download button */}
      <div className="flex items-center justify-between px-5 py-4 bg-secondary/50 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-primary text-xs font-bold">PDF</span>
          </div>
          <span className="text-primary font-display font-semibold truncate">{fileName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-muted-foreground hover:text-primary hover:bg-secondary"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-destructive hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Close</span>
          </Button>
        </div>
      </div>

      {/* PDF Content — iframe-based viewer (works with CORS, no download) */}
      <div 
        className={`bg-muted overflow-hidden ${isFullscreen ? 'flex-1' : 'h-[70vh]'}`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground text-sm font-medium animate-pulse">Generating secure link...</p>
          </div>
        ) : fileUrl ? (
          <iframe
            src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
            className="w-full h-full border-0"
            title={fileName}
            style={{ 
              pointerEvents: 'auto',
              userSelect: 'none',
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
              <X className="w-6 h-6 text-destructive" />
            </div>
            <p className="text-destructive font-medium">Unable to load PDF. Please try again.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClose}
              className="mt-4 border-border text-muted-foreground hover:text-primary"
            >
              Close Viewer
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
