import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface Liker {
    id: string;
    name?: string;
    photoUri?: string;
    /** Super-liked you (highlighted). */
    superLiked?: boolean;
}
export interface WhoLikedYouRowProps {
    /** People who liked the user. */
    likers?: Liker[];
    /** Total count (may exceed the loaded `likers`). Defaults to `likers.length`. */
    total?: number;
    /** Obscure faces behind an "unlock" scrim (premium gate). Defaults to true. */
    locked?: boolean;
    /** Section heading. */
    title?: string;
    /** Fires when a specific liker is tapped (only when unlocked). */
    onPressLiker?: (id: string) => void;
    /** Fires when the locked row / "see all" is tapped (upsell). */
    onUnlock?: () => void;
    /** Loading skeleton. */
    loading?: boolean;
    /** Copy when nobody has liked yet. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontal "who liked you" strip — the native likes row. Shows a scrollable
 * rail of liker avatars with a total count pill; when `locked` (a premium gate)
 * the faces sit behind a token scrim and the whole rail becomes an unlock CTA
 * instead of exposing identities. Handles loading and empty states. Colors are
 * token-derived via `withAlpha` — no literal colors. Lock state is announced in
 * the a11y label, never by color alone.
 */
export declare function WhoLikedYouRow({ likers, total, locked, title, onPressLiker, onUnlock, loading, emptyLabel, style, }: WhoLikedYouRowProps): React.ReactElement;
//# sourceMappingURL=WhoLikedYouRow.d.ts.map