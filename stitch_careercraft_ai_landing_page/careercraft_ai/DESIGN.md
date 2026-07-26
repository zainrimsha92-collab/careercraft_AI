---
name: CareerCraft AI
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#424754'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The design system is built for a premium, AI-driven career platform. The brand personality is **Professional, Visionary, and Methodical**. It avoids the clutter of traditional resume builders in favor of a high-end SaaS aesthetic that feels like a high-performance productivity tool rather than a static document editor.

The visual style is **Modern Minimalist with Glassmorphic accents**. It utilizes a pure white canvas to emphasize content clarity, while leveraging vibrant gradients and subtle translucency to signal "AI intelligence" and innovation. The emotional response should be one of confidence and calm—giving the user the feeling that their professional narrative is being elevated by sophisticated technology.

## Colors
The palette is anchored by a **Pure White (#FFFFFF)** background to ensure maximum readability and a "blank canvas" feel for resume creation. 

- **Primary Blue (#3B82F6)**: Used for primary actions, focus states, and progress indicators. It represents stability and professional trust.
- **Deep Purple (#8B5CF6)**: Used as a secondary accent and in gradients paired with the primary blue to signify "AI Power" or "Premium Features."
- **Neutral Slate (#0F172A)**: Used for primary text and high-contrast UI elements to maintain a grounded, authoritative feel.
- **Surface Accent (#F8FAFC)**: A very light cool grey used for subtle section nesting and background fills for input areas.

## Typography
The system uses a pairing of **Geist** for structural elements and **Inter** for long-form content. 

- **Geist** provides a technical, precise character for headings and UI labels, reflecting the "AI" and "Craft" nature of the product.
- **Inter** is utilized for body copy and the resume content itself, chosen for its exceptional legibility and neutral tone.
- **Visual Hierarchy**: Headlines should use tight letter-spacing and heavy weights to create a strong presence against the white space. Labels are often semi-bold to ensure they remain distinct at smaller sizes.

## Layout & Spacing
The layout follows a **Flexible Grid** logic with generous negative space to prevent cognitive overload during the resume-building process.

- **Desktop**: A 12-column grid with a 24px gutter. The workspace typically uses a split-view: a 4-column control panel on the left and an 8-column "Live Preview" on the right.
- **Vertical Rhythm**: A 4px baseline grid ensures consistent alignment of text and components.
- **Margins**: Use `lg` (32px) or `xl` (48px) padding within major cards to maintain a premium, airy feel.
- **Responsiveness**: On tablet, the layout shifts to a stacked view where the preview is pinned to the bottom or accessible via a toggle. Mobile uses a 4-column grid with 16px margins.

## Elevation & Depth
This design system employs a **Layered Glass** approach to create depth without visual heavy-handedness.

- **Background**: Level 0 is the pure white base.
- **Cards**: Level 1 uses a subtle "soft shadow"—an ambient, wide-spread blur (0px 10px 30px rgba(0,0,0,0.04))—to lift the resume and input sections off the canvas.
- **Navigation**: The top navigation and floating action bars use **Glassmorphism**. This includes a `blur(12px)` backdrop with a semi-transparent white fill (80% opacity) and a 1px white border (10% opacity) to create a "frosted" effect.
- **Overlays**: Modals and dropdowns use a slightly more aggressive shadow and a dark-tinted backdrop blur to focus the user’s attention.

## Shapes
The shape language is defined by **large, friendly radii** that soften the technical nature of the AI.

- **Standard Elements**: Buttons and inputs use a 0.5rem (8px) radius.
- **Featured Cards**: Major containers and the resume preview use `rounded-2xl` (1.5rem / 24px) to create a distinct, modern SaaS look.
- **Chips**: Use a full "Pill" radius for status indicators and skill tags to differentiate them from actionable buttons.

## Components
- **Buttons**: Primary buttons feature a subtle linear gradient (Primary Blue to Secondary Purple) with white text. Hover states should slightly increase the shadow intensity.
- **Input Fields**: Focus states are indicated by a 2px Primary Blue border and a soft glow. Labels should be small and set in Geist.
- **Cards (2xl)**: Use a 1px border (#F1F5F9) combined with the soft shadow defined in Elevation. 
- **AI Indicator**: A specific "AI Sparkle" chip that uses a glassmorphic background and purple text to highlight AI-generated suggestions.
- **Resume Preview**: This component is treated as a "Document Class" element. It retains traditional document proportions but is wrapped in a `rounded-2xl` container with a significant shadow to make it feel like a physical object resting on the digital surface.
- **Glass Navigation**: The header remains sticky, using the backdrop-blur effect to allow content to scroll underneath beautifully.