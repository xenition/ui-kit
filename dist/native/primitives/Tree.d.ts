import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TreeNode {
    id: string;
    label: React.ReactNode;
    children?: TreeNode[];
}
export interface TreeProps {
    /** Root nodes; each may nest `children` to any depth. */
    data: TreeNode[];
    /** Node ids expanded on first render. */
    defaultExpanded?: string[];
    /** Currently selected node id (controlled highlight). */
    selectedId?: string;
    /** Fires when a node row is tapped. */
    onSelect?: (node: TreeNode) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Expandable/collapsible hierarchy view. Each level is indented by
 * `tokens.spacing.lg`; nodes with `children` show a rotating caret and toggle
 * inline (animated via `LayoutAnimation`). Selection highlights with
 * `colors.primary`; all color/spacing values come from the compiled theme
 * tokens via `useXenitionTheme()` — no literal colors.
 */
export declare function Tree({ data, defaultExpanded, selectedId, onSelect, style, }: TreeProps): React.ReactElement;
//# sourceMappingURL=Tree.d.ts.map