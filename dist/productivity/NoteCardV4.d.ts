import * as React from 'react';
import type { NoteCardProps } from './NoteCard';
/** Drop-in for {@link NoteCardProps} — same props, the V4 "flow" design. */
export type NoteCardV4Props = NoteCardProps;
/**
 * NoteCard — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a sticky note: a clean, softly-elevated
 * {@link Card} with a legible title and a clamped body preview. When
 * `pinned`, a soft **primary** wash + a left accent edge lift the note and a
 * pin marker appears. One primary accent, generous whitespace. Same
 * props/behavior as {@link NoteCardProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export declare const NoteCardV4: React.ForwardRefExoticComponent<NoteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NoteCardV4.d.ts.map