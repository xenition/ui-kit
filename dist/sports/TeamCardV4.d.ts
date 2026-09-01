import * as React from 'react';
import type { TeamCardProps } from './TeamCard';
/** Drop-in for {@link TeamCardProps} — same props, the V4 "broadcast" design. */
export type TeamCardV4Props = TeamCardProps;
/**
 * TeamCard — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a team summary: an elevated card with the crest, name, and
 * league; the current rank shown as a big bold numeral in a soft-primary tile; the
 * W/D/L record and a recent-form strip whose results read by letter + a11y label,
 * never color alone. `selected` promotes to an accent border and stays a pressed
 * affordance. Same props/behavior as {@link TeamCardProps}; all colors from
 * `--xen-*` token classes (no literals). `loading` swaps in a token skeleton.
 */
export declare const TeamCardV4: React.ForwardRefExoticComponent<TeamCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TeamCardV4.d.ts.map