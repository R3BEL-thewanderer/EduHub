import { motion } from 'framer-motion';
import { Lock, Calendar } from 'lucide-react';

interface Year {
  label: string;
  subtitle: string;
  active: boolean;
  locked: boolean;
}

const years: Year[] = [
  { label: '2025 – 26', subtitle: 'First Year B.E.', active: true, locked: false },
  { label: '2026 – 27', subtitle: 'Coming Next Year', active: false, locked: true },
  { label: '2027 – 28', subtitle: 'Coming Later', active: false, locked: true },
];

export function YearSelector() {
  return (
    <section className="py-10 section reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold font-display text-primary mb-4">
          Select Academic Year
        </h2>
        
        <div className="flex flex-wrap gap-4">
          {years.map((year, index) => (
            <motion.div
              key={year.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative flex items-center gap-4 px-5 py-4 rounded-xl border transition-all
                ${year.active 
                  ? 'bg-white border-sage shadow-md' 
                  : 'bg-secondary border-border opacity-60'
                }
                ${year.locked ? 'cursor-not-allowed' : 'cursor-pointer hover:border-primary/30'}
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${year.active ? 'bg-sage-light' : 'bg-secondary'}
              `}>
                <Calendar className={`w-5 h-5 ${year.active ? 'text-sage' : 'text-muted-foreground'}`} />
              </div>
              
              <div>
                <h3 className={`font-semibold font-display ${year.active ? 'text-primary' : 'text-muted-foreground'}`}>
                  {year.label}
                </h3>
                <p className="text-sm text-muted-foreground">{year.subtitle}</p>
              </div>
              
              {year.locked && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-xl backdrop-blur-[1px]">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
              
              {year.active && (
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-sage text-white text-xs font-bold rounded-full">
                  ACTIVE
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
