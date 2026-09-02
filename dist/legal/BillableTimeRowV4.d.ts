import * as React from 'react';
import type { BillableTimeRowProps } from './BillableTimeRow';
/** Drop-in for {@link BillableTimeRowProps} — same props, the V4 "chambers" design. */
export type BillableTimeRowV4Props = BillableTimeRowProps;
/**
 * BillableTimeRow — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a time entry: an elevated rounded row with a
 * soft shadow, a date + **tabular-nums** duration eyebrow, the narrative, the
 * timekeeper, a big legible **tabular-nums** amount (money carried as integer
 * cents through the shared `formatMoney`), and a labelled glyph + word billing
 * status (never color alone). When `actionable` and not yet billed, a "Log time"
 * button fires `onLog`. When `onClick` is set the row is a keyboard-activable
 * `role="button"`. Reuses the base `variant` (`default` / `compact`). All colors
 * from `--xen-*` token classes (no literals).
 */
export declare const BillableTimeRowV4: React.ForwardRefExoticComponent<BillableTimeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BillableTimeRowV4.d.ts.map