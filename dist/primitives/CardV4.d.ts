import * as React from 'react';
import type { CardPadding, CardProps, CardRadius, CardVariant } from './Card';
export type { CardProps as CardV4Props, CardPadding, CardRadius, CardVariant };
/**
 * **V4 card** — the web twin of the native `CardV4`, same props as
 * {@link Card}, a different design line.
 *
 * Three deliberate changes, and nothing else:
 *
 * 1. **A real shadow.** `elevation.card` replaces Tailwind's `shadow-sm` /
 *    `shadow-md`, so depth is a seed decision made once — and a shadow on a
 *    dark page gets MORE opacity, not less, which a fixed utility class cannot
 *    express.
 * 2. **A hairline that survives.** A raised surface keeps its border in V4;
 *    dropping it reads fine on a tinted page and dissolves on a same-colour
 *    one. `border-border` is re-derived per scheme by the provider, so the
 *    edge holds in dark as well as light.
 * 3. **Glass, when the seed asked for it.** `depth: 'glass'` swaps the fill
 *    and the edge for the translucent pair and turns on a real
 *    `backdrop-filter`. This is the one place a V4 component reads `depth`
 *    directly: the compiler neutralises gradients and shadows for a flat seed,
 *    but it always builds the glass pair — a component that used it
 *    unconditionally would frost an app that asked for a flat utility, which
 *    is the "glassmorphism without purpose" `design.md` §8 bans.
 *
 * No card gains a gradient. §35.11 keeps that for the hero and the one primary
 * action, and a kit that tints every card is the kit §8 is describing.
 */
export declare const CardV4: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CardV4.d.ts.map