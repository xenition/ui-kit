# @xenition/ui — 200+ Component Expansion Plan

Goal: add **200+ new UI components** (web + native parity where it makes sense) to `@xenition/ui`
(`ui-kit-private`), plus the related `@xenition/ui/data` hooks and any `@xenition/sdk` additions the
composed blocks need, so the no-code generator (cortex) and the 200+ templates have a real, themed,
drop-in component for every common need — following `nocode-pipeline/knowledge/design.md`.

Status legend: ⬜ not started · 🟨 in progress · 🟩 done · ⏭️ skipped/deferred

> **UPDATED DIRECTIVES (2026-08-24, user):** "do all" — (1) add `react-native-svg` and build the SVG charts; (2) do **web parity** for everything; (3) **prep the release** (version bump + cortex prompt) — publishing waits on the npm key (user provides later); (4) go **beyond 200** components, as many as useful; (5) **audit & correct EXISTING components** against the knowledge docs (`design.md`, `mobile.md`, `backend.md`, `database.md`) — states, empty states, accessibility, token discipline, mobile safe-areas, etc.

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
- 🟩 **R2** `COMPONENTS-INVENTORY.md` rewritten for v0.2.0 (the old doc was stale). `COMPONENTS.md` gap-history left as-is.
- 🟩 **R3** `@xenition/ui` bumped `0.1.3 → 0.2.0` (package.json). Publish to npm is the only remaining step — waits on the npm key (user provides).
- ⬜ **R4 (STAGED — apply at publish, do NOT deploy before 0.2.0 is on npm or generation references unpublished components):** in `cortex/src/engine/nocode/scaffold.py` set `_UI_VERSION` default `^0.1.0 → ^0.2.0`, and add `"react-native-svg": "15.15.5"` + `"react-native-safe-area-context": "4.14.1"` to the generated MOBILE app deps (near the `@xenition/ui` native dep, ~L108). In `cortex/src/engine/api/routes_assist.py` extend the native prompt (~L1772-1834, both `_APP_FRONTEND_SYS` native variants) to mention the new native subpaths — "`@xenition/ui/native/layout` (Container/Row/Grid/Flex/ScrollArea/Section/PageHeader…), `@xenition/ui/native/charts` (Bar/Line/Pie/Donut/Gauge/ProgressRing…), `@xenition/ui/native/dashboard` (StatCard/KpiRow/ActivityFeed/EmptyDashboard…)" and the new native primitives (Icon/BottomNav/FloatButton/ActionSheet/BottomSheet/Banner/Callout/Result/SearchInput/PasswordInput/TimePicker/MultiSelect/TagInput/RangeSlider/Tree/Calendar/Kanban/Toolbar/SplitButton…) — and the web prompt (~L1866-1886) likewise for `@xenition/ui/layout`, `@xenition/ui/charts`, `@xenition/ui/dashboard` + the new web primitives. Keep cortex `develop`==`main`.
- ⬜ **R5** SDK: only if a composed block needs it — add `@xenition/ui/data` hooks (in the kit, not the SDK) first; touch `@xenition/sdk` only for genuinely missing *read* helpers, additively, `develop`==`main`.
- ⬜ **R6 (at publish)** Smoke test: `npm link` the 0.2.0 kit into one template `frontend/` (+ one `mobile/`) and build, to prove no regression before flipping `_UI_VERSION`.
- ⬜ **R7** Commit per batch on `develop` (ui-kit) / `develop`==`main` (sdk); keep in sync per the standing rule.

---

## 2. Batches (each ~15–22 components, web + native parity noted)

### 🟩 Batch 1 — Layout module — **native 🟩 + web 🟩 DONE** [16]
Foundational; unblocks everything else. Shipped `@xenition/ui/native/layout` (commit fd82ff7).
`Container` ⬜ · `Row` ⬜ · `Col` ⬜ · `Grid` ⬜ · `Flex` ⬜ · `Space` ⬜ · `Divider` ⬜ · `Center` ⬜ · `AspectRatio` ⬜ · `ScrollArea` ⬜ · `Sticky` ⬜ · `Splitter` ⬜ · `Resizable` ⬜ · `Masonry` ⬜ · `PageHeader` ⬜ · `Section` ⬜

### 🟩 Batch 2 — Data-entry expansion — **native 🟩 (12 shipped)** · web ⬜  [22]
Shipped native (commit 98388ac): `SearchInput` `PasswordInput` `TimePicker` `DateRangePicker` `MultiSelect` `TagInput` `AutoComplete` `RangeSlider` `ToggleGroup` `PhoneInput` `CurrencyInput` `ColorPicker`.
⬜ Remaining native (lower priority / complex on RN): `MaskedInput` `InputGroup` `TreeSelect` `Cascader` `Transfer` `Mentions` `RichTextEditor` `MarkdownEditor` `SignaturePad` `FormWizard`.

### ⬜ Batch 3 — Data display expansion (`primitives` + native)  [22]
`Tree` · `Carousel` · `QRCode` · `Calendar` · `Kanban` · `Statistic` · `StatGroup` · `MetricCard` · `Feed` · `VirtualList` · `InfiniteScroll` · `ExpandableTable` · `TreeTable` · `Sparkline` · `Heatmap` · `Gauge` · `CodeBlock` · `DiffViewer` · `JsonViewer` · `KeyValue` · `Comparison` · `CommentThread`

### ⬜ Batch 4 — Navigation (`primitives` + native)  [16]
`Anchor` · `BackTop` · `Affix` · `FloatButton` · `CommandPalette` · `ContextMenu` · `Dock` · `NavRail` · `MegaMenu` · `ScrollSpy` · `BottomNav` · `Toolbar` · `ButtonGroup` · `SplitButton` · `NestedMenu` · `TabScroller`

### 🟩 Batch 5 — Feedback, overlays & mobile patterns — **native 🟩 (12 shipped)** · web ⬜  [16]
Shipped native (commit 98388ac): `Icon` (new base primitive) · `FloatButton` (FAB) · `BottomNav` · `ContextMenu` · `ActionSheet` · `BottomSheet` · `Banner` · `Callout` · `Result` · `LoadingOverlay` · `ButtonGroup` · `Watermark`.
⬜ Remaining: `Tour` · `HoverCard` · `Ribbon` · `ProgressCircle` (needs SVG) · `InlineEdit`. (`Notification`/`Snackbar`≈existing Toast; `ConfirmDialog`≈existing Popconfirm; `Sheet`/`Dialog`≈existing Drawer/Modal.)

### 🟩 Batch 6 — Charts module — **native 🟩 (12 View + 8 SVG) + web 🟩 (16) DONE** [28+]
Shipped `@xenition/ui/native/charts` (fd82ff7). ⏭️ Line/Area/Pie/Donut/Radar/Gauge need `react-native-svg` — decide whether to add that peer dep before building them.
`LineChart` · `BarChart` · `AreaChart` · `PieChart` · `DonutChart` · `Sparkline` · `GaugeChart` · `ProgressRing` · `RadarChart` · `ScatterChart` · `StackedBar` · `Histogram` · `TrendCard` · `MiniBar`

### 🟩 Batch 7 — Dashboard/app blocks — **native 🟩 + web 🟩 DONE (16 each)** [18]
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

## 2B. Existing-component corrections (from the knowledge-doc audit, 2026-08-24)
Audit clean on the scary stuff: no invalid RN roles, no `localhost`, no hardcoded endpoints, auth-form copy/states already good. Backlog:
- 🟩 **A1 (systemic, P1) safe-area insets** — add `react-native-safe-area-context` peerDep + thread `useSafeAreaInsets()` through the 6 edge-anchored native components: `BottomNav` (paddingBottom), `AppShell` top bar (top), `Toast` (top), `BottomSheet` (bottom), `ActionSheet` (bottom), `FloatButton` (bottom) + `dashboard/PageContainer`. (mobile.md — fails only on real hardware.)
- 🟩 **A2 (P0) LanguageSwitcher token cleanup** — `src/i18n/LanguageSwitcher.tsx` inline rem sizing + literal color/shadow fallbacks (`rgba(0,0,0,…)`, `#fff`, `#111`) that dodge the color-lint → route through `--xen-*`; add a `--xen-shadow`/`colors.scrim` token; add arrow-key nav for its `role="listbox"`.
- 🟩 **A3 (P1) chart a11y** — native + web charts render data visually only; add an `accessibilityLabel` data-summary + `accessibilityRole="image"` (mirror dashboard `StatCard`).
- 🟩 **A4 (P1) Toast native live region** — `src/native/primitives/Toast.tsx` add `accessibilityLiveRegion` (assertive for danger, polite else) + role `alert` for error.
- 🟩 **A5 (P1) numeric fontSize → type scale** — `Drawer`, `Accordion`, `Tooltip`, `Popconfirm`, `Menu` (native), and `native/marketing/RichText` inline `fontSize` numbers → `tokens.typography.scale.*` (Dynamic Type).
- 🟩 **A6 (P1) guiding empty states (§15)** — `DataTable`/`Table` (web+native) default `'No data'` → a two-line guiding default.
- 🟩 **A7 (P2) semantic scrim token** — add `colors.scrim`/`overlay`; unify AppShell (`ramps.neutral[950]`) vs BottomSheet/ActionSheet (`onSurface`) overlays; DatePicker day-cell touch target ≥44; verify reduced-motion on Countdown/GenerativeCover/GradientHero.

## 2C. Phase 2 — App-type DOMAIN modules (cover *any* app + real variety)
The core kit is broad; Phase 2 adds domain composed blocks so a builder can make any app type, plus variant-rich components. Mobile-first (native), web parity after. New native export subpaths wired (commit 93ee07a).
- 🟩 **native/social** — PostCard(text/image/link/video), FeedList, StoryBar, StoryRing, UserCard, FollowButton, ReactionBar, CommentItem, ShareSheet, Poll, HashtagChip, MentionText, ProfileStats, EngagementBar
- 🟩 **native/chat** — ConversationList/Row, ChatHeader, MessageComposer, TypingIndicator, MessageGroup, DateSeparator, ReadReceipt, AttachmentBar, VoiceNoteBubble, QuickReplies, UnreadDivider, PresenceDot
- 🟩 **native/finance** — TransactionRow, AccountCard(checking/savings/credit), BalanceHeader, BudgetBar, CreditCardView, SpendCategoryRow, InvoiceLine, TransferForm, StatementList, MoneyAmount, SavingsGoalCard, PaymentMethodRow, ExchangeRateRow
- 🟩 **native/health** — WorkoutCard, HabitRow, StreakCounter, MetricRing, MealCard, WaterTracker, SleepBar, ActivityRings, GoalCard, VitalStat, ExerciseRow, MoodPicker, BodyMetricCard
- 🟩 **native/productivity** — TaskRow, ChecklistItem, PriorityTag, ProjectCard, DueDatePill, AssigneeGroup, BoardColumn, SubtaskList, LabelChip, TimeTracker, MilestoneRow, NoteCard, ReminderRow
- 🟩 **native/travel** — FlightCard, HotelCard, ItineraryItem, SeatPicker, DestinationCard, TripSummary, BaggageRow, BoardingPass, PriceCalendar, MapCard(dep-free), ReviewStars, AmenityRow, WeatherStrip
- 🟩 **Domains wave 2 shipped:** learning, food, realestate, events, jobs, content (76 blocks, commit 12cdd92).
- 🟩 **Domains wave 3 shipped:** streaming, onboarding/paywall (24 blocks, commit d8702d6).
- 🟩 **Variant enrichment shipped (native):** Button/Card/Badge/Avatar/Alert/Tag additively enriched (d8702d6). Web variant-enrichment ⬜.
- ⬜ **Variant enrichment pass** on core primitives (Button/Card/Badge/Avatar/Alert/Tag/Input — more variants/tones/sizes/states) — careful edit of existing files.
- ⬜ **Web parity** for all Phase-2 domain modules.

- 2026-08-24 — **Phase 2 wave 1 shipped** (commit 328a9d9): 6 native domain modules (social/chat/finance/health/productivity/travel) = 79 composed blocks. tsc clean, 796/796 jest green. **Session total 247 new components.**

- 2026-08-24 — **Phase 2 wave 2 shipped** (commit 12cdd92): learning/food/realestate/events/jobs/content = 76 blocks. **Session total 323 new components.** tsc clean, 889/889 jest green.

- 2026-08-24 — **Phase 2 wave 3 shipped** (commit d8702d6): native streaming (12) + onboarding (12) + core-primitive variant enrichment. **Session total 347 new native components + variant pass.** 14 domain modules total. tsc clean, 927/927 jest green.

- 2026-08-24 — **Phase 2 wave 4 shipped**: dating/gaming/crypto/smarthome/weather/sports = 72 blocks. **20 domain modules, 419 native components.** tsc clean, 1024/1024 jest green.

- 2026-08-24 — **Phase 2 wave 5 shipped**: marketplace/medical/crm/support/automotive/insurance = 72 blocks. **26 domain modules, 491 native components.** tsc clean, 1111/1111 jest green.

## 3. Progress log
- 2026-08-24 — Plan created after deep research of knowledge/, ui-kit, sdk, templates, cortex integration.
- 2026-08-24 — **Wave 1 (native) shipped** (commit fd82ff7): native/layout (16) + native/charts (12) + native/dashboard (16) = **44 mobile components**. tsc clean, 565/565 jest green, dist emits all three. Built by 3 parallel subagents, integrated + verified together.
- **Follow-ups noted:** (a) add a native `Icon` primitive — several dashboard blocks want one (currently glyphs/caller-supplied). (b) decide on `react-native-svg` to unlock Line/Area/Pie/Donut/Radar/Gauge charts. (c) cortex `routes_assist.py` native prompt must be extended with `@xenition/ui/native/{layout,charts,dashboard}` once a batch of these is published.

- 2026-08-24 — **Wave 2 (native) shipped** (commit 98388ac): 24 new native primitives — data-entry gaps (12) + mobile patterns/feedback (12, incl. the `Icon` base primitive). tsc clean, 587/587 jest green, dist emits all. 2 parallel subagents, integrated together.
- **Discovery:** native was already far fuller than `COMPONENTS-INVENTORY.md` claimed (~66 native primitives + 34 native marketing = web parity, not 27+1). The doc is stale — see §Inventory correction. Many "obvious" components already exist; remaining waves target true gaps.

- 2026-08-24 — **Wave 4 shipped** (commit d158849): native SVG charts (8) + web layout (16) + web charts (16) + web dashboard (16) = 56 components. react-native-svg wired. tsc clean, 667/667 jest green. Audit backlog (§2B) captured.

- 2026-08-24 — **Audit fixes shipped** (commit 041ea3e): A1 safe-area insets (7 native components + react-native-safe-area-context), A2 LanguageSwitcher tokens+keyboard, A3 chart a11y (36 charts), A4 Toast live region, A5 fontSize→scale (6 files), A6 guiding empty states (4 tables), A7 DatePicker target + scrim. tsc clean, 667/667 green.

- 2026-08-24 — **Web-parity wave shipped** (commit d487ed5): web versions of all 34 new native primitives (data-entry 12, patterns/feedback 12, display/nav 10). tsc clean, 709/709 jest green. **v0.2.0** bump + inventory rewrite.

## Running total: **168 new components this session** (~196 web + ~200 native files ≈ 396 surfaces). + full audit-fix pass. v0.2.0 staged; publish + cortex R4 pending the npm key. (wave 1: 44 modules; wave 2: 24 primitives). 
Native primitives now ~90, + 3 new native modules (layout/charts/dashboard). Next: (a) cortex `routes_assist.py` native prompt + `_UI_VERSION` bump + publish `@xenition/ui@0.2.0` so mobile generation uses them [needs npm publish — release action]; (b) native display/navigation remaining gaps; (c) web parity for the 3 new modules + the 24 primitives; (d) SVG charts if `react-native-svg` is approved.
