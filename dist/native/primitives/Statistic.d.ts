import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type StatisticTrend = 'up' | 'down' | 'flat';
export interface StatisticProps {
    /** Small caption above the value. */
    label: React.ReactNode;
    /** The headline number/string. */
    value: React.ReactNode;
    /** Optional change indicator shown beside the value. */
    delta?: string | number;
    /**
     * Tone/arrow for `delta`. Omit to infer from a numeric `delta`
     * (positive → up/success, negative → down/danger, 0 → flat/muted).
     */
    trend?: StatisticTrend;
    /** Optional unit/suffix rendered muted after the value (e.g. `%`, `MB`). */
    suffix?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Compact inline metric: caption label, a large token-scaled value, and an
 * optional up/down/flat delta. Not a card — it renders bare so it can sit in
 * rows, headers, or grids. Delta tone maps to `colors.success` / `colors.danger`
 * / `colors.muted`. All colors and sizes come from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors.
 */
export declare function Statistic({ label, value, delta, trend, suffix, style, }: StatisticProps): React.ReactElement;
//# sourceMappingURL=Statistic.d.ts.map