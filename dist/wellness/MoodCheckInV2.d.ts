import * as React from 'react';
import type { MoodCheckInProps } from './MoodCheckIn';
/** Same public contract as {@link MoodCheckIn} — a drop-in alternate design. */
export type MoodCheckInV2Props = MoodCheckInProps;
/**
 * MoodCheckIn, redesigned (v2): a **big face picker**. The prompt tops a row of
 * large mood tiles (selected fills its slot tint + ring with the label), an
 * optional note field, and a Save button. Bolder than v1. Same props, token-only.
 */
export declare const MoodCheckInV2: React.ForwardRefExoticComponent<MoodCheckInProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MoodCheckInV2.d.ts.map