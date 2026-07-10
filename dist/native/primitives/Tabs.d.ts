import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TabItem {
    value: string;
    label: React.ReactNode;
}
export interface TabsProps {
    items: TabItem[];
    value: string;
    onValueChange: (value: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed tab bar (controlled) — the native mirror of the web `Tabs`. A row of
 * `Pressable` tabs with a token-bound active underline; render the active panel
 * yourself based on `value`. No literal colors.
 */
export declare function Tabs({ items, value, onValueChange, style }: TabsProps): React.ReactElement;
//# sourceMappingURL=Tabs.d.ts.map