import { useState } from 'react';
import { motion } from 'framer-motion';
import { SubjectCard } from './SubjectCard';
import { sem1Subjects, sem2Subjects } from '@/data/mockData';

type Semester = 'sem1' | 'sem2';

export function SubjectGrid() {
  const [activeSemester, setActiveSemester] = useState<Semester>('sem1');
  
  const subjects = activeSemester === 'sem1' ? sem1Subjects : sem2Subjects;

  return (
    <section id="subjects" className="py-12 section reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <span className="section-label inline-block mb-2 text-muted-foreground font-semibold text-sm tracking-wider uppercase">Course Catalog</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-primary">Explore Subjects</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Select a subject below to view structured notes, previous year questions, and curated PDF resources.
            </p>
          </div>
          
          {/* Semester Tabs */}
          <div className="flex bg-secondary p-1 rounded-xl shadow-sm border border-border">
            <button
              onClick={() => setActiveSemester('sem1')}
              className={`
                px-5 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${activeSemester === 'sem1' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-primary'
                }
              `}
            >
              Semester 1
            </button>
            <button
              onClick={() => setActiveSemester('sem2')}
              className={`
                px-5 py-2.5 rounded-lg text-sm font-semibold transition-all
                ${activeSemester === 'sem2' 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-primary'
                }
              `}
            >
              Semester 2
            </button>
          </div>
        </div>

        {/* Subjects Grid - Bento Grid Layout */}
        <motion.div 
          key={activeSemester}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[1fr]"
        >
          {subjects.map((subject, index) => {
            // Determine which cards should span 2 columns on desktop
            // For 5 items in 4-col grid: row1=[span2, span1, span1], row2=[span2, span2]
            const isWide = index === 0 || index === 3 || index === 4;
            return (
              <div 
                key={subject.id} 
                className={`reveal reveal-delay-${(index % 4) + 1} ${
                  isWide ? 'md:col-span-2 lg:col-span-2 xl:col-span-2' : ''
                }`}
              >
                <SubjectCard subject={subject} />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
