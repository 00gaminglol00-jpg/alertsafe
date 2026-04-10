import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, Navigation, Phone } from "lucide-react";
import type { ResourceRecord } from "../types";
import {
  formatDistance,
  getResourceTypeColor,
  getResourceTypeIcon,
  getResourceTypeLabel,
} from "../utils/helpers";

interface ResourceCardProps {
  resource: ResourceRecord;
  compact?: boolean;
}

export function ResourceCard({ resource, compact = false }: ResourceCardProps) {
  const TypeIcon = getResourceTypeIcon(resource.resourceType);
  const colors = getResourceTypeColor(resource.resourceType);
  const typeLabel = getResourceTypeLabel(resource.resourceType);

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;

  return (
    <article
      className="border border-border bg-card hover:shadow-alert-active transition-smooth overflow-hidden rounded-lg"
      aria-label={`${typeLabel}: ${resource.name}`}
      data-ocid={`resource-card-${resource.id}`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${colors.bg}`}
          >
            <TypeIcon className={`w-5 h-5 ${colors.text}`} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={`text-xs font-semibold rounded px-2 py-0.5 ${colors.badge}`}
            >
              {typeLabel}
            </span>
            <h3 className="font-display font-bold text-foreground text-sm mt-1 leading-snug line-clamp-2">
              {resource.name}
            </h3>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
              {formatDistance(resource.distanceKm)}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          <p className="flex items-start gap-1.5">
            <Navigation
              className="w-3 h-3 mt-0.5 flex-shrink-0"
              aria-hidden="true"
            />
            <span className="truncate">{resource.address}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {resource.hoursOfOperation}
          </p>
          <p className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            {resource.phone}
          </p>
        </div>

        {/* Actions */}
        {!compact && (
          <div className="mt-3 pt-3 border-t border-border/50 flex gap-2">
            <a
              href={`tel:${resource.phone}`}
              className="flex-1"
              data-ocid={`resource-call-${resource.id}`}
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-1.5 btn-touch"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </Button>
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              data-ocid={`resource-directions-${resource.id}`}
            >
              <Button size="sm" className="w-full gap-1.5 btn-touch">
                <ExternalLink className="w-3.5 h-3.5" />
                Directions
              </Button>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
