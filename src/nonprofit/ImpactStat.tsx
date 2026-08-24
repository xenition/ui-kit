import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, type IconColor } from '../primitives/Icon';

/** Visual treatment of an {@link ImpactStat}. */
export type ImpactStatVariant = 'plain' | 'card' | 'tile';
export type ImpactStatTone = 'primary' | 'success' | 'accent';

export interface ImpactStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The headline figure, e.g. `12,480` or `3.2M`. */
  value: React.ReactNode;
  /** What the figure counts, e.g. `Meals served`. */
  label: string;
  /** Optional unit rendered muted after the value (e.g. `liters`). */
  unit?: string;
  /** Optional leading glyph/emoji (e.g. `💧`). */
  glyph?: string;
  /** Optional supporting caption below the label. */
  caption?: string;
  /** Surface treatment (default `plain`). `tile` adds a tinted panel. */
  variant?: ImpactStatVariant;
  /** Accent tone for the glyph chip / value (default `primary`). */
  tone?: ImpactStatTone;
}

// Web `Icon` has no `accent` slot → map it to `primary` (kit gotcha).
const ICON_COLOR: Record<ImpactStatTone, IconColor> = {
  primary: 'primary',
  success: 'success',
  accent: 'primary',
};

// Ramp tints exist for primary/accent; success has no ramp, so it borrows the
// primary tint panel (tone still reads through the glyph chip + value color).
const TILE_BG: Record<ImpactStatTone, string> = {
  primary: 'bg-primary-50',
  success: 'bg-primary-50',
  accent: 'bg-accent-50',
};

const CHIP_BG: Record<ImpactStatTone, string> = {
  primary: 'bg-primary-50',
  success: 'bg-primary-50',
  accent: 'bg-accent-50',
};

const VALUE_COLOR: Record<ImpactStatTone, string> = {
  primary: 'text-on-surface',
  success: 'text-on-surface',
  accent: 'text-on-surface',
};

/**
 * Web parity of the native `ImpactStat`: a single impact metric — a large
 * token-scaled figure, an optional unit, a caption label, and an optional glyph
 * chip. `variant` renders it bare (`plain`), inside a bordered `card`, or as a
 * tinted `tile`. The glyph is decorative; the metric is exposed as a group with
 * an `aria-label`. All colors come from the `--xen-*` token classes — no literal
 * colors.
 */
export const ImpactStat = React.forwardRef<HTMLDivElement, ImpactStatProps>(function ImpactStat(
  { value, label, unit, glyph, caption, variant = 'plain', tone = 'primary', className, ...rest },
  ref
) {
  const containerClass =
    variant === 'card'
      ? 'rounded-lg border border-border bg-surface p-md'
      : variant === 'tile'
        ? cn('rounded-lg p-md', TILE_BG[tone])
        : '';

  return (
    <div
      ref={ref}
      role="group"
      aria-label={`${String(value)}${unit ? ` ${unit}` : ''} ${label}`}
      className={cn('flex flex-col', containerClass, className)}
      {...rest}
    >
      <div className="flex items-center gap-sm">
        {glyph ? (
          <span
            className={cn(
              'inline-flex h-8 w-8 items-center justify-center rounded-full',
              CHIP_BG[tone]
            )}
          >
            <Icon glyph={glyph} size="base" color={ICON_COLOR[tone]} />
          </span>
        ) : null}
        <span className="flex items-end gap-xs">
          <span className={cn('text-3xl font-extrabold leading-none', VALUE_COLOR[tone])}>{value}</span>
          {unit ? <span className="pb-0.5 text-base text-muted">{unit}</span> : null}
        </span>
      </div>
      <span className="mt-xs text-sm text-muted">{label}</span>
      {caption ? <span className="mt-0.5 text-xs text-muted">{caption}</span> : null}
    </div>
  );
});
