import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TabItem {
    value: string;
    label: React.ReactNode;
}
export interface TabsProps {
    items: TabItem[];
    value: string;
    /**
     * Fires with the value of the tab that was pressed. Prefer `onChange` — that
     * is the kit's one canonical name for "the value changed". `onValueChange` is
     * this component's original spelling, kept so existing callers keep working;
     * if both are passed this one wins. One of the two is required in practice —
     * both are optional in the type so either spelling satisfies it on its own.
     */
    onValueChange?: (value: string) => void;
    /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
    onChange?: (value: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed tab bar (controlled) — the native mirror of the web `Tabs`. A row of
 * `Pressable` tabs with a token-bound active underline; render the active panel
 * yourself based on `value`. No literal colors.
 */
export declare function Tabs({ items, value, onValueChange, onChange, style, }: TabsProps): React.ReactElement;
//# sourceMappingURL=Tabs.d.ts.map