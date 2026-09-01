import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { IconV4 } from '../primitives/IconV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import type { QuestCardProps } from './QuestCard';
import type { QuestState } from './types';
import {
  BADGE_V4,
  IDENTITY_TONE,
  TABULAR_CLASS,
  type ToneV4,
  questParts,
  spokenLine,
} from './internal/arcade-v4';

export interface QuestCardV4Props extends QuestCardProps {
  /** Override the four lifecycle words. */
  stateLabels?: Partial<Record<QuestState, string>>;
  /** The word in front of the reward, in the card's name. Default `'Reward'`. */
  rewardLabel?: string;
}

const STATE_LABEL: Record<QuestState, string> = {
  locked: 'Locked',
  active: 'In progress',
  completed: 'Ready to claim',
  claimed: 'Claimed',
};

/**
 * `warn` is freed, and the two states that mean something keep a colour.
 *
 * The base ran `neutral` / `primary` / `warn` / `success`, which spent the
 * **warning** colour on "Ready to claim" — the most inviting state a quest
 * has — and the brand on merely being in progress. `locked` and `active` are
 * lifecycle facts with no health in them and take a neutral chip carrying
 * their word; `completed` is the state with an action waiting behind it, so it
 * takes the brand; `claimed` is the affirmative end state and takes `success`.
 */
const STATE_TONE: Record<QuestState, ToneV4> = {
  locked: IDENTITY_TONE,
  active: IDENTITY_TONE,
  completed: 'primary',
  claimed: 'success',
};

/**
 * **V4 quest card** — same props as {@link QuestCard} plus `stateLabels` and
 * `rewardLabel`.
 *
 * ## Four changes
 *
 * 1. **A locked quest is locked in words, not in dimming.** The base drew it
 *    at `opacity-60`, which sits inside M3's *disabled* band (0.38) and is
 *    therefore how the whole kit says "this control will not respond" — so a
 *    locked quest and a broken one looked alike, and neither the padlock nor
 *    the badge could be trusted to be the reason. The card draws at full
 *    strength; the padlock and the `Locked` chip carry the state, and the only
 *    thing actually disabled is the claim button, which really is.
 * 2. **The bar and the caption cannot disagree.** `questParts()` clamps once
 *    for both, and floors the goal at 1 — the V2 and V3 lines handed
 *    `quest.goal` straight to `aria-valuemax` while drawing a separately
 *    clamped percentage, so out-of-range input announced one number and drew
 *    another, and `goal: 0` produced an invalid range.
 * 3. **The reward medal stops being announced as decoration, and the card has
 *    one name.** `<Icon glyph="🏅" aria-label="Reward" />` made the medal its
 *    own focus stop that said "Reward" and nothing else, while the reward
 *    itself sat in unlabelled text beside it. The glyph is hidden and the
 *    reward joins the card's `group` name behind `rewardLabel`.
 * 4. **The status words are `stateLabels`**, where four English strings used
 *    to be compiled into the component, and the progress readout is tabular so
 *    it stops reflowing as a quest ticks up.
 */
export const QuestCardV4 = React.forwardRef<HTMLDivElement, QuestCardV4Props>(function QuestCardV4(
  { quest, state, claiming = false, onClaim, stateLabels, rewardLabel = 'Reward', className },
  ref
) {
  if (!quest?.title) return null;

  const parts = questParts(quest.progress, quest.goal);
  const derived: QuestState = state ?? (parts.complete ? 'completed' : 'active');
  const locked = derived === 'locked';
  const claimed = derived === 'claimed';
  const claimable = derived === 'completed';
  const stateWord = stateLabels?.[derived] ?? STATE_LABEL[derived];
  const progressText = `${parts.value} / ${parts.goal}`;

  return (
    <div
      ref={ref}
      role="group"
      aria-label={spokenLine([
        quest.title,
        stateWord,
        quest.description,
        progressText,
        quest.reward ? `${rewardLabel} ${quest.reward}` : undefined,
      ])}
      className={cn(
        'flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border',
        'bg-card p-lg text-on-card',
        className
      )}
    >
      <div className="flex items-start gap-sm">
        <IconV4
          glyph={locked ? '🔒' : '⚔️'}
          size="lg"
          color={locked ? 'muted' : 'onSurface'}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          <span className="line-clamp-2 font-heading text-base font-bold text-on-card">
            {quest.title}
          </span>
          {quest.description ? (
            <span className="line-clamp-2 text-sm text-muted-text">{quest.description}</span>
          ) : null}
        </div>
        <BadgeV4 {...BADGE_V4} tone={STATE_TONE[derived]}>
          {stateWord}
        </BadgeV4>
      </div>

      <div className="flex flex-col gap-xs">
        <ProgressV4
          value={parts.value}
          max={parts.goal}
          tone={claimed ? 'success' : 'primary'}
          size="sm"
          aria-label={spokenLine([quest.title, progressText])}
        />
        <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{progressText}</span>
      </div>

      <div className="flex items-center justify-between gap-sm">
        {quest.reward ? (
          <div className="flex items-center gap-xs">
            {/* Decoration: the reward is a word in the card's name, not a stop
                that announces "Reward" and stops there. */}
            <span aria-hidden="true" className="text-sm">
              🏅
            </span>
            <span className="text-sm font-semibold text-on-card">{quest.reward}</span>
          </div>
        ) : (
          <span />
        )}
        {onClaim ? (
          <ButtonV4
            variant={claimable ? 'primary' : 'secondary'}
            size="sm"
            disabled={!claimable || claiming}
            aria-busy={claiming || undefined}
            onClick={() => onClaim(quest)}
            aria-label={
              claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`
            }
          >
            {claimed ? (stateLabels?.claimed ?? STATE_LABEL.claimed) : 'Claim'}
          </ButtonV4>
        ) : null}
      </div>
    </div>
  );
});
