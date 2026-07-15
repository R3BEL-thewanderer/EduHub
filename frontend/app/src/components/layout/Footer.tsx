import { Link } from 'react-router-dom';
import { GraduationCap, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sand border-t-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="bg-white p-6 rounded-xl border-2 border-black shadow-neo">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <img src="/logo.png" alt="EduHub Logo" className="h-10 w-auto group-hover:-rotate-3 transition-transform" />
            </Link>
            <p className="text-black font-bold text-sm mb-2 uppercase tracking-widest">
              By Students. For Students.
            </p>
            <p className="text-muted-foreground text-xs font-bold">
              © 2026 EduHub. Independently built.
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-xl border-2 border-black shadow-neo">
            <h3 className="text-black font-display font-black text-xl mb-4 border-b-2 border-black pb-2">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 -ml-2 rounded transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/2025-26" className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 -ml-2 rounded transition-colors">
                  Subjects
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 -ml-2 rounded transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 -ml-2 rounded transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="bg-white p-6 rounded-xl border-2 border-black shadow-neo">
            <h3 className="text-black font-display font-black text-xl mb-4 border-b-2 border-black pb-2">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 -ml-2 rounded transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 -ml-2 rounded transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-black font-bold hover:bg-black hover:text-white px-2 py-1 -ml-2 rounded transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-8 pt-8 border-t-4 border-black text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 border-2 border-black rounded-full shadow-neo-sm">
            <span className="font-bold text-black text-sm uppercase">Made with</span> 
            <Heart className="w-5 h-5 text-rose fill-rose" /> 
            <span className="font-bold text-black text-sm uppercase">for First Year Students</span>
          </div>
          <p className="text-black font-bold text-xs mt-6 max-w-md mx-auto">
            EduHub is an independent platform. Not affiliated with any college or university. All notes are student-created.
          </p>
        </div>
      </div>
    </footer>
  );
}
