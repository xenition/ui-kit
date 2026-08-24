import * as React from 'react';
import type { TeamCardProps } from './TeamCard';
/** Drop-in replacement for {@link TeamCardProps} — identical shape. */
export type TeamCardV3Props = TeamCardProps;
/**
 * TeamCard, design variant 3 — a **compact row**. A crest disc leads, the name
 * and league stack in the middle, and the rank plus a small form-dot strip trail
 * on the right. Sized for tight lists and pickers. Results read by letter +
 * a11y label, not color alone. Same props as `TeamCard`; token-pure, reduced
 * -motion press scale.
 */
export declare function TeamCardV3({ name, crest, league, won, drawn, lost, rank, form, selected, loading, onPress, style, }: TeamCardV3Props): React.ReactElement;
//# sourceMappingURL=TeamCardV3.d.ts.map