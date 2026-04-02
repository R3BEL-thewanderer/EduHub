import { MainLayout } from '@/components/layout/MainLayout';
import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeBar } from '@/components/home/MarqueeBar';
import { YearSelector } from '@/components/home/YearSelector';
import { SubjectGrid } from '@/components/home/SubjectGrid';
import { AIPromoSection } from '@/components/home/AIPromoSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FAQSection } from '@/components/home/FAQSection';
import { InlineAd, DesktopInlineAd } from '@/components/layout/AdSidebar';

export function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <MarqueeBar />
      
      {/* Mobile Ad */}
      <InlineAd size="320x50" className="my-6" />
      
      <YearSelector />
      
      {/* Tablet Ad */}
      <DesktopInlineAd size="728x90" className="my-8" />
      
      <SubjectGrid />
      
      {/* Mobile Ad */}
      <InlineAd size="320x100" className="my-6" />
      
      <AIPromoSection />
      <HowItWorks />
      
      <FAQSection />

      {/* Desktop Ad above footer */}
      <DesktopInlineAd size="728x90" className="my-8" />
    </MainLayout>
  );
}
