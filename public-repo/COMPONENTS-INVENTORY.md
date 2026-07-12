# @xenition/ui — Full Component Inventory

Every component is theme-token-bound (colors/spacing/radius from the seed → no hard-coded colors).

- **Frontend (web): 100 components** — import from `@xenition/ui` (+ module subpaths).
- **Mobile (native / React Native): 44 components** — import from `@xenition/ui/native/*`.

Related: build/gap history in [COMPONENTS.md](./COMPONENTS.md).

---

## Frontend (web) — 100

### primitives (`@xenition/ui`) — 58
Accordion · Alert · AuthCard · Avatar · AvatarGroup · Badge · Breadcrumb · Button · Card ·
ChatBubble · Checkbox · Combobox · CrudTable · DataTable · DatePicker · Descriptions · Drawer ·
Eyebrow · Field · ForgotPasswordForm · Form · GlassPanel · GradientText · Input · Label · List ·
LoginForm · Menu · MessageList · Modal · NumberInput · Pagination · PinInput · Popconfirm · Popover ·
Progress · RadioGroup · Rating · Segmented · Select · SignupForm · Skeleton · Slider · Spinner ·
Stack · StatusDot · StatusMessage · Steps · Switch · Table · Tabs · Tag · Textarea · Timeline ·
ToastProvider · Tooltip · Upload
*(+ hooks/helpers: `useForm`, `useToast`, `useDismiss`, `cn`; data: `useResource` from `@xenition/ui/data`)*

### marketing (`@xenition/ui/marketing`) — 22
AuroraBackground · BentoGrid · CTABanner · EditorialGrid · EntityCard · FAQ · FeatureGrid · Footer ·
GenerativeCover · GradientHero · LogoCloud · Navbar · OrnamentRule · ParticleField · PointerHalo ·
PriceList · PricingTable · ProductMock · SectionDivider · SectionHeading · StatBar · Testimonials

### commerce (`@xenition/ui/commerce`) — 9
CartLineItem · CartSummary · EmptyState · OrderSummary · PriceTag · ProductCard · ProductGrid ·
QuantityStepper · StatusBadge

### booking (`@xenition/ui/booking`) — 3
BookingCalendar · BookingSummary · SlotPicker

### media (`@xenition/ui/media`) — 3
Gallery · Lightbox · MediaFigure

### motion (`@xenition/ui/motion`) — 6
AnimatedCounter · Marquee · Parallax · Reveal · Stagger · TiltCard

---

## Mobile (native / React Native) — 44

### native/primitives (`@xenition/ui/native/primitives`) — 27 (+ XenitionUIProvider)
Avatar · Badge · Button · Card · ChatBubble · Checkbox · EmptyState · Eyebrow · Field · GlassPanel ·
GradientText · Input · Label · MessageList · Modal · PriceTag · Rating · Select · Spinner · Stack ·
StatusDot · StatusMessage · Switch · Table · Tabs · Textarea · XenitionUIProvider

### native/commerce (`@xenition/ui/native/commerce`) — 10
CartLineItem · CartSummary · EmptyState · GenerativeCover · OrderSummary · PriceTag · ProductCard ·
ProductGrid · QuantityStepper · StatusBadge

### native/booking (`@xenition/ui/native/booking`) — 3
BookingCalendar · BookingSummary · SlotPicker

### native/media (`@xenition/ui/native/media`) — 3
Gallery · Lightbox · MediaFigure

### native/marketing (`@xenition/ui/native/marketing`) — 1
EntityCard

### native/motion (`@xenition/ui/native/motion`) — 2
Reveal · Stagger

---

## Notes
- **Composed, drop-in blocks** (the "just call it" ones): `LoginForm`, `SignupForm`, `ForgotPasswordForm`,
  `AuthCard`, `DataTable`, `CrudTable`, plus all marketing/commerce/booking sections.
- **Codegen (cortex):** the frontend generation prompt surfaces these so generated web apps compose them
  (tested: `python3 -m ast` parse-verified; both `_APP_FRONTEND_SYS` variants updated).
- **Verified:** `tsc` clean · `npm run build` clean · 399/399 tests pass.
- **Live demo:** the new components render in the local demo at `http://localhost:5173/sdk-test`.
