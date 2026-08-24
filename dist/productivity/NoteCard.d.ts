import * as React from 'react';
export interface NoteCardProps {
    /** Note title / heading. */
    title: string;
    /** Body preview text (clamped to a few lines). */
    body?: string;
    /** Pre-formatted timestamp (e.g. `'2h ago'`). */
    timestamp?: string;
    /** Shows a pin marker and a primary accent edge. */
    pinned?: boolean;
    /** Optional trailing slot — e.g. a row of {@link LabelChip}s. */
    labels?: React.ReactNode;
    /** Fires when the card is clicked. */
    onClick?: () => void;
    className?: string;
}
/**
 * A note preview built on the primitive {@link Card}: title, a clamped body,
 * a footer timestamp, an optional pin marker (primary), and a labels slot. When
 * `pinned`, a left accent edge in the primary token highlights it. Web parity of
 * the native `NoteCard` (`onPress` → `onClick`). No literal colors.
 */
export declare const NoteCard: React.ForwardRefExoticComponent<NoteCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=NoteCard.d.ts.map