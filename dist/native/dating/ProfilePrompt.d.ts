import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ProfilePromptVariant = 'card' | 'quote' | 'plain';
export interface ProfilePromptProps {
    /** The prompt question (e.g. "A perfect Sunday is…"). */
    prompt: string;
    /** The person's answer. When absent, the placeholder/empty copy shows. */
    answer?: string;
    /** Presentation. Defaults to `card`. */
    variant?: ProfilePromptVariant;
    /** Optional glyph beside the prompt. */
    glyph?: string;
    /** Show a like affordance on the answer (dating "like this prompt"). */
    liked?: boolean;
    /** Fires when the whole prompt is tapped (e.g. to like/comment). */
    onPress?: () => void;
    /** Fires the heart affordance. Rendering it requires this handler. */
    onLike?: () => void;
    /** Copy when there is no answer yet. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A profile prompt + answer block — the native mirror of a dating "prompt" card
 * ("My simple pleasures → …"). The prompt is styled quietly, the answer is the
 * emphasis. Optional tap-to-like affordance surfaces its pressed state through
 * `accessibilityState.selected`, not color. Colors come from theme tokens and
 * `withAlpha` tints — no literal colors. Renders a graceful empty state when the
 * answer is missing.
 */
export declare function ProfilePrompt({ prompt, answer, variant, glyph, liked, onPress, onLike, emptyLabel, style, }: ProfilePromptProps): React.ReactElement;
//# sourceMappingURL=ProfilePrompt.d.ts.map