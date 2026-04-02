import { MainLayout } from '@/components/layout/MainLayout';

export function RefundPolicy() {
  return (
    <MainLayout showSideAds={false}>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Refund Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: March 31, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">1. Free Content</h2>
            <p className="text-muted-foreground mb-4">
              All study materials including notes, PDFs, previous year questions, and videos are provided 
              completely free of charge. No payment is required to access these resources.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">2. AI Study Assistant Subscription</h2>
            <p className="text-muted-foreground mb-4">
              The AI Study Assistant is a premium feature that requires a paid subscription. We offer two plans:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Monthly Plan: ₹49 per month</li>
              <li>Semester Plan: ₹99 for 6 months</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">3. No Refund Policy</h2>
            <p className="text-muted-foreground mb-4">
              Due to the digital nature of our AI service, <strong>we do not offer refunds</strong> once 
              the subscription is activated and access has been granted. This policy is in place because:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>The service is immediately accessible upon payment</li>
              <li>Users can consume the service instantly after subscription</li>
              <li>The low cost (₹49-₹99) makes refunds administratively impractical</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">4. Cancellation</h2>
            <p className="text-muted-foreground mb-4">
              You can cancel your subscription at any time. However, cancellation will only prevent future 
              charges. You will continue to have access to the AI Study Assistant until the end of your 
              current billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">5. Technical Issues</h2>
            <p className="text-muted-foreground mb-4">
              If you experience technical issues that prevent you from using the AI Study Assistant, 
              please contact our support team. We will work to resolve the issue promptly. Refunds may 
              be considered on a case-by-case basis only if the service is completely inaccessible due 
              to technical failures on our end for an extended period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              For any questions about our refund policy, please contact us at{' '}
              <a href="mailto:hello@edu-hub.co.in" className="text-sage hover:underline">
                hello@edu-hub.co.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
