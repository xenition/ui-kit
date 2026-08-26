# @xenition/ui — every component, module by module

**Version 0.9.0** · 53 modules · **765 components** · **378 V2/V3 variants** · 115 helpers.
Generated 2026-08-26 from `src/native/*/index.ts`. Every module ships a **native**
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
| ✅ **0.9.0** | on the current design pattern — `onboarding` is the reference |
| ⚠️ **0.8.0** | V2/V3 composition fixed, but predates the 0.9.0 shell |
| ❌ **0.7.0** | last touched at the V2/V3 rollout — **needs the pattern applied** |

**42 of 53 modules are on ❌.** They have their alternate designs but not the shell, spacing or
control-height rules from 0.9.0, so a vertical screen next to an onboarding screen does not yet read
as the same app. The pattern to apply is in `ONBOARDING-DESIGN-SPEC.md`; the worked example is the
`onboarding` module.

Suggested order: **`layout` → `dashboard` → `charts`** first (every vertical composes them, so
fixing them lifts everything), then the verticals you actually ship.

---

### `primitives` — 109 components · last updated **0.9.0** ✅

**Progress: 90 / 109 upgraded.** ✅ = has a V4 on the current design pattern. ⬜ = still on the old design.

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `Accordion` | `AccordionV4` | ✅ |
| 2 | `ActionSheet` | `V4` | ✅ |
| 3 | `Alert` | `V4` | ✅ |
| 4 | `AppShell` | `AppShellV4` | ✅ |
| 5 | `AuthBrandTile` | — | ⬜ |
| 6 | `AuthCard` | — | ⬜ |
| 7 | `AuthDivider` | — | ⬜ |
| 8 | `AuthField` | — | ⬜ |
| 9 | `AuthHeading` | — | ⬜ |
| 10 | `AuthProviderButton` | — | ⬜ |
| 11 | `AuthStickyFooter` | — | ⬜ |
| 12 | `AuthSubmitButton` | — | ⬜ |
| 13 | `AuthSwitchFooter` | — | ⬜ |
| 14 | `AuthTermsCard` | — | ⬜ |
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
| 45 | `ForgotPasswordForm` | — | ⬜ |
| 46 | `Form` | `FormV4` | ✅ |
| 47 | `GlassPanel` | — | ✅ |
| 48 | `GradientText` | — | ✅ |
| 49 | `Icon` | — | ⬜ |
| 50 | `Input` | `InputV4` | ✅ |
| 51 | `JsonViewer` | `JsonViewerV4` | ✅ |
| 52 | `Kanban` | `KanbanV4` | ✅ |
| 53 | `Label` | `LabelV4` | ✅ |
| 54 | `List` | `ListV4` | ✅ |
| 55 | `LoadingOverlay` | `V4` | ✅ |
| 56 | `LoginForm` | — | ⬜ |
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
| 79 | `SignupForm` | — | ⬜ |
| 80 | `Skeleton` | `V4` | ✅ |
| 81 | `Slider` | `SliderV4` | ✅ |
| 82 | `Spinner` | `V4` | ✅ |
| 83 | `SplitButton` | `SplitButtonV4` | ✅ |
| 84 | `Stack` | `StackV4` (alias) | ✅ |
| 85 | `Statistic` | `StatisticV4` | ✅ |
| 86 | `StatusDot` | `V4` | ✅ |
| 87 | `StatusMessage` | `V4` | ✅ |
| 88 | `StepList` | — | ⬜ |
| 89 | `Steps` | `StepsV4` | ✅ |
| 90 | `Switch` | `SwitchV4` | ✅ |
| 91 | `Table` | `TableV4` | ✅ |
| 92 | `Tabs` | `TabsV4` | ✅ |
| 93 | `Tag` | `TagV4` | ✅ |
| 94 | `TagInput` | `TagInputV4` | ✅ |
| 95 | `Text` | — | ⬜ |
| 96 | `Textarea` | `TextareaV4` | ✅ |
| 97 | `TimePicker` | `TimePickerV4` | ✅ |
| 98 | `Timeline` | `TimelineV4` | ✅ |
| 99 | `ToastProvider` | — | ⬜ |
| 100 | `ToggleGroup` | `ToggleGroupV4` | ✅ |
| 101 | `Toolbar` | `ToolbarV4` | ✅ |
| 102 | `Tooltip` | `TooltipV4` | ✅ |
| 103 | `Tree` | `TreeV4` | ✅ |
| 104 | `Upload` | `UploadV4` | ✅ |
| 105 | `VirtualList` | `VirtualListV4` | ✅ |
| 106 | `Watermark` | `WatermarkV4` | ✅ |
| 107 | `Wordmark` | `WordmarkV4` | ✅ |
| 108 | `XenitionNativeThemeProvider` | — | ⬜ |
| 109 | `XenitionUIProvider` | — | ⬜ |

*helpers:* `AUTH_CONTROL_HEIGHT`, `AUTH_DEFAULT_TERMS_LINKS`, `AUTH_TAP_TARGET`, `ICON_GLYPHS`, `formatMoney`, `isIconName`, `resolveIconGlyph`, `useForm`, `useReducedMotion`, `useToast`, `useXenitionTheme`

### `layout` — 16 components · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AspectRatio` | — | ⬜ |
| 2 | `Bleed` | — | ⬜ |
| 3 | `Center` | — | ⬜ |
| 4 | `Column` | — | ⬜ |
| 5 | `Container` | — | ⬜ |
| 6 | `Divider` | — | ⬜ |
| 7 | `Flex` | — | ⬜ |
| 8 | `Grid` | — | ⬜ |
| 9 | `Inset` | — | ⬜ |
| 10 | `KeyboardAvoider` | — | ⬜ |
| 11 | `ListSeparator` | — | ⬜ |
| 12 | `PageHeader` | — | ⬜ |
| 13 | `Row` | — | ⬜ |
| 14 | `ScrollArea` | — | ⬜ |
| 15 | `Section` | — | ⬜ |
| 16 | `Spacer` | — | ⬜ |

### `dashboard` — 16 components · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `ActivityFeed` | — | ⬜ |
| 2 | `EmptyDashboard` | — | ⬜ |
| 3 | `FilterChips` | — | ⬜ |
| 4 | `KpiRow` | — | ⬜ |
| 5 | `ListRow` | — | ⬜ |
| 6 | `MetricTile` | — | ⬜ |
| 7 | `NotificationItem` | — | ⬜ |
| 8 | `OnboardingChecklist` | — | ⬜ |
| 9 | `PageContainer` | — | ⬜ |
| 10 | `ProfileHeader` | — | ⬜ |
| 11 | `QuickActions` | — | ⬜ |
| 12 | `SearchHeader` | — | ⬜ |
| 13 | `SectionCard` | — | ⬜ |
| 14 | `SettingsRow` | — | ⬜ |
| 15 | `SettingsSection` | — | ⬜ |
| 16 | `StatCard` | — | ⬜ |

### `charts` — 20 components · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AreaChart` | — | ⬜ |
| 2 | `BarChart` | — | ⬜ |
| 3 | `ColumnChart` | — | ⬜ |
| 4 | `ComparisonBars` | — | ⬜ |
| 5 | `DonutChart` | — | ⬜ |
| 6 | `GaugeChart` | — | ⬜ |
| 7 | `Heatmap` | — | ⬜ |
| 8 | `Histogram` | — | ⬜ |
| 9 | `Legend` | — | ⬜ |
| 10 | `LineChart` | — | ⬜ |
| 11 | `MiniBar` | — | ⬜ |
| 12 | `PieChart` | — | ⬜ |
| 13 | `ProgressBars` | — | ⬜ |
| 14 | `ProgressRing` | — | ⬜ |
| 15 | `RadarChart` | — | ⬜ |
| 16 | `RangeBar` | — | ⬜ |
| 17 | `ScatterChart` | — | ⬜ |
| 18 | `Sparkline` | — | ⬜ |
| 19 | `StackedBar` | — | ⬜ |
| 20 | `TrendCard` | — | ⬜ |

### `motion` — 4 components · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AnimatedCounter` | — | ⬜ |
| 2 | `Marquee` | — | ⬜ |
| 3 | `Reveal` | — | ⬜ |
| 4 | `Stagger` | — | ⬜ |

*helpers:* `useReducedMotion`

### `onboarding` — 14 components, 9 with variants · last updated **0.9.0** ✅

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `FeatureLockCard` | — | ⬜ |
| 2 | `GetStartedButton` | — | ⬜ |
| 3 | `InterestPicker` | `InterestPickerV2` · `InterestPickerV3` | ⬜ |
| 4 | `OnboardingSlides` | `OnboardingSlidesV2` · `OnboardingSlidesV3` | ⬜ |
| 5 | `OtpVerify` | `OtpVerifyV2` · `OtpVerifyV3` | ⬜ |
| 6 | `PaywallFeatureRows` | — | ⬜ |
| 7 | `PaywallScreen` | `PaywallScreenV2` · `PaywallScreenV3` | ⬜ |
| 8 | `PermissionPrompt` | `PermissionPromptV2` · `PermissionPromptV3` | ⬜ |
| 9 | `PlanSelector` | `PlanSelectorV2` · `PlanSelectorV3` | ⬜ |
| 10 | `ProfileSetup` | `ProfileSetupV2` · `ProfileSetupV3` | ⬜ |
| 11 | `ProgressDots` | — | ⬜ |
| 12 | `SignInScreen` | `SignInScreenV2` · `SignInScreenV3` | ⬜ |
| 13 | `TrialBanner` | — | ⬜ |
| 14 | `WelcomeScreen` | `WelcomeScreenV2` · `WelcomeScreenV3` | ⬜ |

### `commerce` — 11 components, 5 with variants · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CartLineItem` | `CartLineItemV2` · `CartLineItemV3` | ⬜ |
| 2 | `CartSummary` | `CartSummaryV2` · `CartSummaryV3` | ⬜ |
| 3 | `CheckoutSummary` | `CheckoutSummaryV2` · `CheckoutSummaryV3` | ⬜ |
| 4 | `EmptyState` | — | ⬜ |
| 5 | `GenerativeCover` | — | ⬜ |
| 6 | `OrderSummary` | `OrderSummaryV2` · `OrderSummaryV3` | ⬜ |
| 7 | `PriceTag` | — | ⬜ |
| 8 | `ProductCard` | `ProductCardV2` · `ProductCardV3` | ⬜ |
| 9 | `ProductGrid` | — | ⬜ |
| 10 | `QuantityStepper` | — | ⬜ |
| 11 | `StatusBadge` | — | ⬜ |

*helpers:* `formatMoney`

### `booking` — 3 components, 3 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BookingCalendar` | `BookingCalendarV2` · `BookingCalendarV3` | ⬜ |
| 2 | `BookingSummary` | `BookingSummaryV2` · `BookingSummaryV3` | ⬜ |
| 3 | `SlotPicker` | `SlotPickerV2` · `SlotPickerV3` | ⬜ |

*helpers:* `addDays`, `dayKeyInTz`, `formatTimeInTz`, `monthMatrix`, `startOfMonth`, `toDayKey`, `weekRow`

### `media` — 3 components · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `Gallery` | — | ⬜ |
| 2 | `Lightbox` | — | ⬜ |
| 3 | `MediaFigure` | — | ⬜ |

### `agriculture` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CropCard` | `CropCardV2` · `CropCardV3` | ⬜ |
| 2 | `EquipmentStatus` | — | ⬜ |
| 3 | `FarmTaskRow` | — | ⬜ |
| 4 | `FieldCard` | `FieldCardV2` · `FieldCardV3` | ⬜ |
| 5 | `HarvestLog` | `HarvestLogV2` · `HarvestLogV3` | ⬜ |
| 6 | `IrrigationSchedule` | — | ⬜ |
| 7 | `LivestockRow` | — | ⬜ |
| 8 | `MarketPriceRow` | — | ⬜ |
| 9 | `PestAlert` | — | ⬜ |
| 10 | `SoilMoistureCard` | — | ⬜ |
| 11 | `WeatherAdvisory` | `WeatherAdvisoryV2` · `WeatherAdvisoryV3` | ⬜ |
| 12 | `YieldChart` | — | ⬜ |

### `automotive` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `DriverCard` | `DriverCardV2` · `DriverCardV3` | ⬜ |
| 2 | `DriverRatingRow` | — | ⬜ |
| 3 | `FareEstimate` | — | ⬜ |
| 4 | `FuelChargeGauge` | — | ⬜ |
| 5 | `ParkingSpot` | — | ⬜ |
| 6 | `RideRequestCard` | `RideRequestCardV2` · `RideRequestCardV3` | ⬜ |
| 7 | `RideStatusBar` | `RideStatusBarV2` · `RideStatusBarV3` | ⬜ |
| 8 | `ServiceReminder` | — | ⬜ |
| 9 | `TripHistoryEmpty` | — | ⬜ |
| 10 | `TripHistoryRow` | — | ⬜ |
| 11 | `TripRoute` | — | ⬜ |
| 12 | `VehicleCard` | `VehicleCardV2` · `VehicleCardV3` | ⬜ |
| 13 | `VehicleHealthRow` | — | ⬜ |

### `beauty` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AppointmentSlot` | — | ⬜ |
| 2 | `BeforeAfter` | — | ⬜ |
| 3 | `GiftCardRow` | — | ⬜ |
| 4 | `LookbookGrid` | — | ⬜ |
| 5 | `LoyaltyCard` | `LoyaltyCardV2` · `LoyaltyCardV3` | ⬜ |
| 6 | `PriceListRow` | — | ⬜ |
| 7 | `ProductRecommendation` | — | ⬜ |
| 8 | `ReviewCard` | — | ⬜ |
| 9 | `SalonBookingBar` | — | ⬜ |
| 10 | `ServiceMenuItem` | `ServiceMenuItemV2` · `ServiceMenuItemV3` | ⬜ |
| 11 | `StylistCard` | `StylistCardV2` · `StylistCardV3` | ⬜ |
| 12 | `TreatmentCard` | `TreatmentCardV2` · `TreatmentCardV3` | ⬜ |

*helpers:* `formatMoney`

### `calendar` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AllDayRow` | — | ⬜ |
| 2 | `AvailabilityPicker` | `AvailabilityPickerV2` · `AvailabilityPickerV3` | ⬜ |
| 3 | `DateNavigator` | — | ⬜ |
| 4 | `DayAgenda` | `DayAgendaV2` · `DayAgendaV3` | ⬜ |
| 5 | `EventBlock` | `EventBlockV2` · `EventBlockV3` | ⬜ |
| 6 | `EventDetailSheet` | — | ⬜ |
| 7 | `MiniCalendar` | — | ⬜ |
| 8 | `MonthView` | `MonthViewV2` · `MonthViewV3` | ⬜ |
| 9 | `RecurrenceRow` | — | ⬜ |
| 10 | `TimeGrid` | — | ⬜ |
| 11 | `TimezoneRow` | — | ⬜ |
| 12 | `WeekView` | — | ⬜ |

*helpers:* `MONTHS_LONG`, `MONTHS_SHORT`, `WEEKDAYS_NARROW`, `WEEKDAYS_SHORT`, `addDays`, `addMonths`, `clockLabel`, `hourLabel`, `minutesSinceMidnight`, `monthGrid`, `monthLabel`, `monthLongLabel`, `resolveTone`, `sameDay`, `sameMonth`, `startOfWeek`, `timeRangeLabel`, `weekDates`, `weekdayHeader`, `weekdayLabel`, `withAlpha`

### `chat` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AttachmentBar` | — | ⬜ |
| 2 | `ChatHeader` | `ChatHeaderV2` · `ChatHeaderV3` | ⬜ |
| 3 | `ConversationList` | — | ⬜ |
| 4 | `ConversationRow` | `ConversationRowV2` · `ConversationRowV3` | ⬜ |
| 5 | `DateSeparator` | — | ⬜ |
| 6 | `MessageComposer` | `MessageComposerV2` · `MessageComposerV3` | ⬜ |
| 7 | `MessageGroup` | `MessageGroupV2` · `MessageGroupV3` | ⬜ |
| 8 | `PresenceDot` | — | ⬜ |
| 9 | `QuickReplies` | — | ⬜ |
| 10 | `ReadReceipt` | — | ⬜ |
| 11 | `TypingIndicator` | — | ⬜ |
| 12 | `UnreadDivider` | — | ⬜ |
| 13 | `VoiceNoteBubble` | — | ⬜ |

### `content` — 13 components, 4 with variants · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `ArticleCard` | `ArticleCardV2` · `ArticleCardV3` | ⬜ |
| 2 | `ArticleHeader` | `ArticleHeaderV2` · `ArticleHeaderV3` | ⬜ |
| 3 | `AuthorByline` | `AuthorBylineV2` · `AuthorBylineV3` | ⬜ |
| 4 | `BookmarkButton` | — | ⬜ |
| 5 | `CategoryChip` | — | ⬜ |
| 6 | `NewsTicker` | — | ⬜ |
| 7 | `PodcastRow` | `PodcastRowV2` · `PodcastRowV3` | ⬜ |
| 8 | `PullQuote` | — | ⬜ |
| 9 | `ReadingProgress` | — | ⬜ |
| 10 | `RelatedArticles` | — | ⬜ |
| 11 | `ShareRow` | — | ⬜ |
| 12 | `TableOfContents` | — | ⬜ |
| 13 | `TagList` | — | ⬜ |

*helpers:* `DEFAULT_SHARE_TARGETS`

### `crm` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `ActivityLogRow` | — | ⬜ |
| 2 | `ContactCard` | `ContactCardV2` · `ContactCardV3` | ⬜ |
| 3 | `ContactTimeline` | — | ⬜ |
| 4 | `DealCard` | `DealCardV2` · `DealCardV3` | ⬜ |
| 5 | `DealForecast` | — | ⬜ |
| 6 | `EmailThreadRow` | — | ⬜ |
| 7 | `LeadRow` | `LeadRowV2` · `LeadRowV3` | ⬜ |
| 8 | `NextStepRow` | — | ⬜ |
| 9 | `PipelineBoard` | `PipelineBoardV2` · `PipelineBoardV3` | ⬜ |
| 10 | `QuoteCard` | — | ⬜ |
| 11 | `TagFilterBar` | — | ⬜ |
| 12 | `WinLossBadge` | — | ⬜ |

*helpers:* `ACTIVITY_META`, `OUTCOME_META`, `QUOTE_META`, `TEMPERATURE_META`, `clampPct`, `toneColor`

### `crypto` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `GasFeeRow` | — | ⬜ |
| 2 | `NFTCard` | `NFTCardV2` · `NFTCardV3` | ⬜ |
| 3 | `NetworkBadge` | — | ⬜ |
| 4 | `PortfolioSummary` | `PortfolioSummaryV2` · `PortfolioSummaryV3` | ⬜ |
| 5 | `PriceAlertRow` | — | ⬜ |
| 6 | `PriceTicker` | — | ⬜ |
| 7 | `SeedPhraseGrid` | — | ⬜ |
| 8 | `StakingCard` | — | ⬜ |
| 9 | `SwapForm` | — | ⬜ |
| 10 | `TokenRow` | `TokenRowV2` · `TokenRowV3` | ⬜ |
| 11 | `TxList` | — | ⬜ |
| 12 | `TxRow` | — | ⬜ |
| 13 | `WalletCard` | `WalletCardV2` · `WalletCardV3` | ⬜ |

*helpers:* `changeGlyph`, `changeToneKey`, `formatPct`, `formatPrice`, `formatToken`, `truncateHash`

### `dating` — 12 components, 4 with variants · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BoostBanner` | — | ⬜ |
| 2 | `CompatibilityMeter` | `CompatibilityMeterV2` · `CompatibilityMeterV3` | ⬜ |
| 3 | `DistanceBadge` | — | ⬜ |
| 4 | `IcebreakerChip` | — | ⬜ |
| 5 | `LikePassButtons` | — | ⬜ |
| 6 | `MatchCelebration` | `MatchCelebrationV2` · `MatchCelebrationV3` | ⬜ |
| 7 | `PhotoCarousel` | — | ⬜ |
| 8 | `ProfileCard` | `ProfileCardV2` · `ProfileCardV3` | ⬜ |
| 9 | `ProfilePrompt` | — | ⬜ |
| 10 | `SwipeCard` | `SwipeCardV2` · `SwipeCardV3` | ⬜ |
| 11 | `SwipeDeck` | — | ⬜ |
| 12 | `WhoLikedYouRow` | — | ⬜ |

### `email` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AttachmentChip` | — | ⬜ |
| 2 | `ComposeBar` | `ComposeBarV2` · `ComposeBarV3` | ⬜ |
| 3 | `EmailThread` | `EmailThreadV2` · `EmailThreadV3` | ⬜ |
| 4 | `FolderRow` | `FolderRowV2` · `FolderRowV3` | ⬜ |
| 5 | `InboxHeader` | — | ⬜ |
| 6 | `MailLabelChip` | — | ⬜ |
| 7 | `MailSwipeActions` | — | ⬜ |
| 8 | `MessageListRow` | `MessageListRowV2` · `MessageListRowV3` | ⬜ |
| 9 | `ReadUnreadToggle` | — | ⬜ |
| 10 | `SignatureBlock` | — | ⬜ |
| 11 | `SnoozeRow` | — | ⬜ |
| 12 | `StarButton` | — | ⬜ |

### `events` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AgendaList` | — | ⬜ |
| 2 | `CalendarStrip` | — | ⬜ |
| 3 | `CheckInRow` | — | ⬜ |
| 4 | `CountdownBadge` | — | ⬜ |
| 5 | `EventCard` | `EventCardV2` · `EventCardV3` | ⬜ |
| 6 | `RSVPButton` | — | ⬜ |
| 7 | `ScheduleRow` | — | ⬜ |
| 8 | `SessionCard` | `SessionCardV2` · `SessionCardV3` | ⬜ |
| 9 | `SpeakerCard` | `SpeakerCardV2` · `SpeakerCardV3` | ⬜ |
| 10 | `TicketStub` | `TicketStubV2` · `TicketStubV3` | ⬜ |
| 11 | `TicketTypeRow` | — | ⬜ |
| 12 | `VenueCard` | — | ⬜ |

*helpers:* `MONTHS_SHORT`, `WEEKDAYS_SHORT`, `countdownParts`, `monthLabel`, `sameDay`, `weekdayLabel`

### `fieldservice` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `DispatchBar` | — | ⬜ |
| 2 | `EquipmentRow` | — | ⬜ |
| 3 | `InspectionRow` | `InspectionRowV2` · `InspectionRowV3` | ⬜ |
| 4 | `JobSiteCard` | `JobSiteCardV2` · `JobSiteCardV3` | ⬜ |
| 5 | `MaterialsRow` | — | ⬜ |
| 6 | `PunchListItem` | — | ⬜ |
| 7 | `SafetyChecklist` | — | ⬜ |
| 8 | `ServiceChecklist` | — | ⬜ |
| 9 | `SignaturePad` | — | ⬜ |
| 10 | `TechnicianCard` | `TechnicianCardV2` · `TechnicianCardV3` | ⬜ |
| 11 | `TimeLogRow` | — | ⬜ |
| 12 | `WorkOrderCard` | `WorkOrderCardV2` · `WorkOrderCardV3` | ⬜ |

*helpers:* `formatDuration`, `formatMoney`, `formatPct`

### `finance` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AccountCard` | `AccountCardV2` · `AccountCardV3` | ⬜ |
| 2 | `BalanceHeader` | `BalanceHeaderV2` · `BalanceHeaderV3` | ⬜ |
| 3 | `BudgetBar` | — | ⬜ |
| 4 | `CreditCardView` | — | ⬜ |
| 5 | `ExchangeRateRow` | — | ⬜ |
| 6 | `InvoiceLine` | — | ⬜ |
| 7 | `MoneyAmount` | — | ⬜ |
| 8 | `PaymentMethodRow` | — | ⬜ |
| 9 | `SavingsGoalCard` | `SavingsGoalCardV2` · `SavingsGoalCardV3` | ⬜ |
| 10 | `SpendCategoryRow` | — | ⬜ |
| 11 | `StatementList` | — | ⬜ |
| 12 | `TransactionRow` | `TransactionRowV2` · `TransactionRowV3` | ⬜ |
| 13 | `TransferForm` | — | ⬜ |

*helpers:* `formatMoney`, `maskAccountNumber`, `maskCardNumber`

### `food` — 13 components, 4 with variants · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CartBar` | `CartBarV2` · `CartBarV3` | ⬜ |
| 2 | `CuisineChip` | — | ⬜ |
| 3 | `DeliveryEstimate` | — | ⬜ |
| 4 | `DishCard` | `DishCardV2` · `DishCardV3` | ⬜ |
| 5 | `MenuSection` | `MenuSectionV2` · `MenuSectionV3` | ⬜ |
| 6 | `ModifierList` | — | ⬜ |
| 7 | `NutritionBadge` | — | ⬜ |
| 8 | `OrderStatusTracker` | — | ⬜ |
| 9 | `RatingSummary` | — | ⬜ |
| 10 | `ReorderRow` | — | ⬜ |
| 11 | `RestaurantCard` | `RestaurantCardV2` · `RestaurantCardV3` | ⬜ |
| 12 | `TableReservationRow` | — | ⬜ |
| 13 | `TipSelector` | — | ⬜ |

### `gaming` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AchievementUnlock` | — | ⬜ |
| 2 | `ControllerHint` | — | ⬜ |
| 3 | `GameCard` | `GameCardV2` · `GameCardV3` | ⬜ |
| 4 | `InventoryItem` | — | ⬜ |
| 5 | `LeaderboardPodium` | `LeaderboardPodiumV2` · `LeaderboardPodiumV3` | ⬜ |
| 6 | `LevelBar` | — | ⬜ |
| 7 | `LobbyRow` | — | ⬜ |
| 8 | `MatchmakingStatus` | — | ⬜ |
| 9 | `PlayerStatCard` | `PlayerStatCardV2` · `PlayerStatCardV3` | ⬜ |
| 10 | `QuestCard` | `QuestCardV2` · `QuestCardV3` | ⬜ |
| 11 | `ScoreBoard` | — | ⬜ |
| 12 | `TournamentBracket` | — | ⬜ |

*helpers:* `clamp`, `formatCount`, `formatElapsed`, `rarityColorKey`, `rarityRank`, `withAlpha`

### `government` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BenefitCard` | — | ⬜ |
| 2 | `CivicAlert` | — | ⬜ |
| 3 | `CivicAppointment` | `CivicAppointmentV2` · `CivicAppointmentV3` | ⬜ |
| 4 | `ComplaintRow` | — | ⬜ |
| 5 | `DocumentRequest` | — | ⬜ |
| 6 | `FormStatusRow` | — | ⬜ |
| 7 | `PermitStatus` | `PermitStatusV2` · `PermitStatusV3` | ⬜ |
| 8 | `PublicNoticeCard` | — | ⬜ |
| 9 | `RepresentativeCard` | `RepresentativeCardV2` · `RepresentativeCardV3` | ⬜ |
| 10 | `ServiceCard` | `ServiceCardV2` · `ServiceCardV3` | ⬜ |
| 11 | `TaxSummaryCard` | — | ⬜ |
| 12 | `VotingInfoCard` | — | ⬜ |

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

### `marketing` — 37 components · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AnnouncementBar` | — | ⬜ |
| 2 | `AuroraBackground` | — | ⬜ |
| 3 | `BentoCard` | — | ⬜ |
| 4 | `BentoGrid` | — | ⬜ |
| 5 | `CTABanner` | — | ⬜ |
| 6 | `Carousel` | — | ⬜ |
| 7 | `ComparisonTable` | — | ⬜ |
| 8 | `Countdown` | — | ⬜ |
| 9 | `CoverGallery` | — | ⬜ |
| 10 | `EditorialGrid` | — | ⬜ |
| 11 | `EditorialItem` | — | ⬜ |
| 12 | `EntityCard` | — | ⬜ |
| 13 | `FeatureGrid` | — | ⬜ |
| 14 | `FeatureSplit` | — | ⬜ |
| 15 | `Footer` | — | ⬜ |
| 16 | `GenerativeCover` | — | ⬜ |
| 17 | `GradientHero` | — | ⬜ |
| 18 | `LocationBlock` | — | ⬜ |
| 19 | `LogoCloud` | — | ⬜ |
| 20 | `Navbar` | — | ⬜ |
| 21 | `NewsletterSignup` | — | ⬜ |
| 22 | `OrnamentRule` | — | ⬜ |
| 23 | `ParticleField` | — | ⬜ |
| 24 | `PointerHalo` | — | ⬜ |
| 25 | `PriceList` | — | ⬜ |
| 26 | `PricingTable` | — | ⬜ |
| 27 | `PricingToggle` | — | ⬜ |
| 28 | `ProcessSteps` | — | ⬜ |
| 29 | `ProductMock` | — | ⬜ |
| 30 | `RichText` | — | ⬜ |
| 31 | `SectionDivider` | — | ⬜ |
| 32 | `SectionHeading` | — | ⬜ |
| 33 | `Stat` | — | ⬜ |
| 34 | `StatBar` | — | ⬜ |
| 35 | `TeamGrid` | — | ⬜ |
| 36 | `Testimonials` | — | ⬜ |
| 37 | `VideoEmbed` | — | ⬜ |

*helpers:* `FAQ`, `initialsFromName`, `parseRichText`

### `marketplace` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AuctionCard` | `AuctionCardV2` · `AuctionCardV3` | ⬜ |
| 2 | `BidRow` | — | ⬜ |
| 3 | `CategoryTile` | — | ⬜ |
| 4 | `ConditionBadge` | — | ⬜ |
| 5 | `ListingCard` | `ListingCardV2` · `ListingCardV3` | ⬜ |
| 6 | `MakeOfferForm` | — | ⬜ |
| 7 | `OfferRow` | — | ⬜ |
| 8 | `RatingBreakdown` | — | ⬜ |
| 9 | `ReportListing` | — | ⬜ |
| 10 | `SellerCard` | `SellerCardV2` · `SellerCardV3` | ⬜ |
| 11 | `ShippingOption` | — | ⬜ |
| 12 | `WatchlistRow` | `WatchlistRowV2` · `WatchlistRowV3` | ⬜ |

### `medical` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AppointmentCard` | `AppointmentCardV2` · `AppointmentCardV3` | ⬜ |
| 2 | `DoctorCard` | `DoctorCardV2` · `DoctorCardV3` | ⬜ |
| 3 | `HealthRecordRow` | — | ⬜ |
| 4 | `LabResultRow` | `LabResultRowV2` · `LabResultRowV3` | ⬜ |
| 5 | `MedicationSchedule` | — | ⬜ |
| 6 | `PatientCard` | — | ⬜ |
| 7 | `PrescriptionRow` | `PrescriptionRowV2` · `PrescriptionRowV3` | ⬜ |
| 8 | `SymptomSelector` | — | ⬜ |
| 9 | `TelehealthCallBar` | — | ⬜ |
| 10 | `TriageLevel` | — | ⬜ |
| 11 | `VisitSummary` | — | ⬜ |
| 12 | `VitalsPanel` | — | ⬜ |

### `music` — 12 components, 4 with variants · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BPMControl` | — | ⬜ |
| 2 | `ChordChip` | — | ⬜ |
| 3 | `LoopControl` | — | ⬜ |
| 4 | `MetronomeBar` | — | ⬜ |
| 5 | `Mixer` | `MixerV2` · `MixerV3` | ⬜ |
| 6 | `PianoKeys` | `PianoKeysV2` · `PianoKeysV3` | ⬜ |
| 7 | `RecordButton` | — | ⬜ |
| 8 | `SamplePad` | — | ⬜ |
| 9 | `SetlistRow` | `SetlistRowV2` · `SetlistRowV3` | ⬜ |
| 10 | `TrackPad` | `TrackPadV2` · `TrackPadV3` | ⬜ |
| 11 | `VolumeFader` | — | ⬜ |
| 12 | `WaveformEditor` | — | ⬜ |

*helpers:* `NOTE_NAMES`, `chordLabel`, `clamp`, `formatBpm`, `formatDuration`, `isBlackKey`, `octaveNotes`, `padAccentKey`, `withAlpha`

### `nonprofit` — 12 components, 4 with variants · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CampaignProgress` | `CampaignProgressV2` · `CampaignProgressV3` | ⬜ |
| 2 | `CauseCard` | `CauseCardV2` · `CauseCardV3` | ⬜ |
| 3 | `DonationCard` | `DonationCardV2` · `DonationCardV3` | ⬜ |
| 4 | `DonorRow` | — | ⬜ |
| 5 | `EventTicketRow` | — | ⬜ |
| 6 | `FundraiserCard` | `FundraiserCardV2` · `FundraiserCardV3` | ⬜ |
| 7 | `ImpactStat` | — | ⬜ |
| 8 | `MatchingGiftBanner` | — | ⬜ |
| 9 | `PledgeRow` | — | ⬜ |
| 10 | `RecurringGiftRow` | — | ⬜ |
| 11 | `ThankYouCard` | — | ⬜ |
| 12 | `VolunteerShift` | — | ⬜ |

*helpers:* `formatMoney`, `goalPct`, `withAlpha`

### `pets` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AdoptionCard` | `AdoptionCardV2` · `AdoptionCardV3` | ⬜ |
| 2 | `BreedCard` | — | ⬜ |
| 3 | `FeedingSchedule` | — | ⬜ |
| 4 | `GroomingCard` | — | ⬜ |
| 5 | `LostPetAlert` | — | ⬜ |
| 6 | `MedicationReminder` | — | ⬜ |
| 7 | `PetActivityRing` | `PetActivityRingV2` · `PetActivityRingV3` | ⬜ |
| 8 | `PetHealthLog` | — | ⬜ |
| 9 | `PetProfileCard` | `PetProfileCardV2` · `PetProfileCardV3` | ⬜ |
| 10 | `VaccineRecord` | — | ⬜ |
| 11 | `VetAppointmentCard` | `VetAppointmentCardV2` · `VetAppointmentCardV3` | ⬜ |
| 12 | `WeightTracker` | — | ⬜ |

### `photography` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AlbumCard` | `AlbumCardV2` · `AlbumCardV3` | ⬜ |
| 2 | `ClientProofRow` | — | ⬜ |
| 3 | `EquipmentRow` | — | ⬜ |
| 4 | `GalleryHeader` | — | ⬜ |
| 5 | `LightboxThumb` | — | ⬜ |
| 6 | `PackageCard` | `PackageCardV2` · `PackageCardV3` | ⬜ |
| 7 | `PhotoTile` | `PhotoTileV2` · `PhotoTileV3` | ⬜ |
| 8 | `PortfolioGrid` | `PortfolioGridV2` · `PortfolioGridV3` | ⬜ |
| 9 | `PricePackageRow` | — | ⬜ |
| 10 | `PrintOrderRow` | — | ⬜ |
| 11 | `ShootBookingCard` | — | ⬜ |
| 12 | `ShotListItem` | — | ⬜ |

### `pos` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CartLine` | `CartLineV2` · `CartLineV3` | ⬜ |
| 2 | `CashDrawerRow` | — | ⬜ |
| 3 | `DiscountRow` | — | ⬜ |
| 4 | `OrderTicket` | — | ⬜ |
| 5 | `PaymentMethodTile` | — | ⬜ |
| 6 | `ProductGridTile` | `ProductGridTileV2` · `ProductGridTileV3` | ⬜ |
| 7 | `QuickChargeBar` | — | ⬜ |
| 8 | `ReceiptView` | `ReceiptViewV2` · `ReceiptViewV3` | ⬜ |
| 9 | `RefundRow` | — | ⬜ |
| 10 | `RegisterKeypad` | `RegisterKeypadV2` · `RegisterKeypadV3` | ⬜ |
| 11 | `ShiftReport` | — | ⬜ |
| 12 | `SplitBillRow` | — | ⬜ |
| 13 | `StatusPill` | — | ⬜ |

*helpers:* `CASH_MOVEMENT_META`, `PAYMENT_METHOD_META`, `REFUND_REASON_META`, `REFUND_STATUS_META`, `TICKET_STATUS_META`, `formatMoney`, `initials`, `onToneSlot`, `safeCents`, `seedRampStep`, `sumCents`, `toneColor`, `toneSlot`, `varianceMeta`, `withAlpha`

### `productivity` — 13 components, 4 with variants · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AssigneeGroup` | — | ⬜ |
| 2 | `BoardColumn` | — | ⬜ |
| 3 | `ChecklistItem` | — | ⬜ |
| 4 | `DueDatePill` | — | ⬜ |
| 5 | `LabelChip` | — | ⬜ |
| 6 | `MilestoneRow` | `MilestoneRowV2` · `MilestoneRowV3` | ⬜ |
| 7 | `NoteCard` | `NoteCardV2` · `NoteCardV3` | ⬜ |
| 8 | `PriorityTag` | — | ⬜ |
| 9 | `ProjectCard` | `ProjectCardV2` · `ProjectCardV3` | ⬜ |
| 10 | `ReminderRow` | — | ⬜ |
| 11 | `SubtaskList` | — | ⬜ |
| 12 | `TaskRow` | `TaskRowV2` · `TaskRowV3` | ⬜ |
| 13 | `TimeTracker` | — | ⬜ |

### `realestate` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AgentCard` | `AgentCardV2` · `AgentCardV3` | ⬜ |
| 2 | `AmenityGrid` | — | ⬜ |
| 3 | `ComparableRow` | `ComparableRowV2` · `ComparableRowV3` | ⬜ |
| 4 | `FloorPlanView` | — | ⬜ |
| 5 | `ListingGallery` | `ListingGalleryV2` · `ListingGalleryV3` | ⬜ |
| 6 | `MapPinCard` | — | ⬜ |
| 7 | `MortgageCalc` | — | ⬜ |
| 8 | `NeighborhoodStat` | — | ⬜ |
| 9 | `OpenHouseBadge` | — | ⬜ |
| 10 | `PriceHistory` | — | ⬜ |
| 11 | `PropertyCard` | `PropertyCardV2` · `PropertyCardV3` | ⬜ |
| 12 | `SavedSearchRow` | — | ⬜ |
| 13 | `TourScheduler` | — | ⬜ |

### `smarthome` — 12 components, 4 with variants · last updated **0.8.0** ⚠️

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AutomationRule` | — | ⬜ |
| 2 | `CameraTile` | — | ⬜ |
| 3 | `DeviceTile` | `DeviceTileV2` · `DeviceTileV3` | ⬜ |
| 4 | `DeviceToggleRow` | — | ⬜ |
| 5 | `EnergyUsage` | — | ⬜ |
| 6 | `LightControl` | `LightControlV2` · `LightControlV3` | ⬜ |
| 7 | `LockControl` | — | ⬜ |
| 8 | `RoomGroup` | — | ⬜ |
| 9 | `SceneCard` | `SceneCardV2` · `SceneCardV3` | ⬜ |
| 10 | `ScheduleRow` | — | ⬜ |
| 11 | `SensorReading` | — | ⬜ |
| 12 | `ThermostatDial` | `ThermostatDialV2` · `ThermostatDialV3` | ⬜ |

### `social` — 14 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `CommentItem` | `CommentItemV2` · `CommentItemV3` | ⬜ |
| 2 | `EngagementBar` | — | ⬜ |
| 3 | `FeedList` | — | ⬜ |
| 4 | `FollowButton` | — | ⬜ |
| 5 | `HashtagChip` | — | ⬜ |
| 6 | `MentionText` | — | ⬜ |
| 7 | `Poll` | — | ⬜ |
| 8 | `PostCard` | `PostCardV2` · `PostCardV3` | ⬜ |
| 9 | `ProfileStats` | — | ⬜ |
| 10 | `ReactionBar` | — | ⬜ |
| 11 | `ShareSheet` | — | ⬜ |
| 12 | `StoryBar` | `StoryBarV2` · `StoryBarV3` | ⬜ |
| 13 | `StoryRing` | — | ⬜ |
| 14 | `UserCard` | `UserCardV2` · `UserCardV3` | ⬜ |

*helpers:* `parseMentions`

### `sports` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BracketView` | — | ⬜ |
| 2 | `FixtureRow` | — | ⬜ |
| 3 | `LeagueBadge` | — | ⬜ |
| 4 | `LineupField` | — | ⬜ |
| 5 | `LiveCommentary` | — | ⬜ |
| 6 | `MatchScore` | `MatchScoreV2` · `MatchScoreV3` | ⬜ |
| 7 | `MatchTimeline` | — | ⬜ |
| 8 | `PlayerStatCard` | `PlayerStatCardV2` · `PlayerStatCardV3` | ⬜ |
| 9 | `ScoreTicker` | — | ⬜ |
| 10 | `Standings` | `StandingsV2` · `StandingsV3` | ⬜ |
| 11 | `StatComparison` | — | ⬜ |
| 12 | `TeamCard` | `TeamCardV2` · `TeamCardV3` | ⬜ |

### `streaming` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AudioPlayer` | — | ⬜ |
| 2 | `CastButton` | — | ⬜ |
| 3 | `ChannelCard` | — | ⬜ |
| 4 | `EpisodeRow` | `EpisodeRowV2` · `EpisodeRowV3` | ⬜ |
| 5 | `LiveBadge` | — | ⬜ |
| 6 | `MiniPlayer` | `MiniPlayerV2` · `MiniPlayerV3` | ⬜ |
| 7 | `NowPlaying` | `NowPlayingV2` · `NowPlayingV3` | ⬜ |
| 8 | `PlaylistRow` | — | ⬜ |
| 9 | `PodcastCard` | `PodcastCardV2` · `PodcastCardV3` | ⬜ |
| 10 | `QueueList` | — | ⬜ |
| 11 | `VideoPlayer` | — | ⬜ |
| 12 | `WaveformScrubber` | — | ⬜ |

*helpers:* `formatCount`, `formatTime`

### `support` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AgentStatus` | `AgentStatusV2` · `AgentStatusV3` | ⬜ |
| 2 | `CannedResponse` | — | ⬜ |
| 3 | `ConversationPanel` | `ConversationPanelV2` · `ConversationPanelV3` | ⬜ |
| 4 | `EscalationBanner` | — | ⬜ |
| 5 | `KBArticleRow` | — | ⬜ |
| 6 | `MacroList` | — | ⬜ |
| 7 | `QueueStat` | — | ⬜ |
| 8 | `ResolutionTimer` | — | ⬜ |
| 9 | `SLABadge` | — | ⬜ |
| 10 | `SatisfactionRating` | `SatisfactionRatingV2` · `SatisfactionRatingV3` | ⬜ |
| 11 | `TicketPriority` | — | ⬜ |
| 12 | `TicketRow` | `TicketRowV2` · `TicketRowV3` | ⬜ |

### `survey` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `LikertScale` | `LikertScaleV2` · `LikertScaleV3` | ⬜ |
| 2 | `MatrixQuestion` | — | ⬜ |
| 3 | `MultipleChoice` | `MultipleChoiceV2` · `MultipleChoiceV3` | ⬜ |
| 4 | `NPSScale` | `NPSScaleV2` · `NPSScaleV3` | ⬜ |
| 5 | `OpenTextResponse` | — | ⬜ |
| 6 | `PollResultBar` | — | ⬜ |
| 7 | `QuestionCard` | `QuestionCardV2` · `QuestionCardV3` | ⬜ |
| 8 | `RankingQuestion` | — | ⬜ |
| 9 | `RatingScaleInput` | — | ⬜ |
| 10 | `ResponseSummary` | — | ⬜ |
| 11 | `SurveyIntro` | — | ⬜ |
| 12 | `SurveyProgress` | — | ⬜ |

*helpers:* `npsBucket`

### `travel` — 13 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AmenityRow` | — | ⬜ |
| 2 | `BaggageRow` | — | ⬜ |
| 3 | `BoardingPass` | — | ⬜ |
| 4 | `DestinationCard` | `DestinationCardV2` · `DestinationCardV3` | ⬜ |
| 5 | `FlightCard` | `FlightCardV2` · `FlightCardV3` | ⬜ |
| 6 | `HotelCard` | `HotelCardV2` · `HotelCardV3` | ⬜ |
| 7 | `ItineraryItem` | `ItineraryItemV2` · `ItineraryItemV3` | ⬜ |
| 8 | `MapCard` | — | ⬜ |
| 9 | `PriceCalendar` | — | ⬜ |
| 10 | `ReviewStars` | — | ⬜ |
| 11 | `SeatPicker` | — | ⬜ |
| 12 | `TripSummary` | — | ⬜ |
| 13 | `WeatherStrip` | — | ⬜ |

### `utilities` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AutoPayRow` | — | ⬜ |
| 2 | `BillCard` | `BillCardV2` · `BillCardV3` | ⬜ |
| 3 | `BudgetBillRow` | — | ⬜ |
| 4 | `ConsumptionChart` | — | ⬜ |
| 5 | `EnergyTip` | — | ⬜ |
| 6 | `MeterReading` | — | ⬜ |
| 7 | `OutageAlert` | — | ⬜ |
| 8 | `PaymentRow` | `PaymentRowV2` · `PaymentRowV3` | ⬜ |
| 9 | `RatePlanCard` | — | ⬜ |
| 10 | `ServiceRequestRow` | — | ⬜ |
| 11 | `ServiceStatus` | `ServiceStatusV2` · `ServiceStatusV3` | ⬜ |
| 12 | `UsageMeter` | `UsageMeterV2` · `UsageMeterV3` | ⬜ |

*helpers:* `BILL_STATUS`, `OUTAGE_STATE`, `PAYMENT_STATE`, `REQUEST_STATE`, `SERVICE_STATE`, `UTILITY_KIND`, `formatMoney`, `formatPct`, `formatUsage`

### `weather` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `AirQualityCard` | `AirQualityCardV2` · `AirQualityCardV3` | ⬜ |
| 2 | `CurrentWeather` | `CurrentWeatherV2` · `CurrentWeatherV3` | ⬜ |
| 3 | `ForecastStrip` | `ForecastStripV2` · `ForecastStripV3` | ⬜ |
| 4 | `HourlyRow` | `HourlyRowV2` · `HourlyRowV3` | ⬜ |
| 5 | `PrecipBar` | — | ⬜ |
| 6 | `RadarCard` | — | ⬜ |
| 7 | `SunriseSunset` | — | ⬜ |
| 8 | `TemperatureGraph` | — | ⬜ |
| 9 | `UVIndexCard` | — | ⬜ |
| 10 | `WeatherAlert` | — | ⬜ |
| 11 | `WeatherStat` | — | ⬜ |
| 12 | `WindCompass` | — | ⬜ |

*helpers:* `conditionGlyph`, `conditionLabel`

### `wellness` — 12 components, 4 with variants · last updated **0.7.0** ❌

| # | component | variants | done |
|--:|---|---|:--:|
| 1 | `BreathingGuide` | — | ⬜ |
| 2 | `DailyQuoteCard` | — | ⬜ |
| 3 | `GratitudeEntry` | — | ⬜ |
| 4 | `JournalPrompt` | — | ⬜ |
| 5 | `MeditationSessionCard` | `MeditationSessionCardV2` · `MeditationSessionCardV3` | ⬜ |
| 6 | `MindfulnessStreak` | `MindfulnessStreakV2` · `MindfulnessStreakV3` | ⬜ |
| 7 | `MoodCheckIn` | `MoodCheckInV2` · `MoodCheckInV3` | ⬜ |
| 8 | `ProgressCalendar` | — | ⬜ |
| 9 | `SessionTimer` | — | ⬜ |
| 10 | `SleepStoryCard` | `SleepStoryCardV2` · `SleepStoryCardV3` | ⬜ |
| 11 | `SoundscapeRow` | — | ⬜ |
| 12 | `WellnessGoalRing` | — | ⬜ |
