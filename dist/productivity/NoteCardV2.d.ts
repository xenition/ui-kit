import * as React from 'react';
import type { NoteCardProps } from './NoteCard';
/** Same public contract as {@link NoteCard} — a drop-in alternate design. */
export type NoteCardV2Props = NoteCardProps;
/**
 * NoteCard, redesigned (v2): a **sticky-note card**. A warm-tinted note surface with
 * a folded corner; pinned notes gain a 📌 and a primary top edge. Title, body
 * preview, labels and a timestamp stack inside. Distinct from v1. Same props,
 * token-only.
 */
export declare const NoteCardV2: React.ForwardRefExoticComponent<NoteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NoteCardV2.d.ts.map