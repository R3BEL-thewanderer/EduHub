import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Answers from your subject notes — not random internet results',
  'Available for every subject — Chemistry, Physics, Maths and more',
  '₹49/month — less than a cup of chai ☕',
];

export function AIPromoSection() {
  return (
    <section className="py-16 section reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a1a2e] rounded-3xl border border-[#303045] overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Content */}
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sand/20 border border-sand/30 mb-6">
                <Sparkles className="w-4 h-4 text-sand" />
                <span className="text-sm text-sand font-semibold">NEW FEATURE</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold font-display text-white mb-4">
                Meet Your{' '}
                <span className="bg-gradient-to-r from-sand to-rose bg-clip-text text-transparent">AI Study Assistant</span>
              </h2>
              
              <p className="text-[#a0a0b5] text-lg mb-6">
                Ask questions. Get answers from your own EduHub notes.
                Powered by Google Gemini.
              </p>
              
              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-sage" />
                    </div>
                    <span className="text-[#a0a0b5]">{feature}</span>
                  </motion.div>
                ))}
              </div>
              
              <Link to="/2025-26/sem1/chemistry">
                <Button size="lg" className="bg-white text-[#1a1a2e] hover:bg-slate-100 font-bold">
                  Try AI Assistant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            
            {/* Right Visual */}
            <div className="relative bg-gradient-to-br from-[#242438] to-[#1a1a2e] p-8 lg:p-12 flex items-center justify-center">
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-sand/10 rounded-full blur-2xl" />
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-sage/10 rounded-full blur-2xl" />
              
              {/* Chat Preview */}
              <div className="relative w-full max-w-sm space-y-3">
                {/* Bot Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#303045] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-white text-sm">
                      Hi! I'm your AI Study Assistant. Ask me anything from your Chemistry notes! 🧪
                    </p>
                  </div>
                </motion.div>
                
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex gap-3 justify-end"
                >
                  <div className="bg-sand rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                    <p className="text-[#1a1a2e] text-sm font-medium">
                      Explain hybridisation in detail
                    </p>
                  </div>
                </motion.div>
                
                {/* Bot Response */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-[#303045] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-white text-sm">
                      According to your Unit 3 notes, hybridisation is the mixing of atomic orbitals to form new hybrid orbitals...
                    </p>
                  </div>
                </motion.div>
                
                {/* Input Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 bg-[#303045] rounded-full px-4 py-2 mt-4"
                >
                  <div className="flex-1 text-[#8a8a9f] text-sm">
                    Ask a question...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
