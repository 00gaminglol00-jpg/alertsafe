import { c as createLucideIcon, j as jsxRuntimeExports, S as Severity } from "./index-Bhx4ae-j.js";
import { b as getSeverityColor, d as getSeverityIcon, e as getSeverityLabel, a as getAlertTypeIcon, h as getAlertTypeLabel, c as formatTime, f as formatPopulation } from "./helpers-CyR5Eqg0.js";
import { M as MapPin, C as Clock } from "./map-pin-Cgo33kKH.js";
import { U as Users } from "./users-Dmry0I9E.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function SeverityBadge({
  severity,
  className = ""
}) {
  const colors = getSeverityColor(severity);
  const Icon = getSeverityIcon(severity);
  const label = getSeverityLabel(severity);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `alert-badge ${colors.badge} ${className}`,
      "aria-label": `Severity: ${label}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
        label
      ]
    }
  );
}
function AlertTypeBadge({
  alertType,
  className = ""
}) {
  const Icon = getAlertTypeIcon(alertType);
  const label = getAlertTypeLabel(alertType);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `alert-badge bg-secondary text-secondary-foreground ${className}`,
      "aria-label": `Alert type: ${label}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
        label
      ]
    }
  );
}
function AlertCard({ alert, compact = false, onClick }) {
  const colors = getSeverityColor(alert.severity);
  const TypeIcon = getAlertTypeIcon(alert.alertType);
  const isPulse = alert.severity === Severity.danger;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "article",
    {
      className: `border rounded-lg ${colors.border} ${colors.bg} overflow-hidden transition-smooth cursor-pointer hover:shadow-alert-active group`,
      onClick,
      onKeyDown: (e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
      },
      tabIndex: onClick ? 0 : void 0,
      role: onClick ? "button" : void 0,
      "aria-label": `Alert: ${alert.title}`,
      "data-ocid": `alert-card-${alert.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${colors.badge} ${isPulse ? "animate-pulse-alert" : ""}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeIcon, { className: "w-5 h-5", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SeverityBadge, { severity: alert.severity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTypeBadge, { alertType: alert.alertType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-sm leading-snug line-clamp-2", children: alert.title })
          ] }),
          onClick && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-smooth" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[140px]", children: alert.affectedArea })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3", "aria-hidden": "true" }),
            formatTime(alert.issuedAt)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3", "aria-hidden": "true" }),
            formatPopulation(alert.affectedPopulation),
            " affected"
          ] })
        ] }),
        !compact && alert.recommendedActions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground mb-1.5", children: "Recommended Actions:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1", children: [
            alert.recommendedActions.slice(0, 3).map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-1.5 text-xs text-muted-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${colors.text} bg-current`
                    }
                  ),
                  action
                ]
              },
              `action-${alert.id}-${i}`
            )),
            alert.recommendedActions.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-muted-foreground pl-3", children: [
              "+",
              alert.recommendedActions.length - 3,
              " more actions"
            ] })
          ] })
        ] })
      ] })
    }
  );
}
export {
  AlertCard as A,
  SeverityBadge as S,
  AlertTypeBadge as a
};
