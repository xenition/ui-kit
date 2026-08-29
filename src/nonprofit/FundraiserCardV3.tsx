import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { CampaignProgressV3 } from './CampaignProgressV3';
import type { FundraiserCardProps } from './FundraiserCard';

/** Same public contract as {@link FundraiserCard} — a drop-in alternate design. */
export type FundraiserCardV3Props = FundraiserCardProps;

/**
 * FundraiserCard, redesigned (v3): a **dense fundraiser row**. A small thumbnail,
 * the title over an organizer line + a thin progress meter, and a compact Donate
 * button on the right — hairline-bordered for a list of campaigns. The opposite
 * of v2's cover hero. Same props, token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV3}, not
 * the base one, because an app that picks V3 picks it for every surface it sees.
 */
export const FundraiserCardV3 = React.forwardRef<HTMLDivElement, FundraiserCardV3Props>(
  function FundraiserCardV3(
    { title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency = 'USD', donorCount, variant, onDonate, onShare, loading = false, className, ...rest },
    ref
  ) {
    void variant;
    void onShare;

    if (loading) {
      return (
        <div ref={ref} data-xen-fundraiser-card="" aria-label="Loading fundraiser" className={cn('flex items-center gap-3 border-b border-border py-3', className)} {...rest}>
          <div className="h-12 w-12 animate-pulse rounded-md bg-neutral-100" />
          <div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" />
        </div>
      );
    }

    return (
      <div ref={ref} data-xen-fundraiser-card="" className={cn('flex items-center gap-3 border-b border-border py-3', className)} {...rest}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
          {imageUrl ? <img src={imageUrl} alt={imageAlt ?? title} className="h-full w-full object-cover" /> : '💝'}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
          <p className="flex items-center gap-1 truncate text-xs text-muted">
            <Avatar src={organizerAvatarUrl} name={organizerName} size="xs" /> {organizerName}
            {typeof donorCount === 'number' ? ` · ${donorCount} donors` : ''}
          </p>
          <div className="mt-1">
            <CampaignProgressV3 raisedCents={raisedCents} goalCents={goalCents} currency={currency} hideAmounts />
          </div>
        </div>
        {onDonate ? (
          <Button size="sm" variant="primary" onClick={onDonate}>
            Donate
          </Button>
        ) : null}
      </div>
    );
  }
);
