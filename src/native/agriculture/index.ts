/**
 * `@xenition/ui/native/agriculture` — presentational farm / agri-tech blocks for
 * React Native. Composed from the native primitives (`Card`, `Button`, `Icon`,
 * `Badge`, `Switch`, `Progress`, `EmptyState`) and the shared `BarChart` /
 * `LineChart`, styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — colors resolve to `SemanticColors` keys (plus a local
 * `withAlpha` tint of a semantic slot for the advisory / pest banners); no
 * literal hex, no new dependencies. Every component is mobile-first and takes
 * data + callbacks + variants/states with empty / loading affordances and
 * color-independent status labels (alerts use `accessibilityRole="alert"`);
 * none fetches or imports the SDK.
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
export type { IrrigationScheduleProps, IrrigationSlot, IrrigationRunState } from './IrrigationSchedule';

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
