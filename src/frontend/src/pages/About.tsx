import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Compass,
  HeartPulse,
  Locate,
  MapPin,
  Phone,
  Radio,
  Shield,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

// ── Data ────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: Radio,
    title: "Detect Alerts",
    description:
      "Our system continuously monitors weather agencies and disaster authorities, pulling in the latest alerts across floods, cyclones, storms, and earthquakes in your region.",
  },
  {
    step: 2,
    icon: Locate,
    title: "Find Safe Places",
    description:
      "Using your device location, AlertSafe instantly identifies the nearest open shelters, hospitals, and relief centers — with distance and directions.",
  },
  {
    step: 3,
    icon: Zap,
    title: "Take Action",
    description:
      "Get step-by-step evacuation guidance, access emergency contacts with one tap, and share your status with family — all from a single app.",
  },
];

const FEATURES = [
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Live disaster notifications with color-coded priority levels",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: MapPin,
    title: "Location Assistance",
    description: "Nearest shelters, hospitals, and relief centers on demand",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: HeartPulse,
    title: "Emergency Resources",
    description: "Filter aid by type — medical, food, water, or shelter",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Phone,
    title: "SOS Contacts",
    description: "One-tap access to helplines and quick alert messaging",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    icon: Shield,
    title: "Safety Tips",
    description: "Disaster-specific checklists and preparedness guidance",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Round-the-clock system coverage — no downtime during crises",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const AUDIENCES = [
  {
    icon: Users,
    label: "Citizens",
    description:
      "Urban and rural residents in disaster-prone regions who need instant, reliable safety information during emergencies.",
  },
  {
    icon: ShieldCheck,
    label: "Emergency Responders",
    description:
      "First responders and rescue teams who need fast, clear situational data to coordinate effective relief operations.",
  },
  {
    icon: HeartPulse,
    label: "Families",
    description:
      "Families who want to stay connected, track loved ones' safety, and access preparedness checklists together.",
  },
  {
    icon: Compass,
    label: "Travelers",
    description:
      "Tourists and road travelers who may be unfamiliar with local emergency protocols and need quick directional guidance.",
  },
];

const STATS = [
  { value: "500+", label: "Registered Shelters" },
  { value: "24/7", label: "Live Monitoring" },
  { value: "50K+", label: "Active Users" },
  { value: "15", label: "Districts Covered" },
];

const TECH_FEATURES = [
  {
    icon: Locate,
    title: "Location-Aware",
    description:
      "AlertSafe uses your device's GPS to show the nearest help — no manual address entry needed.",
  },
  {
    icon: Radio,
    title: "Regular Data Refresh",
    description:
      "Alert data is updated frequently from government and meteorological sources to keep you informed.",
  },
  {
    icon: CheckCircle,
    title: "Works on Any Device",
    description:
      "Designed for mobile-first use with a clean layout that works equally well on phones, tablets, and desktops.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your location is used only to show nearby resources. It is never stored or shared with third parties.",
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center mb-3">
      <Badge
        variant="outline"
        className="border-primary/40 text-primary px-3 py-1 text-xs font-semibold tracking-widest uppercase"
      >
        {children}
      </Badge>
    </div>
  );
}

function StepCard({
  step,
  icon: Icon,
  title,
  description,
}: (typeof HOW_IT_WORKS)[0]) {
  return (
    <div className="relative flex flex-col items-center text-center px-4">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-md">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center">
          {step}
        </span>
      </div>
      <h3 className="font-display font-bold text-lg text-foreground mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  bg,
}: (typeof FEATURES)[0]) {
  return (
    <Card className="border-border hover:shadow-md transition-smooth">
      <CardContent className="p-5 flex gap-4 items-start">
        <div
          className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground text-sm mb-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function AudienceCard({
  icon: Icon,
  label,
  description,
}: (typeof AUDIENCES)[0]) {
  return (
    <Card className="border-border hover:border-primary/30 hover:shadow-md transition-smooth">
      <CardContent className="p-6 flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-display font-bold text-foreground">{label}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/25 rounded-full px-4 py-1.5 mb-5">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-destructive text-xs font-semibold uppercase tracking-wider">
              Disaster Early Warning Platform
            </span>
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4">
            About <span className="text-primary">AlertSafe</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A government-grade emergency platform that gives citizens, families,
            and responders the tools and information they need to stay safe
            during natural disasters.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-background py-16">
        <div className="max-w-4xl mx-auto px-4">
          <SectionLabel>Our Mission</SectionLabel>
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-6">
            Saving Lives Through Timely Information
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-foreground text-base leading-relaxed mb-4">
                AlertSafe's mission is to{" "}
                <strong>
                  save lives by delivering timely, accurate disaster information
                </strong>{" "}
                to everyone — regardless of technical ability or location.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Natural disasters strike without warning. Every second counts.
                AlertSafe bridges the gap between official emergency alerts and
                the people who need to act on them — putting critical guidance
                directly on the devices people already carry.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We believe that access to safety information is a basic right,
                not a privilege. Our platform is designed to be fast, simple,
                and usable even in the most stressful moments.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-card border border-border rounded-xl p-5 text-center"
                >
                  <div className="font-display font-bold text-3xl text-primary mb-1">
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── How It Works ── */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-3">
            Three Simple Steps to Safety
          </h2>
          <p className="text-muted-foreground text-center text-sm max-w-xl mx-auto mb-10">
            AlertSafe works automatically — from detecting a hazard to guiding
            you to safety, the whole process takes seconds.
          </p>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] h-0.5 bg-border z-0" />
            {HOW_IT_WORKS.map((item) => (
              <StepCard key={item.step} {...item} />
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Key Features ── */}
      <section className="bg-background py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel>Key Features</SectionLabel>
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-3">
            Everything You Need in a Crisis
          </h2>
          <p className="text-muted-foreground text-center text-sm max-w-xl mx-auto mb-10">
            Built specifically for emergencies — every feature is designed for
            speed, clarity, and ease of use under pressure.
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="features-grid"
          >
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Target Audience ── */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel>Who It's For</SectionLabel>
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-3">
            Built for Every Person at Risk
          </h2>
          <p className="text-muted-foreground text-center text-sm max-w-xl mx-auto mb-10">
            Whether you're at home, on the road, or coordinating relief efforts
            — AlertSafe adapts to your needs.
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            data-ocid="audience-grid"
          >
            {AUDIENCES.map((a) => (
              <AudienceCard key={a.label} {...a} />
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Built for Resilience (Stats Banner) ── */}
      <section className="bg-primary py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-3xl text-primary-foreground mb-3">
            Built for Resilience
          </h2>
          <p className="text-primary-foreground/75 text-sm max-w-xl mx-auto mb-10">
            AlertSafe is operational across multiple districts, monitoring
            thousands of users and hundreds of emergency facilities in real
            time.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="font-display font-bold text-4xl text-primary-foreground">
                  {value}
                </span>
                <span className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Technology Section ── */}
      <section className="bg-background py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel>How the Platform Works</SectionLabel>
          <h2 className="font-display font-bold text-3xl text-foreground text-center mb-3">
            Simple Technology, Serious Impact
          </h2>
          <p className="text-muted-foreground text-center text-sm max-w-xl mx-auto mb-10">
            You don't need to understand the technology — just open the app and
            we handle the rest.
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            data-ocid="tech-features-grid"
          >
            {TECH_FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md transition-smooth"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1">
                    {title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
