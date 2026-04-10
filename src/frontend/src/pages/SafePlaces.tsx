import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Flame,
  Hospital,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation,
  Package,
  Phone,
  Search,
  ShieldAlert,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { ResourceCard } from "../components/ResourceCard";
import { useLocation } from "../hooks/useLocation";
import { useResources } from "../hooks/useResources";
import type { ResourceRecord } from "../types";
import { ResourceType } from "../types";
import {
  formatDistance,
  getResourceTypeColor,
  getResourceTypeIcon,
  getResourceTypeLabel,
} from "../utils/helpers";

// --- Map visualization helpers ---

const MAP_BOUNDS = {
  minLat: 28.603,
  maxLat: 28.637,
  minLng: 77.193,
  maxLng: 77.222,
};

function latToY(lat: number): number {
  return (
    ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100
  );
}
function lngToX(lng: number): number {
  return (
    ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100
  );
}

// Map pin color token classes per resource type — resolved via CSS custom properties
const PIN_TOKEN_CLASS: Record<ResourceType, string> = {
  [ResourceType.hospital]: "text-destructive",
  [ResourceType.police]: "text-primary",
  [ResourceType.fire]: "text-accent",
  [ResourceType.supply]: "text-success",
  [ResourceType.shelter]: "text-warning",
};

function pinTokenClass(type: ResourceType): string {
  return PIN_TOKEN_CLASS[type] ?? "text-muted-foreground";
}

// --- Filter types ---

type RadiusKm = 5 | 10 | 20;
type FilterType = "all" | ResourceType;

// --- Sub-components ---

interface MapPinMarkerProps {
  resource: ResourceRecord;
  isSelected: boolean;
  onClick: () => void;
}

function MapPinMarker({ resource, isSelected, onClick }: MapPinMarkerProps) {
  const x = lngToX(resource.lng);
  const y = latToY(resource.lat);
  const colorClass = pinTokenClass(resource.resourceType);

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={`Pin: ${resource.name}`}
      data-ocid={`map-pin-${resource.id}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute -translate-x-1/2 -translate-y-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div
        className={`w-6 h-6 rounded-full border-2 border-card shadow-md transition-smooth flex items-center justify-center bg-card ${isSelected ? "scale-125 z-10" : "hover:scale-110"}`}
      >
        <MapPin className={`w-3 h-3 ${colorClass}`} strokeWidth={2.5} />
      </div>
      {isSelected && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-20 bg-card border border-border rounded px-2 py-1 text-xs font-semibold text-foreground whitespace-nowrap shadow-md pointer-events-none">
          {resource.name}
        </div>
      )}
    </button>
  );
}

// Static SVG road network for map background
function MapBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect width="100" height="100" fill="#e8eedc" />

      {/* Building blocks */}
      {(
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
          [83, 80, 12, 16],
        ] as [number, number, number, number][]
      ).map(([x, y, w, h]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={w}
          height={h}
          rx="1"
          fill="#d4dfc8"
          stroke="#c8d4ba"
          strokeWidth="0.3"
        />
      ))}

      {/* Park */}
      <rect x="30" y="48" width="24" height="7" rx="1.5" fill="#a8d5a2" />
      <rect
        x="30"
        y="48"
        width="24"
        height="7"
        rx="1.5"
        fill="none"
        stroke="#7eba78"
        strokeWidth="0.3"
      />

      {/* Main horizontal roads */}
      <rect x="0" y="21" width="100" height="4" fill="#ffffff" />
      <rect x="0" y="48" width="100" height="4" fill="#ffffff" />
      <rect x="0" y="76" width="100" height="4" fill="#ffffff" />

      {/* Main vertical roads */}
      <rect x="22" y="0" width="4" height="100" fill="#ffffff" />
      <rect x="52" y="0" width="4" height="100" fill="#ffffff" />
      <rect x="78" y="0" width="4" height="100" fill="#ffffff" />

      {/* Road center dashes */}
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((x) => (
        <rect
          key={x}
          x={x + 1}
          y={22.8}
          width={5}
          height={0.4}
          fill="#d0c060"
          opacity="0.5"
        />
      ))}
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((y) => (
        <rect
          key={y}
          x={23.8}
          y={y + 1}
          width={0.4}
          height={5}
          fill="#d0c060"
          opacity="0.5"
        />
      ))}

      {/* River */}
      <path
        d="M0,68 Q15,66 30,68 Q45,70 60,67 Q75,64 100,67"
        stroke="#93c5fd"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />

      {/* User location pulse */}
      <circle
        cx="50"
        cy="50"
        r="2.5"
        fill="#2563eb"
        stroke="#ffffff"
        strokeWidth="1"
      />
      <circle cx="50" cy="50" r="5" fill="#2563eb" fillOpacity="0.2" />
    </svg>
  );
}

interface ResourceDetailModalProps {
  resource: ResourceRecord | null;
  onClose: () => void;
}

function ResourceDetailModal({ resource, onClose }: ResourceDetailModalProps) {
  if (!resource) return null;

  const TypeIcon = getResourceTypeIcon(resource.resourceType);
  const colors = getResourceTypeColor(resource.resourceType);
  const typeLabel = getResourceTypeLabel(resource.resourceType);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;

  return (
    <Dialog open={!!resource} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="sm:max-w-md"
        aria-label={`Details for ${resource.name}`}
        data-ocid="resource-detail-modal"
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.bg}`}
            >
              <TypeIcon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <div>
              <span
                className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${colors.badge}`}
              >
                {typeLabel}
              </span>
              <DialogTitle className="text-base font-display font-bold leading-snug mt-1">
                {resource.name}
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          {/* Distance */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/15">
            <Navigation className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="font-semibold text-primary">
              {formatDistance(resource.distanceKm)} from your location
            </span>
          </div>

          {/* Info rows */}
          <div className="space-y-2.5 text-muted-foreground">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-foreground/50" />
              <span>{resource.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 flex-shrink-0 text-foreground/50" />
              <span>{resource.hoursOfOperation}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 flex-shrink-0 text-foreground/50" />
              <span className="font-semibold text-foreground">
                {resource.phone}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-success" />
              <span className="text-success font-medium">
                Available — accepting arrivals
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <a
              href={`tel:${resource.phone}`}
              className="flex-1"
              data-ocid={`modal-call-${resource.id}`}
            >
              <Button variant="outline" className="w-full gap-2 btn-touch">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              data-ocid={`modal-directions-${resource.id}`}
            >
              <Button className="w-full gap-2 btn-touch">
                <ExternalLink className="w-4 h-4" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Filter options ---

const FILTER_OPTIONS: {
  label: string;
  value: FilterType;
  Icon: typeof MapPin;
}[] = [
  { label: "All", value: "all", Icon: MapPin },
  { label: "Hospital", value: ResourceType.hospital, Icon: Hospital },
  { label: "Shelter", value: ResourceType.shelter, Icon: MapPin },
  { label: "Police", value: ResourceType.police, Icon: ShieldAlert },
  { label: "Fire", value: ResourceType.fire, Icon: Flame },
  { label: "Supply", value: ResourceType.supply, Icon: Package },
];

const RADIUS_OPTIONS: RadiusKm[] = [5, 10, 20];

// --- Main Page ---

export function SafePlaces() {
  const { data: resources, isLoading } = useResources();
  const {
    location,
    isLoading: isLocating,
    error: locError,
    requestLocation,
  } = useLocation();

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [radiusKm, setRadiusKm] = useState<RadiusKm>(10);
  const [selectedResource, setSelectedResource] =
    useState<ResourceRecord | null>(null);
  const [mapPinSelected, setMapPinSelected] = useState<bigint | null>(null);

  const filteredResources = useMemo(() => {
    if (!resources) return [];
    return resources
      .filter((r) => {
        const matchType =
          activeFilter === "all" ||
          (r.resourceType as string) === (activeFilter as string);
        const matchSearch =
          !searchQuery ||
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.address.toLowerCase().includes(searchQuery.toLowerCase());
        const matchRadius = r.distanceKm <= radiusKm;
        return matchType && matchSearch && matchRadius;
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [resources, activeFilter, searchQuery, radiusKm]);

  const mapResources = useMemo(() => {
    if (!resources) return [];
    return resources.filter((r) => {
      const matchType =
        activeFilter === "all" ||
        (r.resourceType as string) === (activeFilter as string);
      return matchType && r.distanceKm <= radiusKm;
    });
  }, [resources, activeFilter, radiusKm]);

  function handleSelectResource(resource: ResourceRecord) {
    setSelectedResource(resource);
    setMapPinSelected(resource.id);
  }

  function handleCloseModal() {
    setSelectedResource(null);
    setMapPinSelected(null);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Safe Places
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-tight">
              Find Safe Places Near You
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-xl">
              Locate the nearest shelters, hospitals, police stations, fire
              brigades, and relief supply centers in your area.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Location Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
          data-ocid="location-bar"
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {isLocating ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin flex-shrink-0" />
            ) : location ? (
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
            ) : (
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Current Location</p>
              <p className="text-sm font-semibold text-foreground truncate">
                {isLocating
                  ? "Detecting your location…"
                  : location
                    ? location.label
                    : "Location not detected"}
              </p>
              {locError && (
                <p className="text-xs text-warning mt-0.5">{locError}</p>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={requestLocation}
            disabled={isLocating}
            className="gap-2 btn-touch flex-shrink-0"
            data-ocid="detect-location-btn"
          >
            {isLocating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LocateFixed className="w-4 h-4" />
            )}
            {location ? "Update Location" : "Share My Location"}
          </Button>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="space-y-3"
        >
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              placeholder="Search by name or address…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 btn-touch"
              data-ocid="resource-search"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type Filter pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1"
            aria-label="Filter by type"
          >
            <Filter
              className="w-4 h-4 text-muted-foreground flex-shrink-0"
              aria-hidden="true"
            />
            {FILTER_OPTIONS.map(({ label, value, Icon }) => (
              <button
                type="button"
                key={String(value)}
                onClick={() => setActiveFilter(value)}
                data-ocid={`filter-${String(value)}`}
                aria-pressed={activeFilter === value}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-smooth flex-shrink-0 ${
                  activeFilter === value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Radius Toggle */}
          <div className="flex items-center gap-2" aria-label="Distance radius">
            <span className="text-xs text-muted-foreground font-medium flex-shrink-0">
              Radius:
            </span>
            {RADIUS_OPTIONS.map((km) => (
              <button
                type="button"
                key={km}
                onClick={() => setRadiusKm(km)}
                data-ocid={`radius-${km}`}
                aria-pressed={radiusKm === km}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-smooth ${
                  radiusKm === km
                    ? "bg-destructive text-destructive-foreground border-destructive"
                    : "bg-card text-muted-foreground border-border hover:border-destructive/40"
                }`}
              >
                {km} km
              </button>
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              —{" "}
              <strong className="text-foreground">
                {filteredResources.length}
              </strong>{" "}
              place{filteredResources.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </motion.div>

        {/* Map + List */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Map Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="lg:col-span-3"
            data-ocid="map-panel"
          >
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-display font-bold text-foreground">
                  Interactive Map
                </h2>
                {/* Legend */}
                <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
                  {[
                    { tokenClass: "bg-destructive", label: "Hospital" },
                    { tokenClass: "bg-primary", label: "Police" },
                    { tokenClass: "bg-accent", label: "Fire" },
                    { tokenClass: "bg-success", label: "Supply" },
                    { tokenClass: "bg-warning", label: "Shelter" },
                  ].map(({ tokenClass, label }) => (
                    <span key={label} className="flex items-center gap-1">
                      <span
                        className={`w-2.5 h-2.5 rounded-full border border-card/50 ${tokenClass}`}
                      />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map viewport */}
              <div className="relative w-full" style={{ paddingBottom: "68%" }}>
                <div className="absolute inset-0">
                  <MapBackground />

                  {/* Resource pins */}
                  {mapResources.map((r) => (
                    <MapPinMarker
                      key={String(r.id)}
                      resource={r}
                      isSelected={mapPinSelected === r.id}
                      onClick={() => {
                        if (mapPinSelected === r.id) {
                          setMapPinSelected(null);
                          setSelectedResource(null);
                        } else {
                          handleSelectResource(r);
                        }
                      }}
                    />
                  ))}

                  {/* User location pin */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: "50%", top: "50%" }}
                    aria-label="Your location"
                  >
                    <div className="w-5 h-5 bg-primary rounded-full border-2 border-card shadow-lg" />
                    <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
                  </div>

                  {/* Radius ring */}
                  <div
                    className="absolute rounded-full border-2 border-primary/20 bg-primary/5 pointer-events-none -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: `${(radiusKm / 20) * 80}%`,
                      paddingBottom: `${(radiusKm / 20) * 80}%`,
                    }}
                  />

                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-card/80 px-1.5 py-0.5 rounded pointer-events-none">
                    Metro City Area
                  </div>
                </div>
              </div>

              {/* Mobile legend */}
              <div className="sm:hidden px-4 py-2 border-t border-border flex flex-wrap gap-2">
                {[
                  { tokenClass: "bg-destructive", label: "Hospital" },
                  { tokenClass: "bg-primary", label: "Police" },
                  { tokenClass: "bg-accent", label: "Fire" },
                  { tokenClass: "bg-success", label: "Supply" },
                  { tokenClass: "bg-warning", label: "Shelter" },
                ].map(({ tokenClass, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1 text-xs text-muted-foreground"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${tokenClass}`}
                    />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resource List */}
          <div className="lg:col-span-2 space-y-3" data-ocid="resource-list">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-display font-bold text-foreground">
                Nearby Resources
              </h2>
              <Badge variant="secondary" className="text-xs">
                {filteredResources.length} results
              </Badge>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : filteredResources.length === 0 ? (
              <div
                className="bg-card border border-border rounded-xl p-8 text-center"
                data-ocid="empty-state-resources"
              >
                <MapPin className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm font-semibold text-foreground">
                  No places found
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try expanding the radius or changing the filter.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setActiveFilter("all");
                    setSearchQuery("");
                    setRadiusKm(20);
                  }}
                  data-ocid="reset-filters-btn"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-3 max-h-[620px] overflow-y-auto pr-0.5">
                {filteredResources.map((resource, idx) => (
                  <motion.div
                    key={String(resource.id)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.045 }}
                    onClick={() => handleSelectResource(resource)}
                    className={`cursor-pointer rounded-xl transition-smooth ${
                      mapPinSelected === resource.id
                        ? "ring-2 ring-primary ring-offset-2"
                        : "hover:ring-1 hover:ring-border"
                    }`}
                    data-ocid={`resource-list-item-${resource.id}`}
                  >
                    <ResourceCard resource={resource} compact />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resource Detail Modal */}
      <ResourceDetailModal
        resource={selectedResource}
        onClose={handleCloseModal}
      />
    </div>
  );
}
