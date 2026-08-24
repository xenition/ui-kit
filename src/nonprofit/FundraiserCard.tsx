import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Button } from '../primitives/Button';
import { Icon } from '../primitives/Icon';
import { CampaignProgress } from './CampaignProgress';

/** Visual density of a {@link FundraiserCard}. */
export type FundraiserCardVariant = 'default' | 'compact' | 'featured';

export interface FundraiserCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Fundraiser title. */
  title: string;
  /** Name of the person / team organizing. */
  organizerName: string;
  /** Organizer avatar URL (initials fallback otherwise). */
  organizerAvatarUrl?: string;
  /** Cover image URL; a token placeholder is drawn when absent. */
  imageUrl?: string;
  /** Alt text for the cover (defaults to the title). */
  imageAlt?: string;
  /** Amount raised so far, integer **cents**. */
  raisedCents: number;
  /** Goal, integer **cents** (divide-by-zero guarded downstream). */
  goalCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Donor count shown in the meta row. */
  donorCount?: number;
  /** Density / emphasis. `featured` enlarges the cover and title. */
  variant?: FundraiserCardVariant;
  /** Fires when the donate CTA is clicked (mirrors native `onPress`). */
  onDonate?: () => void;
  /** Fires when the share action is clicked (rendered when provided). */
  onShare?: () => void;
  /** Show a skeleton placeholder instead of content. */
  loading?: boolean;
}

/**
 * Web parity of the native `FundraiserCard`: a peer-to-peer fundraiser card —
 * organizer identity, an optional cover, the title, a `CampaignProgress` meter
 * (raised/goal in integer cents), and donate / share actions. `variant` switches
 * density; `compact` drops the cover. All colors come from the `--xen-*` token
 * classes — no literal colors.
 */
export const FundraiserCard = React.forwardRef<HTMLDivElement, FundraiserCardProps>(
  function FundraiserCard(
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
    const container = 'overflow-hidden rounded-lg border border-border bg-surface';

    if (loading) {
      return (
        <div ref={ref} aria-label="Loading fundraiser" aria-busy="true" className={cn(container, className)} {...rest}>
          <div className={cn('w-full bg-neutral-200', isFeatured ? 'h-44' : 'h-36')} />
          <div className="flex flex-col gap-sm p-md">
            <div className="h-4 w-8/12 rounded-sm bg-neutral-200" />
            <div className="h-3 w-6/12 rounded-sm bg-neutral-100" />
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(container, className)} {...rest}>
        {!isCompact ? (
          <div className={cn('w-full bg-neutral-100', isFeatured ? 'h-44' : 'h-36')}>
            {imageUrl ? (
              <img src={imageUrl} alt={imageAlt ?? title} loading="lazy" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Icon glyph="🎗️" size="2xl" aria-label={title} />
              </div>
            )}
          </div>
        ) : null}

        <div className="flex flex-col gap-sm p-md">
          <div className="flex items-center gap-sm">
            <Avatar name={organizerName} src={organizerAvatarUrl} size="sm" />
            <span className="text-sm text-muted">{`by ${organizerName}`}</span>
          </div>

          <span className={cn('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base')}>{title}</span>

          <CampaignProgress
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
