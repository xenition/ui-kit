import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type OrgChartNodeVariant = 'default' | 'compact' | 'highlighted';
export interface OrgChartNodeProps {
    /** Person's name. */
    name: string;
    /** Job title / role. */
    title?: string;
    /** Avatar image URL (initials fallback otherwise). */
    avatarUrl?: string;
    /** Department / team label. */
    department?: string;
    /** Number of direct reports — shown as a count when > 0. */
    directReports?: number;
    /** Depth in the tree; indents the node by this many levels. */
    depth?: number;
    /** Whether this node has children that can be toggled. */
    expandable?: boolean;
    /** Current expand state (controlled). */
    expanded?: boolean;
    /** Marks the focused person (tints the surface). */
    variant?: OrgChartNodeVariant;
    /** Fires with the next expanded value when the disclosure is tapped. */
    onToggle?: (expanded: boolean) => void;
    /** Tap handler for the node body. */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single node in a reporting hierarchy: avatar, name, title, and an optional
 * direct-report count. `depth` indents the node with a token-derived rail so a
 * flat list of nodes reads as a tree; `expandable` adds a disclosure toggle for
 * collapsing a manager's reports. `highlighted` tints the surface for the
 * focused person. Managers are flagged by a "N reports" count (a word, not
 * color). All colors are theme tokens — no literals.
 */
export declare function OrgChartNode({ name, title, avatarUrl, department, directReports, depth, expandable, expanded, variant, onToggle, onPress, testID, style, }: OrgChartNodeProps): React.ReactElement;
//# sourceMappingURL=OrgChartNode.d.ts.map