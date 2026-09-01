import * as React from 'react';
import type { MedicationReminderProps } from './MedicationReminder';
/** V4 layout choices for the "companion" design. */
export type MedicationReminderLayout = 'card' | 'compact';
/** Drop-in for {@link MedicationReminderProps} — same props, the V4 "companion" design. */
export interface MedicationReminderV4Props extends MedicationReminderProps {
    /** V4 layout: `card` (default) or `compact` (dense single row). */
    variant?: MedicationReminderLayout;
}
/**
 * MedicationReminder — **V4** "companion" design (web parity of the native V4).
 * The warm, friendly take on a dose reminder: an elevated rounded card with a
 * soft shadow, the form glyph in a soft-primary tinted well, a bold title with
 * muted dose/frequency meta, a labelled state Badge, the next-dose time and
 * doses-left rendered as small soft-primary chips, and a rounded "Mark taken"
 * CTA. Same props/behavior as {@link MedicationReminderProps}; every `form` and
 * `state` reads via a glyph + labelled Badge/chip (never color alone). All colors
 * from `--xen-*` token classes (no literals). The `onMarkTaken` action is
 * preserved as a real `<button>` that stops propagation so it stays independent
 * of any wrapping click target.
 */
export declare const MedicationReminderV4: React.ForwardRefExoticComponent<MedicationReminderV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MedicationReminderV4.d.ts.map