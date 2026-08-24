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
    /** Fires on backdrop / Escape / close. */
    onClose?: () => void;
    /** Message CTA label. */
    messageLabel?: string;
    /** Dismiss label. */
    keepSwipingLabel?: string;
}
/**
 * The "It's a Match!" celebration overlay — the web parity of the native match
 * modal. Presents the two matched avatars with a heart between them and two clear
 * next steps (message / keep swiping). The dialog is a `role="dialog"` with
 * `aria-modal`, dismissible via the token-scrim backdrop or Escape. Token classes
 * only — no literal colors. Returns nothing when `visible` is false.
 */
export declare const MatchCelebration: React.ForwardRefExoticComponent<MatchCelebrationProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchCelebration.d.ts.map