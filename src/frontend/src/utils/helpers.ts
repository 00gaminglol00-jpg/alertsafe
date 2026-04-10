import {
  AlertOctagon,
  AlertTriangle,
  Cloud,
  CloudLightning,
  CloudRain,
  Flame,
  Hospital,
  Info,
  MapPin,
  Package,
  ShieldAlert,
  ShieldCheck,
  Sun,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { AlertType, ResourceType, Severity, WeatherCondition } from "../types";

// Severity color mappings (returns tailwind classes)
export function getSeverityColor(severity: Severity): {
  bg: string;
  text: string;
  border: string;
  badge: string;
} {
  switch (severity) {
    case Severity.danger:
      return {
        bg: "bg-destructive/10",
        text: "text-destructive",
        border: "border-destructive/30",
        badge: "bg-destructive text-destructive-foreground",
      };
    case Severity.warning:
      return {
        bg: "bg-warning/10",
        text: "text-warning",
        border: "border-warning/30",
        badge: "bg-warning text-warning-foreground",
      };
    case Severity.safe:
      return {
        bg: "bg-success/10",
        text: "text-success",
        border: "border-success/30",
        badge: "bg-success text-success-foreground",
      };
    default:
      return {
        bg: "bg-muted",
        text: "text-foreground",
        border: "border-border",
        badge: "bg-muted text-foreground",
      };
  }
}

export function getSeverityLabel(severity: Severity): string {
  switch (severity) {
    case Severity.danger:
      return "DANGER";
    case Severity.warning:
      return "WARNING";
    case Severity.safe:
      return "SAFE";
    default:
      return "INFO";
  }
}

// Alert type icon components
export function getAlertTypeIcon(alertType: AlertType): typeof AlertTriangle {
  switch (alertType) {
    case AlertType.flood:
      return Waves;
    case AlertType.cyclone:
      return Wind;
    case AlertType.earthquake:
      return Zap;
    case AlertType.storm:
      return CloudRain;
    default:
      return AlertTriangle;
  }
}

export function getAlertTypeLabel(alertType: AlertType): string {
  switch (alertType) {
    case AlertType.flood:
      return "Flood";
    case AlertType.cyclone:
      return "Cyclone";
    case AlertType.earthquake:
      return "Earthquake";
    case AlertType.storm:
      return "Storm";
    default:
      return "Alert";
  }
}

export function getSeverityIcon(severity: Severity): typeof AlertTriangle {
  switch (severity) {
    case Severity.danger:
      return AlertOctagon;
    case Severity.warning:
      return AlertTriangle;
    case Severity.safe:
      return ShieldCheck;
    default:
      return Info;
  }
}

// Resource type utilities
export function getResourceTypeIcon(resourceType: ResourceType): typeof MapPin {
  switch (resourceType) {
    case ResourceType.hospital:
      return Hospital;
    case ResourceType.police:
      return ShieldAlert;
    case ResourceType.fire:
      return Flame;
    case ResourceType.supply:
      return Package;
    case ResourceType.shelter:
      return MapPin;
    default:
      return MapPin;
  }
}

export function getResourceTypeLabel(resourceType: ResourceType): string {
  switch (resourceType) {
    case ResourceType.hospital:
      return "Hospital";
    case ResourceType.police:
      return "Police";
    case ResourceType.fire:
      return "Fire Station";
    case ResourceType.supply:
      return "Supply Center";
    case ResourceType.shelter:
      return "Shelter";
    default:
      return "Resource";
  }
}

export function getResourceTypeColor(resourceType: ResourceType): {
  bg: string;
  text: string;
  badge: string;
} {
  switch (resourceType) {
    case ResourceType.hospital:
      return {
        bg: "bg-destructive/10",
        text: "text-destructive",
        badge: "bg-destructive text-destructive-foreground",
      };
    case ResourceType.police:
      return {
        bg: "bg-primary/10",
        text: "text-primary",
        badge: "bg-primary text-primary-foreground",
      };
    case ResourceType.fire:
      return {
        bg: "bg-accent/10",
        text: "text-accent",
        badge: "bg-accent text-accent-foreground",
      };
    case ResourceType.supply:
      return {
        bg: "bg-success/10",
        text: "text-success",
        badge: "bg-success text-success-foreground",
      };
    case ResourceType.shelter:
      return {
        bg: "bg-warning/10",
        text: "text-warning",
        badge: "bg-warning text-warning-foreground",
      };
    default:
      return {
        bg: "bg-muted",
        text: "text-foreground",
        badge: "bg-muted text-foreground",
      };
  }
}

// Weather utilities
export function getWeatherIcon(condition: WeatherCondition): typeof Sun {
  switch (condition) {
    case WeatherCondition.sunny:
      return Sun;
    case WeatherCondition.cloudy:
      return Cloud;
    case WeatherCondition.rainy:
      return CloudRain;
    case WeatherCondition.stormy:
      return CloudLightning;
    default:
      return Sun;
  }
}

// Distance formatting
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

// Time formatting
export function formatTime(timestamp: bigint): string {
  const ms = Number(timestamp);
  const now = Date.now();
  const diffMs = now - ms;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hr${diffHours !== 1 ? "s" : ""} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
}

export function formatPopulation(pop: bigint): string {
  const n = Number(pop);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}
