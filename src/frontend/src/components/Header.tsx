import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { useSOSContext } from "../context/SOSContext";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Live Alerts", to: "/alerts" },
  { label: "Safe Places", to: "/safe-places" },
  { label: "Resources", to: "/resources" },
  { label: "Safety Tips", to: "/safety-tips" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function NavLink({
  to,
  label,
  onClick,
}: { to: string; label: string; onClick?: () => void }) {
  const router = useRouterState();
  const isActive = router.location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-sm font-medium transition-smooth px-3 py-2 rounded-md hover:bg-muted ${
        isActive
          ? "text-primary bg-primary/8 font-semibold"
          : "text-muted-foreground hover:text-foreground"
      }`}
      data-ocid={`nav-${to.replace("/", "") || "home"}`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openSOS } = useSOSContext();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            data-ocid="nav-logo"
            aria-label="AlertSafe Home"
          >
            <div className="w-9 h-9 rounded-lg bg-destructive flex items-center justify-center shadow-xs">
              <Bell
                className="w-5 h-5 text-destructive-foreground"
                aria-hidden="true"
              />
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight">
              ALERT<span className="text-primary">SAFE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} {...link} />
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* SOS Button */}
            <Button
              variant="destructive"
              className="btn-touch gap-2 font-bold text-sm shadow-alert-active hidden sm:flex"
              onClick={openSOS}
              data-ocid="sos-trigger-btn"
              aria-label="Open SOS emergency helplines"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              SOS
            </Button>

            {/* Mobile SOS - icon only */}
            <Button
              variant="destructive"
              size="icon"
              className="sm:hidden w-10 h-10"
              onClick={openSOS}
              data-ocid="sos-trigger-mobile"
              aria-label="Open SOS emergency helplines"
            >
              <Phone className="w-4 h-4" />
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden w-10 h-10"
                  aria-label="Open mobile menu"
                  data-ocid="mobile-menu-trigger"
                >
                  {mobileOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  <div className="px-4 py-5 border-b border-border">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-destructive flex items-center justify-center">
                        <Bell className="w-4 h-4 text-destructive-foreground" />
                      </div>
                      <span className="font-display font-bold text-lg text-foreground">
                        ALERT<span className="text-primary">SAFE</span>
                      </span>
                    </div>
                  </div>

                  <nav
                    className="flex-1 px-3 py-4 space-y-1"
                    aria-label="Mobile navigation"
                  >
                    {NAV_LINKS.map((link) => (
                      <NavLink
                        key={link.to}
                        {...link}
                        onClick={() => setMobileOpen(false)}
                      />
                    ))}
                  </nav>

                  <div className="px-3 py-4 border-t border-border">
                    <Button
                      variant="destructive"
                      className="w-full btn-touch gap-2 font-bold"
                      onClick={() => {
                        setMobileOpen(false);
                        openSOS();
                      }}
                      data-ocid="mobile-sos-btn"
                    >
                      <Phone className="w-4 h-4" />
                      SOS Emergency Helplines
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
