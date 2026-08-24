import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import type { QuestCardProps } from './QuestCard';

/** Same public contract as {@link QuestCard} — a drop-in alternate design. */
export type QuestCardV3Props = QuestCardProps;

type QState = 'locked' | 'active' | 'completed' | 'claimed';

/**
 * QuestCard, redesigned (v3): a **dense quest line**. The title over a thin
 * progress bar with `progress/goal`, the reward folded in, and a compact Claim on
 * the right — hairline-bordered for a quest log. The opposite of v2's banner. Same
 * props, token-only.
 */
export const QuestCardV3 = React.forwardRef<HTMLDivElement, QuestCardV3Props>(function QuestCardV3(
  { quest, state, claiming = false, onClaim, className },
  ref
) {
  const derived: QState = state ?? (quest.progress >= quest.goal ? 'completed' : 'active');
  const locked = derived === 'locked';
  const claimed = derived === 'claimed';
  const claimable = derived === 'completed';
  const pct = quest.goal > 0 ? Math.min(100, Math.round((quest.progress / quest.goal) * 100)) : 0;

  return (
    <div ref={ref} data-xen-quest-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', locked && 'opacity-60', className)}>
      <span className="text-lg" aria-hidden>{locked ? '🔒' : '⚔️'}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">
          {quest.title}
          {quest.reward ? <span className="ml-1.5 text-xs font-normal text-warn">🏆 {quest.reward}</span> : null}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-100" role="progressbar" aria-valuenow={quest.progress} aria-valuemin={0} aria-valuemax={quest.goal}>
            <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[10px] tabular-nums text-muted">{quest.progress}/{quest.goal}</span>
        </div>
      </div>
      {onClaim && (claimable || claimed) ? (
        <Button size="sm" variant="ghost" disabled={claimed || claiming} onClick={() => onClaim(quest)}>
          {claimed ? 'Claimed' : 'Claim'}
        </Button>
      ) : null}
    </div>
  );
});
