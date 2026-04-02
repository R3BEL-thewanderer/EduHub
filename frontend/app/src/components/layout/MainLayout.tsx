import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AdSidebar } from './AdSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  showSideAds?: boolean;
}

export function MainLayout({ children, showSideAds = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 flex justify-center">
        <div className="flex w-full max-w-7xl">
          {/* Left Ad Sidebar */}
          {showSideAds && (
            <div className="flex-shrink-0">
              <AdSidebar position="left" size="160x600" />
            </div>
          )}
          
          {/* Main Content */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          
          {/* Right Ad Sidebar */}
          {showSideAds && (
            <div className="flex-shrink-0">
              <AdSidebar position="right" size="160x600" />
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// Subject Page Layout with right sticky column
interface SubjectLayoutProps {
  children: React.ReactNode;
  rightColumn?: React.ReactNode;
}

export function SubjectLayout({ children, rightColumn }: SubjectLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 flex justify-center">
        <div className="flex w-full max-w-7xl">
          {/* Left Ad Sidebar */}
          <div className="flex-shrink-0">
            <AdSidebar position="left" size="160x600" />
          </div>
          
          {/* Main Content */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Content Area */}
              <div className="flex-1 min-w-0">
                {children}
              </div>
              
              {/* Right Sticky Column */}
              {rightColumn && (
                <div className="w-full lg:w-80 flex-shrink-0">
                  <div className="lg:sticky lg:top-24 space-y-6">
                    {rightColumn}
                  </div>
                </div>
              )}
            </div>
          </main>
          
          {/* Right Ad Sidebar - only if no rightColumn */}
          {!rightColumn && (
            <div className="flex-shrink-0">
              <AdSidebar position="right" size="160x600" />
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
