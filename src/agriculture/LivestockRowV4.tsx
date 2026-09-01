import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowEdgeClass,
} from '../dashboard/internal/row-v4';
import { metaLine, type FarmTone } from './internal/farm-v4';
import type { LivestockHealth, LivestockRowProps } from './LivestockRow';

export interface LivestockRowV4Props extends LivestockRowProps {
  /** Override the health names — three English words lived inside the component. */
  healthLabels?: Partial<Record<LivestockHealth, string>>;
  /** Shown in place of the head count when it is unknown. Default `'—'`. */
  unknownCountLabel?: string;
  /** Format the head count. Default `String(count)`. */
  formatCount?: (count: number) => string;
}

/** Health → tone and default label. Genuinely a status, so the tones stay. */
const HEALTH_META: Record<LivestockHealth, { label: string; tone: FarmTone }> = {
  healthy: { label: 'Healthy', tone: 'success' },
  monitor: { label: 'Monitor', tone: 'warn' },
  sick: { label: 'Sick', tone: 'danger' },
};

/**
 * **V4 livestock row** — the web twin of the native `LivestockRowV4`, same
 * props as {@link LivestockRow} plus `healthLabels`, `unknownCountLabel` and
 * `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding, hover
 *    fill and separator inset are the decisions every other row in the kit
 *    makes rather than this component's own.
 * 2. **The head count is tabular and formattable.** A column of pen counts
 *    that does not line up is a column nobody can scan, and `1,240` is not
 *    `1.240` everywhere.
 * 3. **Captions take `muted-text`**, the slot with a contrast promise.
 * 4. **Health is a badge word beside the tone**, never colour alone.
 *
 * **Renders nothing without a `species`** (§4.5).
 */
export const LivestockRowV4 = React.forwardRef<HTMLDivElement, LivestockRowV4Props>(
  function LivestockRowV4(
    {
      species,
      count,
      icon = '🐄',
      location,
      health = 'healthy',
      detail,
      healthLabels,
      unknownCountLabel = '—',
      formatCount,
      last = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    if (!species) return null;

    const meta = HEALTH_META[health];
    const label = healthLabels?.[health] ?? meta.label;
    const shownCount =
      typeof count === 'number' ? (formatCount ?? String)(count) : unknownCountLabel;
    const caption = metaLine([location, detail]);

    return (
      <div
        ref={ref}
        data-xen-livestock-row=""
        data-xen-v4-chrome={onClick ? 'on-surface' : undefined}
        role={onClick ? 'button' : undefined}
        onClick={onClick}
        aria-label={
          onClick ? [species, shownCount, caption, label].filter(Boolean).join(', ') : undefined
        }
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(Boolean(caption)),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        <IconV4 glyph={icon} size="lg" />

        <div className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{species}</span>
          {caption ? <span className="truncate text-xs text-muted-text">{caption}</span> : null}
        </div>

        <div className={ROW_V4_TRAILING_CLASS}>
          <span className="font-heading text-base font-bold text-on-card [font-variant-numeric:tabular-nums]">
            {shownCount}
          </span>
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {label}
          </BadgeV4>
        </div>
      </div>
    );
  }
);
