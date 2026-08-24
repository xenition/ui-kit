import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Progress } from '../primitives/Progress';
import { clamp, type Quest, type QuestState } from './types';

export interface QuestCardProps {
  /** The quest to render. */
  quest: Quest;
  /**
   * Lifecycle. Derives from progress when omitted (`completed` at goal, else
   * `active`). `locked` dims the card; `claimed` disables the reward button.
   */
  state?: QuestState;
  /** Show the claim button as busy + block it (claim in flight). */
  claiming?: boolean;
  /**
   * Called when the reward is claimed. The claim button appears (enabled) only
   * when the quest is `completed`; it reads "Claimed" once `state==='claimed'`.
   */
  onClaim?: (quest: Quest) => void;
  /** Extra classes on the root card. */
  className?: string;
}

const STATE_LABEL: Record<QuestState, string> = {
  locked: 'Locked',
  active: 'In progress',
  completed: 'Ready to claim',
  claimed: 'Claimed',
};

const STATE_TONE: Record<QuestState, BadgeTone> = {
  locked: 'neutral',
  active: 'primary',
  completed: 'warn',
  claimed: 'success',
};

/**
 * A quest / mission card — title, objective, a step progress bar, a reward chip,
 * and a state-aware Claim button. The status is shown as a labeled badge (not
 * color alone); the claim button only enables when `completed`. State is derived
 * from `progress/goal` when not supplied. `onClaim(quest)` fires the intent.
 * Composes `Card`, `Progress`, `Button`, `Badge`, `Icon`. Token-only.
 */
export function QuestCard({
  quest,
  state,
  claiming = false,
  onClaim,
  className,
}: QuestCardProps): React.ReactElement {
  const goal = Math.max(1, quest.goal);
  const progress = clamp(quest.progress, 0, goal);
  const derived: QuestState = state ?? (progress >= goal ? 'completed' : 'active');
  const locked = derived === 'locked';
  const claimed = derived === 'claimed';
  const claimable = derived === 'completed';

  return (
    <Card
      className={cn('flex flex-col gap-[var(--xen-space-sm)]', locked && 'opacity-60', className)}
      aria-disabled={locked || undefined}
    >
      <div className="flex items-start gap-[var(--xen-space-sm)]">
        <Icon glyph={locked ? '🔒' : '⚔️'} size="lg" color={locked ? 'muted' : 'onSurface'} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className="line-clamp-2 text-base font-bold text-on-surface">{quest.title}</p>
          {quest.description ? (
            <p className="line-clamp-2 text-sm text-muted">{quest.description}</p>
          ) : null}
        </div>
        <Badge tone={STATE_TONE[derived]}>{STATE_LABEL[derived]}</Badge>
      </div>

      <div className="flex flex-col gap-1">
        <Progress value={progress} max={goal} tone={claimable || claimed ? 'success' : 'primary'} size="sm" />
        <span className="text-xs text-muted">{`${progress} / ${goal}`}</span>
      </div>

      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        {quest.reward ? (
          <div className="flex items-center gap-[var(--xen-space-xs)]">
            <Icon glyph="🏅" size="sm" color="warn" aria-label="Reward" />
            <span className="text-sm font-semibold text-on-surface">{quest.reward}</span>
          </div>
        ) : (
          <div />
        )}
        {onClaim ? (
          <Button
            variant={claimable ? 'primary' : 'secondary'}
            size="sm"
            disabled={!claimable || claiming}
            aria-busy={claiming || undefined}
            onClick={() => onClaim(quest)}
            aria-label={claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`}
          >
            {claimed ? 'Claimed' : 'Claim'}
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
