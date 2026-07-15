import { Award, BookOpen, Calendar, Mail, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CuratorDetailsProps {
  subjectName: string;
}

export function CuratorDetails({ subjectName }: CuratorDetailsProps) {
  return (
    <div className="bg-white rounded-md border-4 border-black p-5 shadow-neo-sm hover:shadow-neo transition-shadow">
      <h3 className="text-xs font-black text-black uppercase tracking-wider mb-4 border-b-2 border-black pb-2">
        Curated By
      </h3>
      
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded border-2 border-black bg-sage flex items-center justify-center text-black font-black text-lg font-display shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          TC
        </div>
        <div>
          <h4 className="text-black font-black">EduHub Team</h4>
          <p className="text-black font-bold text-sm uppercase tracking-wider">Verified Curator</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-black font-bold">
          <GraduationCap className="w-4 h-4" />
          <span>Thakur College of Engineering</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-black font-bold">
          <BookOpen className="w-4 h-4" />
          <span>{subjectName} Department</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-black font-bold">
          <Calendar className="w-4 h-4" />
          <span>Curating since 2024</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="bg-sand text-black font-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
          <Award className="w-3 h-3 mr-1" />
          Verified
        </Badge>
        <Badge variant="secondary" className="bg-white text-black font-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
          500+ Resources
        </Badge>
        <Badge variant="secondary" className="bg-white text-black font-black border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">
          Top Rated
        </Badge>
      </div>

      <a 
        href="mailto:hello@edu-hub.co.in"
        className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded border-2 border-black bg-white text-black font-black uppercase hover:bg-sand hover:-translate-y-0.5 shadow-neo-sm hover:shadow-neo transition-all text-sm"
      >
        <Mail className="w-4 h-4" />
        Contact Curator
      </a>
    </div>
  );
}
