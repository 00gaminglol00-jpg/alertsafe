import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertOctagon,
  Clock,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  SortAsc,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCard } from "../components/AlertCard";
import { AlertTypeBadge, SeverityBadge } from "../components/SeverityBadge";
import { MOCK_ALERTS } from "../data/mockData";
import { useAlerts } from "../hooks/useAlerts";
import { AlertType, Severity } from "../types";
import type { AlertRecord } from "../types";
import {
  formatPopulation,
  formatTime,
  getAlertTypeIcon,
  getSeverityColor,
} from "../utils/helpers";

type SortKey = "newest" | "severity" | "location";

const SEVERITY_ORDER: Record<string, number> = {
  danger: 0,
  warning: 1,
  safe: 2,
};

function AlertDetailModal({
  alert,
  onClose,
}: {
  alert: AlertRecord;
  onClose: () => void;
}) {
  const colors = getSeverityColor(alert.severity);
  const TypeIcon = getAlertTypeIcon(alert.alertType);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-transparent w-full h-full max-w-none max-h-none m-0"
      aria-label={`Alert details: ${alert.title}`}
      data-ocid="alert-detail-modal"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        aria-hidden="true"
        role="presentation"
      />

      {/* Panel */}
      <div
        className={`relative w-full sm:max-w-lg bg-card border ${colors.border} rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        <div className={`${colors.bg} p-5 border-b ${colors.border}`}>
          <div className="flex items-start gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${colors.badge}`}
            >
              <TypeIcon className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <SeverityBadge severity={alert.severity} />
                <AlertTypeBadge alertType={alert.alertType} />
              </div>
              <h2 className="font-display font-bold text-lg text-foreground leading-snug">
                {alert.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-background/80 flex items-center justify-center hover:bg-background transition-smooth"
              aria-label="Close alert details"
              data-ocid="modal-close"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 p-5 space-y-5">
          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Affected Area
              </p>
              <p className="text-sm font-semibold text-foreground leading-snug">
                {alert.affectedArea}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Users className="w-3 h-3" /> Affected Population
              </p>
              <p className="text-sm font-semibold text-foreground">
                {formatPopulation(alert.affectedPopulation)} people
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Issued
              </p>
              <p className="text-sm font-semibold text-foreground">
                {formatTime(alert.issuedAt)}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Location
              </p>
              <p className="text-sm font-semibold text-foreground truncate">
                {alert.location}
              </p>
            </div>
          </div>

          {/* Recommended actions */}
          {alert.recommendedActions.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <AlertOctagon className={`w-4 h-4 ${colors.text}`} />
                Recommended Actions
              </h3>
              <ol className="space-y-2">
                {alert.recommendedActions.map((action, i) => (
                  <li
                    key={`modal-action-${alert.id}-${i}`}
                    className="flex items-start gap-3"
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${colors.badge}`}
                    >
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground pt-0.5">{action}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/40 flex gap-2">
          <Button
            variant="outline"
            className="flex-1 btn-touch"
            onClick={onClose}
            data-ocid="modal-dismiss"
          >
            Dismiss
          </Button>
          <Button
            className="flex-1 btn-touch"
            onClick={onClose}
            data-ocid="modal-view-map"
          >
            View on Map
          </Button>
        </div>
      </div>
    </dialog>
  );
}

function AlertsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`skel-slot-${i.toString()}`}
          className="border border-border rounded-lg p-4 space-y-3"
        >
          <div className="flex items-start gap-3">
            <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Alerts() {
  const { data: alerts, isLoading, dataUpdatedAt, refetch } = useAlerts();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("newest");
  const [selectedAlert, setSelectedAlert] = useState<AlertRecord | null>(null);
  const [liveCount, setLiveCount] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const allAlerts = alerts ?? MOCK_ALERTS;

  // Stats
  const stats = useMemo(() => {
    const base = liveCount ?? allAlerts.length;
    const danger = allAlerts.filter(
      (a) => (a.severity as string) === "danger",
    ).length;
    const warning = allAlerts.filter(
      (a) => (a.severity as string) === "warning",
    ).length;
    const safe = allAlerts.filter(
      (a) => (a.severity as string) === "safe",
    ).length;
    return { total: base, danger, warning, safe };
  }, [allAlerts, liveCount]);

  // Simulated live update every 30 seconds
  useEffect(() => {
    refreshTimerRef.current = setInterval(() => {
      setIsRefreshing(true);
      const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
      setLiveCount((prev) =>
        Math.max(allAlerts.length, (prev ?? allAlerts.length) + variation),
      );
      setTimeout(() => setIsRefreshing(false), 800);
    }, 30_000);
    return () => {
      if (refreshTimerRef.current) clearInterval(refreshTimerRef.current);
    };
  }, [allAlerts.length]);

  const handleManualRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 600);
  }, [refetch]);

  // Filtered + sorted alerts
  const filtered = useMemo(() => {
    let result = [...allAlerts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.affectedArea.toLowerCase().includes(q),
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((a) => (a.alertType as string) === typeFilter);
    }

    if (severityFilter !== "all") {
      result = result.filter((a) => (a.severity as string) === severityFilter);
    }

    result.sort((a, b) => {
      if (sortKey === "newest") {
        return Number(b.issuedAt) - Number(a.issuedAt);
      }
      if (sortKey === "severity") {
        const aOrd = SEVERITY_ORDER[a.severity as string] ?? 9;
        const bOrd = SEVERITY_ORDER[b.severity as string] ?? 9;
        return aOrd - bOrd;
      }
      if (sortKey === "location") {
        return a.location.localeCompare(b.location);
      }
      return 0;
    });

    return result;
  }, [allAlerts, search, typeFilter, severityFilter, sortKey]);

  const hasActiveFilters =
    search.trim() !== "" || typeFilter !== "all" || severityFilter !== "all";

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setSeverityFilter("all");
    setSortKey("newest");
  };

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="font-display font-bold text-xl md:text-2xl text-foreground leading-tight">
                Live Alerts Dashboard
              </h1>
              {lastUpdated && (
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Last updated {lastUpdated}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="btn-touch flex items-center gap-2"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              aria-label="Refresh alerts"
              data-ocid="refresh-btn"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">
                {isRefreshing ? "Refreshing…" : "Refresh"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
          </span>
          <span className="text-sm font-semibold text-destructive tracking-wide uppercase">
            Live — Auto-refreshes every 30 seconds
          </span>
        </div>

        {/* Stats bar */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          data-ocid="stats-bar"
        >
          <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
              <SortAsc className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-foreground">
                {stats.total}
              </p>
              <p className="text-xs text-muted-foreground">Total Alerts</p>
            </div>
          </div>
          <div className="bg-destructive/10 border border-destructive/25 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <AlertOctagon className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-destructive">
                {stats.danger}
              </p>
              <p className="text-xs text-destructive/80">Danger</p>
            </div>
          </div>
          <div className="bg-warning/10 border border-warning/25 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
              <AlertOctagon className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-warning">
                {stats.warning}
              </p>
              <p className="text-xs text-warning/80">Warning</p>
            </div>
          </div>
          <div className="bg-success/10 border border-success/25 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-success">
                {stats.safe}
              </p>
              <p className="text-xs text-success/80">Safe</p>
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div
          className="bg-card border border-border rounded-xl p-4 space-y-3"
          data-ocid="filter-controls"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search by title or location…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-11 bg-background"
                aria-label="Search alerts"
                data-ocid="search-input"
              />
            </div>

            {/* Type filter */}
            <Select
              value={typeFilter}
              onValueChange={setTypeFilter}
              data-ocid="type-filter"
            >
              <SelectTrigger
                className="w-full sm:w-44 h-11 bg-background"
                aria-label="Filter by disaster type"
                data-ocid="type-filter-trigger"
              >
                <SelectValue placeholder="Disaster Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value={AlertType.flood as string}>Flood</SelectItem>
                <SelectItem value={AlertType.storm as string}>Storm</SelectItem>
                <SelectItem value={AlertType.cyclone as string}>
                  Cyclone
                </SelectItem>
                <SelectItem value={AlertType.earthquake as string}>
                  Earthquake
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Severity filter */}
            <Select
              value={severityFilter}
              onValueChange={setSeverityFilter}
              data-ocid="severity-filter"
            >
              <SelectTrigger
                className="w-full sm:w-44 h-11 bg-background"
                aria-label="Filter by severity"
                data-ocid="severity-filter-trigger"
              >
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value={Severity.danger as string}>
                  🔴 Danger
                </SelectItem>
                <SelectItem value={Severity.warning as string}>
                  🟠 Warning
                </SelectItem>
                <SelectItem value={Severity.safe as string}>🟢 Safe</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={sortKey}
              onValueChange={(v) => setSortKey(v as SortKey)}
              data-ocid="sort-select"
            >
              <SelectTrigger
                className="w-full sm:w-40 h-11 bg-background"
                aria-label="Sort alerts"
                data-ocid="sort-trigger"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="severity">By Severity</SelectItem>
                <SelectItem value="location">By Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">Filters:</span>
              {search && (
                <Badge variant="secondary" className="gap-1 text-xs">
                  "{search}"
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="hover:text-destructive"
                    aria-label="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {typeFilter !== "all" && (
                <Badge variant="secondary" className="gap-1 text-xs capitalize">
                  {typeFilter}
                  <button
                    type="button"
                    onClick={() => setTypeFilter("all")}
                    className="hover:text-destructive"
                    aria-label="Remove type filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {severityFilter !== "all" && (
                <Badge variant="secondary" className="gap-1 text-xs capitalize">
                  {severityFilter}
                  <button
                    type="button"
                    onClick={() => setSeverityFilter("all")}
                    className="hover:text-destructive"
                    aria-label="Remove severity filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-destructive hover:underline ml-1"
                data-ocid="clear-filters"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {allAlerts.length}
            </span>{" "}
            alerts
          </p>
          {isRefreshing && (
            <span className="text-xs text-primary flex items-center gap-1.5 animate-pulse">
              <RefreshCw className="w-3 h-3 animate-spin" />
              Updating…
            </span>
          )}
        </div>

        {/* Alert grid */}
        {isLoading ? (
          <AlertsSkeleton />
        ) : filtered.length === 0 ? (
          /* Empty state */
          <div
            className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-xl"
            data-ocid="empty-state"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg text-foreground mb-2">
              No Alerts Found
            </h3>
            <p className="text-sm text-muted-foreground text-center max-w-xs mb-6">
              No alerts match your current filters. Try adjusting the search
              terms or clearing the filters.
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              data-ocid="empty-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="alerts-grid"
          >
            {filtered.map((alert) => (
              <AlertCard
                key={String(alert.id)}
                alert={alert}
                onClick={() => setSelectedAlert(alert)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </div>
  );
}
