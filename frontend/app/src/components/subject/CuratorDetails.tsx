import { Award, BookOpen, Calendar, Mail, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CuratorDetailsProps {
  subjectName: string;
}

export function CuratorDetails({ subjectName }: CuratorDetailsProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
        Curated By
      </h3>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center text-white font-bold text-lg font-display">
          TC
        </div>
        <div>
          <h4 className="text-primary font-semibold">EduHub Team</h4>
          <p className="text-muted-foreground text-sm">Verified Curator</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <GraduationCap className="w-4 h-4 text-sage" />
          <span>Thakur College of Engineering</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4 text-sage" />
          <span>{subjectName} Department</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-sage" />
          <span>Curating since 2024</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="bg-sage-light text-sage text-xs border-0">
          <Award className="w-3 h-3 mr-1" />
          Verified
        </Badge>
        <Badge variant="secondary" className="bg-secondary text-muted-foreground text-xs border border-border">
          500+ Resources
        </Badge>
        <Badge variant="secondary" className="bg-secondary text-muted-foreground text-xs border border-border">
          Top Rated
        </Badge>
      </div>

      <a 
        href="mailto:hello@edu-hub.co.in"
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 border border-border transition-colors text-sm font-medium"
      >
        <Mail className="w-4 h-4" />
        Contact Curator
      </a>
    </div>
  );
}
