import * as React from 'react';
export type MatchCelebrationVariant = 'match' | 'superlike';
export interface MatchCelebrationPerson {
    name: string;
    photoUri?: string;
}
export interface MatchCelebrationProps {
    /** Controls the overlay. When false, nothing renders. */
    visible: boolean;
    /** The current user (left avatar). */
    you?: MatchCelebrationPerson;
    /** The matched person (right avatar). */
    match: MatchCelebrationPerson;
    /** `match` (default) or a `superlike` celebration. */
    variant?: MatchCelebrationVariant;
    /** Headline override. */
    title?: string;
    /** Fires the primary "send a message" CTA. */
    onMessage?: () => void;
    /** Fires "keep swiping" / dismiss. */
    onKeepSwiping?: () => void;
    /** Fires on backdrop/close. */
    onClose?: () => void;
    /** Message CTA label. */
    messageLabel?: string;
    /** Dismiss label. */
    keepSwipingLabel?: string;
}
/**
 * The "It's a Match!" celebration overlay — the native match modal. Presents the
 * two matched avatars with a heart between them and two clear next steps (message
 * / keep swiping). Rendered in a native `Modal` with a token-tinted scrim; the
 * dialog is announced via `accessibilityViewIsModal`. Colors derive from theme
 * tokens and `withAlpha` — no literal colors. Returns nothing when `visible` is
 * false.
 */
export declare function MatchCelebration({ visible, you, match, variant, title, onMessage, onKeepSwiping, onClose, messageLabel, keepSwipingLabel, }: MatchCelebrationProps): React.ReactElement | null;
//# sourceMappingURL=MatchCelebration.d.ts.map