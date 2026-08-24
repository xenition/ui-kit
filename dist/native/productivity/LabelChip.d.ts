import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Color-coded label tone (folders, categories, tags). */
export type LabelTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface LabelChipProps {
    /** Chip text. */
    label: string;
    /** Semantic tone for the leading dot + subtle background. */
    tone?: LabelTone;
    /** Renders a remove (×) button that calls this. */
    onRemove?: () => void;
    /** Makes the whole chip pressable (e.g. to filter). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Outlined, color-coded label chip — a token-bound accent dot plus text on a
 * surface background, with optional press + remove affordances. The dot tone
 * traces to a `SemanticColors` slot. No literal colors.
 */
export declare function LabelChip({ label, tone, onRemove, onPress, style }: LabelChipProps): React.ReactElement;
//# sourceMappingURL=LabelChip.d.ts.map