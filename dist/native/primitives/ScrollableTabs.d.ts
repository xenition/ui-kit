import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ScrollableTabItem {
    value: string;
    label: React.ReactNode;
    /** Optional count/notification chip shown after the label. */
    badge?: React.ReactNode;
}
export interface ScrollableTabsProps {
    items: ScrollableTabItem[];
    value: string;
    onValueChange: (value: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontally scrollable tab bar for when there are more tabs than fit the
 * viewport (the base `Tabs` is a fixed non-scrolling row). Each tab is a
 * `Pressable` inside a horizontal `ScrollView`, with a token-bound active
 * underline and an optional trailing badge. All colors and spacing come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors.
 */
export declare function ScrollableTabs({ items, value, onValueChange, style, }: ScrollableTabsProps): React.ReactElement;
//# sourceMappingURL=ScrollableTabs.d.ts.map