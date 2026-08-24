/**
 * `@xenition/ui/native/utilities` — presentational utility / energy / bill-pay
 * blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `Icon`, `Badge`, `Progress`, `Switch`) and the token-bound `charts`
 * (`BarChart` / `LineChart`), styled exclusively from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors (every color traces to a
 * `SemanticColors` slot or a `ramps`-derived `withAlpha` tint). Money is always
 * carried as integer **cents** and funnelled through the single `formatMoney`
 * home, so printed values never drift, and metered quantities run through
 * `formatUsage`. Bill / service / payment / request / outage status is conveyed
 * by **text + glyph + color** (paid → success, overdue/outage → danger) — never
 * color alone. Every component takes data + callbacks + variants/states (no
 * fetching, no SDK import).
 */

export { BillCard } from './BillCard';
export type { BillCardProps, UtilityKind, BillStatus } from './BillCard';

export { UsageMeter } from './UsageMeter';
export type { UsageMeterProps } from './UsageMeter';

export { PaymentRow } from './PaymentRow';
export type { PaymentRowProps, PaymentState } from './PaymentRow';

export { ServiceStatus } from './ServiceStatus';
export type { ServiceStatusProps, ServiceState } from './ServiceStatus';

export { MeterReading } from './MeterReading';
export type { MeterReadingProps } from './MeterReading';

export { OutageAlert } from './OutageAlert';
export type { OutageAlertProps, OutageState } from './OutageAlert';

export { RatePlanCard } from './RatePlanCard';
export type { RatePlanCardProps, RatePlanVariant } from './RatePlanCard';

export { AutoPayRow } from './AutoPayRow';
export type { AutoPayRowProps } from './AutoPayRow';

export { ConsumptionChart } from './ConsumptionChart';
export type { ConsumptionChartProps, ConsumptionPoint } from './ConsumptionChart';

export { BudgetBillRow } from './BudgetBillRow';
export type { BudgetBillRowProps } from './BudgetBillRow';

export { ServiceRequestRow } from './ServiceRequestRow';
export type { ServiceRequestRowProps, RequestState, ServiceRequestKind } from './ServiceRequestRow';

export { EnergyTip } from './EnergyTip';
export type { EnergyTipProps, EnergyTipCategory } from './EnergyTip';

// Shared domain descriptors + the single money/format home (re-exported for
// ergonomics; mirrors the finance / insurance modules).
export {
  UTILITY_KIND,
  BILL_STATUS,
  SERVICE_STATE,
  PAYMENT_STATE,
  REQUEST_STATE,
  OUTAGE_STATE,
} from './internal/status';
export type { StatusDescriptor, UtilityDescriptor } from './internal/status';
export { formatMoney, formatUsage, formatPct } from './internal/format';
export type { MoneyFormatter } from './internal/format';
