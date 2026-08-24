import * as React from 'react';
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
    /** Fires with the next expanded value when the disclosure is clicked. */
    onToggle?: (expanded: boolean) => void;
    /** Click handler for the node body (web parity of native `onPress`). */
    onClick?: () => void;
    className?: string;
}
/**
 * A single node in a reporting hierarchy: avatar, name, title, and an optional
 * direct-report count. `depth` indents the node with a token-bound rail so a
 * flat list reads as a tree; `expandable` adds a disclosure toggle. `highlighted`
 * tints the surface for the focused person. Managers are flagged by an "N
 * reports" count (a word, not color). All colors are `--xen-*` token classes —
 * no literals. `forwardRef` to the root `<div>`.
 */
export declare const OrgChartNode: React.ForwardRefExoticComponent<OrgChartNodeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OrgChartNode.d.ts.map