import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SegmentedOption {
    label: React.ReactNode;
    value: string;
}
export interface SegmentedProps {
    options: SegmentedOption[];
    value: string;
    onChange: (value: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Segmented control (pill toggle group) — the native mirror of the web
 * `Segmented`. A token-bound track holds pressable pills; the active pill lifts
 * onto the surface color. No literal colors.
 */
export declare function Segmented({ options, value, onChange, style }: SegmentedProps): React.ReactElement;
//# sourceMappingURL=Segmented.d.ts.map