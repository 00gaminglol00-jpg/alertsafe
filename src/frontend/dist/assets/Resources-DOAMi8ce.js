import { c as createLucideIcon, r as reactExports, y as MOCK_RESOURCES, j as jsxRuntimeExports, b as Button, f as Badge, z as ResourceType, X, x as Phone, E as ExternalLink } from "./index-Bhx4ae-j.js";
import { I as Input } from "./input-CCdPQ4HW.js";
import { H as Hospital, m as ShieldAlert, F as Flame, P as Package, S as Search, k as getResourceTypeLabel, j as getResourceTypeColor, i as getResourceTypeIcon, l as formatDistance } from "./helpers-CyR5Eqg0.js";
import { m as motion } from "./proxy-BnzXBVOQ.js";
import { M as MapPin, C as Clock } from "./map-pin-Cgo33kKH.js";
import { A as ArrowUpNarrowWide } from "./arrow-up-narrow-wide-CxPeQ4Sw.js";
import { C as ChevronDown } from "./chevron-down-B_K7WYQs.js";
import { F as Funnel } from "./funnel-BkhxDE9b.js";
import { C as CircleAlert, A as AnimatePresence } from "./index-LDaAj6KU.js";
import { C as CircleCheckBig } from "./circle-check-big-BIYzJ8q9.js";
import "./wind-CQoE7Di7.js";
import "./zap-CeQEFHlo.js";
import "./shield-check-DegrT2Xv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
const CATEGORIES = [
  { type: "all", label: "All Resources", icon: MapPin },
  { type: "hospital", label: "Hospitals", icon: Hospital },
  { type: "shelter", label: "Shelters", icon: MapPin },
  { type: "police", label: "Police", icon: ShieldAlert },
  { type: "fire", label: "Fire Stations", icon: Flame },
  { type: "supply", label: "Supply Centers", icon: Package }
];
const SORT_OPTIONS = [
  { value: "distance", label: "Nearest First" },
  { value: "name", label: "Name A–Z" }
];
function StatCard({
  type,
  count,
  active,
  onClick
}) {
  const catEntry = CATEGORIES.find((c) => c.type === type);
  const Icon = (catEntry == null ? void 0 : catEntry.icon) ?? MapPin;
  const colors = type === "all" ? {
    bg: "bg-primary/10",
    text: "text-primary"
  } : getResourceTypeColor(ResourceType[type]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": `stat-card-${type}`,
      "aria-pressed": active,
      className: `flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        ${active ? `${colors.bg} border-current shadow-sm scale-[1.02]` : "bg-card border-border hover:bg-muted/50"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-9 h-9 rounded-lg flex items-center justify-center ${colors.bg}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${colors.text}`, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xl font-display font-bold ${active ? colors.text : "text-foreground"}`,
            children: count
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground text-center leading-tight", children: (catEntry == null ? void 0 : catEntry.label) ?? String(type) })
      ]
    }
  );
}
function DetailModal({ resource, onClose }) {
  const TypeIcon = getResourceTypeIcon(resource.resourceType);
  const colors = getResourceTypeColor(resource.resourceType);
  const typeLabel = getResourceTypeLabel(resource.resourceType);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;
  const firstFocusRef = reactExports.useRef(null);
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    var _a;
    (_a = firstFocusRef.current) == null ? void 0 : _a.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const handleCopy = reactExports.useCallback(() => {
    navigator.clipboard.writeText(`${resource.lat}, ${resource.lng}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, [resource.lat, resource.lng]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-transparent border-none m-0 w-full h-full max-w-none max-h-none",
      "aria-label": `Details: ${resource.name}`,
      style: { padding: 0 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm",
            onClick: onClose,
            onKeyUp: (e) => e.key === "Enter" && onClose(),
            role: "button",
            tabIndex: -1,
            "aria-label": "Close modal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { y: 60, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 60, opacity: 0 },
            transition: { type: "spring", damping: 24, stiffness: 300 },
            className: "relative z-10 w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${colors.bg} px-5 py-4 flex items-start gap-3`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-12 h-12 rounded-xl flex items-center justify-center ${colors.badge} flex-shrink-0`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "w-6 h-6", "aria-hidden": "true" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${colors.badge} text-xs mb-1`, children: typeLabel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground leading-snug", children: resource.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary", children: [
                    formatDistance(resource.distanceKm),
                    " away"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    ref: firstFocusRef,
                    type: "button",
                    onClick: onClose,
                    "data-ocid": "modal-close",
                    "aria-label": "Close details",
                    className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-2 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MapPin,
                      {
                        className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0",
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-0.5", children: "Address" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground", children: resource.address })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Phone,
                      {
                        className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0",
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-0.5", children: "Phone" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-mono font-semibold", children: resource.phone })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Clock,
                      {
                        className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0",
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-0.5", children: "Hours" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground", children: resource.hoursOfOperation })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MapPin,
                      {
                        className: "w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0",
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-0.5", children: "Coordinates" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "text-foreground font-mono text-xs", children: [
                        resource.lat.toFixed(4),
                        ", ",
                        resource.lng.toFixed(4)
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: `tel:${resource.phone}`,
                      "data-ocid": `modal-call-${resource.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full btn-touch gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                        "Call Now — ",
                        resource.phone
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: mapsUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "data-ocid": `modal-directions-${resource.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full btn-touch gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                        "Get Directions"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: handleCopy,
                      "data-ocid": `modal-share-${resource.id}`,
                      className: "w-full btn-touch gap-2",
                      children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-success" }),
                        "Coordinates Copied!"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                        "Share Location (Copy Coords)"
                      ] })
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function Resources() {
  var _a;
  const resources = MOCK_RESOURCES;
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sortKey, setSortKey] = reactExports.useState("distance");
  const [sortOpen, setSortOpen] = reactExports.useState(false);
  const [selectedResource, setSelectedResource] = reactExports.useState(null);
  const sortRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!sortOpen) return;
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sortOpen]);
  const typeCounts = reactExports.useMemo(() => {
    const counts = { all: resources.length };
    for (const r of resources) {
      const key = r.resourceType;
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }, [resources]);
  const filtered = reactExports.useMemo(() => {
    let list = [...resources];
    if (activeFilter !== "all") {
      list = list.filter((r) => r.resourceType === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) => r.name.toLowerCase().includes(q) || r.address.toLowerCase().includes(q)
      );
    }
    if (sortKey === "distance") {
      list.sort((a, b) => a.distanceKm - b.distanceKm);
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [resources, activeFilter, searchQuery, sortKey]);
  const currentSortLabel = ((_a = SORT_OPTIONS.find((s) => s.value === sortKey)) == null ? void 0 : _a.label) ?? "Sort";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-6 sm:py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-2 h-2 rounded-full bg-success animate-pulse",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-success uppercase tracking-widest", children: "Live Directory" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight", children: "Emergency Resources Directory" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm sm:text-base", children: "Locate hospitals, shelters, police, fire stations, and supply centers near you. All resources updated in real-time." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Filter by resource type", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sr-only", children: "Resource Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3",
            initial: "hidden",
            animate: "visible",
            variants: { visible: { transition: { staggerChildren: 0.06 } } },
            children: CATEGORIES.map(({ type }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                variants: {
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatCard,
                  {
                    type,
                    count: typeCounts[type === "all" ? "all" : type] ?? 0,
                    active: activeFilter === type,
                    onClick: () => setActiveFilter(type)
                  }
                )
              },
              type
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Search and sort controls", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "search",
                placeholder: "Search by name or address…",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-9 btn-touch",
                "data-ocid": "resources-search",
                "aria-label": "Search resources"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: sortRef, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setSortOpen((v) => !v),
                "data-ocid": "resources-sort",
                "aria-haspopup": "listbox",
                "aria-expanded": sortOpen,
                className: "btn-touch gap-2 w-full sm:w-auto justify-between",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpNarrowWide, { className: "w-4 h-4" }),
                  currentSortLabel,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronDown,
                    {
                      className: `w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`
                    }
                  )
                ]
              }
            ),
            sortOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[160px] overflow-hidden",
                role: "menu",
                "aria-label": "Sort options",
                children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    role: "menuitemradio",
                    "aria-checked": sortKey === opt.value,
                    onClick: () => {
                      setSortKey(opt.value);
                      setSortOpen(false);
                    },
                    className: `w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-muted/60
                          ${sortKey === opt.value ? "font-semibold text-primary" : "text-foreground"}`,
                    children: opt.label
                  },
                  opt.value
                ))
              }
            )
          ] })
        ] }),
        (activeFilter !== "all" || searchQuery) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Funnel,
            {
              className: "w-3.5 h-3.5 text-muted-foreground",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Active filters:" }),
          activeFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "gap-1 cursor-pointer",
              onClick: () => setActiveFilter("all"),
              "data-ocid": "filter-clear-type",
              children: [
                getResourceTypeLabel(
                  ResourceType[activeFilter]
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3", "aria-hidden": "true" })
              ]
            }
          ),
          searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "gap-1 cursor-pointer",
              onClick: () => setSearchQuery(""),
              "data-ocid": "filter-clear-search",
              children: [
                '"',
                searchQuery,
                '"',
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3", "aria-hidden": "true" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-auto", children: [
            filtered.length,
            " result",
            filtered.length !== 1 ? "s" : ""
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Resource listings", "aria-live": "polite", children: filtered.length === 0 ? (
        /* ── Empty State ── */
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            className: "flex flex-col items-center justify-center py-20 px-6 text-center bg-muted/30 rounded-2xl border border-dashed border-border",
            "data-ocid": "resources-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No resources found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-xs", children: "No resources match your current filters. Try adjusting your search or selecting a different category." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  onClick: () => {
                    setActiveFilter("all");
                    setSearchQuery("");
                  },
                  "data-ocid": "resources-clear-filters",
                  className: "gap-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
                    "Clear All Filters"
                  ]
                }
              )
            ]
          }
        )
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Showing",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
          " ",
          "of ",
          resources.length,
          " resources"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
            initial: "hidden",
            animate: "visible",
            variants: {
              visible: { transition: { staggerChildren: 0.05 } }
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((resource) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                layout: true,
                variants: {
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 }
                },
                exit: { opacity: 0, scale: 0.95 },
                transition: { duration: 0.25 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ResourceDetailCard,
                  {
                    resource,
                    onViewDetails: () => setSelectedResource(resource)
                  }
                )
              },
              String(resource.id)
            )) })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedResource && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DetailModal,
      {
        resource: selectedResource,
        onClose: () => setSelectedResource(null)
      }
    ) })
  ] });
}
function ResourceDetailCard({
  resource,
  onViewDetails
}) {
  const TypeIcon = getResourceTypeIcon(resource.resourceType);
  const colors = getResourceTypeColor(resource.resourceType);
  const typeLabel = getResourceTypeLabel(resource.resourceType);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      className: "group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-border/80 transition-smooth",
      "aria-label": `${typeLabel}: ${resource.name}`,
      "data-ocid": `resource-card-${resource.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-1 w-full ${colors.badge}`, "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: `w-5 h-5 ${colors.text}`, "aria-hidden": "true" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${colors.badge} text-[11px] px-1.5 py-0.5`, children: typeLabel }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full ml-auto", children: formatDistance(resource.distanceKm) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm mt-1.5 leading-snug line-clamp-2", children: resource.name })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-xs text-muted-foreground mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MapPin,
                {
                  className: "w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-muted-foreground/70",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2", children: resource.address })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Clock,
                {
                  className: "w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/70",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: resource.hoursOfOperation })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Phone,
                {
                  className: "w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/70",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: resource.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-3 border-t border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${resource.phone}`,
                className: "flex-1",
                "data-ocid": `resource-call-${resource.id}`,
                "aria-label": `Call ${resource.name}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "w-full gap-1.5 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                      "Call"
                    ]
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: mapsUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex-1",
                "data-ocid": `resource-directions-${resource.id}`,
                "aria-label": `Get directions to ${resource.name}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "w-full gap-1.5 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                  "Directions"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: onViewDetails,
                "data-ocid": `resource-details-${resource.id}`,
                "aria-label": `View full details for ${resource.name}`,
                className: "px-2.5",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  Resources
};
