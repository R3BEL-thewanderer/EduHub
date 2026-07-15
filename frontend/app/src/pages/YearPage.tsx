import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InlineAd, DesktopInlineAd } from '@/components/layout/AdSidebar';
import { sem1Subjects, sem2Subjects } from '@/data/mockData';

// Only allow valid academic years for now, or redirect to home
const VALID_YEARS = ['2025-26'];

export function YearPage() {
  const { year } = useParams<{ year: string }>();

  // If year is not valid, redirect to home
  if (!year || !VALID_YEARS.includes(year)) {
    return <Navigate to="/" replace />;
  }

  // Format year for presentation (e.g. 2025-26 -> 2025–26)
  const displayYear = year.replace('-', '–');

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm" id="year-page-breadcrumb">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-primary font-medium">{displayYear}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          id="year-back-btn"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-display text-primary mb-2">
            Academic Year {displayYear}
          </h1>
          <p className="text-muted-foreground">
            Select a semester below to view structured notes, previous year questions, and resources.
          </p>
        </div>

        {/* Mobile Ad */}
        <InlineAd size="320x50" className="my-6" />

        {/* Semesters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">

          {/* Semester 1 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h-full"
          >
            <div className="flex flex-col justify-between h-full bg-white rounded-2xl border border-border p-8 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-sage">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center text-sage text-2xl font-bold">
                    1
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-display text-primary">Semester 1</h2>
                    <p className="text-xs text-muted-foreground">First Year B.E.</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6">
                  Contains foundational subjects covering basic engineering fields, computer programming in C, chemistry, and knowledge systems.
                </p>

                <div className="space-y-3 mb-8">
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Included Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sem1Subjects.map((subject) => (
                      <Badge
                        key={subject.id}
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground border border-border py-1 px-2.5 text-xs font-medium group cursor-pointer"
                      >
                        <span className="mr-1 flex items-center">{typeof subject.icon === 'string' ? subject.icon : <subject.icon className="w-4 h-4 ml-1 mr-1 group-hover:animate-bounce transition-transform" />}</span>
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Link to={`/${year}/sem1`} className="block">
                <Button className="w-full bg-primary hover:bg-primary/95 text-white font-semibold flex items-center justify-center gap-2 py-6 rounded-xl group-hover:bg-sage transition-colors duration-300">
                  <span>Explore Semester 1</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Semester 2 Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <div className="flex flex-col justify-between h-full bg-white rounded-2xl border border-border p-8 shadow-sm hover:shadow-md transition-all duration-300 group hover:border-sky">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-light flex items-center justify-center text-sky text-2xl font-bold">
                    2
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-display text-primary">Semester 2</h2>
                    <p className="text-xs text-muted-foreground">First Year B.E.</p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-6">
                  Contains core subjects covering basic electrical concepts, graphics & drawing, applied physics, and differential equations.
                </p>

                <div className="space-y-3 mb-8">
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Included Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {sem2Subjects.map((subject) => (
                      <Badge
                        key={subject.id}
                        variant="secondary"
                        className="bg-secondary text-secondary-foreground border border-border py-1 px-2.5 text-xs font-medium group cursor-pointer"
                      >
                        <span className="mr-1 flex items-center">{typeof subject.icon === 'string' ? subject.icon : <subject.icon className="w-4 h-4 ml-1 mr-1 group-hover:animate-bounce transition-transform" />}</span>
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Link to={`/${year}/sem2`} className="block">
                <Button className="w-full bg-primary hover:bg-primary/95 text-white font-semibold flex items-center justify-center gap-2 py-6 rounded-xl group-hover:bg-sky transition-colors duration-300">
                  <span>Explore Semester 2</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Desktop Ad */}
        <DesktopInlineAd size="728x90" className="my-8" />
      </div>
    </MainLayout>
  );
}
