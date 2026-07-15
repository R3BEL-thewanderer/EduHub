import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Bot, Coffee, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  <span key="1">Answers from your subject notes — not random internet results</span>,
  <span key="2">Available for every subject — Chemistry, Physics, Maths and more</span>,
  <span key="3" className="flex items-center group">₹X9/month — less than a cup of chai <Coffee className="w-4 h-4 ml-1 group-hover:animate-bounce" /></span>,
];

export function AIPromoSection() {
  return (
    <section className="py-16 section reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-xl border-4 border-black overflow-hidden shadow-neo-lg">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Content */}
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-sand border-2 border-black mb-6 transform -rotate-2">
                <Sparkles className="w-4 h-4 text-black" />
                <span className="text-sm text-black font-black tracking-widest uppercase">NEW FEATURE</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black font-display text-white mb-4 uppercase leading-tight">
                Meet Your{' '}
                <span className="bg-rose text-black px-2 skew-x-[-10deg] inline-block mt-2">AI Study Assistant</span>
              </h2>

              <p className="text-white/80 font-bold text-lg mb-6">
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
                    <div className="w-6 h-6 rounded bg-sage border-2 border-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-black font-black" />
                    </div>
                    <span className="text-white font-bold">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/2025-26/sem1/chemistry">
                <Button size="lg" className="bg-white text-black border-2 border-black font-black hover:bg-sand hover:-translate-y-1 shadow-[4px_4px_0px_white] hover:shadow-[6px_6px_0px_white]">
                  TRY AI ASSISTANT
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Right Visual */}
            <div className="relative bg-black border-l-4 border-white p-8 lg:p-12 flex items-center justify-center">
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-24 h-24 bg-sage border-4 border-white rounded-full animate-pulse" />
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-sky border-4 border-white rotate-12" />

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
                  <div className="w-10 h-10 rounded border-2 border-black bg-sage flex items-center justify-center flex-shrink-0 shadow-neo-sm">
                    <Bot className="w-6 h-6 text-black" />
                  </div>
                  <div className="bg-white border-2 border-black rounded-xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-neo-sm">
                    <p className="text-black font-bold text-sm">
                      Hi! I'm your AI Study Assistant. Ask me anything from your Chemistry notes! <FlaskConical className="inline w-4 h-4 ml-1 align-text-bottom" />
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
                  <div className="bg-sand border-2 border-black rounded-xl rounded-tr-none px-4 py-3 max-w-[80%] shadow-neo-sm">
                    <p className="text-black text-sm font-black">
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
                  <div className="w-10 h-10 rounded border-2 border-black bg-sage flex items-center justify-center flex-shrink-0 shadow-neo-sm">
                    <Bot className="w-6 h-6 text-black" />
                  </div>
                  <div className="bg-white border-2 border-black rounded-xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-neo-sm">
                    <p className="text-black font-bold text-sm">
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
                  className="flex items-center gap-2 bg-white border-2 border-black rounded-full px-4 py-2 mt-4 shadow-neo-sm"
                >
                  <div className="flex-1 text-black font-bold text-sm">
                    Ask a question...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center border-2 border-black">
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
