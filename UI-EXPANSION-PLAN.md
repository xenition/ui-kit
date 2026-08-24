# @xenition/ui — 200+ Component Expansion Plan

Goal: add **200+ new UI components** (web + native parity where it makes sense) to `@xenition/ui`
(`ui-kit-private`), plus the related `@xenition/ui/data` hooks and any `@xenition/sdk` additions the
composed blocks need, so the no-code generator (cortex) and the 200+ templates have a real, themed,
drop-in component for every common need — following `nocode-pipeline/knowledge/design.md`.

Status legend: ⬜ not started · 🟨 in progress · 🟩 done · ⏭️ skipped/deferred

> **PRIORITY (2026-08-24): MOBILE / React Native FIRST.** Mobile is the main target. Build the
> **`@xenition/ui/native/*`** version of every batch first and ship it; the web (`@xenition/ui`)
> parity follows in a later pass. So within each batch below, *native is the deliverable now*, web
> is tracked separately (⬜ web-parity) and done afterward. Native components use `useXenitionTheme()`
> → `colors.{surface,onSurface,primary,onPrimary,accent,onAccent,muted,border,success,onSuccess,warn,onWarn,danger,onDanger}`
> and `tokens.{radius.{sm,md,lg,full}, spacing.{xs,sm,md,lg,xl,2xl}, typography.scale.*}` — no literal colors.
> Reference implementation: `src/native/primitives/Card.tsx` (theme read) + `Button.tsx` (variants/press).

---

## 0. Research findings (the contract every new component must honor)

**Repos & tooling**
- `@xenition/ui` = `ui-kit-private`, branch **`develop`** (no `main`; develop is the release branch). Build `tsc`, test `jest`. `node_modules` present.
- `@xenition/sdk` = `xenition-sdk`, `develop`==`main` (keep synced). Build `tsc` (node+browser), test `jest`.
- Templates (`xenition/templates/tpl-*`) depend on `@xenition/ui@^0.1.3` + `@xenition/sdk@^0.1.2`; frontend composes `@xenition/ui`, mobile composes `@xenition/ui/native/*`.
- cortex no-code: generation prompts list the catalog in `cortex/src/engine/api/routes_assist.py` (web `_APP_FRONTEND_SYS` + native variants, ~L1720–1890); version pin `_UI_VERSION` / `_SDK_VERSION` in `cortex/src/engine/nocode/scaffold.py` (`ENGINE_NOCODE_UI_KIT_REF`).

**Token contract (MANDATORY — CI lint forbids literal colors)**
- Web: Tailwind classes bound to `--xen-*` — `bg-primary text-on-primary bg-surface text-on-surface border-border bg-danger text-on-danger bg-success bg-warn bg-accent bg-neutral-50…900`, radius `rounded-[var(--xen-radius-md)]`, spacing `--xen-space-*`, type `--xen-text-*`, fonts `--xen-font-heading|body`.
- Native: `useXenitionTheme()` from `../theme`; read tokens into `StyleSheet`; no literal hex.

**Component pattern (match exactly)**
- Web file `src/<module>/<Name>.tsx`: `React.forwardRef` where a DOM node exists, typed `…Props`, variant/size records, `cn(...)` from `./cn`, all classes token-bound, doc-comment noting the token rule.
- Native file `src/native/<module>/<Name>.tsx`: same prop names, `onPress` for `onClick`, `Pressable`/`View`/`Text`, tokens via `useXenitionTheme()`.
- Export from the module `index.ts` (component **and** its types).
- Spec `src/<module>/<group>.spec.tsx` (jsdom for web; `render-native` for native) — at least render + key-behavior + a token-class assertion.
- Composed blocks that touch data take a passed-in client/handlers (`onSubmit`, `onCreate`…) — never hard-code endpoints; wire to `@xenition/sdk` at the app layer.

**New export subpaths to add to `package.json` exports + tsconfig** (each needs an `index.ts` + a `dist` mapping and a matching `./native/*`):
- `./layout`, `./charts`, `./dashboard` (web) and `./native/layout`, `./native/charts`, `./native/dashboard`.

**Design rules for every component (from design.md + COMPONENTS.md §"Design rules")**
1. Token-bound only; no literal colors/spacing/radii.
2. Semantic, variant-driven (`variant`/`size`/`tone`), not one-offs. Reuse the existing vocabulary.
3. Design the **states**: default, loading, empty, error, disabled, selected (per design.md §14).
4. Accessibility: roles/labels, focus-visible ring, contrast, state not by color alone, touch targets (native).
5. Reduced-motion aware for anything animated; motion tokens (`motion.duration.*`) where they exist.
6. Web + native parity for anything an app screen renders; marketing/dashboard blocks may be web-first (note it).
7. Import SDK types, never redeclare. No invented SDK methods/modules (see backend.md).

**Verification gate per batch (all must pass before 🟩):**
`npx tsc --noEmit` clean · `npx jest <specs>` green · new names in module `index.ts` · exports map updated if new subpath · demo/build sanity.

---

## 1. Release & integration (do once, then per-batch)

- 🟩 **R1** (native) Added `./native/layout`, `./native/charts`, `./native/dashboard` export subpaths to `package.json` (barrels created by the module agents). Web `./layout`/`./charts`/`./dashboard` — ⬜ later pass.
- ⬜ **R2** After each batch: update `COMPONENTS-INVENTORY.md` + `COMPONENTS.md` counts.
- ⬜ **R3** Version bump `@xenition/ui` `0.1.3 → 0.2.0` (minor, additive) when the first batches land; keep bumping patch as batches ship.
- ⬜ **R4** cortex: extend the web + native catalog text in `routes_assist.py` with the new component names (both/all `_APP_FRONTEND_SYS` variants); bump `_UI_VERSION` default to the published `^0.2.0`.
- ⬜ **R5** SDK: only if a composed block needs it — add `@xenition/ui/data` hooks (in the kit, not the SDK) first; touch `@xenition/sdk` only for genuinely missing *read* helpers, additively, `develop`==`main`.
- ⬜ **R6** Smoke test: build one template's `frontend/` against the linked kit (`npx vite build`) to prove no regression.
- ⬜ **R7** Commit per batch on `develop` (ui-kit) / `develop`==`main` (sdk); keep in sync per the standing rule.

---

## 2. Batches (each ~15–22 components, web + native parity noted)

### 🟩 Batch 1 — Layout module — **native 🟩 DONE** · web ⬜  [16]
Foundational; unblocks everything else. Shipped `@xenition/ui/native/layout` (commit fd82ff7).
`Container` ⬜ · `Row` ⬜ · `Col` ⬜ · `Grid` ⬜ · `Flex` ⬜ · `Space` ⬜ · `Divider` ⬜ · `Center` ⬜ · `AspectRatio` ⬜ · `ScrollArea` ⬜ · `Sticky` ⬜ · `Splitter` ⬜ · `Resizable` ⬜ · `Masonry` ⬜ · `PageHeader` ⬜ · `Section` ⬜

### ⬜ Batch 2 — Data-entry expansion (`primitives` + native)  [22]
`TimePicker` · `DateRangePicker` · `ColorPicker` · `PasswordInput` · `CurrencyInput` · `PhoneInput` · `MaskedInput` · `InputGroup` · `AutoComplete` · `MultiSelect` · `TagInput` · `TreeSelect` · `Cascader` · `Transfer` · `Mentions` · `RichTextEditor` · `MarkdownEditor` · `SignaturePad` · `ToggleGroup` · `RangeSlider` · `SearchInput` · `FormWizard`

### ⬜ Batch 3 — Data display expansion (`primitives` + native)  [22]
`Tree` · `Carousel` · `QRCode` · `Calendar` · `Kanban` · `Statistic` · `StatGroup` · `MetricCard` · `Feed` · `VirtualList` · `InfiniteScroll` · `ExpandableTable` · `TreeTable` · `Sparkline` · `Heatmap` · `Gauge` · `CodeBlock` · `DiffViewer` · `JsonViewer` · `KeyValue` · `Comparison` · `CommentThread`

### ⬜ Batch 4 — Navigation (`primitives` + native)  [16]
`Anchor` · `BackTop` · `Affix` · `FloatButton` · `CommandPalette` · `ContextMenu` · `Dock` · `NavRail` · `MegaMenu` · `ScrollSpy` · `BottomNav` · `Toolbar` · `ButtonGroup` · `SplitButton` · `NestedMenu` · `TabScroller`

### ⬜ Batch 5 — Feedback & overlays (`primitives` + native)  [16]
`Notification` · `Banner` · `Callout` · `Tour` · `ConfirmDialog` · `HoverCard` · `Snackbar` · `Ribbon` · `Watermark` · `Result` · `LoadingOverlay` · `ProgressCircle` · `ErrorState` · `Sheet` · `Dialog` · `InlineEdit`

### 🟩 Batch 6 — Charts module — **native 🟩 DONE (12 View-based)** · SVG charts ⏭️ deferred · web ⬜  [14]
Shipped `@xenition/ui/native/charts` (fd82ff7). ⏭️ Line/Area/Pie/Donut/Radar/Gauge need `react-native-svg` — decide whether to add that peer dep before building them.
`LineChart` · `BarChart` · `AreaChart` · `PieChart` · `DonutChart` · `Sparkline` · `GaugeChart` · `ProgressRing` · `RadarChart` · `ScatterChart` · `StackedBar` · `Histogram` · `TrendCard` · `MiniBar`

### 🟩 Batch 7 — Dashboard/app blocks — **native 🟩 DONE (16)** · web ⬜  [18]
Shipped `@xenition/ui/native/dashboard` (fd82ff7).
`StatCard` · `KpiRow` · `ActivityFeed` · `NotificationCenter` · `ProfileHeader` · `AccountMenu` · `SettingsLayout` · `TwoColumnLayout` · `ThreeColumnLayout` · `PageContainer` · `FilterBar` · `SearchHeader` · `DataToolbar` · `BulkActions` · `ColumnManager` · `SavedViews` · `InboxLayout` · `OnboardingChecklist`

### ⬜ Batch 8 — Marketing expansion (`marketing` + native backfill)  [20]
`HeroSplit` · `HeroVideo` · `HeroCentered` · `FeatureTabs` · `FeatureSteps` · `PricingCards` · `PricingComparison` · `TestimonialCarousel` · `TestimonialWall` · `LogoMarquee` · `StatsBand` · `TeamGrid` · `Roadmap` · `BlogGrid` · `ArticleHeader` · `Newsletter` · `CookieBanner` · `AnnouncementBar` · `ComparisonTable` · `ContactSection`

### ⬜ Batch 9 — Commerce expansion (`commerce` + native)  [18]
`ProductGallery` · `VariantSelector` · `PriceRangeSlider` · `ProductFilters` · `RatingSummary` · `WishlistButton` · `MiniCart` · `CheckoutSteps` · `AddressForm` · `PaymentForm` · `CouponInput` · `OrderTimeline` · `ShippingSelector` · `ReviewList` · `StarBreakdown` · `StockBadge` · `ProductTabs` · `BuyBox`

### ⬜ Batch 10 — Booking & media expansion (`booking`/`media` + native)  [16]
Booking: `BookingDateRange` · `TimeSlotGrid` · `AvailabilityCalendar` · `ResourcePicker` · `GuestCounter` · `BookingForm` · `ServiceCard` · `StaffPicker`
Media: `VideoPlayer` · `AudioPlayer` · `ImageZoom` · `CarouselGallery` · `AvatarUploader` · `FilePreview` · `MediaGrid` · `PdfViewer`

### ⬜ Batch 11 — Motion expansion (`motion` + native)  [12]
`FadeIn` · `SlideIn` · `ScaleIn` · `ScrollReveal` · `TextReveal` · `Typewriter` · `Shimmer` · `PageTransition` · `Ripple` · `SpotlightCard` · `MagneticButton` · `FlipCard`

### ⬜ Batch 12 — Data hooks + native parity backfill (`@xenition/ui/data`)  [12+]
Hooks: `useMutation` · `usePaginatedResource` · `useInfiniteResource` · `useAuth` · `useUpload` · `useDebounce` · `useMediaQuery` · `useLocalStorage` · `useDisclosure` · `useClipboard`
+ native versions of the highest-value new primitives that a mobile screen renders (from batches 2–5).

**Running total target:** 16+22+22+16+16+14+18+20+18+16+12+12 = **202 web components** (+ native parity + 10 hooks). Adjust counts as batches finalize.

---

## 3. Progress log
- 2026-08-24 — Plan created after deep research of knowledge/, ui-kit, sdk, templates, cortex integration.
- 2026-08-24 — **Wave 1 (native) shipped** (commit fd82ff7): native/layout (16) + native/charts (12) + native/dashboard (16) = **44 mobile components**. tsc clean, 565/565 jest green, dist emits all three. Built by 3 parallel subagents, integrated + verified together.
- **Follow-ups noted:** (a) add a native `Icon` primitive — several dashboard blocks want one (currently glyphs/caller-supplied). (b) decide on `react-native-svg` to unlock Line/Area/Pie/Donut/Radar/Gauge charts. (c) cortex `routes_assist.py` native prompt must be extended with `@xenition/ui/native/{layout,charts,dashboard}` once a batch of these is published.

## Running native total: 44 / ~202 new (wave 1). Next waves: native/primitives data-entry + feedback/overlay expansion, then native marketing/commerce/booking/media, then web parity + cortex prompt + version bump.
