import * as React from 'react';
import type { MeditationSessionCardProps } from './MeditationSessionCard';
/** Same public contract as {@link MeditationSessionCard} — a drop-in alternate design. */
export type MeditationSessionCardV3Props = MeditationSessionCardProps;
/**
 * MeditationSessionCard, redesigned (v3): a **dense session line**. The category
 * glyph leads, the title over a category·duration·level line, a thin resume
 * underline, and a quiet Start/Resume (or lock) trails — hairline-bordered for a
 * library list. The opposite of v2's hero. Same props, token-only.
 */
export declare const MeditationSessionCardV3: React.ForwardRefExoticComponent<MeditationSessionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MeditationSessionCardV3.d.ts.map