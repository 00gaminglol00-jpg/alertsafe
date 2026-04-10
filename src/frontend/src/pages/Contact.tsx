import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/useAlerts";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  Facebook,
  Headphones,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What areas are covered by AlertSafe?",
    answer:
      "AlertSafe currently covers major metropolitan areas and disaster-prone regions across 48 states and territories. We continuously expand coverage based on regional emergency management partnerships. Enter your location to check real-time coverage in your area.",
  },
  {
    question: "Is the AlertSafe platform free to use?",
    answer:
      "Yes, AlertSafe is completely free for all citizens. Our mission is to ensure everyone has access to life-saving emergency information regardless of income. The platform is funded through government partnerships and public safety grants.",
  },
  {
    question: "How do I report a new alert or emergency?",
    answer:
      "You can report an emerging emergency via the SOS button on the home page or by calling our emergency reporting line at 1-800-SAFE-911. Our team reviews citizen reports within minutes and cross-verifies with official sources before publishing alerts.",
  },
  {
    question: "How accurate is the disaster data on AlertSafe?",
    answer:
      "We source data from NOAA, FEMA, USGS, and official state emergency management agencies, updating every 5 minutes. While we strive for maximum accuracy, always follow guidance from local emergency officials as the primary authority during active disasters.",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Twitter,
    label: "Twitter/X",
    href: "https://x.com/alertsafe",
    color: "hover:text-primary",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/alertsafe",
    color: "hover:text-primary",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/alertsafe",
    color: "hover:text-accent",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com/@alertsafe",
    color: "hover:text-destructive",
  },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
      {items.map((item) => {
        const i = items.indexOf(item);
        return (
          <div key={item.question} className="bg-card">
            <button
              type="button"
              data-ocid={`faq-item-${i}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setOpenIndex(openIndex === i ? null : i);
              }}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-smooth hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset min-h-[52px]"
              aria-expanded={openIndex === i}
            >
              <span className="font-semibold text-foreground text-sm md:text-base">
                {item.question}
              </span>
              {openIndex === i ? (
                <ChevronUp className="shrink-0 w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="shrink-0 w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-5 pb-5">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border bg-muted/40">
      {/* Grid lines to simulate a map */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Map grid</title>
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          className="text-foreground"
        />
      </svg>
      {/* Roads */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Map roads</title>
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="white"
          strokeWidth="3"
          strokeOpacity="0.4"
        />
        <line
          x1="35%"
          y1="0"
          x2="35%"
          y2="100%"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <line
          x1="70%"
          y1="0"
          x2="70%"
          y2="100%"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.3"
        />
        <line
          x1="0"
          y1="25%"
          x2="100%"
          y2="25%"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.2"
        />
        <line
          x1="0"
          y1="75%"
          x2="100%"
          y2="75%"
          stroke="white"
          strokeWidth="1.5"
          strokeOpacity="0.2"
        />
      </svg>
      {/* Pin */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center shadow-lg elevation-2">
            <MapPin className="w-5 h-5 text-destructive-foreground" />
          </div>
          <div className="w-0.5 h-4 bg-destructive/60" />
          <div className="w-3 h-1.5 rounded-full bg-destructive/30 blur-sm" />
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border shadow-sm">
        <p className="text-xs font-semibold text-foreground">AlertSafe HQ</p>
        <p className="text-xs text-muted-foreground">Washington, DC 20001</p>
      </div>
      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-0.5">
        <button
          type="button"
          className="w-7 h-7 bg-card/90 border border-border rounded-t-md flex items-center justify-center text-foreground text-lg font-bold shadow-sm hover:bg-muted transition-smooth"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          className="w-7 h-7 bg-card/90 border border-border rounded-b-md flex items-center justify-center text-foreground text-lg font-bold shadow-sm hover:bg-muted transition-smooth"
          aria-label="Zoom out"
        >
          −
        </button>
      </div>
    </div>
  );
}

export function Contact() {
  const submitContact = useSubmitContact();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>();

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitContact.mutateAsync(data);
      toast.success("Message sent! We'll respond within 24 hours.", {
        description: "For emergencies, please call 911 immediately.",
        duration: 5000,
      });
      setSubmitted(true);
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.", {
        description: "For urgent help, call our hotline at 1-800-SAFE-911.",
        duration: 6000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card border-b border-border py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <Badge
              variant="outline"
              className="text-primary border-primary/30 bg-primary/5 font-semibold text-xs uppercase tracking-wide"
            >
              Support Center
            </Badge>
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground leading-tight">
            Contact Us
          </h1>
          <p className="text-muted-foreground mt-2 text-base md:text-lg max-w-xl">
            Have a question, feedback, or need assistance? Our team is here to
            help — 24/7 for emergencies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12">
            {/* Contact Form — Left (3 cols) */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8 elevation-1">
                <div className="flex items-center gap-2 mb-6">
                  <Mail className="w-5 h-5 text-primary" />
                  <h2 className="font-display font-bold text-xl text-foreground">
                    Send a Message
                  </h2>
                </div>

                {submitted && (
                  <div className="mb-6 rounded-xl bg-success/10 border border-success/30 p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0">
                      <span className="text-success-foreground text-sm font-bold">
                        ✓
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Message Sent Successfully
                      </p>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        We'll get back to you within 24 hours. For emergencies,
                        call 911.
                      </p>
                    </div>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="font-semibold text-sm text-foreground"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        data-ocid="contact-name"
                        placeholder="Jane Smith"
                        className={`btn-touch ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-destructive text-xs font-medium"
                        >
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="font-semibold text-sm text-foreground"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        data-ocid="contact-email"
                        placeholder="jane@example.com"
                        className={`btn-touch ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-destructive text-xs font-medium"
                        >
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="font-semibold text-sm text-foreground"
                    >
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      data-ocid="contact-message"
                      placeholder="Describe your question or feedback in detail…"
                      rows={5}
                      className={`resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="text-destructive text-xs font-medium"
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    data-ocid="contact-submit"
                    className="w-full btn-touch font-semibold text-base transition-smooth"
                    disabled={isSubmitting || submitContact.isPending}
                    size="lg"
                  >
                    {isSubmitting || submitContact.isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    🔒 Your message is encrypted and sent securely. We respond
                    within 24 hours.
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Info — Right (2 cols) */}
            <div className="lg:col-span-2 space-y-5">
              {/* Emergency Hotline */}
              <div className="rounded-2xl bg-destructive/5 border-2 border-destructive/30 p-5 elevation-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-destructive flex items-center justify-center">
                    <Headphones className="w-4 h-4 text-destructive-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-destructive uppercase tracking-wide">
                      Emergency Hotline
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Available 24/7
                    </p>
                  </div>
                </div>
                <p className="font-display font-black text-3xl text-destructive tracking-tight">
                  1-800-SAFE-911
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  For immediate life-threatening emergencies, always call{" "}
                  <strong className="text-foreground">911</strong> first.
                </p>
              </div>

              {/* Office Info */}
              <div className="bg-card rounded-2xl border border-border p-5 elevation-1 space-y-4">
                <h3 className="font-display font-bold text-lg text-foreground">
                  Office Information
                </h3>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Headquarters
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      1500 Pennsylvania Ave NW
                      <br />
                      Washington, DC 20001
                      <br />
                      United States
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Email Support
                    </p>
                    <a
                      href="mailto:support@alertsafe.gov"
                      className="text-sm text-primary hover:underline transition-smooth"
                    >
                      support@alertsafe.gov
                    </a>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      General Inquiries
                    </p>
                    <a
                      href="tel:+12025551234"
                      className="text-sm text-primary hover:underline transition-smooth"
                    >
                      +1 (202) 555-1234
                    </a>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      Support Hours
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Mon–Fri: 8AM–8PM EST
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Emergency line: 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <MapPlaceholder />

              {/* Social Links */}
              <div className="bg-card rounded-2xl border border-border p-5 elevation-1">
                <h3 className="font-semibold text-sm text-foreground mb-4">
                  Follow AlertSafe
                </h3>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      data-ocid={`social-${label.toLowerCase().replace("/", "-")}`}
                      className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground ${color} transition-smooth hover:bg-muted/60 hover:scale-110`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 border-t border-border py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <Badge
              variant="outline"
              className="text-primary border-primary/30 bg-primary/5 font-semibold text-xs uppercase tracking-wide mb-3"
            >
              FAQ
            </Badge>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-lg mx-auto">
              Quick answers to the most common questions about AlertSafe.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-destructive py-5 md:py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-destructive-foreground text-center">
            <AlertTriangle
              className="w-6 h-6 shrink-0 animate-pulse"
              aria-hidden="true"
            />
            <p className="font-bold text-base md:text-lg">
              For immediate life-threatening emergencies — call{" "}
              <a
                href="tel:911"
                className="underline underline-offset-2 font-black text-xl hover:opacity-90 transition-smooth"
              >
                911
              </a>{" "}
              or your local emergency number immediately.
            </p>
            <AlertTriangle
              className="w-6 h-6 shrink-0 animate-pulse hidden sm:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
