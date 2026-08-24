import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives/Button';
import type { QuestCardProps } from './QuestCard';

/** Same public contract as {@link QuestCard} — a drop-in alternate design. */
export type QuestCardV2Props = QuestCardProps;

type QState = 'locked' | 'active' | 'completed' | 'claimed';

/**
 * QuestCard, redesigned (v2): a **bold quest banner**. A quest glyph tile leads the
 * title/description; a thick progress bar shows steps toward the goal, a reward
 * chip sits prominent, and a state-aware Claim button anchors the card. Elevated.
 * Distinct from v1. Same props, token-only.
 */
export const QuestCardV2 = React.forwardRef<HTMLDivElement, QuestCardV2Props>(function QuestCardV2(
  { quest, state, claiming = false, onClaim, className },
  ref
) {
  const derived: QState = state ?? (quest.progress >= quest.goal ? 'completed' : 'active');
  const locked = derived === 'locked';
  const claimed = derived === 'claimed';
  const claimable = derived === 'completed';
  const pct = quest.goal > 0 ? Math.min(100, Math.round((quest.progress / quest.goal) * 100)) : 0;

  return (
    <div ref={ref} data-xen-quest-card="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', locked && 'opacity-60', className)}>
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xl" aria-hidden>{locked ? '🔒' : '⚔️'}</span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-on-surface">{quest.title}</p>
          {quest.description ? <p className="text-xs text-muted">{quest.description}</p> : null}
        </div>
        {quest.reward ? <span className="rounded-full bg-warn/10 px-2 py-0.5 text-xs font-bold text-warn">🏆 {quest.reward}</span> : null}
      </div>
      <div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100" role="progressbar" aria-valuenow={quest.progress} aria-valuemin={0} aria-valuemax={quest.goal}>
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-1 text-right text-xs text-muted">{quest.progress} / {quest.goal}</p>
      </div>
      {onClaim && (claimable || claimed) ? (
        <Button size="md" variant="primary" className="w-full" disabled={claimed || claiming} onClick={() => onClaim(quest)}>
          {claimed ? 'Claimed' : 'Claim reward'}
        </Button>
      ) : null}
    </div>
  );
});
