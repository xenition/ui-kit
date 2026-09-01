import * as React from 'react';
import type { NoteCardProps } from './NoteCard';
/** Drop-in for {@link NoteCardProps} — same props, the V4 "flow" design. */
export type NoteCardV4Props = NoteCardProps;
/**
 * NoteCard — **V4** "flow" design. The focused-workspace take on a sticky
 * note: a clean, softly-elevated {@link Card} with a legible title and a
 * clamped body preview. When `pinned`, a soft **primary** wash + a left accent
 * edge lift the note and a pin marker appears. One primary accent, generous
 * whitespace. Same props/behavior as {@link NoteCardProps}; token-only colors
 * via `useXenitionTheme()`.
 */
export declare function NoteCardV4({ title, body, timestamp, pinned, labels, onPress, style, }: NoteCardV4Props): React.ReactElement;
//# sourceMappingURL=NoteCardV4.d.ts.map