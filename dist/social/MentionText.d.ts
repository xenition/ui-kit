import * as React from 'react';
/** Semantic color slots that map to a `text-*` token class. Mirrors the native `SemanticColors` keys. */
export type MentionColor = 'surface' | 'onSurface' | 'primary' | 'onPrimary' | 'accent' | 'onAccent' | 'muted' | 'border' | 'success' | 'onSuccess' | 'warn' | 'onWarn' | 'danger' | 'onDanger';
type TypeScaleKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export interface MentionTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
    /** Raw body text. `@handles` and `#hashtags` are auto-highlighted. */
    text: string;
    /** Base color slot for plain text. Default `'onSurface'`. */
    color?: MentionColor;
    /** Highlight color slot for mentions/hashtags/links. Default `'primary'`. */
    linkColor?: MentionColor;
    /** Font size from the typography scale. Default `'base'`. */
    size?: TypeScaleKey;
    /** Clamp to N lines. */
    numberOfLines?: number;
    /** Fired with the bare handle (no `@`) when a mention is clicked. */
    onPressMention?: (handle: string) => void;
    /** Fired with the bare tag (no `#`) when a hashtag is clicked. */
    onPressHashtag?: (tag: string) => void;
}
type Segment = {
    kind: 'text' | 'mention' | 'hashtag';
    value: string;
};
/** Split a string into plain / @mention / #hashtag segments (order preserved). */
export declare function parseMentions(text: string): Segment[];
/**
 * Rich body text that highlights `@mentions` and `#hashtags` in the theme's
 * link color and makes each clickable. Everything else renders in the base
 * color. Web parity of the native `MentionText` — token-only, no literal colors.
 * Mentions/hashtags become inline `<button>`s only when a handler is supplied,
 * otherwise plain (non-interactive) spans.
 */
export declare const MentionText: React.ForwardRefExoticComponent<MentionTextProps & React.RefAttributes<HTMLSpanElement>>;
export {};
//# sourceMappingURL=MentionText.d.ts.map