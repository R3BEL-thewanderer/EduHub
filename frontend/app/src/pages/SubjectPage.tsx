import { useParams } from 'react-router-dom';
import { SubjectLayout } from '@/components/layout/MainLayout';
import { SubjectHeader } from '@/components/subject/SubjectHeader';
import { ContentTabs } from '@/components/subject/ContentTabs';
import { AIPaywall } from '@/components/ai/AIPaywall';
import { CuratorDetails } from '@/components/subject/CuratorDetails';
import { InlineAd } from '@/components/layout/AdSidebar';
import { useAuthStore } from '@/store/authStore';
import { 
  getSubjectById, 
  getFilesBySubject, 
  getVideosBySubject 
} from '@/data/mockData';
import { fetchSubjectFiles } from '@/lib/supabaseData';
import { useEffect, useState } from 'react';
import type { FileItem, VideoItem } from '@/types';

export function SubjectPage() {
  const { year, semester, subject } = useParams<{ year: string; semester: string; subject: string }>();
  const { isAuthenticated } = useAuthStore();

  // Mock data as fallback for subject details only
  const fallbackSubjectData = subject ? getSubjectById(subject) : null;

  // Live Supabase data
  const [liveNotes, setLiveNotes] = useState<FileItem[]>([]);
  const [livePdfs, setLivePdfs] = useState<FileItem[]>([]);
  const [livePyqs, setLivePyqs] = useState<FileItem[]>([]);
  const [liveVideos, setLiveVideos] = useState<VideoItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subject]);

  // Fetch real data from Supabase for all authenticated users
  useEffect(() => {
    if (!subject) return;

    const loadFiles = async () => {
      setIsLoadingFiles(true);
      const sem = semester || (fallbackSubjectData?.semester) || 'sem1';
      const yr = year || '2025-26';
      
      const data = await fetchSubjectFiles(subject, yr, sem);
      setLiveNotes(data.notes);
      setLivePdfs(data.pdfs);
      setLivePyqs(data.pyqs);
      setLiveVideos(data.videos);
      setIsLoadingFiles(false);
    };
    
    loadFiles();
  }, [subject, year, semester, fallbackSubjectData?.semester]);

  if (!fallbackSubjectData) {
    return (
      <SubjectLayout>
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔍</span>
          </div>
          <h1 className="text-2xl font-bold font-display text-primary mb-2">Subject Not Found</h1>
          <p className="text-muted-foreground">The subject you're looking for doesn't exist.</p>
        </div>
      </SubjectLayout>
    );
  }

  // Use live data only
  const notes = liveNotes;
  const pdfs = livePdfs;
  const pyqs = livePyqs;
  const videos = liveVideos;

  // Dynamically compute the subject data counts so they match the files present!
  const computedSubjectData = {
    ...fallbackSubjectData,
    notesCount: notes.length,
    pdfsCount: pdfs.length,
    pyqsCount: pyqs.length,
    videosCount: videos.length,
  };

  return (
    <SubjectLayout
      rightColumn={
        <>
          <AIPaywall subjectName={computedSubjectData.name} subjectId={subject} />
          
          {/* Mobile-only ad between AI Paywall and Curator */}
          <div className="lg:hidden">
            <InlineAd size="320x100" />
          </div>
          
          <CuratorDetails subjectName={computedSubjectData.name} />
          
          {/* Mobile-only ad after Curator section */}
          <div className="lg:hidden">
            <InlineAd size="320x250" />
          </div>
        </>
      }
    >
      <div className="space-y-8">
        <SubjectHeader subject={computedSubjectData} />
        
        {/* Mobile Ad between header and tabs */}
        <InlineAd size="320x100" className="lg:hidden" />
        
        <ContentTabs 
          notes={notes}
          pdfs={pdfs}
          pyqs={pyqs}
          videos={videos}
          isLoggedIn={isAuthenticated}
          isLoading={isLoadingFiles}
        />
        
        {/* Mobile-only ad after content tabs, before footer */}
        <InlineAd size="320x50" className="lg:hidden" />
      </div>
    </SubjectLayout>
  );
}
