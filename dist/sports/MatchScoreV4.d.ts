import * as React from 'react';
import type { MatchScoreProps } from './MatchScore';
/** Drop-in for {@link MatchScoreProps} — same props, the V4 "broadcast" design. */
export type MatchScoreV4Props = MatchScoreProps;
/**
 * MatchScore — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a scoreline: an elevated card with a soft-tint status pill (a
 * pulsing danger dot reinforces "LIVE" — never color alone) and bold score
 * numerals; the `feature` variant becomes a full brand-gradient hero with
 * near-white ink. Same props/behavior as {@link MatchScoreProps}; all colors
 * from `--xen-*` token classes (no literals). `loading` swaps in a token skeleton.
 */
export declare const MatchScoreV4: React.ForwardRefExoticComponent<MatchScoreProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchScoreV4.d.ts.map