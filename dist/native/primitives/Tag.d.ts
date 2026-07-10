import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type TagTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface TagProps {
    tone?: TagTone;
    /** Renders a remove (×) button that calls this. */
    onRemove?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Removable chip/tag — the native mirror of the web `Tag`. Token-bound
 * background/foreground per tone; an optional `onRemove` renders a × button.
 * For filters, keywords, multi-select values. No literal colors.
 */
export declare function Tag({ tone, onRemove, style, children }: TagProps): React.ReactElement;
//# sourceMappingURL=Tag.d.ts.map