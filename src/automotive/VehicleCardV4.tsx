import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { metaLine, SKELETON_CLASS, type ToneV4 } from './internal/fleet-v4';
import type { VehicleCardProps, VehicleStatus } from './VehicleCard';

export interface VehicleCardV4Props extends VehicleCardProps {
  /** Override the status words — four English phrases lived inside. */
  statusLabels?: Partial<Record<VehicleStatus, string>>;
}

const STATUS_META: Record<VehicleStatus, { label: string; tone: ToneV4 }> = {
  available: { label: 'Available', tone: 'success' },
  'in-use': { label: 'In use', tone: 'primary' },
  maintenance: { label: 'Maintenance', tone: 'warn' },
  offline: { label: 'Offline', tone: 'neutral' },
};

/**
 * **V4 vehicle card** — the web twin of the native `VehicleCardV4`, same props
 * as {@link VehicleCard} plus `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The plate is boxed and tabular.** A registration is an identifier a
 *    user matches against a real car in a car park; the base set it as
 *    ordinary caption text among the other specs.
 * 2. **The spec list is a real `<dl>`**, announced as label/value pairs.
 * 3. **An interactive card is a `<button>`**, not a div with `role="button"`.
 * 4. **The skeleton is opaque** and the ground is `card`.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export const VehicleCardV4 = React.forwardRef<HTMLDivElement, VehicleCardV4Props>(
  function VehicleCardV4(
    {
      name,
      plate,
      vehicleClass,
      color,
      year,
      status = 'available',
      specs = [],
      variant = 'default',
      statusLabels,
      onClick,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    if (loading) {
      return (
        <CardV4 ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
          {[55, 35].map((w) => (
            <div key={w} className={cn('h-4', SKELETON_CLASS)} style={{ width: `${w}%` }} />
          ))}
        </CardV4>
      );
    }

    if (!name) return null;

    const meta = STATUS_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const compact = variant === 'compact';
    const caption = metaLine([vehicleClass, color, year]);

    const body = (
      <>
        <div className="flex items-center gap-sm">
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="truncate font-heading text-base font-bold text-on-card">{name}</span>
            {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
          </div>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {word}
          </BadgeV4>
        </div>

        {/* A registration is an identifier, not a caption. */}
        {plate ? (
          <span className="mt-sm self-start rounded-[var(--xen-radius-sm)] border border-border px-sm py-xs text-sm font-bold text-on-card [font-variant-numeric:tabular-nums]">
            {plate}
          </span>
        ) : null}

        {!compact && specs.length > 0 ? (
          <dl className="mt-md flex flex-wrap gap-md">
            {specs.map((spec) => (
              <div key={spec.label} className="flex flex-col">
                <dt className="text-xs text-muted-text">{spec.label}</dt>
                <dd className="text-sm font-semibold text-on-card [font-variant-numeric:tabular-nums]">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </>
    );

    if (!onClick) {
      return (
        <CardV4 ref={ref} data-xen-vehicle-card={status} className={className} {...rest}>
          {body}
        </CardV4>
      );
    }

    return (
      <CardV4
        ref={ref}
        data-xen-vehicle-card={status}
        className={cn('p-0', className)}
        {...rest}
      >
        <button
          type="button"
          onClick={onClick}
          aria-label={metaLine([name, plate, word, caption])}
          data-xen-v4-chrome="on-surface"
          className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
        >
          {body}
        </button>
      </CardV4>
    );
  }
);
