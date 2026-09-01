import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Icon, type BadgeTone } from '../primitives';
import type { EquipmentRowProps, EquipmentStatus } from './EquipmentRow';

/** Drop-in for {@link EquipmentRowProps} — same props, the V4 "studio" design. */
export type EquipmentRowV4Props = EquipmentRowProps;

const STATUS: Record<EquipmentStatus, { label: string; tone: BadgeTone; glyph: string }> = {
  available: { label: 'Available', tone: 'success', glyph: '✅' },
  'in-use': { label: 'In use', tone: 'warn', glyph: '🎬' },
  maintenance: { label: 'Maintenance', tone: 'primary', glyph: '🛠' },
  unavailable: { label: 'Unavailable', tone: 'danger', glyph: '⛔' },
};

/**
 * EquipmentRow — **V4** "studio" design (web parity of the native V4). The matted
 * take on a gear-inventory row: an elevated clean-surface row whose leading
 * `glyph` (default 📷) floats inside a thin neutral **mat**, a bold gear name, a
 * muted `category` line, the `meta` (qty / serial) as a small soft-primary chip,
 * and a trailing availability `Badge` carrying glyph + token tone + label (never
 * color alone). Identical props/behavior to {@link EquipmentRowProps}; passing
 * `onClick` makes the whole row a keyboard-operable `button`. All colors from
 * `--xen-*` token classes.
 */
export const EquipmentRowV4 = React.forwardRef<HTMLDivElement, EquipmentRowV4Props>(
  function EquipmentRowV4(
    { name, category, glyph = '📷', status = 'available', meta, onClick, className, ...rest },
    ref
  ) {
    const s = STATUS[status];
    const interactive = typeof onClick === 'function';

    return (
      <div
        ref={ref}
        data-xen-equipment-row=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${name}, ${s.label}` : undefined}
        onClick={onClick}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.currentTarget.click();
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface shadow-md',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset ring-border">
          <Icon glyph={glyph} size="lg" color="onSurface" />
        </div>
        <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
          <p className="truncate text-base font-bold text-on-surface">{name}</p>
          {category || meta ? (
            <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
              {category ? <span className="truncate text-xs text-muted">{category}</span> : null}
              {meta ? (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-on-surface">
                  {meta}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
        <Badge tone={s.tone} variant="soft">
          <span aria-hidden="true">{s.glyph}</span> {s.label}
        </Badge>
      </div>
    );
  }
);
