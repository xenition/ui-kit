/**
 * `@xenition/ui/agriculture` — presentational farm / agri-tech blocks for React
 * DOM. The web parity of `@xenition/ui/native/agriculture`: same component and
 * prop names (`onPress` → `onClick`, RN → DOM), composed from the web primitives
 * (`Card`, `Button`, `Icon`, `Badge`, `Switch`, `Progress`) plus the shared
 * `BarChart` / `LineChart` and the `EmptyState`. Styled exclusively from the
 * `--xen-*` token classes — no literal colors. Every component forwards a ref to
 * its DOM root, ships empty / loading affordances, and keeps status
 * color-independent (glyph + text label); advisories/alerts use `role="alert"`,
 * interactive cards expose `role="button"` with keyboard activation. None
 * fetches or imports the SDK.
 */
export { CropCard } from './CropCard';
export type { CropCardProps, GrowthStage, CropHealth, CropCardVariant } from './CropCard';
export { FieldCard } from './FieldCard';
export type { FieldCardProps, FieldStatus, FieldCardVariant } from './FieldCard';
export { LivestockRow } from './LivestockRow';
export type { LivestockRowProps, LivestockHealth } from './LivestockRow';
export { HarvestLog } from './HarvestLog';
export type { HarvestLogProps, HarvestEntry } from './HarvestLog';
export { WeatherAdvisory } from './WeatherAdvisory';
export type { WeatherAdvisoryProps, AdvisoryKind, AdvisorySeverity } from './WeatherAdvisory';
export { SoilMoistureCard } from './SoilMoistureCard';
export type { SoilMoistureCardProps, SoilMoistureStatus } from './SoilMoistureCard';
export { IrrigationSchedule } from './IrrigationSchedule';
export type { IrrigationScheduleProps, IrrigationSlot, IrrigationRunState, } from './IrrigationSchedule';
export { YieldChart } from './YieldChart';
export type { YieldChartProps, YieldChartVariant } from './YieldChart';
export { EquipmentStatus } from './EquipmentStatus';
export type { EquipmentStatusProps, EquipmentState } from './EquipmentStatus';
export { PestAlert } from './PestAlert';
export type { PestAlertProps, PestSeverity } from './PestAlert';
export { MarketPriceRow } from './MarketPriceRow';
export type { MarketPriceRowProps, PriceDirection } from './MarketPriceRow';
export { FarmTaskRow } from './FarmTaskRow';
export type { FarmTaskRowProps, TaskPriority } from './FarmTaskRow';
//# sourceMappingURL=index.d.ts.map