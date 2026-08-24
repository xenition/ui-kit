# @xenition/ui — Full Component Inventory (v0.2.0)

Every component is theme-token-bound (colors/spacing/radius from the seed → no hard-coded colors; CI-lint enforced). Web = React DOM + Tailwind `--xen-*` classes. Native = React Native + `useXenitionTheme()`.

**Totals: ~196 web + ~200 native component files** across the modules below. Web imports from `@xenition/ui` (+ subpaths); native from `@xenition/ui/native/*`. Counts are source files (excluding specs/internal). Names live in each module's `index.ts` — that is the source of truth.

| Module | Web export | Web # | Native export | Native # |
|---|---|---|---|---|
| primitives | `@xenition/ui` (or `./primitives`) | 94 | `@xenition/ui/native/primitives` | 95 |
| layout | `@xenition/ui/layout` | 15 | `@xenition/ui/native/layout` | 15 |
| charts | `@xenition/ui/charts` | 16 | `@xenition/ui/native/charts` | 20 |
| dashboard | `@xenition/ui/dashboard` | 16 | `@xenition/ui/native/dashboard` | 16 |
| marketing | `@xenition/ui/marketing` | 34 | `@xenition/ui/native/marketing` | 34 |
| commerce | `@xenition/ui/commerce` | 9 | `@xenition/ui/native/commerce` | 10 |
| booking | `@xenition/ui/booking` | 3 | `@xenition/ui/native/booking` | 3 |
| media | `@xenition/ui/media` | 3 | `@xenition/ui/native/media` | 3 |
| motion | `@xenition/ui/motion` | 6 | `@xenition/ui/native/motion` | 4 |
| data (hooks) | `@xenition/ui/data` | — | — | — |
| i18n | `@xenition/ui/i18n` | — | — | — |

## New in v0.2.0 (this expansion — mobile-first, then web parity)
- **New modules (web + native):** `layout` (Container, Row, Column, Grid, Flex, Divider, ScrollArea, Section, PageHeader, Sticky, Inset, Bleed…), `charts` (Bar/Column/Line/Area/Pie/Donut/Radar/Gauge/ProgressRing/Scatter/Sparkline/StackedBar/Histogram/Heatmap/TrendCard/Legend — native has both View-based and `react-native-svg` families), `dashboard` (StatCard, KpiRow, ActivityFeed, ProfileHeader, SettingsRow/Section, PageContainer, FilterChips, SearchHeader, EmptyDashboard, MetricTile, QuickActions, OnboardingChecklist…).
- **New primitives (web + native):** data-entry — SearchInput, PasswordInput, TimePicker, DateRangePicker, MultiSelect, TagInput, AutoComplete, RangeSlider, ToggleGroup, PhoneInput, CurrencyInput, ColorPicker; patterns/feedback — **Icon**, FloatButton, BottomNav, ContextMenu, ActionSheet, BottomSheet, Banner, Callout, Result, LoadingOverlay, ButtonGroup, Watermark; display/nav — Tree, Statistic, Calendar, Kanban, VirtualList, CodeBlock, JsonViewer, Toolbar, SplitButton, ScrollableTabs.
- **New optional peer deps:** `react-native-svg` (native SVG charts), `react-native-safe-area-context` (native safe-area insets). Both optional; both mocked in tests.
- **Existing-component corrections** (knowledge-doc audit): safe-area insets on all edge-anchored native components; Toast live region; chart accessibility labels; numeric `fontSize` → type scale; guiding empty states; LanguageSwitcher token/keyboard cleanup.

## Verified
`tsc` clean · `npm run build` clean · **709/709 jest** (web + native projects) · dist emits every module.

> Full per-component lists: read each module's `src/**/index.ts`. Build/gap history in [COMPONENTS.md](./COMPONENTS.md); expansion log in [UI-EXPANSION-PLAN.md](./UI-EXPANSION-PLAN.md).
