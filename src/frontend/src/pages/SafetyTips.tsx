import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertTriangle,
  Backpack,
  Banknote,
  CheckCircle2,
  CloudLightning,
  Droplet,
  Droplets,
  FileText,
  Flashlight,
  Info,
  Lightbulb,
  Pill,
  Printer,
  Radio,
  Share2,
  ShieldCheck,
  Shirt,
  Smartphone,
  Utensils,
  Wind,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ──────────────────────────────────────────────────────────────────

type DisasterKey = "flood" | "cyclone" | "earthquake" | "storm";

interface ChecklistItem {
  icon: React.ReactNode;
  text: string;
}

interface TipCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "danger" | "warning" | "info" | "safe";
}

interface DisasterSection {
  label: string;
  icon: React.ReactNode;
  before: ChecklistItem[];
  during: ChecklistItem[];
  after: ChecklistItem[];
  tips: TipCard[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const tipColorClasses: Record<TipCard["color"], string> = {
  danger: "border-l-4 border-destructive bg-destructive/5",
  warning: "border-l-4 border-warning bg-warning/10",
  info: "border-l-4 border-primary bg-primary/5",
  safe: "border-l-4 border-success bg-success/5",
};

const tipIconColorClasses: Record<TipCard["color"], string> = {
  danger: "text-destructive",
  warning: "text-warning",
  info: "text-primary",
  safe: "text-success",
};

const DISASTERS: Record<DisasterKey, DisasterSection> = {
  flood: {
    label: "Floods",
    icon: <Droplets className="w-4 h-4" />,
    before: [
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Know your local flood risk level and evacuation zones",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Store important documents in a waterproof bag",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Prepare a go-bag with 3 days of supplies",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Elevate electrical appliances and furniture above flood level",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Keep emergency contacts and helpline numbers saved offline",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Identify and locate the nearest shelter or high ground",
      },
    ],
    during: [
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Never walk or drive through floodwater — even 6 inches can knock you down",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Move to higher ground immediately if water starts rising",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Turn off electricity at the main breaker if safe to do so",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Avoid contact with floodwater — it may be contaminated",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Stay away from streams, bridges, and drainage channels",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Follow official evacuation instructions without delay",
      },
    ],
    after: [
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Do not return home until authorities declare it safe",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Inspect your home for structural damage before entering",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Boil or use bottled water until tap water is declared safe",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Clean and disinfect all flood-affected surfaces",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Document damage with photos for insurance claims",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Watch for signs of mold and seek professional help if needed",
      },
    ],
    tips: [
      {
        icon: <Droplets className="w-5 h-5" />,
        title: "Never Cross Flooded Roads",
        description:
          "Just 30cm of fast-moving water can sweep a vehicle away. Turn around — don't drown.",
        color: "danger",
      },
      {
        icon: <Info className="w-5 h-5" />,
        title: "Stay Informed",
        description:
          "Monitor local radio and official alerts for flood level updates in your area.",
        color: "info",
      },
      {
        icon: <AlertTriangle className="w-5 h-5" />,
        title: "Electricity Is Deadly",
        description:
          "Standing floodwater can be energized. Never touch electrical equipment in flooded areas.",
        color: "warning",
      },
      {
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "Sandbag Effectiveness",
        description:
          "Properly placed sandbags at entry points can reduce water entry significantly.",
        color: "safe",
      },
    ],
  },
  cyclone: {
    label: "Cyclones",
    icon: <Wind className="w-4 h-4" />,
    before: [
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Listen to official weather forecasts and stay updated on cyclone tracks",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Secure loose outdoor items like furniture, pots, and boards",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Reinforce doors, windows, and roof if time allows",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Stock up on at least 5 days of food, water, and medicine",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Know the evacuation route from your home and community",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Charge all devices and power banks before the cyclone hits",
      },
    ],
    during: [
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Stay indoors, away from windows and glass doors",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Take shelter in the strongest part of your building (bathroom or hallway)",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Do not go outside during the eye of the cyclone — it will return",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Keep pets and animals indoors with you",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Listen to battery-powered or hand-crank radio for updates",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "If your building is unsafe, evacuate to a designated shelter",
      },
    ],
    after: [
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Wait for the all-clear signal before going outside",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Watch out for fallen power lines and debris on roads",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Do not use candles near gas leaks — use torches instead",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Report damaged infrastructure to local authorities",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Help neighbors, especially elderly and disabled persons",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Avoid driving on damaged roads until cleared by officials",
      },
    ],
    tips: [
      {
        icon: <Wind className="w-5 h-5" />,
        title: "Understand Cyclone Categories",
        description:
          "Category 1–2 causes minor damage; Category 4–5 is extreme. Evacuate early for higher categories.",
        color: "danger",
      },
      {
        icon: <Info className="w-5 h-5" />,
        title: "The Eye Is Dangerous",
        description:
          "The calm in the eye is temporary. Winds will return with full force — stay sheltered.",
        color: "warning",
      },
      {
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "Strongest Room Rule",
        description:
          "Bathrooms and interior hallways offer best protection from flying debris.",
        color: "info",
      },
      {
        icon: <CheckCircle2 className="w-5 h-5" />,
        title: "Water for 5+ Days",
        description:
          "Store 4 liters of water per person per day in sealed, food-safe containers.",
        color: "safe",
      },
    ],
  },
  earthquake: {
    label: "Earthquakes",
    icon: <Activity className="w-4 h-4" />,
    before: [
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Identify safe spots in each room (under sturdy table, against interior wall)",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Secure heavy furniture, bookshelves, and water heaters to walls",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Keep emergency supplies near exit doors for quick access",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Learn how to turn off gas, water, and electricity in your home",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Discuss a family reunion plan in case you get separated",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Practice 'Drop, Cover, Hold On' with all family members",
      },
    ],
    during: [
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Drop to hands and knees immediately — do not stand",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Cover your head and neck under a sturdy table or desk",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Hold on until shaking completely stops",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Stay away from windows, exterior walls, and heavy objects",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "If outdoors, move away from buildings, trees, and power lines",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Do NOT use elevators — always use stairs during or after shaking",
      },
    ],
    after: [
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Expect aftershocks and be prepared to drop and cover again",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Check yourself and others for injuries before moving",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "If you smell gas, open windows, leave immediately, and call emergency services",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Do not use open flames until gas leaks are ruled out",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Text rather than call to keep phone lines clear for emergencies",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Be cautious of tsunami warnings if near coastal areas",
      },
    ],
    tips: [
      {
        icon: <Activity className="w-5 h-5" />,
        title: "Drop, Cover, Hold On",
        description:
          "This is the single most important action. Practice it until it becomes instinct.",
        color: "danger",
      },
      {
        icon: <AlertTriangle className="w-5 h-5" />,
        title: "Doorways Are NOT Safer",
        description:
          "Modern research shows doorways offer no special protection — get under a table instead.",
        color: "warning",
      },
      {
        icon: <Info className="w-5 h-5" />,
        title: "Aftershocks Are Real",
        description:
          "Aftershocks can be as strong as the original quake. Stay alert for 24–48 hours.",
        color: "info",
      },
      {
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "Know Your Gas Shutoff",
        description:
          "Knowing where and how to shut off your gas main can prevent fire after an earthquake.",
        color: "safe",
      },
    ],
  },
  storm: {
    label: "Storms",
    icon: <CloudLightning className="w-4 h-4" />,
    before: [
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Monitor weather alerts and watch for storm warnings in your area",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Bring in outdoor furniture, signs, and light objects",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Trim trees and branches near your home to reduce wind damage",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Unplug electronics to protect against power surges",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Fill your vehicle fuel tank before the storm arrives",
      },
      {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
        text: "Check your emergency kit for flashlights, batteries, and first aid supplies",
      },
    ],
    during: [
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Stay indoors and away from windows during lightning storms",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Avoid using corded phones, plumbing, and electrical appliances",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "If caught outdoors, do not shelter under tall trees",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Crouch low with feet together if lightning is very close outdoors",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Avoid water bodies — lightning can strike water from far away",
      },
      {
        icon: <AlertTriangle className="w-4 h-4 text-warning" />,
        text: "Do not drive through flooded roads caused by storm water",
      },
    ],
    after: [
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Wait at least 30 minutes after the last thunder before going outside",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Report downed power lines to utility companies immediately",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Check for roof and structural damage carefully",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Photograph any damage to your property for insurance records",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Help clear blocked drains or report them to local authorities",
      },
      {
        icon: <ShieldCheck className="w-4 h-4 text-primary" />,
        text: "Check on vulnerable neighbors after the storm passes",
      },
    ],
    tips: [
      {
        icon: <CloudLightning className="w-5 h-5" />,
        title: "30-30 Lightning Rule",
        description:
          "If under 30 seconds between flash and thunder, take shelter. Wait 30 min after last thunder.",
        color: "danger",
      },
      {
        icon: <AlertTriangle className="w-5 h-5" />,
        title: "Tall Trees Are Dangerous",
        description:
          "Never shelter under isolated tall trees during a lightning storm.",
        color: "warning",
      },
      {
        icon: <Info className="w-5 h-5" />,
        title: "Surge Protectors Work",
        description:
          "Plug valuable electronics into surge-protected power strips before any storm season.",
        color: "info",
      },
      {
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "Stay Road-Smart",
        description:
          "Storm drains overflow quickly. Just a few inches of fast-moving water can stall your car.",
        color: "safe",
      },
    ],
  },
};

// ─── Emergency Kit Items ─────────────────────────────────────────────────────

const KIT_ITEMS = [
  {
    icon: <Droplet className="w-5 h-5 text-primary" />,
    label: "Water",
    detail: "4 liters per person per day, 3-day supply",
  },
  {
    icon: <Utensils className="w-5 h-5 text-warning" />,
    label: "Non-perishable Food",
    detail: "Canned goods, energy bars, dry goods (3-day supply)",
  },
  {
    icon: <Pill className="w-5 h-5 text-destructive" />,
    label: "First Aid Kit",
    detail: "Bandages, antiseptic, pain relievers, scissors",
  },
  {
    icon: <Pill className="w-5 h-5 text-destructive" />,
    label: "Prescription Medications",
    detail: "7-day supply in waterproof container",
  },
  {
    icon: <Flashlight className="w-5 h-5 text-warning" />,
    label: "Flashlight & Batteries",
    detail: "LED torch with extra AA/AAA batteries",
  },
  {
    icon: <Radio className="w-5 h-5 text-primary" />,
    label: "Battery/Hand-Crank Radio",
    detail: "For receiving emergency broadcasts offline",
  },
  {
    icon: <Smartphone className="w-5 h-5 text-primary" />,
    label: "Phone Charger & Power Bank",
    detail: "Fully charged portable battery (20,000 mAh+)",
  },
  {
    icon: <FileText className="w-5 h-5 text-foreground" />,
    label: "Important Documents",
    detail: "ID, insurance, bank docs in waterproof bag",
  },
  {
    icon: <Banknote className="w-5 h-5 text-success" />,
    label: "Cash (Small Denominations)",
    detail: "ATMs may be offline during disasters",
  },
  {
    icon: <Shirt className="w-5 h-5 text-foreground" />,
    label: "Warm Clothing & Rain Gear",
    detail: "Change of clothes, sturdy shoes, poncho",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

function ChecklistSection({ items }: { items: ChecklistItem[] }) {
  return (
    <ul className="space-y-2.5 mt-1">
      {items.map((item) => (
        <li
          key={item.text}
          className="flex items-start gap-3 text-sm text-foreground leading-relaxed"
        >
          <span className="mt-0.5 shrink-0">{item.icon}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

function TipCards({ tips }: { tips: TipCard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      {tips.map((tip) => (
        <div
          key={tip.title}
          className={`rounded-lg p-4 ${tipColorClasses[tip.color]}`}
        >
          <div className={`mb-2 ${tipIconColorClasses[tip.color]}`}>
            {tip.icon}
          </div>
          <h4 className="font-semibold text-sm text-foreground mb-1">
            {tip.title}
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {tip.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function DisasterContent({ data }: { data: DisasterSection }) {
  return (
    <div className="space-y-6 pt-2">
      {/* Key Tips Cards */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-warning" />
          <span className="text-sm font-semibold text-foreground">
            Key Safety Tips
          </span>
        </div>
        <TipCards tips={data.tips} />
      </div>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue="before"
        className="space-y-2"
      >
        <AccordionItem
          value="before"
          className="border border-border rounded-lg px-4 data-[state=open]:bg-success/5"
          data-ocid="accordion-before"
        >
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
              Before the Disaster — Preparation Checklist
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <ChecklistSection items={data.before} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="during"
          className="border border-border rounded-lg px-4 data-[state=open]:bg-warning/5"
          data-ocid="accordion-during"
        >
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              During the Disaster — Step-by-Step Actions
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <ChecklistSection items={data.during} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="after"
          className="border border-border rounded-lg px-4 data-[state=open]:bg-primary/5"
          data-ocid="accordion-after"
        >
          <AccordionTrigger className="text-sm font-semibold text-foreground py-3 hover:no-underline">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              After the Disaster — Recovery Guidance
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <ChecklistSection items={data.after} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function SafetyTips() {
  const [activeTab, setActiveTab] = useState<DisasterKey>("flood");

  function handlePrint() {
    window.print();
  }

  async function handleShare() {
    const shareData = {
      title: "Safety Tips & Preparedness Guide — AlertSafe",
      text: "Stay safe with these disaster preparedness tips from AlertSafe. Know what to do before, during, and after a disaster.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled — no action needed
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <Badge
              variant="outline"
              className="text-xs font-medium border-primary/40 text-primary"
            >
              Preparedness Guide
            </Badge>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight">
            Safety Tips &amp; Preparedness Guide
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-xl">
            Practical, clear guidance to help you and your family stay safe
            before, during, and after natural disasters.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="btn-touch gap-2"
            onClick={handlePrint}
            data-ocid="btn-print"
          >
            <Printer className="w-4 h-4" />
            Print Guide
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="btn-touch gap-2"
            onClick={handleShare}
            data-ocid="btn-share"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>

      {/* ── Disaster Type Tabs ── */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as DisasterKey)}
        data-ocid="disaster-tabs"
      >
        <TabsList
          className="grid grid-cols-4 w-full h-auto p-1"
          data-ocid="tab-list"
        >
          {(Object.entries(DISASTERS) as [DisasterKey, DisasterSection][]).map(
            ([key, d]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-2 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
                data-ocid={`tab-${key}`}
              >
                {d.icon}
                <span className="hidden xs:inline sm:inline">{d.label}</span>
              </TabsTrigger>
            ),
          )}
        </TabsList>

        {(Object.entries(DISASTERS) as [DisasterKey, DisasterSection][]).map(
          ([key, d]) => (
            <TabsContent key={key} value={key} className="mt-4">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-2 border-b border-border bg-muted/30">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <span className="text-primary">{d.icon}</span>
                    {d.label} — Safety Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <DisasterContent data={d} />
                </CardContent>
              </Card>
            </TabsContent>
          ),
        )}
      </Tabs>

      {/* ── Emergency Kit Section ── */}
      <Card
        className="border-warning/40 bg-warning/5"
        data-ocid="emergency-kit-section"
      >
        <CardHeader className="pb-3 border-b border-warning/20">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Backpack className="w-5 h-5 text-warning" />
            Emergency Go-Bag Checklist
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Pack these items before a disaster strikes. Keep your bag in an
            easily accessible location.
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {KIT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
                data-ocid={`kit-item-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="shrink-0 mt-0.5">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-primary font-medium flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              Review and refresh your go-bag every 6 months. Replace expired
              items and update documents.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── Bottom Action Bar ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-card border border-border shadow-sm">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-foreground">
            Save this guide for offline use
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Print or share it with your family and neighbors
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="btn-touch gap-2"
            onClick={handlePrint}
            data-ocid="btn-print-bottom"
          >
            <Printer className="w-4 h-4" />
            Print This Guide
          </Button>
          <Button
            className="btn-touch gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleShare}
            data-ocid="btn-share-bottom"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
