import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';
import type { WeatherAlertProps } from './WeatherAlert';

export type WeatherAlertV4Props = WeatherAlertProps;

/** Severity of a weather advisory, low → high. */
type WeatherAlertSeverity = 'advisory' | 'watch' | 'warning' | 'emergency';
type Tone = 'warn' | 'danger';

interface SeverityMeta {
  tone: Tone;
  glyph: string;
  label: string;
}

/** Same tone mapping + EXACT label strings as the base `WeatherAlert`. */
const SEVERITY: Record<WeatherAlertSeverity, SeverityMeta> = {
  advisory: { tone: 'warn', glyph: 'ℹ️', label: 'Advisory' },
  watch: { tone: 'warn', glyph: '⚠️', label: 'Watch' },
  warning: { tone: 'danger', glyph: '⚠️', label: 'Warning' },
  emergency: { tone: 'danger', glyph: '🚨', label: 'Emergency' },
};

// Solid tokens only — no opacity modifiers.
const TONE_GROUND: Record<Tone, string> = { warn: 'bg-warn', danger: 'bg-danger' };
const TONE_INK: Record<Tone, string> = { warn: 'text-on-warn', danger: 'text-on-danger' };
const TONE_CHIP: Record<Tone, string> = { warn: 'bg-on-warn', danger: 'bg-on-danger' };
const TONE_GLYPH: Record<Tone, IconColor> = { warn: 'warn', danger: 'danger' };
const TONE_PILL: Record<Tone, string> = { warn: 'bg-on-warn text-warn', danger: 'bg-on-danger text-danger' };
const TONE_DISMISS: Record<Tone, IconColor> = { warn: 'onWarn', danger: 'onDanger' };

/**
 * WeatherAlert — **filled tone banner** design (v4), web parity of the native
 * `WeatherAlertV4`. A bold, filled severity banner: warn (advisory/watch) or
 * danger (warning/emergency) as the ground, with the severity ALSO spelled out by
 * a glyph in a white chip and a text pill — never color alone. Title, copy and
 * "until" line ride in the contrast-guaranteed on-tone ink. Pass `onClick` to
 * make it tappable (keyboard-activatable) and `onDismiss` for a dismiss button.
 * All colors flow through Tailwind token classes. Same props as
 * {@link WeatherAlertProps}.
 */
export const WeatherAlertV4 = React.forwardRef<HTMLDivElement, WeatherAlertV4Props>(function WeatherAlertV4(
  { title, description, severity = 'advisory', until, onDismiss, className, onKeyDown, ...rest },
  ref
) {
  const meta = SEVERITY[severity];
  const t = meta.tone;
  const clickable = rest.onClick != null;

  const interactive = clickable
    ? {
        role: 'button' as const,
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          onKeyDown?.(e);
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            (rest.onClick as React.MouseEventHandler<HTMLDivElement>)?.(
              e as unknown as React.MouseEvent<HTMLDivElement>
            );
          }
        },
      }
    : { role: 'alert' as const, onKeyDown };

  return (
    <div
      ref={ref}
      aria-label={`${meta.label}: ${title}`}
      className={cn(
        'flex flex-row gap-3 rounded-[var(--xen-radius-lg)] p-5 shadow-lg',
        TONE_GROUND[t],
        clickable && 'cursor-pointer',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span className={cn('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full', TONE_CHIP[t])}>
        <Icon glyph={meta.glyph} size="xl" color={TONE_GLYPH[t]} aria-label={meta.label} />
      </span>
      <div className="flex-1">
        <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-extrabold uppercase', TONE_PILL[t])}>
          {meta.label}
        </span>
        <p className={cn('mt-1 text-lg font-extrabold', TONE_INK[t])}>{title}</p>
        {description ? <p className={cn('mt-1 text-sm', TONE_INK[t])}>{description}</p> : null}
        {until ? <p className={cn('mt-1 text-xs', TONE_INK[t])}>Until {until}</p> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss alert"
          onClick={(e) => {
            e.stopPropagation();
            onDismiss();
          }}
          className="shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-on-warn"
        >
          <Icon glyph="✕" size="sm" color={TONE_DISMISS[t]} aria-label="Dismiss" />
        </button>
      ) : null}
    </div>
  );
});
