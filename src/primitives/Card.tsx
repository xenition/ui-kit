import * as React from 'react';
import { cn } from './cn';

export type CardVariant = 'elevated' | 'outlined' | 'flat' | 'interactive';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardRadius = 'sm' | 'md' | 'lg' | 'full';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Surface treatment. Defaults to the historical bordered surface
   * (`outlined`). `elevated` deepens the shadow, `flat` drops the border and
   * shadow, `interactive` keeps the border plus a hover raise for tappable
   * cards.
   */
  variant?: CardVariant;
  /** Padding scale. Defaults to the historical `lg` padding. */
  padding?: CardPadding;
  /** Corner radius scale. Defaults to the historical `lg` radius. */
  radius?: CardRadius;
}

const VARIANT_CLASSES: Record<CardVariant, string> = {
  // Historical look: bordered surface with a subtle shadow.
  outlined: 'border border-border shadow-sm',
  elevated: 'border border-border shadow-md',
  flat: '',
  interactive:
    'border border-border shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md',
};

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-[var(--xen-space-sm)]',
  md: 'p-[var(--xen-space-md)]',
  lg: 'p-[var(--xen-space-lg)]',
};

const RADIUS_CLASSES: Record<CardRadius, string> = {
  sm: 'rounded-[var(--xen-radius-sm)]',
  md: 'rounded-[var(--xen-radius-md)]',
  lg: 'rounded-[var(--xen-radius-lg)]',
  full: 'rounded-[var(--xen-radius-full)]',
};

/**
 * Themed surface container: token-bound background, border, and radius. The
 * default (`outlined`, `lg` padding, `lg` radius) renders exactly as before;
 * `variant`/`padding`/`radius` are additive opt-ins mirroring the native
 * `Card`. No literal colors.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = 'outlined', padding, radius, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-surface text-on-surface',
        VARIANT_CLASSES[variant],
        RADIUS_CLASSES[radius ?? 'lg'],
        PADDING_CLASSES[padding ?? 'lg'],
        className
      )}
      {...rest}
    />
  );
});
