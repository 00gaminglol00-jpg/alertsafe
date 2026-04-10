# Design Brief: AlertSafe

**Tone:** Utilitarian, authoritative, reassuring. Every decision serves clarity and safety under pressure. No decoration; function-driven geometry.

**Differentiation:** Emergency-specific color semantics (red danger, orange warning, blue safe, green safe-zones). Large 48px+ touch targets. Alert prominence. Real-time severity visualization.

## Palette

| Token | OKLCH | Use |
|-------|-------|-----|
| **Destructive (Red)** | `0.55 0.22 25°` | Active danger alerts, urgent actions |
| **Warning (Orange)** | `0.68 0.24 40°` | Pre-warning states, cautions |
| **Primary (Blue)** | `0.60 0.18 200°` | Information, safe zones, primary navigation |
| **Success (Green)** | `0.62 0.18 135°` | All-clear, safe routes |
| **Background** | `0.99 0 0` (L) / `0.10 0 0` (D) | Clean surfaces |
| **Foreground** | `0.12 0 0` (L) / `0.96 0 0` (D) | Maximum contrast, readability |
| **Border** | `0.88 0 0` (L) / `0.22 0 0` (D) | Subtle definition |

**Dark mode:** Intentional elevation—brighter primaries, darker backgrounds, higher contrast for accessibility in low-light emergency scenarios.

## Typography

| Layer | Font | Scale | Weight | Use |
|-------|------|-------|--------|-----|
| **Display** | DM Sans | 32–48px | 600–700 | Headers, alerts, hero |
| **Body** | Bricolage Grotesque | 14–16px | 400–500 | Content, descriptions, lists |
| **Mono** | Geist Mono | 12–14px | 400 | Codes, numbers, distances |

Hierarchy via size & weight, not color. All text uses semantic token colors.

## Structural Zones

| Zone | Background | Border | Purpose |
|------|------------|--------|---------|
| **Header** | `bg-card` | `border-b` | Sticky top navigation, logo, location toggle |
| **Alert Bands** | `bg-destructive/10` or `bg-warning/10` | Left `border-l-4` in solid color | Live alert notifications |
| **Content Cards** | `bg-card` | `border` subtle | Shelters, resources, guidance sections |
| **Footer** | `bg-muted/40` | `border-t` | Emergency contacts, links, metadata |
| **CTA Sections** | `bg-primary/5` | None | Call-to-action regions (Find Shelter, SOS) |

## Spacing & Rhythm

- **Gaps:** 8px, 12px, 16px, 24px, 32px (mobile-first increments)
- **Touch targets:** 48px minimum (button, link, input area)
- **Card padding:** 16px (mobile), 24px (desktop)
- **Section margins:** 24px (mobile), 32px (desktop)

## Component Patterns

- **Alert card:** Badge (Danger/Warning/Safe) + Icon + Title + Description + Timestamp
- **Resource card:** Icon + Name + Distance + Address + CTA button
- **Button:** Large, rounded 6px, full-width on mobile, 48px+ height, label + optional icon
- **Input:** 44px height, 12px focus ring, semantic background color
- **Badge:** Inline alert status (4px radius, 8px padding, sans-serif 12px)

## Motion

- **Entrance:** `slide-in-top` 0.3s ease-out (alerts, new content)
- **Pulse:** `pulse-alert` 2s loop (active danger states)
- **Transitions:** `transition-smooth` 0.3s for all interactive elements
- **Page load:** Staggered fade-in (header → alerts → cards)

**Constraint:** No bounce animations. No parallax. Smooth, purposeful motion only.

## Accessibility

- Minimum contrast: **AA** all modes (L diff ≥0.7, C-neutral)
- Touch targets: 48px min for all interactive elements
- Icons + text always paired (no icon-only affordances)
- Focus rings: `ring-2 ring-ring` (blue 0.60 0.18 200)
- Labels: Explicit for all inputs
- Color + symbol for status (never color alone)

## Signature Detail

**Alert severity band:** Left border (4px solid) in semantic color (red/orange/blue/green) paired with badge. Immediate visual parsing under pressure. Accessible via color + icon + text.

## Constraints

- ✓ Mobile-first responsive
- ✓ Light & dark mode (both intentional, not inverted)
- ✓ No external images (except hero placeholder)
- ✓ No gradients on text
- ✓ No decorative elements
- ✓ All typography semantic tokens
- ✗ No skewed elements
- ✗ No complex animations
- ✗ No 3D transforms
