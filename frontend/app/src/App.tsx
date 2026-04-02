import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { SemesterPage } from '@/pages/SemesterPage';
import { SubjectPage } from '@/pages/SubjectPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { TermsPage } from '@/pages/TermsPage';
import { RefundPolicy } from '@/pages/RefundPolicy';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { AuthCallback } from '@/components/auth/AuthCallback';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { useAuthStore } from '@/store/authStore';

function App() {
  const { initialize } = useAuthStore();

  // Initialize Supabase auth listener on app load
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        
        {/* Semester Routes */}
        <Route path="/:year/:semester" element={<SemesterPage />} />
        
        {/* Subject Routes */}
        <Route path="/:year/:semester/:subject" element={<SubjectPage />} />
        
        {/* Auth Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        
        {/* Info Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* 404 - Redirect to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
