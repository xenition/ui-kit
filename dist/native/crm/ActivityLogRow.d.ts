import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ActivityKind } from './internal';
export interface ActivityLogRowProps {
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
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * One entry in an activity feed. A tinted round badge carries the activity
 * **kind** as a glyph (📞 call, ✉ email, 👥 meeting, 📝 note, ✔ task, 💰 deal)
 * paired with a `kind`-derived tone — meaning is never color-only because the
 * glyph and the accessible label both name the kind. Optional actor + timestamp
 * meta line. The badge tint uses `withAlpha` over a theme token (no literal).
 */
export declare function ActivityLogRow({ kind, title, detail, actor, timestamp, pending, onPress, testID, style, }: ActivityLogRowProps): React.ReactElement;
//# sourceMappingURL=ActivityLogRow.d.ts.map