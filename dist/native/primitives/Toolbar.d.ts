import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ToolbarAction {
    key: string;
    label: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    /** Tint the label with `colors.danger` (destructive). */
    destructive?: boolean;
}
export interface ToolbarProps {
    /** Optional leading title. */
    title?: React.ReactNode;
    /** Inline action buttons (left→right). */
    actions?: ToolbarAction[];
    /** Actions collapsed behind a `⋯` overflow toggle. */
    overflowActions?: ToolbarAction[];
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontal action bar: an optional title, a row of inline action buttons, and
 * an optional `⋯` overflow that reveals extra actions in an inline panel below.
 * All colors, radii and spacing come from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors.
 */
export declare function Toolbar({ title, actions, overflowActions, style, }: ToolbarProps): React.ReactElement;
//# sourceMappingURL=Toolbar.d.ts.map