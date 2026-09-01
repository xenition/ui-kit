import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { WeatherStatProps } from './WeatherStat';

export type WeatherStatV4Props = WeatherStatProps;

/**
 * WeatherStat — **sky tile** design (v4), web parity of the native `WeatherStatV4`.
 * A polished metric tile: the leading glyph sits in a small gradient badge (the
 * brand ramp), the muted label rides above a big value with an optional unit
 * suffix, and a caption closes it. Same label / value / unit / caption / glyph
 * contract, defaults and empty handling as the base; `variant='plain'` drops the
 * card chrome. All colors flow through Tailwind token classes. Same props as
 * {@link WeatherStatProps}.
 */
export const WeatherStatV4 = React.forwardRef<HTMLDivElement, WeatherStatV4Props>(function WeatherStatV4(
  { label, value, unit, glyph, caption, variant = 'card', emptyValue = '—', className, ...rest },
  ref
) {
  const hasValue = value != null;
  const a11y = `${label}, ${hasValue ? `${value}${unit ? ' ' + unit : ''}` : 'no data'}`;

  const body = (
    <>
      <div className="flex flex-row items-center gap-2">
        {glyph ? (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-b from-primary-400 to-primary-700">
            <Icon glyph={glyph} size="base" color="onPrimary" aria-hidden />
          </span>
        ) : null}
        <span className="text-sm font-semibold text-muted">{label}</span>
      </div>

      <div className="mt-2 flex flex-row items-baseline gap-1">
        <span className="text-3xl font-extrabold text-on-surface">{hasValue ? value : emptyValue}</span>
        {unit && hasValue ? <span className="text-sm text-muted">{unit}</span> : null}
      </div>

      {caption ? <p className="mt-1 text-xs text-muted">{caption}</p> : null}
    </>
  );

  if (variant === 'plain') {
    return (
      <div ref={ref} role="img" aria-label={a11y} className={cn('flex flex-col', className)} {...rest}>
        {body}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="img"
      aria-label={a11y}
      className={cn('flex flex-col rounded-[var(--xen-radius-lg)] border border-border bg-surface p-5 shadow-lg', className)}
      {...rest}
    >
      {body}
    </div>
  );
});
