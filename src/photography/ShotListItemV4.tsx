import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Icon, type BadgeTone } from '../primitives';
import type { ShotListItemProps, ShotPriority } from './ShotListItem';

/** Drop-in for {@link ShotListItemProps} — same props, the V4 "studio" design. */
export type ShotListItemV4Props = ShotListItemProps;

const PRIORITY: Record<ShotPriority, { label: string; glyph: string; tone: BadgeTone; color: string }> = {
  must: { label: 'Must-have', glyph: '★', tone: 'danger', color: 'text-danger' },
  nice: { label: 'Nice-to-have', glyph: '☆', tone: 'primary', color: 'text-primary' },
  optional: { label: 'Optional', glyph: '○', tone: 'neutral', color: 'text-muted' },
};

/**
 * ShotListItem — **V4** "studio" design (web parity of the native V4). A
 * checklist row on a clean, elevated studio surface: an elevated `shadow-md`
 * row, a check affordance, the shot title (struck when `done`), a muted notes
 * line, and the `priority` shown three ways — a leading glyph, a token color,
 * and a labelled `Badge` — so it never rides on color alone: `must` (★, danger),
 * `nice` (☆, primary), `optional` (○, muted). The whole row is a
 * keyboard-operable `checkbox` when `onToggle` is provided; its captured state
 * is announced via `aria-checked` and a ✓ glyph. Identical props/behavior to
 * {@link ShotListItemProps}. All colors from `--xen-*` token classes.
 */
export const ShotListItemV4 = React.forwardRef<HTMLDivElement, ShotListItemV4Props>(
  function ShotListItemV4({ title, notes, done = false, priority, onToggle, className, ...rest }, ref) {
    const toggleable = typeof onToggle === 'function';
    const meta = priority ? PRIORITY[priority] : null;

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
              'text-base font-bold',
              done ? 'text-muted line-through' : 'text-on-surface'
            )}
          >
            {title}
          </p>
          {notes ? <p className="text-xs text-muted">{notes}</p> : null}
        </div>
        {meta ? (
          <span className="flex items-center gap-[var(--xen-space-xs)]">
            <span aria-hidden="true" className={cn('text-sm', meta.color)}>
              {meta.glyph}
            </span>
            <Badge tone={meta.tone} variant="soft">
              {meta.label}
            </Badge>
          </span>
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
          'flex min-h-[44px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-on-surface shadow-md',
          toggleable &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        {inner}
      </div>
    );
  }
);
