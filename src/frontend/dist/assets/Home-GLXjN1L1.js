import { c as createLucideIcon, a as createActor, M as MOCK_WEATHER, u as useSOSContext, j as jsxRuntimeExports, r as reactExports, B as Bell, S as Severity, L as Link, b as Button, d as Shield, e as Skeleton, W as WeatherCondition, f as Badge } from "./index-Bhx4ae-j.js";
import { C as Card } from "./card-CWX6OZto.js";
import { I as Input } from "./input-CCdPQ4HW.js";
import { A as AlertCard } from "./AlertCard-CxQ1aLxz.js";
import { u as useAlerts } from "./useAlerts-B4CtqOaX.js";
import { u as useLocation } from "./useLocation-D7SLsDPe.js";
import { u as useActor, a as useQuery } from "./useActor-D2lKGfZ7.js";
import { S as Search, g as getWeatherIcon, a as getAlertTypeIcon, O as OctagonAlert } from "./helpers-CyR5Eqg0.js";
import { m as motion } from "./proxy-BnzXBVOQ.js";
import { A as AnimatePresence, C as CircleAlert } from "./index-LDaAj6KU.js";
import { U as Users } from "./users-Dmry0I9E.js";
import { M as MapPin } from "./map-pin-Cgo33kKH.js";
import { S as ShieldCheck } from "./shield-check-DegrT2Xv.js";
import { L as Locate } from "./locate-BVRm7pG1.js";
import { D as Droplets } from "./droplets-DxScbxHF.js";
import { W as Wind } from "./wind-CQoE7Di7.js";
import "./zap-CeQEFHlo.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M13 2a9 9 0 0 1 9 9", key: "1itnx2" }],
  ["path", { d: "M13 6a5 5 0 0 1 5 5", key: "11nki7" }],
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const PhoneCall = createLucideIcon("phone-call", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z", key: "17jzev" }]
];
const Thermometer = createLucideIcon("thermometer", __iconNode);
function useWeather() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["weather"],
    queryFn: async () => {
      if (!actor) return MOCK_WEATHER;
      try {
        const result = await actor.getWeather();
        return result;
      } catch {
        return MOCK_WEATHER;
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
const TICKER_MESSAGES = [
  "🚨 URGENT: Severe Flood Warning — Downtown Metro Area. Evacuate Zone A & B immediately.",
  "⚠️ Cyclone Watch: Cat-2 Tropical Cyclone Riya approaching Eastern Coast — all vessels return to port.",
  "🌧️ Heavy Rain Advisory in effect for Northern Suburbs until 6:00 PM — avoid underpasses.",
  "🏠 12 Emergency Shelters OPEN — Community Center East has capacity (78/300).",
  "📢 NDRF teams deployed in Westbank Lowlands — call 1078 for evacuation assistance.",
  "✅ All Clear: Northern Region storm has passed — inspect property before re-entering."
];
function AlertTicker({ messages }) {
  const [idx, setIdx] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 4200);
    return () => clearInterval(t);
  }, [messages.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-destructive/90 text-destructive-foreground py-2 px-4 flex items-center gap-3 overflow-hidden",
      "aria-live": "polite",
      "aria-label": "Live emergency ticker",
      "data-ocid": "alert-ticker",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4 flex-shrink-0 animate-pulse", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest flex-shrink-0", children: "LIVE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden relative h-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "absolute inset-0 text-xs font-semibold truncate flex items-center",
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -8 },
            transition: { duration: 0.3 },
            children: messages[idx]
          },
          idx
        ) }) })
      ]
    }
  );
}
function HeroSection({ onSOSOpen }) {
  const { data: alerts } = useAlerts();
  const activeCount = (alerts ?? []).filter(
    (a) => a.severity === Severity.danger || a.severity === Severity.warning
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative overflow-hidden",
      style: {
        background: "linear-gradient(135deg, oklch(0.17 0.05 240) 0%, oklch(0.21 0.09 220) 55%, oklch(0.15 0.06 200) 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.07] pointer-events-none",
            style: {
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.06) 12px, rgba(255,255,255,0.06) 24px)"
            },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-4 pt-10 pb-8 text-center", children: [
          activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "inline-flex items-center gap-2 bg-destructive/30 border border-destructive/60 rounded-full px-3 py-1 mb-5",
              initial: { opacity: 0, scale: 0.88 },
              animate: { opacity: 1, scale: 1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-2 h-2 rounded-full bg-destructive animate-pulse",
                    "aria-hidden": true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-white", children: [
                  activeCount,
                  " Active Alert",
                  activeCount !== 1 ? "s" : "",
                  " — Act Now"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.h1,
            {
              className: "text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight mb-3",
              initial: { opacity: 0, y: 22 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              children: [
                "Stay Alert,",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "oklch(0.75 0.18 200)" }, children: "Stay Safe" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              className: "text-sm text-white/65 max-w-xs mx-auto mb-7 leading-relaxed",
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              children: "Real-time disaster alerts, emergency guidance, and nearest shelters — all in one place."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex flex-col sm:flex-row gap-3 justify-center",
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.3 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alerts", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "btn-touch gap-2 font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground w-full sm:w-auto min-w-[160px]",
                    "data-ocid": "hero-view-alerts-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4", "aria-hidden": true }),
                      "View Live Alerts"
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "btn-touch gap-2 font-bold border-white/30 text-white hover:bg-white/10 w-full sm:w-auto min-w-[160px]",
                    onClick: onSOSOpen,
                    "data-ocid": "hero-emergency-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-4 h-4", "aria-hidden": true }),
                      "Emergency Help"
                    ]
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
const STATS = [
  { icon: Shield, label: "500+ Shelters", sub: "Active & Verified" },
  { icon: Bell, label: "24/7 Monitoring", sub: "Live Alerts" },
  { icon: Users, label: "50K+ Users Safe", sub: "This Season" },
  { icon: MapPin, label: "15 Districts", sub: "Covered" }
];
function StatBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-3", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "flex items-center gap-2.5",
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.05 + i * 0.08 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-5 h-5 flex-shrink-0 opacity-80", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold leading-tight", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] opacity-75 leading-tight", children: s.sub })
        ] })
      ]
    },
    s.label
  )) }) });
}
function StatusGrid() {
  const { data: alerts } = useAlerts();
  const dangerCount = (alerts ?? []).filter(
    (a) => a.severity === Severity.danger
  ).length;
  const warningCount = (alerts ?? []).filter(
    (a) => a.severity === Severity.warning
  ).length;
  const FloodIcon = getAlertTypeIcon(
    "flood"
  );
  const StormIcon = getAlertTypeIcon(
    "storm"
  );
  const STATUS_ITEMS = [
    {
      label: "MAJOR THREAT",
      sub: "FLOOD",
      detail: `${dangerCount} Alerts Active`,
      note: "Immediate Action Required",
      Icon: FloodIcon,
      color: "bg-destructive text-destructive-foreground"
    },
    {
      label: "WARNING",
      sub: "HEAVY RAIN",
      detail: `${warningCount} Advisories`,
      note: "Monitor Local Reports",
      Icon: StormIcon,
      color: "bg-warning text-warning-foreground"
    },
    {
      label: "SAFE ZONES",
      sub: "OPEN",
      detail: "12 Designated Shelters",
      note: "Check Closest Facility",
      Icon: Shield,
      color: "bg-primary text-primary-foreground"
    },
    {
      label: "TRAFFIC",
      sub: "DELAYS",
      detail: "Route Closures",
      note: "Avoid Low-Lying Roads",
      Icon: OctagonAlert,
      color: "bg-accent text-accent-foreground"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "status-grid-heading", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id: "status-grid-heading",
        className: "text-lg font-display font-bold text-foreground mb-3",
        children: "Live Emergency Status"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: STATUS_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: `rounded-xl p-3 ${item.color}`,
        initial: { opacity: 0, scale: 0.94 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { delay: i * 0.08 },
        "data-ocid": `status-card-${i}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.Icon, { className: "w-5 h-5 flex-shrink-0", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wide opacity-90 leading-tight", children: item.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-extrabold leading-tight", children: item.sub })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold mt-1", children: item.detail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-80", children: item.note })
        ]
      },
      item.label
    )) })
  ] });
}
function WeatherWidget() {
  const { data: weather, isLoading } = useWeather();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20" }, k)) })
    ] });
  }
  if (!weather) return null;
  const WeatherIcon = getWeatherIcon(weather.condition);
  const isAdverse = weather.condition === WeatherCondition.stormy || weather.condition === WeatherCondition.rainy;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `overflow-hidden border ${isAdverse ? "border-warning/40 bg-warning/5" : "border-success/30 bg-success/5"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm font-semibold text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary", "aria-hidden": true }),
            weather.location
          ] }),
          isAdverse && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-warning/20 text-warning border-warning/30 text-[10px]", children: "Severe Weather" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WeatherIcon,
            {
              className: `w-10 h-10 ${isAdverse ? "text-warning" : "text-success"}`,
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl font-display font-bold text-foreground", children: [
            Number(weather.temperature),
            "°C"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 text-xs text-muted-foreground mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "w-3.5 h-3.5 text-primary", "aria-hidden": true }),
            Number(weather.humidity),
            "% Humidity"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wind, { className: "w-3.5 h-3.5 text-primary", "aria-hidden": true }),
            Number(weather.windSpeed),
            " km/h Wind"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Thermometer, { className: "w-3.5 h-3.5 text-primary", "aria-hidden": true }),
            "Feels ",
            Number(weather.temperature) - 2,
            "°C"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-border/50 flex gap-3 overflow-x-auto", children: weather.forecast.map((f) => {
          const FIcon = getWeatherIcon(f.condition);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-1 min-w-[44px]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: f.time }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(FIcon, { className: "w-4 h-4 text-foreground/60", "aria-hidden": true })
              ]
            },
            f.time
          );
        }) })
      ] })
    }
  );
}
function LocationSection() {
  const { location, isLoading, error, requestLocation, hasPermission } = useLocation();
  const [manualInput, setManualInput] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 border-primary/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-base font-display font-bold text-foreground mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary", "aria-hidden": true }),
      "Your Location"
    ] }),
    location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2 text-sm text-success font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 flex-shrink-0", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: location.label })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive mb-2 flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 flex-shrink-0", "aria-hidden": true }),
      error
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Search,
        {
          className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
          "aria-hidden": true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          className: "pl-9 h-11 text-sm",
          placeholder: "Enter city or area name…",
          value: manualInput,
          onChange: (e) => setManualInput(e.target.value),
          "aria-label": "Enter location manually",
          "data-ocid": "location-input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        className: "w-full btn-touch gap-2 font-semibold",
        variant: hasPermission === false ? "outline" : "default",
        onClick: requestLocation,
        disabled: isLoading,
        "aria-label": "Detect my location via GPS",
        "data-ocid": "detect-location-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Locate, { className: "w-4 h-4", "aria-hidden": true }),
          isLoading ? "Detecting…" : "Detect My Location"
        ]
      }
    )
  ] });
}
function QuickActions({ onSOSOpen }) {
  const ACTIONS = [
    {
      label: "View All Alerts",
      icon: Bell,
      to: "/alerts",
      color: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
      ocid: "quick-view-alerts"
    },
    {
      label: "Find Safe Places",
      icon: Shield,
      to: "/safe-places",
      color: "bg-primary hover:bg-primary/90 text-primary-foreground",
      ocid: "quick-find-shelter"
    },
    {
      label: "Safety Tips",
      icon: ShieldCheck,
      to: "/safety-tips",
      color: "bg-success hover:bg-success/90 text-success-foreground",
      ocid: "quick-safety-tips"
    },
    {
      label: "Resources",
      icon: MapPin,
      to: "/resources",
      color: "bg-accent hover:bg-accent/90 text-accent-foreground",
      ocid: "quick-resources"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "quick-actions-heading", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        id: "quick-actions-heading",
        className: "text-lg font-display font-bold text-foreground mb-3",
        children: "Quick Access"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-3", children: ACTIONS.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.07 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: action.to, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: `w-full rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[80px] font-semibold text-sm transition-smooth ${action.color}`,
            "data-ocid": action.ocid,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { className: "w-6 h-6", "aria-hidden": true }),
              action.label
            ]
          }
        ) })
      },
      action.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        className: "w-full rounded-xl p-4 flex items-center justify-center gap-3 min-h-[64px] font-bold text-base bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-smooth shadow-md",
        onClick: onSOSOpen,
        whileTap: { scale: 0.97 },
        "aria-label": "Open SOS and emergency helplines",
        "data-ocid": "quick-emergency-help",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-6 h-6 animate-pulse", "aria-hidden": true }),
          "Emergency Help — SOS"
        ]
      }
    )
  ] });
}
const QUICK_HELPLINES = [
  { name: "Police", number: "100", colorClass: "text-primary" },
  { name: "Ambulance", number: "108", colorClass: "text-destructive" },
  { name: "Fire", number: "101", colorClass: "text-accent" },
  { name: "Disaster", number: "1077", colorClass: "text-warning" }
];
function HelplineBar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-xl p-4",
      "aria-label": "Emergency helplines",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-foreground mb-3 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: "w-4 h-4 text-destructive", "aria-hidden": true }),
          "Emergency Helplines"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: QUICK_HELPLINES.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:${h.number}`,
            className: "flex flex-col items-center justify-center rounded-lg bg-muted/60 p-3 text-center hover:bg-muted transition-smooth min-h-[60px]",
            "aria-label": `Call ${h.name}: ${h.number}`,
            "data-ocid": `helpline-${h.number}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xl font-display font-extrabold ${h.colorClass}`,
                  children: h.number
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground mt-0.5 font-medium", children: h.name })
            ]
          },
          h.number
        )) })
      ]
    }
  );
}
function LiveAlertsPreview() {
  const { data: alerts, isLoading } = useAlerts();
  const topAlerts = (alerts ?? []).filter((a) => a.severity === Severity.danger).slice(0, 3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "live-alerts-heading", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "h2",
        {
          id: "live-alerts-heading",
          className: "text-lg font-display font-bold text-foreground flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-2 h-2 rounded-full bg-destructive animate-pulse inline-block",
                "aria-hidden": true
              }
            ),
            "Active Danger Alerts"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/alerts",
          className: "text-xs font-semibold text-primary hover:underline",
          "data-ocid": "view-all-alerts-link",
          children: "View All →"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }, k)) }) : topAlerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 gap-3 text-center bg-success/5 rounded-xl border border-success/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 text-success", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No active danger alerts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All clear in your area. Stay prepared." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "live-alerts-list", children: topAlerts.map((alert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -16 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCard, { alert, compact: true })
      },
      String(alert.id)
    )) })
  ] });
}
const SAMPLE_SHELTERS = [
  {
    name: "Community Center East",
    distance: "0.8 mi",
    capacity: "78/300",
    full: false
  },
  {
    name: "Civic Pavilion",
    distance: "1.2 mi",
    capacity: "310/310",
    full: true
  },
  {
    name: "School Gymnasium Shelter",
    distance: "2.3 mi",
    capacity: "42/200",
    full: false
  }
];
function NearbyShelters() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "shelters-heading", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h2",
        {
          id: "shelters-heading",
          className: "text-lg font-display font-bold text-foreground",
          children: "Open Emergency Shelters"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/safe-places",
          className: "text-xs font-semibold text-primary hover:underline",
          "data-ocid": "view-all-shelters-link",
          children: "See All →"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: SAMPLE_SHELTERS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -12 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.08 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "p-3 flex items-center justify-between gap-3",
            "data-ocid": `shelter-card-${i}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center ${s.full ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5", "aria-hidden": true })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    s.distance,
                    " · Cap: ",
                    s.capacity
                  ] })
                ] })
              ] }),
              s.full ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/10 text-destructive border-destructive/30 text-xs flex-shrink-0", children: "FULL" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/safe-places", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "text-xs h-8 border-primary/40 text-primary hover:bg-primary/10 flex-shrink-0",
                  "data-ocid": `shelter-directions-${i}`,
                  children: "Directions"
                }
              ) })
            ]
          }
        )
      },
      s.name
    )) })
  ] });
}
function Home() {
  const { openSOS } = useSOSContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTicker, { messages: TICKER_MESSAGES }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, { onSOSOpen: openSOS }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatBar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-2xl mx-auto px-4 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.12 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(LocationSection, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 18 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.22 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherWidget, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusGrid, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActions, { onSOSOpen: openSOS })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(HelplineBar, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveAlertsPreview, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(NearbyShelters, {})
        }
      )
    ] })
  ] });
}
export {
  Home
};
