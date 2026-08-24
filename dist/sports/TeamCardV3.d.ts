import * as React from 'react';
import type { TeamCardProps } from './TeamCard';
/** Same public contract as {@link TeamCard} — a drop-in alternate design. */
export type TeamCardV3Props = TeamCardProps;
/**
 * TeamCard, redesigned (v3): a **compact team row**. A rank number, crest, name
 * over a league·record line, and a small form streak on the right — hairline-
 * bordered for a teams list. The opposite of v2's banner. Same props, token-only.
 */
export declare const TeamCardV3: React.ForwardRefExoticComponent<TeamCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TeamCardV3.d.ts.map