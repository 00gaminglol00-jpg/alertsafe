import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertOctagon,
  Bell,
  Droplets,
  Locate,
  MapPin,
  PhoneCall,
  Search,
  Shield,
  ShieldCheck,
  Thermometer,
  Users,
  Wind,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { AlertCard } from "../components/AlertCard";
import { useSOSContext } from "../context/SOSContext";
import { useAlerts } from "../hooks/useAlerts";
import { useLocation } from "../hooks/useLocation";
import { useWeather } from "../hooks/useWeather";
import { Severity, WeatherCondition } from "../types";
import { getAlertTypeIcon, getWeatherIcon } from "../utils/helpers";

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TICKER_MESSAGES = [
  "🚨 URGENT: Severe Flood Warning — Downtown Metro Area. Evacuate Zone A & B immediately.",
  "⚠️ Cyclone Watch: Cat-2 Tropical Cyclone Riya approaching Eastern Coast — all vessels return to port.",
  "🌧️ Heavy Rain Advisory in effect for Northern Suburbs until 6:00 PM — avoid underpasses.",
  "🏠 12 Emergency Shelters OPEN — Community Center East has capacity (78/300).",
  "📢 NDRF teams deployed in Westbank Lowlands — call 1078 for evacuation assistance.",
  "✅ All Clear: Northern Region storm has passed — inspect property before re-entering.",
];

function AlertTicker({ messages }: { messages: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 4200);
    return () => clearInterval(t);
  }, [messages.length]);

  return (
    <div
      className="bg-destructive/90 text-destructive-foreground py-2 px-4 flex items-center gap-3 overflow-hidden"
      aria-live="polite"
      aria-label="Live emergency ticker"
      data-ocid="alert-ticker"
    >
      <Bell className="w-4 h-4 flex-shrink-0 animate-pulse" aria-hidden />
      <span className="text-[11px] font-bold uppercase tracking-widest flex-shrink-0">
        LIVE
      </span>
      <div className="flex-1 overflow-hidden relative h-5">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            className="absolute inset-0 text-xs font-semibold truncate flex items-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {messages[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection({ onSOSOpen }: { onSOSOpen: () => void }) {
  const { data: alerts } = useAlerts();
  const activeCount = (alerts ?? []).filter(
    (a) => a.severity === Severity.danger || a.severity === Severity.warning,
  ).length;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.17 0.05 240) 0%, oklch(0.21 0.09 220) 55%, oklch(0.15 0.06 200) 100%)",
      }}
    >
      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.06) 12px, rgba(255,255,255,0.06) 24px)",
        }}
        aria-hidden
      />
      <div className="relative z-10 px-4 pt-10 pb-8 text-center">
        {activeCount > 0 && (
          <motion.div
            className="inline-flex items-center gap-2 bg-destructive/30 border border-destructive/60 rounded-full px-3 py-1 mb-5"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span
              className="w-2 h-2 rounded-full bg-destructive animate-pulse"
              aria-hidden
            />
            <span className="text-xs font-bold text-white">
              {activeCount} Active Alert{activeCount !== 1 ? "s" : ""} — Act Now
            </span>
          </motion.div>
        )}

        <motion.h1
          className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight mb-3"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Stay Alert,
          <br />
          <span style={{ color: "oklch(0.75 0.18 200)" }}>Stay Safe</span>
        </motion.h1>

        <motion.p
          className="text-sm text-white/65 max-w-xs mx-auto mb-7 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Real-time disaster alerts, emergency guidance, and nearest shelters —
          all in one place.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/alerts">
            <Button
              className="btn-touch gap-2 font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground w-full sm:w-auto min-w-[160px]"
              data-ocid="hero-view-alerts-btn"
            >
              <Bell className="w-4 h-4" aria-hidden />
              View Live Alerts
            </Button>
          </Link>
          <Button
            variant="outline"
            className="btn-touch gap-2 font-bold border-white/30 text-white hover:bg-white/10 w-full sm:w-auto min-w-[160px]"
            onClick={onSOSOpen}
            data-ocid="hero-emergency-btn"
          >
            <PhoneCall className="w-4 h-4" aria-hidden />
            Emergency Help
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const STATS = [
  { icon: Shield, label: "500+ Shelters", sub: "Active & Verified" },
  { icon: Bell, label: "24/7 Monitoring", sub: "Live Alerts" },
  { icon: Users, label: "50K+ Users Safe", sub: "This Season" },
  { icon: MapPin, label: "15 Districts", sub: "Covered" },
];

function StatBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="max-w-2xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.08 }}
          >
            <s.icon className="w-5 h-5 flex-shrink-0 opacity-80" aria-hidden />
            <div className="min-w-0">
              <p className="text-sm font-bold leading-tight">{s.label}</p>
              <p className="text-[11px] opacity-75 leading-tight">{s.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Live Emergency Status Grid ───────────────────────────────────────────────
function StatusGrid() {
  const { data: alerts } = useAlerts();
  const dangerCount = (alerts ?? []).filter(
    (a) => a.severity === Severity.danger,
  ).length;
  const warningCount = (alerts ?? []).filter(
    (a) => a.severity === Severity.warning,
  ).length;

  const FloodIcon = getAlertTypeIcon(
    "flood" as Parameters<typeof getAlertTypeIcon>[0],
  );
  const StormIcon = getAlertTypeIcon(
    "storm" as Parameters<typeof getAlertTypeIcon>[0],
  );

  const STATUS_ITEMS = [
    {
      label: "MAJOR THREAT",
      sub: "FLOOD",
      detail: `${dangerCount} Alerts Active`,
      note: "Immediate Action Required",
      Icon: FloodIcon,
      color: "bg-destructive text-destructive-foreground",
    },
    {
      label: "WARNING",
      sub: "HEAVY RAIN",
      detail: `${warningCount} Advisories`,
      note: "Monitor Local Reports",
      Icon: StormIcon,
      color: "bg-warning text-warning-foreground",
    },
    {
      label: "SAFE ZONES",
      sub: "OPEN",
      detail: "12 Designated Shelters",
      note: "Check Closest Facility",
      Icon: Shield,
      color: "bg-primary text-primary-foreground",
    },
    {
      label: "TRAFFIC",
      sub: "DELAYS",
      detail: "Route Closures",
      note: "Avoid Low-Lying Roads",
      Icon: AlertOctagon,
      color: "bg-accent text-accent-foreground",
    },
  ];

  return (
    <section aria-labelledby="status-grid-heading">
      <h2
        id="status-grid-heading"
        className="text-lg font-display font-bold text-foreground mb-3"
      >
        Live Emergency Status
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {STATUS_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            className={`rounded-xl p-3 ${item.color}`}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            data-ocid={`status-card-${i}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <item.Icon className="w-5 h-5 flex-shrink-0" aria-hidden />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide opacity-90 leading-tight">
                  {item.label}
                </p>
                <p className="text-sm font-display font-extrabold leading-tight">
                  {item.sub}
                </p>
              </div>
            </div>
            <p className="text-sm font-bold mt-1">{item.detail}</p>
            <p className="text-xs opacity-80">{item.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Weather Widget ───────────────────────────────────────────────────────────
function WeatherWidget() {
  const { data: weather, isLoading } = useWeather();

  if (isLoading) {
    return (
      <Card className="p-4 space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-28" />
        <div className="flex gap-3">
          {[1, 2, 3].map((k) => (
            <Skeleton key={k} className="h-7 w-20" />
          ))}
        </div>
      </Card>
    );
  }

  if (!weather) return null;

  const WeatherIcon = getWeatherIcon(weather.condition);
  const isAdverse =
    weather.condition === WeatherCondition.stormy ||
    weather.condition === WeatherCondition.rainy;

  return (
    <Card
      className={`overflow-hidden border ${
        isAdverse
          ? "border-warning/40 bg-warning/5"
          : "border-success/30 bg-success/5"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <MapPin className="w-4 h-4 text-primary" aria-hidden />
            {weather.location}
          </div>
          {isAdverse && (
            <Badge className="bg-warning/20 text-warning border-warning/30 text-[10px]">
              Severe Weather
            </Badge>
          )}
        </div>

        <div className="flex items-end gap-4 mb-4">
          <WeatherIcon
            className={`w-10 h-10 ${isAdverse ? "text-warning" : "text-success"}`}
            aria-hidden
          />
          <span className="text-4xl font-display font-bold text-foreground">
            {Number(weather.temperature)}°C
          </span>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Droplets className="w-3.5 h-3.5 text-primary" aria-hidden />
            {Number(weather.humidity)}% Humidity
          </span>
          <span className="flex items-center gap-1">
            <Wind className="w-3.5 h-3.5 text-primary" aria-hidden />
            {Number(weather.windSpeed)} km/h Wind
          </span>
          <span className="flex items-center gap-1">
            <Thermometer className="w-3.5 h-3.5 text-primary" aria-hidden />
            Feels {Number(weather.temperature) - 2}°C
          </span>
        </div>

        <div className="pt-3 border-t border-border/50 flex gap-3 overflow-x-auto">
          {weather.forecast.map((f) => {
            const FIcon = getWeatherIcon(f.condition);
            return (
              <div
                key={f.time}
                className="flex flex-col items-center gap-1 min-w-[44px]"
              >
                <span className="text-[10px] text-muted-foreground">
                  {f.time}
                </span>
                <FIcon className="w-4 h-4 text-foreground/60" aria-hidden />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

// ─── Location Section ─────────────────────────────────────────────────────────
function LocationSection() {
  const { location, isLoading, error, requestLocation, hasPermission } =
    useLocation();
  const [manualInput, setManualInput] = useState("");

  return (
    <Card className="p-4 border-primary/20">
      <h2 className="text-base font-display font-bold text-foreground mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" aria-hidden />
        Your Location
      </h2>

      {location && (
        <div className="mb-3 flex items-center gap-2 text-sm text-success font-medium">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" aria-hidden />
          <span className="truncate">{location.label}</span>
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive mb-2 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden />
          {error}
        </p>
      )}

      <div className="relative mb-2">
        <Search
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          className="pl-9 h-11 text-sm"
          placeholder="Enter city or area name…"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          aria-label="Enter location manually"
          data-ocid="location-input"
        />
      </div>

      <Button
        className="w-full btn-touch gap-2 font-semibold"
        variant={hasPermission === false ? "outline" : "default"}
        onClick={requestLocation}
        disabled={isLoading}
        aria-label="Detect my location via GPS"
        data-ocid="detect-location-btn"
      >
        <Locate className="w-4 h-4" aria-hidden />
        {isLoading ? "Detecting…" : "Detect My Location"}
      </Button>
    </Card>
  );
}

// ─── Quick Actions ────────────────────────────────────────────────────────────
function QuickActions({ onSOSOpen }: { onSOSOpen: () => void }) {
  const ACTIONS = [
    {
      label: "View All Alerts",
      icon: Bell,
      to: "/alerts" as const,
      color:
        "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
      ocid: "quick-view-alerts",
    },
    {
      label: "Find Safe Places",
      icon: Shield,
      to: "/safe-places" as const,
      color: "bg-primary hover:bg-primary/90 text-primary-foreground",
      ocid: "quick-find-shelter",
    },
    {
      label: "Safety Tips",
      icon: ShieldCheck,
      to: "/safety-tips" as const,
      color: "bg-success hover:bg-success/90 text-success-foreground",
      ocid: "quick-safety-tips",
    },
    {
      label: "Resources",
      icon: MapPin,
      to: "/resources" as const,
      color: "bg-accent hover:bg-accent/90 text-accent-foreground",
      ocid: "quick-resources",
    },
  ];

  return (
    <section aria-labelledby="quick-actions-heading">
      <h2
        id="quick-actions-heading"
        className="text-lg font-display font-bold text-foreground mb-3"
      >
        Quick Access
      </h2>
      <div className="grid grid-cols-2 gap-3 mb-3">
        {ACTIONS.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <Link to={action.to}>
              <button
                type="button"
                className={`w-full rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[80px] font-semibold text-sm transition-smooth ${action.color}`}
                data-ocid={action.ocid}
              >
                <action.icon className="w-6 h-6" aria-hidden />
                {action.label}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
      {/* SOS full-width */}
      <motion.button
        type="button"
        className="w-full rounded-xl p-4 flex items-center justify-center gap-3 min-h-[64px] font-bold text-base bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-smooth shadow-md"
        onClick={onSOSOpen}
        whileTap={{ scale: 0.97 }}
        aria-label="Open SOS and emergency helplines"
        data-ocid="quick-emergency-help"
      >
        <PhoneCall className="w-6 h-6 animate-pulse" aria-hidden />
        Emergency Help — SOS
      </motion.button>
    </section>
  );
}

// ─── Helpline Bar ─────────────────────────────────────────────────────────────
const QUICK_HELPLINES = [
  { name: "Police", number: "100", colorClass: "text-primary" },
  { name: "Ambulance", number: "108", colorClass: "text-destructive" },
  { name: "Fire", number: "101", colorClass: "text-accent" },
  { name: "Disaster", number: "1077", colorClass: "text-warning" },
];

function HelplineBar() {
  return (
    <div
      className="bg-card border border-border rounded-xl p-4"
      aria-label="Emergency helplines"
    >
      <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
        <PhoneCall className="w-4 h-4 text-destructive" aria-hidden />
        Emergency Helplines
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {QUICK_HELPLINES.map((h) => (
          <a
            key={h.number}
            href={`tel:${h.number}`}
            className="flex flex-col items-center justify-center rounded-lg bg-muted/60 p-3 text-center hover:bg-muted transition-smooth min-h-[60px]"
            aria-label={`Call ${h.name}: ${h.number}`}
            data-ocid={`helpline-${h.number}`}
          >
            <span
              className={`text-xl font-display font-extrabold ${h.colorClass}`}
            >
              {h.number}
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5 font-medium">
              {h.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Live Alerts Preview ──────────────────────────────────────────────────────
function LiveAlertsPreview() {
  const { data: alerts, isLoading } = useAlerts();
  const topAlerts = (alerts ?? [])
    .filter((a) => a.severity === Severity.danger)
    .slice(0, 3);

  return (
    <section aria-labelledby="live-alerts-heading">
      <div className="flex items-center justify-between mb-3">
        <h2
          id="live-alerts-heading"
          className="text-lg font-display font-bold text-foreground flex items-center gap-2"
        >
          <span
            className="w-2 h-2 rounded-full bg-destructive animate-pulse inline-block"
            aria-hidden
          />
          Active Danger Alerts
        </h2>
        <Link
          to="/alerts"
          className="text-xs font-semibold text-primary hover:underline"
          data-ocid="view-all-alerts-link"
        >
          View All →
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((k) => (
            <Skeleton key={k} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : topAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-center bg-success/5 rounded-xl border border-success/20">
          <ShieldCheck className="w-10 h-10 text-success" aria-hidden />
          <p className="text-sm font-semibold text-foreground">
            No active danger alerts
          </p>
          <p className="text-xs text-muted-foreground">
            All clear in your area. Stay prepared.
          </p>
        </div>
      ) : (
        <div className="space-y-3" data-ocid="live-alerts-list">
          {topAlerts.map((alert, i) => (
            <motion.div
              key={String(alert.id)}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <AlertCard alert={alert} compact />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Nearby Shelters ──────────────────────────────────────────────────────────
const SAMPLE_SHELTERS = [
  {
    name: "Community Center East",
    distance: "0.8 mi",
    capacity: "78/300",
    full: false,
  },
  {
    name: "Civic Pavilion",
    distance: "1.2 mi",
    capacity: "310/310",
    full: true,
  },
  {
    name: "School Gymnasium Shelter",
    distance: "2.3 mi",
    capacity: "42/200",
    full: false,
  },
];

function NearbyShelters() {
  return (
    <section aria-labelledby="shelters-heading">
      <div className="flex items-center justify-between mb-3">
        <h2
          id="shelters-heading"
          className="text-lg font-display font-bold text-foreground"
        >
          Open Emergency Shelters
        </h2>
        <Link
          to="/safe-places"
          className="text-xs font-semibold text-primary hover:underline"
          data-ocid="view-all-shelters-link"
        >
          See All →
        </Link>
      </div>
      <div className="space-y-2">
        {SAMPLE_SHELTERS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card
              className="p-3 flex items-center justify-between gap-3"
              data-ocid={`shelter-card-${i}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${
                    s.full
                      ? "bg-destructive/10 text-destructive"
                      : "bg-success/10 text-success"
                  }`}
                >
                  <Shield className="w-5 h-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.distance} · Cap: {s.capacity}
                  </p>
                </div>
              </div>
              {s.full ? (
                <Badge className="bg-destructive/10 text-destructive border-destructive/30 text-xs flex-shrink-0">
                  FULL
                </Badge>
              ) : (
                <Link to="/safe-places">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-8 border-primary/40 text-primary hover:bg-primary/10 flex-shrink-0"
                    data-ocid={`shelter-directions-${i}`}
                  >
                    Directions
                  </Button>
                </Link>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export function Home() {
  const { openSOS } = useSOSContext();

  return (
    <div className="min-h-screen bg-background">
      <AlertTicker messages={TICKER_MESSAGES} />
      <HeroSection onSOSOpen={openSOS} />
      <StatBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Location + Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
          >
            <LocationSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
          >
            <WeatherWidget />
          </motion.div>
        </div>

        {/* Status Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <StatusGrid />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <QuickActions onSOSOpen={openSOS} />
        </motion.div>

        {/* Helplines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HelplineBar />
        </motion.div>

        {/* Live Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <LiveAlertsPreview />
        </motion.div>

        {/* Nearby Shelters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <NearbyShelters />
        </motion.div>
      </main>
    </div>
  );
}
