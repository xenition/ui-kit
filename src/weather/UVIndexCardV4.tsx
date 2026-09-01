import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import type { UVIndexCardProps } from './UVIndexCard';

export type UVIndexCardV4Props = UVIndexCardProps;

type Tone = 'success' | 'warn' | 'danger';

interface UvMeta {
  label: string;
  glyph: string;
  tone: Tone;
}

/** Filled severity pill classes (solid tokens only — no opacity modifiers). */
const TONE_PILL: Record<Tone, string> = {
  success: 'bg-success text-on-success',
  warn: 'bg-warn text-on-warn',
  danger: 'bg-danger text-on-danger',
};

const TONE_MARKER: Record<Tone, string> = {
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

const TONE_ICON: Record<Tone, IconColor> = {
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/** Same thresholds + EXACT label strings as the base `UVIndexCard`. */
function uvBand(uv: number): UvMeta {
  if (uv <= 2) return { label: 'Low', glyph: '🕶️', tone: 'success' };
  if (uv <= 5) return { label: 'Moderate', glyph: '🧢', tone: 'warn' };
  if (uv <= 7) return { label: 'High', glyph: '🧴', tone: 'warn' };
  if (uv <= 10) return { label: 'Very high', glyph: '⛱️', tone: 'danger' };
  return { label: 'Extreme', glyph: '🚫', tone: 'danger' };
}

/**
 * V4 design-line UV index card — a polished elevated white card. Same props,
 * defaults, band thresholds and EXACT label strings as the base `UVIndexCard`,
 * restyled onto the V4 surface: a big glyph, a large numeral, a filled severity
 * pill, and a token 0–11 scale track with a marker. All colors flow through
 * Tailwind token classes.
 */
export const UVIndexCardV4 = React.forwardRef<HTMLDivElement, UVIndexCardV4Props>(function UVIndexCardV4(
  { uv, advice, emptyLabel = 'UV index unavailable', className, ...rest },
  ref
) {
  const shell = 'rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5';

  if (uv == null) {
    return (
      <div ref={ref} role="img" aria-label={emptyLabel} className={cn(shell, className)} {...rest}>
        <p className="text-sm text-muted">{emptyLabel}</p>
      </div>
    );
  }

  const meta = uvBand(uv);
  const markerPct = clamp(uv, 0, 11) / 11;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`UV index ${uv}, ${meta.label}`}
      className={cn(shell, 'flex flex-col', className)}
      {...rest}
    >
      <div className="flex flex-row items-center gap-2">
        <Icon glyph="🌞" size="2xl" color={TONE_ICON[meta.tone]} aria-label="UV index" />
        <span className="text-sm text-muted">UV Index</span>
      </div>

      <div className="mt-1 flex flex-row items-baseline gap-3">
        <span className="text-4xl font-extrabold text-on-surface">{uv}</span>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
            TONE_PILL[meta.tone]
          )}
        >
          <span aria-hidden="true">{meta.glyph}</span>
          {meta.label}
        </span>
      </div>

      <div className="relative mt-3 h-2 rounded-full bg-neutral-100">
        <span
          aria-hidden="true"
          className={cn('absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full', TONE_MARKER[meta.tone])}
          style={{ left: `${markerPct * 100}%`, marginLeft: -2 }}
        />
      </div>

      {advice ? <p className="mt-3 text-sm text-on-surface">{advice}</p> : null}
    </div>
  );
});
