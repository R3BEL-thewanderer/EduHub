import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, Lock, FileText, BookOpen, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Subject } from '@/types';

interface SubjectCardProps {
  subject: Subject;
}

const getSubjectColor = (id: string) => {
  if (id.includes('chem')) return { cardBase: 'bg-sage-light/30', accent: 'bg-sage-light text-sage', border: 'group-hover:border-sage', btn: 'bg-sage text-white hover:bg-sage/90' };
  if (id.includes('phy')) return { cardBase: 'bg-sky-light/30', accent: 'bg-sky-light text-sky', border: 'group-hover:border-sky', btn: 'bg-sky text-white hover:bg-sky/90' };
  if (id.includes('math')) return { cardBase: 'bg-sand-light/30', accent: 'bg-sand-light text-sand', border: 'group-hover:border-sand', btn: 'bg-sand text-secondary-foreground hover:bg-sand/90' };
  if (id.includes('pps')) return { cardBase: 'bg-rose-light/30', accent: 'bg-rose-light text-rose', border: 'group-hover:border-rose', btn: 'bg-rose text-white hover:bg-rose/90' };
  if (id.includes('bee')) return { cardBase: 'bg-lavender-light/30', accent: 'bg-lavender-light text-lavender', border: 'group-hover:border-lavender', btn: 'bg-lavender text-white hover:bg-lavender/90' };
  return { cardBase: 'bg-secondary', accent: 'bg-primary/5 text-primary', border: 'group-hover:border-primary', btn: 'bg-primary text-white hover:bg-primary/90' };
};

export function SubjectCard({ subject }: SubjectCardProps) {
  const colors = getSubjectColor(subject.id);

  if (subject.isLocked) {
    return (
      <div className="bg-white rounded-2xl border border-border p-6 opacity-60 cursor-not-allowed h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">{subject.icon}</span>
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-bold font-display tracking-tight text-muted-foreground mb-2">
          {subject.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-auto">
          {subject.description}
        </p>
        
        <Badge variant="secondary" className="bg-secondary text-muted-foreground mt-4 w-fit">
          Coming Soon
        </Badge>
      </div>
    );
  }

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.02}
      transitionSpeed={2500}
      className={`h-full`}
    >
      <div className={`h-full ${colors.cardBase} rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-out group ${colors.border} flex flex-col`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${colors.accent}`}>
            {subject.icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold font-display tracking-tight text-primary mb-2">
          {subject.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 flex-grow">
          {subject.description}
        </p>
        
        {/* Mini Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center text-[11px] font-medium bg-white text-muted-foreground px-2 py-1 rounded-md border border-border">
            <FileText className="w-3 h-3 mr-1" /> Notes
          </span>
          <span className="inline-flex items-center text-[11px] font-medium bg-white text-muted-foreground px-2 py-1 rounded-md border border-border">
            <BookOpen className="w-3 h-3 mr-1" /> PDFs
          </span>
          <span className="inline-flex items-center text-[11px] font-medium bg-white text-muted-foreground px-2 py-1 rounded-md border border-border">
            <ClipboardList className="w-3 h-3 mr-1" /> PYQ
          </span>
        </div>
        
        <Link to={`/2025-26/sem1/${subject.id}`} className="mt-auto block">
          <Button className={`w-full font-semibold shadow-none ${colors.btn}`}>
            Open Subject
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </Tilt>
  );
}
