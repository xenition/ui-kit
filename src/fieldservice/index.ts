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
export { WorkOrderCardV2 } from './WorkOrderCardV2';
export type { WorkOrderCardV2Props } from './WorkOrderCardV2';
export { WorkOrderCardV3 } from './WorkOrderCardV3';
export type { WorkOrderCardV3Props } from './WorkOrderCardV3';

export { JobSiteCard } from './JobSiteCard';
export type { JobSiteCardProps, JobSiteStatus } from './JobSiteCard';
export { JobSiteCardV2 } from './JobSiteCardV2';
export type { JobSiteCardV2Props } from './JobSiteCardV2';
export { JobSiteCardV3 } from './JobSiteCardV3';
export type { JobSiteCardV3Props } from './JobSiteCardV3';

export { InspectionRow } from './InspectionRow';
export type { InspectionRowProps, InspectionResult } from './InspectionRow';
export { InspectionRowV2 } from './InspectionRowV2';
export type { InspectionRowV2Props } from './InspectionRowV2';
export { InspectionRowV3 } from './InspectionRowV3';
export type { InspectionRowV3Props } from './InspectionRowV3';

export { PunchListItem } from './PunchListItem';
export type { PunchListItemProps, PunchSeverity } from './PunchListItem';

export { EquipmentRow } from './EquipmentRow';
export type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';

export { TechnicianCard } from './TechnicianCard';
export type { TechnicianCardProps, TechnicianStatus } from './TechnicianCard';
export { TechnicianCardV2 } from './TechnicianCardV2';
export type { TechnicianCardV2Props } from './TechnicianCardV2';
export { TechnicianCardV3 } from './TechnicianCardV3';
export type { TechnicianCardV3Props } from './TechnicianCardV3';

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

// Shared money/format home (re-exported for ergonomics; mirrors sibling modules).
export { formatMoney, formatDuration, formatPct } from './internal/format';
export type { MoneyFormatter } from './internal/format';
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `EVENTS-FIELDSERVICE-V4-BRIEF.md`.
// Each is a drop-in for its base — same props plus optional additions.
export { DispatchBarV4 } from './DispatchBarV4';
export type { DispatchBarV4Props } from './DispatchBarV4';
export { EquipmentRowV4 } from './EquipmentRowV4';
export type { EquipmentRowV4Props } from './EquipmentRowV4';
export { InspectionRowV4 } from './InspectionRowV4';
export type { InspectionRowV4Props } from './InspectionRowV4';
export { JobSiteCardV4 } from './JobSiteCardV4';
export type { JobSiteCardV4Props } from './JobSiteCardV4';
export { MaterialsRowV4 } from './MaterialsRowV4';
export type { MaterialsRowV4Props } from './MaterialsRowV4';
export { PunchListItemV4 } from './PunchListItemV4';
export type { PunchListItemV4Props } from './PunchListItemV4';
export { SafetyChecklistV4 } from './SafetyChecklistV4';
export type { SafetyChecklistV4Props } from './SafetyChecklistV4';
export { ServiceChecklistV4 } from './ServiceChecklistV4';
export type { ServiceChecklistV4Props } from './ServiceChecklistV4';
export { SignaturePadV4 } from './SignaturePadV4';
export type { SignaturePadV4Props } from './SignaturePadV4';
export { TechnicianCardV4 } from './TechnicianCardV4';
export type { TechnicianCardV4Props } from './TechnicianCardV4';
export { TimeLogRowV4 } from './TimeLogRowV4';
export type { TimeLogRowV4Props } from './TimeLogRowV4';
export { WorkOrderCardV4 } from './WorkOrderCardV4';
export type { WorkOrderCardV4Props } from './WorkOrderCardV4';
