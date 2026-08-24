import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface QuickAction {
    key: string;
    label: string;
    /** Optional glyph/icon slot rendered above the label. */
    icon?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
}
export interface QuickActionsProps {
    actions: QuickAction[];
    /** Optional section heading. */
    title?: string;
    /** Number of columns in the grid. */
    columns?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A grid of labelled quick-action buttons — the shortcut launcher on a
 * dashboard home. Each tile is a square-ish token-bound button with an optional
 * icon above the label. Token-only.
 */
export declare function QuickActions({ actions, title, columns, style, }: QuickActionsProps): React.ReactElement;
//# sourceMappingURL=QuickActions.d.ts.map