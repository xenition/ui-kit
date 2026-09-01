import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { conditionGlyph, conditionLabel } from './weather-utils';
import type { CurrentWeatherProps } from './CurrentWeather';

/** Drop-in for {@link CurrentWeatherProps} — same props, a different design. */
export type CurrentWeatherV4Props = CurrentWeatherProps;

/**
 * CurrentWeather — **saturated hero** design (v4), web parity of the native
 * `CurrentWeatherV4`. A full `primary`-colored panel in the mold of a modern
 * weather app: an oversized temperature, the condition as a big glyph + label,
 * and feels-like / high / low as soft pill chips. Text sits on the brand ground
 * via the contrast-guaranteed `on-primary` token; chips use a lighter ramp step
 * — all colors come from `--xen-*` Tailwind classes, no literals. The condition
 * is a glyph AND text — never color alone. Renders a skeleton when `loading` and
 * a `—` placeholder when `temperature` is absent; `variant='compact'` collapses
 * to a single row. Same props as {@link CurrentWeatherProps}.
 */
export const CurrentWeatherV4 = React.forwardRef<HTMLDivElement, CurrentWeatherV4Props>(
  function CurrentWeatherV4(
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

    const ground = 'rounded-[var(--xen-radius-lg)] bg-gradient-to-b from-primary-400 to-primary-700 p-5';

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
        <div ref={ref} role="img" aria-label={a11y} className={cn(ground, 'flex flex-col gap-3', className)} {...rest}>
          <div className="h-4 w-32 animate-pulse rounded-[var(--xen-radius-sm)] bg-primary-500" />
          <div className="h-14 w-44 animate-pulse rounded-[var(--xen-radius-md)] bg-primary-500" />
          <div className="h-4 w-36 animate-pulse rounded-[var(--xen-radius-sm)] bg-primary-500" />
        </div>
      );
    }

    const chips: string[] = [];
    if (feelsLike != null) chips.push(`Feels ${feelsLike}${unit}`);
    if (high != null) chips.push(`H ${high}${unit}`);
    if (low != null) chips.push(`L ${low}${unit}`);

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          aria-label={a11y}
          className={cn(ground, 'flex flex-row items-center gap-3', clickable && 'cursor-pointer', className)}
          {...interactive}
          {...rest}
        >
          <Icon glyph={glyph} size="xl" aria-hidden color="onPrimary" />
          <div className="min-w-0 flex-1">
            {location ? <p className="truncate text-xs text-primary-100">{location}</p> : null}
            <p className="text-sm font-semibold text-on-primary">{label}</p>
          </div>
          <span className="text-2xl font-extrabold text-on-primary">
            {hasData ? `${temperature}${unit}` : '—'}
          </span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        aria-label={a11y}
        className={cn(ground, 'flex flex-col', clickable && 'cursor-pointer', className)}
        {...interactive}
        {...rest}
      >
        {location ? <p className="text-sm font-semibold text-primary-100">{location}</p> : null}

        <div className="mt-2 flex flex-row items-center justify-between">
          <span className="text-6xl font-extrabold tracking-tight text-on-primary">
            {hasData ? `${temperature}${unit}` : '—'}
          </span>
          <Icon glyph={glyph} size="3xl" aria-hidden color="onPrimary" />
        </div>

        <p className="mt-1 text-lg font-bold text-on-primary">{label}</p>

        {chips.length ? (
          <div className="mt-3 flex flex-row flex-wrap gap-2">
            {chips.map((c) => (
              <span key={c} className="rounded-full bg-primary-500 px-3 py-1 text-sm font-semibold text-on-primary">
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
