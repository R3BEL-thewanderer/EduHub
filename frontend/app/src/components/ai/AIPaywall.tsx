import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Lock, Zap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/store/authStore';

interface AIPaywallProps {
  subjectName: string;
}

export function AIPaywall({ subjectName }: AIPaywallProps) {
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

  return (
    <div className="bg-[#1a1a2e] rounded-2xl border border-[#303045] overflow-hidden shadow-xl text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sand to-rose/80 px-4 py-3 border-b border-[#303045]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-white" />
          <span className="font-semibold text-primary">AI Study Assistant</span>
          <Badge className="bg-white/20 text-primary hover:bg-white/30 text-xs font-bold border-none backdrop-blur-sm">
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
            <div className="w-12 h-12 rounded-full bg-sage-light/20 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-sage" />
            </div>
            <h4 className="text-white font-semibold mb-1">Subscribed!</h4>
            <p className="text-[#a0a0b5] text-sm">AI Assistant unlocked</p>
          </motion.div>
        ) : user?.subscription.isPaid ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-sky-light/20 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-sky" />
            </div>
            <h4 className="text-white font-semibold mb-1">AI Unlocked!</h4>
            <p className="text-[#a0a0b5] text-sm mb-4">
              Ask anything from {subjectName} notes
            </p>
            <Button 
              className="w-full bg-white text-[#1a1a2e] hover:bg-slate-100 font-semibold h-11"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Chatting
            </Button>
          </div>
        ) : (
          <>
            {/* Locked State */}
            <div className="relative mb-5">
              {/* Blurred Preview */}
              <div className="opacity-40 blur-[3px] pointer-events-none mb-4">
                <div className="bg-[#242438] rounded-xl p-3 mb-2 border border-[#303045]">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-sand/20 flex-shrink-0" />
                    <div className="space-y-2 flex-1 mt-1">
                      <div className="h-2 bg-[#4a4a5a] rounded-full w-3/4" />
                      <div className="h-2 bg-[#4a4a5a] rounded-full w-1/2" />
                    </div>
                  </div>
                </div>
                <div className="bg-[#1f1f33] rounded-xl p-3 border border-[#303045]">
                  <div className="flex gap-3 justify-end flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-sage flex-shrink-0" />
                    <div className="space-y-2 flex-1 mt-1 text-right">
                      <div className="h-2 bg-[#4a4a5a] rounded-full w-full ml-auto" />
                      <div className="h-2 bg-[#4a4a5a] rounded-full w-2/3 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Lock Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#1a1a2e]/90 flex items-center justify-center border border-[#303045] shadow-lg">
                  <Lock className="w-6 h-6 text-sand" />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2.5 mb-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-[#a0a0b5]">
                  <Check className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-center gap-5 mb-5 p-3 rounded-xl bg-[#242438] border border-[#303045]">
              <div className="text-center">
                <div className="text-2xl font-bold font-display text-white">₹49</div>
                <div className="text-[10px] text-[#8a8a9f] uppercase tracking-wider font-semibold">/ month</div>
              </div>
              <div className="w-px h-8 bg-[#303045]"></div>
              <div className="text-center relative">
                <div className="text-2xl font-bold font-display text-white">₹99</div>
                <div className="text-[10px] text-[#8a8a9f] uppercase tracking-wider font-semibold">/ 6 months</div>
                <Badge className="absolute -top-3 -right-6 bg-sage text-[#1a1a2e] text-[9px] font-bold px-1.5 py-0 border-none shadow-sm h-4 min-h-0">
                  SAVE 33%
                </Badge>
              </div>
            </div>

            {/* CTA */}
            <Button 
              className="w-full bg-white text-[#1a1a2e] hover:bg-slate-100 font-bold h-12 text-base transition-all"
              onClick={handleSubscribe}
              disabled={isSubscribing}
            >
              {isSubscribing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-[#1a1a2e] border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Unlock AI Assistant
                </>
              )}
            </Button>

            <p className="text-center text-xs text-[#6a6a7a] mt-4 font-medium">
              Cancel anytime. Secure payment via UPI/Card.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
