import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import { CampaignProgressV4 } from './CampaignProgressV4';
import type { CauseCardProps } from './CauseCard';

/** Drop-in for {@link CauseCardProps} — same props, the V4 "rally" design. */
export type CauseCardV4Props = CauseCardProps;

/**
 * CauseCard — **V4** "rally" design (web parity of the native V4). The warm,
 * mission-driven browse tile for a cause: an elevated rounded card with a soft
 * shadow, a cover (image or a friendly glyph in a soft-primary well), a
 * soft-primary category chip, a bold title + blurb, and an inline
 * `CampaignProgressV4` meter when a goal is supplied. Honors all three
 * `variant`s — `default` (cover on top), `compact` (cover-less row), and
 * `featured` (larger cover + title) — identical props/behavior to
 * {@link CauseCardProps}. `onClick` makes the whole card a keyboard-activatable
 * button. All colors from `--xen-*` token classes (no literals).
 */
export const CauseCardV4 = React.forwardRef<HTMLDivElement, CauseCardV4Props>(function CauseCardV4(
  { title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant = 'default', onClick, loading = false, className, ...rest },
  ref
) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const container = 'overflow-hidden rounded-lg border border-border bg-surface text-on-surface shadow-md';

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
    <div className={cn('relative w-full bg-primary/10', isFeatured ? 'h-44' : 'h-32')}>
      {imageUrl ? (
        <img src={imageUrl} alt={imageAlt ?? title} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Icon glyph="🤝" size="2xl" aria-label={title} />
        </div>
      )}
      {category ? (
        <span className="absolute left-sm top-sm">
          <Badge tone="primary" variant="soft">{category}</Badge>
        </span>
      ) : null}
    </div>
  ) : null;

  const body = (
    <div className="flex flex-1 flex-col gap-xs p-md">
      {isCompact && category ? (
        <span>
          <Badge tone="primary" variant="soft">{category}</Badge>
        </span>
      ) : null}
      <span className={cn('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base')}>{title}</span>
      {description ? <span className="text-sm text-muted">{description}</span> : null}
      {hasProgress ? (
        <div className="mt-sm">
          <CampaignProgressV4 raisedCents={raisedCents} goalCents={goalCents} currency={currency} />
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
        className={cn(container, layout, 'cursor-pointer text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className)}
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
