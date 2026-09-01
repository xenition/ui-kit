import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowEdgeClass,
} from '../dashboard/internal/row-v4';
import { clampPercent, metaLine, TONE_INK, type ToneV4 } from './internal/fleet-v4';
import type { HealthStatus, VehicleHealthRowProps } from './VehicleHealthRow';
import type { ProgressTone } from '../primitives/Progress';

export interface VehicleHealthRowV4Props extends VehicleHealthRowProps {
  /** Override the status words — four English words lived inside. */
  statusLabels?: Partial<Record<HealthStatus, string>>;
  /** Draw the separator under the row. Default `false`. */
  last?: boolean;
}

/**
 * Status → tone, word and glyph.
 *
 * `unknown` takes `neutral`, not a status colour: "we could not read this
 * sensor" is an absence of information, and painting it amber would tell the
 * driver something the vehicle never said.
 */
const HEALTH_META: Record<
  HealthStatus,
  { label: string; tone: ToneV4; glyph: string; meter?: ProgressTone }
> = {
  ok: { label: 'OK', tone: 'success', glyph: '✓', meter: 'success' },
  attention: { label: 'Attention', tone: 'warn', glyph: '!', meter: 'warn' },
  critical: { label: 'Critical', tone: 'danger', glyph: '✕', meter: 'danger' },
  unknown: { label: 'Unknown', tone: 'neutral', glyph: '?' },
};

/**
 * **V4 vehicle health row** — the web twin of the native
 * `VehicleHealthRowV4`, same props as {@link VehicleHealthRow} plus
 * `statusLabels` and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line.**
 * 2. **Status is a word and a glyph, not a tint.** A row of coloured dots down
 *    a diagnostics list is unreadable to a colour-blind driver, who is the one
 *    user this screen exists for.
 * 3. **`unknown` stops borrowing a status colour** — see {@link HEALTH_META}.
 * 4. **The reading is tabular** and the ink is the contrast-corrected slot.
 *
 * **Renders nothing without a `system`** (§4.5).
 */
export const VehicleHealthRowV4 = React.forwardRef<HTMLDivElement, VehicleHealthRowV4Props>(
  function VehicleHealthRowV4(
    {
      system,
      status = 'ok',
      reading,
      glyph,
      percent,
      variant = 'default',
      statusLabels,
      last = false,
      className,
      ...rest
    },
    ref
  ) {
    if (!system) return null;

    const meta = HEALTH_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const pct = clampPercent(percent);
    const compact = variant === 'compact';

    return (
      <div
        ref={ref}
        data-xen-vehicle-health={status}
        aria-label={metaLine([system, word, reading, pct != null ? `${pct}%` : null])}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(!compact && pct != null),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        <IconV4 glyph={glyph ?? meta.glyph} size="lg" className={TONE_INK[meta.tone]} />

        <div className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{system}</span>
          {!compact && pct != null ? (
            <ProgressV4 value={pct} tone={meta.meter ?? 'primary'} />
          ) : null}
        </div>

        <div className={ROW_V4_TRAILING_CLASS}>
          {reading ? (
            <span className="text-sm text-muted-text [font-variant-numeric:tabular-nums]">
              {reading}
            </span>
          ) : null}
          <BadgeV4 tone={meta.tone} variant="soft" size="sm">
            {word}
          </BadgeV4>
        </div>
      </div>
    );
  }
);
