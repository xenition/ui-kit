import * as React from 'react';
import type { RecurringGiftRowProps } from './RecurringGiftRow';
/** Drop-in for {@link RecurringGiftRowProps} — same props, the V4 "rally" design. */
export type RecurringGiftRowV4Props = RecurringGiftRowProps;
/**
 * RecurringGiftRow — **V4** "rally" design (web parity of the native V4). An
 * elevated, rounded managed recurring-gift row on a clean surface (no gradient):
 * a leading cadence glyph in a soft-primary well, the bold per-cycle amount
 * (integer cents → `formatMoney`) with its cadence suffix, a glyph + labelled
 * status {@link Badge} (never color alone), a frequency chip, the supported fund,
 * a next-charge hint, and pause / resume / cancel controls appropriate to the
 * status. Honors every `frequency` (weekly/monthly/quarterly/yearly) and
 * `status` (active/paused/canceled). Identical props/behavior to
 * {@link RecurringGiftRowProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export declare const RecurringGiftRowV4: React.ForwardRefExoticComponent<RecurringGiftRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RecurringGiftRowV4.d.ts.map