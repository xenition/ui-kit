import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Icon } from '../primitives';

/** Priority of a shot-list entry. */
export type ShotPriority = 'must' | 'nice' | 'optional';

const PRIORITY_LABEL: Record<ShotPriority, string> = {
  must: 'Must-have',
  nice: 'Nice-to-have',
  optional: 'Optional',
};

export interface ShotListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** The shot description (e.g. "Bride & groom first look"). */
  title: string;
  /** Notes / setup line (pose, lens, lighting). */
  notes?: string;
  /** Whether the shot has been captured. */
  done?: boolean;
  /** Priority tag (shown as a labelled badge). */
  priority?: ShotPriority;
  /** Toggles the captured state when the row is pressed. */
  onToggle?: () => void;
}

/**
 * A shot-list checklist row — a check affordance, the shot title (struck when
 * `done`), an optional notes line, and a priority `Badge`. The whole row is a
 * keyboard-operable `checkbox` when `onToggle` is provided: its captured state
 * is announced via `aria-checked` and a ✓ glyph, never color alone. Composes
 * `Icon` and `Badge`. Token-only colors.
 */
export const ShotListItem = React.forwardRef<HTMLDivElement, ShotListItemProps>(
  function ShotListItem({ title, notes, done = false, priority, onToggle, className, ...rest }, ref) {
    const toggleable = typeof onToggle === 'function';

    const checkbox = (
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)]',
          done ? 'bg-success' : 'border border-border'
        )}
      >
        {done ? <Icon glyph="✓" size="sm" color="onSuccess" /> : null}
      </span>
    );

    const inner = (
      <>
        {checkbox}
        <div className="flex flex-1 flex-col gap-0.5">
          <p
            className={cn(
              'text-base font-semibold',
              done ? 'text-muted line-through' : 'text-on-surface'
            )}
          >
            {title}
          </p>
          {notes ? <p className="text-xs text-muted">{notes}</p> : null}
        </div>
        {priority ? (
          <Badge tone={priority === 'must' ? 'danger' : 'neutral'}>{PRIORITY_LABEL[priority]}</Badge>
        ) : null}
      </>
    );

    return (
      <div
        ref={ref}
        data-xen-shot-list-item=""
        role={toggleable ? 'checkbox' : undefined}
        aria-checked={toggleable ? done : undefined}
        aria-label={toggleable ? title : undefined}
        tabIndex={toggleable ? 0 : undefined}
        onClick={toggleable ? onToggle : undefined}
        onKeyDown={
          toggleable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggle?.();
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          toggleable &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        {inner}
      </div>
    );
  }
);
