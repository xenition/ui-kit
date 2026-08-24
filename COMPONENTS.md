# @xenition/ui — Component Catalog & Gap Analysis

Every component is **theme-token-bound** (colors/spacing/radius come from the seed → no hard-coded
colors) and most have a **web** and a **React Native** version. This doc lists **what exists today**
and **what's missing** vs the major design systems (Ant Design, shadcn/ui, DaisyUI), so the no-code
generator has a real, drop-in component for every common UI need.

Legend: ✅ have · ⚠️ partial (exists but limited) · ❌ gap (to build)

---

## ✅ Status update — gaps now implemented (feature/abir)

The prioritized gaps have been built (web, theme-token-bound, with specs; 399 tests green):

- **Feedback:** Alert, Toast (`ToastProvider`/`useToast`), Progress, Skeleton
- **Overlays:** Tooltip, Popover, Menu (dropdown), Accordion, Drawer, Popconfirm
- **Data display:** Tag, Pagination, List, Breadcrumb, Timeline, Descriptions, AvatarGroup, Segmented, Steps
- **Data entry:** RadioGroup, Slider, NumberInput, PinInput, Form + `useForm`, Combobox, DatePicker, Upload
- **Big composed blocks:** **DataTable** (sort/search/paginate), **CrudTable** (table + create/edit modal + delete-confirm), **LoginForm**, **SignupForm**, **ForgotPasswordForm**, **AuthCard**
- **Native parity backfill:** Table, Modal (native)
- **Codegen:** cortex frontend prompt now steers generation to these (esp. DataTable/CrudTable/LoginForm)

**React Native parity — DONE (2026-07-11).** Every expanded web component now ships a native version on `@xenition/ui/native/primitives` (~35 added): forms (RadioGroup, Slider, NumberInput, PinInput, Form+useForm), feedback (Alert, Toast, Progress, Skeleton), overlays (Drawer, Popover, Menu, Accordion, Popconfirm, Tooltip), data display (Tag, List, Pagination, Timeline, Descriptions, AvatarGroup, Segmented, Steps, Breadcrumb), heavy data (DataTable, CrudTable, Combobox, DatePicker, Upload), and composed auth (AuthCard, LoginForm, SignupForm, ForgotPasswordForm). **New:** `AppShell` + `Sidebar` dashboard layout for BOTH web and native. All token-bound, prop-parity with web; 467 tests green.

Remaining lower-priority items (TimePicker/ColorPicker/Cascader/Tree/Carousel/QRCode/Tour; native marketing sections beyond EntityCard) are still open.

---

---

## 1. What we have today (by module)

| Module | Web | Native |
|---|---|---|
| **primitives** | Avatar, Badge, Button, Card, ChatBubble, Checkbox, Eyebrow, Field, GlassPanel, GradientText, Input, Label, MessageList, Modal, Rating, Select, Spinner, Stack, StatusDot, StatusMessage, Switch, Table, Tabs, Textarea | same **minus Table, Modal** (+ XenitionUIProvider, PriceTag, EmptyState) |
| **marketing** | AuroraBackground, BentoGrid, CTABanner, EditorialGrid, EntityCard, FAQ, FeatureGrid, Footer, GenerativeCover, GradientHero, LogoCloud, Navbar, OrnamentRule, ParticleField, PointerHalo, PriceList, PricingTable, ProductMock, SectionDivider, SectionHeading, StatBar, Testimonials | **EntityCard only** |
| **commerce** | CartLineItem, CartSummary, EmptyState, OrderSummary, PriceTag, ProductCard, ProductGrid, QuantityStepper, StatusBadge | full parity |
| **booking** | BookingCalendar, BookingSummary, SlotPicker | full parity |
| **media** | Gallery, Lightbox, MediaFigure | full parity |
| **motion** | AnimatedCounter, Marquee, Parallax, Reveal, Stagger, TiltCard | Reveal, Stagger |

**Strong coverage:** primitives, marketing sections, commerce, booking, media.
**Weak coverage:** feedback, overlays, advanced form inputs, navigation, and **composed auth forms**.

---

## 2. Gap analysis vs Ant Design / shadcn / DaisyUI

### 2.1 Data entry (forms)
| Component | Web | Native | Priority | Notes |
|---|---|---|---|---|
| Input | ✅ | ✅ | — | |
| Textarea | ✅ | ✅ | — | |
| Select (dropdown) | ✅ | ✅ | — | native = Pressable+Modal sheet |
| Checkbox | ✅ | ✅ | — | |
| Switch | ✅ | ✅ | — | |
| Label / Field | ✅ | ✅ | — | Field = label+error row |
| Rating | ✅ | ✅ | — | |
| **Radio / RadioGroup** | ❌ | ❌ | **High** | single-choice; very common in forms |
| **Form (validation wrapper)** | ⚠️ | ⚠️ | **High** | have Field; no `<Form>` with schema/validation/submit |
| **DatePicker / Calendar input** | ❌ | ❌ | **High** | BookingCalendar exists but not a form input |
| **NumberInput / Stepper** | ⚠️ | ⚠️ | Med | QuantityStepper is commerce-specific |
| **Slider (range)** | ❌ | ❌ | Med | |
| **Upload / Dropzone / FileInput** | ❌ | ❌ | **High** | pairs with `@xenition/sdk` storage |
| **Combobox / Autocomplete** | ❌ | ❌ | Med | typeahead select |
| **OTP / PinInput** | ❌ | ❌ | Med | for auth/2FA |
| TimePicker | ❌ | ❌ | Low | |
| ColorPicker | ❌ | ❌ | Low | |
| Cascader / TreeSelect / Transfer / Mentions | ❌ | ❌ | Low | |

### 2.2 Data display
| Component | Web | Native | Priority | Notes |
|---|---|---|---|---|
| Card | ✅ | ✅ | — | |
| Table (basic) | ✅ | ❌(native) | — | columns/rows/empty |
| Avatar / Badge | ✅ | ✅ | — | |
| Tabs | ✅ | ✅ | — | |
| ChatBubble / MessageList | ✅ | ✅ | — | thread UI |
| Statistic (StatBar / AnimatedCounter) | ✅ | ⚠️ | — | |
| Empty (EmptyState) | ✅ | ✅ | — | |
| Image / Gallery / Lightbox | ✅ | ✅ | — | |
| **DataTable (sort + paginate + select + filter)** | ❌ | ❌ | **High** | Table has none of these; #1 for CRM/admin apps |
| **List (generic)** | ❌ | ❌ | **High** | avatar/title/meta/action rows |
| **Tag / Chip (removable)** | ⚠️ | ⚠️ | Med | Badge is a static pill |
| **Tooltip** | ❌ | ❌ | **High** | |
| **Popover** | ❌ | ❌ | **High** | |
| **Accordion / Collapse** | ❌ | ❌ | **High** | (FAQ is marketing-only) |
| **Pagination** | ❌ | ❌ | **High** | |
| **Skeleton (loading placeholder)** | ❌ | ❌ | **High** | |
| **Timeline** | ❌ | ❌ | Med | activity feeds |
| **Descriptions (key/value)** | ❌ | ❌ | Med | detail views |
| AvatarGroup | ❌ | ❌ | Low | |
| Tree / Carousel / QRCode / Tour | ❌ | ❌ | Low | |

### 2.3 Navigation
| Component | Web | Native | Priority | Notes |
|---|---|---|---|---|
| Navbar / top nav | ✅ | ❌ | — | marketing Navbar |
| **Menu / Dropdown** | ❌ | ❌ | **High** | action menus |
| **Breadcrumb** | ❌ | ❌ | Med | |
| **Steps / Wizard (multi-step)** | ❌ | ❌ | **High** | onboarding, checkout |
| **Sidebar / AppShell layout** | ❌ | ❌ | **High** | dashboard shell (nav + content) |
| **Pagination** | ❌ | ❌ | High | (also in display) |
| Segmented control | ❌ | ❌ | Med | |
| Anchor | ❌ | ❌ | Low | |

### 2.4 Feedback / overlays
| Component | Web | Native | Priority | Notes |
|---|---|---|---|---|
| Modal / Dialog | ✅ | ❌(native) | — | native Modal is a gap |
| Alert (StatusMessage) | ⚠️ | ⚠️ | — | loading/empty/error only; no dismissible inline alert w/ variants |
| Spinner / Loading | ✅ | ✅ | — | |
| **Toast / Notification (provider + trigger)** | ❌ | ❌ | **Highest** | most-requested feedback pattern; nothing today |
| **Progress (bar + circle)** | ❌ | ❌ | **High** | uploads, steps |
| **Skeleton** | ❌ | ❌ | High | |
| **Drawer / Sheet** | ❌ | ❌ | **High** | side panels, mobile menus |
| **Popconfirm / ConfirmDialog** | ❌ | ❌ | High | delete confirmations |
| **Result / ErrorState / 404** | ⚠️ | ⚠️ | Med | partial via StatusMessage |
| ContextMenu | ❌ | ❌ | Low | |

### 2.5 Composed, drop-in blocks — the "not small small" ones
These combine primitives (and sometimes `@xenition/sdk`) into a single component you "just call".

| Component | Web | Native | Priority | Notes |
|---|---|---|---|---|
| Marketing (Hero, CTA, FAQ, Pricing, Testimonials, Footer, Feature/Bento…) | ✅ | ❌ | — | rich set already |
| Commerce (ProductCard/Grid, Cart, Order, PriceTag…) | ✅ | ✅ | — | |
| Booking (Calendar, SlotPicker, Summary) | ✅ | ✅ | — | |
| CommentThread (ChatBubble + MessageList) | ✅ | ✅ | — | |
| **LoginForm** (email/password → `@xenition/sdk` auth) | ❌ | ❌ | **Highest** | your example — "just call `<LoginForm/>`", themed, wired to SDK |
| **SignupForm / RegisterForm** | ❌ | ❌ | **Highest** | |
| **ForgotPassword / ResetPassword form** | ❌ | ❌ | High | |
| **AuthCard / AuthGate (kit-level)** | ❌ | ❌ | **Highest** | today the generator emits a raw-Tailwind AuthGate; move it into the kit, themed |
| **ProfileForm / SettingsForm** | ❌ | ❌ | High | edit current user via SDK |
| **SearchBar / CommandPalette** | ❌ | ❌ | Med | |
| **FileUpload block** (dropzone → SDK storage) | ❌ | ❌ | High | |
| **CrudTable** (DataTable + create/edit Modal + delete confirm) | ❌ | ❌ | **High** | the pattern every generated admin page hand-rolls today |
| **StatCardRow / KPI dashboard row** | ⚠️ | ⚠️ | Med | StatBar is close |
| **FilterBar** | ❌ | ❌ | Med | |

---

## 3. Recommended build order (highest impact first)

1. **Auth forms** — `LoginForm`, `SignupForm`, `ForgotPasswordForm`, `AuthCard`/`AuthGate` (themed, SDK-wired). *Replaces the raw-Tailwind AuthGate the generator emits today.*
2. **Feedback core** — `Toast`/`useToast`, `Progress`, `Skeleton`, `Drawer`, `Popconfirm`.
3. **Overlays** — `Tooltip`, `Popover`, `Dropdown`/`Menu`, `Accordion`.
4. **Data** — `DataTable` (sort/paginate/select), `Pagination`, `List`, `CrudTable` composed block.
5. **Forms** — `RadioGroup`, `Form` (validation), `DatePicker`, `Upload`/`Dropzone`, `Combobox`, `Slider`.
6. **Navigation / layout** — `AppShell`/`Sidebar`, `Steps`/`Wizard`, `Breadcrumb`, `Segmented`.
7. **Native parity backfill** — `Table`, `Modal` for native; native marketing blocks.

### Design rules for every new component
- Colors/spacing/radius from theme tokens only (the `--xen-*` / `useXenitionTheme()` contract).
- Ship a **web** and a **native** version with the same prop names (`onClick`→`onPress` is the only swap).
- Composed blocks that touch data call **`@xenition/sdk`** through a passed-in client/handlers — never hard-code endpoints.
- Add each to the module `index.ts` + a spec, and surface it in the cortex codegen prompt.

> Components live in **`@xenition/ui`** (this repo). Data/auth/storage live in **`@xenition/sdk`**.
> Composed blocks like `LoginForm` are where the two meet.
