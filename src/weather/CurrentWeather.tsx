import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel, type WeatherCondition } from './weather-utils';

/** `compact` = single-line summary; `hero` = large stacked layout. */
export type CurrentWeatherVariant = 'hero' | 'compact';

export interface CurrentWeatherProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
  /** Place name shown as the eyebrow (e.g. `'San Francisco'`). */
  location?: string;
  /** Current temperature (already in the caller's unit). */
  temperature?: number;
  /** Unit suffix appended to temperatures. Default `'°'`. */
  unit?: string;
  /** Icon + text condition. Rendered as glyph AND label — never color alone. */
  condition?: WeatherCondition;
  /** "Feels like" apparent temperature. */
  feelsLike?: number;
  /** Daily high. */
  high?: number;
  /** Daily low. */
  low?: number;
  /** Layout density. Default `'hero'`. */
  variant?: CurrentWeatherVariant;
  /** Skeleton state while data loads. */
  loading?: boolean;
}

/**
 * Hero current-conditions block (web parity of the native `CurrentWeather`):
 * location eyebrow, a large temperature, and the condition shown as a glyph
 * beside its text label (accessibility never relies on color). Feels-like plus
 * daily high/low sit underneath. `variant='compact'` collapses to a single row.
 * Renders a `—` placeholder when `temperature` is absent and a token skeleton
 * when `loading`. Pass `onClick` to make the hero tappable (keyboard-activatable).
 * All colors come from the `--xen-*` tokens via Tailwind classes — no literals.
 */
export const CurrentWeather = React.forwardRef<HTMLDivElement, CurrentWeatherProps>(
  function CurrentWeather(
    {
      location,
      temperature,
      unit = '°',
      condition,
      feelsLike,
      high,
      low,
      variant = 'hero',
      loading = false,
      className,
      onKeyDown,
      ...rest
    },
    ref
  ) {
    const hasData = temperature != null;
    const label = conditionLabel(condition);
    const glyph = conditionGlyph(condition);
    const clickable = rest.onClick != null;

    const a11y =
      hasData && !loading
        ? `${location ? location + ', ' : ''}${temperature}${unit}, ${label}`
        : loading
          ? 'Loading current weather'
          : 'Current weather unavailable';

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
      : { role: 'img' as const, onKeyDown };

    if (loading) {
      return (
        <Card
          ref={ref}
          role="img"
          aria-label={a11y}
          className={cn('flex flex-col gap-2', className)}
          {...rest}
        >
          <div className="h-4 w-32 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-12 w-40 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200" />
        </Card>
      );
    }

    if (variant === 'compact') {
      return (
        <Card
          ref={ref}
          aria-label={a11y}
          className={cn(
            'flex flex-row items-center gap-3',
            clickable && 'cursor-pointer',
            className
          )}
          {...interactive}
          {...rest}
        >
          <Icon glyph={glyph} size="xl" aria-hidden />
          <div className="flex-1">
            {location ? <p className="text-xs text-muted">{location}</p> : null}
            <p className="text-sm text-on-surface">{label}</p>
          </div>
          <span className="text-2xl font-bold text-on-surface">
            {hasData ? `${temperature}${unit}` : '—'}
          </span>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        aria-label={a11y}
        className={cn('flex flex-col', clickable && 'cursor-pointer', className)}
        {...interactive}
        {...rest}
      >
        {location ? <p className="mb-1 text-sm text-muted">{location}</p> : null}

        <div className="flex flex-row items-center gap-3">
          <Icon glyph={glyph} size="3xl" aria-hidden />
          <span className="text-3xl font-extrabold text-on-surface sm:text-5xl">
            {hasData ? `${temperature}${unit}` : '—'}
          </span>
        </div>

        <p className="mt-1 text-lg font-semibold text-on-surface">{label}</p>

        <div className="mt-2 flex flex-row flex-wrap gap-3">
          {feelsLike != null ? (
            <span className="text-sm text-muted">
              Feels like {feelsLike}
              {unit}
            </span>
          ) : null}
          {high != null ? (
            <span className="text-sm text-muted">
              H {high}
              {unit}
            </span>
          ) : null}
          {low != null ? (
            <span className="text-sm text-muted">
              L {low}
              {unit}
            </span>
          ) : null}
        </div>
      </Card>
    );
  }
);
