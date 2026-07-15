import { AIChatWidget } from './AIChatWidget';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Lock, Zap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';

interface AIPaywallProps {
  subjectName: string;
  subjectId?: string;
}

export function AIPaywall({ subjectName, subjectId }: AIPaywallProps) {
  const { user, updateSubscription } = useAuthStore();
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = async () => {
    setIsSubscribing(true);
    
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update subscription
    // TODO: Replace with real Razorpay payment flow
    const newSubscription = {
      isPaid: true,
      plan: 'monthly' as const,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
    updateSubscription(newSubscription);
    
    setIsSubscribing(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const features = [
    `Ask questions from ${subjectName} notes`,
    'Instant answers — no waiting',
    'Works for all subjects',
    'Available 24/7',
  ];

  // If the user is paid and no success animation is running, show the chat widget directly!
  if (user?.subscription.isPaid && !showSuccess) {
    return <AIChatWidget subjectName={subjectName} subjectId={subjectId} />;
  }

  return (
    <div className="bg-sand rounded-xl border-4 border-black overflow-hidden shadow-neo-lg text-black">
      {/* Header */}
      <div className="bg-black px-4 py-3 border-b-4 border-black">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-white" />
          <span className="font-black text-white uppercase tracking-wider">AI Study Assistant</span>
          <Badge className="bg-white text-black hover:bg-white/90 text-xs font-black uppercase border-2 border-black ml-auto shadow-[2px_2px_0px_rgba(255,255,255,0.5)]">
            PREMIUM
          </Badge>
        </div>
      </div>

      <div className="p-5">
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="w-16 h-16 rounded border-4 border-black bg-white flex items-center justify-center mx-auto mb-3 shadow-neo-sm">
              <Check className="w-8 h-8 text-black font-black" />
            </div>
            <h4 className="text-black font-black text-2xl uppercase tracking-wider mb-1">SUBSCRIBED!</h4>
            <p className="text-black font-bold uppercase text-sm tracking-widest">AI ASSISTANT UNLOCKED</p>
          </motion.div>
        ) : (
          <>
            {/* Locked State */}
            <div className="relative mb-5">
              {/* Blurred Preview */}
              <div className="opacity-40 blur-[3px] pointer-events-none mb-4">
                <div className="bg-white rounded-md p-3 mb-2 border-4 border-black">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded border-2 border-black bg-sage flex-shrink-0" />
                    <div className="space-y-2 flex-1 mt-1">
                      <div className="h-3 bg-black rounded w-3/4" />
                      <div className="h-3 bg-black rounded w-1/2" />
                    </div>
                  </div>
                </div>
                <div className="bg-rose rounded-md p-3 border-4 border-black">
                  <div className="flex gap-3 justify-end flex-row-reverse">
                    <div className="w-8 h-8 rounded border-2 border-black bg-sky flex-shrink-0" />
                    <div className="space-y-2 flex-1 mt-1 text-right">
                      <div className="h-3 bg-black rounded w-full ml-auto" />
                      <div className="h-3 bg-black rounded w-2/3 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lock Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded border-4 border-black bg-black flex items-center justify-center shadow-[4px_4px_0px_white]">
                  <Lock className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2.5 mb-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-black font-black uppercase tracking-wider">
                  <div className="bg-white border-2 border-black rounded w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-black font-black" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing — curiosity-driven, price hidden */}
            <div className="mb-5 p-4 rounded-md bg-white border-4 border-black shadow-neo-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-black uppercase tracking-wider font-black">PLANS FROM</span>
                <Badge className="bg-sage text-black border-2 border-black text-[10px] font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] uppercase">LIMITED OFFER</Badge>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-black text-2xl font-black">₹</span>
                  <span className="text-5xl font-black font-display text-black tracking-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">X9</span>
                </div>
                <div className="flex flex-col pb-1">
                  <span className="text-black/50 text-sm font-black line-through">₹99</span>
                  <span className="text-black text-xs font-black uppercase">Reveal on unlock →</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-1 bg-black rounded" />
                <span className="text-[10px] text-black font-black uppercase tracking-widest">PER MONTH & SEMESTER PLANS</span>
                <div className="flex-1 h-1 bg-black rounded" />
              </div>
            </div>

            {/* CTA */}
            <Button 
              className="w-full bg-black text-white hover:bg-white hover:text-black border-4 border-black font-black h-14 text-base transition-all uppercase shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
              onClick={handleSubscribe}
              disabled={isSubscribing}
            >
              {isSubscribing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  UNLOCK AI ASSISTANT
                </>
              )}
            </Button>

            <p className="text-center text-xs text-black mt-4 font-bold uppercase tracking-wider">
              Cancel anytime. Secure payment via UPI/Card.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
