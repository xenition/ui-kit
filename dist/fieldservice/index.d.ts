/**
 * `@xenition/ui/fieldservice` — presentational field-service / construction /
 * trades blocks for React DOM (web). The web parity of
 * `@xenition/ui/native/fieldservice`: same component names, same prop
 * contract (`onPress` → `onClick`, RN styles → `className`/`style`). Composed
 * from the web primitives (`Card`, `Button`, `Icon`, `Badge`, `Avatar`,
 * `Checkbox`, `Progress`, `Alert`, `Skeleton`) plus `EmptyState`/`formatMoney`
 * from `commerce`, and styled exclusively through the `--xen-*` Tailwind token
 * classes — no literal colors (kit lint rule). Money is carried as integer
 * **cents** through the single `formatMoney` home. Work-order / inspection /
 * equipment / dispatch status is always conveyed by **text + glyph + color** —
 * never color alone. Every component takes data + callbacks + variants/states
 * (no fetching, no SDK import) and forwards a ref to its DOM root.
 */
export { WorkOrderCard } from './WorkOrderCard';
export type { WorkOrderCardProps, WorkOrderStatus, WorkOrderPriority } from './WorkOrderCard';
export { JobSiteCard } from './JobSiteCard';
export type { JobSiteCardProps, JobSiteStatus } from './JobSiteCard';
export { InspectionRow } from './InspectionRow';
export type { InspectionRowProps, InspectionResult } from './InspectionRow';
export { PunchListItem } from './PunchListItem';
export type { PunchListItemProps, PunchSeverity } from './PunchListItem';
export { EquipmentRow } from './EquipmentRow';
export type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';
export { TechnicianCard } from './TechnicianCard';
export type { TechnicianCardProps, TechnicianStatus } from './TechnicianCard';
export { ServiceChecklist } from './ServiceChecklist';
export type { ServiceChecklistProps, ServiceTask } from './ServiceChecklist';
export { TimeLogRow } from './TimeLogRow';
export type { TimeLogRowProps, TimeLogStatus } from './TimeLogRow';
export { SignaturePad } from './SignaturePad';
export type { SignaturePadProps } from './SignaturePad';
export { MaterialsRow } from './MaterialsRow';
export type { MaterialsRowProps, MaterialStock } from './MaterialsRow';
export { DispatchBar } from './DispatchBar';
export type { DispatchBarProps, DispatchStage } from './DispatchBar';
export { SafetyChecklist } from './SafetyChecklist';
export type { SafetyChecklistProps, SafetyItem, SafetyVerdict } from './SafetyChecklist';
export { formatMoney, formatDuration, formatPct } from './internal/format';
export type { MoneyFormatter } from './internal/format';
//# sourceMappingURL=index.d.ts.map