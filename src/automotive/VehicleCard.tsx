import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives';

/** Presentation density for a {@link VehicleCard}. */
export type VehicleCardVariant = 'default' | 'compact';
/** Operational state of the vehicle. */
export type VehicleStatus = 'available' | 'in-use' | 'maintenance' | 'offline';

/** Status → badge tone + spelled-out word + glyph (never color alone). */
const STATUS: Record<VehicleStatus, { tone: BadgeTone; word: string; glyph: string }> = {
  available: { tone: 'success', word: 'Available', glyph: '●' },
  'in-use': { tone: 'primary', word: 'In use', glyph: '▶' },
  maintenance: { tone: 'warn', word: 'Maintenance', glyph: '🔧' },
  offline: { tone: 'neutral', word: 'Offline', glyph: '○' },
};

export interface VehicleSpec {
  /** Spec label, e.g. `'Seats'`. */
  label: string;
  /** Spec value, e.g. `'4'`. */
  value: string;
}

export interface VehicleCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Make + model, e.g. `'Tesla Model 3'`. */
  name: string;
  /** License plate. */
  plate?: string;
  /** Vehicle class, e.g. `'Sedan'` / `'SUV'`. */
  vehicleClass?: string;
  /** Color name, e.g. `'Midnight Blue'`. */
  color?: string;
  /** Year, e.g. `2023`. */
  year?: number;
  /** Operational status. */
  status?: VehicleStatus;
  /** Short spec chips (seats, range, etc.). */
  specs?: VehicleSpec[];
  /** Presentation variant. */
  variant?: VehicleCardVariant;
  /** Fires when the card is pressed. */
  onClick?: () => void;
  /** Placeholder skeleton while the vehicle loads. */
  loading?: boolean;
}

/**
 * A fleet vehicle summary — make/model, plate, class, color, year, an
 * operational status, and optional spec chips. The status is shown with a glyph
 * plus a spelled-out word and an a11y label, so meaning never rests on color.
 * Data + `onClick` only; nothing fetches. Colors come from `--xen-*` token
 * classes — no literal colors. When `onClick` is set the card is a
 * keyboard-operable `role="button"`. `variant="compact"` renders a denser row.
 * Spec indexing is guarded against a missing array. Web parity of the native
 * `VehicleCard`.
 */
export const VehicleCard = React.forwardRef<HTMLDivElement, VehicleCardProps>(function VehicleCard(
  {
    name,
    plate,
    vehicleClass,
    color,
    year,
    status = 'available',
    specs,
    variant = 'default',
    onClick,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const pad = compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]';

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-vehicle-card=""
        aria-busy="true"
        aria-label="Loading vehicle"
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface',
          pad,
          className
        )}
        {...rest}
      >
        <div className="h-4 w-[55%] animate-pulse rounded bg-neutral-200" />
        <div className="h-3.5 w-[75%] animate-pulse rounded bg-neutral-100" />
      </div>
    );
  }

  const s = STATUS[status] ?? STATUS.available;
  const subtitleParts = [year ? String(year) : null, color, vehicleClass].filter(Boolean) as string[];
  const specList = Array.isArray(specs) ? specs : [];
  const a11y = `Vehicle ${name}${plate ? `, plate ${plate}` : ''}, ${s.word}`;
  const interactive = Boolean(onClick);

  const body = (
    <div className={cn('flex flex-col', compact ? 'gap-[var(--xen-space-sm)]' : 'gap-[var(--xen-space-md)]')}>
      <div className="flex items-start gap-[var(--xen-space-sm)]">
        <div className="min-w-0 flex-1">
          <span className="block truncate text-base font-bold text-on-surface">
            <span aria-hidden="true">🚗 </span>
            {name}
          </span>
          {subtitleParts.length ? (
            <span className="block truncate text-xs text-muted">{subtitleParts.join(' · ')}</span>
          ) : null}
        </div>
        <Badge tone={s.tone}>
          <span aria-hidden="true">{s.glyph}</span> {s.word}
        </Badge>
      </div>

      {plate ? (
        <div className="flex">
          <span className="rounded-[var(--xen-radius-sm)] border border-border bg-neutral-100 px-[var(--xen-space-sm)] py-0.5 text-sm font-extrabold tracking-[0.15em] text-on-surface">
            {plate}
          </span>
        </div>
      ) : null}

      {specList.length && !compact ? (
        <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
          {specList.map((spec, i) => (
            <div
              key={`${spec.label}-${i}`}
              className="rounded-[var(--xen-radius-sm)] bg-primary-50 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]"
            >
              <span className="block text-xs text-muted">{spec.label}</span>
              <span className="block text-sm font-bold text-on-surface">{spec.value}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );

  const rootClass = cn(
    'rounded-[var(--xen-radius-lg)] border border-border bg-surface',
    pad,
    interactive && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
    className
  );

  if (!interactive) {
    return (
      <div ref={ref} data-xen-vehicle-card="" aria-label={a11y} className={rootClass} {...rest}>
        {body}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-vehicle-card=""
      role="button"
      tabIndex={0}
      aria-label={a11y}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={rootClass}
      {...rest}
    >
      {body}
    </div>
  );
});
