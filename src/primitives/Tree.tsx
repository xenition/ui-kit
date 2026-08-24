import * as React from 'react';
import { cn } from './cn';

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
export const Tree = React.forwardRef<HTMLUListElement, TreeProps>(function Tree(
  { className, data, defaultExpanded = [], selectedId, onSelect, ...rest },
  ref
) {
  const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);

  const toggle = (id: string): void =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const renderNodes = (nodes: TreeNode[], depth: number): React.ReactElement[] =>
    nodes.map((node) => {
      const hasChildren = (node.children?.length ?? 0) > 0;
      const isOpen = expanded.includes(node.id);
      const isSelected = selectedId != null && node.id === selectedId;
      return (
        <li key={node.id} role="none">
          <div
            role="treeitem"
            tabIndex={0}
            aria-expanded={hasChildren ? isOpen : undefined}
            aria-selected={isSelected}
            onClick={() => {
              if (hasChildren) toggle(node.id);
              onSelect?.(node);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (hasChildren) toggle(node.id);
                onSelect?.(node);
              } else if (e.key === 'ArrowRight' && hasChildren && !isOpen) {
                toggle(node.id);
              } else if (e.key === 'ArrowLeft' && hasChildren && isOpen) {
                toggle(node.id);
              }
            }}
            style={{ paddingLeft: `calc(0.5rem + ${depth} * 1rem)` }}
            className={cn(
              'flex cursor-pointer select-none items-center gap-1.5 rounded-[var(--xen-radius-sm)] py-1.5 pr-2 text-sm transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              isSelected
                ? 'bg-primary text-on-primary font-semibold'
                : 'text-on-surface hover:bg-neutral-100'
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'inline-block w-3 shrink-0 text-xs transition-transform',
                isSelected ? 'text-on-primary' : 'text-muted',
                isOpen && 'rotate-90'
              )}
            >
              {hasChildren ? '▸' : ''}
            </span>
            <span className="min-w-0 flex-1 truncate">{node.label}</span>
          </div>
          {hasChildren && isOpen ? (
            <ul role="group" className="m-0 list-none p-0">
              {renderNodes(node.children ?? [], depth + 1)}
            </ul>
          ) : null}
        </li>
      );
    });

  return (
    <ul ref={ref} role="tree" className={cn('m-0 list-none p-0', className)} {...rest}>
      {renderNodes(data, 0)}
    </ul>
  );
});
