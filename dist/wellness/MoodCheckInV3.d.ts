import * as React from 'react';
import type { MoodCheckInProps } from './MoodCheckIn';
/** Same public contract as {@link MoodCheckIn} — a drop-in alternate design. */
export type MoodCheckInV3Props = MoodCheckInProps;
/**
 * MoodCheckIn, redesigned (v3): a **compact inline check-in**. The prompt, a tight
 * row of small mood glyphs (selected ringed), and a quiet Save button — sized for
 * a widget or list. The note field is folded away. The opposite of v2's big
 * tiles. Same props, token-only.
 */
export declare const MoodCheckInV3: React.ForwardRefExoticComponent<MoodCheckInProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MoodCheckInV3.d.ts.map