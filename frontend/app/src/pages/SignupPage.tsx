import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuthStore } from '@/store/authStore';

export function SignupPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return null;

  return (
    <MainLayout showSideAds={false}>
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <AuthForm mode="signup" />
      </div>
    </MainLayout>
  );
}
