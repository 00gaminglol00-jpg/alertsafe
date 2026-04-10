import { c as createLucideIcon, j as jsxRuntimeExports, T as TriangleAlert, B as Bell, x as Phone, d as Shield, f as Badge } from "./index-Bhx4ae-j.js";
import { C as Card, c as CardContent } from "./card-CWX6OZto.js";
import { S as Separator } from "./separator-BWsIazgB.js";
import { R as Radio } from "./radio-DNgVfTIZ.js";
import { L as Locate } from "./locate-BVRm7pG1.js";
import { Z as Zap } from "./zap-CeQEFHlo.js";
import { M as MapPin, C as Clock } from "./map-pin-Cgo33kKH.js";
import { U as Users } from "./users-Dmry0I9E.js";
import { S as ShieldCheck } from "./shield-check-DegrT2Xv.js";
import { C as CircleCheckBig } from "./circle-check-big-BIYzJ8q9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ],
  ["path", { d: "M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "1uw2ng" }]
];
const HeartPulse = createLucideIcon("heart-pulse", __iconNode);
const HOW_IT_WORKS = [
  {
    step: 1,
    icon: Radio,
    title: "Detect Alerts",
    description: "Our system continuously monitors weather agencies and disaster authorities, pulling in the latest alerts across floods, cyclones, storms, and earthquakes in your region."
  },
  {
    step: 2,
    icon: Locate,
    title: "Find Safe Places",
    description: "Using your device location, AlertSafe instantly identifies the nearest open shelters, hospitals, and relief centers — with distance and directions."
  },
  {
    step: 3,
    icon: Zap,
    title: "Take Action",
    description: "Get step-by-step evacuation guidance, access emergency contacts with one tap, and share your status with family — all from a single app."
  }
];
const FEATURES = [
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Live disaster notifications with color-coded priority levels",
    color: "text-destructive",
    bg: "bg-destructive/10"
  },
  {
    icon: MapPin,
    title: "Location Assistance",
    description: "Nearest shelters, hospitals, and relief centers on demand",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: HeartPulse,
    title: "Emergency Resources",
    description: "Filter aid by type — medical, food, water, or shelter",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    icon: Phone,
    title: "SOS Contacts",
    description: "One-tap access to helplines and quick alert messaging",
    color: "text-destructive",
    bg: "bg-destructive/10"
  },
  {
    icon: Shield,
    title: "Safety Tips",
    description: "Disaster-specific checklists and preparedness guidance",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Round-the-clock system coverage — no downtime during crises",
    color: "text-accent",
    bg: "bg-accent/10"
  }
];
const AUDIENCES = [
  {
    icon: Users,
    label: "Citizens",
    description: "Urban and rural residents in disaster-prone regions who need instant, reliable safety information during emergencies."
  },
  {
    icon: ShieldCheck,
    label: "Emergency Responders",
    description: "First responders and rescue teams who need fast, clear situational data to coordinate effective relief operations."
  },
  {
    icon: HeartPulse,
    label: "Families",
    description: "Families who want to stay connected, track loved ones' safety, and access preparedness checklists together."
  },
  {
    icon: Compass,
    label: "Travelers",
    description: "Tourists and road travelers who may be unfamiliar with local emergency protocols and need quick directional guidance."
  }
];
const STATS = [
  { value: "500+", label: "Registered Shelters" },
  { value: "24/7", label: "Live Monitoring" },
  { value: "50K+", label: "Active Users" },
  { value: "15", label: "Districts Covered" }
];
const TECH_FEATURES = [
  {
    icon: Locate,
    title: "Location-Aware",
    description: "AlertSafe uses your device's GPS to show the nearest help — no manual address entry needed."
  },
  {
    icon: Radio,
    title: "Regular Data Refresh",
    description: "Alert data is updated frequently from government and meteorological sources to keep you informed."
  },
  {
    icon: CircleCheckBig,
    title: "Works on Any Device",
    description: "Designed for mobile-first use with a clean layout that works equally well on phones, tablets, and desktops."
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your location is used only to show nearby resources. It is never stored or shared with third parties."
  }
];
function SectionLabel({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: "border-primary/40 text-primary px-3 py-1 text-xs font-semibold tracking-widest uppercase",
      children
    }
  ) });
}
function StepCard({
  step,
  icon: Icon,
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center text-center px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-7 h-7 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center", children: step })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground mb-2", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: description })
  ] });
}
function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  bg
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border hover:shadow-md transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex gap-4 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${color}` })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm mb-1", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: description })
    ] })
  ] }) });
}
function AudienceCard({
  icon: Icon,
  label,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border hover:border-primary/30 hover:shadow-md transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 flex flex-col items-center text-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: description })
  ] }) });
}
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-destructive/10 border border-destructive/25 rounded-full px-4 py-1.5 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-destructive" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive text-xs font-semibold uppercase tracking-wider", children: "Disaster Early Warning Platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4", children: [
        "About ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "AlertSafe" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed", children: "A government-grade emergency platform that gives citizens, families, and responders the tools and information they need to stay safe during natural disasters." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Our Mission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground text-center mb-6", children: "Saving Lives Through Timely Information" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground text-base leading-relaxed mb-4", children: [
            "AlertSafe's mission is to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "save lives by delivering timely, accurate disaster information" }),
            " ",
            "to everyone — regardless of technical ability or location."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4", children: "Natural disasters strike without warning. Every second counts. AlertSafe bridges the gap between official emergency alerts and the people who need to act on them — putting critical guidance directly on the devices people already carry." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "We believe that access to safety information is a basic right, not a privilege. Our platform is designed to be fast, simple, and usable even in the most stressful moments." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4", children: STATS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-5 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-3xl text-primary mb-1", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide", children: label })
            ]
          },
          label
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "How It Works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground text-center mb-3", children: "Three Simple Steps to Safety" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center text-sm max-w-xl mx-auto mb-10", children: "AlertSafe works automatically — from detecting a hazard to guiding you to safety, the whole process takes seconds." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid grid-cols-1 md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-8 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] h-0.5 bg-border z-0" }),
        HOW_IT_WORKS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(StepCard, { ...item }, item.step))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Key Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground text-center mb-3", children: "Everything You Need in a Crisis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center text-sm max-w-xl mx-auto mb-10", children: "Built specifically for emergencies — every feature is designed for speed, clarity, and ease of use under pressure." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
          "data-ocid": "features-grid",
          children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { ...f }, f.title))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "Who It's For" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground text-center mb-3", children: "Built for Every Person at Risk" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center text-sm max-w-xl mx-auto mb-10", children: "Whether you're at home, on the road, or coordinating relief efforts — AlertSafe adapts to your needs." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
          "data-ocid": "audience-grid",
          children: AUDIENCES.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceCard, { ...a }, a.label))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-primary-foreground mb-3", children: "Built for Resilience" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/75 text-sm max-w-xl mx-auto mb-10", children: "AlertSafe is operational across multiple districts, monitoring thousands of users and hundreds of emergency facilities in real time." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: STATS.map(({ value, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-4xl text-primary-foreground", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/70 text-xs font-medium uppercase tracking-wide", children: label })
      ] }, label)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionLabel, { children: "How the Platform Works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground text-center mb-3", children: "Simple Technology, Serious Impact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center text-sm max-w-xl mx-auto mb-10", children: "You don't need to understand the technology — just open the app and we handle the rest." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 gap-6",
          "data-ocid": "tech-features-grid",
          children: TECH_FEATURES.map(({ icon: Icon, title, description }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm mb-1", children: title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: description })
                ] })
              ]
            },
            title
          ))
        }
      )
    ] }) })
  ] });
}
export {
  About
};
