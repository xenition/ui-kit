import * as React from 'react';
import { type ActivityKind } from './internal';
export interface ActivityLogRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** Activity type — drives the leading glyph badge (call/email/…). */
    kind: ActivityKind;
    /** One-line summary of what happened. */
    title: string;
    /** Optional detail / note snippet. */
    detail?: string;
    /** Who performed it. */
    actor?: string;
    /** Pre-formatted timestamp (e.g. "2h ago", "Mar 4"). */
    timestamp?: string;
    /** Marks the activity as pending/incomplete (dims the row). */
    pending?: boolean;
    /** Click handler (renders as a keyboard-accessible button). */
    onClick?: () => void;
}
/**
 * One entry in an activity feed. A tinted round badge carries the activity
 * **kind** as a glyph (📞 call, ✉ email, 👥 meeting, 📝 note, ✔ task, 💰 deal)
 * paired with a `kind`-derived tone — meaning is never color-only because the
 * glyph and the accessible label both name the kind. Optional actor + timestamp
 * meta line. The badge uses `bg-neutral-100` with the tone-colored glyph — token
 * classes only. When `onClick` is set the row is a `role="button"` div.
 */
export declare const ActivityLogRow: React.ForwardRefExoticComponent<ActivityLogRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ActivityLogRow.d.ts.map