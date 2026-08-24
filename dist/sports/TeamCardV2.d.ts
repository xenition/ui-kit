import * as React from 'react';
import type { TeamCardProps } from './TeamCard';
/** Same public contract as {@link TeamCard} — a drop-in alternate design. */
export type TeamCardV2Props = TeamCardProps;
/**
 * TeamCard, redesigned (v2): a **banner team card**. A primary-tinted header holds
 * the crest, name, league and a rank chip; a W-D-L strip and a form streak of
 * pills sit beneath. Bolder than v1's row. Same props, token-only.
 */
export declare const TeamCardV2: React.ForwardRefExoticComponent<TeamCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TeamCardV2.d.ts.map