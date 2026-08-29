import * as React from 'react';
import type { CardPadding, CardProps, CardRadius, CardVariant } from './Card';
export type { CardProps as CardV4Props, CardPadding, CardRadius, CardVariant };
/**
 * **V4 card** — same props as {@link Card}, a different design line.
 *
 * Three deliberate changes, and nothing else:
 *
 * 1. **A real shadow.** `elevation.card` replaces the hand-picked
 *    `shadowOpacity: 0.14` the base card carried, so depth is a seed decision
 *    made once instead of a number chosen per component — and a shadow on a
 *    dark page gets MORE opacity, not less, which the base card had no way to
 *    know.
 * 2. **A hairline that survives.** A raised surface keeps its border in V4.
 *    The base `elevated` card dropped it, which reads fine on a tinted page
 *    and dissolves entirely on a same-colour one. The edge comes from
 *    `colors.border`, which the provider has already resolved for the active
 *    scheme — unlike `tokens.ramps`, which carries the light orientation in
 *    both and would draw a near-white line on a dark page.
 * 3. **Glass, when the seed asked for it.** `depth: 'glass'` swaps the fill
 *    and the edge for the translucent pair. This is the one place a V4
 *    component reads `depth` directly: the compiler neutralises gradients and
 *    shadows for a flat seed, so those need no check, but it always builds the
 *    glass pair — a component that consumed it unconditionally would put
 *    frosted panels in an app that asked for a flat utility, which is exactly
 *    the "glassmorphism without purpose" `design.md` §8 bans.
 *
 * No card gains a gradient. §35.11 keeps that for the hero and the one primary
 * action, and a kit that tints every card is the kit §8 is describing.
 */
export declare function CardV4({ variant, padding, radius, style, children, ...rest }: CardProps): React.ReactElement;
//# sourceMappingURL=CardV4.d.ts.map