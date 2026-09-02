import * as React from 'react';
import { cn } from '../primitives/cn';
import type { AchievementBadgeProps, AchievementTier, AchievementBadgeSize } from './AchievementBadge';

/** Drop-in for {@link AchievementBadgeProps} — same props, the V4 "campus" design. */
export type AchievementBadgeV4Props = AchievementBadgeProps;

const TIER_META: Record<AchievementTier, { ring: string; well: string }> = {
  bronze: { ring: 'border-warn', well: 'bg-warn/10' },
  silver: { ring: 'border-muted', well: 'bg-neutral-100' },
  gold: { ring: 'border-accent', well: 'bg-accent/10' },
  platinum: { ring: 'border-primary', well: 'bg-primary/10' },
};

const SIZE_DIAMETER: Record<AchievementBadgeSize, number> = { sm: 48, md: 64, lg: 84 };

/**
 * AchievementBadge — **V4** "campus" design (web parity of the native V4). A
 * gamification achievement badge: a tier-toned medallion (a tinted well inside a
 * toned ring) with an icon, plus a title / description. Locked achievements dim
 * the medallion and overlay a 🔒 (state is spoken, not color-only). Interactive
 * badges are a keyboard-operable `role="button"`. Identical props/behavior to
 * {@link AchievementBadgeProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export const AchievementBadgeV4 = React.forwardRef<HTMLDivElement, AchievementBadgeV4Props>(function AchievementBadgeV4(
  { title, glyph = '🏆', tier = 'gold', unlocked = true, description, size = 'md', hideLabel = false, onSelect, className, ...rest },
  ref
) {
  const diameter = SIZE_DIAMETER[size];
  const meta = TIER_META[tier];
  const a11y = `${title} achievement, ${tier} tier, ${unlocked ? 'unlocked' : 'locked'}`;
  const interactive = !!onSelect;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (!interactive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  return (
    <div
      ref={ref}
      data-xen-achievement-badge=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={a11y}
      onClick={interactive ? onSelect : undefined}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex flex-col items-center gap-1',
        interactive && 'cursor-pointer self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{ width: diameter, height: diameter, fontSize: diameter * 0.42 }}
        className={cn(
          'flex items-center justify-center rounded-full border-[3px] shadow-sm',
          unlocked ? cn(meta.ring, meta.well) : 'border-border bg-neutral-100 opacity-50'
        )}
      >
        {unlocked ? glyph : '🔒'}
      </span>
      {!hideLabel ? (
        <>
          <span className={cn('truncate text-sm font-bold', unlocked ? 'text-on-surface' : 'text-muted')}>{title}</span>
          {description ? <span className="line-clamp-2 text-center text-xs text-muted">{description}</span> : null}
        </>
      ) : null}
    </div>
  );
});
