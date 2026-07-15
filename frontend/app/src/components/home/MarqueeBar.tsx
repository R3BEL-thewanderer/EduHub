import { useState, useEffect } from 'react';
import { fetchPlatformStats } from '@/lib/supabaseData';

export function MarqueeBar() {
  const [dbStats, setDbStats] = useState({ totalFiles: 0, totalVideos: 0 });

  useEffect(() => {
    fetchPlatformStats().then(setDbStats);
  }, []);

  const stats = [
    { label: "Educational Excellence", highlight: true },
    { label: "Study Smart" },
    { label: `${dbStats.totalFiles} Files Uploaded` },
    { label: `${dbStats.totalVideos} Video Lectures` },
    { label: "Real Time Sync" },
    { label: "Updated Regularly" }
  ];

  // Duplicate the items intentionally to allow css marquee infinite loop without jumping
  const marqueeItems = [...stats, ...stats, ...stats, ...stats];

  return (
    <div className="w-full py-8 border-y border-border overflow-hidden bg-[var(--color-bg-warm)]">
      <div className="flex animate-marquee min-w-max">
        <div className="flex items-center gap-12 pr-12">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className={`font-display font-bold text-lg whitespace-nowrap ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              <div className="w-2 h-2 rounded-full bg-sage opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
