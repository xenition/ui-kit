import * as React from 'react';
export interface TreeNode {
    id: string;
    label: React.ReactNode;
    children?: TreeNode[];
}
export interface TreeProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
    /** Root nodes; each may nest `children` to any depth. */
    data: TreeNode[];
    /** Node ids expanded on first render. */
    defaultExpanded?: string[];
    /** Currently selected node id (controlled highlight). */
    selectedId?: string;
    /** Fires when a node row is clicked. */
    onSelect?: (node: TreeNode) => void;
}
/**
 * Web parity of the native `Tree`: an expandable/collapsible hierarchy. Uses the
 * real ARIA `tree`/`treeitem`/`group` roles (valid on web, unlike RN). Nodes with
 * `children` show a rotating caret and toggle inline; the selected row highlights
 * with the `primary` token. All colors/radii/spacing come from the `--xen-*`
 * tokens via Tailwind classes — no literal colors.
 */
export declare const Tree: React.ForwardRefExoticComponent<TreeProps & React.RefAttributes<HTMLUListElement>>;
//# sourceMappingURL=Tree.d.ts.map