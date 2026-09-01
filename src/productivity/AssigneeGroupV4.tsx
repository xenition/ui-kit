import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';
import type { AssigneeGroupProps } from './AssigneeGroup';

/** Drop-in for {@link AssigneeGroupProps} — same props, the V4 "flow" design. */
export type AssigneeGroupV4Props = AssigneeGroupProps;

/** +N overflow-chip dimensions, keyed to the avatar `size`. */
const CHIP: Record<NonNullable<AssigneeGroupProps['size']>, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-[72px] w-[72px] text-xl',
};

/**
 * AssigneeGroup — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on assignees: an overlapping stack of **bigger, softly
 * rounded** avatars each carrying a surface ring so they read cleanly against the
 * workspace, capped by a **soft-primary "+N"** overflow chip. Preserves the base
 * `max` / overflow and the muted "Unassigned" empty state. Same props/behavior
 * as {@link AssigneeGroupProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
export function AssigneeGroupV4({
  assignees,
  max = 3,
  size = 'sm',
  emptyLabel = 'Unassigned',
  className,
}: AssigneeGroupV4Props): React.ReactElement {
  const people = Array.isArray(assignees) ? assignees : [];

  if (people.length === 0) {
    return (
      <span className={cn('self-start text-xs italic text-muted', className)}>{emptyLabel}</span>
    );
  }

  const shown = people.slice(0, max);
  const extra = people.length - shown.length;

  return (
    <div className={cn('flex items-center', className)}>
      {shown.map((a, i) => (
        <span key={i} className="-ml-2 rounded-[var(--xen-radius-md)] ring-2 ring-surface first:ml-0">
          <Avatar name={a.name} src={a.src} size={size} shape="rounded" />
        </span>
      ))}
      {extra > 0 ? (
        <span
          className={cn(
            '-ml-2 inline-flex items-center justify-center rounded-[var(--xen-radius-md)]',
            'bg-primary/[0.12] font-semibold text-primary ring-2 ring-surface',
            CHIP[size]
          )}
        >
          +{extra}
        </span>
      ) : null}
    </div>
  );
}
