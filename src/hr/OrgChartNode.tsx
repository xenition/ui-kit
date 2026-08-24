import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar } from '../primitives';

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
export const OrgChartNode = React.forwardRef<HTMLDivElement, OrgChartNodeProps>(function OrgChartNode(
  {
    name,
    title,
    avatarUrl,
    department,
    directReports = 0,
    depth = 0,
    expandable = false,
    expanded = false,
    variant = 'default',
    onToggle,
    onClick,
    className,
  },
  ref
) {
  const compact = variant === 'compact';
  const highlighted = variant === 'highlighted';
  const level = Math.max(0, Math.floor(depth));
  const isManager = directReports > 0;
  const interactive = onClick != null;

  return (
    <div ref={ref} className={cn('flex items-stretch', className)}>
      {level > 0 ? (
        <div className="flex justify-end" style={{ width: level * 24 }} aria-hidden="true">
          <div className="w-px bg-border" />
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <Card
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-label={interactive ? `Org node ${name}` : undefined}
          onClick={interactive ? onClick : undefined}
          onKeyDown={
            interactive
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                  }
                }
              : undefined
          }
          className={cn(
            'flex items-center gap-3',
            highlighted && 'border-primary bg-primary-50',
            interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
          )}
        >
          <Avatar size={compact ? 'sm' : 'md'} name={name} src={avatarUrl} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{name}</p>
            {title ? (
              <p className="truncate text-sm text-muted">
                {title}
                {department ? ` · ${department}` : ''}
              </p>
            ) : null}
          </div>
          {isManager ? (
            <span className="shrink-0 text-xs font-semibold text-muted">
              {directReports} report{directReports === 1 ? '' : 's'}
            </span>
          ) : null}
          {expandable ? (
            <button
              type="button"
              aria-label={`${expanded ? 'Collapse' : 'Expand'} ${name}`}
              aria-expanded={expanded}
              onClick={(e) => {
                e.stopPropagation();
                onToggle?.(!expanded);
              }}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] text-on-surface hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span aria-hidden="true">{expanded ? '▾' : '▸'}</span>
            </button>
          ) : null}
        </Card>
      </div>
    </div>
  );
});
