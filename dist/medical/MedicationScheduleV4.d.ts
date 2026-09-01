import * as React from 'react';
import type { MedicationScheduleProps } from './MedicationSchedule';
/** Drop-in for {@link MedicationScheduleProps} — same props, the V4 "clinic" design. */
export type MedicationScheduleV4Props = MedicationScheduleProps;
/**
 * MedicationSchedule — **V4** "clinic" design (web parity of the native V4). The
 * calm, clinical take on a daily schedule: an elevated rounded card with a soft
 * shadow wrapping a timeline of doses. Each dose row shows a big legible
 * tabular-nums time, the drug + dose text, a labelled status marker (glyph +
 * label + token tone, never color alone), and a taken checkbox affordance
 * (`role="checkbox"`, keyboard-activatable, ≥44px tap target) wired to
 * `onToggleTaken`. A taken dose reads success glyph + "Taken" + a checked
 * control; a missed/overdue dose flags with a warn glyph + "Missed". Renders
 * loading and empty (`EmptyState`) states. Identical props/behavior to
 * {@link MedicationScheduleProps}. All colors from `--xen-*` token classes (no
 * literals). Informational UI only — not a medical device.
 */
export declare const MedicationScheduleV4: React.ForwardRefExoticComponent<MedicationScheduleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MedicationScheduleV4.d.ts.map