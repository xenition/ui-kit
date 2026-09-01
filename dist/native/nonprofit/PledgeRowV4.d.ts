import * as React from 'react';
import type { PledgeRowProps } from './PledgeRow';
/** Drop-in for {@link PledgeRowProps} — same props, the V4 "rally" design. */
export type PledgeRowV4Props = PledgeRowProps;
/**
 * PledgeRow — **V4** "rally" design. An elevated, rounded pledge-ledger row on a
 * clean surface (no gradient): a leading donor avatar in a soft-primary well, a
 * bold donor name with a glyph + labelled status {@link Badge} (never color
 * alone), an optional due-date chip, a trailing bold pledged amount (integer
 * cents → `formatMoney`), and — for still-open (pending/overdue) pledges — a
 * "Mark fulfilled" action. The whole row is pressable via `onPress`. Identical
 * props/behavior to {@link PledgeRowProps}. Token-only colors via
 * `useXenitionTheme()`.
 */
export declare function PledgeRowV4({ donorName, avatarUrl, amountCents, currency, status, dueLabel, onFulfill, onPress, loading, style, }: PledgeRowV4Props): React.ReactElement;
//# sourceMappingURL=PledgeRowV4.d.ts.map