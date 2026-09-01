import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/chrome-v4';
import {
  BADGE_V4,
  IDENTITY_TONE,
  placeholderGround,
  questParts,
  spokenLine,
  toneFill,
  type ToneV4,
} from './internal/arcade-v4';
import type { QuestState } from './types';
import type { QuestCardProps } from './QuestCard';

export interface QuestCardV4Props extends QuestCardProps {
  /** Status wording per state. Each key defaults to the base's own copy. */
  stateLabels?: Partial<Record<QuestState, string>>;
  /** What the reward line is called to a screen reader. Default `'Reward'`. */
  rewardLabel?: string;
}

const STATE_LABEL: Record<QuestState, string> = {
  locked: 'Locked',
  active: 'In progress',
  completed: 'Ready to claim',
  claimed: 'Claimed',
};

/**
 * A quest's lifecycle is a status, so it may hold status tones — but only
 * where the tone means what it says. `completed` was `warn`, which is the tone
 * this kit spends on "something needs your attention *and it is not good*";
 * a finished quest waiting to be collected is the actionable one, so it takes
 * the emphasis slot instead and `warn` goes back to meaning warn.
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
 * ## Six changes
 *
 * 1. **The step bar cannot disagree with itself.** The base clamped the drawn
 *    fill and handed `Progress` a raw `goal`, so out-of-range input drew one
 *    fraction and announced another, and a `goal` of 0 produced an invalid
 *    range. `questParts()` reads both from one place.
 * 2. **The bar is a named `progressbar` outside the card's spoken name**, so
 *    the reader can reach the value at all — the base's meter carried no label
 *    and sat under a plain caption.
 * 3. **A locked quest is not dimmed to 0.6.** That is inside M3's disabled
 *    band, so a quest the user simply has not unlocked yet looked like a
 *    broken control, and the whole card — title, objective, reward — lost
 *    contrast with it. The padlock and the "Locked" badge carry the state, in
 *    words, at full strength.
 * 4. **The reward medal and the status badge stop being announced
 *    decorations.** The medal was a focus stop that said "Reward" and nothing
 *    else; the reward, the state and the objective are now part of the card's
 *    one name, and the glyphs are drawn.
 * 5. **A reward is identity, not a warning.** The medal was `warn` and the
 *    `In progress` badge was `primary`; every user-visible string in the card
 *    is now a prop.
 * 6. **Claim drops `tone="success"`.** The native base drew it green and the
 *    web base drew it plain — the third instance of this module's
 *    emphasis drift, beside `MatchmakingStatus`'s Accept and Cancel. Claiming
 *    is the card's *primary* action, not an announcement that something
 *    succeeded, so it is `primary` alone on both twins. The progress fill
 *    keeps `success` at completion: that is a meter reporting a state, not a
 *    control advertising one.
 */
export function QuestCardV4({
  quest,
  state,
  claiming = false,
  stateLabels,
  rewardLabel = 'Reward',
  onClaim,
  style,
}: QuestCardV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const tap = minTap(tokens.spacing);

  const parts = questParts(quest.progress, quest.goal);
  const derived: QuestState = state ?? (parts.complete ? 'completed' : 'active');
  const locked = derived === 'locked';
  const claimed = derived === 'claimed';
  const claimable = derived === 'completed';
  const statusText = stateLabels?.[derived] ?? STATE_LABEL[derived];

  const stepLine = `${parts.value} / ${parts.goal}`;
  const name = spokenLine([
    quest.title,
    quest.description,
    statusText,
    quest.reward ? `${rewardLabel}, ${quest.reward}` : null,
  ]);

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          padding: tokens.spacing.lg,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
        },
        style,
      ]}
    >
      <View
        accessible
        accessibilityLabel={name}
        style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}
      >
        <TextV4 size="lg" tone={locked ? 'mutedText' : 'onCard'}>
          {locked ? '🔒' : '⚔️'}
        </TextV4>
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={2}>
            {quest.title}
          </TextV4>
          {quest.description ? (
            <TextV4 size="sm" tone="mutedText" numberOfLines={2}>
              {quest.description}
            </TextV4>
          ) : null}
        </View>
        <BadgeV4 {...BADGE_V4} tone={STATE_TONE[derived]}>
          {statusText}
        </BadgeV4>
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        {/* Change 2: named here, because a label on the group above would
            prune the value this element exists to report. */}
        <View
          accessibilityRole="progressbar"
          accessibilityLabel={stepLine}
          accessibilityValue={{ min: 0, max: parts.goal, now: parts.value }}
          style={{
            height: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: placeholderGround(theme),
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: `${Math.round(parts.ratio * 100)}%`,
              height: '100%',
              backgroundColor: toneFill(theme, claimable || claimed ? 'success' : 'primary'),
            }}
          />
        </View>
        <TextV4
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          size="xs"
          tone="mutedText"
          numeric="tabular"
        >
          {stepLine}
        </TextV4>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        {quest.reward ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}
          >
            <TextV4 size="sm" tone="mutedText">🏅</TextV4>
            <TextV4 size="sm" weight="semibold" tone="onCard">
              {quest.reward}
            </TextV4>
          </View>
        ) : (
          <View />
        )}
        {onClaim ? (
          <ButtonV4
            variant={claimable ? 'primary' : 'secondary'}
            size="sm"
            loading={claiming}
            disabled={!claimable}
            onPress={() => onClaim(quest)}
            accessibilityLabel={spokenLine([
              claimed ? statusText : 'Claim',
              rewardLabel,
              quest.title,
            ])}
            style={{ minHeight: tap }}
          >
            {claimed ? statusText : 'Claim'}
          </ButtonV4>
        ) : null}
      </View>
    </View>
  );
}
