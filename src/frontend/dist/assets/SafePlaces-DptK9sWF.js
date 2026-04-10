import { c as createLucideIcon, j as jsxRuntimeExports, x as Phone, b as Button, E as ExternalLink, a as createActor, y as MOCK_RESOURCES, r as reactExports, X, z as ResourceType, f as Badge, e as Skeleton, C as Dialog, G as DialogContent, H as DialogHeader, I as DialogTitle } from "./index-Bhx4ae-j.js";
import { I as Input } from "./input-CCdPQ4HW.js";
import { i as getResourceTypeIcon, j as getResourceTypeColor, k as getResourceTypeLabel, l as formatDistance, S as Search, H as Hospital, m as ShieldAlert, F as Flame, P as Package } from "./helpers-CyR5Eqg0.js";
import { C as Clock, M as MapPin } from "./map-pin-Cgo33kKH.js";
import { u as useLocation } from "./useLocation-D7SLsDPe.js";
import { u as useActor, a as useQuery } from "./useActor-D2lKGfZ7.js";
import { m as motion } from "./proxy-BnzXBVOQ.js";
import { C as CircleCheck } from "./circle-check-B0iQjCc-.js";
import { F as Funnel } from "./funnel-BkhxDE9b.js";
import "./wind-CQoE7Di7.js";
import "./zap-CeQEFHlo.js";
import "./shield-check-DegrT2Xv.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const LocateFixed = createLucideIcon("locate-fixed", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode);
function ResourceCard({ resource, compact = false }) {
  const TypeIcon = getResourceTypeIcon(resource.resourceType);
  const colors = getResourceTypeColor(resource.resourceType);
  const typeLabel = getResourceTypeLabel(resource.resourceType);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "article",
    {
      className: "border border-border bg-card hover:shadow-alert-active transition-smooth overflow-hidden rounded-lg",
      "aria-label": `${typeLabel}: ${resource.name}`,
      "data-ocid": `resource-card-${resource.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${colors.bg}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: `w-5 h-5 ${colors.text}`, "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-semibold rounded px-2 py-0.5 ${colors.badge}`,
                children: typeLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm mt-1 leading-snug line-clamp-2", children: resource.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded", children: formatDistance(resource.distanceKm) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-start gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Navigation,
              {
                className: "w-3 h-3 mt-0.5 flex-shrink-0",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: resource.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 flex-shrink-0", "aria-hidden": "true" }),
            resource.hoursOfOperation
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3 flex-shrink-0", "aria-hidden": "true" }),
            resource.phone
          ] })
        ] }),
        !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/50 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `tel:${resource.phone}`,
              className: "flex-1",
              "data-ocid": `resource-call-${resource.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "w-full gap-1.5 btn-touch",
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
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "w-full gap-1.5 btn-touch", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                "Directions"
              ] })
            }
          )
        ] })
      ] })
    }
  );
}
function useResources() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      if (!actor) return MOCK_RESOURCES;
      try {
        const result = await actor.getResources();
        return result;
      } catch {
        return MOCK_RESOURCES;
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
const MAP_BOUNDS = {
  minLat: 28.603,
  maxLat: 28.637,
  minLng: 77.193,
  maxLng: 77.222
};
function latToY(lat) {
  return (MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat) * 100;
}
function lngToX(lng) {
  return (lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng) * 100;
}
const PIN_TOKEN_CLASS = {
  [ResourceType.hospital]: "text-destructive",
  [ResourceType.police]: "text-primary",
  [ResourceType.fire]: "text-accent",
  [ResourceType.supply]: "text-success",
  [ResourceType.shelter]: "text-warning"
};
function pinTokenClass(type) {
  return PIN_TOKEN_CLASS[type] ?? "text-muted-foreground";
}
function MapPinMarker({ resource, isSelected, onClick }) {
  const x = lngToX(resource.lng);
  const y = latToY(resource.lat);
  const colorClass = pinTokenClass(resource.resourceType);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      type: "button",
      "aria-label": `Pin: ${resource.name}`,
      "data-ocid": `map-pin-${resource.id}`,
      style: { left: `${x}%`, top: `${y}%` },
      className: "absolute -translate-x-1/2 -translate-y-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-6 h-6 rounded-full border-2 border-card shadow-md transition-smooth flex items-center justify-center bg-card ${isSelected ? "scale-125 z-10" : "hover:scale-110"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: `w-3 h-3 ${colorClass}`, strokeWidth: 2.5 })
          }
        ),
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-1/2 top-full mt-1 z-20 bg-card border border-border rounded px-2 py-1 text-xs font-semibold text-foreground whitespace-nowrap shadow-md pointer-events-none", children: resource.name })
      ]
    }
  );
}
function MapBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      className: "absolute inset-0 w-full h-full",
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100", height: "100", fill: "#e8eedc" }),
        [
          [5, 5, 18, 14],
          [28, 5, 20, 14],
          [53, 5, 22, 14],
          [80, 5, 15, 14],
          [5, 28, 14, 20],
          [24, 25, 28, 22],
          [58, 26, 18, 20],
          [82, 25, 14, 22],
          [5, 56, 18, 18],
          [28, 56, 24, 18],
          [58, 56, 18, 18],
          [80, 56, 14, 18],
          [5, 80, 20, 16],
          [32, 80, 22, 16],
          [60, 80, 18, 16],
          [83, 80, 12, 16]
        ].map(([x, y, w, h]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x,
            y,
            width: w,
            height: h,
            rx: "1",
            fill: "#d4dfc8",
            stroke: "#c8d4ba",
            strokeWidth: "0.3"
          },
          `${x}-${y}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "30", y: "48", width: "24", height: "7", rx: "1.5", fill: "#a8d5a2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "30",
            y: "48",
            width: "24",
            height: "7",
            rx: "1.5",
            fill: "none",
            stroke: "#7eba78",
            strokeWidth: "0.3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "21", width: "100", height: "4", fill: "#ffffff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "48", width: "100", height: "4", fill: "#ffffff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0", y: "76", width: "100", height: "4", fill: "#ffffff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "22", y: "0", width: "4", height: "100", fill: "#ffffff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "52", y: "0", width: "4", height: "100", fill: "#ffffff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "78", y: "0", width: "4", height: "100", fill: "#ffffff" }),
        [0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: x + 1,
            y: 22.8,
            width: 5,
            height: 0.4,
            fill: "#d0c060",
            opacity: "0.5"
          },
          x
        )),
        [0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: 23.8,
            y: y + 1,
            width: 0.4,
            height: 5,
            fill: "#d0c060",
            opacity: "0.5"
          },
          y
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M0,68 Q15,66 30,68 Q45,70 60,67 Q75,64 100,67",
            stroke: "#93c5fd",
            strokeWidth: "3",
            fill: "none",
            opacity: "0.6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "50",
            cy: "50",
            r: "2.5",
            fill: "#2563eb",
            stroke: "#ffffff",
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "5", fill: "#2563eb", fillOpacity: "0.2" })
      ]
    }
  );
}
function ResourceDetailModal({ resource, onClose }) {
  if (!resource) return null;
  const TypeIcon = getResourceTypeIcon(resource.resourceType);
  const colors = getResourceTypeColor(resource.resourceType);
  const typeLabel = getResourceTypeLabel(resource.resourceType);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!resource, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "sm:max-w-md",
      "aria-label": `Details for ${resource.name}`,
      "data-ocid": "resource-detail-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: `w-6 h-6 ${colors.text}` })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-bold rounded-full px-2.5 py-0.5 ${colors.badge}`,
                children: typeLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-base font-display font-bold leading-snug mt-1", children: resource.name })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/15", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "w-4 h-4 text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
              formatDistance(resource.distanceKm),
              " from your location"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 mt-0.5 flex-shrink-0 text-foreground/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: resource.address })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 flex-shrink-0 text-foreground/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: resource.hoursOfOperation })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 flex-shrink-0 text-foreground/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: resource.phone })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 flex-shrink-0 text-success" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success font-medium", children: "Available — accepting arrivals" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `tel:${resource.phone}`,
                className: "flex-1",
                "data-ocid": `modal-call-${resource.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full gap-2 btn-touch", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }),
                  "Call Now"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: mapsUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex-1",
                "data-ocid": `modal-directions-${resource.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full gap-2 btn-touch", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
                  "Get Directions"
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
const FILTER_OPTIONS = [
  { label: "All", value: "all", Icon: MapPin },
  { label: "Hospital", value: ResourceType.hospital, Icon: Hospital },
  { label: "Shelter", value: ResourceType.shelter, Icon: MapPin },
  { label: "Police", value: ResourceType.police, Icon: ShieldAlert },
  { label: "Fire", value: ResourceType.fire, Icon: Flame },
  { label: "Supply", value: ResourceType.supply, Icon: Package }
];
const RADIUS_OPTIONS = [5, 10, 20];
function SafePlaces() {
  const { data: resources, isLoading } = useResources();
  const {
    location,
    isLoading: isLocating,
    error: locError,
    requestLocation
  } = useLocation();
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [radiusKm, setRadiusKm] = reactExports.useState(10);
  const [selectedResource, setSelectedResource] = reactExports.useState(null);
  const [mapPinSelected, setMapPinSelected] = reactExports.useState(null);
  const filteredResources = reactExports.useMemo(() => {
    if (!resources) return [];
    return resources.filter((r) => {
      const matchType = activeFilter === "all" || r.resourceType === activeFilter;
      const matchSearch = !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRadius = r.distanceKm <= radiusKm;
      return matchType && matchSearch && matchRadius;
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [resources, activeFilter, searchQuery, radiusKm]);
  const mapResources = reactExports.useMemo(() => {
    if (!resources) return [];
    return resources.filter((r) => {
      const matchType = activeFilter === "all" || r.resourceType === activeFilter;
      return matchType && r.distanceKm <= radiusKm;
    });
  }, [resources, activeFilter, radiusKm]);
  function handleSelectResource(resource) {
    setSelectedResource(resource);
    setMapPinSelected(resource.id);
  }
  function handleCloseModal() {
    setSelectedResource(null);
    setMapPinSelected(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 py-8 sm:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-primary", children: "Safe Places" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight", children: "Find Safe Places Near You" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground max-w-xl", children: "Locate the nearest shelters, hospitals, police stations, fire brigades, and relief supply centers in your area." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.1 },
          className: "bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3",
          "data-ocid": "location-bar",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
              isLocating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 text-primary animate-spin flex-shrink-0" }) : location ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current Location" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: isLocating ? "Detecting your location…" : location ? location.label : "Location not detected" }),
                locError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-warning mt-0.5", children: locError })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: requestLocation,
                disabled: isLocating,
                className: "gap-2 btn-touch flex-shrink-0",
                "data-ocid": "detect-location-btn",
                children: [
                  isLocating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LocateFixed, { className: "w-4 h-4" }),
                  location ? "Update Location" : "Share My Location"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.18 },
          className: "space-y-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
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
                  placeholder: "Search by name or address…",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "pl-9 btn-touch",
                  "data-ocid": "resource-search"
                }
              ),
              searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSearchQuery(""),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                  "aria-label": "Clear search",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 overflow-x-auto pb-1",
                "aria-label": "Filter by type",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Funnel,
                    {
                      className: "w-4 h-4 text-muted-foreground flex-shrink-0",
                      "aria-hidden": "true"
                    }
                  ),
                  FILTER_OPTIONS.map(({ label, value, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveFilter(value),
                      "data-ocid": `filter-${String(value)}`,
                      "aria-pressed": activeFilter === value,
                      className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-smooth flex-shrink-0 ${activeFilter === value ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
                        label
                      ]
                    },
                    String(value)
                  ))
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", "aria-label": "Distance radius", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium flex-shrink-0", children: "Radius:" }),
              RADIUS_OPTIONS.map((km) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setRadiusKm(km),
                  "data-ocid": `radius-${km}`,
                  "aria-pressed": radiusKm === km,
                  className: `px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${radiusKm === km ? "bg-destructive text-destructive-foreground border-destructive" : "bg-card text-muted-foreground border-border hover:border-destructive/40"}`,
                  children: [
                    km,
                    " km"
                  ]
                },
                km
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
                "—",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: filteredResources.length }),
                " ",
                "place",
                filteredResources.length !== 1 ? "s" : "",
                " found"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.97 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.4, delay: 0.22 },
            className: "lg:col-span-3",
            "data-ocid": "map-panel",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-border flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold text-foreground", children: "Interactive Map" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex items-center gap-3 text-xs text-muted-foreground", children: [
                  { tokenClass: "bg-destructive", label: "Hospital" },
                  { tokenClass: "bg-primary", label: "Police" },
                  { tokenClass: "bg-accent", label: "Fire" },
                  { tokenClass: "bg-success", label: "Supply" },
                  { tokenClass: "bg-warning", label: "Shelter" }
                ].map(({ tokenClass, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `w-2.5 h-2.5 rounded-full border border-card/50 ${tokenClass}`
                    }
                  ),
                  label
                ] }, label)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full", style: { paddingBottom: "68%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapBackground, {}),
                mapResources.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MapPinMarker,
                  {
                    resource: r,
                    isSelected: mapPinSelected === r.id,
                    onClick: () => {
                      if (mapPinSelected === r.id) {
                        setMapPinSelected(null);
                        setSelectedResource(null);
                      } else {
                        handleSelectResource(r);
                      }
                    }
                  },
                  String(r.id)
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "absolute -translate-x-1/2 -translate-y-1/2 z-20",
                    style: { left: "50%", top: "50%" },
                    "aria-label": "Your location",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 bg-primary rounded-full border-2 border-card shadow-lg" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-primary/30 rounded-full animate-ping" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute rounded-full border-2 border-primary/20 bg-primary/5 pointer-events-none -translate-x-1/2 -translate-y-1/2",
                    style: {
                      left: "50%",
                      top: "50%",
                      width: `${radiusKm / 20 * 80}%`,
                      paddingBottom: `${radiusKm / 20 * 80}%`
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 right-2 text-xs text-muted-foreground bg-card/80 px-1.5 py-0.5 rounded pointer-events-none", children: "Metro City Area" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden px-4 py-2 border-t border-border flex flex-wrap gap-2", children: [
                { tokenClass: "bg-destructive", label: "Hospital" },
                { tokenClass: "bg-primary", label: "Police" },
                { tokenClass: "bg-accent", label: "Fire" },
                { tokenClass: "bg-success", label: "Supply" },
                { tokenClass: "bg-warning", label: "Shelter" }
              ].map(({ tokenClass, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "flex items-center gap-1 text-xs text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `w-2.5 h-2.5 rounded-full ${tokenClass}`
                      }
                    ),
                    label
                  ]
                },
                label
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-3", "data-ocid": "resource-list", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-bold text-foreground", children: "Nearby Resources" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
              filteredResources.length,
              " results"
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, i)) }) : filteredResources.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-8 text-center",
              "data-ocid": "empty-state-resources",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-10 h-10 text-muted-foreground/40 mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No places found" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Try expanding the radius or changing the filter." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    className: "mt-4",
                    onClick: () => {
                      setActiveFilter("all");
                      setSearchQuery("");
                      setRadiusKm(20);
                    },
                    "data-ocid": "reset-filters-btn",
                    children: "Reset Filters"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[620px] overflow-y-auto pr-0.5", children: filteredResources.map((resource, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 16 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.3, delay: idx * 0.045 },
              onClick: () => handleSelectResource(resource),
              className: `cursor-pointer rounded-xl transition-smooth ${mapPinSelected === resource.id ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"}`,
              "data-ocid": `resource-list-item-${resource.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResourceCard, { resource, compact: true })
            },
            String(resource.id)
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ResourceDetailModal,
      {
        resource: selectedResource,
        onClose: handleCloseModal
      }
    )
  ] });
}
export {
  SafePlaces
};
