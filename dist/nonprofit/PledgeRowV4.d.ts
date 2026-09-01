import * as React from 'react';
import type { PledgeRowProps } from './PledgeRow';
/** Drop-in for {@link PledgeRowProps} — same props, the V4 "rally" design. */
export type PledgeRowV4Props = PledgeRowProps;
/**
 * PledgeRow — **V4** "rally" design (web parity of the native V4). An elevated,
 * rounded pledge-ledger row on a clean surface (no gradient): a leading donor
 * avatar in a soft-primary well, a bold donor name with a glyph + labelled
 * status {@link Badge} (never color alone), an optional due-date chip, a
 * trailing bold pledged amount (integer cents → `formatMoney`), and — for
 * still-open (pending/overdue) pledges — a "Mark fulfilled" action that stops
 * propagation so it does not also open the row. When `onClick` is set the whole
 * row is a keyboard-activatable `role="button"`. Identical props/behavior to
 * {@link PledgeRowProps}. All colors from `--xen-*` token classes (no literals).
 */
export declare const PledgeRowV4: React.ForwardRefExoticComponent<PledgeRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PledgeRowV4.d.ts.map