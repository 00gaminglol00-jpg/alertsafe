import type { AlertType, Severity } from "../types";
import {
  getAlertTypeIcon,
  getAlertTypeLabel,
  getSeverityColor,
  getSeverityIcon,
  getSeverityLabel,
} from "../utils/helpers";

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({
  severity,
  className = "",
}: SeverityBadgeProps) {
  const colors = getSeverityColor(severity);
  const Icon = getSeverityIcon(severity);
  const label = getSeverityLabel(severity);

  return (
    <span
      className={`alert-badge ${colors.badge} ${className}`}
      aria-label={`Severity: ${label}`}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}

interface AlertTypeBadgeProps {
  alertType: AlertType;
  className?: string;
}

export function AlertTypeBadge({
  alertType,
  className = "",
}: AlertTypeBadgeProps) {
  const Icon = getAlertTypeIcon(alertType);
  const label = getAlertTypeLabel(alertType);

  return (
    <span
      className={`alert-badge bg-secondary text-secondary-foreground ${className}`}
      aria-label={`Alert type: ${label}`}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
