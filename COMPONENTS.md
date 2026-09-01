# @xenition/ui — every component, module by module

**Version 0.21.0** · 53 modules · **838 components** · **374 V2/V3 variants** · **563 V4 variants** · 118 helpers.
Counted 2026-09-02 off `src/native/*/*.tsx`, with a base component, its V2/V3
alternate lines and its V4 line counted separately — the earlier figure folded V4
files into the component total and had drifted from the tree. Every module ships a **native**
(`@xenition/ui/native/<module>`) and a **web** (`@xenition/ui/<module>`) twin at prop parity.

This is the upgrade checklist. Tick the **done** box as you bring each component to the current
design pattern.

## Reading a row

| | |
|---|---|
| **component** | import it by this name |
| **variants** | the same component in another design line — **identical props**, different design. Pick one line per app and stay in it. |
| **done** | ⬜ not yet upgraded · ✅ upgraded to the current design pattern |

## Module status

| | meaning |
|---|---|
| ✅ **0.9.0 – 0.21.0** | on the current design pattern — `onboarding` is the reference for the *shell* and, since 0.13.0, is itself on the V4 line; `booking`, `media` and `agriculture` joined at 0.14.0, `automotive` and `beauty` at 0.15.0, `calendar` and `chat` at 0.16.0, `content` and `crm` at 0.17.0, `crypto`, `dating` and `email` at 0.18.0, `events` and `fieldservice` at 0.19.0, `finance` and `food` at 0.20.0, `gaming` and `government` at 0.21.0 |
| ⚠️ **0.8.0** | V2/V3 composition fixed, but predates the 0.9.0 shell |
| ❌ **0.7.0** | last touched at the V2/V3 rollout — **needs the pattern applied** |

**12 of 53 modules are on ❌**, 2 on ⚠️ and 39 on ✅ — counted from the headers below rather than
carried forward, because the figure in this paragraph had already gone stale once. The 40 have their
alternate designs but not the shell, spacing or control-height rules from 0.9.0, so a vertical screen
next to an onboarding screen does not yet read as the same app. The pattern to apply is in
`ONBOARDING-DESIGN-SPEC.md`; the worked example is the `onboarding` module.

Suggested order was **`layout` → `dashboard` → `charts`** first, because every vertical composes
them. **All three are done** (charts 2026-08-30). Next is the verticals you actually ship.

---

### `primitives` — 109 components · last updated **0.9.0** ✅

**Progress: 109 / 109 upgraded.** ✅ = has a V4 on the current design pattern. ⬜ = still on the old design.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `Accordion` | `AccordionV4` | ✅ |
| 2 | `ActionSheet` | `V4` | ✅ |
| 3 | `Alert` | `V4` | ✅ |
| 4 | `AppShell` | `AppShellV4` | ✅ |
| 5 | `AuthBrandTile` | `AuthBrandTileV4` | ✅ |
| 6 | `AuthCard` | `AuthCardV4` | ✅ |
| 7 | `AuthDivider` | `AuthDividerV4` | ✅ |
| 8 | `AuthField` | `AuthFieldV4` | ✅ |
| 9 | `AuthHeading` | `AuthHeadingV4` | ✅ |
| 10 | `AuthProviderButton` | `AuthProviderButtonV4` | ✅ |
| 11 | `AuthStickyFooter` | `AuthStickyFooterV4` | ✅ |
| 12 | `AuthSubmitButton` | `AuthSubmitButtonV4` | ✅ |
| 13 | `AuthSwitchFooter` | `AuthSwitchFooterV4` | ✅ |
| 14 | `AuthTermsCard` | `AuthTermsCardV4` | ✅ |
| 15 | `AutoComplete` | `AutoCompleteV4` | ✅ |
| 16 | `Avatar` | `AvatarV4` | ✅ |
| 17 | `AvatarGroup` | `AvatarGroupV4` | ✅ |
| 18 | `Badge` | `BadgeV4` | ✅ |
| 19 | `Banner` | `V4` | ✅ |
| 20 | `BottomNav` | `BottomNavV4` | ✅ |
| 21 | `BottomSheet` | `V4` | ✅ |
| 22 | `Breadcrumb` | `BreadcrumbV4` | ✅ |
| 23 | `Button` | `ButtonV4` | ✅ |
| 24 | `ButtonGroup` | `ButtonGroupV4` | ✅ |
| 25 | `Calendar` | `CalendarV4` | ✅ |
| 26 | `Callout` | `V4` | ✅ |
| 27 | `Card` | `CardV4` | ✅ |
| 28 | `ChatBubble` | `ChatBubbleV4` | ✅ |
| 29 | `Checkbox` | `CheckboxV4` | ✅ |
| 30 | `CodeBlock` | `CodeBlockV4` | ✅ |
| 31 | `ColorPicker` | `ColorPickerV4` | ✅ |
| 32 | `Combobox` | `ComboboxV4` | ✅ |
| 33 | `ContextMenu` | `ContextMenuV4` | ✅ |
| 34 | `CrudTable` | `CrudTableV4` | ✅ |
| 35 | `CurrencyInput` | `CurrencyInputV4` | ✅ |
| 36 | `DataTable` | `DataTableV4` | ✅ |
| 37 | `DatePicker` | `DatePickerV4` | ✅ |
| 38 | `DateRangePicker` | `DateRangePickerV4` | ✅ |
| 39 | `Descriptions` | `DescriptionsV4` | ✅ |
| 40 | `Drawer` | `DrawerV4` | ✅ |
| 41 | `EmptyState` | `EmptyStateV4` | ✅ |
| 42 | `Eyebrow` | `EyebrowV4` | ✅ |
| 43 | `Field` | `FieldV4` | ✅ |
| 44 | `FloatButton` | `FloatButtonV4` | ✅ |
| 45 | `ForgotPasswordForm` | `ForgotPasswordFormV4` | ✅ |
| 46 | `Form` | `FormV4` | ✅ |
| 47 | `GlassPanel` | — | ✅ |
| 48 | `GradientText` | — | ✅ |
| 49 | `Icon` | `IconV4` | ✅ |
| 50 | `Input` | `InputV4` | ✅ |
| 51 | `JsonViewer` | `JsonViewerV4` | ✅ |
| 52 | `Kanban` | `KanbanV4` | ✅ |
| 53 | `Label` | `LabelV4` | ✅ |
| 54 | `List` | `ListV4` | ✅ |
| 55 | `LoadingOverlay` | `V4` | ✅ |
| 56 | `LoginForm` | `LoginFormV4` | ✅ |
| 57 | `Menu` | `MenuV4` | ✅ |
| 58 | `MessageList` | `MessageListV4` | ✅ |
| 59 | `Modal` | `V4` | ✅ |
| 60 | `MultiSelect` | `MultiSelectV4` | ✅ |
| 61 | `NumberInput` | `NumberInputV4` | ✅ |
| 62 | `Pagination` | `PaginationV4` | ✅ |
| 63 | `PasswordInput` | `PasswordInputV4` | ✅ |
| 64 | `PhoneInput` | `PhoneInputV4` | ✅ |
| 65 | `PinInput` | `PinInputV4` | ✅ |
| 66 | `Popconfirm` | `PopconfirmV4` | ✅ |
| 67 | `Popover` | `PopoverV4` | ✅ |
| 68 | `PriceTag` | `PriceTagV4` | ✅ |
| 69 | `Progress` | `V4` | ✅ |
| 70 | `RadioGroup` | `RadioGroupV4` | ✅ |
| 71 | `RangeSlider` | `RangeSliderV4` | ✅ |
| 72 | `Rating` | `V4` | ✅ |
| 73 | `Result` | `V4` | ✅ |
| 74 | `ScrollableTabs` | `ScrollableTabsV4` | ✅ |
| 75 | `SearchInput` | `SearchInputV4` | ✅ |
| 76 | `Segmented` | `SegmentedV4` | ✅ |
| 77 | `Select` | `SelectV4` | ✅ |
| 78 | `Sidebar` | `SidebarV4` | ✅ |
| 79 | `SignupForm` | `SignupFormV4` | ✅ |
| 80 | `Skeleton` | `V4` | ✅ |
| 81 | `Slider` | `SliderV4` | ✅ |
| 82 | `Spinner` | `V4` | ✅ |
| 83 | `SplitButton` | `SplitButtonV4` | ✅ |
| 84 | `Stack` | `StackV4` (alias) | ✅ |
| 85 | `Statistic` | `StatisticV4` | ✅ |
| 86 | `StatusDot` | `V4` | ✅ |
| 87 | `StatusMessage` | `V4` | ✅ |
| 88 | `StepList` | `StepListV4` | ✅ |
| 89 | `Steps` | `StepsV4` | ✅ |
| 90 | `Switch` | `SwitchV4` | ✅ |
| 91 | `Table` | `TableV4` | ✅ |
| 92 | `Tabs` | `TabsV4` | ✅ |
| 93 | `Tag` | `TagV4` | ✅ |
| 94 | `TagInput` | `TagInputV4` | ✅ |
| 95 | `Text` | `TextV4` | ✅ |
| 96 | `Textarea` | `TextareaV4` | ✅ |
| 97 | `TimePicker` | `TimePickerV4` | ✅ |
| 98 | `Timeline` | `TimelineV4` | ✅ |
| 99 | `ToastProvider` | `ToastProviderV4` | ✅ |
| 100 | `ToggleGroup` | `ToggleGroupV4` | ✅ |
| 101 | `Toolbar` | `ToolbarV4` | ✅ |
| 102 | `Tooltip` | `TooltipV4` | ✅ |
| 103 | `Tree` | `TreeV4` | ✅ |
| 104 | `Upload` | `UploadV4` | ✅ |
| 105 | `VirtualList` | `VirtualListV4` | ✅ |
| 106 | `Watermark` | `WatermarkV4` | ✅ |
| 107 | `Wordmark` | `WordmarkV4` | ✅ |
| 108 | `XenitionNativeThemeProvider` | `XenitionNativeThemeProviderV4` | ✅ |
| 109 | `XenitionUIProvider` | `XenitionUIProviderV4` | ✅ |

*helpers:* `AUTH_CONTROL_HEIGHT`, `AUTH_DEFAULT_TERMS_LINKS`, `AUTH_TAP_TARGET`, `ICON_GLYPHS`, `formatMoney`, `isIconName`, `resolveIconGlyph`, `useForm`, `useReducedMotion`, `useToast`, `useXenitionTheme`

### `layout` — 18 components · last updated **0.9.0** ✅

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AspectRatio` | `AspectRatioV4` | ✅ |
| 2 | `Bleed` | `BleedV4` | ✅ |
| 3 | `Center` | `CenterV4` | ✅ |
| 4 | `Cluster` | `ClusterV4` | ✅ |
| 5 | `Column` | `ColumnV4` | ✅ |
| 6 | `Container` | `ContainerV4` | ✅ |
| 7 | `Divider` | `DividerV4` | ✅ |
| 8 | `Flex` | `FlexV4` | ✅ |
| 9 | `Grid` | `GridV4` | ✅ |
| 10 | `Inset` | `InsetV4` | ✅ |
| 11 | `KeyboardAvoider` | `KeyboardAvoiderV4` | ✅ |
| 12 | `ListSeparator` | `ListSeparatorV4` | ✅ |
| 13 | `PageHeader` | `PageHeaderV4` | ✅ |
| 14 | `Row` | `RowV4` | ✅ |
| 15 | `ScrollArea` | `ScrollAreaV4` | ✅ |
| 16 | `Section` | `SectionV4` | ✅ |
| 17 | `Spacer` | `SpacerV4` | ✅ |
| 18 | `Sticky` | `StickyV4` | ✅ |

*Three are single-platform, matching their bases:* `Cluster` and `Sticky` are web
only (`position: sticky` has no native equivalent), `KeyboardAvoider` is native
only. **`ListSeparator` is no longer one of them** — the V4 pass gave it a web
twin (`ListSeparatorV4`, exported from the web barrel) that the base line never
had, so 15 of the 18 are twinned at V4, not 14. Corrected 2026-08-30.

### `dashboard` — 16 components · last updated **0.8.0** ✅

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `ActivityFeed` | `ActivityFeedV4` | ✅ |
| 2 | `EmptyDashboard` | `EmptyDashboardV4` | ✅ |
| 3 | `FilterChips` | `FilterChipsV4` | ✅ |
| 4 | `KpiRow` | `KpiRowV4` | ✅ |
| 5 | `ListRow` | `ListRowV4` | ✅ |
| 6 | `MetricTile` | `MetricTileV4` | ✅ |
| 7 | `NotificationItem` | `NotificationItemV4` | ✅ |
| 8 | `OnboardingChecklist` | `OnboardingChecklistV4` | ✅ |
| 9 | `PageContainer` | `PageContainerV4` | ✅ |
| 10 | `ProfileHeader` | `ProfileHeaderV4` | ✅ |
| 11 | `QuickActions` | `QuickActionsV4` | ✅ |
| 12 | `SearchHeader` | `SearchHeaderV4` | ✅ |
| 13 | `SectionCard` | `SectionCardV4` | ✅ |
| 14 | `SettingsRow` | `SettingsRowV4` | ✅ |
| 15 | `SettingsSection` | `SettingsSectionV4` | ✅ |
| 16 | `StatCard` | `StatCardV4` | ✅ |

### `charts` — 20 components · last updated **0.10.0** ✅

**Progress: 20 / 20 upgraded.** Four of them — `ComparisonBars`, `MiniBar`,
`ProgressBars`, `RangeBar` — existed only on **native** until this pass; the
table counted 20 for both twins while web shipped 16. Their web twins were
built V4-only (there was no base to mirror), so the module is now genuinely 20
on both.

The pass is recorded in `CHARTS-V4-BRIEF.md`; the palette behind it, and the
validator run that locked it, in `src/primitives/internal/v4-chart.ts`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AreaChart` | `AreaChartV4` | ✅ |
| 2 | `BarChart` | `BarChartV4` | ✅ |
| 3 | `ColumnChart` | `ColumnChartV4` | ✅ |
| 4 | `ComparisonBars` | `ComparisonBarsV4` | ✅ |
| 5 | `DonutChart` | `DonutChartV4` | ✅ |
| 6 | `GaugeChart` | `GaugeChartV4` | ✅ |
| 7 | `Heatmap` | `HeatmapV4` | ✅ |
| 8 | `Histogram` | `HistogramV4` | ✅ |
| 9 | `Legend` | `LegendV4` | ✅ |
| 10 | `LineChart` | `LineChartV4` | ✅ |
| 11 | `MiniBar` | `MiniBarV4` | ✅ |
| 12 | `PieChart` | `PieChartV4` | ✅ |
| 13 | `ProgressBars` | `ProgressBarsV4` | ✅ |
| 14 | `ProgressRing` | `ProgressRingV4` | ✅ |
| 15 | `RadarChart` | `RadarChartV4` | ✅ |
| 16 | `RangeBar` | `RangeBarV4` | ✅ |
| 17 | `ScatterChart` | `ScatterChartV4` | ✅ |
| 18 | `Sparkline` | `SparklineV4` | ✅ |
| 19 | `StackedBar` | `StackedBarV4` | ✅ |
| 20 | `TrendCard` | `TrendCardV4` | ✅ |

### `motion` — 6 components (5 on native) · last updated **0.11.0** ✅

**Progress: 6 / 6 upgraded.** This row used to read "4 components", which was
the **native** count — the table is generated from `src/native/*/index.ts`, so a
module is counted at whichever twin the generator walks. Charts hit the same
defect in the other direction. Web has always shipped six.

| # | component | variants | done | twins |
|--:|---|---|:--:|---|
| 1 | `AnimatedCounter` | `AnimatedCounterV4` | ✅ | both |
| 2 | `Marquee` | `MarqueeV4` | ✅ | both |
| 3 | `Parallax` | `ParallaxV4` | ✅ | both — **native twin added 2026-08-30** |
| 4 | `Reveal` | `RevealV4` | ✅ | both |
| 5 | `Stagger` | `StaggerV4` | ✅ | both |
| 6 | `TiltCard` | `TiltCardV4` | ✅ | **web only** — pointer tilt needs hover, and touch has none |

*helpers:* `useReducedMotion` · `usePrefersReducedMotion` · `useInView`

The V4 pass put the module on the shared M3 scale it was ignoring — see
`MOTION-V4-BRIEF.md`. Two components stay off the *duration* scale on purpose:
a marquee's loop and a counter's count are **playback**, timed by their
content, not transitions between two states. Their easings come from the scale
like everything else.

### `onboarding` — 14 components, 12 with variants · last updated **0.13.0** ✅

**Progress: 14 / 14 upgraded.** The header used to read ✅ **0.9.0** with all 14
rows ⬜, and both were true: 0.9.0 gave the module the *shell* every other
module is told to copy, and never gave it the **V4 line** every finished module
has. The 0.13.0 pass closes that on both twins. See `ONBOARDING-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `FeatureLockCard` | `FeatureLockCardV2` · `FeatureLockCardV3` · `FeatureLockCardV4` | ✅ |
| 2 | `GetStartedButton` | `GetStartedButtonV4` | ✅ |
| 3 | `InterestPicker` | `InterestPickerV2` · `InterestPickerV3` · `InterestPickerV4` | ✅ |
| 4 | `OnboardingSlides` | `OnboardingSlidesV2` · `OnboardingSlidesV3` · `OnboardingSlidesV4` | ✅ |
| 5 | `OtpVerify` | `OtpVerifyV2` · `OtpVerifyV3` · `OtpVerifyV4` | ✅ |
| 6 | `PaywallFeatureRows` | `PaywallFeatureRowsV2` · `PaywallFeatureRowsV3` · `PaywallFeatureRowsV4` | ✅ |
| 7 | `PaywallScreen` | `PaywallScreenV2` · `PaywallScreenV3` · `PaywallScreenV4` | ✅ |
| 8 | `PermissionPrompt` | `PermissionPromptV2` · `PermissionPromptV3` · `PermissionPromptV4` | ✅ |
| 9 | `PlanSelector` | `PlanSelectorV2` · `PlanSelectorV3` · `PlanSelectorV4` | ✅ |
| 10 | `ProfileSetup` | `ProfileSetupV2` · `ProfileSetupV3` · `ProfileSetupV4` | ✅ |
| 11 | `ProgressDots` | `ProgressDotsV2` · `ProgressDotsV3` · `ProgressDotsV4` | ✅ |
| 12 | `SignInScreen` | `SignInScreenV2` · `SignInScreenV3` · `SignInScreenV4` | ✅ |
| 13 | `TrialBanner` | `TrialBannerV4` | ✅ |
| 14 | `WelcomeScreen` | `WelcomeScreenV2` · `WelcomeScreenV3` · `WelcomeScreenV4` | ✅ |

*module internals:* `internal/flow-v4` — the shell §1 describes, written once
instead of eight times: the header with its spacers, the hero with its
medallion fallback, the headline block, the underlined footer link, the footer
stack and the scroll/pin screen. Both twins.

#### What the pass fixed

Read against the two production reference screens the product owner supplied.

| the defect | where it was | the fix |
|---|---|---|
| **the body did not scroll** — a paywall with four rows, a plan card and fine print clipped on a small phone, with no scroll view in the tree | every full-screen component | `FlowScreenV4`: header fixed, body scrolls, footer pinned; `flexGrow: 1` so a short screen still centres |
| **no screen read the safe-area inset** — the CTA sat under the home indicator | every screen but `AuthStickyFooterV4` | every V4 footer is `AuthStickyFooterV4`, which pays it |
| **no slot for the reassurance line, the restore link or the legal row** — one is a store requirement, one is most of the conversion | `PaywallScreen` | `FlowFooterV4`'s fixed stack: footnote · reassurance · CTA · secondary · restore · legal |
| **`PlanTier` could not express an offer** — one price per cadence, no compare-at, no savings pill, no per-unit price | `types.ts` | four optional fields, spent by `PlanSelectorV4`'s new `'offer'` layout |
| **`scheme === 'dark' ? ramps[900] : ramps[50]`**, copied into four screens to undo the ramps' light orientation | `InterestPicker`, `OtpVerify`, `PermissionPrompt`, `ProfileSetup`, `FeatureLockCard` | `flowGrounds()` / `flowGroundVars()` mix every tint from resolved semantic colours; the branch is gone |
| **`colors.border` used as a *fill*** for the progress track | `ProgressDots` | an M3 state mix of `on-surface` over `surface` |
| **"0 of 2" on step one of three** | `ProgressDots` | the accessible value counts steps, not indices |
| **`maxSelections` enforced silently** — at the cap a tap did nothing, with no message | `InterestPicker` | a live counter, and the blocked chips say so through `accessibilityState` |
| **a denied permission named Settings and offered no way there** | `PermissionPrompt` | `settingsLabel` / `onOpenSettings` |
| **the carousel could not be swiped**, and showed one illustration for every slide | `OnboardingSlides` | a paged track on both twins; `OnboardingSlide.illustration` per slide |
| **hand-rolled fields** with their own border, focus colour and height | `ProfileSetup`, `OtpVerify` | `AuthFieldV4` and the shared field metrics — the drift the design-spec Addendum settled |
| **base-line auth parts inside a V4 page** | `SignInScreen` | every part is its V4 twin, plus the header the rest of the funnel has |
| **hard-coded English** inside a module whose contract is caller-supplied copy | 9 strings across 4 components | `formatDaysLeft`, `formatSelectionCount`, `formatResendCountdown`, `formatDigitLabel`, `formatDestination`, `nextLabel`, `skipLabel`, `emptyMessage`, `dismissLabel` |
| **web-only:** `ProfileSetup`'s `keyboard` prop accepted and dropped | `onboarding/ProfileSetup` | mapped to an `<input type>` |
| **web-only:** `scrollTo` called unguarded (throws in jsdom and older engines) | `OnboardingSlidesV4` | feature-detected, falls back to `scrollLeft` |

#### Variety without forking a component

Every screen already had a V2 and a V3 line. On top of that the V4 line takes
two **configuration** axes — `ground` (`plain` · `tinted` · `brand`) and
`accent` (`primary` · `accent`) — so two apps on the same seed can ship a
visibly different funnel. Both default to today's rendering, and neither is
allowed to grow a third axis: the anatomy is the part that must not vary (§1).

Three of the five components that shipped without a V2/V3 got one in this pass:

- **`ProgressDots`** — V2 is one continuous track with a spoken "2 / 5" beside
  it, for a flow long enough that segments stop being countable; V3 is rings,
  which survive a full-bleed hero the way a low-contrast bar does not.
- **`PaywallFeatureRows`** — V2 is tiles (a list says "four facts", tiles say
  "four things"); V3 is a checklist, for the confirmation half of a screen
  whose hero already spent the vertical budget.
- **`FeatureLockCard`** — V2 is a brand-fill banner for when the gate IS the
  screen; V3 is one row where the whole row is the target, for a settings list.

**The other two deliberately have no V2/V3, and are not gaps.**
`GetStartedButton` is the one shape §5 pins so a funnel reads as one app, and
`TrialBanner` is a strip small enough that the base *is* its whole line — which
`design-line-composition.native.spec.tsx` asserts from the other side. Both got
a V4; neither should get an alternate line.

### `commerce` — 11 components, 5 with variants · last updated **0.12.0** ✅

**Progress: 11 / 11 upgraded.** Done with `marketplace` as one surface — a
listing composes the same price, status and row a cart and a checkout do. See
`COMMERCE-MARKETPLACE-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CartLineItem` | `CartLineItemV2` · `CartLineItemV3` · `CartLineItemV4` | ✅ |
| 2 | `CartSummary` | `CartSummaryV2` · `CartSummaryV3` · `CartSummaryV4` | ✅ |
| 3 | `CheckoutSummary` | `CheckoutSummaryV2` · `CheckoutSummaryV3` · `CheckoutSummaryV4` | ✅ |
| 4 | `EmptyState` | `EmptyStateV4` | ✅ |
| 5 | `GenerativeCover` | `GenerativeCoverV4` | ✅ |
| 6 | `OrderSummary` | `OrderSummaryV2` · `OrderSummaryV3` · `OrderSummaryV4` | ✅ |
| 7 | `PriceTag` | `PriceTagV4` | ✅ |
| 8 | `ProductCard` | `ProductCardV2` · `ProductCardV3` · `ProductCardV4` | ✅ |
| 9 | `ProductGrid` | `ProductGridV4` | ✅ |
| 10 | `QuantityStepper` | `QuantityStepperV4` | ✅ |
| 11 | `StatusBadge` | `StatusBadgeV4` | ✅ |

*helpers:* `formatMoney` · `internal/money-v4` · `internal/cover-v4` ·
`internal/status-v4` · `internal/grid-v4` · `internal/empty-v4`

`CheckoutSummary` has no file of its own on any of the four lines — it is a
named export from `OrderSummary*`, and `CheckoutSummaryV4` keeps that shape.
The web `GenerativeCover` renderer lives in `marketing/`, not here; only the
native one is local. Both twins now seed from one shared hash.

### `booking` — 3 components, 3 with variants · last updated **0.14.0** ✅

**Progress: 3 / 3 upgraded.** See `VERTICALS-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BookingCalendar` | `BookingCalendarV2` · `BookingCalendarV3` · `BookingCalendarV4` | ✅ |
| 2 | `BookingSummary` | `BookingSummaryV2` · `BookingSummaryV3` · `BookingSummaryV4` | ✅ |
| 3 | `SlotPicker` | `SlotPickerV2` · `SlotPickerV3` · `SlotPickerV4` | ✅ |

*module internals:* `schedule-v4.ts` — pure, shared by both twins the way
`datetime.ts` already is: the morning/afternoon/evening buckets and the today
check, both computed in the **booking's** timezone rather than the device's.

| the defect | the fix |
|---|---|
| **the week view's chevrons did nothing** — `shiftView()` moved `viewDate` by a *month* while the week row read `selectedDate ?? viewDate`, so with a date selected (the normal case) pressing the chevrons changed nothing on screen. Both twins. | one anchor, shifted by a month or by seven days depending on the view — and the accessible labels say which unit they move |
| tap targets under 44 — chevrons 32×32, day cells 36×36, on the control this module is *for* | every target off `minTap()` |
| **today was not marked at all** | a ring, plus `today` in the cell's accessible name |
| a pressed day flashed near-white on a dark page (`ramps.neutral[100]`) | the M3 state layer |
| **no price anywhere** in `BookingSummary` — who, when and how long, never what it costs | `price` / `priceNote`, as the last row above a hairline |
| a day of thirty slots was one undifferentiated wall | `grouped` — Morning / Afternoon / Evening |
| ten hard-coded English strings | `formatSpots`, `periodLabels`, `emptyMessage`, `labels`, `formatDuration`, `previousLabel`, `nextLabel`, … |
| a full slot dimmed at 0.5, this component's own guess | M3's `disabledContent` |

*helpers:* `addDays`, `dayKeyInTz`, `formatTimeInTz`, `monthMatrix`, `startOfMonth`, `toDayKey`, `weekRow`

### `media` — 3 components · last updated **0.14.0** ✅

**Progress: 3 / 3 upgraded.** See `VERTICALS-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `Gallery` | `GalleryV4` | ✅ |
| 2 | `Lightbox` | `LightboxV4` | ✅ |
| 3 | `MediaFigure` | `MediaFigureV4` | ✅ |

*module internals:* `native/media/internal/media-v4.tsx` — the
poster-or-image decision and the play affordance, in one place.

| the defect | the fix |
|---|---|
| **the native twin ignored `kind` and `poster` completely.** `MediaItem` has carried both since it was written and the web twin honoured them; all three native components rendered `Image source={{ uri: item.url }}` unconditionally, so **a video item rendered its `.mp4` URL as a broken image on every native screen in the kit** | the poster plus a play badge, and the press handed to the host — the kit ships no video player and must not |
| **web: a `video controls` element inside a `button`** whenever `onActivate` was set — nested interactive content, and clicking play fired `onActivate` instead of playing | a poster when the figure is a *link to* the media; real controls when the figure *is* the media. `LightboxV4` gains `onPlay` for a host's own player |
| `ramps.neutral[100]` as the placeholder ground — a pale rectangle on a dark page | `colors.muted`, the same fix `ProductCardV4` settled |
| press drawn as `opacity: 0.85` on the tile's content | the M3 state layer |
| lightbox controls 40×40, pinned at `top: 45%` | 44, centred by transform |
| no safe-area inset on a full-screen overlay | paid on both twins |
| an empty album rendered a silent blank region | `emptyMessage` |

**No V2/V3 line here yet.** Three components, one correct shape each so far —
if a second visual line is wanted, say so and it gets one.

### `agriculture` — 12 components, 4 with variants · last updated **0.14.0** ✅

**Progress: 12 / 12 upgraded.** See `VERTICALS-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CropCard` | `CropCardV2` · `CropCardV3` · `CropCardV4` | ✅ |
| 2 | `EquipmentStatus` | `EquipmentStatusV4` | ✅ |
| 3 | `FarmTaskRow` | `FarmTaskRowV4` | ✅ |
| 4 | `FieldCard` | `FieldCardV2` · `FieldCardV3` · `FieldCardV4` | ✅ |
| 5 | `HarvestLog` | `HarvestLogV2` · `HarvestLogV3` · `HarvestLogV4` | ✅ |
| 6 | `IrrigationSchedule` | `IrrigationScheduleV4` | ✅ |
| 7 | `LivestockRow` | `LivestockRowV4` | ✅ |
| 8 | `MarketPriceRow` | `MarketPriceRowV4` | ✅ |
| 9 | `PestAlert` | `PestAlertV4` | ✅ |
| 10 | `SoilMoistureCard` | `SoilMoistureCardV4` | ✅ |
| 11 | `WeatherAdvisory` | `WeatherAdvisoryV2` · `WeatherAdvisoryV3` · `WeatherAdvisoryV4` | ✅ |
| 12 | `YieldChart` | `YieldChartV4` | ✅ |

*module internals:* `internal/farm-v4` — the tone-to-ink step, the skeleton
fill, the percent clamp and the caption join. Ten status enums each carried
their own `{ label, tone, color }` map and each independently decided that
`color: 'muted'` or `color: 'success'` was a *text* colour; this is that
correction, once.

| the defect | the fix |
|---|---|
| **`YieldChart` spent a status colour on identity** — `color: keyof SemanticColors` defaulting to `'success'`, so every yield chart in the kit was green because green was the default, not because the yield was good | `tone?: ChartToneV4`, unset by default, on `BarChartV4`/`LineChartV4` and the validated palette. **The one non-additive prop change in this pass** |
| **web: an interactive card was a `div`** with `role="button"`, `tabIndex` and a hand-written Enter/Space handler — three approximations of what a `button` already does | a real `button` on `CropCardV4`, `FieldCardV4`, `EquipmentStatusV4` |
| press drawn as `opacity: 0.85` — M3's *disabled* signal, so a pressed card read as unavailable | the M3 state layer, via `dashboard/internal/row-v4` |
| **the loading skeleton was filled with `colors.border`** — a hairline token used as a block (`bg-neutral-200` on web) | an M3 state mix of the card's own ink over its own ground |
| ~50 hand-written `Text` elements with literal `color`, `fontSize`, `fontWeight` and `fontFamily`, with `'500'`, `'600'` and `'700'` all in play for two steps | `TextV4` |
| eight rows and cards each re-deriving their own height, padding and press fill | `dashboard/internal/row-v4`, which already decides all three |
| emoji concatenated into copy — a pin glyph plus the field label — untintable, unreplaceable, read aloud as the emoji's name | `IconV4` beside the text |
| `overdue` and price direction carried by **colour alone** | a badge word and a spoken direction label |
| every advisory announced as `role="alert"`, `info` included — which teaches a screen-reader user to ignore all of them | only the severe end interrupts |
| ten components' worth of hard-coded English | `stageLabels`, `statusLabels`, `stateLabels`, `severityLabels`, `priorityLabels`, `healthLabels`, `formatArea`, `formatChange`, `formatCount`, `formatRemaining`, … |
| `lowFuelThreshold` fixed at 20% inside the component — a fleet decision, not a design-system one | a prop |

**Eight components still have no V2/V3 line.** The V4 pass did not add them;
they are listed here so the gap is visible rather than implied.

### `automotive` — 13 components, 4 with variants · last updated **0.15.0** ✅

**Progress: 13 / 13 upgraded.** See `AUTOMOTIVE-BEAUTY-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `DriverCard` | `DriverCardV2` · `DriverCardV3` · `DriverCardV4` | ✅ |
| 2 | `DriverRatingRow` | `DriverRatingRowV4` | ✅ |
| 3 | `FareEstimate` | `FareEstimateV4` | ✅ |
| 4 | `FuelChargeGauge` | `FuelChargeGaugeV4` | ✅ |
| 5 | `ParkingSpot` | `ParkingSpotV4` | ✅ |
| 6 | `RideRequestCard` | `RideRequestCardV2` · `RideRequestCardV3` · `RideRequestCardV4` | ✅ |
| 7 | `RideStatusBar` | `RideStatusBarV2` · `RideStatusBarV3` · `RideStatusBarV4` | ✅ |
| 8 | `ServiceReminder` | `ServiceReminderV4` | ✅ |
| 9 | `TripHistoryEmpty` | `TripHistoryEmptyV4` | ✅ |
| 10 | `TripHistoryRow` | `TripHistoryRowV4` | ✅ |
| 11 | `TripRoute` | `TripRouteV4` | ✅ |
| 12 | `VehicleCard` | `VehicleCardV2` · `VehicleCardV3` · `VehicleCardV4` | ✅ |
| 13 | `VehicleHealthRow` | `VehicleHealthRowV4` | ✅ |

*module internals:* `internal/fleet-v4` — the five status enums' words and
tones, and the route geometry. The tone-to-ink table itself lives in
`primitives/internal/tone-v4`, promoted out of `agriculture` in this pass.

| the defect | the fix |
|---|---|
| **mismatched `on` pairs.** `TripRoute` painted its markers `colors[tone]` and inked every glyph `onPrimary` — the compiler guarantees `onSuccess` against `success` and **nothing** about `onPrimary` on it, so the origin marker was a green disc wearing the brand's ink and readability depended on the seed. Both sides are `string`, so no type could catch it | `onPair()` / `TONE_ON`, used here, in `ParkingSpotV4` and in `RideStatusBarV4` |
| **an unavailable parking bay was fully pressable** — `occupied` and `disabled` spots took presses and reported them | only `available` is selectable; the rest are inert and dim at M3's 0.38 |
| **a ride's two stops were unrelated rows.** Nothing on the card said pickup and dropoff were one journey, which is the first thing a driver reads | one rail joining them, as a real list on web |
| **accept and decline were equal-weight, side by side** | §5: the declined choice goes below and never competes |
| four rating components drew five glyphs and no numeral | `RatingV4 showValue` — the number is what a low-vision user reads |
| `fontWeight: '800'`, off a scale that stops at `bold` | the scale |
| six skeletons built from `withAlpha(colors.muted, 0.25)` — translucent, so the same skeleton was a different colour on every ground | an opaque M3 state mix |
| fares, rates, readings and plate numbers all proportional | tabular figures |
| **web: an interactive card was a `div`** with `role="button"`, `tabIndex` and a hand-written key handler | a real `button` on `DriverCardV4` and `VehicleCardV4` |
| twenty hard-coded status words, plus the surge and spots strings | `statusLabels`, `stageLabels`, `urgencyLabels`, `outcomeLabels`, `bandLabels`, `formatSurge`, `formatChange`, `formatTripCount`, … |

### `beauty` — 12 components, 4 with variants · last updated **0.15.0** ✅

**Progress: 12 / 12 upgraded.** See `AUTOMOTIVE-BEAUTY-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AppointmentSlot` | `AppointmentSlotV4` | ✅ |
| 2 | `BeforeAfter` | `BeforeAfterV4` | ✅ |
| 3 | `GiftCardRow` | `GiftCardRowV4` | ✅ |
| 4 | `LookbookGrid` | `LookbookGridV4` | ✅ |
| 5 | `LoyaltyCard` | `LoyaltyCardV2` · `LoyaltyCardV3` · `LoyaltyCardV4` | ✅ |
| 6 | `PriceListRow` | `PriceListRowV4` | ✅ |
| 7 | `ProductRecommendation` | `ProductRecommendationV4` | ✅ |
| 8 | `ReviewCard` | `ReviewCardV4` | ✅ |
| 9 | `SalonBookingBar` | `SalonBookingBarV4` | ✅ |
| 10 | `ServiceMenuItem` | `ServiceMenuItemV2` · `ServiceMenuItemV3` · `ServiceMenuItemV4` | ✅ |
| 11 | `StylistCard` | `StylistCardV2` · `StylistCardV3` · `StylistCardV4` | ✅ |
| 12 | `TreatmentCard` | `TreatmentCardV2` · `TreatmentCardV3` · `TreatmentCardV4` | ✅ |

*module internals:* `internal/salon-v4` — the compare-at rule, plus the shared
tone table from `primitives/internal/tone-v4`.

| the defect | the fix |
|---|---|
| **`BeforeAfter` could not be slid.** `variant="split"` drew a divider at `position` and offered two −/+ buttons that stepped 10% at a time. No drag on native, no slider on web. A before/after comparison is *the* gesture-first control in a beauty app | native: a `PanResponder` drag on a thumb-wide grab area, `accessibilityRole="adjustable"` with increment/decrement actions. web: a real `input type=range` overlay, which brings arrow keys, Home/End, PageUp/PageDown and a spoken value for free. **The nudge buttons stay** — they are the switch-control path |
| **a category spent a status colour.** `ServiceMenuItem` and `TreatmentCard` typed their categories `keyof SemanticColors`, so "nails" was `success` and "waxing" was `warn` — a menu of eight services used up every tone that means something | the glyph carries identity; the status colours stay free to mean status |
| **`SalonBookingBar` is a pinned bottom bar that read no safe-area inset**, so on a notched phone the button that takes the money sat under the home indicator | `AuthStickyFooterV4`, like every other pinned CTA |
| **`PriceListRow` never drew its `compareAtCents`** — carried since it was written, never rendered | struck and announced as `Was …`, and a compare-at that is not higher than the price is refused |
| fully-booked and sold-out greyed a **live** button | the CTA is `disabled` |
| four rating components drew five glyphs and no numeral | `RatingV4 showValue` |
| a gift card printed two money figures and left the reader to divide them | a meter against face value |
| seven specialty chips pushed the price off the row | capped and wrapped (§7) |
| skeletons built from a translucent wash of `muted` | an opaque M3 state mix |
| **web: interactive cards were `div`s with `role="button"`**; the review was a bare div; the lookbook a bare div | real `button`s, a `blockquote` with a `cite`, a real `ul` |
| roughly thirty hard-coded English strings | `statusLabels`, `tierLabels`, `categoryLabels`, `variantLabels`, `formatPoints`, `formatRemaining`, `formatDuration`, `formatReviewCount`, … |

**Neither module gained a V2/V3 in this pass.** `automotive` has four with
one, `beauty` four — the other seventeen have a V4 only. Recorded here so the
gap is visible rather than implied.

*helpers:* `formatMoney`

### `calendar` — 12 components, 4 with variants · last updated **0.16.0** ✅

**Progress: 12 / 12 upgraded.** See `CALENDAR-CHAT-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AllDayRow` | `AllDayRowV4` | ✅ |
| 2 | `AvailabilityPicker` | `AvailabilityPickerV2` · `AvailabilityPickerV3` · `AvailabilityPickerV4` | ✅ |
| 3 | `DateNavigator` | `DateNavigatorV4` | ✅ |
| 4 | `DayAgenda` | `DayAgendaV2` · `DayAgendaV3` · `DayAgendaV4` | ✅ |
| 5 | `EventBlock` | `EventBlockV2` · `EventBlockV3` · `EventBlockV4` | ✅ |
| 6 | `EventDetailSheet` | `EventDetailSheetV4` | ✅ |
| 7 | `MiniCalendar` | `MiniCalendarV4` | ✅ |
| 8 | `MonthView` | `MonthViewV2` · `MonthViewV3` · `MonthViewV4` | ✅ |
| 9 | `RecurrenceRow` | `RecurrenceRowV4` | ✅ |
| 10 | `TimeGrid` | `TimeGridV4` | ✅ |
| 11 | `TimezoneRow` | `TimezoneRowV4` | ✅ |
| 12 | `WeekView` | `WeekViewV4` | ✅ |

*module internals:* `layout-v4` — **pure, and shared by both twins**: the
column pass, the localised weekday/month/hour names. `internal/grid-v4` per
twin — the hour height, gutter and minimum block, derived from the spacing
scale rather than the base's `hourHeight = 48`.

| the defect | the fix |
|---|---|
| **`TimeGrid` gave overlapping events inconsistent widths.** It counted, *per event*, the events overlapping *that* event, and used the size as the column count. A 9:00–10:00, B 9:30–10:30, C 10:00–11:00 came out as 2, 3 and 2 columns — three column grids in one day, colliding and leaving gaps at the same time | `layoutEvents()` runs the standard two pass: cluster on the furthest end seen, then pack into the first free column. **Every member of a cluster shares the count**, and a busy morning no longer narrows a free afternoon. Ties break on start then end, so columns do not swap between renders |
| **the weekday and month names were two English arrays inline.** A French app drew `Mon` under a French month, and `WEEKDAYS_NARROW` shipped `['S','M','T','W','T','F','S']` — two pairs a reader cannot tell apart | `weekdayNames()`, `monthTitle()` and `hourTitle()` run through `Intl`, take a `locale`, and rotate to `weekStartsOn` |
| **the now line was an unnamed red hairline** — the one moving element on the screen and the only one a reader could not find | `nowLabel`, on a named separator, in both views that draw it |
| an empty day drew bare hour rules and said nothing | `emptyLabel`, a sentence (§4.5) |
| a point event (no `end`) had zero height and vanished | `DEFAULT_EVENT_MINUTES`, and a bad payload still clears one minute |
| the month cell announced its date and swallowed its event count | `formatEventCount`, folded into the cell's one name |
| a booked slot was a greyed but **live** button | `disabled`, with the unavailable word in the name |
| `EventDetailSheet`'s edit and delete were two unnamed glyph rows | each names the event it acts on — a delete confirms *what* it deletes |
| `TimezoneRow` drew a raw IANA id (`Europe/Berlin`) with no offset | `formatOffset` resolves the live offset through `Intl`, with the id as the fallback |
| roughly twenty hard-coded English strings | `nowLabel`, `todayLabel`, `emptyLabel`, `previousLabel`, `nextLabel`, `allDayLabel`, `unavailableLabel`, `freqLabels`, `viewLabels`, `formatEventCount`, `formatOffset`, … |

*helpers:* `MONTHS_LONG`, `MONTHS_SHORT`, `WEEKDAYS_NARROW`, `WEEKDAYS_SHORT`, `addDays`, `addMonths`, `clockLabel`, `hourLabel`, `minutesSinceMidnight`, `monthGrid`, `monthLabel`, `monthLongLabel`, `resolveTone`, `sameDay`, `sameMonth`, `startOfWeek`, `timeRangeLabel`, `weekDates`, `weekdayHeader`, `weekdayLabel`, `withAlpha`

### `chat` — 13 components, 4 with variants · last updated **0.16.0** ✅

**Progress: 13 / 13 upgraded.** See `CALENDAR-CHAT-V4-BRIEF.md`.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AttachmentBar` | `AttachmentBarV4` | ✅ |
| 2 | `ChatHeader` | `ChatHeaderV2` · `ChatHeaderV3` · `ChatHeaderV4` | ✅ |
| 3 | `ConversationList` | `ConversationListV4` | ✅ |
| 4 | `ConversationRow` | `ConversationRowV2` · `ConversationRowV3` · `ConversationRowV4` | ✅ |
| 5 | `DateSeparator` | `DateSeparatorV4` | ✅ |
| 6 | `MessageComposer` | `MessageComposerV2` · `MessageComposerV3` · `MessageComposerV4` | ✅ |
| 7 | `MessageGroup` | `MessageGroupV2` · `MessageGroupV3` · `MessageGroupV4` | ✅ |
| 8 | `PresenceDot` | `PresenceDotV4` | ✅ |
| 9 | `QuickReplies` | `QuickRepliesV4` | ✅ |
| 10 | `ReadReceipt` | `ReadReceiptV4` | ✅ |
| 11 | `TypingIndicator` | `TypingIndicatorV4` | ✅ |
| 12 | `UnreadDivider` | `UnreadDividerV4` | ✅ |
| 13 | `VoiceNoteBubble` | `VoiceNoteBubbleV4` | ✅ |

*module internals:* `internal/thread-v4` per twin — `PRESENCE_META`,
`RECEIPT_META`, `clock()` and the named `ChatSize`, plus the shared tone table
from `primitives/internal/tone-v4`.

| the defect | the fix |
|---|---|
| **a failed send was a red glyph and nothing else.** `ReadReceipt` drew all five states identically — one glyph, one colour, `role="image"` — so the one state a user must *act* on was announced as passively as `sent` | the right role, `failed` assertive and the rest polite, and an `onRetry` that makes the failure a control. `MessageGroupV4` passes the handler through, because the receipt is where a failure shows |
| **the voice note reported no position.** It painted the waveform with `progress` and announced only "Voice message, 0:42" — a sighted user could see how far through they were and a screen-reader user could not | a `progressbar` carrying elapsed and total (`0:21 of 0:42`), a transport that clears 44, and unplayed bars as a wash of the *same* ink rather than `opacity: 0.4` — 0.38 is the band that means disabled, and an unplayed second is not disabled |
| **the composer sent empty messages** — `onSend('')` on a blank field and on whitespace — and grew without bound, pushing send off the screen | send is dead on whitespace, the field stops at `maxLines`, and Enter sends while Shift+Enter breaks the line |
| **presence was a coloured dot** with no name, in the two places it is the whole signal | always named, optionally worded, and `away` stops borrowing `warn` — stepping away is not a caution |
| `QuickReplies` scrolled its chips horizontally, so the last reply sat off-screen with nothing saying so | they wrap (§7) — a user cannot choose what they cannot see |
| `ChatHeaderAction` has always carried a `label`; the header never rendered it | every action is named and clears 44 |
| **typing stacked a row under the subtitle**, so the header grew and the messages jumped on a signal that toggles every few seconds | typing *replaces* the subtitle; one height |
| the conversation row was five separate stops — name, preview, time, presence, count | one spoken name, commas not middle dots, with the count capped at `99+` |
| muted was a lowered opacity, which is also how a row looks disabled | a glyph **and** a word |
| the inbox collapsed to a centred spinner, then jumped to full height | skeleton rows in the shape it is about to be, and the last row drops the separator that hung off the end |
| four components took a raw `size?: number` | a named `scale`, derived from the spacing scale; the raw prop stays for parity |
| the typing dots were unlabelled and animated on three timers | one polite announcement, dots hidden, M3 `standard` at a 150ms stagger, settling rather than freezing under reduced motion |

### `content` — 13 components, 4 with variants · last updated **0.17.0** ✅

**Progress: 13 / 13 upgraded.** See `CONTENT-CRM-V4-BRIEF.md` §2.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `ArticleCard` | `ArticleCardV2` · `ArticleCardV3` · `ArticleCardV4` | ✅ |
| 2 | `ArticleHeader` | `ArticleHeaderV2` · `ArticleHeaderV3` · `ArticleHeaderV4` | ✅ |
| 3 | `AuthorByline` | `AuthorBylineV2` · `AuthorBylineV3` · `AuthorBylineV4` | ✅ |
| 4 | `BookmarkButton` | `BookmarkButtonV4` | ✅ |
| 5 | `CategoryChip` | `CategoryChipV4` | ✅ |
| 6 | `NewsTicker` | `NewsTickerV4` | ✅ |
| 7 | `PodcastRow` | `PodcastRowV2` · `PodcastRowV3` · `PodcastRowV4` | ✅ |
| 8 | `PullQuote` | `PullQuoteV4` | ✅ |
| 9 | `ReadingProgress` | `ReadingProgressV4` | ✅ |
| 10 | `RelatedArticles` | `RelatedArticlesV4` | ✅ |
| 11 | `ShareRow` | `ShareRowV4` | ✅ |
| 12 | `TableOfContents` | `TableOfContentsV4` | ✅ |
| 13 | `TagList` | `TagListV4` | ✅ |

*module internals:* `internal/reading-v4` per twin — the media ground, the
reading clamp and the comma-joined spoken line, plus the shared tone table from
`primitives/internal/tone-v4`.

| the defect | the fix |
|---|---|
| **the keyboard could not play a podcast.** `PodcastRow` bound the row's `onKeyDown` to the container that *wraps* the play button, and unlike the click path — guarded with `stopPropagation` — the keyboard path was not. Space on the play button ran the row's handler, whose `preventDefault()` cancelled the button's own activation (browsers fire it on keyup) and navigated away instead; Enter fired both, so audio started and the page changed under it. A mouse user never saw it | the row's activation wraps only the artwork and text, and the play control is its **sibling** — which ends the bubbling, the invalid nested interactive content and native's VoiceOver-unreachable play control in one change. A row with no `onPlayToggle` renders no play button at all, rather than a permanently greyed one |
| **a read-only table of contents was a wall of disabled buttons.** `onSelect` is optional and both twins passed `disabled={!onSelect}`, so the ordinary case — a TOC rendered for reading — greyed every heading, dropped it from the tab order and announced it unavailable | a list of headings again; and both twins call it navigation, where native said `menu`, promising menu keyboard semantics it never had |
| **a loading article card was clickable.** Web computed `interactive` *before* the loading branch and still wrapped the skeleton in `role="button"` with the handler | the loading state returns first and inert, named once |
| **the category chip had no chip.** `soft` was `bg-surface` — the colour of the `Card` it sits inside — and inked its label `accent`, the 1.32:1 pairing already corrected in `Tag` | its own `card` ground and `accentText`; `active` gains weight, not just a border, and announces the same way on both twins |
| **the news ticker painted its eyebrow in `danger`.** `label` is caller copy documented as `'LIVE'`/`'BREAKING'`, so any section name or sponsor tag came out in the error colour | `labelTone`, defaulting to neutral, on a chip whose tone table pairs each fill with its guaranteed ink |
| **`ReadingProgress` named a roleless wrapper**, while the element that *is* a progressbar had no name at all; and its prop doc said "for pinning" while it never read an inset | the name lands on the bar, and `pinned` pays the safe-area inset |
| **`TagList` dropped the caller's props in the empty branch** — every `id`, `data-*` and handler vanished exactly when the list was empty | one root for both branches; the `+N` chip is focusable and says what the N are |
| the image placeholder was `bg-neutral-100` on web against `colors.border` on native — a ramp step that ignores the seed, against a hairline token spent as a fill | `card`, from the shared media ground, on both |
| every share control was exactly 40×40, and eight interactive elements were under 44 | `minTap` / `MIN_TAP_CLASS` |
| press drawn as eight invented opacities across the module, several below M3's 0.38 disabled band | the state layer |
| ~25 hard-coded English strings, 11 with no prop at all | `formatByline`, `formatLabel`, `formatProgress`, `formatOverflow`, `playLabel`, `navLabel`, `loadingLabel`, … |

*helpers:* `DEFAULT_SHARE_TARGETS`

### `crm` — 12 components, 4 with variants · last updated **0.17.0** ✅

**Progress: 12 / 12 upgraded.** See `CONTENT-CRM-V4-BRIEF.md` §3.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `ActivityLogRow` | `ActivityLogRowV4` | ✅ |
| 2 | `ContactCard` | `ContactCardV2` · `ContactCardV3` · `ContactCardV4` | ✅ |
| 3 | `ContactTimeline` | `ContactTimelineV4` | ✅ |
| 4 | `DealCard` | `DealCardV2` · `DealCardV3` · `DealCardV4` | ✅ |
| 5 | `DealForecast` | `DealForecastV4` | ✅ |
| 6 | `EmailThreadRow` | `EmailThreadRowV4` | ✅ |
| 7 | `LeadRow` | `LeadRowV2` · `LeadRowV3` · `LeadRowV4` | ✅ |
| 8 | `NextStepRow` | `NextStepRowV4` | ✅ |
| 9 | `PipelineBoard` | `PipelineBoardV2` · `PipelineBoardV3` · `PipelineBoardV4` | ✅ |
| 10 | `QuoteCard` | `QuoteCardV4` | ✅ |
| 11 | `TagFilterBar` | `TagFilterBarV4` | ✅ |
| 12 | `WinLossBadge` | `WinLossBadgeV4` | ✅ |

*module internals:* `internal/crm-v4` per twin — the corrected tone ink, the
paired ink, `BADGE_V4`, `ACTIVITY_META_V4`, the clamped `attainment()` and the
comma-joined spoken line. The base's own `internal.ts` is untouched; the V4
line calls neither `toneTextClass`/`toneColor` nor `activate`, which are two of
the defects below.

| the defect | the fix |
|---|---|
| **tapping "Call" on a contact card also opened the contact.** The quick-action pills were real buttons nested inside a root that `activate()` had turned into a `role="button"` with its own handler, and neither the pill nor `Button` stopped the event. The sibling `QuoteCard` guards the identical nesting, so the pattern was known. Native's inner Pressable consumed the touch, so the same props behaved differently per platform and it only ever reproduced on web | the card's activation wraps only the identity region and the actions are its **siblings** — ending the double-fire and the invalid nesting together. `QuoteCardV4` takes the same shape |
| **the card's name replaced everything inside it.** Ten of the twelve put a short label — `Deal Acme`, `Warm lead Ada` — on the interactive root, which substitutes for the subtree, so a reader never heard the deal value, the probability, the lead score, the quote total, the message count, the filter count, the timestamp or the word **Overdue** — that last in `NextStepRow`, where the meta line is the whole point of the row | `spokenLine()`, joining with commas rather than `metaLine`'s middle dot, which a reader either says out loud or swallows |
| **a lead's score badge was coloured by its temperature** — a lead scored 5 rendered `danger` because it was `hot`, so the colour said nothing about the number inside it, and the number carried no unit | the score badge is neutral and named; temperature keeps its own glyph and word |
| **a selected filter chip was unreadable on native** — `colors[tone]` as the fill with `colors.onSurface` as the ink for every tone but `primary`/`accent`, and `colors.muted`, a *text* token, as the fill for `neutral`. Web had it right, so the same prop was correct on one platform only | `toneOnOf()` — the compiler's paired ink — and an opaque idle ground |
| **the forecast never showed the target.** `targetCents` is documented as "shown as a labelled reference" and only ever fed a percentage; the caller supplied a quota and saw "vs target" and never the quota. The attainment was unclamped, so a reversed period rendered a negative percent | the figure prints, `attainment()` clamps to 0-100, and crossing quota is a **word** as well as a colour |
| **making the timeline interactive destroyed its list.** The item set `role="listitem"` then spread `activate()`, whose `role: 'button'` wins — so an interactive timeline was a `role="list"` with zero list items, which readers announce as empty | the button goes *inside* the list item; native gains list semantics it never had |
| **`WinLossBadge`'s `size` was a dead prop on web** — destructured, read only in the `inline` branch, never forwarded — so `DealCard` passing `size="sm"` got an `md` badge on web and an `sm` one on native | `size` reaches the badge, and `BADGE_V4` gives the module one badge shape on both twins, where web took `solid` and native `soft` |
| **not one press state in the whole native module.** All twelve Pressables rendered with no pressed treatment at all | the M3 state layer |
| an activity *kind* wore `success` — `task` and `deal` — so an ordinary log read as a green feed | `ACTIVITY_META_V4`: identity is the glyph's job, and `success` stays free to mean status |
| `pending` was `opacity: 0.6` and nothing else: invisible to a reader, indistinguishable from disabled | a word |
| the checkbox was 22px, the row's primary action, and rendered live-looking with no `onToggle`; its checked fill was `success` | 44, `primary`, and a static mark when there is nothing to toggle |
| money and every stacked figure was proportional | tabular |
| ~51 hard-coded English strings per twin, about 30 with no prop at all | `probabilityLabel`, `scoreLabel`, `overdueLabel`, `formatStageCount`, `formatMessageCount`, `formatTarget`, `attainedLabel`, … |

**Two follow-ups, recorded rather than implied.** `TagFilterBar`'s `'Clear'` /
`'Clear filters'` and `ContactTimeline`'s `'Loading timeline'` are still
hard-coded — the pass's prop list was closed and the agents were told not to
invent props. And `toneBadgeTone()` folds `accent` → `primary` on the claim
that "web has no accent slot", which is no longer true: `QUOTE_META.viewed` and
`ACTIVITY_META.email` therefore rendered `primary` on web and `accent` on
native. The V4 files pass the tone straight through; the base helper still has
the fold.

*helpers:* `ACTIVITY_META`, `OUTCOME_META`, `QUOTE_META`, `TEMPERATURE_META`, `clampPct`, `toneColor`

### `crypto` — 13 components, 4 with variants · last updated **0.18.0** ✅

**Progress: 13 / 13 upgraded.** See `CRYPTO-DATING-EMAIL-V4-BRIEF.md` §1.1 and §3.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `GasFeeRow` | `GasFeeRowV4` | ✅ |
| 2 | `NFTCard` | `NFTCardV2` · `NFTCardV3` · `NFTCardV4` | ✅ |
| 3 | `NetworkBadge` | `NetworkBadgeV4` | ✅ |
| 4 | `PortfolioSummary` | `PortfolioSummaryV2` · `PortfolioSummaryV3` · `PortfolioSummaryV4` | ✅ |
| 5 | `PriceAlertRow` | `PriceAlertRowV4` | ✅ |
| 6 | `PriceTicker` | `PriceTickerV4` | ✅ |
| 7 | `SeedPhraseGrid` | `SeedPhraseGridV4` | ✅ |
| 8 | `StakingCard` | `StakingCardV4` | ✅ |
| 9 | `SwapForm` | `SwapFormV4` | ✅ |
| 10 | `TokenRow` | `TokenRowV2` · `TokenRowV3` · `TokenRowV4` | ✅ |
| 11 | `TxList` | `TxListV4` | ✅ |
| 12 | `TxRow` | `TxRowV4` | ✅ |
| 13 | `WalletCard` | `WalletCardV2` · `WalletCardV3` · `WalletCardV4` | ✅ |

*module internals:* `amount-v4` — **pure, and shared by both twins**: the typed
draft field and `changeParts()`. `internal/market-v4` per twin — the corrected
change ink, `BADGE_V4`, the tabular style and the comma-joined spoken line.
The base's `internal/format.ts` is untouched; the V4 line calls neither
`changeToneClass`/`changeToneKey` nor web's `pressableProps`.

| the defect | the fix |
|---|---|
| **`SwapForm` could not accept a decimal amount.** The field was controlled off a number — `value={String(fromAmount)}` with `onChange={parseAmount(…)}` — and `Number.parseFloat('1.')` is `1`, so the instant a user typed the decimal point the parent was handed `1`, the field re-rendered as `"1"`, and the point vanished from under the caret. A leading `0` collapsed to `''` and disappeared. **Only whole token units could ever be entered**, on both twins, in the one component whose submit hands a value to a chain transaction: a user swapping 0.25 types `0`, sees nothing, types `.`, sees nothing, types `2`, and submits **2** | `useAmountField` in the shared `amount-v4` holds the draft as *text*, emits the parsed number, and overwrites the draft only when the parent genuinely disagrees with what is on screen |
| **and a second controlled-value bug in the same file** — with no `onChange` listener the base is permanently stuck at `fromAmount = 0`, so submit always fires `0`. The module barrel's own documented one-liner never worked | submit sends the parsed draft, so the uncontrolled shape works |
| **a loss announced as "down +3.20%".** Three components built `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` `` and `formatPct` re-applies a sign, so `Math.abs` guaranteed a `+`. `>= 0` also sent a flat 0 down the "up" branch while the glyph beside it was `•` — the spoken direction contradicted the drawn one | `changeParts()` decides the word, the glyph and the tone together, and flat is `unchanged` |
| **the module's own helper handed back a fill token for text** — `changeToneClass()` returns `text-success`, native's `changeToneKey()` a raw `SemanticColors` slot. **The V2/V3 lines already fixed this**, which makes the base line a regression rather than an oversight | `changeInkClass` / `changeInk`, off the shared tone table |
| **`SeedPhraseGrid`'s `columns` was broken on native** — `width: 100/cols%` inside a wrapping row with a gap overflows, so a 12-word phrase at 3 columns rendered as 6 rows of 2 | the gap is subtracted |
| **revealing a phrase read the recovery words aloud, one reader stop per word** | one grouped accessibility element |
| **`PortfolioSummary` never rendered the allocation numbers** — the donut was colour-matching only, so "how much is in ETH" was answerable solely by matching a swatch hue to a ring segment. Its direction also came from the percentage while the money was toned from the cents | `formatAllocation` on a real legend, and one source for the direction |
| **`StakingCard` printed a yield as "+4.20%"** — reading as a movement *in* the APY — and coloured it `success` unconditionally | a level, not a gain |
| **`TxList` had no loading state**, so a feed still fetching was indistinguishable from a wallet with no history | skeleton rows |
| the copy chip fired the card's `onClick` too, on web only | the chip is a sibling of the card's control |
| `variant="elevated"` — `WalletCard`'s own default — was dropped on web, so the default card was elevated on the phone and flat on the web | the variant reaches `Card` on both |
| a transaction amount and an NFT floor could print with no ticker | the block is omitted rather than printing a bare number |
| seven rows announced a short name that **replaced** everything inside them, so no number in the module was ever announced | one spoken name that carries them |
| ~56 hard-coded English strings per twin, ~50 with no prop at all | `speedLabels`, `directionLabels`, `apyLabel`, `copyLabel`, `wordLabel`, `loadingLabel`, … |

*helpers:* `changeGlyph`, `changeToneKey`, `formatPct`, `formatPrice`, `formatToken`, `truncateHash`

### `dating` — 12 components, 4 with variants · last updated **0.18.0** ✅

**Progress: 12 / 12 upgraded.** See `CRYPTO-DATING-EMAIL-V4-BRIEF.md` §1.3 and §4.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BoostBanner` | `BoostBannerV4` | ✅ |
| 2 | `CompatibilityMeter` | `CompatibilityMeterV2` · `CompatibilityMeterV3` · `CompatibilityMeterV4` | ✅ |
| 3 | `DistanceBadge` | `DistanceBadgeV4` | ✅ |
| 4 | `IcebreakerChip` | `IcebreakerChipV4` | ✅ |
| 5 | `LikePassButtons` | `LikePassButtonsV4` | ✅ |
| 6 | `MatchCelebration` | `MatchCelebrationV2` · `MatchCelebrationV3` · `MatchCelebrationV4` | ✅ |
| 7 | `PhotoCarousel` | `PhotoCarouselV4` | ✅ |
| 8 | `ProfileCard` | `ProfileCardV2` · `ProfileCardV3` · `ProfileCardV4` | ✅ |
| 9 | `ProfilePrompt` | `ProfilePromptV4` | ✅ |
| 10 | `SwipeCard` | `SwipeCardV2` · `SwipeCardV3` · `SwipeCardV4` | ✅ |
| 11 | `SwipeDeck` | `SwipeDeckV4` | ✅ |
| 12 | `WhoLikedYouRow` | `WhoLikedYouRowV4` | ✅ |

*module internals:* `deck-v4` — **pure, and shared by both twins**: the photo
scrim, `deckPosition()` and `canRewind()`. `internal/profile-v4` per twin —
`ACTION_TONE`, the placeholder ground and the spoken line.

| the defect | the fix |
|---|---|
| **pass was irreversible, unconfirmed, and impossible for a caller to make reversible.** Both twins hard-coded `actions={['pass','superlike','like']}` and let `'rewind'` fall through `onButton` to nothing — while `LikePassButtons` had always defined a `rewind` action. A card flicked slightly too far took the person with it: no toast, no undo, no announcement | `actions`, `onRewind` and `rewindLabel`; the deck steps its index back, and `canRewind()` disables the control when there is nothing to undo |
| **web emitted every decision twice.** `onSwipe`, `onSwipeRight`, `onSwipeLeft` and `onEmpty` fired from **inside a `setIndex` updater**; updaters must be pure and StrictMode invokes them twice. Native was already correct | the callbacks moved out of the updater, and the spec asserts a single emit under `StrictMode` |
| **every scrim inverted in dark mode.** Eight sites built a scrim over a *photograph* out of theme slots — the web neutral ramp mirrors under `[data-theme="dark"]` and `onSurface` is light in a dark theme — so the bottom of every profile photo washed near-**white**, taking the white text on it with it | `PHOTO_SCRIM` / `PHOTO_INK`, deliberately **not** tokens: a photo does not follow the scheme, so neither does its scrim |
| **`PhotoCarousel` had no visible next/previous control** — two `<button>`s with **no children**, invisible halves of the frame, with no focus ring on web — and `alt` never reached the native `Image`, so every profile photo on native was silent | real controls, and the alt text lands |
| **`MatchCelebration` could not be dismissed.** Web's Escape handler sat on a backdrop with no `tabIndex` and nothing autofocused; the native backdrop was a plain `View`, so on iOS `onClose` never fired from the UI at all | a focus trap and restore on web, a pressable scrim and an explicit close on native |
| **`BoostBanner` deleted its own CTA** when `onDismiss` was supplied, so `ctaLabel` was accepted and never rendered — and the native CTA was wrapped in `pointerEvents="none"`: unpressable, still announced as a button | both render, and the CTA is pressable |
| **the like count was painted in `danger`** — the most positive number in the product, in the error slot | identity, not status |
| **the NOPE stamp landed in the LIKE corner on native** — `left: spacing.lg` unconditionally for all three overlays | positioned per decision, matching web |
| five deck actions spent four status slots — `pass → danger`, `rewind → warn` | `ACTION_TONE`; the glyph carries which action it is |
| the whole card was one `role="img"` whose label swallowed the distance, the verified mark and the online dot | they are their own elements, or in the name |
| six interactive controls under 44, and press drawn as opacity with two different invented disabled bands | 44 and the M3 state layer |
| no reduced-motion path, and no safe-area inset on the pinned action row or the full-screen celebration | both paid |
| ~58 hard-coded English strings per twin | `actionLabels`, `previousLabel`, `nextLabel`, `verifiedLabel`, `lockedLabel`, `formatCount`, `formatPosition`, … |

### `email` — 12 components, 4 with variants · last updated **0.18.0** ✅

**Progress: 12 / 12 upgraded.** See `CRYPTO-DATING-EMAIL-V4-BRIEF.md` §1.2 and §5.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AttachmentChip` | `AttachmentChipV4` | ✅ |
| 2 | `ComposeBar` | `ComposeBarV2` · `ComposeBarV3` · `ComposeBarV4` | ✅ |
| 3 | `EmailThread` | `EmailThreadV2` · `EmailThreadV3` · `EmailThreadV4` | ✅ |
| 4 | `FolderRow` | `FolderRowV2` · `FolderRowV3` · `FolderRowV4` | ✅ |
| 5 | `InboxHeader` | `InboxHeaderV4` | ✅ |
| 6 | `MailLabelChip` | `MailLabelChipV4` | ✅ |
| 7 | `MailSwipeActions` | `MailSwipeActionsV4` | ✅ |
| 8 | `MessageListRow` | `MessageListRowV2` · `MessageListRowV3` · `MessageListRowV4` | ✅ |
| 9 | `ReadUnreadToggle` | `ReadUnreadToggleV4` | ✅ |
| 10 | `SignatureBlock` | `SignatureBlockV4` | ✅ |
| 11 | `SnoozeRow` | `SnoozeRowV4` | ✅ |
| 12 | `StarButton` | `StarButtonV4` | ✅ |

*module internals:* `thread-state-v4` — **pure, and shared by both twins**:
`useThreadExpansion` and `canSendMail`. `internal/mail-v4` per twin — the
identity-folded label ink, the selected row ground and the spoken line.

| the defect | the fix |
|---|---|
| **`EmailThread`'s expansion state could not change.** Both twins recomputed `const expanded = new Set(expandedIds ?? [lastId])` on every render and held **no state at all** — while `expandedIds` is an *optional* prop. Mounted the way the module's own barrel doc describes it, every header tap fired `onToggleMessage` into a callback nobody was listening to: the newest message stayed open, every earlier one stayed a clipped snippet, `aria-expanded` never flipped. A user tapped the third reply, saw nothing, tapped again, and concluded the app was broken | `useThreadExpansion` keeps the controlled path byte-for-byte and gives the uncontrolled path somewhere to put its state |
| **native's toggle swallowed the timestamp and the star**, so tapping the time collapsed the message and the star was unreachable to VoiceOver | both are siblings of the toggle |
| **`ComposeBar` sent with an empty recipient** — `canSend` tested the body and the attachments and never tested `to` | `canSendMail`, which reads `to`'s two meanings: `undefined` is a reply bar with no recipient field and requires nothing; `''` is a field left empty and blocks. Both agents flagged that a naive `!to` would stop every reply bar in the kit from sending — a wider break than the bug — so the distinction lives in the shared helper with the reasoning written down |
| **a hovered row was indistinguishable from the selected one** — web resolved both to the same ramp step, native collapsed them into `selected \|\| pressed` and painted them with `border`, a hairline token. In a split-view inbox the mouse repainted every row it passed as "the selected one" | `selected`/`on-selected`, and hover is the state layer over it |
| **`role="button"` made a row's children presentational**, so the preview, the thread count and every label chip left the accessibility tree outright — the row's `aria-label` was all a reader got | one deliberate spoken name that carries them, with the star a sibling of the control |
| **`MailSwipeActions` deleted on a single tap** with no confirmation, no undo and no way for a caller to express either — and on native the rail is the only path to archive or delete, behind a gesture, so a switch-control user had no route to it at all | `destructiveIds` requires a confirming press, and the toolbar's DOM order matches its visual order |
| **`soft` rendered `solid` for three of six label tones on web** — the two class maps were byte-identical for `success`, `warn` and `danger` — so a soft danger chip was a pale wash on the phone and a saturated block on the web. And a mail label is identity: a red "Receipts" chip was indistinguishable from an error | one soft recipe for all six, folded to identity |
| **`ReadUnreadToggle` shipped a zero-size `View`** whose comment claimed an accessibility guarantee it did not provide, and never announced its state | dropped, and the state is announced |
| an in-flight upload could not be cancelled — remove is hidden for exactly the interval in which a user finds the wrong file | `onCancel` |
| `SignatureBlock` painted contact lines as links that were completely inert | `onContactPress`, or they are not painted as links |
| `FolderRow` asserted "unread" for a prop its own doc defines as "unread / item count" | `formatCount` |
| seven controls under 44, and 25 hand-rolled opacities across six invented values, with `tokens.state` referenced **zero** times in the module | 44 and the M3 state layer |
| ~81 hard-coded English strings | `unreadLabel`, `sendLabel`, `attachLabel`, `toolbarLabel`, `formatThreadCount`, `formatMessageCount`, `formatUnread`, `syncingLabel`, … |

**One follow-up, recorded rather than implied.** `EmailThread`'s "No messages"
/ "This conversation is empty." are still hard-coded on both twins — the
pass's prop list was closed and the agents were told not to invent props.

### `events` — 12 components, 4 with variants · last updated **0.19.0** ✅

**Progress: 12 / 12 upgraded.** See `EVENTS-FIELDSERVICE-V4-BRIEF.md` §1.2 and §3.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AgendaList` | `AgendaListV4` | ✅ |
| 2 | `CalendarStrip` | `CalendarStripV4` | ✅ |
| 3 | `CheckInRow` | `CheckInRowV4` | ✅ |
| 4 | `CountdownBadge` | `CountdownBadgeV4` | ✅ |
| 5 | `EventCard` | `EventCardV2` · `EventCardV3` · `EventCardV4` | ✅ |
| 6 | `RSVPButton` | `RSVPButtonV4` | ✅ |
| 7 | `ScheduleRow` | `ScheduleRowV4` | ✅ |
| 8 | `SessionCard` | `SessionCardV2` · `SessionCardV3` · `SessionCardV4` | ✅ |
| 9 | `SpeakerCard` | `SpeakerCardV2` · `SpeakerCardV3` · `SpeakerCardV4` | ✅ |
| 10 | `TicketStub` | `TicketStubV2` · `TicketStubV3` · `TicketStubV4` | ✅ |
| 11 | `TicketTypeRow` | `TicketTypeRowV4` | ✅ |
| 12 | `VenueCard` | `VenueCardV4` | ✅ |

*module internals:* `schedule-v4` — **pure, and shared by both twins**: the
`Intl` names, `countdownParts`, `seatParts`, `remainingParts`.
`internal/event-v4` per twin — `RSVP_TONE`, `AGENDA_TONE`, the badge shape, the
placeholder ground and the spoken line.

| the defect | the fix |
|---|---|
| **the keyboard could not use a control nested in a card.** `SessionCard`'s bookmark and `VenueCard`'s Directions both guarded the *click* path with `stopPropagation` and left the *key* path open, so the card's `onKeyDown` caught the bubbled keydown and ran `preventDefault(); currentTarget.click()` — cancelling the button's own activation and firing the card instead. Enter on the bookmark navigated away; Enter on Directions opened the venue. On native the outer `Pressable` is `accessible` with the card's own label, so VoiceOver flattened the card and neither control was reachable at all | the control is a **sibling** of the card's activation, not a descendant; the synthesised `currentTarget.click()` is gone from all five components that had it. The seat meter moved out too — inside `role="button"` its `progressbar` value was presentational |
| **every native skeleton was a near-white slab in dark mode.** Eight components reached for `tokens.ramps.neutral[100\|200]`, and `toNativeTokens` copies the ramps without inverting — the native theme's own comment says they "carry the light orientation in both schemes" | `placeholderGround(theme)`; no `tokens.ramps.*` remains in the module |
| **a marked day on the 1st of a month silently lost its dot.** `CalendarStrip` put the month label and the has-events marker in the same slot as an either/or, and `showMonth` is true on the 1st and on the first pill. The mark was never announced either way | the two are separate, and `markedLabel` joins the day's name |
| **the weekday and month names were inline English arrays**, duplicated in both twins, so the strip was English-only and always Sunday-first | `Intl`, with a `locale` prop |
| **`CountdownBadge` announced "Started" when given nothing at all** — with neither `remainingMs` nor `target` it fell through to `ms = 0`, and `countdownParts(0)` reports elapsed. It also said "1 days 1 hours 1 minutes", on a role-less element where the label was ignored | `known: false` and `unknownLabel`; `countdownSentence()` pluralises, on an element with a role |
| **`TicketTypeRow` sold negative inventory.** `remaining === 0` is a strict test, so `-3` was neither sold out nor low stock: the row rendered normal, enabled, and `onSelect` fired. `SessionCard` had the mirror — it clamped the meter and printed "−5 / 100 seats taken" | `remainingParts()` and `seatParts()` |
| `ScheduleRow` never rendered the range its own prop doc promised — `endTime` stacked two bare times, so "10:30" over "11:15" read as two start times | `formatRange`, defaulting to an en-dash |
| the track rail was `primary` for every track, so the colour carried no identity, and the no-track rail was a `border` fill | `trackTone`, defaulting to `neutral` — the one added prop whose default deliberately changes today's behaviour, because defaulting to `primary` would contradict the fix |
| the `TicketStub` barcode was `on-surface` ink on a light-ramp band — both near-white on native, so the stub's only scannable-looking artefact vanished in dark mode. The web twin inverts, so the two did not even fail the same way | tokens that read in both schemes |
| an RSVP answer was painted in status colours — `going → success`, `maybe → warn`, `declined → danger` | `RSVP_TONE`; saying you cannot come is not an error |
| an agenda item's progress was colour alone, and `done` was painted `bg-border` — a hairline token with no promise of being visible as a dot | `AGENDA_TONE`, and every state has a word |
| five components were a `div` with `role="button"` and a hand-written key handler; a grep for `minHeight\|min-h-` across all 24 base files returned **nothing** | real buttons, and every control clears 44 |

*helpers:* `MONTHS_SHORT`, `WEEKDAYS_SHORT`, `countdownParts`, `monthLabel`, `sameDay`, `weekdayLabel`

### `fieldservice` — 12 components, 4 with variants · last updated **0.19.0** ✅

**Progress: 12 / 12 upgraded.** See `EVENTS-FIELDSERVICE-V4-BRIEF.md` §1.1 and §4.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `DispatchBar` | `DispatchBarV4` | ✅ |
| 2 | `EquipmentRow` | `EquipmentRowV4` | ✅ |
| 3 | `InspectionRow` | `InspectionRowV2` · `InspectionRowV3` · `InspectionRowV4` | ✅ |
| 4 | `JobSiteCard` | `JobSiteCardV2` · `JobSiteCardV3` · `JobSiteCardV4` | ✅ |
| 5 | `MaterialsRow` | `MaterialsRowV4` | ✅ |
| 6 | `PunchListItem` | `PunchListItemV4` | ✅ |
| 7 | `SafetyChecklist` | `SafetyChecklistV4` | ✅ |
| 8 | `ServiceChecklist` | `ServiceChecklistV4` | ✅ |
| 9 | `SignaturePad` | `SignaturePadV4` | ✅ |
| 10 | `TechnicianCard` | `TechnicianCardV2` · `TechnicianCardV3` · `TechnicianCardV4` | ✅ |
| 11 | `TimeLogRow` | `TimeLogRowV4` | ✅ |
| 12 | `WorkOrderCard` | `WorkOrderCardV2` · `WorkOrderCardV3` · `WorkOrderCardV4` | ✅ |

*module internals:* `verdict-v4` — **pure, and shared by both twins**:
`nextVerdict`, `clearsHazard`, `hazardCount`, `isComplete`.
`internal/job-v4` per twin — one disc tint, one badge shape, the spoken line.

| the defect | the fix |
|---|---|
| **a stray tap turned a safety block into "All clear".** `SafetyChecklist` cycled `fail → unchecked` on one press, which dropped the item out of the hazard count, **unmounted the "Hazard — do not proceed" banner** and flipped the header to "✓ All clear" — no confirmation, no undo, no announcement, and the row's accessible name did not even say what pressing would do. The failing row is a 40px target, tapped one-handed, outdoors, in gloves. From `unchecked` the next single tap recorded a **Pass**, so the cheapest gesture on the surface certified an unverified checkpoint as safe while the truthful Fail cost two. The props exposed only `onToggle`, so a host app could not guard any of it | `clearsHazard()` gates the one transition that takes a hazard off the screen: the first press arms the row, announces it and draws it; only a second calls `onToggle`. **The cycle is unchanged** — passing is the ordinary case, and making it cost two taps would be a worse component, not a safer one |
| **`ServiceChecklist` turned green one item early.** It compared a *rounded* percentage against 100, and `clampPct` rounds — so 199 of 200 reported complete | `isComplete(completed, total)`; counts answer this, a percentage is for drawing |
| **`DispatchBar` shipped a live "Complete" button that did nothing.** `canAdvance` never consulted `onAdvance` | it does, and completing a visit takes a confirming press — it is irreversible and the bar offers no action afterwards |
| **`SignaturePad`'s Clear destroyed the signature** with no confirmation, no undo and no prop to ask for either — the legally meaningful artefact of the visit, one press away. It was a filled `danger` button on web and a `ghost` text button on native: the riskiest control in the module was loud on one platform and quiet on the other | a confirming press, and the same emphasis on both twins |
| **`JobSiteCard` carried the same keyboard bug as `events/SessionCard`** — Enter on "Directions" opened the site card, and on native the button was unreachable | the control is a sibling of the activation |
| **`TechnicianCard` accepted a `phone` and never rendered it** — it was a boolean gate only, so a caller who wired `onCall` without a formatted number silently got no button. Its presence dot was a second palette contradicting `Avatar`'s own: `busy` was **red** on native and **blue** on web for the same technician | the number renders through `formatPhone`, and the dot is `Avatar`'s `status` |
| **not one interactive element in the module reached 44** — checkboxes 16px on web and 20px on native, every `size="sm"` button ~32px, the safety rows 40px — on a surface used one-handed, outdoors, in gloves | every control clears 44, and on the checklist rows the **whole row** is the target |
| **the shared tint helper diverged module-wide.** Web's `DISC_TINT` fixed every slot at 10% and dropped `muted` to an opaque ramp step inside a map its own doc calls translucent; native's `withAlpha` left the alpha per call site, and 0.10, 0.12 and 0.14 all appear — plus a fourth strength in `SignaturePad` | one `discGround`, mixed into `card` so the disc is the same colour on a card, a sheet and a page |
| **badges disagreed at all 16 call sites** — web took `Badge`'s `solid`/`md` default, native passed `soft`/`sm` | `BADGE_V4` |
| four components shipped an enabled, fully controlled control with an optional handler — a checkbox that could be clicked forever and never change | the control reads as disabled when there is nothing to call |
| a job priority, a dispatch stage, a site state and a pending inspection all wore status colours | identity; `complete` and `fail` keep theirs, because an outcome genuinely is a status |
| ~150 hard-coded English strings across the twins | `verdictLabels`, `stageLabels`, `statusLabels`, `priorityLabels`, `confirmHazardLabel`, `formatHazardCount`, `formatPhone`, … |

**Two follow-ups, recorded rather than implied.** `SafetyChecklist`'s header
badge counts *all* failures while the banner counts only *hazards* — two
numbers on one screen, so "1 failing" can sit above no banner at all; the V4
line makes the split explicit through `hazardCount()` but keeps both figures.
And a handful of visible strings still have no prop, because the pass's list
was closed: the header pill, the banner title, `DispatchBar`'s advance verbs,
and `SignaturePad`'s "Clear" / "Signed" / "Captured".

*helpers:* `formatDuration`, `formatMoney`, `formatPct`

### `finance` — 13 components, 4 with variants · last updated **0.20.0** ✅

**Progress: 13 / 13 upgraded.** See `FINANCE-FOOD-V4-BRIEF.md` §1.2, §2 and §3.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AccountCard` | `AccountCardV2` · `AccountCardV3` · `AccountCardV4` | ✅ |
| 2 | `BalanceHeader` | `BalanceHeaderV2` · `BalanceHeaderV3` · `BalanceHeaderV4` | ✅ |
| 3 | `BudgetBar` | `BudgetBarV4` | ✅ |
| 4 | `CreditCardView` | `CreditCardViewV4` | ✅ |
| 5 | `ExchangeRateRow` | `ExchangeRateRowV4` | ✅ |
| 6 | `InvoiceLine` | `InvoiceLineV4` | ✅ |
| 7 | `MoneyAmount` | `MoneyAmountV4` | ✅ |
| 8 | `PaymentMethodRow` | `PaymentMethodRowV4` | ✅ |
| 9 | `SavingsGoalCard` | `SavingsGoalCardV2` · `SavingsGoalCardV3` · `SavingsGoalCardV4` | ✅ |
| 10 | `SpendCategoryRow` | `SpendCategoryRowV4` | ✅ |
| 11 | `StatementList` | `StatementListV4` | ✅ |
| 12 | `TransactionRow` | `TransactionRowV2` · `TransactionRowV3` · `TransactionRowV4` | ✅ |
| 13 | `TransferForm` | `TransferFormV4` | ✅ |

*module internals:* `money-v4` — **pure, and shared by both twins**:
`signParts`, `lineTotal`, `pctText`, `meterParts`, `ratePrecision`.
`internal/ledger-v4` per twin — the money ink, `FinanceColorV4`, the badge
shape, the placeholder and the spoken line. The base's `internal/mask.ts` is
**correct and identical across the twins** and is used unchanged — the first
shared helper in this project that needed nothing.

| the defect | the fix |
|---|---|
| **a credit card illegible in both schemes, in both directions.** `CreditCardView`'s `dark` variant paints a neutral-ramp fill and inks it `on-surface` — a token guaranteed against `surface` and nothing else. In light both are near-black; in dark the web ramp inverts at the same moment the ink does. Native has the mirror bug for the opposite reason: it reads `tokens.ramps.neutral`, which is copied to native **without** inverting, so its *light* scheme gets dark ink on a dark card. And `role="img"` on the root prunes the subtree, closing the fallback — a reader announced "VISA card ending 4242" and never read back the number the eye could not resolve | each face is a token **pair with a promise**, and `dark` is the inverse pair, so the two flip together and stay opposite instead of converging. The face is a named group whose name carries the brand, the digits, the holder and the expiry |
| **`TransferForm` was inert.** Every value prop optional with a default, no state, an optional `onChange` — so the selects never changed, the amount field never accepted a number, and `canSubmit` (which needs `amountCents > 0`) could never become true. The submit button was **permanently disabled** | it holds its own state when `onChange` is absent; the controlled path is unchanged |
| **and it round-tripped money through a float** — `Math.round(value * 100)` on a major-unit float, in a module whose barrel promises integer cents "so printed values never drift". `0.145 * 100` is `14.499999999999998`. It also fed a typed `0` back as "cleared", so `0.50` could not be typed at all | a string-based shift, exact where the multiply is not |
| **the web twin missed the `*-text` migration wholesale.** `MoneyAmount` painted money `text-success` / `text-danger` — **fill** tokens, measured at 1.32:1 as text — while the native twin had already migrated and carried a comment saying why. All thirteen route their figures through it | `moneyInkClass` / `moneyInk`. The native twin's own gap is closed too: `colors.muted` was a text colour in thirteen files |
| **direction was hue alone, and could contradict the label.** `signDisplay="never"` made −$50.00 and +$50.00 the same glyphs, and the announced direction came from the sign while the colour came from `tone` — so `tone="expense"` on an unsigned magnitude announced "credit" | `signParts()` returns a word, a glyph and a tone together, and lets `tone` win. A `neutral` figure — a balance, an invoice total — gets no direction at all |
| **`BudgetBar`'s `className` override silently lost.** `cn` is a joiner, not a merger, so `size="sm"` + `className="text-xs"` shipped both and Tailwind's emit order restored the original. The native twin used a style object, which *does* apply — so the same figure drew at a different size on each platform | the `size` prop alone, on both twins |
| **the bar and its own label disagreed.** At 300% spent one element reported `aria-valuenow="100"` beside a name saying "300% of budget used" | `meterParts()` returns the clamped ratio **and** the true percent, because they are not the same number |
| **`InvoiceLine` under-reported a fractional line** — it truncated the unit price and not the quantity, so `333 × 3.5` floored to `$11.65` while the breakdown above it printed the honest figure | `lineTotal()` |
| **`PaymentMethodRow.brand` was accepted, documented and read by nothing** — a Visa row and an Amex row were the same 💳 — and it masked by string concatenation while the module's own masker sat two files away | both fixed; its native radio state is `checked`, not `selected` |
| a zero change rendered as a green gain in three components; `BalanceHeader`'s sparkline was toned from an optional `changeCents`, so a `trend`-only header drew a collapsing balance in success | the tone comes from what is drawn |
| `ExchangeRateRow` formatted with `toFixed`, hard-locking the decimal mark, and threw a `RangeError` above `precision: 100` | `Intl`, and `ratePrecision()` |
| `SavingsGoalCard` floored the overshoot, so $12,000 against a $10,000 goal read identically to landing exactly on target; its ring and `BudgetBar`'s meter were an `image` to assistive tech | the overshoot shows, and the meter is a `progressbar` with a value on both twins |
| ~39 hard-coded English strings | `typeLabels`, `brandLabels`, `holderLabel`, `expiryLabel`, `fieldLabels`, `errorLabel`, `overLabel`, `formatPercent`, … |

**Recorded, not fixed.** `appearance` exists on all thirteen native components
and on none of the web ones — the whole visual-diversity system is native-only,
so the two platforms still cannot render the same screen. Widening it is a base
change, not a V4 one.

*helpers:* `formatMoney`, `maskAccountNumber`, `maskCardNumber`

### `food` — 13 components, 4 with variants · last updated **0.20.0** ✅

**Progress: 13 / 13 upgraded.** See `FINANCE-FOOD-V4-BRIEF.md` §1.1, §2 and §4.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CartBar` | `CartBarV2` · `CartBarV3` · `CartBarV4` | ✅ |
| 2 | `CuisineChip` | `CuisineChipV4` | ✅ |
| 3 | `DeliveryEstimate` | `DeliveryEstimateV4` | ✅ |
| 4 | `DishCard` | `DishCardV2` · `DishCardV3` · `DishCardV4` | ✅ |
| 5 | `MenuSection` | `MenuSectionV2` · `MenuSectionV3` · `MenuSectionV4` | ✅ |
| 6 | `ModifierList` | `ModifierListV4` | ✅ |
| 7 | `NutritionBadge` | `NutritionBadgeV4` | ✅ |
| 8 | `OrderStatusTracker` | `OrderStatusTrackerV4` | ✅ |
| 9 | `RatingSummary` | `RatingSummaryV4` | ✅ |
| 10 | `ReorderRow` | `ReorderRowV4` | ✅ |
| 11 | `RestaurantCard` | `RestaurantCardV2` · `RestaurantCardV3` · `RestaurantCardV4` | ✅ |
| 12 | `TableReservationRow` | `TableReservationRowV4` | ✅ |
| 13 | `TipSelector` | `TipSelectorV4` | ✅ |

*module internals:* `order-v4` — **pure, and shared by both twins**:
`DIET_TONE`, `stepQuantity`, `stageIndex`, `deliveryWindow`, `ORDER_STAGES`.
`internal/menu-v4` per twin.

| the defect | the fix |
|---|---|
| **a menu that never said what was in the food.** `DishCard` put `aria-label={name}` on a `role="button"` root — and `role="button"` is **children-presentational**, as are `checkbox` and `radio`. So a screen-reader user browsing a menu heard exactly one thing per dish: **its name.** Not the price, not the rating, and not the allergen and dietary badges — *Gluten-free*, *Vegan*, *Halal*, *Nut-free* — which are rendered correctly as text-plus-glyph and were then suppressed wholesale by the label one level up. `soldOut` compounded it: `aria-disabled` said unavailable while `onClick` still fired, so the same user who could not hear that a dish contains gluten could add a sold-out one to their cart | the badges are a **sibling** of the card's activation, where nothing prunes them and each badge's own text is read. Not a string built from them: `badges` is `React.ReactNode`, and one twin's first attempt introspected `props.label` off arbitrary children — which works for `NutritionBadge` and silently returns nothing for a badge a consumer writes themselves |
| **the same shape silenced the rest of the module** — the modifier's price delta (so a paid extra was added in silence), `ReorderRow`'s items summary, `RestaurantCard`'s rating and fee, `TableReservationRow`'s table number | one `spokenLine` per row, carrying what the eye can see |
| **hovering a disabled thing made it brighter.** Three components put the dimming opacity and the hover variant on the same element, so a sold-out dish, a closed restaurant and a disabled reorder row all *un-dimmed* on hover. `RestaurantCard` also compounded two opacities onto its photo, landing at 0.525 | the **photo** dims and the text does not — putting the disabled band on the whole card made "Sold out" and "Closed", the words that *explain* the state, the least legible thing on it. And 0.38 is the wrong number for a closed restaurant, which is still openable |
| **`OrderStatusTracker` was silenced by its own role.** `role="progressbar"` is children-presentational, so every stage label and timestamp was pruned, and with no name it announced an unnamed "1 of 4". An unknown status read as stage 1, and a cancelled order still counted up | the value is exposed on an element that contains nothing; `stageIndex()` returns `undefined` for a status it does not know |
| **`TipSelector` and `CuisineChip` could not change.** Both recompute selection from props with no internal state and an optional controlling prop, so uncontrolled the tip selector rendered "No tip" filled and `aria-checked` forever while every tap emitted and nothing moved | `defaultSelectedPercent` / `defaultSelected` |
| **a dietary marker wore a status colour** — `vegetarian`/`vegan` were `success`, `spicy` was `danger` — so a menu row read as a row of alerts and a genuine status badge beside them was indistinguishable | `DIET_TONE` |
| `DeliveryEstimate` silently collapsed a transposed window (`min=35 max=20` rendered "35 min") and threw away the accessible name it computed | `deliveryWindow()`, and the name lands |
| `RatingSummary` hard-coded "out of 5" while deriving its labels from `distribution.length`; its bars were unexposed and its bucket labels were naked digits | `maxStars`, `formatStars`, and exposed bars |
| `CartBar` paid no safe-area inset despite its own docstring calling it sticky-bottom, and its count pill used `on-primary` as a **fill** with `primary` as ink | both fixed |
| `focus-visible:ring-primary-300` at 15 sites; not one tabular figure in the native twin; `hitSlop` used exactly once | the `ring` token, tabular figures, and 44 without `hitSlop` |

**What 0.8.0 actually did, and why the ⚠️ was accurate.** One commit, touching
six files: `DishCard` and its V2/V3 on both twins. It made `priceCents`
optional — correctly, and matched across the twins — and landed
`stopPropagation`, a 44px add button and a real guard **in the variants only**.
So `DishCardV2` guarded its nested control and `DishCard` did not, in the same
commit; and the "EmptyState is a primitive" half landed on web's `MenuSection`
while native still hand-rolled a dashed box. The inconsistency was itself the
defect: a consumer who read `DishCardV2` and concluded the module guarded
nested controls was wrong about every other row in it.

### `gaming` — 12 components, 4 with variants · last updated **0.21.0** ✅

**Progress: 12 / 12 upgraded.** See `GAMING-GOVERNMENT-V4-BRIEF.md` §1.2 and §4.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AchievementUnlock` | `AchievementUnlockV4` | ✅ |
| 2 | `ControllerHint` | `ControllerHintV4` | ✅ |
| 3 | `GameCard` | `GameCardV2` · `GameCardV3` · `GameCardV4` | ✅ |
| 4 | `InventoryItem` | `InventoryItemV4` | ✅ |
| 5 | `LeaderboardPodium` | `LeaderboardPodiumV2` · `LeaderboardPodiumV3` · `LeaderboardPodiumV4` | ✅ |
| 6 | `LevelBar` | `LevelBarV4` | ✅ |
| 7 | `LobbyRow` | `LobbyRowV4` | ✅ |
| 8 | `MatchmakingStatus` | `MatchmakingStatusV4` | ✅ |
| 9 | `PlayerStatCard` | `PlayerStatCardV2` · `PlayerStatCardV3` · `PlayerStatCardV4` | ✅ |
| 10 | `QuestCard` | `QuestCardV2` · `QuestCardV3` · `QuestCardV4` | ✅ |
| 11 | `ScoreBoard` | `ScoreBoardV4` | ✅ |
| 12 | `TournamentBracket` | `TournamentBracketV4` | ✅ |

*module internals:* `progress-v4` — **pure, and shared by both twins**:
`slotParts`, `questParts`. `internal/arcade-v4` per twin — `IDENTITY_TONE`,
the badge shape, the placeholder, `ART_SCRIM`/`ART_INK` and the spoken line.

| the defect | the fix |
|---|---|
| **a matchmaking panel whose Accept button could not be reached.** `native/MatchmakingStatus`'s root is `accessible accessibilityRole="summary"` so the phase and slot count read as one sentence — and `accessible` collapses everything beneath it, which is Accept, Retry and Cancel. A VoiceOver user in a queue hears "Match found!, 10 / 10 players" and then cannot swipe to anything inside the panel; `onAccept` is wired to nothing else, so the accept window expires unreachable. Nothing announced the phase change either. The web twin failed the same moment from the opposite direction: its name sat on a `Card` that renders a role-less `<div>`, where ARIA forbids naming, so the string was dropped and never spoken at all | the summary sits on an element that contains no controls, the three buttons are its siblings, and the phase change announces — `assertive` for `found` only, because that is the one with a window that closes |
| **Space on Play started nothing and navigated away.** The inner button guarded the click path; the card's key handler caught the bubbled keydown, `preventDefault()`ed the button's own synthesised click and fired the card. Enter fired **both** | Play is a sibling of the card's activation. Sixth appearance of this shape |
| **a zero-capacity lobby showed "5/5" *and* an enabled Join.** `clamp(players, 0, cap \|\| players)` made the denominator the player count, so the badge read full — while `isFull` required `cap > 0`, so `joinable` stayed true. The badge and the button read the same zero and disagreed | `slotParts()`: no capacity is an **unknown** room, not a full one |
| **one number drawn, a different one announced.** `LeaderboardPodium` rendered `formatCount(score)` — "4.2K" — while its accessible name used the raw `4200`. A sighted user and a screen-reader user comparing the same row got different values | one `formatScore`, both places |
| **two "toggles" that cannot toggle.** `InventoryItem`'s inspect button announced `aria-pressed={item.equipped}` and `TournamentBracket`'s match announced `aria-pressed={decided}`; activating either can never change what it reports — and the twins told different lies, native saying `selected` | neither claims a state its activation cannot change |
| **a locked achievement claimed `aria-disabled` and still fired `onClick`** — its own JSDoc says "a real `<button>`; disabled while locked", and it was not | a real disabled control, at the 0.38 band. `QuestCard`'s locked card is **not** a control, so it drops the blanket `opacity: 0.6` entirely and lets the padlock and the "Locked" badge carry the state at full contrast |
| **a screen-reader user could never learn a score in the bracket.** The label omitted the scores and `role="button"` pruned the two sides that render them | the scores are in the name |
| **the cover scrim inverted, in opposite directions.** Web built it from `from-neutral-900/75` and the web ramp inverts while the artwork does not; native read `tokens.ramps.neutral[900]`, which is **not** inverted for native, so it never darkened for dark mode | `ART_SCRIM` / `ART_INK`, deliberately not tokens |
| `LevelBar`'s `progressbar` was pruned by its own wrapper on native, while the JSDoc claimed the fraction was announced | the labelled element **is** the bar |
| a genre, a rarity tier, a podium place, a reward and a **full lobby** all wore status colours — a full room drawn as an error | `IDENTITY_TONE`; rarity carries its tier as a frame weight and a word |
| `variant` was accepted and explicitly discarded — literally `void variant;` — in six variant components | the V4 line honours what it accepts |
| six web components named a role-less element, where ARIA forbids it and the label is discarded — while the native twin announced it | real roles |
| ~34 hard-coded English strings | `playLabel`, `installLabel`, `phaseLabels`, `stateLabels`, `rarityLabels`, `scoreUnit`, `pointsUnit`, `formatSlots`, … |

**Recorded, not fixed.** `types.ts`'s `rarityColorKey` freezes the
rarity-as-status defect into an **exported helper**, re-exported from the module
index — so it is public API, not an internal habit. The V4 line stops calling
it; removing the export is a breaking change outside this pass.

*helpers:* `clamp`, `formatCount`, `formatElapsed`, `rarityColorKey`, `rarityRank`, `withAlpha`

### `government` — 12 components, 4 with variants · last updated **0.21.0** ✅

**Progress: 12 / 12 upgraded.** See `GAMING-GOVERNMENT-V4-BRIEF.md` §1.1, §2 and §5.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BenefitCard` | `BenefitCardV4` | ✅ |
| 2 | `CivicAlert` | `CivicAlertV4` | ✅ |
| 3 | `CivicAppointment` | `CivicAppointmentV2` · `CivicAppointmentV3` · `CivicAppointmentV4` | ✅ |
| 4 | `ComplaintRow` | `ComplaintRowV4` | ✅ |
| 5 | `DocumentRequest` | `DocumentRequestV4` | ✅ |
| 6 | `FormStatusRow` | `FormStatusRowV4` | ✅ |
| 7 | `PermitStatus` | `PermitStatusV2` · `PermitStatusV3` · `PermitStatusV4` | ✅ |
| 8 | `PublicNoticeCard` | `PublicNoticeCardV4` | ✅ |
| 9 | `RepresentativeCard` | `RepresentativeCardV2` · `RepresentativeCardV3` · `RepresentativeCardV4` | ✅ |
| 10 | `ServiceCard` | `ServiceCardV2` · `ServiceCardV3` · `ServiceCardV4` | ✅ |
| 11 | `TaxSummaryCard` | `TaxSummaryCardV4` | ✅ |
| 12 | `VotingInfoCard` | `VotingInfoCardV4` | ✅ |

*module internals:* `civic-v4` — **pure, and shared by both twins**:
`statusSentence`, `isAdverse`, `labelledId`. `internal/civic-v4` per twin —
`tintGround`/`tintInk`, `BADGE_V4`, `CARD_V4`, `IDENTITY_TONE`, the spoken
line. The base's `internal/tint.ts` and `internal/pressable.ts` are called by
none of the twenty-four V4 files.

| the defect | the fix |
|---|---|
| **a permit whose status appeared nowhere at all.** Position was conveyed **entirely by colour** — the base `Steps` emits no `aria-current`, no name and no position, and the active step and the pending steps both render a bare digit. The one place the words "Under review" could surface was gated on `updatedDate`, an *optional* prop, so `<PermitStatus status="review" title="Building permit" />` rendered a card in which the status appeared **nowhere in the DOM**. A blind applicant, or a sighted one with a red-green deficiency, heard the full happy path — "1 Submitted 2 Under review 3 Approved 4 Issued" — with no indication which stage was theirs. They could not tell approved from still-pending | `statusSentence()` renders unconditionally, and the tracker composes **`StepsV4`**, which already emitted `aria-current="step"` on web and announced "Step 2 of 4, current" on native. The fix was largely composing a V4 primitive that already existed |
| **two alerts that never announced.** `role="alert"` on content present at first paint does not announce — live regions announce *changes*. And on native `accessibilityRole="alert"` sets no announcement behaviour at all without `accessibilityLiveRegion`. Both `PermitStatus`'s denial and `CivicAlert` — an **emergency banner** — claim in their docstrings that they announce, and neither did | the live region renders empty and its text is set in an effect, so the sentence arrives as a *change* one commit after mount. Assertive for an emergency, polite otherwise — and **not** on the two list rows, where twenty rejected forms would queue twenty announcements |
| **five components carried a rejection state and not one could say why.** Permit denied, form rejected and action-needed, document denied, benefit denied and suspended, appointment no-show — no prop interface had a field for the reason. `PermitStatus` hard-coded "Review the notice and re-apply or appeal" and offered no way to say what the notice said. The status that stops someone's food assistance was a pill | a `reason` prop on each, gated on `isAdverse()`, rendered and announced |
| **Space on ServiceCard's "Start" started nothing and navigated away**, and Enter fired both handlers. On native the Start button was invisible to VoiceOver inside the card's `accessible` root | Start is a sibling of the card's activation |
| **six identifiers rendered as bare strings** — permit, form, request, ticket, case and queue numbers — so a reader heard "BLD-2026-0417" with no idea what it identified | `labelledId()` |
| **`internal/tint.ts` baked the fill-as-ink defect into a shared table** — every foreground a fill token used as ink, on ramp-step grounds, inherited by every component that called it | `tintGround` / `tintInk`, off the shared tone table |
| **every badge was a filled pill on web and a soft tint on native** (10 components), **every card `outlined` on web and `elevated` on native** (9) — and `ComplaintRow` split badge shape **inside a single row**, priority `outline` beside a `soft` status | `BADGE_V4` and `CARD_V4`, on all fourteen call sites |
| three irreversible actions one tap from a ~32px target — "Check in" (forfeits a DMV slot), "Pay fee", "Pay now" — and an emergency alert dismissed in one tap with no way to restore it | a confirming press, and 44 |
| a tax due date styled the same as the "Paid" caption; an election date as two sibling spans with no relationship | both carry their consequence |
| "New" on a public notice was `danger` — the same tone as Denied and Rejected — so an unread roadwork notice read as a rejection; an officeholder being in office was `success` | `primary` for New (**not** neutral — two neutral pills beside each other erase the distinction), `IDENTITY_TONE` for the rest |
| 12 `ring-primary` focus rings; ~120 hard-coded English strings, four overridable | the `ring` token, and a label prop per table |

**Three follow-ups, recorded rather than implied.**
`FormStatusRow`'s `submitted` and `PermitStatus`'s stages still carry tones,
because both read them from `internal/status.ts` — a **base** file neither twin
may edit, and shadowing it per component is how the two `tint.ts` copies drifted
apart. `ServiceCard`'s channel tones stay, because "Unavailable" is a genuine
status. And `internal/tint.ts` documents itself as a mirror of
`insurance/internal/tint.ts` — the two are byte-identical apart from that one
sentence, so **the same defective table is sitting in `insurance`**, which this
pass does not touch.

*helpers:* `FORM_STATUS`, `PERMIT_STAGES`, `PERMIT_STATUS`, `formatMoney`

### `health` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `ActivityRings` | — | ⬜ |
| 2 | `BodyMetricCard` | — | ⬜ |
| 3 | `ExerciseRow` | — | ⬜ |
| 4 | `GoalCard` | `GoalCardV2` · `GoalCardV3` | ⬜ |
| 5 | `HabitRow` | `HabitRowV2` · `HabitRowV3` | ⬜ |
| 6 | `MealCard` | `MealCardV2` · `MealCardV3` | ⬜ |
| 7 | `MetricRing` | — | ⬜ |
| 8 | `MoodPicker` | — | ⬜ |
| 9 | `SleepBar` | — | ⬜ |
| 10 | `StreakCounter` | — | ⬜ |
| 11 | `VitalStat` | — | ⬜ |
| 12 | `WaterTracker` | — | ⬜ |
| 13 | `WorkoutCard` | `WorkoutCardV2` · `WorkoutCardV3` | ⬜ |

### `hr` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BenefitsEnrollment` | — | ⬜ |
| 2 | `DirectoryRow` | — | ⬜ |
| 3 | `EmployeeCard` | `EmployeeCardV2` · `EmployeeCardV3` | ⬜ |
| 4 | `ExpenseClaim` | — | ⬜ |
| 5 | `LeaveRequest` | `LeaveRequestV2` · `LeaveRequestV3` | ⬜ |
| 6 | `OnboardingTask` | — | ⬜ |
| 7 | `OrgChartNode` | — | ⬜ |
| 8 | `PayslipRow` | `PayslipRowV2` · `PayslipRowV3` | ⬜ |
| 9 | `PerformanceReview` | `PerformanceReviewV2` · `PerformanceReviewV3` | ⬜ |
| 10 | `PolicyAcknowledge` | — | ⬜ |
| 11 | `ShiftSchedule` | — | ⬜ |
| 12 | `StatusPill` | — | ⬜ |
| 13 | `TimesheetRow` | — | ⬜ |

*helpers:* `BENEFIT_STATUS_META`, `BENEFIT_TYPE_META`, `EMPLOYEE_STATUS_META`, `EMPLOYMENT_META`, `EXPENSE_CATEGORY_META`, `EXPENSE_STATUS_META`, `LEAVE_STATUS_META`, `LEAVE_TYPE_META`, `PAYSLIP_STATUS_META`, `POLICY_STATUS_META`, `PRESENCE_META`, `REVIEW_STATUS_META`, `SHIFT_STATUS_META`, `TASK_STATUS_META`, `TIMESHEET_STATUS_META`, `clampPct`, `clampRating`, `formatHours`, `formatMoney`, `toneColor`, `toneSlot`

### `insurance` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AgentContactCard` | — | ⬜ |
| 2 | `BeneficiaryRow` | — | ⬜ |
| 3 | `ClaimRow` | `ClaimRowV2` · `ClaimRowV3` | ⬜ |
| 4 | `ClaimStatusTracker` | — | ⬜ |
| 5 | `CoverageItem` | `CoverageItemV2` · `CoverageItemV3` | ⬜ |
| 6 | `DeductibleBar` | — | ⬜ |
| 7 | `PolicyCard` | `PolicyCardV2` · `PolicyCardV3` | ⬜ |
| 8 | `PolicyDocumentRow` | — | ⬜ |
| 9 | `PremiumSummary` | `PremiumSummaryV2` · `PremiumSummaryV3` | ⬜ |
| 10 | `QuoteForm` | — | ⬜ |
| 11 | `RenewalBanner` | — | ⬜ |
| 12 | `RiskScore` | — | ⬜ |

*helpers:* `CLAIM_STATUS`, `POLICY_VARIANT`, `formatMoney`

### `jobs` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `ApplicationRow` | `ApplicationRowV2` · `ApplicationRowV3` | ⬜ |
| 2 | `ApplyButton` | — | ⬜ |
| 3 | `CompanyCard` | `CompanyCardV2` · `CompanyCardV3` | ⬜ |
| 4 | `InterviewSlot` | — | ⬜ |
| 5 | `JobCard` | `JobCardV2` · `JobCardV3` | ⬜ |
| 6 | `JobFilterBar` | — | ⬜ |
| 7 | `RecruiterMessage` | — | ⬜ |
| 8 | `ResumeRow` | — | ⬜ |
| 9 | `SalaryRange` | — | ⬜ |
| 10 | `SavedJobRow` | — | ⬜ |
| 11 | `SkillTag` | — | ⬜ |
| 12 | `StatusPipeline` | `StatusPipelineV2` · `StatusPipelineV3` | ⬜ |

*helpers:* `APPLICATION_STAGES`, `EMPLOYMENT_LABEL`, `EMPLOYMENT_TYPES`, `STAGE_LABEL`, `formatCompactMoney`, `formatRelative`, `formatSalary`, `formatShortDate`, `formatTime`

### `kids` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AllowanceTracker` | `AllowanceTrackerV2` · `AllowanceTrackerV3` | ⬜ |
| 2 | `BehaviorBadge` | — | ⬜ |
| 3 | `ChildProfileCard` | `ChildProfileCardV2` · `ChildProfileCardV3` | ⬜ |
| 4 | `ChoreCard` | `ChoreCardV2` · `ChoreCardV3` | ⬜ |
| 5 | `FamilyMemberRow` | — | ⬜ |
| 6 | `GrowthChart` | — | ⬜ |
| 7 | `MilestoneCard` | — | ⬜ |
| 8 | `RewardStar` | `RewardStarV2` · `RewardStarV3` | ⬜ |
| 9 | `RoutineRow` | — | ⬜ |
| 10 | `SchoolEventRow` | — | ⬜ |
| 11 | `ScreenTimeBar` | — | ⬜ |
| 12 | `StickerReward` | — | ⬜ |

### `learning` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AchievementBadge` | — | ⬜ |
| 2 | `CertificateCard` | — | ⬜ |
| 3 | `CourseCard` | `CourseCardV2` · `CourseCardV3` | ⬜ |
| 4 | `EnrollButton` | — | ⬜ |
| 5 | `FlashCard` | — | ⬜ |
| 6 | `LeaderboardRow` | `LeaderboardRowV2` · `LeaderboardRowV3` | ⬜ |
| 7 | `LessonRow` | `LessonRowV2` · `LessonRowV3` | ⬜ |
| 8 | `ModuleAccordion` | — | ⬜ |
| 9 | `ProgressTracker` | — | ⬜ |
| 10 | `QuizOption` | — | ⬜ |
| 11 | `QuizQuestion` | `QuizQuestionV2` · `QuizQuestionV3` | ⬜ |
| 12 | `StreakBadge` | — | ⬜ |
| 13 | `VideoLessonRow` | — | ⬜ |

### `legal` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BillableTimeRow` | — | ⬜ |
| 2 | `CaseCard` | `CaseCardV2` · `CaseCardV3` | ⬜ |
| 3 | `ClientIntakeRow` | — | ⬜ |
| 4 | `ContractClause` | — | ⬜ |
| 5 | `CourtDateCard` | — | ⬜ |
| 6 | `DisclaimerBanner` | — | ⬜ |
| 7 | `DocumentRow` | `DocumentRowV2` · `DocumentRowV3` | ⬜ |
| 8 | `EvidenceRow` | — | ⬜ |
| 9 | `LegalAppointment` | `LegalAppointmentV2` · `LegalAppointmentV3` | ⬜ |
| 10 | `MatterStatus` | — | ⬜ |
| 11 | `RetainerBalance` | `RetainerBalanceV2` · `RetainerBalanceV3` | ⬜ |
| 12 | `SignatureRequest` | — | ⬜ |
| 13 | `StatusPill` | — | ⬜ |

*helpers:* `APPOINTMENT_STATUS_META`, `APPOINTMENT_TYPE_META`, `BILLABLE_STATUS_META`, `CASE_PRIORITY_META`, `CASE_STATUS_META`, `CLAUSE_RISK_META`, `CLAUSE_STATUS_META`, `CONFLICT_CHECK_META`, `COURT_EVENT_META`, `COURT_URGENCY_META`, `DISCLAIMER_META`, `DOCUMENT_KIND_META`, `DOCUMENT_STATUS_META`, `EVIDENCE_KIND_META`, `EVIDENCE_STATUS_META`, `INTAKE_STATUS_META`, `MATTER_STAGE_META`, `MATTER_STAGE_ORDER`, `PRACTICE_AREA_META`, `RETAINER_STATUS_META`, `SIGNATURE_STATUS_META`, `billableCents`, `clampPct`, `formatHours`, `formatMoney`, `onToneSlot`, `toneColor`, `toneSlot`

### `logistics` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CarrierBadge` | — | ⬜ |
| 2 | `DeliveryProof` | — | ⬜ |
| 3 | `DockSchedule` | — | ⬜ |
| 4 | `ETABar` | — | ⬜ |
| 5 | `LoadPlanBar` | — | ⬜ |
| 6 | `ManifestRow` | — | ⬜ |
| 7 | `PackageRow` | `PackageRowV2` · `PackageRowV3` | ⬜ |
| 8 | `RouteStop` | `RouteStopV2` · `RouteStopV3` | ⬜ |
| 9 | `ScanRow` | — | ⬜ |
| 10 | `ShipmentCard` | `ShipmentCardV2` · `ShipmentCardV3` | ⬜ |
| 11 | `TrackingTimeline` | `TrackingTimelineV2` · `TrackingTimelineV3` | ⬜ |
| 12 | `WarehouseBin` | — | ⬜ |

*helpers:* `CARRIER_META`, `DOCK_META`, `PROOF_META`, `SCAN_META`, `SHIPMENT_META`, `STOP_META`, `TRACKING_META`, `TRACKING_ORDER`, `clampPct`, `formatWeight`, `toneColor`, `trackingIndex`, `withAlpha`

### `marketing` — 37 components · last updated **0.9.0** ✅

All 37 components now ship a **V4 "showcase" design line** — a bold,
conversion-forward landing-page language: extra-bold tight-tracked headlines,
generous whitespace, elevated cards for content sections, refined visual
machinery, and a vibrant **primary→accent brand gradient** reserved for the
hero / CTA / announcement / newsletter moments (near-white ink on the saturated
ground). Every V4 is a drop-in (`XxxV4Props = XxxProps`) and honors every base
prop + effect variant (aurora/particle/ornament/mock/etc.). Base components
untouched; V4 is additive. Token-driven, dark-mode safe, web + native (native
reuses `commerce/internal/Gradient`; web reuses the aurora machinery).

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AnnouncementBar` | `AnnouncementBarV4` | ✅ |
| 2 | `AuroraBackground` | `AuroraBackgroundV4` | ✅ |
| 3 | `BentoCard` | `BentoCardV4` | ✅ |
| 4 | `BentoGrid` | `BentoGridV4` | ✅ |
| 5 | `CTABanner` | `CTABannerV4` | ✅ |
| 6 | `Carousel` | `CarouselV4` | ✅ |
| 7 | `ComparisonTable` | `ComparisonTableV4` | ✅ |
| 8 | `Countdown` | `CountdownV4` | ✅ |
| 9 | `CoverGallery` | `CoverGalleryV4` | ✅ |
| 10 | `EditorialGrid` | `EditorialGridV4` | ✅ |
| 11 | `EditorialItem` | `EditorialItemV4` | ✅ |
| 12 | `EntityCard` | `EntityCardV4` | ✅ |
| 13 | `FeatureGrid` | `FeatureGridV4` (+ `FeatureCardV4`, web) | ✅ |
| 14 | `FeatureSplit` | `FeatureSplitV4` | ✅ |
| 15 | `Footer` | `FooterV4` (+ `FooterColumnV4`, web) | ✅ |
| 16 | `GenerativeCover` | `GenerativeCoverV4` | ✅ |
| 17 | `GradientHero` | `GradientHeroV4` | ✅ |
| 18 | `LocationBlock` | `LocationBlockV4` | ✅ |
| 19 | `LogoCloud` | `LogoCloudV4` | ✅ |
| 20 | `Navbar` | `NavbarV4` | ✅ |
| 21 | `NewsletterSignup` | `NewsletterSignupV4` | ✅ |
| 22 | `OrnamentRule` | `OrnamentRuleV4` | ✅ |
| 23 | `ParticleField` | `ParticleFieldV4` | ✅ |
| 24 | `PointerHalo` | `PointerHaloV4` | ✅ |
| 25 | `PriceList` | `PriceListV4` (+ `PriceRowV4`) | ✅ |
| 26 | `PricingTable` | `PricingTableV4` (+ `PricingTierV4`) | ✅ |
| 27 | `PricingToggle` | `PricingToggleV4` | ✅ |
| 28 | `ProcessSteps` | `ProcessStepsV4` | ✅ |
| 29 | `ProductMock` | `ProductMockV4` | ✅ |
| 30 | `RichText` | `RichTextV4` | ✅ |
| 31 | `SectionDivider` | `SectionDividerV4` | ✅ |
| 32 | `SectionHeading` | `SectionHeadingV4` | ✅ |
| 33 | `Stat` | `StatV4` | ✅ |
| 34 | `StatBar` | `StatBarV4` | ✅ |
| 35 | `TeamGrid` | `TeamGridV4` | ✅ |
| 36 | `Testimonials` | `TestimonialsV4` (+ `TestimonialV4`) | ✅ |
| 37 | `VideoEmbed` | `VideoEmbedV4` | ✅ |

*helpers:* `FAQ`, `initialsFromName`, `parseRichText`

### `marketplace` — 12 components, 4 with variants · last updated **0.12.0** ✅

**Progress: 12 / 12 upgraded.** Done with `commerce` as one surface;
`ListingCardV4` and `commerce`'s `ProductCardV4` share an anatomy on purpose.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AuctionCard` | `AuctionCardV2` · `AuctionCardV3` · `AuctionCardV4` | ✅ |
| 2 | `BidRow` | `BidRowV4` | ✅ |
| 3 | `CategoryTile` | `CategoryTileV4` | ✅ |
| 4 | `ConditionBadge` | `ConditionBadgeV4` | ✅ |
| 5 | `ListingCard` | `ListingCardV2` · `ListingCardV3` · `ListingCardV4` | ✅ |
| 6 | `MakeOfferForm` | `MakeOfferFormV4` | ✅ |
| 7 | `OfferRow` | `OfferRowV4` | ✅ |
| 8 | `RatingBreakdown` | `RatingBreakdownV4` | ✅ |
| 9 | `ReportListing` | `ReportListingV4` | ✅ |
| 10 | `SellerCard` | `SellerCardV2` · `SellerCardV3` · `SellerCardV4` | ✅ |
| 11 | `ShippingOption` | `ShippingOptionV4` | ✅ |
| 12 | `WatchlistRow` | `WatchlistRowV2` · `WatchlistRowV3` · `WatchlistRowV4` | ✅ |

The V4 rows import the row metric from `dashboard/internal/row-v4` rather than
restating 56 / 72 / 16 / 44 a fifth time. If `marketplace` should not depend on
`dashboard`, hoist that file — do not re-type the numbers.

### `medical` — 12 components, 4 with variants · last updated **0.9.0** ✅

All 12 originals now ship a **V4 "clinic" design line** — a calm, trustworthy
clinical language: elevated cards, panels, and rows with clinical status by glyph
+ labelled badge + tone (never color alone) and big legible tabular-nums vitals.
Every V4 is a drop-in (`XxxV4Props = XxxProps`); five card/row V4s add an optional
`variant` (`full` / `compact`) — `AppointmentCard`, `DoctorCard`, `PatientCard`,
`LabResultRow`, `PrescriptionRow`. The brand gradient is reserved for the clinic
moment — the `VisitSummary` header hero. No new components. Base/V2/V3 untouched;
V4 is additive. Token-driven, dark-mode safe, web + native. Informational UI only
— not a medical device.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AppointmentCard` | `AppointmentCardV2` · `AppointmentCardV3` · `AppointmentCardV4` | ✅ |
| 2 | `DoctorCard` | `DoctorCardV2` · `DoctorCardV3` · `DoctorCardV4` | ✅ |
| 3 | `HealthRecordRow` | `HealthRecordRowV4` | ✅ |
| 4 | `LabResultRow` | `LabResultRowV2` · `LabResultRowV3` · `LabResultRowV4` | ✅ |
| 5 | `MedicationSchedule` | `MedicationScheduleV4` | ✅ |
| 6 | `PatientCard` | `PatientCardV4` | ✅ |
| 7 | `PrescriptionRow` | `PrescriptionRowV2` · `PrescriptionRowV3` · `PrescriptionRowV4` | ✅ |
| 8 | `SymptomSelector` | `SymptomSelectorV4` | ✅ |
| 9 | `TelehealthCallBar` | `TelehealthCallBarV4` | ✅ |
| 10 | `TriageLevel` | `TriageLevelV4` | ✅ |
| 11 | `VisitSummary` | `VisitSummaryV4` | ✅ |
| 12 | `VitalsPanel` | `VitalsPanelV4` | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `clinic` palette helper

### `music` — 12 components, 4 with variants · last updated **0.9.0** ✅

All 12 originals now ship a **V4 "session" design line** — a tactile DAW
language: control surfaces with satisfying active/armed/playing states (soft-primary
or per-cell accent fill + a glyph/label marker, never color alone) and bold
tabular-nums numerals (BPM, time, dB). Every V4 is a drop-in (`XxxV4Props =
XxxProps`) and honors its base's own `variant` — every one of the 12 carries a
layout variant (BPMControl stepper/inline/tap, ChordChip solid/soft/outline,
Mixer/PianoKeys/SetlistRow/TrackPad full/compact/grid, RecordButton
ring/solid/labeled, WaveformEditor full/mini, …) plus the per-cell accent-slot
colors. The brand gradient is reserved for the session moment — the
`WaveformEditor` full signal hero. No new components. Base/V2/V3 untouched; V4 is
additive. Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BPMControl` | `BPMControlV4` | ✅ |
| 2 | `ChordChip` | `ChordChipV4` | ✅ |
| 3 | `LoopControl` | `LoopControlV4` | ✅ |
| 4 | `MetronomeBar` | `MetronomeBarV4` | ✅ |
| 5 | `Mixer` | `MixerV2` · `MixerV3` · `MixerV4` | ✅ |
| 6 | `PianoKeys` | `PianoKeysV2` · `PianoKeysV3` · `PianoKeysV4` | ✅ |
| 7 | `RecordButton` | `RecordButtonV4` | ✅ |
| 8 | `SamplePad` | `SamplePadV4` | ✅ |
| 9 | `SetlistRow` | `SetlistRowV2` · `SetlistRowV3` · `SetlistRowV4` | ✅ |
| 10 | `TrackPad` | `TrackPadV2` · `TrackPadV3` · `TrackPadV4` | ✅ |
| 11 | `VolumeFader` | `VolumeFaderV4` | ✅ |
| 12 | `WaveformEditor` | `WaveformEditorV4` | ✅ |

*helpers:* `NOTE_NAMES`, `chordLabel`, `clamp`, `formatBpm`, `formatDuration`, `isBlackKey`, `octaveNotes`, `padAccentKey`, `withAlpha`
*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `session` palette helper

### `nonprofit` — 12 components, 4 with variants · last updated **0.9.0** ✅

All 12 originals now ship a **V4 "rally" design line** — a warm, mission-driven
fundraising language: elevated rounded cards, meters, and rows with soft-primary
wells and chips, bold money numerals (integer cents via `formatMoney`), and
status/tier carried by glyph + labelled badge (never color alone). Every V4 is a
drop-in (`XxxV4Props = XxxProps`) and honors its base's own layout props — 7 of
the 12 already carry a `variant`: `CampaignProgress` bar/thermometer, `CauseCard`
/`DonationCard`/`FundraiserCard` default/compact/featured, `ImpactStat`
plain/card/tile, `MatchingGiftBanner` solid/soft/outline, `ThankYouCard`
default/celebratory. The brand gradient is reserved for the rally moment — the
`ThankYouCard` celebration. No new components. Base/V2/V3 untouched; V4 is
additive. Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CampaignProgress` | `CampaignProgressV2` · `CampaignProgressV3` · `CampaignProgressV4` | ✅ |
| 2 | `CauseCard` | `CauseCardV2` · `CauseCardV3` · `CauseCardV4` | ✅ |
| 3 | `DonationCard` | `DonationCardV2` · `DonationCardV3` · `DonationCardV4` | ✅ |
| 4 | `DonorRow` | `DonorRowV4` | ✅ |
| 5 | `EventTicketRow` | `EventTicketRowV4` | ✅ |
| 6 | `FundraiserCard` | `FundraiserCardV2` · `FundraiserCardV3` · `FundraiserCardV4` | ✅ |
| 7 | `ImpactStat` | `ImpactStatV4` | ✅ |
| 8 | `MatchingGiftBanner` | `MatchingGiftBannerV4` | ✅ |
| 9 | `PledgeRow` | `PledgeRowV4` | ✅ |
| 10 | `RecurringGiftRow` | `RecurringGiftRowV4` | ✅ |
| 11 | `ThankYouCard` | `ThankYouCardV4` | ✅ |
| 12 | `VolunteerShift` | `VolunteerShiftV4` | ✅ |

*helpers:* `formatMoney`, `goalPct`, `withAlpha`
*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `rally` palette helper

### `pets` — 12 components, 4 with variants · last updated **0.9.0** ✅

All 12 originals now ship a **V4 "companion" design line** — a warm, friendly
pet-care language: elevated rounded cards, rings, and rows with soft-primary
glyph wells and meta chips, and status/kind carried by glyph + labelled badge
(never color alone). Every V4 is a drop-in (`XxxV4Props = XxxProps`) and honors
its base's own props — `PetActivityRing` walk/play/exercise/steps/calories, and
the status/kind enums on every card. The brand gradient is reserved for the
companion moment — the `PetProfileCard` profile hero. No new components.
Base/V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AdoptionCard` | `AdoptionCardV2` · `AdoptionCardV3` · `AdoptionCardV4` | ✅ |
| 2 | `BreedCard` | `BreedCardV4` | ✅ |
| 3 | `FeedingSchedule` | `FeedingScheduleV4` | ✅ |
| 4 | `GroomingCard` | `GroomingCardV4` | ✅ |
| 5 | `LostPetAlert` | `LostPetAlertV4` | ✅ |
| 6 | `MedicationReminder` | `MedicationReminderV4` | ✅ |
| 7 | `PetActivityRing` | `PetActivityRingV2` · `PetActivityRingV3` · `PetActivityRingV4` | ✅ |
| 8 | `PetHealthLog` | `PetHealthLogV4` | ✅ |
| 9 | `PetProfileCard` | `PetProfileCardV2` · `PetProfileCardV3` · `PetProfileCardV4` | ✅ |
| 10 | `VaccineRecord` | `VaccineRecordV4` | ✅ |
| 11 | `VetAppointmentCard` | `VetAppointmentCardV2` · `VetAppointmentCardV3` · `VetAppointmentCardV4` | ✅ |
| 12 | `WeightTracker` | `WeightTrackerV4` | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `companion` palette helper

### `photography` — 12 components, 4 with variants · last updated **0.9.0** ✅

All 12 originals now ship a **V4 "studio" design line** — a matted, image-forward
gallery language: elevated cards, tiles, and rows whose photos float inside a thin
neutral mat, bold titles, soft-primary meta chips, and status/priority carried by
glyph + labelled badge (never color alone). Every V4 is a drop-in (`XxxV4Props =
XxxProps`) and honors its base's own layout prop — `AlbumCard` cover/list/compact,
`GalleryHeader` hero/compact, `PortfolioGrid` grid/masonry, `PhotoTile` ratios,
`LightboxThumb` sizes. The brand gradient is reserved for the studio moment — the
`GalleryHeader` hero (brand-gradient ground, or cover photo + scrim). No new
components. Base/V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AlbumCard` | `AlbumCardV2` · `AlbumCardV3` · `AlbumCardV4` | ✅ |
| 2 | `ClientProofRow` | `ClientProofRowV4` | ✅ |
| 3 | `EquipmentRow` | `EquipmentRowV4` | ✅ |
| 4 | `GalleryHeader` | `GalleryHeaderV4` | ✅ |
| 5 | `LightboxThumb` | `LightboxThumbV4` | ✅ |
| 6 | `PackageCard` | `PackageCardV2` · `PackageCardV3` · `PackageCardV4` | ✅ |
| 7 | `PhotoTile` | `PhotoTileV2` · `PhotoTileV3` · `PhotoTileV4` | ✅ |
| 8 | `PortfolioGrid` | `PortfolioGridV2` · `PortfolioGridV3` · `PortfolioGridV4` | ✅ |
| 9 | `PricePackageRow` | `PricePackageRowV4` | ✅ |
| 10 | `PrintOrderRow` | `PrintOrderRowV4` | ✅ |
| 11 | `ShootBookingCard` | `ShootBookingCardV4` | ✅ |
| 12 | `ShotListItem` | `ShotListItemV4` | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `studio` palette helper

### `pos` — 19 components (13 with a V4 "register" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 13 originals now ship a **V4 "register" design line** — a tactile checkout
language: crisp fast-scan surfaces with bold, prominent totals (tabular-nums),
satisfying press/selected states, big ≥44px controls, and a brand gradient
reserved for the checkout moments (payment success, sales summary, register
header, the charge button). Base/V2/V3 untouched; V4 is additive. Token-driven,
dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CartLine` | `CartLineV2` · `CartLineV3` · `CartLineV4` | ✅ |
| 2 | `CashDrawerRow` | `CashDrawerRowV4` | ✅ |
| 3 | `DiscountRow` | `DiscountRowV4` | ✅ |
| 4 | `OrderTicket` | `OrderTicketV4` | ✅ |
| 5 | `PaymentMethodTile` | `PaymentMethodTileV4` | ✅ |
| 6 | `ProductGridTile` | `ProductGridTileV2` · `ProductGridTileV3` · `ProductGridTileV4` | ✅ |
| 7 | `QuickChargeBar` | `QuickChargeBarV4` | ✅ |
| 8 | `ReceiptView` | `ReceiptViewV2` · `ReceiptViewV3` · `ReceiptViewV4` | ✅ |
| 9 | `RefundRow` | `RefundRowV4` | ✅ |
| 10 | `RegisterKeypad` | `RegisterKeypadV2` · `RegisterKeypadV3` · `RegisterKeypadV4` | ✅ |
| 11 | `ShiftReport` | `ShiftReportV4` | ✅ |
| 12 | `SplitBillRow` | `SplitBillRowV4` | ✅ |
| 13 | `StatusPill` | `StatusPillV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 14 | `PaymentSuccess` | 🆕 gradient payment-complete celebration — amount, method, change, receipt | ✅ |
| 15 | `SalesSummary` | 🆕 gradient daily/shift sales hero — gross, transactions, top items | ✅ |
| 16 | `RegisterHeader` | 🆕 gradient terminal header — store, register, cashier, running total | ✅ |
| 17 | `CheckoutSummary` | 🆕 subtotal/tax/tip/total breakdown + Charge CTA | ✅ |
| 18 | `TipSelector` | 🆕 tip-percentage selector (15/18/20 + custom) | ✅ |
| 19 | `CategoryTabs` | 🆕 product category tabs for the register grid | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `register` palette helper

*helpers:* `CASH_MOVEMENT_META`, `PAYMENT_METHOD_META`, `REFUND_REASON_META`, `REFUND_STATUS_META`, `TICKET_STATUS_META`, `formatMoney`, `initials`, `onToneSlot`, `safeCents`, `seedRampStep`, `sumCents`, `toneColor`, `toneSlot`, `varianceMeta`, `withAlpha`

### `productivity` — 19 components (13 with a V4 "flow" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 13 originals now ship a **V4 "flow" design line** — a focused task-workspace
language: calm legible task surfaces where completing a task settles into a
soft-success glow, one primary accent, soft-primary progress, and a brand
gradient reserved for the focus moments (project header, today dashboard, weekly
review). Base/V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe,
web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AssigneeGroup` | `AssigneeGroupV4` | ✅ |
| 2 | `BoardColumn` | `BoardColumnV4` | ✅ |
| 3 | `ChecklistItem` | `ChecklistItemV4` | ✅ |
| 4 | `DueDatePill` | `DueDatePillV4` | ✅ |
| 5 | `LabelChip` | `LabelChipV4` | ✅ |
| 6 | `MilestoneRow` | `MilestoneRowV2` · `MilestoneRowV3` · `MilestoneRowV4` | ✅ |
| 7 | `NoteCard` | `NoteCardV2` · `NoteCardV3` · `NoteCardV4` | ✅ |
| 8 | `PriorityTag` | `PriorityTagV4` | ✅ |
| 9 | `ProjectCard` | `ProjectCardV2` · `ProjectCardV3` · `ProjectCardV4` | ✅ |
| 10 | `ReminderRow` | `ReminderRowV4` | ✅ |
| 11 | `SubtaskList` | `SubtaskListV4` | ✅ |
| 12 | `TaskRow` | `TaskRowV2` · `TaskRowV3` · `TaskRowV4` | ✅ |
| 13 | `TimeTracker` | `TimeTrackerV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 14 | `ProjectHeader` | 🆕 gradient project hero — progress, members, status, add-task | ✅ |
| 15 | `TodayHeader` | 🆕 gradient today dashboard hero — due/done counts, progress ring | ✅ |
| 16 | `WeeklyReview` | 🆕 gradient weekly stats/streak hero — completed, per-day bars | ✅ |
| 17 | `QuickAddTask` | 🆕 quick-add composer — input + priority/due/project chips | ✅ |
| 18 | `CalendarStrip` | 🆕 horizontal week strip with per-day task counts | ✅ |
| 19 | `ActivityFeed` | 🆕 task activity feed — completed/created/commented/assigned/moved | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `flow` palette helper

### `realestate` — 19 components (13 with a V4 "listing" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 13 originals now ship a **V4 "listing" design line** — an image-forward,
editorial language: elevated cards with floating rounded photos, price-forward
headers, soft-primary fact chips, and a brand gradient reserved for the listing
moments (property hero, agent header, mortgage summary) and hero image scrims.
Base/V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AgentCard` | `AgentCardV2` · `AgentCardV3` · `AgentCardV4` | ✅ |
| 2 | `AmenityGrid` | `AmenityGridV4` | ✅ |
| 3 | `ComparableRow` | `ComparableRowV2` · `ComparableRowV3` · `ComparableRowV4` | ✅ |
| 4 | `FloorPlanView` | `FloorPlanViewV4` | ✅ |
| 5 | `ListingGallery` | `ListingGalleryV2` · `ListingGalleryV3` · `ListingGalleryV4` | ✅ |
| 6 | `MapPinCard` | `MapPinCardV4` | ✅ |
| 7 | `MortgageCalc` | `MortgageCalcV4` | ✅ |
| 8 | `NeighborhoodStat` | `NeighborhoodStatV4` | ✅ |
| 9 | `OpenHouseBadge` | `OpenHouseBadgeV4` | ✅ |
| 10 | `PriceHistory` | `PriceHistoryV4` | ✅ |
| 11 | `PropertyCard` | `PropertyCardV2` · `PropertyCardV3` · `PropertyCardV4` | ✅ |
| 12 | `SavedSearchRow` | `SavedSearchRowV4` | ✅ |
| 13 | `TourScheduler` | `TourSchedulerV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 14 | `ListingHero` | 🆕 property-detail hero — hero photo + scrim, price, facts, tour CTA | ✅ |
| 15 | `AgentProfileHeader` | 🆕 gradient agent hero — photo, rating, stats, call/message | ✅ |
| 16 | `MortgageSummary` | 🆕 gradient mortgage-results hero — monthly payment + breakdown | ✅ |
| 17 | `PropertyFactsBar` | 🆕 key-facts strip — beds/baths/sqft/lot/year/type | ✅ |
| 18 | `SchoolCard` | 🆕 nearby-school rating card — score, level, distance | ✅ |
| 19 | `ContactAgentBar` | 🆕 call / message / schedule-tour action bar | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `listing` palette helper

### `smarthome` — 18 components (12 with a V4 "ambient" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 12 originals now ship a **V4 "ambient" design line** — a control-panel
language: calm control surfaces where an active device **glows** (a soft accent
wash + a glowing icon disc), big legible dials and sliders, and a brand gradient
reserved for the dashboard moments (home header, room header, energy dashboard).
Base/V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AutomationRule` | `AutomationRuleV4` | ✅ |
| 2 | `CameraTile` | `CameraTileV4` | ✅ |
| 3 | `DeviceTile` | `DeviceTileV2` · `DeviceTileV3` · `DeviceTileV4` | ✅ |
| 4 | `DeviceToggleRow` | `DeviceToggleRowV4` | ✅ |
| 5 | `EnergyUsage` | `EnergyUsageV4` | ✅ |
| 6 | `LightControl` | `LightControlV2` · `LightControlV3` · `LightControlV4` | ✅ |
| 7 | `LockControl` | `LockControlV4` | ✅ |
| 8 | `RoomGroup` | `RoomGroupV4` | ✅ |
| 9 | `SceneCard` | `SceneCardV2` · `SceneCardV3` · `SceneCardV4` | ✅ |
| 10 | `ScheduleRow` | `ScheduleRowV4` | ✅ |
| 11 | `SensorReading` | `SensorReadingV4` | ✅ |
| 12 | `ThermostatDial` | `ThermostatDialV2` · `ThermostatDialV3` · `ThermostatDialV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 13 | `HomeHeader` | 🆕 gradient home-dashboard hero — greeting, status, weather, quick scenes | ✅ |
| 14 | `RoomHeader` | 🆕 gradient room hero — climate, devices-on, all-off/all-on | ✅ |
| 15 | `EnergyDashboard` | 🆕 gradient whole-home energy hero — usage, cost, breakdown | ✅ |
| 16 | `ModeSelector` | 🆕 Home / Away / Night / Vacation mode switch | ✅ |
| 17 | `FavoritesGrid` | 🆕 quick-control grid of favorite device tiles | ✅ |
| 18 | `AlertCard` | 🆕 home alert — info / warning / critical, dismiss + view | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `ambient` palette helper

### `social` — 20 components (14 with a V4 "feed" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 14 originals now ship a **V4 "feed" design line** — a clean, airy social
language: elevated rounded cards with generous whitespace, larger avatars, a
primary verified tick, soft-primary action states, gradient story rings, and a
brand gradient reserved for the identity moments (profile header, story viewer).
Base/V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CommentItem` | `CommentItemV2` · `CommentItemV3` · `CommentItemV4` | ✅ |
| 2 | `EngagementBar` | `EngagementBarV4` | ✅ |
| 3 | `FeedList` | `FeedListV4` | ✅ |
| 4 | `FollowButton` | `FollowButtonV4` | ✅ |
| 5 | `HashtagChip` | `HashtagChipV4` | ✅ |
| 6 | `MentionText` | `MentionTextV4` | ✅ |
| 7 | `Poll` | `PollV4` | ✅ |
| 8 | `PostCard` | `PostCardV2` · `PostCardV3` · `PostCardV4` | ✅ |
| 9 | `ProfileStats` | `ProfileStatsV4` | ✅ |
| 10 | `ReactionBar` | `ReactionBarV4` | ✅ |
| 11 | `ShareSheet` | `ShareSheetV4` | ✅ |
| 12 | `StoryBar` | `StoryBarV2` · `StoryBarV3` · `StoryBarV4` | ✅ |
| 13 | `StoryRing` | `StoryRingV4` | ✅ |
| 14 | `UserCard` | `UserCardV2` · `UserCardV3` · `UserCardV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 15 | `ProfileHeader` | 🆕 gradient profile identity hero — avatar, bio, stat tiles, follow/edit | ✅ |
| 16 | `StoryViewer` | 🆕 immersive full-screen story — segment progress + tap nav + reply | ✅ |
| 17 | `PostComposer` | 🆕 compose a post — avatar, text field, photo/poll/emoji actions, Post | ✅ |
| 18 | `NotificationRow` | 🆕 activity item — like/comment/follow/mention/repost, unread | ✅ |
| 19 | `TrendingCard` | 🆕 trending topic / hashtag card — rank, category, post count | ✅ |
| 20 | `SuggestedUsers` | 🆕 "who to follow" row of user chips | ✅ |

*helpers:* `parseMentions`, `formatCount`
*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `feed` palette helper

### `sports` — 18 components (12 with a V4 "broadcast" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 12 originals now ship a **V4 "broadcast" design line** — a matchday
language: elevated cards, bold scorelines and big numerals, soft-tint status
pills with a live pulse (status by glyph + color, never color alone), and a brand
gradient reserved for the matchday moments (match header, player profile,
champion card, the feature scoreline). Base/V2/V3 untouched; V4 is additive.
Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BracketView` | `BracketViewV4` | ✅ |
| 2 | `FixtureRow` | `FixtureRowV4` | ✅ |
| 3 | `LeagueBadge` | `LeagueBadgeV4` | ✅ |
| 4 | `LineupField` | `LineupFieldV4` | ✅ |
| 5 | `LiveCommentary` | `LiveCommentaryV4` | ✅ |
| 6 | `MatchScore` | `MatchScoreV2` · `MatchScoreV3` · `MatchScoreV4` | ✅ |
| 7 | `MatchTimeline` | `MatchTimelineV4` | ✅ |
| 8 | `PlayerStatCard` | `PlayerStatCardV2` · `PlayerStatCardV3` · `PlayerStatCardV4` | ✅ |
| 9 | `ScoreTicker` | `ScoreTickerV4` | ✅ |
| 10 | `Standings` | `StandingsV2` · `StandingsV3` · `StandingsV4` | ✅ |
| 11 | `StatComparison` | `StatComparisonV4` | ✅ |
| 12 | `TeamCard` | `TeamCardV2` · `TeamCardV3` · `TeamCardV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 13 | `MatchHeader` | 🆕 gradient live-match hero — crests, big score, competition, live clock | ✅ |
| 14 | `PlayerProfileHeader` | 🆕 gradient player hero — jersey number, key stats tiles, follow | ✅ |
| 15 | `ChampionCard` | 🆕 gradient trophy / champion celebration hero (peak-end) | ✅ |
| 16 | `TeamFormGuide` | 🆕 recent results as W/D/L pills | ✅ |
| 17 | `EventFeed` | 🆕 match events — goals / cards / subs with minute + glyph | ✅ |
| 18 | `OddsBar` | 🆕 win / draw / lose odds split, favourite emphasized | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `broadcast` palette helper

### `streaming` — 18 components (12 with a V4 "spotlight" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 12 originals now ship a **V4 "spotlight" design line** — an artwork-forward
language: bold covers on a gradient glow backdrop, large round primary transport
controls, glassy scrubbers, and a full brand gradient reserved for the immersive
moments (full-screen player, album hero). Base/V2/V3 untouched; V4 is additive.
Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AudioPlayer` | `AudioPlayerV4` | ✅ |
| 2 | `CastButton` | `CastButtonV4` | ✅ |
| 3 | `ChannelCard` | `ChannelCardV4` | ✅ |
| 4 | `EpisodeRow` | `EpisodeRowV2` · `EpisodeRowV3` · `EpisodeRowV4` | ✅ |
| 5 | `LiveBadge` | `LiveBadgeV4` | ✅ |
| 6 | `MiniPlayer` | `MiniPlayerV2` · `MiniPlayerV3` · `MiniPlayerV4` | ✅ |
| 7 | `NowPlaying` | `NowPlayingV2` · `NowPlayingV3` · `NowPlayingV4` | ✅ |
| 8 | `PlaylistRow` | `PlaylistRowV4` | ✅ |
| 9 | `PodcastCard` | `PodcastCardV2` · `PodcastCardV3` · `PodcastCardV4` | ✅ |
| 10 | `QueueList` | `QueueListV4` | ✅ |
| 11 | `VideoPlayer` | `VideoPlayerV4` | ✅ |
| 12 | `WaveformScrubber` | `WaveformScrubberV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 13 | `FullScreenPlayer` | 🆕 immersive gradient now-playing hero (the peak moment) | ✅ |
| 14 | `AlbumHeader` | 🆕 gradient album / playlist hero — cover, play + shuffle | ✅ |
| 15 | `LyricsView` | 🆕 scrolling lyrics with the active line highlighted | ✅ |
| 16 | `UpNext` | 🆕 compact "playing next" queue preview | ✅ |
| 17 | `CategoryRail` | 🆕 horizontal browse rail of gradient category tiles | ✅ |
| 18 | `SleepTimer` | 🆕 sleep-timer control (quick presets + end of episode) | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `spotlight` palette helper

*helpers:* `formatCount`, `formatTime`

### `support` — 18 components (12 with a V4 "console" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 12 originals now ship a **V4 "console" design line** — a calm agent-workspace
language: elevated rounded cards, a left status-accent bar, soft-tint status
pills (glyph + color, never color alone), one primary accent, and a brand
gradient reserved for the peak moments (open-ticket header, agent stats, CSAT
results). Base/V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe,
web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AgentStatus` | `AgentStatusV2` · `AgentStatusV3` · `AgentStatusV4` | ✅ |
| 2 | `CannedResponse` | `CannedResponseV4` | ✅ |
| 3 | `ConversationPanel` | `ConversationPanelV2` · `ConversationPanelV3` · `ConversationPanelV4` | ✅ |
| 4 | `EscalationBanner` | `EscalationBannerV4` | ✅ |
| 5 | `KBArticleRow` | `KBArticleRowV4` | ✅ |
| 6 | `MacroList` | `MacroListV4` | ✅ |
| 7 | `QueueStat` | `QueueStatV4` | ✅ |
| 8 | `ResolutionTimer` | `ResolutionTimerV4` | ✅ |
| 9 | `SLABadge` | `SLABadgeV4` | ✅ |
| 10 | `SatisfactionRating` | `SatisfactionRatingV2` · `SatisfactionRatingV3` · `SatisfactionRatingV4` | ✅ |
| 11 | `TicketPriority` | `TicketPriorityV4` | ✅ |
| 12 | `TicketRow` | `TicketRowV2` · `TicketRowV3` · `TicketRowV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 13 | `TicketDetailHeader` | 🆕 gradient open-ticket hero — subject, status/priority/SLA tiles, solve/assign | ✅ |
| 14 | `AgentPerformanceCard` | 🆕 gradient agent-stats hero (solved, CSAT, avg reply) | ✅ |
| 15 | `CSATResultCard` | 🆕 gradient satisfaction results hero — score + positive/neutral/negative | ✅ |
| 16 | `QueueOverview` | 🆕 dashboard strip of queue-stat tiles | ✅ |
| 17 | `MessageBubble` | 🆕 chat message bubble (agent vs customer) | ✅ |
| 18 | `ReplyBox` | 🆕 agent reply composer + quick canned-reply picker | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `console` palette helper

### `survey` — 18 components (12 with a V4 "focus" line; 4 also V2/V3) + 6 new · web + native · last updated **0.9.0** ✅

The 12 originals now ship a **V4 "focus" design line** — a clean-form language:
calm elevated cards, one primary accent, big legible ≥44px controls, a slim
primary focus bar on the question card, and a brand gradient reserved for the
peak/end moments (survey intro, completion, NPS results). Base/V2/V3 untouched;
V4 is additive. Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `LikertScale` | `LikertScaleV2` · `LikertScaleV3` · `LikertScaleV4` | ✅ |
| 2 | `MatrixQuestion` | `MatrixQuestionV4` | ✅ |
| 3 | `MultipleChoice` | `MultipleChoiceV2` · `MultipleChoiceV3` · `MultipleChoiceV4` | ✅ |
| 4 | `NPSScale` | `NPSScaleV2` · `NPSScaleV3` · `NPSScaleV4` | ✅ |
| 5 | `OpenTextResponse` | `OpenTextResponseV4` | ✅ |
| 6 | `PollResultBar` | `PollResultBarV4` | ✅ |
| 7 | `QuestionCard` | `QuestionCardV2` · `QuestionCardV3` · `QuestionCardV4` | ✅ |
| 8 | `RankingQuestion` | `RankingQuestionV4` | ✅ |
| 9 | `RatingScaleInput` | `RatingScaleInputV4` | ✅ |
| 10 | `ResponseSummary` | `ResponseSummaryV4` | ✅ |
| 11 | `SurveyIntro` | `SurveyIntroV4` | ✅ |
| 12 | `SurveyProgress` | `SurveyProgressV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 13 | `SurveyComplete` | 🆕 gradient completion / thank-you hero (peak-end moment) | ✅ |
| 14 | `NPSResultCard` | 🆕 gradient NPS results hero — score + promoter/passive/detractor breakdown | ✅ |
| 15 | `SurveyNavigator` | 🆕 Back / Next / Submit footer with inline progress | ✅ |
| 16 | `SliderScale` | 🆕 draggable 0–N slider question, big value numeral | ✅ |
| 17 | `EmojiScale` | 🆕 emoji-face satisfaction picker (😡→😍) | ✅ |
| 18 | `YesNoToggle` | 🆕 big binary segmented control | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `focus` palette helper

*helpers:* `npsBucket`

### `travel` — 16 components (13 with a V4 "journey" line; 4 also V2/V3) + 3 new · web + native · last updated **0.9.0** ✅

The 13 originals now ship a **V4 "journey" design line** — a boarding-pass
language: elevated clean cards with a small brand-gradient glyph disc, the
origin→destination route drawn as a rail with a plane glyph, dashed
boarding-pass tear lines, and gradient heroes on the peak moments (boarding
pass, trip summary, destination covers). Money stays integer cents. Base/V2/V3
untouched; V4 is additive. Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AmenityRow` | `AmenityRowV4` | ✅ |
| 2 | `BaggageRow` | `BaggageRowV4` | ✅ |
| 3 | `BoardingPass` | `BoardingPassV4` | ✅ |
| 4 | `DestinationCard` | `DestinationCardV2` · `DestinationCardV3` · `DestinationCardV4` | ✅ |
| 5 | `FlightCard` | `FlightCardV2` · `FlightCardV3` · `FlightCardV4` | ✅ |
| 6 | `HotelCard` | `HotelCardV2` · `HotelCardV3` · `HotelCardV4` | ✅ |
| 7 | `ItineraryItem` | `ItineraryItemV2` · `ItineraryItemV3` · `ItineraryItemV4` | ✅ |
| 8 | `MapCard` | `MapCardV4` | ✅ |
| 9 | `PriceCalendar` | `PriceCalendarV4` | ✅ |
| 10 | `ReviewStars` | `ReviewStarsV4` | ✅ |
| 11 | `SeatPicker` | `SeatPickerV4` | ✅ |
| 12 | `TripSummary` | `TripSummaryV4` | ✅ |
| 13 | `WeatherStrip` | `WeatherStripV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 14 | `TripHeader` | 🆕 gradient journey hero — origin→destination rail, dates, travelers, manage CTA | ✅ |
| 15 | `FlightStatusBanner` | 🆕 status strip — on-time/boarding/delayed/cancelled/landed, gate/seat/boarding | ✅ |
| 16 | `LoyaltyCard` | 🆕 gradient miles/points card — tier, balance, progress to next tier | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `journey` palette helper

### `utilities` — 20 components (12 with a V4 line; 4 also V2/V3) + 8 new · web + native · last updated **0.9.0** ✅

The original 12 now ship a **V4 design line** matching the new blocks — a
restrained, trust-first style: elevated clean cards with a small gradient glyph
disc, semantic status colors carrying the weight (paid → success, overdue/outage
→ danger). Gradient grounds are used only on the account header and the payment
confirmation. Money stays integer cents. Base/V2/V3 untouched; V4 is additive.
Token-driven, dark-mode safe, web + native.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AutoPayRow` | `AutoPayRowV4` | ✅ |
| 2 | `BillCard` | `BillCardV2` · `BillCardV3` · `BillCardV4` | ✅ |
| 3 | `BudgetBillRow` | `BudgetBillRowV4` | ✅ |
| 4 | `ConsumptionChart` | `ConsumptionChartV4` | ✅ |
| 5 | `EnergyTip` | `EnergyTipV4` | ✅ |
| 6 | `MeterReading` | `MeterReadingV4` | ✅ |
| 7 | `OutageAlert` | `OutageAlertV4` | ✅ |
| 8 | `PaymentRow` | `PaymentRowV2` · `PaymentRowV3` · `PaymentRowV4` | ✅ |
| 9 | `RatePlanCard` | `RatePlanCardV4` | ✅ |
| 10 | `ServiceRequestRow` | `ServiceRequestRowV4` | ✅ |
| 11 | `ServiceStatus` | `ServiceStatusV2` · `ServiceStatusV3` · `ServiceStatusV4` | ✅ |
| 12 | `UsageMeter` | `UsageMeterV2` · `UsageMeterV3` · `UsageMeterV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 13 | `AccountHeader` | 🆕 gradient balance hero — balance, due, AutoPay, Pay CTA | ✅ |
| 14 | `PaymentMethodCard` | 🆕 saved card / bank / wallet, default + selection | ✅ |
| 15 | `PaymentConfirmation` | 🆕 gradient payment-success surface (peak moment) | ✅ |
| 16 | `UsageComparison` | 🆕 this period vs last, ⬆/⬇ delta | ✅ |
| 17 | `CostBreakdown` | 🆕 stacked cost bar + legend (by tier/category) | ✅ |
| 18 | `OutageTracker` | 🆕 outage progress timeline with ETA | ✅ |
| 19 | `StatementRow` | 🆕 monthly statement row + download | ✅ |
| 20 | `TimeOfUseSchedule` | 🆕 24h peak / off-peak rate bar | ✅ |

*helpers:* `BILL_STATUS`, `OUTAGE_STATE`, `PAYMENT_STATE`, `REQUEST_STATE`, `SERVICE_STATE`, `UTILITY_KIND`, `formatMoney`, `formatPct`, `formatUsage`
*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `brand` palette helper

### `weather` — 15 components (12 with a V4 "sky" line; 4 also V2/V3) + 3 new · web + native · last updated **0.9.0** ✅

Every component now ships a **V4 "sky" design line** (light sky-blue gradients,
big numerals, soft tiles) matching the modern weather-app mockup, on **both web
and native**. The base/V2/V3 lines are untouched — V4 is additive and selectable
via the design-line switcher. All V4 pieces are token-driven and dark-mode safe.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AirQualityCard` | `AirQualityCardV2` · `AirQualityCardV3` · `AirQualityCardV4` | ✅ |
| 2 | `CurrentWeather` | `CurrentWeatherV2` · `CurrentWeatherV3` · `CurrentWeatherV4` | ✅ |
| 3 | `ForecastStrip` | `ForecastStripV2` · `ForecastStripV3` · `ForecastStripV4` | ✅ |
| 4 | `HourlyRow` | `HourlyRowV2` · `HourlyRowV3` · `HourlyRowV4` | ✅ |
| 5 | `PrecipBar` | `PrecipBarV4` | ✅ |
| 6 | `RadarCard` | `RadarCardV4` *(gradient radar scope)* | ✅ |
| 7 | `SunriseSunset` | `SunriseSunsetV4` | ✅ |
| 8 | `TemperatureGraph` | `TemperatureGraphV4` | ✅ |
| 9 | `UVIndexCard` | `UVIndexCardV4` | ✅ |
| 10 | `WeatherAlert` | `WeatherAlertV4` *(filled tone banner)* | ✅ |
| 11 | `WeatherStat` | `WeatherStatV4` *(gradient glyph badge)* | ✅ |
| 12 | `WindCompass` | `WindCompassV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 13 | `LocationHeader` | 🆕 gradient header — location, date, menu button | ✅ |
| 14 | `DaySegment` | 🆕 Today / Tomorrow / Next 7 days tab selector | ✅ |
| 15 | `WeatherDetailGrid` | 🆕 details grouped into cards (3 metrics per card) | ✅ |

*helpers:* `conditionGlyph`, `conditionLabel`
*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `v4-sky` palette

### `wellness` — 24 components (12 with a V4 "calm" line; 4 also V2/V3) + 12 new · web + native · last updated **0.9.0** ✅

The original 12 now ship a **V4 "calm" design line** (gradient + glassmorphic, a
violet-friendly palette) matching the new blocks, on **both web and native**.
Gradient/glass are used with restraint — on heroes, the player and the
celebration — while browse tiles get soft per-category tints and lists/inputs
stay clean. The base/V2/V3 lines are untouched; V4 is additive. Token-driven and
dark-mode safe.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BreathingGuide` | `BreathingGuideV4` *(gradient breathing circle)* | ✅ |
| 2 | `DailyQuoteCard` | `DailyQuoteCardV4` *(gradient quote hero)* | ✅ |
| 3 | `GratitudeEntry` | `GratitudeEntryV4` | ✅ |
| 4 | `JournalPrompt` | `JournalPromptV4` | ✅ |
| 5 | `MeditationSessionCard` | `MeditationSessionCardV2` · `MeditationSessionCardV3` · `MeditationSessionCardV4` | ✅ |
| 6 | `MindfulnessStreak` | `MindfulnessStreakV2` · `MindfulnessStreakV3` · `MindfulnessStreakV4` *(gradient streak hero)* | ✅ |
| 7 | `MoodCheckIn` | `MoodCheckInV2` · `MoodCheckInV3` · `MoodCheckInV4` | ✅ |
| 8 | `ProgressCalendar` | `ProgressCalendarV4` *(calm heatmap)* | ✅ |
| 9 | `SessionTimer` | `SessionTimerV4` | ✅ |
| 10 | `SleepStoryCard` | `SleepStoryCardV2` · `SleepStoryCardV3` · `SleepStoryCardV4` | ✅ |
| 11 | `SoundscapeRow` | `SoundscapeRowV4` | ✅ |
| 12 | `WellnessGoalRing` | `WellnessGoalRingV4` | ✅ |

**Newly added components (web + native):**

| # | component | notes | done |
|--:|---|---|:--:|
| 13 | `WellnessHeader` | 🆕 gradient home header — greeting + frosted stat chips | ✅ |
| 14 | `FeaturedSessionHero` | 🆕 the gradient "daily" centerpiece with a glass play button | ✅ |
| 15 | `AudioPlayer` | 🆕 glass audio transport (`variant`: `bar` \| `full`) | ✅ |
| 16 | `CategoryGrid` / `CategoryTile` | 🆕 color-coded browse tiles | ✅ |
| 17 | `CourseCard` | 🆕 multi-day program card (Day X of Y) | ✅ |
| 18 | `MoodTrend` | 🆕 weekly mood bars | ✅ |
| 19 | `StatsSummary` | 🆕 minutes / sessions / streak overview | ✅ |
| 20 | `SessionCompleteCard` | 🆕 celebratory "dawn" gradient completion (peak moment) | ✅ |
| 21 | `ReminderCard` | 🆕 daily reminder + toggle | ✅ |
| 22 | `TeacherCard` | 🆕 instructor card | ✅ |
| 23 | `AchievementBadge` | 🆕 earned/locked gradient medallion | ✅ |
| 24 | `GoalPicker` | 🆕 intention selector | ✅ |

*internal (native):* `GradientSurface` (optional `expo-linear-gradient`, solid fallback), `calm` palette helper
