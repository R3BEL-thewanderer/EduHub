import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Youtube,
  HardDrive,
  Eye,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { VideoItem } from '@/types';

interface VideoListProps {
  videos: VideoItem[];
  isLoggedIn: boolean;
}

export function VideoList({ videos, isLoggedIn }: VideoListProps) {
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);

  const getVideoIcon = (videoType: string) => {
    if (videoType === 'youtube') {
      return <Youtube className="w-5 h-5 text-red-500" />;
    }
    return <HardDrive className="w-5 h-5 text-sage" />;
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎬</span>
        </div>
        <p className="text-muted-foreground">Video lectures coming soon for this subject!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Video List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-border overflow-hidden hover:border-primary/20 hover:shadow-sm transition-all"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-secondary">
              {video.thumbnailUrl ? (
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <Play className="w-12 h-12 text-muted-foreground/40" />
                </div>
              )}
              
              {/* Duration Badge */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-primary/90 rounded text-xs text-white font-medium">
                {video.duration}
              </div>

              {/* Play Overlay */}
              {isLoggedIn && (
                <div 
                  className="absolute inset-0 bg-primary/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => setPlayingVideo(video)}
                >
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  {getVideoIcon(video.videoType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-primary font-medium text-sm line-clamp-2">
                    {video.title}
                  </h4>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs border-0 ${
                        video.videoType === 'youtube' 
                          ? 'bg-red-50 text-red-500' 
                          : 'bg-sage-light text-sage'
                      }`}
                    >
                      {video.videoType === 'youtube' ? 'YouTube' : 'Hosted'}
                    </Badge>
                    
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="w-3.5 h-3.5" />
                      {video.views} views
                    </span>
                  </div>
                </div>
              </div>

              {/* Watch Button */}
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPlayingVideo(video)}
                  className="w-full mt-3 border-border text-muted-foreground hover:text-primary hover:bg-secondary"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </Button>
              ) : (
                <Badge 
                  variant="secondary" 
                  className="w-full mt-3 justify-center bg-secondary text-muted-foreground py-1.5 border border-border"
                >
                  <span className="mr-1">🔒</span> Login to watch
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inline Video Player */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-secondary/50 border-b border-border">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-primary text-sm font-semibold">Watching:</span>
                <span className="text-primary text-sm truncate">{playingVideo.title}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPlayingVideo(null)}
                className="text-muted-foreground hover:text-destructive hover:bg-red-50"
              >
                <X className="w-4 h-4 mr-1" />
                Close
              </Button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              {playingVideo.videoType === 'youtube' ? (
                <iframe
                  src={playingVideo.youtubeUrl?.replace('watch?v=', 'embed/')}
                  title={playingVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={playingVideo.storagePath}
                  controls
                  className="w-full h-full"
                  poster={playingVideo.thumbnailUrl}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
