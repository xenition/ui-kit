import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { metaLine, type FarmTone } from './internal/farm-v4';
import type { FieldCardProps, FieldStatus } from './FieldCard';

export interface FieldCardV4Props extends FieldCardProps {
  /** Override the status names — four English words lived inside the component. */
  statusLabels?: Partial<Record<FieldStatus, string>>;
  /**
   * Render the area. Default is the value and its unit separated by a space.
   *
   * A prop because the separator is a locale decision: `12.4 ha`, `12,4 ha`
   * and `30.6 acres` are all correct somewhere.
   */
  formatArea?: (area: number | string, unit?: string) => string;
}

/** Status → tone and default label. Domain knowledge, so it stays here. */
const STATUS_META: Record<FieldStatus, { label: string; tone: FarmTone }> = {
  planted: { label: 'Planted', tone: 'success' },
  fallow: { label: 'Fallow', tone: 'neutral' },
  harvested: { label: 'Harvested', tone: 'primary' },
  preparing: { label: 'Preparing', tone: 'warn' },
};

/**
 * **V4 field card** — the web twin of the native `FieldCardV4`, same props as
 * {@link FieldCard} plus `statusLabels` and `formatArea`.
 *
 * ## Four changes
 *
 * 1. **An interactive card is a `<button>`**, not a `<div>` with
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler.
 * 2. **Hover is the shared state layer**, not a `hover:bg-neutral-50` ramp
 *    step that is near-white on a dark page.
 * 3. **Captions take `muted-text`**, the slot with a contrast promise.
 * 4. **The area is formatted, not concatenated**, and set tabular so a list of
 *    fields lines up.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export const FieldCardV4 = React.forwardRef<HTMLDivElement, FieldCardV4Props>(
  function FieldCardV4(
    {
      name,
      area,
      areaUnit = 'ha',
      crop,
      soilType,
      location,
      status = 'planted',
      icon = '🗺️',
      variant = 'detailed',
      statusLabels,
      formatArea,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (!name) return null;

    const meta = STATUS_META[status];
    const label = statusLabels?.[status] ?? meta.label;
    const detailed = variant === 'detailed';
    const format =
      formatArea ?? ((a: number | string, u?: string) => (u ? `${a} ${u}` : String(a)));
    const areaText = area != null ? format(area, areaUnit) : null;

    const body = (
      <>
        <div className="flex items-center gap-sm">
          <IconV4 glyph={icon} size={detailed ? '2xl' : 'xl'} />
          <div className="min-w-0 flex-1">
            <p className="truncate font-heading text-base font-bold text-on-card">{name}</p>
            {areaText ? (
              <p className="truncate text-sm text-muted-text [font-variant-numeric:tabular-nums]">
                {areaText}
              </p>
            ) : null}
          </div>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {label}
          </BadgeV4>
        </div>

        {detailed && (crop != null || soilType != null || location != null) ? (
          <p className="mt-sm text-xs text-muted-text">{metaLine([crop, soilType, location])}</p>
        ) : null}
      </>
    );

    if (!onClick) {
      return (
        <CardV4 ref={ref} data-xen-field-card="" className={className} {...rest}>
          {body}
        </CardV4>
      );
    }

    return (
      <CardV4 ref={ref} data-xen-field-card="" className={cn('p-0', className)} {...rest}>
        <button
          type="button"
          onClick={onClick}
          aria-label={[name, areaText, label].filter(Boolean).join(', ')}
          data-xen-v4-chrome="on-surface"
          className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
        >
          {body}
        </button>
      </CardV4>
    );
  }
);
