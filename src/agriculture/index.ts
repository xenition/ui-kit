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
export { CropCardV2 } from './CropCardV2';
export type { CropCardV2Props } from './CropCardV2';
export { CropCardV3 } from './CropCardV3';
export type { CropCardV3Props } from './CropCardV3';

export { FieldCard } from './FieldCard';
export type { FieldCardProps, FieldStatus, FieldCardVariant } from './FieldCard';
export { FieldCardV2 } from './FieldCardV2';
export type { FieldCardV2Props } from './FieldCardV2';
export { FieldCardV3 } from './FieldCardV3';
export type { FieldCardV3Props } from './FieldCardV3';

export { LivestockRow } from './LivestockRow';
export type { LivestockRowProps, LivestockHealth } from './LivestockRow';

export { HarvestLog } from './HarvestLog';
export type { HarvestLogProps, HarvestEntry } from './HarvestLog';
export { HarvestLogV2 } from './HarvestLogV2';
export type { HarvestLogV2Props } from './HarvestLogV2';
export { HarvestLogV3 } from './HarvestLogV3';
export type { HarvestLogV3Props } from './HarvestLogV3';

export { WeatherAdvisory } from './WeatherAdvisory';
export type { WeatherAdvisoryProps, AdvisoryKind, AdvisorySeverity } from './WeatherAdvisory';
export { WeatherAdvisoryV2 } from './WeatherAdvisoryV2';
export type { WeatherAdvisoryV2Props } from './WeatherAdvisoryV2';
export { WeatherAdvisoryV3 } from './WeatherAdvisoryV3';
export type { WeatherAdvisoryV3Props } from './WeatherAdvisoryV3';

export { SoilMoistureCard } from './SoilMoistureCard';
export type { SoilMoistureCardProps, SoilMoistureStatus } from './SoilMoistureCard';

export { IrrigationSchedule } from './IrrigationSchedule';
export type {
  IrrigationScheduleProps,
  IrrigationSlot,
  IrrigationRunState,
} from './IrrigationSchedule';

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

// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `VERTICALS-V4-BRIEF.md`. Each is a
// drop-in for its base — same props plus optional additions — with one
// deliberate exception: `YieldChartV4` replaces `color` with `tone`, because
// the base used a status colour as a series identity (see the file).
export { CropCardV4 } from './CropCardV4';
export type { CropCardV4Props } from './CropCardV4';
export { FieldCardV4 } from './FieldCardV4';
export type { FieldCardV4Props } from './FieldCardV4';
export { EquipmentStatusV4 } from './EquipmentStatusV4';
export type { EquipmentStatusV4Props } from './EquipmentStatusV4';
export { FarmTaskRowV4 } from './FarmTaskRowV4';
export type { FarmTaskRowV4Props } from './FarmTaskRowV4';
export { LivestockRowV4 } from './LivestockRowV4';
export type { LivestockRowV4Props } from './LivestockRowV4';
export { MarketPriceRowV4 } from './MarketPriceRowV4';
export type { MarketPriceRowV4Props } from './MarketPriceRowV4';
export { PestAlertV4 } from './PestAlertV4';
export type { PestAlertV4Props } from './PestAlertV4';
export { WeatherAdvisoryV4 } from './WeatherAdvisoryV4';
export type { WeatherAdvisoryV4Props } from './WeatherAdvisoryV4';
export { HarvestLogV4 } from './HarvestLogV4';
export type { HarvestLogV4Props } from './HarvestLogV4';
export { IrrigationScheduleV4 } from './IrrigationScheduleV4';
export type { IrrigationScheduleV4Props } from './IrrigationScheduleV4';
export { SoilMoistureCardV4 } from './SoilMoistureCardV4';
export type { SoilMoistureCardV4Props } from './SoilMoistureCardV4';
export { YieldChartV4 } from './YieldChartV4';
export type { YieldChartV4Props } from './YieldChartV4';
