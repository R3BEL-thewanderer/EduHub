import type { AdSize } from '@/types';

interface AdSidebarProps {
  position: 'left' | 'right';
  size?: AdSize;
}

export function AdSidebar({ position, size = '160x600' }: AdSidebarProps) {
  const [width, height] = size.split('x').map(Number);
  
  return (
    <div 
      className={`hidden xl:block sticky top-24 self-start ${
        position === 'left' ? 'mr-4' : 'ml-4'
      }`}
    >
      <div 
        className="ad-placeholder"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
        }}
      >
        <div className="text-center">
          <span className="block text-xs uppercase tracking-wider mb-1">Advertisement</span>
          <span className="text-lg font-bold">{size}</span>
        </div>
      </div>
    </div>
  );
}

// Inline ad for mobile/tablet
interface InlineAdProps {
  size?: AdSize;
  className?: string;
}

export function InlineAd({ size = '320x50', className = '' }: InlineAdProps) {
  const [width, height] = size.split('x').map(Number);
  
  return (
    <div className={`flex justify-center ${className}`}>
      <div 
        className="ad-placeholder xl:hidden"
        style={{ 
          width: '100%', 
          maxWidth: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div className="text-center">
          <span className="text-xs">Ad {size}</span>
        </div>
      </div>
    </div>
  );
}

// Desktop-only inline ad (for between sections)
export function DesktopInlineAd({ size = '728x90', className = '' }: InlineAdProps) {
  const [width, height] = size.split('x').map(Number);
  
  return (
    <div className={`hidden lg:flex justify-center ${className}`}>
      <div 
        className="ad-placeholder"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
        }}
      >
        <div className="text-center">
          <span className="text-xs">Ad {size}</span>
        </div>
      </div>
    </div>
  );
}
