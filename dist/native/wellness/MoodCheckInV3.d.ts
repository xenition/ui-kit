import * as React from 'react';
import type { MoodCheckInProps } from './MoodCheckIn';
/** Drop-in for {@link MoodCheckInProps} — same props, a different design. */
export type MoodCheckInV3Props = MoodCheckInProps;
/**
 * MoodCheckIn — **compact face row** design (v3). A tight single line: the prompt
 * on the left and a snug `radiogroup` of small emoji faces on the right, the
 * chosen face lit as a tinted pill with its label revealed inline. Optional note
 * and submit follow underneath. Selection is announced as a radio state (not
 * color alone) and submit is disabled until a mood is picked. Same props as
 * {@link MoodCheckInProps}; token-only colors.
 */
export declare function MoodCheckInV3({ prompt, value, options, showNote, note, notePlaceholder, onChange, onNoteChange, onSubmit, submitLabel, style, }: MoodCheckInV3Props): React.ReactElement;
//# sourceMappingURL=MoodCheckInV3.d.ts.map