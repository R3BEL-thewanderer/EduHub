import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, BookOpen, ClipboardList, Play } from 'lucide-react';
import type { ContentTab, FileItem, VideoItem } from '@/types';
import { FileList } from './FileList';
import { VideoList } from './VideoList';
import { LoginWall } from '@/components/auth/LoginWall';

interface ContentTabsProps {
  notes: FileItem[];
  pdfs: FileItem[];
  pyqs: FileItem[];
  videos: VideoItem[];
  isLoggedIn: boolean;
  isLoading?: boolean;
}

const tabs: { id: ContentTab; label: string; icon: React.ElementType }[] = [
  { id: 'notes', label: 'Notes', icon: FileText },
  { id: 'pdfs', label: 'PDFs', icon: BookOpen },
  { id: 'pyqs', label: 'PYQ', icon: ClipboardList },
  { id: 'videos', label: 'Videos', icon: Play },
];

export function ContentTabs({ notes, pdfs, pyqs, videos, isLoggedIn }: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState<ContentTab>('notes');

  const renderContent = () => {
    if (!isLoggedIn) {
      return <LoginWall />;
    }

    switch (activeTab) {
      case 'notes':
        return (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold font-display text-primary">Notes</h3>
              <p className="text-muted-foreground text-sm">Handwritten & typed notes by subject</p>
            </div>
            <FileList files={notes} contentType="notes" isLoggedIn={isLoggedIn} />
          </div>
        );
      case 'pdfs':
        return (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold font-display text-primary">PDFs</h3>
              <p className="text-muted-foreground text-sm">Reference material and study guides</p>
            </div>
            <FileList files={pdfs} contentType="pdfs" isLoggedIn={isLoggedIn} />
          </div>
        );
      case 'pyqs':
        return (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold font-display text-primary">Previous Year Questions</h3>
              <p className="text-muted-foreground text-sm">Past exam papers to help you prepare</p>
            </div>
            <FileList files={pyqs} contentType="pyqs" isLoggedIn={isLoggedIn} />
          </div>
        );
      case 'videos':
        return (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold font-display text-primary">Video Lectures</h3>
              <p className="text-muted-foreground text-sm">Recorded lectures and concept explainers</p>
            </div>
            <VideoList videos={videos} isLoggedIn={isLoggedIn} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex gap-1 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
}
