import { Link } from "@tanstack/react-router";
import { Bell, ExternalLink, Mail, Phone } from "lucide-react";
import { HELPLINES } from "../data/mockData";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "Live Alerts", to: "/alerts" },
  { label: "Find Safe Places", to: "/safe-places" },
  { label: "Emergency Resources", to: "/resources" },
  { label: "Safety Tips", to: "/safety-tips" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const PRIORITY_HELPLINES = HELPLINES.filter((h) =>
  ["100", "108", "101", "112"].includes(h.number),
);

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-card border-t border-border">
      {/* Emergency ticker */}
      <div className="bg-destructive/5 border-b border-destructive/20 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-destructive text-xs font-bold flex-shrink-0">
            <Bell className="w-3.5 h-3.5 animate-pulse-alert" />
            EMERGENCY CONTACTS:
          </span>
          {PRIORITY_HELPLINES.map((h) => (
            <a
              key={h.number}
              href={`tel:${h.number}`}
              className="text-xs text-foreground hover:text-destructive transition-smooth font-semibold"
              data-ocid={`footer-helpline-${h.number}`}
            >
              {h.name}: <span className="text-destructive">{h.number}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-destructive flex items-center justify-center">
                <Bell className="w-4 h-4 text-destructive-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                ALERT<span className="text-primary">SAFE</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Integrated Disaster Early Warning &amp; Emergency Resource
              Platform. Keeping communities informed, prepared, and safe during
              natural disasters.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="mailto:help@alertsafe.gov"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Mail className="w-3.5 h-3.5" />
                help@alertsafe.gov
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-3 uppercase tracking-wide">
              Quick Access
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1.5 group"
                    data-ocid={`footer-link-${link.to.replace("/", "") || "home"}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover:bg-primary transition-smooth" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Numbers */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-3 uppercase tracking-wide">
              All Helplines
            </h4>
            <ul className="space-y-2">
              {HELPLINES.map((h) => (
                <li key={h.number}>
                  <a
                    href={`tel:${h.number}`}
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-smooth group"
                    data-ocid={`footer-emergency-${h.number}`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-destructive" />
                      {h.name}
                    </span>
                    <span className="font-bold text-destructive">
                      {h.number}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {year} AlertSafe. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            For real emergencies, always call official helplines
          </p>
        </div>
      </div>
    </footer>
  );
}
