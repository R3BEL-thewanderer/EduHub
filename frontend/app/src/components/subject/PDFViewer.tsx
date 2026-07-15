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
      className={`bg-white rounded-md border-4 border-black shadow-neo-lg overflow-hidden flex flex-col ${
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
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b-4 border-black">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded border-2 border-black bg-sage flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <span className="text-black text-xs font-black">PDF</span>
          </div>
          <span className="text-black font-black font-display text-lg uppercase tracking-wider truncate">{fileName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-black border-2 border-transparent hover:border-black hover:bg-sand font-black rounded"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-black border-2 border-transparent hover:border-black hover:bg-rose font-black uppercase rounded"
          >
            <X className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">CLOSE</span>
          </Button>
        </div>
      </div>

      {/* PDF Content — iframe-based viewer (works with CORS, no download) */}
      <div 
        className={`bg-white overflow-hidden ${isFullscreen ? 'flex-1' : 'h-[70vh]'}`}
        onContextMenu={(e) => e.preventDefault()}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-black animate-spin mb-4" />
            <p className="text-black text-sm font-black uppercase tracking-widest animate-pulse">Generating secure link...</p>
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
            <div className="w-16 h-16 rounded border-4 border-black bg-rose flex items-center justify-center mb-3 shadow-neo-sm">
              <X className="w-8 h-8 text-black font-black" />
            </div>
            <p className="text-black font-black uppercase tracking-wider">Unable to load PDF. Please try again.</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClose}
              className="mt-4 border-2 border-black bg-white text-black font-black uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-sand"
            >
              CLOSE VIEWER
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
