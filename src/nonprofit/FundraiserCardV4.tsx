import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { CampaignProgressV4 } from './CampaignProgressV4';
import type { FundraiserCardProps } from './FundraiserCard';

/** Drop-in for {@link FundraiserCardProps} — same props, the V4 "rally" design. */
export type FundraiserCardV4Props = FundraiserCardProps;

/**
 * FundraiserCard — **V4** "rally" design (web parity of the native V4). The warm,
 * mission-driven peer-to-peer fundraiser card: an elevated rounded card with a
 * soft shadow, an organizer identity row, a cover (image or a friendly glyph in a
 * soft-primary well), a bold title, an inline `CampaignProgressV4` meter
 * (raised/goal in integer cents, with the donor meta), and donate / share
 * actions. Honors all three `variant`s — `default` (cover on top), `compact`
 * (cover-less dense row), and `featured` (larger cover + title) — identical
 * props/behavior to {@link FundraiserCardProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
export const FundraiserCardV4 = React.forwardRef<HTMLDivElement, FundraiserCardV4Props>(
  function FundraiserCardV4(
    {
      title,
      organizerName,
      organizerAvatarUrl,
      imageUrl,
      imageAlt,
      raisedCents,
      goalCents,
      currency = 'USD',
      donorCount,
      variant = 'default',
      onDonate,
      onShare,
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const container = 'overflow-hidden rounded-lg border border-border bg-surface text-on-surface shadow-md';

    if (loading) {
      return (
        <div ref={ref} aria-label="Loading fundraiser" aria-busy="true" className={cn(container, className)} {...rest}>
          <div className={cn('w-full bg-primary/10', isFeatured ? 'h-44' : 'h-36')} />
          <div className="flex flex-col gap-sm p-md">
            <div className="h-4 w-8/12 rounded-sm bg-neutral-200" />
            <div className="h-3 w-6/12 rounded-sm bg-neutral-100" />
          </div>
        </div>
      );
    }

    const cover = !isCompact ? (
      <div className={cn('relative w-full bg-primary/10', isFeatured ? 'h-44' : 'h-36')}>
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt ?? title} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Icon glyph="🎗️" size="2xl" aria-label={title} />
          </div>
        )}
      </div>
    ) : null;

    return (
      <div ref={ref} className={cn(container, className)} {...rest}>
        {cover}

        <div className="flex flex-col gap-sm p-md">
          <div className="flex items-center gap-sm">
            <Avatar name={organizerName} src={organizerAvatarUrl} size="sm" />
            <span className="text-sm text-muted">{`by ${organizerName}`}</span>
          </div>

          <span className={cn('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base')}>{title}</span>

          <CampaignProgressV4
            raisedCents={raisedCents}
            goalCents={goalCents}
            currency={currency}
            donorCount={donorCount}
          />

          <div className="mt-xs flex gap-sm">
            <div className="flex-1">
              <Button variant="primary" onClick={onDonate} className="w-full">
                Donate
              </Button>
            </div>
            {onShare ? (
              <Button variant="outline" onClick={onShare} aria-label="Share fundraiser">
                <Icon glyph="↗" size="base" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
