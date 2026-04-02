import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, BookOpen, ClipboardList, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Subject } from '@/types';

interface SubjectHeaderProps {
  subject: Subject;
}

export function SubjectHeader({ subject }: SubjectHeaderProps) {
  const stats = [
    { label: 'Units', value: subject.notesCount, icon: FileText },
    { label: 'PDF Notes', value: subject.pdfsCount, icon: BookOpen },
    { label: 'Video Lectures', value: subject.videosCount, icon: Play },
    { label: 'Study Time', value: '~40 hrs', icon: ClipboardList },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link 
          to="/" 
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          Home
        </Link>
        <span className="text-muted-foreground/50">/</span>
        <Link 
          to="/2025-26/sem1" 
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          2025–26
        </Link>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-muted-foreground/50">Semester 1</span>
        <span className="text-muted-foreground/50">/</span>
        <span className="text-primary font-medium">{subject.name}</span>
      </div>

      {/* Back Button */}
      <Link 
        to="/2025-26/sem1"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to Subjects</span>
      </Link>

      {/* Main Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-border p-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-4xl flex-shrink-0">
            {subject.icon}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-display text-primary">
                {subject.name}
              </h1>
              <Badge className="bg-sage-light text-sage border-0">
                Free
              </Badge>
            </div>
            
            <p className="text-lg text-muted-foreground mb-1">
              {subject.fullName}
            </p>
            
            <p className="text-sm text-muted-foreground/70">
              Semester 1 · Academic Year 2025–26 · B.E. First Year
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="bg-secondary text-muted-foreground border border-border">
                <FileText className="w-3 h-3 mr-1" />
                Notes
              </Badge>
              <Badge variant="secondary" className="bg-secondary text-muted-foreground border border-border">
                <BookOpen className="w-3 h-3 mr-1" />
                PDFs
              </Badge>
              <Badge variant="secondary" className="bg-secondary text-muted-foreground border border-border">
                <ClipboardList className="w-3 h-3 mr-1" />
                PYQ
              </Badge>
              <Badge variant="secondary" className="bg-secondary text-muted-foreground border border-border">
                <Play className="w-3 h-3 mr-1" />
                Videos
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-sage" />
                  <span className="text-2xl font-bold font-display text-primary">{stat.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
