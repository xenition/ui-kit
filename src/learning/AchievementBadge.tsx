import * as React from 'react';
import { cn } from '../primitives/cn';

/** Achievement tier — sets the ring tone. */
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

/** Token `border-*` class per tier. */
const TIER_CLASS: Record<AchievementTier, string> = {
  bronze: 'border-warn',
  silver: 'border-muted',
  gold: 'border-accent',
  platinum: 'border-primary',
};

export type AchievementBadgeSize = 'sm' | 'md' | 'lg';

const SIZE_DIAMETER: Record<AchievementBadgeSize, number> = { sm: 48, md: 64, lg: 84 };

export interface AchievementBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Achievement title. */
  title: string;
  /** Icon / emoji shown in the medallion. */
  glyph?: string;
  /** Tier; sets the ring tone. */
  tier?: AchievementTier;
  /** Whether the achievement is unlocked; locked badges dim and show a 🔒. */
  unlocked?: boolean;
  /** Optional short description under the title. */
  description?: string;
  /** Size preset. */
  size?: AchievementBadgeSize;
  /** Hide the title/description labels (medallion only). */
  hideLabel?: boolean;
  /** Fires when the badge is clicked. */
  onSelect?: () => void;
}

/**
 * A gamification achievement badge: a tier-toned medallion with an icon, plus a
 * title / description. Locked achievements dim the medallion and overlay a lock
 * glyph (state is spoken, not color-only). Interactive badges are a
 * `role="button"` element with Enter/Space activation. Token-only colors
 * (`--xen-*`).
 */
export const AchievementBadge = React.forwardRef<HTMLDivElement, AchievementBadgeProps>(
  function AchievementBadge(
    { title, glyph = '🏆', tier = 'gold', unlocked = true, description, size = 'md', hideLabel = false, onSelect, className, ...rest },
    ref
  ) {
    const diameter = SIZE_DIAMETER[size];
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
            'flex items-center justify-center rounded-full border-[3px] bg-surface',
            unlocked ? TIER_CLASS[tier] : 'border-border opacity-50'
          )}
        >
          {unlocked ? glyph : '🔒'}
        </span>
        {!hideLabel ? (
          <>
            <span className={cn('truncate text-sm font-bold', unlocked ? 'text-on-surface' : 'text-muted')}>
              {title}
            </span>
            {description ? <span className="line-clamp-2 text-center text-xs text-muted">{description}</span> : null}
          </>
        ) : null}
      </div>
    );
  }
);
