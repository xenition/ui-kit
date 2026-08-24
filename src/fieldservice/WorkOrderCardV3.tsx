import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';
import type { FieldSlot } from './internal/format';
import type { WorkOrderCardProps, WorkOrderStatus, WorkOrderPriority } from './WorkOrderCard';

/**
 * Alternate design (v3) of {@link WorkOrderCard} — a drop-in with the **same
 * props**. The *dense list line*: a leading trade glyph + a token **status
 * dot**, the title on one line with the work-order number / priority / site /
 * assignee collapsed into a muted subtitle, and a compact status badge pinned
 * to the trailing edge. Status is conveyed by the dot AND the badge's glyph +
 * label — never color alone. Renders a slim skeleton while `loading`. No
 * literal colors.
 */
export type WorkOrderCardV3Props = WorkOrderCardProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  slot: FieldSlot;
}

const STATUS: Record<WorkOrderStatus, Desc> = {
  open: { label: 'Open', glyph: '○', tone: 'neutral', slot: 'muted' },
  'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary', slot: 'primary' },
  'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn', slot: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success', slot: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral', slot: 'muted' },
};

const PRIORITY_GLYPH: Record<WorkOrderPriority, { glyph: string; label: string }> = {
  low: { glyph: '↓', label: 'Low' },
  medium: { glyph: '=', label: 'Medium' },
  high: { glyph: '↑', label: 'High' },
  emergency: { glyph: '!', label: 'Emergency' },
};

/** Solid token dot color per status slot. */
const DOT_BG: Record<FieldSlot, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  accent: 'bg-accent',
  muted: 'bg-neutral-400',
};

export const WorkOrderCardV3 = React.forwardRef<HTMLDivElement, WorkOrderCardV3Props>(
  function WorkOrderCardV3(
    { workOrderNumber, title, status, priority, assignee, site, glyph = '🔧', loading = false, onClick, className, style },
    ref
  ) {
    const sd = STATUS[status] ?? STATUS.open;
    const pd = priority ? PRIORITY_GLYPH[priority] : undefined;

    const rowBase =
      'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]';

    if (loading) {
      return (
        <div ref={ref} style={style} aria-label="Loading work order" className={cn(rowBase, className)}>
          <span className="h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-neutral-200" />
          <span className="h-3 flex-1 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      );
    }

    const interactive = onClick != null;
    const subtitle = [workOrderNumber, pd ? `${pd.glyph} ${pd.label}` : null, site, assignee]
      .filter(Boolean)
      .join('  ·  ');

    return (
      <div
        ref={ref}
        style={style}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `Work order ${workOrderNumber}, ${title}, ${sd.label}`,
              onClick,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
        className={cn(
          rowBase,
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-100 motion-reduce:transition-none',
          className
        )}
      >
        <span className="shrink-0 text-base" aria-hidden="true">
          {glyph}
        </span>
        <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', DOT_BG[sd.slot])} aria-hidden="true" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-base font-bold text-on-surface">{title}</span>
          {subtitle ? <span className="truncate text-xs text-muted">{subtitle}</span> : null}
        </div>
        <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
      </div>
    );
  }
);
