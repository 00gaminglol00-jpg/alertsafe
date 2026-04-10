import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Phone, Shield, X } from "lucide-react";
import { useSOSContext } from "../context/SOSContext";
import { HELPLINES } from "../data/mockData";

const CATEGORY_COLORS: Record<string, string> = {
  law: "bg-primary text-primary-foreground",
  medical: "bg-destructive text-destructive-foreground",
  fire: "bg-accent text-accent-foreground",
  disaster: "bg-warning text-warning-foreground",
  emergency: "bg-destructive text-destructive-foreground",
  safety: "bg-success text-success-foreground",
};

export function SOSModal() {
  const { isOpen, closeSOS } = useSOSContext();

  return (
    <Dialog open={isOpen} onOpenChange={(v) => !v && closeSOS()}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden border-destructive/40"
        aria-label="SOS Emergency Helplines"
      >
        {/* Header */}
        <div className="bg-destructive px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive-foreground/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive-foreground" />
            </div>
            <div>
              <DialogTitle className="text-destructive-foreground text-lg font-display font-bold m-0">
                SOS Emergency
              </DialogTitle>
              <p className="text-destructive-foreground/80 text-xs mt-0.5">
                Call any helpline immediately
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeSOS}
            className="w-8 h-8 rounded-full bg-destructive-foreground/20 flex items-center justify-center hover:bg-destructive-foreground/30 transition-smooth"
            aria-label="Close SOS modal"
          >
            <X className="w-4 h-4 text-destructive-foreground" />
          </button>
        </div>

        {/* Helplines */}
        <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
          {HELPLINES.map((line) => (
            <a
              key={line.number}
              href={`tel:${line.number}`}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth group"
              data-ocid={`helpline-${line.number}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {line.name}
                  </p>
                  <Badge
                    className={`text-xs mt-0.5 ${CATEGORY_COLORS[line.category] ?? "bg-muted text-foreground"}`}
                  >
                    {line.category}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-display font-bold text-lg text-foreground">
                  {line.number}
                </span>
                <div className="w-8 h-8 rounded-full bg-success/10 group-hover:bg-success flex items-center justify-center transition-smooth">
                  <Phone className="w-3.5 h-3.5 text-success group-hover:text-success-foreground transition-smooth" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <p className="text-xs text-muted-foreground">
              All numbers are toll-free emergency lines. Stay calm and provide
              your location.
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full btn-touch"
            onClick={closeSOS}
            data-ocid="sos-close-btn"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
