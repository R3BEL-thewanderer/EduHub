import { MainLayout } from '@/components/layout/MainLayout';

export function PrivacyPolicy() {
  return (
    <MainLayout showSideAds={false}>
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: March 31, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              We collect the following information when you use EduHub:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Email address (for account creation and authentication)</li>
              <li>Name (from your Google account or provided during signup)</li>
              <li>Profile photo (optional, from Google OAuth)</li>
              <li>College information (optional)</li>
              <li>Usage data (pages visited, files accessed)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide access to study materials and resources</li>
              <li>Process subscription payments for AI features</li>
              <li>Send important updates about the platform</li>
              <li>Improve our services based on usage patterns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">3. Google AdSense & Cookies</h2>
            <p className="text-muted-foreground mb-4">
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies 
              to serve ads based on your prior visits to our website or other websites. You may opt out 
              of personalized advertising by visiting{' '}
              <a 
                href="https://www.google.com/settings/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sage hover:underline"
              >
                Google Ads Settings
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">4. Google Analytics</h2>
            <p className="text-muted-foreground mb-4">
              We use Google Analytics to understand how visitors interact with our website. This service 
              collects information such as your IP address, browser type, pages visited, and time spent 
              on the site. This data helps us improve user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your personal information. 
              All data is stored securely using industry-standard encryption and access controls.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground">
              For any privacy-related questions or to request data deletion, please contact us at{' '}
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
