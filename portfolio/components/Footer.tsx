import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold font-mono inline-block mb-4">
              <span className="text-primary">SB</span>
              <span className="text-foreground">.data</span>
            </Link>
            <p className="text-foreground/60 text-sm">
              Turning data chaos into business clarity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/experience"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Shakya2k"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/shakyadeep"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="/contact"
                className="text-foreground/60 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-foreground/60">
          <p>© {currentYear} Shakyadeep Bhattacharyya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
