import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, Lock, FileText, BookOpen, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Subject } from '@/types';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  if (subject.isLocked) {
    return (
      <div className="relative bg-white rounded-xl border-4 border-black overflow-hidden opacity-80 cursor-not-allowed h-full shadow-neo-sm">
        {/* Blurred Background Image */}
        {subject.imagePath && (
          <div 
            className="absolute inset-0 z-0 opacity-20 filter grayscale blur-[2px] scale-105"
            style={{ 
              backgroundImage: `url(${subject.imagePath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        
        <div className="relative z-10 flex flex-col h-full p-6">
          <div className="flex items-start justify-end mb-4">
            <div className="w-10 h-10 rounded-full border-2 border-black bg-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h3 className="text-xl font-black font-display tracking-tight text-black mb-2 mt-2">
            {subject.name}
          </h3>
          <p className="text-sm text-black font-bold mb-auto">
            {subject.description}
          </p>
          
          <Badge variant="secondary" className="bg-black text-white mt-8 w-fit text-xs font-black tracking-wider py-1">
            LOCKED
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <Tilt
      tiltMaxAngleX={3}
      tiltMaxAngleY={3}
      scale={1.01}
      transitionSpeed={2500}
      className="h-full group"
    >
      <Link to={`/${subject.year}/${subject.semester}/${subject.id}`} className="relative block h-full bg-white rounded-xl border-4 border-black overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer">
        
        {/* Blurred Background Image */}
        {subject.imagePath && (
          <div 
            className="absolute inset-0 z-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-300 blur-[2px] scale-105"
            style={{ 
              backgroundImage: `url(${subject.imagePath})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        <div className="relative z-10 flex flex-col h-full p-6">
          <div className="flex items-start justify-end mb-4">
            <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all group-hover:bg-black group-hover:text-white group-hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:-rotate-45">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          
          <h3 className="text-xl font-black font-display tracking-tight text-black mb-2 mt-2">
            {subject.name}
          </h3>
          <p className="text-sm font-bold text-black/80 mb-6 flex-grow">
            {subject.description}
          </p>
          
          {/* Mini Badges */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4">
            <span className="inline-flex items-center text-[11px] font-black uppercase tracking-wider bg-white text-black px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-0.5">
              <FileText className="w-3 h-3 mr-1" /> NOTES
            </span>
            <span className="inline-flex items-center text-[11px] font-black uppercase tracking-wider bg-white text-black px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-0.5 delay-75">
              <BookOpen className="w-3 h-3 mr-1" /> PDFS
            </span>
            <span className="inline-flex items-center text-[11px] font-black uppercase tracking-wider bg-white text-black px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-0.5 delay-150">
              <ClipboardList className="w-3 h-3 mr-1" /> PYQ
            </span>
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
