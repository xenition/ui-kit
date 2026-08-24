import * as React from 'react';
import type { RepresentativeCardProps } from './RepresentativeCard';
/** Same public contract as {@link RepresentativeCard} — a drop-in alternate design. */
export type RepresentativeCardV3Props = RepresentativeCardProps;
/**
 * RepresentativeCard, redesigned (v3): a **compact official row**. A small avatar,
 * the name over an office·party·district line with an in-office ✓, and a Call/Email
 * glyph pair on the right — hairline-bordered for a directory. The opposite of v2's
 * banner. Same props, token-only.
 */
export declare const RepresentativeCardV3: React.ForwardRefExoticComponent<RepresentativeCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RepresentativeCardV3.d.ts.map