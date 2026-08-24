import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import type { Achievement } from './types';

export type AchievementUnlockVariant = 'toast' | 'inline';

export interface AchievementUnlockProps {
  /** The achievement to celebrate. */
  achievement: Achievement;
  /**
   * - `toast`  — a compact banner for a transient unlock notification (default).
   * - `inline` — a larger centered card for a details / list surface.
   */
  variant?: AchievementUnlockVariant;
  /**
   * Whether it's unlocked. `false` renders a locked/greyed placeholder (a
   * padlock + "Locked"), so the same component covers both trophy states.
   */
  unlocked?: boolean;
  /** Overline above the title, e.g. `'Achievement unlocked'`. */
  label?: string;
  /** Called when the banner is clicked — open the achievement. */
  onClick?: (achievement: Achievement) => void;
  /** Extra classes on the root card. */
  className?: string;
}

/**
 * An achievement / trophy unlock surface — a glyph medallion, an overline, the
 * title + criteria, and a point value. Locked achievements render a padlock and
 * muted copy (state shown via text + icon, not color alone). `toast` is a
 * compact banner; `inline` is a centered card. `onClick` opens it (a real
 * `<button>`; disabled while locked). Composes `Card`, `Icon`. Token-only.
 */
export function AchievementUnlock({
  achievement,
  variant = 'toast',
  unlocked = true,
  label = 'Achievement unlocked',
  onClick,
  className,
}: AchievementUnlockProps): React.ReactElement {
  const inline = variant === 'inline';
  const accentText = unlocked ? 'text-warn' : 'text-muted';
  const accentBorder = unlocked ? 'border-warn' : 'border-border';

  const badge = (
    <span
      aria-hidden="true"
      className={cn(
        'flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 bg-neutral-100',
        accentBorder
      )}
    >
      <Icon glyph={unlocked ? achievement.glyph ?? '🏆' : '🔒'} size="2xl" color={unlocked ? 'warn' : 'muted'} />
    </span>
  );

  const text = (
    <div className={cn('flex flex-col gap-0.5', inline ? 'items-center text-center' : 'flex-1 items-start')}>
      <span className={cn('text-xs font-bold uppercase tracking-wide', accentText)}>
        {unlocked ? label : 'Locked'}
      </span>
      <span className="line-clamp-2 text-lg font-bold text-on-surface">{achievement.title}</span>
      {achievement.description ? (
        <span className={cn('text-sm text-muted', inline ? 'line-clamp-3' : 'line-clamp-2')}>
          {achievement.description}
        </span>
      ) : null}
      {achievement.points != null ? (
        <span className="mt-0.5 text-xs font-semibold text-muted">{`${achievement.points} G`}</span>
      ) : null}
    </div>
  );

  const a11yLabel = `${unlocked ? label : 'Locked achievement'}: ${achievement.title}`;
  const cardClass = cn(
    'flex',
    inline ? 'flex-col items-center gap-[var(--xen-space-sm)]' : 'flex-row items-center gap-[var(--xen-space-md)]'
  );

  if (!onClick) {
    return (
      <Card role="group" aria-label={a11yLabel} className={cn(cardClass, className)}>
        {badge}
        {text}
      </Card>
    );
  }
  return (
    <button
      type="button"
      aria-label={a11yLabel}
      aria-disabled={!unlocked || undefined}
      onClick={() => onClick(achievement)}
      className={cn(
        'block w-full text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
    >
      <Card className={cardClass}>
        {badge}
        {text}
      </Card>
    </button>
  );
}
