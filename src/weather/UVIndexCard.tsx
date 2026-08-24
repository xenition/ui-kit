import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { clamp } from './weather-utils';

/** UV exposure band. */
export type UvBand = 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';

type Tone = Extract<BadgeTone, 'success' | 'warn' | 'danger'>;

interface UvMeta {
  label: string;
  glyph: string;
  tone: Tone;
}

const TONE_MARKER: Record<Tone, string> = {
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

function uvBand(uv: number): UvMeta {
  if (uv <= 2) return { label: 'Low', glyph: '🕶️', tone: 'success' };
  if (uv <= 5) return { label: 'Moderate', glyph: '🧢', tone: 'warn' };
  if (uv <= 7) return { label: 'High', glyph: '🧴', tone: 'warn' };
  if (uv <= 10) return { label: 'Very high', glyph: '⛱️', tone: 'danger' };
  return { label: 'Extreme', glyph: '🚫', tone: 'danger' };
}

export interface UVIndexCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
  /** UV index value (0–11+). */
  uv?: number;
  /** Short protection guidance. */
  advice?: string;
  /** Message shown when `uv` is absent. */
  emptyLabel?: string;
}

/**
 * UV index card (web parity of the native `UVIndexCard`): the numeric UV value,
 * its exposure band shown as a `Badge` glyph + text label (never color alone), a
 * token 0–11 scale track with a marker, and an optional protection tip. Band
 * severity maps to success/warn/danger token tones. Renders a muted empty state
 * when `uv` is absent. All colors come from the `--xen-*` tokens via Tailwind
 * classes — no literal colors.
 */
export const UVIndexCard = React.forwardRef<HTMLDivElement, UVIndexCardProps>(function UVIndexCard(
  { uv, advice, emptyLabel = 'UV index unavailable', className, ...rest },
  ref
) {
  if (uv == null) {
    return (
      <Card ref={ref} role="img" aria-label={emptyLabel} className={className} {...rest}>
        <p className="text-sm text-muted">{emptyLabel}</p>
      </Card>
    );
  }

  const meta = uvBand(uv);
  const markerPct = clamp(uv, 0, 11) / 11;

  return (
    <Card
      ref={ref}
      role="img"
      aria-label={`UV index ${uv}, ${meta.label}`}
      className={className}
      {...rest}
    >
      <div className="flex flex-row items-center gap-2">
        <Icon glyph="🌞" size="lg" aria-label="UV index" />
        <span className="text-sm text-muted">UV Index</span>
      </div>

      <div className="mt-1 flex flex-row items-baseline gap-2">
        <span className="text-3xl font-extrabold text-on-surface">{uv}</span>
        <Badge tone={meta.tone}>
          <span aria-hidden="true">{meta.glyph}</span>
          {meta.label}
        </Badge>
      </div>

      <div className="relative mt-2 h-2 rounded-full bg-neutral-100">
        <span
          aria-hidden="true"
          className={cn('absolute top-1/2 h-3.5 w-1 -translate-y-1/2 rounded-full', TONE_MARKER[meta.tone])}
          style={{ left: `${markerPct * 100}%`, marginLeft: -2 }}
        />
      </div>

      {advice ? <p className="mt-2 text-sm text-on-surface">{advice}</p> : null}
    </Card>
  );
});
