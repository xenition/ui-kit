import * as React from 'react';
import type { BillableTimeRowProps } from './BillableTimeRow';
/** Drop-in for {@link BillableTimeRowProps} — same props, the V4 "chambers" design. */
export type BillableTimeRowV4Props = BillableTimeRowProps;
/**
 * BillableTimeRow — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow, a date + **tabular-nums** duration
 * eyebrow, the narrative, the timekeeper, a big legible **tabular-nums** amount
 * (money carried as integer cents through the shared `formatMoney`), and a
 * labelled glyph + word billing status (never color alone). When `actionable`
 * and not yet billed, a "Log time" button fires `onLog`. Tappable when `onPress`
 * is set. Reuses the base `variant` (`default` / `compact`). Token-only colors
 * via `useXenitionTheme()`.
 */
export declare function BillableTimeRowV4({ date, description, hours, rateCents, amountCents, currency, timekeeper, status, variant, actionable, onLog, onPress, testID, style, }: BillableTimeRowV4Props): React.ReactElement;
//# sourceMappingURL=BillableTimeRowV4.d.ts.map