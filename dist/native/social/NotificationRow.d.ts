import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** The kind of activity — drives the default text template and the glyph badge. */
export type NotificationKind = 'like' | 'comment' | 'follow' | 'mention' | 'repost';
/** The person who triggered the notification. */
export interface NotificationActor {
    /** Display name (shown bold at the start of the action line). */
    name: string;
    /** Avatar image; falls back to initials from `name`. */
    avatarUrl?: string;
    /** Show the primary verified tick after the name. */
    verified?: boolean;
}
export interface NotificationRowProps {
    /** Activity kind — picks the badge glyph/tint and the default action phrase. */
    kind: NotificationKind;
    /** Who triggered it (avatar + name). */
    actor: NotificationActor;
    /** Action text after the actor name; when omitted it is derived from `kind`. */
    text?: string;
    /** Relative timestamp shown muted at the end (e.g. `2h`). */
    time?: string;
    /** Unread state — adds a soft-primary row tint and a leading primary dot. */
    unread?: boolean;
    /** Thumbnail of the post the activity refers to, shown at the trailing edge. */
    thumbnailUrl?: string;
    /** Fires when the row is pressed. */
    onPress?: () => void;
    /**
     * For `kind="follow"`: whether the viewer already follows the actor back.
     * When defined (with `onFollow`) a trailing Follow/Following button replaces
     * the thumbnail.
     */
    following?: boolean;
    /** For `kind="follow"`: fires with the *next* desired state when the button is tapped. */
    onFollow?: (next: boolean) => void;
    /** Optional style override for the row container. */
    style?: StyleProp<ViewStyle>;
}
/**
 * NotificationRow — **V4** "feed" design. A single activity/notification item:
 * the actor's big avatar carries a small kind-glyph badge (❤ / 💬 / ＋ / @ / 🔁)
 * tinted by a semantic token, followed by a bold-name action line and a muted
 * time. `unread` paints a soft-primary row tint (via `withAlpha`) and a leading
 * primary dot. A trailing slot shows either the referenced post's `thumbnailUrl`
 * or — for the follow kind — a {@link FollowButton}. Presentational; token-only
 * colors via `useXenitionTheme()`. Native twin of the web `NotificationRow`.
 */
export declare function NotificationRow({ kind, actor, text, time, unread, thumbnailUrl, onPress, following, onFollow, style, }: NotificationRowProps): React.ReactElement;
//# sourceMappingURL=NotificationRow.d.ts.map