import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { CampaignProgress } from './CampaignProgress';
import type { FundraiserCardProps } from './FundraiserCard';

/** Same public contract as {@link FundraiserCard} — a drop-in alternate design. */
export type FundraiserCardV2Props = FundraiserCardProps;

/**
 * FundraiserCard, redesigned (v2): a **cover-hero fundraiser**. A tall cover image
 * with the organizer's avatar + name overlapping its lower edge, then the title,
 * a progress meter, and Donate/Share actions on the surface below. Elevated.
 * Distinct from v1's stacked card. Same props, token-only.
 */
export const FundraiserCardV2 = React.forwardRef<HTMLDivElement, FundraiserCardV2Props>(
  function FundraiserCardV2(
    { title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency = 'USD', donorCount, variant, onDonate, onShare, loading = false, className, ...rest },
    ref
  ) {
    void variant;
    void donorCount;

    if (loading) {
      return (
        <div ref={ref} data-xen-fundraiser-card="" aria-label="Loading fundraiser" className={cn('overflow-hidden rounded-lg bg-surface shadow-md', className)} {...rest}>
          <div className="h-32 animate-pulse bg-neutral-100" />
          <div className="space-y-2 p-md">
            <div className="h-4 w-2/3 animate-pulse rounded-sm bg-neutral-100" />
            <div className="h-2 w-full animate-pulse rounded-sm bg-neutral-100" />
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} data-xen-fundraiser-card="" className={cn('overflow-hidden rounded-lg bg-surface shadow-md', className)} {...rest}>
        <div className="relative h-32 bg-neutral-100">
          {imageUrl ? (
            <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl">💝</div>
          )}
          <div className="absolute -bottom-5 left-3 flex items-center gap-2">
            <div className="rounded-full border-2 border-surface">
              <Avatar src={organizerAvatarUrl} name={organizerName} size="md" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-md pb-md pt-7">
          <div>
            <p className="text-base font-bold text-on-surface">{title}</p>
            <p className="text-xs text-muted">by {organizerName}</p>
          </div>
          <CampaignProgress raisedCents={raisedCents} goalCents={goalCents} currency={currency} donorCount={donorCount} />
          <div className="flex gap-2">
            {onDonate ? (
              <Button size="md" variant="primary" className="flex-1" onClick={onDonate}>
                Donate
              </Button>
            ) : null}
            {onShare ? (
              <Button size="md" variant="outline" onClick={onShare}>
                Share
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
