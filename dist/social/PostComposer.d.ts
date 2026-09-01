import * as React from 'react';
export interface PostComposerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Composing author's avatar URL; falls back to initials from `authorName`. */
    authorAvatarUrl?: string;
    /** Composing author's name (initials fallback + avatar a11y label). */
    authorName?: string;
    /** Current draft text (controlled). */
    value: string;
    /** Fires with the next draft text on every keystroke. */
    onChangeText: (text: string) => void;
    /** Alias for {@link onChangeText}; fires with the raw change event. */
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /** Field placeholder (default `What's on your mind?`). */
    placeholder?: string;
    /** Fires when the primary Post CTA is pressed. */
    onPost?: () => void;
    /** When `true`, the Post CTA shows a busy state and is disabled. */
    posting?: boolean;
    /** Hard character cap; drives the counter + danger state + disabled Post. */
    maxLength?: number;
    /** Fires when the add-photo action glyph is pressed. */
    onAddPhoto?: () => void;
    /** Fires when the add-poll action glyph is pressed. */
    onAddPoll?: () => void;
    /** Fires when the add-emoji action glyph is pressed. */
    onAddEmoji?: () => void;
}
/**
 * PostComposer — the compose-a-post card for the social V4 "feed" line. A clean
 * surface card pairs the author avatar with a growing text field, a row of
 * soft-primary action glyph buttons (photo / poll / emoji), a live character
 * counter that flips to danger when over `maxLength`, and a primary Post CTA that
 * disables while empty, over the limit, or `posting`. Presentational only —
 * controlled `value` + callbacks. Token-only colors via `--xen-*` classes; the
 * ≥44px controls stay keyboard-operable and dark-mode safe.
 */
export declare const PostComposer: React.ForwardRefExoticComponent<PostComposerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PostComposer.d.ts.map