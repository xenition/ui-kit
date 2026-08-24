import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Icon, type BadgeTone } from '../primitives';

/** Availability of a piece of gear. */
export type EquipmentStatus = 'available' | 'in-use' | 'maintenance' | 'unavailable';

const STATUS: Record<EquipmentStatus, { label: string; tone: BadgeTone }> = {
  available: { label: 'Available', tone: 'success' },
  'in-use': { label: 'In use', tone: 'warn' },
  maintenance: { label: 'Maintenance', tone: 'primary' },
  unavailable: { label: 'Unavailable', tone: 'danger' },
};

export interface EquipmentRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gear name (e.g. "Canon R5"). */
  name: string;
  /** Category label (e.g. "Camera body", "Lens"). */
  category?: string;
  /** Leading icon glyph/emoji (e.g. "📷"). */
  glyph?: string;
  /** Availability status (default `available`). */
  status?: EquipmentStatus;
  /** Quantity / serial meta line. */
  meta?: string;
}

/**
 * A gear-inventory row — an icon slot, the item name, an optional category /
 * serial meta line, and an availability `Badge`. Status is a labelled badge
 * (never color alone). Composes `Icon` and `Badge`; passing `onClick` exposes
 * the row as a keyboard-operable `button`. Token-only colors.
 */
export const EquipmentRow = React.forwardRef<HTMLDivElement, EquipmentRowProps>(
  function EquipmentRow(
    { name, category, glyph = '📷', status = 'available', meta, onClick, className, ...rest },
    ref
  ) {
    const s = STATUS[status];
    const interactive = typeof onClick === 'function';

    const metaBits: string[] = [];
    if (category) metaBits.push(category);
    if (meta) metaBits.push(meta);

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
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-neutral-100">
          <Icon glyph={glyph} size="lg" color="onSurface" />
        </div>
        <div className="flex flex-1 flex-col gap-0.5">
          <p className="truncate text-base font-semibold text-on-surface">{name}</p>
          {metaBits.length > 0 ? (
            <p className="truncate text-xs text-muted">{metaBits.join(' · ')}</p>
          ) : null}
        </div>
        <Badge tone={s.tone}>{s.label}</Badge>
      </div>
    );
  }
);
