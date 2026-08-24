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
export { BillCardV2 } from './BillCardV2';
export type { BillCardV2Props } from './BillCardV2';
export { BillCardV3 } from './BillCardV3';
export type { BillCardV3Props } from './BillCardV3';

export { UsageMeter } from './UsageMeter';
export type { UsageMeterProps } from './UsageMeter';
export { UsageMeterV2 } from './UsageMeterV2';
export type { UsageMeterV2Props } from './UsageMeterV2';
export { UsageMeterV3 } from './UsageMeterV3';
export type { UsageMeterV3Props } from './UsageMeterV3';

export { PaymentRow } from './PaymentRow';
export type { PaymentRowProps, PaymentState } from './PaymentRow';
export { PaymentRowV2 } from './PaymentRowV2';
export type { PaymentRowV2Props } from './PaymentRowV2';
export { PaymentRowV3 } from './PaymentRowV3';
export type { PaymentRowV3Props } from './PaymentRowV3';

export { ServiceStatus } from './ServiceStatus';
export type { ServiceStatusProps, ServiceState } from './ServiceStatus';
export { ServiceStatusV2 } from './ServiceStatusV2';
export type { ServiceStatusV2Props } from './ServiceStatusV2';
export { ServiceStatusV3 } from './ServiceStatusV3';
export type { ServiceStatusV3Props } from './ServiceStatusV3';

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
