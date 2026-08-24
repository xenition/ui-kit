import * as React from 'react';
import type { MoodCheckInProps } from './MoodCheckIn';
/** Drop-in for {@link MoodCheckInProps} — same props, a different design. */
export type MoodCheckInV2Props = MoodCheckInProps;
/**
 * MoodCheckIn — **big face** design (v2). The chosen mood blooms as one large
 * emoji face inside a tinted circle with its label underneath; a compact
 * `radiogroup` of small faces sits below to change the selection. Optional note
 * and submit follow. Selection is announced as a radio state (not color alone)
 * and submit is disabled until a mood is picked. Same props as
 * {@link MoodCheckInProps}; token-only colors.
 */
export declare function MoodCheckInV2({ prompt, value, options, showNote, note, notePlaceholder, onChange, onNoteChange, onSubmit, submitLabel, style, }: MoodCheckInV2Props): React.ReactElement;
//# sourceMappingURL=MoodCheckInV2.d.ts.map