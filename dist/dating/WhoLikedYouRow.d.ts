import * as React from 'react';
export interface Liker {
    id: string;
    name?: string;
    photoUri?: string;
    /** Super-liked you (highlighted). */
    superLiked?: boolean;
}
export interface WhoLikedYouRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** People who liked the user. */
    likers?: Liker[];
    /** Total count (may exceed the loaded `likers`). Defaults to `likers.length`. */
    total?: number;
    /** Obscure faces behind an "unlock" scrim (premium gate). Defaults to true. */
    locked?: boolean;
    /** Section heading. */
    title?: string;
    /** Fires when a specific liker is clicked (only when unlocked). */
    onClickLiker?: (id: string) => void;
    /** Fires when the locked row / "see all" is clicked (upsell). */
    onUnlock?: () => void;
    /** Loading skeleton. */
    loading?: boolean;
    /** Copy when nobody has liked yet. */
    emptyLabel?: string;
}
/**
 * Horizontal "who liked you" strip — the web parity of the native likes row.
 * Shows a scrollable rail of liker avatars with a total count pill; when `locked`
 * (a premium gate) the faces sit behind a token scrim and each tile becomes an
 * unlock CTA instead of exposing identities. Handles loading and empty states.
 * Token classes only; lock state is announced in the a11y label, never by color.
 */
export declare const WhoLikedYouRow: React.ForwardRefExoticComponent<WhoLikedYouRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WhoLikedYouRow.d.ts.map