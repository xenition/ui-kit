import * as React from 'react';
import type { TeamCardProps } from './TeamCard';
/** Drop-in for {@link TeamCardProps} — same props, the V4 "broadcast" design. */
export type TeamCardV4Props = TeamCardProps;
/**
 * TeamCard — **V4** "broadcast" design. The matchday take on a team summary: an
 * elevated card with the crest, name, and league; the current rank shown as a big
 * bold numeral in a soft-primary tile; the W/D/L record and a recent-form strip
 * whose results read by letter + a11y label, never color alone. `selected`
 * promotes to an accent border and stays a pressed affordance. Same props/behavior
 * as {@link TeamCardProps}; token-only colors via `useXenitionTheme()`. `loading`
 * swaps in a token skeleton.
 */
export declare function TeamCardV4({ name, crest, league, won, drawn, lost, rank, form, variant, selected, loading, onPress, style, }: TeamCardV4Props): React.ReactElement;
//# sourceMappingURL=TeamCardV4.d.ts.map