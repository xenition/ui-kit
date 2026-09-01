import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { ThermostatDialProps, ThermostatMode } from './ThermostatDial';

/** Drop-in for {@link ThermostatDialProps} — same props, the V4 "ambient" design. */
export type ThermostatDialV4Props = ThermostatDialProps;

/** Mode → the CSS-var token slot used for the value arc / label / tint. */
const MODE_VAR: Record<ThermostatMode, string> = {
  heat: 'warn',
  cool: 'primary',
  auto: 'accent',
  off: 'muted',
};

/** Mode → the `text-*` token class for the label. */
const MODE_TEXT: Record<ThermostatMode, string> = {
  heat: 'text-warn',
  cool: 'text-primary',
  auto: 'text-accent',
  off: 'text-muted',
};

const MODE_LABEL: Record<ThermostatMode, string> = {
  heat: 'Heating',
  cool: 'Cooling',
  auto: 'Auto',
  off: 'Off',
};

function polar(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

/**
 * ThermostatDial — **V4** "ambient" design (web parity of the native V4). A calm
 * climate dial: the big target numeral sits centered over an optional ambient
 * reading inside a token-bound, dependency-free inline `<svg>` dial. A 270° track
 * (`var(--xen-border)`) carries a value arc filled in the mode accent
 * (`heat`→warn, `cool`→primary, `auto`→accent, `off`→muted); when running, the
 * dial disc lights with a soft accent wash so the active mode glows. Framing
 * `+`/`−` buttons step the target within `[min,max]`, and a text label announces
 * the mode (never color alone). `span` guards the fraction math against
 * divide-by-zero. `offline` dims the dial and blocks changes. Same props/behavior
 * as {@link ThermostatDialProps}; all colors from `--xen-*` tokens (no literals).
 */
export const ThermostatDialV4 = React.forwardRef<HTMLDivElement, ThermostatDialV4Props>(
  function ThermostatDialV4(
    { target, ambient, min = 10, max = 30, step = 0.5, mode = 'heat', unit = '°', size = 200, onTargetChange, offline = false, className, style },
    ref
  ) {
    const modeVar = MODE_VAR[mode];
    const accentVar = offline ? 'var(--xen-muted)' : `var(--xen-${modeVar})`;
    const accentText = offline ? 'text-muted' : MODE_TEXT[mode];
    const glowing = !offline && mode !== 'off';

    const thickness = Math.max(8, Math.round(size * 0.06));
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - thickness / 2;

    // 270° sweep centered at the bottom: from 135° round to 405° (=45°).
    const startA = (135 * Math.PI) / 180;
    const sweep = (270 * Math.PI) / 180;
    const span = Math.max(max - min, 1); // guard divide-by-zero
    const clampedTarget = Math.min(Math.max(target, min), max);
    const frac = (clampedTarget - min) / span;
    const endA = startA + frac * sweep;

    const trackStart = polar(cx, cy, r, startA);
    const trackEnd = polar(cx, cy, r, startA + sweep);
    const valEnd = polar(cx, cy, r, endA);
    const largeTrack = 1; // 270° always > 180°
    const largeVal = endA - startA > Math.PI ? 1 : 0;

    const bump = (dir: 1 | -1): void => {
      if (offline || !onTargetChange) return;
      const next = Math.min(Math.max(clampedTarget + dir * step, min), max);
      onTargetChange(next);
    };

    const btnClass =
      'flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50';

    // Inset diameter for the glowing dial disc that sits inside the arc.
    const discSize = size - thickness * 2 - 8;

    return (
      <div
        ref={ref}
        style={style}
        role="group"
        aria-label={`Thermostat, ${offline ? 'Offline' : MODE_LABEL[mode]}`}
        className={cn('flex flex-col items-center', offline && 'opacity-60', className)}
      >
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          {/* Glowing dial disc — the ambient signature; the active mode tints it. */}
          <span
            aria-hidden="true"
            className={cn('absolute rounded-full', glowing ? 'shadow-md' : '')}
            style={{
              width: discSize,
              height: discSize,
              backgroundColor: glowing ? `color-mix(in srgb, ${accentVar} 8%, transparent)` : 'var(--xen-surface)',
              border: `1px solid ${glowing ? `color-mix(in srgb, ${accentVar} 40%, transparent)` : 'var(--xen-border)'}`,
            }}
          />
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Setpoint ${clampedTarget}${unit}`} className="relative">
            <path
              d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeTrack} 1 ${trackEnd.x} ${trackEnd.y}`}
              fill="none"
              stroke="var(--xen-border)"
              strokeWidth={thickness}
              strokeLinecap="round"
            />
            <path
              d={`M ${trackStart.x} ${trackStart.y} A ${r} ${r} 0 ${largeVal} 1 ${valEnd.x} ${valEnd.y}`}
              fill="none"
              stroke={accentVar}
              strokeWidth={thickness}
              strokeLinecap="round"
            />
            <circle cx={valEnd.x} cy={valEnd.y} r={thickness / 2} fill={accentVar} />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-heading text-3xl font-bold text-on-surface">
              {clampedTarget}
              {unit}
            </span>
            {ambient != null ? <span className="text-sm text-muted">{`Now ${ambient}${unit}`}</span> : null}
            <span className={cn('mt-0.5 text-xs font-semibold', accentText)}>
              {offline ? 'Offline' : MODE_LABEL[mode]}
            </span>
          </div>
        </div>

        <div className="mt-[var(--xen-space-md)] flex gap-[var(--xen-space-xl)]">
          <button type="button" className={btnClass} disabled={offline} aria-label="Lower target temperature" onClick={() => bump(-1)}>
            <Icon glyph="−" color="onSurface" size="xl" />
          </button>
          <button type="button" className={btnClass} disabled={offline} aria-label="Raise target temperature" onClick={() => bump(1)}>
            <Icon glyph="+" color="onSurface" size="xl" />
          </button>
        </div>
      </div>
    );
  }
);
