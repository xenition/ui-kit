import * as React from 'react';
import type { MedicationScheduleProps } from './MedicationSchedule';
/** Drop-in for {@link MedicationScheduleProps} — same props, the V4 "clinic" design. */
export type MedicationScheduleV4Props = MedicationScheduleProps;
/**
 * MedicationSchedule — **V4** "clinic" design. The calm, clinical take on a
 * daily schedule: an elevated rounded card with a soft shadow wrapping a
 * timeline of doses. Each dose row shows a big legible time, the drug + dose
 * text, a labelled status marker (glyph + label + token tone, never color
 * alone), and a taken checkbox affordance (≥44px tap target) wired to
 * `onToggleTaken`. A taken dose reads success glyph + "Taken" + a checked
 * control; a missed/overdue dose flags with a warn glyph + "Missed". Renders
 * loading and empty states. Identical props/behavior to
 * {@link MedicationScheduleProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
export declare function MedicationScheduleV4({ doses, title, onToggleTaken, loading, emptyLabel, style, }: MedicationScheduleV4Props): React.ReactElement;
//# sourceMappingURL=MedicationScheduleV4.d.ts.map