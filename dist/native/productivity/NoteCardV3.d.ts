import * as React from 'react';
import type { NoteCardProps } from './NoteCard';
/** Same public contract as {@link NoteCard} — a drop-in alternate design. */
export type NoteCardV3Props = NoteCardProps;
/**
 * NoteCard, redesigned (v3): a **dense note line**. A pin dot (when pinned), the
 * title over a body-preview·timestamp subtitle, and labels folded in — a hairline
 * row for a notes list. The opposite of v2's sticky note. Same props, token-only.
 */
export declare function NoteCardV3({ title, body, timestamp, pinned, labels, onPress, appearance, style }: NoteCardV3Props): React.ReactElement;
//# sourceMappingURL=NoteCardV3.d.ts.map