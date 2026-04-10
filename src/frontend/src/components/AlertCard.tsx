import { Card } from "@/components/ui/card";
import { ChevronRight, Clock, MapPin, Users } from "lucide-react";
import type { AlertRecord } from "../types";
import { Severity } from "../types";
import {
  formatPopulation,
  formatTime,
  getAlertTypeIcon,
  getSeverityColor,
} from "../utils/helpers";
import { AlertTypeBadge, SeverityBadge } from "./SeverityBadge";

interface AlertCardProps {
  alert: AlertRecord;
  compact?: boolean;
  onClick?: () => void;
}

export function AlertCard({ alert, compact = false, onClick }: AlertCardProps) {
  const colors = getSeverityColor(alert.severity);
  const TypeIcon = getAlertTypeIcon(alert.alertType);
  const isPulse = alert.severity === Severity.danger;

  return (
    <article
      className={`border rounded-lg ${colors.border} ${colors.bg} overflow-hidden transition-smooth cursor-pointer hover:shadow-alert-active group`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
      }}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={`Alert: ${alert.title}`}
      data-ocid={`alert-card-${alert.id}`}
    >
      <div className="p-4">
        {/* Top Row */}
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${colors.badge} ${isPulse ? "animate-pulse-alert" : ""}`}
          >
            <TypeIcon className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <SeverityBadge severity={alert.severity} />
              <AlertTypeBadge alertType={alert.alertType} />
            </div>
            <h3 className="font-display font-bold text-foreground text-sm leading-snug line-clamp-2">
              {alert.title}
            </h3>
          </div>
          {onClick && (
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-smooth" />
          )}
        </div>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            <span className="truncate max-w-[140px]">{alert.affectedArea}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {formatTime(alert.issuedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" aria-hidden="true" />
            {formatPopulation(alert.affectedPopulation)} affected
          </span>
        </div>

        {/* Actions — shown when not compact */}
        {!compact && alert.recommendedActions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs font-semibold text-foreground mb-1.5">
              Recommended Actions:
            </p>
            <ul className="space-y-1">
              {alert.recommendedActions.slice(0, 3).map((action, i) => (
                <li
                  key={`action-${alert.id}-${i}`}
                  className="flex items-start gap-1.5 text-xs text-muted-foreground"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${colors.text} bg-current`}
                  />
                  {action}
                </li>
              ))}
              {alert.recommendedActions.length > 3 && (
                <li className="text-xs text-muted-foreground pl-3">
                  +{alert.recommendedActions.length - 3} more actions
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
