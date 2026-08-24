import * as React from 'react';
import { type StyleProp, type TextStyle } from 'react-native';
import { type SemanticColors } from '../theme';
type TypeScaleKey = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
export interface MentionTextProps {
    /** Raw body text. `@handles` and `#hashtags` are auto-highlighted. */
    text: string;
    /** Base color slot for plain text. Default `'onSurface'`. */
    color?: keyof SemanticColors;
    /** Highlight color slot for mentions/hashtags/links. Default `'primary'`. */
    linkColor?: keyof SemanticColors;
    /** Font size from the typography scale. Default `'base'`. */
    size?: TypeScaleKey;
    /** Clamp to N lines. */
    numberOfLines?: number;
    /** Fired with the bare handle (no `@`) when a mention is tapped. */
    onPressMention?: (handle: string) => void;
    /** Fired with the bare tag (no `#`) when a hashtag is tapped. */
    onPressHashtag?: (tag: string) => void;
    style?: StyleProp<TextStyle>;
}
type Segment = {
    kind: 'text' | 'mention' | 'hashtag';
    value: string;
};
/** Split a string into plain / @mention / #hashtag segments (order preserved). */
export declare function parseMentions(text: string): Segment[];
/**
 * Rich body text that highlights `@mentions` and `#hashtags` in the theme's
 * link color and makes each tappable. Everything else renders in the base
 * color. Pure `Text` composition (so it wraps/clamps naturally); token-only.
 */
export declare function MentionText({ text, color, linkColor, size, numberOfLines, onPressMention, onPressHashtag, style, }: MentionTextProps): React.ReactElement;
export {};
//# sourceMappingURL=MentionText.d.ts.map