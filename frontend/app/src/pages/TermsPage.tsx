import { MainLayout } from '@/components/layout/MainLayout';

export function TermsPage() {
  return (
    <MainLayout showSideAds={false}>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: March 31, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing or using EduHub, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground mb-4">
              EduHub is designed for first-year B.E. students. 
              While anyone can create an account, the content is specifically tailored for the first-year 
              B.E. curriculum.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">3. Acceptable Use</h2>
            <p className="text-muted-foreground mb-4">
              You agree to use the platform for personal educational purposes only. You may not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Resell or redistribute any content from the platform</li>
              <li>Use automated tools to scrape or download content in bulk</li>
              <li>Share your account credentials with others</li>
              <li>Use the platform for any illegal or unauthorized purpose</li>
              <li>Attempt to bypass any security measures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">4. Subscription Terms</h2>
            <p className="text-muted-foreground mb-4">
              Our AI Study Assistant feature requires a paid subscription:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Monthly Plan:</strong> ₹49/month — 30 days of AI access</li>
              <li><strong>Semester Plan:</strong> ₹99/6 months — 180 days of AI access (save 33%)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Subscriptions can be cancelled at any time. No refunds are provided once AI access is activated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">5. Content Ownership</h2>
            <p className="text-muted-foreground mb-4">
              All study materials, notes, PDFs, and videos on this platform are either created by the 
              EduHub Team or sourced from publicly available educational resources. The content is 
              provided free of charge for educational purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">6. Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              EduHub provides study materials for educational assistance only. We do not guarantee 
              specific exam results or grades. Students are encouraged to use these resources as supplements 
              to their regular studies and attend classes regularly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">7. Content Removal</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to remove any content from the platform at any time without prior notice. 
              This includes but is not limited to cases where content is found to be inaccurate, outdated, 
              or in violation of copyright laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">8. Changes to Terms</h2>
            <p className="text-muted-foreground mb-4">
              We may update these Terms of Service from time to time. We will notify users of any significant 
              changes via email or through a notice on the platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">9. Contact</h2>
            <p className="text-muted-foreground">
              For any questions about these Terms of Service, please contact us at{' '}
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
