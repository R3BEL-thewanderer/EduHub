import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, BookOpen, ClipboardList, Play, Sparkles } from 'lucide-react';
import type { ContentTab, FileItem, VideoItem } from '@/types';
import { FileList } from './FileList';
import { VideoList } from './VideoList';
import { FlashcardList } from './FlashcardList';
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
  { id: 'flashcards', label: 'Flashcards', icon: Sparkles },
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
              <h3 className="text-xl font-black font-display text-black uppercase tracking-wider">Notes</h3>
              <p className="text-black font-bold text-sm">Handwritten & typed notes by subject</p>
            </div>
            <FileList files={notes} contentType="notes" isLoggedIn={isLoggedIn} />
          </div>
        );
      case 'pdfs':
        return (
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-black font-display text-black uppercase tracking-wider">PDFs</h3>
              <p className="text-black font-bold text-sm">Reference material and study guides</p>
            </div>
            <FileList files={pdfs} contentType="pdfs" isLoggedIn={isLoggedIn} />
          </div>
        );
      case 'pyqs':
        return (
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-black font-display text-black uppercase tracking-wider">Previous Year Questions</h3>
              <p className="text-black font-bold text-sm">Past exam papers to help you prepare</p>
            </div>
            <FileList files={pyqs} contentType="pyqs" isLoggedIn={isLoggedIn} />
          </div>
        );
      case 'videos':
        return (
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-black font-display text-black uppercase tracking-wider">Video Lectures</h3>
              <p className="text-black font-bold text-sm">Recorded lectures and concept explainers</p>
            </div>
            <VideoList videos={videos} isLoggedIn={isLoggedIn} />
          </div>
        );
      case 'flashcards':
        return (
          <div>
            <div className="mb-4">
              <h3 className="text-xl font-black font-display text-black uppercase tracking-wider">Flashcards</h3>
              <p className="text-black font-bold text-sm">Quick revision with interactive flashcards</p>
            </div>
            <FlashcardList />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b-4 border-black pb-0 px-2 pt-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-wider whitespace-nowrap transition-colors border-2 border-black border-b-0 rounded-t-lg -mb-[4px] z-10 ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black hover:bg-sand'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
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
