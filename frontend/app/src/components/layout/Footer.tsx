import { Link } from 'react-router-dom';
import { GraduationCap, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <GraduationCap className="w-6 h-6 text-primary group-hover:-translate-y-1 transition-transform" />
              <span className="text-lg font-bold font-display text-primary tracking-tight">EduHub</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-2">
              By Students. For Students.
            </p>
            <p className="text-muted-foreground/70 text-xs">
              © 2026 EduHub. Independently built by a First Year B.E. student.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/2025-26/sem1" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-primary font-display font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for First Year Students
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2 max-w-md mx-auto">
            EduHub is an independent platform. Not affiliated with any college or university. All notes are student-created.
          </p>
        </div>
      </div>
    </footer>
  );
}
