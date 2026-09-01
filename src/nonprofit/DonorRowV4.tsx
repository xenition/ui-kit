import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Avatar } from '../primitives/Avatar';
import { Icon } from '../primitives/Icon';
import { formatMoney } from './internal';
import type { DonorRowProps, DonorTier } from './DonorRow';

/** Drop-in for {@link DonorRowProps} — same props, the V4 "rally" design. */
export type DonorRowV4Props = DonorRowProps;

const TIER: Record<DonorTier, { tone: BadgeTone; label: string; glyph: string }> = {
  bronze: { tone: 'warn', label: 'Bronze', glyph: '🥉' },
  silver: { tone: 'neutral', label: 'Silver', glyph: '🥈' },
  gold: { tone: 'warn', label: 'Gold', glyph: '🥇' },
  platinum: { tone: 'primary', label: 'Platinum', glyph: '💎' },
};

/**
 * DonorRow — **V4** "rally" design (web parity of the native V4). An elevated,
 * rounded donor / leaderboard row on a clean surface (no gradient): a leading
 * avatar in a soft-primary well, an optional rank, a bold donor name with a
 * glyph + labelled recognition-tier {@link Badge} (never color alone), an
 * optional gift-count chip, and a trailing bold lifetime-giving total (integer
 * cents → `formatMoney`). Anonymous donors show a generic label + placeholder
 * avatar. When `onClick` is set the whole row is a keyboard-activatable
 * `role="button"`. Identical props/behavior to {@link DonorRowProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
export const DonorRowV4 = React.forwardRef<HTMLDivElement, DonorRowV4Props>(function DonorRowV4(
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
  const label = `${displayName}, ${formatMoney(totalCents, currency)} donated${tierMeta ? `, ${tierMeta.label}` : ''}`;

  const container = 'flex items-center gap-md rounded-lg border border-border bg-surface text-on-surface shadow-md px-md py-sm';

  const inner = (
    <>
      {typeof rank === 'number' ? (
        <span className="min-w-lg text-center text-base font-extrabold text-muted">{rank}</span>
      ) : null}
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Avatar name={anonymous ? undefined : name} src={anonymous ? undefined : avatarUrl} size="sm" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-xs">
        <div className="flex flex-wrap items-center gap-sm">
          <span className="text-base font-bold text-on-surface">{displayName}</span>
          {tierMeta ? (
            <Badge tone={tierMeta.tone} variant="soft">
              <Icon glyph={tierMeta.glyph} size="xs" aria-hidden />
              {tierMeta.label}
            </Badge>
          ) : null}
        </div>
        {typeof giftCount === 'number' ? (
          <span className="inline-flex w-fit items-center gap-xs rounded-full bg-primary/10 px-sm py-px text-sm text-primary">
            <Icon glyph="🎁" size="xs" aria-hidden />
            {`${giftCount} gifts`}
          </span>
        ) : null}
      </div>
      <span className="text-base font-bold text-on-surface">{formatMoney(totalCents, currency)}</span>
    </>
  );

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
          container,
          'cursor-pointer text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        {...rest}
      >
        {inner}
      </div>
    );
  }

  return (
    <div ref={ref} aria-label={label} className={cn(container, className)} {...rest}>
      {inner}
    </div>
  );
});
