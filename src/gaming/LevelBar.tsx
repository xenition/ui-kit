import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives/Progress';
import { clamp, formatCount } from './types';

export type LevelBarVariant = 'default' | 'compact';

export interface LevelBarProps {
  /** Current level number, shown in the level chip. */
  level: number;
  /** XP earned toward the next level. */
  xp: number;
  /** XP required to reach the next level. */
  xpMax: number;
  /** Variant — `compact` hides the numeric `xp / xpMax` readout. */
  variant?: LevelBarVariant;
  /** Progress fill tone (default `primary`). */
  tone?: 'primary' | 'success' | 'warn' | 'danger';
  /** Extra classes on the root. */
  className?: string;
}

/**
 * An XP / level progress bar — a circular level chip beside a token `Progress`
 * fill sized to `xp / xpMax`, with an optional `xp / xpMax` readout. Guards a
 * zero/negative `xpMax` (renders an empty, non-`NaN` bar) and clamps `xp` into
 * range. The `Progress` carries `role="progressbar"` + an aria-label so the
 * fraction is announced, not conveyed by color alone. Composes `Progress`.
 * Token-only.
 */
export function LevelBar({
  level,
  xp,
  xpMax,
  variant = 'default',
  tone = 'primary',
  className,
}: LevelBarProps): React.ReactElement {
  const compact = variant === 'compact';
  const max = Number.isFinite(xpMax) && xpMax > 0 ? xpMax : 0;
  const value = max > 0 ? clamp(xp, 0, max) : 0;
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={cn('flex items-center gap-[var(--xen-space-md)]', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-primary font-bold text-on-primary',
          compact ? 'h-[30px] w-[30px] text-sm' : 'h-10 w-10 text-sm'
        )}
      >
        {level}
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <Progress
          value={value}
          max={max || 1}
          tone={tone}
          size={compact ? 'sm' : 'md'}
          aria-label={`Level ${level}, ${pct}% to next level`}
        />
        {!compact ? (
          <div className="flex justify-between">
            <span className="text-xs text-muted">{`${formatCount(value)} / ${formatCount(max)} XP`}</span>
            <span className="text-xs font-semibold text-muted">{`${pct}%`}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
