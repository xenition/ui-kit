import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface AchievementBadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Achievement name. */
  title: string;
  /** A short line describing how it's earned. */
  description?: string;
  /** Glyph shown on the earned medallion. Default `'🏅'`. */
  glyph?: string;
  /** Whether the badge has been unlocked. */
  earned?: boolean;
  /** Progress toward earning (0–1); shown as a caption on the locked medallion. */
  progress?: number;
  className?: string;
}

/**
 * AchievementBadge (web parity) — a medallion on a calm, clean surface card. When
 * earned, the medallion is a vivid brand gradient with the achievement glyph
 * (`color="onPrimary"`); when locked it falls back to a muted `bg-neutral-100`
 * disc with a lock (`text-muted`) and an optional progress caption. The
 * earned/locked state is carried by the label and the glyph, not by color alone.
 * Token-only colors — the reward gradient earns its saturation only once the
 * badge is unlocked.
 */
export const AchievementBadge = React.forwardRef<HTMLDivElement, AchievementBadgeProps>(function AchievementBadge(
  { title, description, glyph = '🏅', earned = false, progress, className, ...rest },
  ref
) {
  const pctLabel = progress != null ? `${Math.round(Math.max(0, Math.min(1, progress)) * 100)}%` : null;
  const a11y = `${title}, ${earned ? 'earned' : 'locked'}${!earned && pctLabel ? ', ' + pctLabel + ' complete' : ''}${
    description ? '. ' + description : ''
  }`;

  return (
    <div
      ref={ref}
      role="img"
      aria-label={a11y}
      data-xen-achievement-badge=""
      className={cn(
        'flex flex-col items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5',
        className
      )}
      {...rest}
    >
      {earned ? (
        <div
          aria-hidden="true"
          className="flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700"
        >
          <Icon glyph={glyph} size="2xl" color="onPrimary" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="flex h-[72px] w-[72px] flex-col items-center justify-center gap-0.5 rounded-full bg-neutral-100"
        >
          <Icon glyph="🔒" size="xl" color="muted" />
          {pctLabel ? <span className="text-xs font-bold text-muted">{pctLabel}</span> : null}
        </div>
      )}

      <div className="flex flex-col items-center gap-0.5">
        <p className={cn('text-center text-base font-bold', earned ? 'text-on-surface' : 'text-muted')}>{title}</p>
        {description ? <p className="text-center text-sm text-muted">{description}</p> : null}
      </div>
    </div>
  );
});
