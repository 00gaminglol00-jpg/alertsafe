import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
  Filter,
  Flame,
  Hospital,
  MapPin,
  Package,
  Phone,
  Search,
  ShieldAlert,
  SortAsc,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ResourceType } from "../backend";
import { MOCK_RESOURCES } from "../data/mockData";
import type { ResourceRecord } from "../types";
import {
  formatDistance,
  getResourceTypeColor,
  getResourceTypeIcon,
  getResourceTypeLabel,
} from "../utils/helpers";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterType = "all" | keyof typeof ResourceType;
type SortKey = "distance" | "name";

interface DetailModalProps {
  resource: ResourceRecord;
  onClose: () => void;
}

// ─── Category Config ──────────────────────────────────────────────────────────

const CATEGORIES: { type: FilterType; label: string; icon: typeof MapPin }[] = [
  { type: "all", label: "All Resources", icon: MapPin },
  { type: "hospital", label: "Hospitals", icon: Hospital },
  { type: "shelter", label: "Shelters", icon: MapPin },
  { type: "police", label: "Police", icon: ShieldAlert },
  { type: "fire", label: "Fire Stations", icon: Flame },
  { type: "supply", label: "Supply Centers", icon: Package },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "distance", label: "Nearest First" },
  { value: "name", label: "Name A–Z" },
];

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  type,
  count,
  active,
  onClick,
}: {
  type: FilterType;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  const catEntry = CATEGORIES.find((c) => c.type === type);
  const Icon = catEntry?.icon ?? MapPin;

  const colors =
    type === "all"
      ? {
          bg: "bg-primary/10",
          text: "text-primary",
          badge: "bg-primary text-primary-foreground",
        }
      : getResourceTypeColor(ResourceType[type as keyof typeof ResourceType]);

  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`stat-card-${type}`}
      aria-pressed={active}
      className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-smooth cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        ${active ? `${colors.bg} border-current shadow-sm scale-[1.02]` : "bg-card border-border hover:bg-muted/50"}`}
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors.bg}`}
      >
        <Icon className={`w-5 h-5 ${colors.text}`} aria-hidden="true" />
      </div>
      <span
        className={`text-xl font-display font-bold ${active ? colors.text : "text-foreground"}`}
      >
        {count}
      </span>
      <span className="text-xs text-muted-foreground text-center leading-tight">
        {catEntry?.label ?? String(type)}
      </span>
    </button>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({ resource, onClose }: DetailModalProps) {
  const TypeIcon = getResourceTypeIcon(resource.resourceType);
  const colors = getResourceTypeColor(resource.resourceType);
  const typeLabel = getResourceTypeLabel(resource.resourceType);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  const [copied, setCopied] = useState(false);

  // Trap focus inside modal
  useEffect(() => {
    firstFocusRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(`${resource.lat}, ${resource.lng}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
  }, [resource.lat, resource.lng]);

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-transparent border-none m-0 w-full h-full max-w-none max-h-none"
      aria-label={`Details: ${resource.name}`}
      style={{ padding: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyUp={(e) => e.key === "Enter" && onClose()}
        role="button"
        tabIndex={-1}
        aria-label="Close modal"
      />

      {/* Panel */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        className="relative z-10 w-full sm:max-w-lg bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header strip */}
        <div className={`${colors.bg} px-5 py-4 flex items-start gap-3`}>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.badge} flex-shrink-0`}
          >
            <TypeIcon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <Badge className={`${colors.badge} text-xs mb-1`}>
              {typeLabel}
            </Badge>
            <h2 className="font-display font-bold text-lg text-foreground leading-snug">
              {resource.name}
            </h2>
            <span className="text-xs font-semibold text-primary">
              {formatDistance(resource.distanceKm)} away
            </span>
          </div>
          <button
            ref={firstFocusRef}
            type="button"
            onClick={onClose}
            data-ocid="modal-close"
            aria-label="Close details"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          <dl className="space-y-2 text-sm">
            <div className="flex gap-3 items-start">
              <MapPin
                className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-0.5">
                  Address
                </dt>
                <dd className="text-foreground">{resource.address}</dd>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Phone
                className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-0.5">
                  Phone
                </dt>
                <dd className="text-foreground font-mono font-semibold">
                  {resource.phone}
                </dd>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Clock
                className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-0.5">
                  Hours
                </dt>
                <dd className="text-foreground">{resource.hoursOfOperation}</dd>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <MapPin
                className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-muted-foreground uppercase font-semibold tracking-wide mb-0.5">
                  Coordinates
                </dt>
                <dd className="text-foreground font-mono text-xs">
                  {resource.lat.toFixed(4)}, {resource.lng.toFixed(4)}
                </dd>
              </div>
            </div>
          </dl>

          {/* Action buttons */}
          <div className="grid grid-cols-1 gap-2 pt-2">
            <a
              href={`tel:${resource.phone}`}
              data-ocid={`modal-call-${resource.id}`}
            >
              <Button className="w-full btn-touch gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                <Phone className="w-4 h-4" />
                Call Now — {resource.phone}
              </Button>
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`modal-directions-${resource.id}`}
            >
              <Button variant="outline" className="w-full btn-touch gap-2">
                <ExternalLink className="w-4 h-4" />
                Get Directions
              </Button>
            </a>
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              data-ocid={`modal-share-${resource.id}`}
              className="w-full btn-touch gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-success" />
                  Coordinates Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Share Location (Copy Coords)
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function Resources() {
  const resources = MOCK_RESOURCES;
  const isLoading = false;

  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("distance");
  const [sortOpen, setSortOpen] = useState(false);
  const [selectedResource, setSelectedResource] =
    useState<ResourceRecord | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    if (!sortOpen) return;
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sortOpen]);

  // Stats per type
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: resources.length };
    for (const r of resources) {
      const key = r.resourceType as string;
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }, [resources]);

  // Filtered + sorted list
  const filtered = useMemo(() => {
    let list = [...resources];
    if (activeFilter !== "all") {
      list = list.filter((r) => (r.resourceType as string) === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.address.toLowerCase().includes(q),
      );
    }
    if (sortKey === "distance") {
      list.sort((a, b) => a.distanceKm - b.distanceKm);
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [resources, activeFilter, searchQuery, sortKey]);

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.value === sortKey)?.label ?? "Sort";

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full bg-success animate-pulse"
                aria-hidden="true"
              />
              <span className="text-xs font-semibold text-success uppercase tracking-widest">
                Live Directory
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
              Emergency Resources Directory
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Locate hospitals, shelters, police, fire stations, and supply
              centers near you. All resources updated in real-time.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* ── Stats / Category Cards ── */}
        <section aria-label="Filter by resource type">
          <h2 className="sr-only">Resource Categories</h2>
          {isLoading ? (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {CATEGORIES.map(({ type }) => (
                <Skeleton
                  key={`stat-skeleton-${type}`}
                  className="h-24 rounded-xl"
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {CATEGORIES.map(({ type }) => (
                <motion.div
                  key={type}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <StatCard
                    type={type}
                    count={typeCounts[type === "all" ? "all" : type] ?? 0}
                    active={activeFilter === type}
                    onClick={() => setActiveFilter(type)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* ── Filter & Search Bar ── */}
        <section aria-label="Search and sort controls">
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  type="search"
                  placeholder="Search by name or address…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 btn-touch"
                  data-ocid="resources-search"
                  aria-label="Search resources"
                />
              </div>

              {/* Sort dropdown */}
              <div className="relative" ref={sortRef}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSortOpen((v) => !v)}
                  data-ocid="resources-sort"
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}
                  className="btn-touch gap-2 w-full sm:w-auto justify-between"
                >
                  <SortAsc className="w-4 h-4" />
                  {currentSortLabel}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                  />
                </Button>
                {sortOpen && (
                  <div
                    className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg z-20 min-w-[160px] overflow-hidden"
                    role="menu"
                    aria-label="Sort options"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="menuitemradio"
                        aria-checked={sortKey === opt.value}
                        onClick={() => {
                          setSortKey(opt.value);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-muted/60
                          ${sortKey === opt.value ? "font-semibold text-primary" : "text-foreground"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Active filter pills */}
            {(activeFilter !== "all" || searchQuery) && (
              <div className="flex items-center gap-2 flex-wrap">
                <Filter
                  className="w-3.5 h-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="text-xs text-muted-foreground">
                  Active filters:
                </span>
                {activeFilter !== "all" && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => setActiveFilter("all")}
                    data-ocid="filter-clear-type"
                  >
                    {getResourceTypeLabel(
                      ResourceType[activeFilter as keyof typeof ResourceType],
                    )}
                    <X className="w-3 h-3" aria-hidden="true" />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                    data-ocid="filter-clear-search"
                  >
                    "{searchQuery}"
                    <X className="w-3 h-3" aria-hidden="true" />
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground ml-auto">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ── Resource Grid ── */}
        <section aria-label="Resource listings" aria-live="polite">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_RESOURCES.slice(0, 6).map((r) => (
                <Skeleton
                  key={`resource-skeleton-${r.id}`}
                  className="h-52 rounded-xl"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            /* ── Empty State ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 px-6 text-center bg-muted/30 rounded-2xl border border-dashed border-border"
              data-ocid="resources-empty-state"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                No resources found
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                No resources match your current filters. Try adjusting your
                search or selecting a different category.
              </p>
              <Button
                type="button"
                onClick={() => {
                  setActiveFilter("all");
                  setSearchQuery("");
                }}
                data-ocid="resources-clear-filters"
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {filtered.length}
                  </span>{" "}
                  of {resources.length} resources
                </p>
              </div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((resource) => (
                    <motion.div
                      key={String(resource.id)}
                      layout
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ResourceDetailCard
                        resource={resource}
                        onViewDetails={() => setSelectedResource(resource)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </section>
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedResource && (
          <DetailModal
            resource={selectedResource}
            onClose={() => setSelectedResource(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Resource Detail Card ─────────────────────────────────────────────────────

function ResourceDetailCard({
  resource,
  onViewDetails,
}: {
  resource: ResourceRecord;
  onViewDetails: () => void;
}) {
  const TypeIcon = getResourceTypeIcon(resource.resourceType);
  const colors = getResourceTypeColor(resource.resourceType);
  const typeLabel = getResourceTypeLabel(resource.resourceType);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`;

  return (
    <article
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-border/80 transition-smooth"
      aria-label={`${typeLabel}: ${resource.name}`}
      data-ocid={`resource-card-${resource.id}`}
    >
      {/* Color top bar */}
      <div className={`h-1 w-full ${colors.badge}`} aria-hidden="true" />

      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.bg}`}
          >
            <TypeIcon className={`w-5 h-5 ${colors.text}`} aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`${colors.badge} text-[11px] px-1.5 py-0.5`}>
                {typeLabel}
              </Badge>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full ml-auto">
                {formatDistance(resource.distanceKm)}
              </span>
            </div>
            <h3 className="font-display font-bold text-foreground text-sm mt-1.5 leading-snug line-clamp-2">
              {resource.name}
            </h3>
          </div>
        </div>

        {/* Details */}
        <ul className="space-y-1.5 text-xs text-muted-foreground mb-3">
          <li className="flex items-start gap-2">
            <MapPin
              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-muted-foreground/70"
              aria-hidden="true"
            />
            <span className="line-clamp-2">{resource.address}</span>
          </li>
          <li className="flex items-center gap-2">
            <Clock
              className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/70"
              aria-hidden="true"
            />
            <span>{resource.hoursOfOperation}</span>
          </li>
          <li className="flex items-center gap-2">
            <Phone
              className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/70"
              aria-hidden="true"
            />
            <span className="font-mono font-semibold text-foreground">
              {resource.phone}
            </span>
          </li>
        </ul>

        {/* Action row */}
        <div className="flex gap-2 pt-3 border-t border-border/50">
          <a
            href={`tel:${resource.phone}`}
            className="flex-1"
            data-ocid={`resource-call-${resource.id}`}
            aria-label={`Call ${resource.name}`}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1.5 text-xs"
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
            aria-label={`Get directions to ${resource.name}`}
          >
            <Button size="sm" className="w-full gap-1.5 text-xs">
              <ExternalLink className="w-3.5 h-3.5" />
              Directions
            </Button>
          </a>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            data-ocid={`resource-details-${resource.id}`}
            aria-label={`View full details for ${resource.name}`}
            className="px-2.5"
          >
            <Search className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
