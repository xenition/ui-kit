import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type WordmarkSize = 'sm' | 'md' | 'lg';
export interface WordmarkProps {
    /** Brand name rendered bold in the heading weight. */
    name: string;
    /**
     * Leading logomark slot. Omit for the default themed token square; pass a
     * node to override, or `null` to render the name alone.
     */
    mark?: React.ReactNode;
    /** Type + mark scale (default `md`). */
    size?: WordmarkSize;
    /** When set, the wordmark becomes pressable (the native swap for `as="a"`). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed brand wordmark — the native mirror of the web `Wordmark`. A token
 * logomark square (primary, rounded) plus the name in bold `onSurface`. Native
 * headings convey the heading font via weight (no `fontFamily`), matching every
 * other native marketing/primitive component. Pass `onPress` to make it a
 * tappable header brand; omit for a static label. Token-only — no literal
 * colors.
 */
export declare function Wordmark({ name, mark, size, onPress, style, }: WordmarkProps): React.ReactElement;
//# sourceMappingURL=Wordmark.d.ts.map