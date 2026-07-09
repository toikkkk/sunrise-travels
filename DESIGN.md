---
name: Sunrise Horizon
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#584238'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#8b7266'
  outline-variant: '#dfc0b3'
  surface-tint: '#9f4200'
  primary: '#9f4200'
  on-primary: '#ffffff'
  primary-container: '#ff7e33'
  on-primary-container: '#632600'
  inverse-primary: '#ffb692'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#855316'
  on-tertiary: '#ffffff'
  tertiary-container: '#d49654'
  on-tertiary-container: '#553000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb692'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#793100'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#fcb973'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#683c00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built to evoke the optimism of a new journey. It targets travelers seeking reliable, professional shuttle services between East Java's primary hubs. The brand personality is professional yet vibrant, balancing the efficiency of a booking engine with the warmth of a sunrise.

The visual style follows a **Modern Corporate** aesthetic with a **Tactile** edge. It utilizes high-quality imagery of Banyuwangi, Surabaya, and Malang to ground the digital experience in physical locations. The UI relies on clean white space to emphasize clarity in the booking process, while using vibrant gradients and interactive elements to maintain engagement.

## Colors

The palette is inspired by the "Sunrise" theme, utilizing high-contrast pairings to ensure legibility and a professional feel.

- **Primary (Solar Orange):** Used for primary actions, CTAs, and active states. It represents energy and the "Sunrise" brand identity.
- **Secondary (Midnight Blue):** Used for navigation backgrounds, footers, and primary headings to provide a grounded, trustworthy foundation.
- **Tertiary (Dawn Glow):** A softer orange used for secondary accents, hover states, and subtle highlights.
- **Neutral:** A range of slate grays used for body text, borders, and UI scaffolding to keep the focus on travel imagery and primary actions.
- **White/Base:** A crisp white background is maintained to ensure the interface feels modern and "airy."

## Typography

This design system uses a dual-font strategy to balance character with utility.

- **Montserrat** is the display face. Its geometric construction and bold weights are used for headlines and hero sections to convey confidence and excitement.
- **Inter** is the workhorse font for all functional elements. Its high legibility and neutral tone make it perfect for booking forms, schedules, and descriptive body copy.

All "Display" styles should transition to their mobile counterparts (e.g., `display-lg` to `display-lg-mobile`) at the 768px breakpoint to maintain readability on smaller devices.

## Layout & Spacing

The layout follows a **Fixed Grid** system for desktop, centering content within a 1280px container to ensure a premium, editorial feel. 

- **Grid:** A 12-column grid is used for desktop (40px margins), transitioning to a 4-column grid for mobile (16px margins).
- **Booking Flow:** The primary booking interface (BWI/SBY/MLG selection) should be contained within a prominent, elevated horizontal bar or card that sits "above the fold."
- **Spacing Rhythm:** Use 8px increments (Base 8). Stacked elements (cards, sections) should use `stack-md` or `stack-lg` to ensure the interface never feels cluttered.

## Elevation & Depth

Visual hierarchy is achieved through **Ambient Shadows** and tonal layering. 

- **Level 1 (Base):** The main background is flat white or an extremely light gray (#F8FAFC).
- **Level 2 (Cards/Inputs):** Travel destination cards and booking forms use a white surface with a soft, diffused shadow (0px 4px 20px rgba(15, 23, 42, 0.08)).
- **Level 3 (Interactive/Hover):** On hover, cards lift slightly with a more pronounced shadow and a subtle 1px border in the Primary color to indicate interactivity.
- **Overlays:** Modals or mobile menus use a high-elevation shadow and a 20% opacity backdrop blur to maintain focus.

## Shapes

The shape language is **Rounded**, reflecting a friendly and modern travel experience. 

- **Standard Elements:** Buttons, input fields, and small cards use the `rounded` (0.5rem) token.
- **Large Components:** Feature sections and hero images use `rounded-lg` (1rem) or `rounded-xl` (1.5rem) to soften the overall aesthetic.
- **CTAs:** The WhatsApp "Tour" button uses a full pill-shape to distinguish it from standard navigation or booking actions.

## Components

### Buttons
- **Primary:** Solid "Solar Orange" with white text. High-contrast and slightly bold.
- **Secondary:** "Midnight Blue" outline with "Midnight Blue" text for less critical actions.
- **WhatsApp CTA:** Dedicated green or primary-colored pill-shaped button with a WhatsApp icon, fixed or prominently placed for "Tour" services (+62 896-3055-0000).

### Booking Cards
- Cards must clearly display the route (e.g., BWI → SBY).
- Avoid car imagery; instead, use icons representing "Shuttle" or "Travel Service."
- Include price points prominently in "Midnight Blue."

### Input Fields
- Clean, 0.5rem rounded borders with 1px slate-gray stroke.
- Focus state: Border changes to "Solar Orange" with a subtle glow.
- Large, easy-to-tap touch targets for mobile users selecting dates or locations.

### Lists & Schedules
- Use clean, horizontal rows for shuttle times.
- Use "Dawn Glow" for badges indicating "Available" or "Morning" slots.
- Ensure the contrast between location names (SBY, MLG, BWI) and times is high.

### Interactive Elements
- Hover states on cards should include a 2px vertical lift.
- Transitions should be smooth (200ms ease-in-out) to reinforce the "professional" brand feel.