import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Statistic } from '../primitives/Statistic';

/** `card` = bordered tile; `plain` = bare inline stat. */
export type WeatherStatVariant = 'card' | 'plain';

export interface WeatherStatProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'aria-label'> {
  /** Metric name (e.g. `'Humidity'`). */
  label: string;
  /** The value (already formatted). */
  value?: React.ReactNode;
  /** Unit/suffix rendered muted after the value (e.g. `'%'`, `'hPa'`). */
  unit?: string;
  /** Leading glyph (e.g. `'💧'`). Decorative; the label carries the meaning. */
  glyph?: string;
  /** Secondary caption under the value (e.g. `'Dew point 12°'`). */
  caption?: string;
  /** Layout. Default `'card'`. */
  variant?: WeatherStatVariant;
  /** Placeholder shown when `value` is absent. Default `'—'`. */
  emptyValue?: string;
}

/**
 * Compact weather metric tile (web parity of the native `WeatherStat`) —
 * humidity, pressure, visibility, dew point, etc. Built on the shared web
 * `Statistic` primitive: a leading glyph + muted label, a large token-scaled
 * value with an optional unit suffix, and a caption line. `variant='plain'`
 * drops the card chrome for use inside grids/rows. Renders a muted placeholder
 * when `value` is absent. All colors come from the `--xen-*` tokens via Tailwind
 * classes — no literal colors.
 */
export const WeatherStat = React.forwardRef<HTMLDivElement, WeatherStatProps>(function WeatherStat(
  { label, value, unit, glyph, caption, variant = 'card', emptyValue = '—', className, ...rest },
  ref
) {
  const hasValue = value != null;
  const a11y = `${label}, ${hasValue ? `${value}${unit ? ' ' + unit : ''}` : 'no data'}`;

  const stat = (
    <Statistic
      label={
        <span className="flex items-center gap-1">
          {glyph ? <Icon glyph={glyph} size="sm" aria-hidden /> : null}
          {label}
        </span>
      }
      value={hasValue ? value : emptyValue}
      suffix={unit && hasValue ? unit : undefined}
    />
  );

  const body = (
    <>
      {stat}
      {caption ? <p className="mt-1 text-xs text-muted">{caption}</p> : null}
    </>
  );

  if (variant === 'plain') {
    return (
      <div ref={ref} role="img" aria-label={a11y} className={className} {...rest}>
        {body}
      </div>
    );
  }

  return (
    <Card ref={ref} role="img" aria-label={a11y} className={cn('flex flex-col', className)} {...rest}>
      {body}
    </Card>
  );
});
