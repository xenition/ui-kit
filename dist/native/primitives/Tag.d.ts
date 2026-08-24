import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type TagTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export type TagVariant = 'solid' | 'soft' | 'outline';
export type TagSize = 'sm' | 'md';
export interface TagProps {
    tone?: TagTone;
    /** `solid` (default) fills the tone; `soft` tints it; `outline` rings it. */
    variant?: TagVariant;
    /** Size scale. Defaults to the historical `md`. */
    size?: TagSize;
    /** Force the remove (×) affordance even without `onRemove`. */
    removable?: boolean;
    /** Leading status dot. */
    dot?: boolean;
    /** Renders a remove (×) button that calls this. */
    onRemove?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Removable chip/tag — the native mirror of the web `Tag`. Token-bound per tone;
 * the default (`neutral`, `solid`, `md`) renders exactly as before. Additive:
 * `accent` tone, `soft`/`outline` variants, `sm` size, a leading `dot`, and a
 * `removable` flag (× also shows whenever `onRemove` is set). No literal colors.
 */
export declare function Tag({ tone, variant, size, removable, dot, onRemove, style, children, }: TagProps): React.ReactElement;
//# sourceMappingURL=Tag.d.ts.map