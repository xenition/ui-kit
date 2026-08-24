import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type MetricTileTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';
export interface MetricTileProps {
    label: string;
    value: React.ReactNode;
    /** Optional leading icon/glyph slot. */
    icon?: React.ReactNode;
    /** Accent tone for the value; defaults to neutral (`onSurface`). */
    tone?: MetricTileTone;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A compact metric tile — a smaller, denser cousin of {@link StatCard} for grids
 * of secondary numbers. Optional accent `tone` colors the value. Pressable when
 * `onPress` is set. Token-only.
 */
export declare function MetricTile({ label, value, icon, tone, onPress, style, }: MetricTileProps): React.ReactElement;
//# sourceMappingURL=MetricTile.d.ts.map