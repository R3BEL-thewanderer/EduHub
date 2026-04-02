import { motion } from 'framer-motion';
import { Search, User, BookOpen, Bot } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse',
    description: 'Pick your year, semester and subject',
    color: 'text-sage',
    bgColor: 'bg-sage-light',
  },
  {
    icon: User,
    title: 'Login Free',
    description: 'Create a free account with your email',
    color: 'text-sand',
    bgColor: 'bg-sand-light',
  },
  {
    icon: BookOpen,
    title: 'Study',
    description: 'Access notes, PDFs, PYQs and videos',
    color: 'text-sky',
    bgColor: 'bg-sky-light',
  },
  {
    icon: Bot,
    title: 'Ask AI',
    description: 'Unlock Gemini AI for ₹49/month',
    color: 'text-lavender',
    bgColor: 'bg-lavender-light',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 section reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label inline-block mb-2 text-muted-foreground font-semibold text-sm tracking-wider uppercase">Getting Started</span>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-primary mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get started with EduHub in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center text-sm font-bold text-white z-10 shadow-sm">
                  {index + 1}
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-border -translate-y-1/2 z-0" />
                )}
                
                <div className="bg-white rounded-2xl border border-border p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold font-display text-primary mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
