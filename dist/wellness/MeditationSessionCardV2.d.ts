import * as React from 'react';
import type { MeditationSessionCardProps } from './MeditationSessionCard';
/** Same public contract as {@link MeditationSessionCard} — a drop-in alternate design. */
export type MeditationSessionCardV2Props = MeditationSessionCardProps;
/**
 * MeditationSessionCard, redesigned (v2): a **hero session card**. A big category
 * glyph sits in a slot-tinted disc; the title, a category·level·duration·teacher
 * line, and description follow, with a resume bar and a full-width Start CTA (or a
 * locked note). Elevated. Distinct from v1. Same props, token-only.
 */
export declare const MeditationSessionCardV2: React.ForwardRefExoticComponent<MeditationSessionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MeditationSessionCardV2.d.ts.map