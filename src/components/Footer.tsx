import { GithubIcon, UpworkIcon } from "@/lib/icons"
import { MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]" style={{ background: "var(--color-bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-bold tracking-tight mb-3">
            <span className="gradient-text">MUIZ</span>
            <span className="text-[var(--color-text-muted)]"> UD DIN</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xs">
              Data Scientist & Full-Stack AI Engineer building intelligent systems that scale.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {["About", "Skills", "Projects", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:translate-x-1 transition-all duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)] mb-4">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/MUIZ-UDDIN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:translate-x-1 transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.upwork.com/freelancers/~muizuddin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:translate-x-1 transition-all duration-300"
              >
                <UpworkIcon className="w-4 h-4" />
                Upwork
              </a>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4" />
                Gilgit, Pakistan
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} Muiz Ud Din. All rights reserved.
          </p>
          <div />
        </div>
      </div>
    </footer>
  )
}
