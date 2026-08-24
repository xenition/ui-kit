import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ScreenTimeBarProps {
    /** Minutes (or `unit`s) used so far. */
    used: number;
    /** Daily limit. `<= 0` renders a "no limit set" state. */
    limit: number;
    /** Unit suffix for the readout. */
    unit?: string;
    /** Section label. */
    label?: string;
    /** Loading placeholder state. */
    loading?: boolean;
    /** Copy shown when no limit is configured. */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Screen-time usage against a daily limit: a labelled readout plus a progress
 * bar that shifts tone as usage climbs (primary → warn near the cap → danger
 * once over). The over/near state is conveyed in the readout text + a11y label,
 * not by color alone. Renders a "no limit set" state when `limit <= 0`. Bar and
 * text colors are `SemanticColors` tokens — no literals.
 */
export declare function ScreenTimeBar({ used, limit, unit, label, loading, emptyLabel, style, }: ScreenTimeBarProps): React.ReactElement;
//# sourceMappingURL=ScreenTimeBar.d.ts.map