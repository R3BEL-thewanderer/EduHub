import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroCanvas } from './HeroCanvas';

const typewriterWords = [
  'First Year B.E.',
  'Your Exams',
  'Engineering Core',
];

export function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = typewriterWords[currentWordIndex];
    
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < word.length) {
            setCurrentText(word.slice(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentWordIndex((prev) => (prev + 1) % typewriterWords.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Three.js Background Canvas */}
      <HeroCanvas />
      
      {/* Decorative Blur Elements (Matching Light D2C pastel accents) */}
      <div className="absolute top-20 left-10 w-[30rem] h-[30rem] bg-sage-light/50 rounded-full blur-3xl -z-10 pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-sand-light/50 rounded-full blur-3xl -z-10 pointer-events-none mix-blend-multiply" />
      
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content Side */}
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-light border border-sage/20 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-sage shadow-sm" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              EduHub Edition
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display text-primary leading-[1.05] tracking-tight mb-6"
          >
            Study Smarter,
            <br />
            Ace
            <div className="h-[2.5em] md:h-[2.2em] w-full block mt-2 pr-4">
              <span className="relative inline-block text-primary z-10">
                {currentText}
                <span className="animate-pulse font-light text-primary/50 ml-1">|</span>
              </span>
            </div>
          </motion.h1>

          {/* Bold Catchphrase */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl sm:text-2xl font-semibold text-primary/80 mb-4 max-w-xl"
          >
            Notes by students, for students. No faculty. No fluff.
          </motion.p>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
          >
            Data-driven curation of notes, precise PYQs, and high-yield video lectures — everything you need to turn study hours into academic mastery.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-2"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 rounded-full text-base"
              onClick={() => document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Subjects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Link to="/auth/login">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border text-primary hover:bg-secondary h-14 rounded-full px-8 font-medium text-base bg-white/50 backdrop-blur-sm"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs font-medium animate-bounce">
        <span>SCROLL TO EXPLORE</span>
        <div className="w-[1px] h-8 bg-muted-foreground/30" />
      </div>
    </section>
  );
}
