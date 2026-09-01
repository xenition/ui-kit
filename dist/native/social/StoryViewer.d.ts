import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** The story's author identity shown in the top overlay. */
export interface StoryAuthor {
    /** Display name in near-white ink. */
    name: string;
    /** Avatar image URL; falls back to initials from `name`. */
    avatarUrl?: string;
}
export interface StoryViewerProps {
    /** Total number of segments (progress bars) in this story reel. */
    segments: number;
    /** Zero-based index of the segment currently playing. */
    activeIndex: number;
    /** Story author shown in the top overlay. */
    author: StoryAuthor;
    /** Relative time label for the active segment (e.g. `2h`). */
    timeLabel?: string;
    /** Full-bleed media URL for the active segment; a brand-gradient ground shows when absent. */
    imageUrl?: string;
    /** Caption overlaid near the bottom of the frame. */
    caption?: string;
    /** Placeholder for the reply field (default `Send message`). */
    replyPlaceholder?: string;
    /** Fires when the right tap-zone (advance) is pressed. */
    onNext?: () => void;
    /** Fires when the left tap-zone (rewind) is pressed. */
    onPrev?: () => void;
    /** Fires when the close (✕) affordance is pressed. */
    onClose?: () => void;
    /** Fires when the reply affordance is pressed. */
    onReply?: () => void;
    /** Optional style override for the outer container. */
    style?: StyleProp<ViewStyle>;
}
/**
 * StoryViewer — the immersive, full-screen story view for the social V4 "feed"
 * line. A full-bleed frame (the `imageUrl` under a brand-gradient scrim, or the
 * gradient itself) carries a top row of segment progress bars — played/active in
 * near-white, upcoming in a frosted track — an author header + close control in
 * near-white ink, invisible left/right tap-zones for rewind/advance, an optional
 * caption, and a frosted reply affordance. Token-only colors via `GradientSurface`
 * + `feed*` + `useXenitionTheme()` (no literals); dark-mode safe.
 */
export declare function StoryViewer({ segments, activeIndex, author, timeLabel, imageUrl, caption, replyPlaceholder, onNext, onPrev, onClose, onReply, style, }: StoryViewerProps): React.ReactElement;
//# sourceMappingURL=StoryViewer.d.ts.map