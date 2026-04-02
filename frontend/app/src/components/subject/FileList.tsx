import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Eye, 
  Calendar,
  HardDrive,
  FileImage
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { FileItem } from '@/types';
import { formatFileSize, formatDate } from '@/data/mockData';
import { PDFViewer } from './PDFViewer';
import { getSignedViewUrl } from '@/lib/supabaseData';

interface FileListProps {
  files: FileItem[];
  contentType: 'notes' | 'pdfs' | 'pyqs';
  isLoggedIn: boolean;
}

export function FileList({ files, contentType, isLoggedIn }: FileListProps) {
  const [viewingFile, setViewingFile] = useState<FileItem | null>(null);
  const [viewingUrl, setViewingUrl] = useState<string | null>(null);
  const [isLoadingUrl, setIsLoadingUrl] = useState(false);

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <FileImage className="w-5 h-5 text-sand" />;
    }
    return <FileText className="w-5 h-5 text-sage" />;
  };

  const getEmptyStateMessage = () => {
    switch (contentType) {
      case 'notes':
        return 'No notes uploaded yet — check back soon!';
      case 'pdfs':
        return 'No PDFs uploaded yet — check back soon!';
      case 'pyqs':
        return 'PYQ papers will be added before exams — stay tuned!';
      default:
        return 'No content here yet — check back soon!';
    }
  };

  const handleViewFile = async (file: FileItem) => {
    setViewingFile(file);
    setIsLoadingUrl(true);

    // Get a signed URL from Supabase for secure viewing
    const url = await getSignedViewUrl(file.storagePath);
    if (url) {
      setViewingUrl(url);
    }
    setIsLoadingUrl(false);
  };

  const handleCloseViewer = () => {
    setViewingFile(null);
    setViewingUrl(null);
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📭</span>
        </div>
        <p className="text-muted-foreground">{getEmptyStateMessage()}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* File List */}
      <div className="space-y-3">
        {files.map((file, index) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-border p-4 hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-4">
              {/* File Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                {getFileIcon(file.mimeType)}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-primary font-medium truncate">
                  {file.title}
                </h4>
                
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <HardDrive className="w-3.5 h-3.5" />
                    {formatFileSize(file.sizeBytes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(file.uploadedAt)}
                  </span>
                  {file.examYear && (
                    <Badge variant="secondary" className="bg-sand-light text-sand text-xs border-0">
                      {file.examYear}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions — View only, NO download */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {isLoggedIn ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewFile(file)}
                    className="border-border text-muted-foreground hover:text-primary hover:bg-secondary"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                ) : (
                  <Badge variant="secondary" className="bg-secondary text-muted-foreground border border-border">
                    <span className="mr-1">🔒</span> Login to access
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inline PDF Viewer — opens on page, no downloading */}
      <AnimatePresence>
        {viewingFile && (
          <PDFViewer
            fileUrl={viewingUrl}
            fileName={viewingFile.title}
            isLoading={isLoadingUrl}
            onClose={handleCloseViewer}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
