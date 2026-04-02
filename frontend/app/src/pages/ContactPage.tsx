import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MainLayout } from '@/components/layout/MainLayout';

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <MainLayout showSideAds={false}>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-border p-6"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-sage" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  We'll get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-muted-foreground">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    required
                    className="bg-secondary border-border text-primary placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-muted-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="bg-secondary border-border text-primary placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-muted-foreground">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    required
                    rows={4}
                    className="bg-secondary border-border text-primary placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary font-bold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-sage/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-sage" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Email Us</h3>
              </div>
              <p className="text-muted-foreground mb-2">
                For general inquiries and support:
              </p>
              <a 
                href="mailto:hello@edu-hub.co.in" 
                className="text-sage hover:underline"
              >
                hello@edu-hub.co.in
              </a>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Feedback</h3>
              </div>
              <p className="text-muted-foreground">
                Have suggestions for improving the platform? We'd love to hear your ideas!
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-sand-light flex items-center justify-center">
                  <Clock className="w-5 h-5 text-sand" />
                </div>
                <h3 className="text-lg font-semibold text-primary">Response Time</h3>
              </div>
              <p className="text-muted-foreground">
                We aim to respond to all inquiries within 48 hours during business days.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
