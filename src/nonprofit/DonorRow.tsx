import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal';

/** Recognition tier for a donor. */
export type DonorTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface DonorRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Donor name. */
  name: string;
  /** Avatar image URL (initials fallback otherwise). */
  avatarUrl?: string;
  /** Lifetime giving, integer **cents**. */
  totalCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Number of gifts made. */
  giftCount?: number;
  /** Recognition tier rendered as a badge. */
  tier?: DonorTier;
  /** Rank position shown as a leading number (e.g. leaderboard). */
  rank?: number;
  /** Mark this donor as anonymous (name is replaced with a generic label). */
  anonymous?: boolean;
  /** Fires when the row is clicked (mirrors native `onPress`). */
  onClick?: () => void;
}

const TIER: Record<DonorTier, { tone: BadgeTone; label: string }> = {
  bronze: { tone: 'warn', label: 'Bronze' },
  silver: { tone: 'neutral', label: 'Silver' },
  gold: { tone: 'warn', label: 'Gold' },
  platinum: { tone: 'primary', label: 'Platinum' },
};

/**
 * Web parity of the native `DonorRow`: a donor list / leaderboard row —
 * optional rank, avatar, name, an optional recognition-tier badge, lifetime
 * giving (integer cents → `formatMoney`), and a gift count. Anonymous donors
 * show a generic label and a placeholder avatar. When `onClick` is set the row
 * is a `role="button"` target with keyboard activation. All colors come from the
 * `--xen-*` token classes — no literal colors.
 */
export const DonorRow = React.forwardRef<HTMLDivElement, DonorRowProps>(function DonorRow(
  {
    name,
    avatarUrl,
    totalCents,
    currency = 'USD',
    giftCount,
    tier,
    rank,
    anonymous = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const displayName = anonymous ? 'Anonymous donor' : name;
  const tierMeta = tier ? TIER[tier] : null;
  const label = `${displayName}, ${formatMoney(totalCents, currency)} donated`;

  const inner = (
    <>
      {typeof rank === 'number' ? (
        <span className="min-w-lg text-center text-base font-extrabold text-muted">{rank}</span>
      ) : null}
      <Avatar name={anonymous ? undefined : name} src={anonymous ? undefined : avatarUrl} size="sm" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex flex-wrap items-center gap-sm">
          <span className="text-base font-semibold text-on-surface">{displayName}</span>
          {tierMeta ? <Badge tone={tierMeta.tone}>{tierMeta.label}</Badge> : null}
        </div>
        {typeof giftCount === 'number' ? (
          <div className="flex items-center gap-xs">
            <Icon glyph="🎁" size="xs" color="muted" />
            <span className="text-sm text-muted">{`${giftCount} gifts`}</span>
          </div>
        ) : null}
      </div>
      <span className="text-base font-bold text-on-surface">{formatMoney(totalCents, currency)}</span>
    </>
  );

  const rowClass = 'flex items-center gap-md rounded-md bg-surface px-md py-sm';

  if (onClick) {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className={cn(
          rowClass,
          'cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        {...rest}
      >
        {inner}
      </div>
    );
  }

  return (
    <div ref={ref} aria-label={label} className={cn(rowClass, className)} {...rest}>
      {inner}
    </div>
  );
});
