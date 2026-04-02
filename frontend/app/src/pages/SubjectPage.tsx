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
  const { isAuthenticated, user } = useAuthStore();

  // Mock data as fallback
  const fallbackSubjectData = subject ? getSubjectById(subject) : null;
  const mockNotes = subject ? getFilesBySubject(subject, 'notes') : [];
  const mockPdfs = subject ? getFilesBySubject(subject, 'pdfs') : [];
  const mockPyqs = subject ? getFilesBySubject(subject, 'pyqs') : [];
  const mockVideos = subject ? getVideosBySubject(subject) : [];

  // Live Supabase data
  const [liveNotes, setLiveNotes] = useState<FileItem[]>([]);
  const [livePdfs, setLivePdfs] = useState<FileItem[]>([]);
  const [livePyqs, setLivePyqs] = useState<FileItem[]>([]);
  const [liveVideos, setLiveVideos] = useState<VideoItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);

  // Email Restriction as requested: Admin email only for now
  const isAllowedUser = user?.email === 'ashishhsingh4444@gmail.com';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [subject]);

  // Fetch real data from Supabase
  useEffect(() => {
    if (!subject) return;
    
    // Only fetch if they are the allowed user (optimization, though backend fetch is safe)
    if (!isAllowedUser && isAuthenticated) {
      // If they are logged in but not ashish, they see nothing
      setIsLoadingFiles(false);
      return;
    }

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
  }, [subject, year, semester, fallbackSubjectData?.semester, isAllowedUser, isAuthenticated]);

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

  // Merge: use live data if available, else fall back to mock (but only if Admin!)
  // If `isAuthenticated` is FALSE, we DO want to show the mock files so that users see a lock.
  // Wait, the requested instruction: "this files should be visible to one emeail id only adn if any other email id is logged in then it should not be visible to them"
  const canSeeFiles = !isAuthenticated || isAllowedUser;

  const notes = canSeeFiles ? (liveNotes.length > 0 || livePdfs.length > 0 || livePyqs.length > 0 ? liveNotes : mockNotes) : [];
  const pdfs = canSeeFiles ? (liveNotes.length > 0 || livePdfs.length > 0 || livePyqs.length > 0 ? livePdfs : mockPdfs) : [];
  const pyqs = canSeeFiles ? (liveNotes.length > 0 || livePdfs.length > 0 || livePyqs.length > 0 ? livePyqs : mockPyqs) : [];
  const videos = canSeeFiles ? (liveNotes.length > 0 || livePdfs.length > 0 || livePyqs.length > 0 ? liveVideos : mockVideos) : [];

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
          <AIPaywall subjectName={computedSubjectData.name} />
          
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
        
        {/* Alert for unauthorized logged-in users */}
        {isAuthenticated && !isAllowedUser && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800 text-sm font-medium">
            🔒 Content is currently restricted to authorized administrators only.
          </div>
        )}

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
