import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { CampaignProgress } from './CampaignProgress';

/** Visual density of a {@link CauseCard}. */
export type CauseCardVariant = 'default' | 'compact' | 'featured';

export interface CauseCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Cause / program name. */
  title: string;
  /** Short description of the cause. */
  description?: string;
  /** Cover image URL; a token-filled placeholder is drawn when absent. */
  imageUrl?: string;
  /** Alt text for the cover (defaults to the title). */
  imageAlt?: string;
  /** Category label rendered as a badge (e.g. `Education`). */
  category?: string;
  /** Amount raised so far, integer **cents** (enables the mini progress meter). */
  raisedCents?: number;
  /** Goal, integer **cents**. */
  goalCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Density / emphasis. `featured` enlarges the cover and title. */
  variant?: CauseCardVariant;
  /** Click handler for the whole card (mirrors native `onPress`). */
  onClick?: () => void;
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
}

/**
 * Web parity of the native `CauseCard`: a browse tile for a single cause /
 * program — cover (image or token placeholder), a category badge, title, blurb,
 * and an optional inline `CampaignProgress` meter when a goal is supplied.
 * `variant` switches between a full card, a `compact` cover-less row, and a
 * larger `featured` treatment. When `onClick` is set the whole card becomes a
 * `role="button"` target with keyboard (Enter / Space) activation. All colors
 * come from the `--xen-*` token classes — no literal colors.
 */
export const CauseCard = React.forwardRef<HTMLDivElement, CauseCardProps>(function CauseCard(
  {
    title,
    description,
    imageUrl,
    imageAlt,
    category,
    raisedCents,
    goalCents,
    currency = 'USD',
    variant = 'default',
    onClick,
    loading = false,
    className,
    ...rest
  },
  ref
) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const container = 'overflow-hidden rounded-lg border border-border bg-surface';

  if (loading) {
    return (
      <div ref={ref} aria-label="Loading cause" aria-busy="true" className={cn(container, className)} {...rest}>
        <div className={cn('w-full bg-neutral-200', isFeatured ? 'h-44' : 'h-32')} />
        <div className="flex flex-col gap-sm p-md">
          <div className="h-4 w-8/12 rounded-sm bg-neutral-200" />
          <div className="h-3 w-11/12 rounded-sm bg-neutral-100" />
        </div>
      </div>
    );
  }

  const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';

  const cover = !isCompact ? (
    <div className={cn('relative w-full bg-neutral-100', isFeatured ? 'h-44' : 'h-32')}>
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt ?? title} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon glyph="🤝" size="2xl" aria-label={title} />
        </div>
      )}
      {category ? (
        <span className="absolute left-sm top-sm">
          <Badge tone="primary">{category}</Badge>
        </span>
      ) : null}
    </div>
  ) : null;

  const body = (
    <div className="flex flex-1 flex-col gap-xs p-md">
      {isCompact && category ? (
        <span>
          <Badge tone="primary">{category}</Badge>
        </span>
      ) : null}
      <span className={cn('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base')}>{title}</span>
      {description ? <span className="text-sm text-muted">{description}</span> : null}
      {hasProgress ? (
        <div className="mt-xs">
          <CampaignProgress raisedCents={raisedCents} goalCents={goalCents} currency={currency} />
        </div>
      ) : null}
    </div>
  );

  const layout = isCompact ? 'flex flex-row' : 'flex flex-col';

  if (onClick) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={title}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={cn(
          container,
          layout,
          'cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        {cover}
        {body}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(container, layout, className)} {...rest}>
      {cover}
      {body}
    </div>
  );
});
