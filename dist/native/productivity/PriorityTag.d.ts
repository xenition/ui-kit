import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Task priority levels, low → urgent. */
export type PriorityLevel = 'low' | 'med' | 'high' | 'urgent';
export interface PriorityTagProps {
    /** Priority level to render. */
    level: PriorityLevel;
    /** Custom label; defaults to a capitalized level name. */
    label?: string;
    /** Dot-only mode (no text) — for dense rows. */
    dotOnly?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * Small priority pill — a token-bound background/foreground per level, with a
 * `dotOnly` mode that collapses to a colored dot for dense task rows. Every
 * color traces to a `SemanticColors` slot. No literal colors.
 */
export declare function PriorityTag({ level, label, dotOnly, style }: PriorityTagProps): React.ReactElement;
//# sourceMappingURL=PriorityTag.d.ts.map