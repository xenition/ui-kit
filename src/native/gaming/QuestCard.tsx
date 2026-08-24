import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Badge, Button, Card, Icon, Progress, useXenitionTheme } from '../primitives';
import { clamp, type Quest, type QuestState } from './types';

export interface QuestCardProps {
  /** The quest to render. */
  quest: Quest;
  /**
   * Lifecycle. Derives from progress when omitted (`completed` at goal, else
   * `active`). `locked` dims the card; `claimed` disables the reward button.
   */
  state?: QuestState;
  /** Show a spinner + block the claim button (claim in flight). */
  claiming?: boolean;
  /**
   * Called when the reward is claimed. The claim button appears (enabled) only
   * when the quest is `completed`; it reads "Claimed" once `state==='claimed'`.
   */
  onClaim?: (quest: Quest) => void;
  style?: StyleProp<ViewStyle>;
}

const STATE_LABEL: Record<QuestState, string> = {
  locked: 'Locked',
  active: 'In progress',
  completed: 'Ready to claim',
  claimed: 'Claimed',
};

/**
 * A quest / mission card — title, objective, a step progress bar, a reward
 * chip, and a state-aware Claim button. The status is shown as a labeled badge
 * (not color alone); the claim button only enables when `completed`. State is
 * derived from `progress/goal` when not supplied. `onClaim(quest)` fires the
 * intent. Composes `Card`, `Progress`, `Button`, `Badge`, `Icon`. Token-only.
 */
export function QuestCard({
  quest,
  state,
  claiming = false,
  onClaim,
  style,
}: QuestCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const goal = Math.max(1, quest.goal);
  const progress = clamp(quest.progress, 0, goal);
  const derived: QuestState = state ?? (progress >= goal ? 'completed' : 'active');
  const locked = derived === 'locked';
  const claimed = derived === 'claimed';
  const claimable = derived === 'completed';

  const tone = claimed ? 'success' : claimable ? 'warn' : locked ? 'neutral' : 'primary';

  return (
    <Card
      style={[{ gap: tokens.spacing.sm, opacity: locked ? 0.6 : 1 }, style]}
      accessibilityState={{ disabled: locked }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        <Icon glyph={locked ? '🔒' : '⚔️'} size="lg" color={locked ? 'muted' : 'onSurface'} />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={2}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {quest.title}
          </Text>
          {quest.description ? (
            <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {quest.description}
            </Text>
          ) : null}
        </View>
        <Badge tone={tone} variant="soft" size="sm">
          {STATE_LABEL[derived]}
        </Badge>
      </View>

      <View style={{ gap: 4 }}>
        <Progress value={progress} max={goal} tone={claimable || claimed ? 'success' : 'primary'} size="sm" />
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`${progress} / ${goal}`}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        {quest.reward ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Icon glyph="🏅" size="sm" color="warn" accessibilityLabel="Reward" />
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {quest.reward}
            </Text>
          </View>
        ) : (
          <View />
        )}
        {onClaim ? (
          <Button
            variant={claimable ? 'primary' : 'secondary'}
            size="sm"
            tone="success"
            loading={claiming}
            disabled={!claimable}
            onPress={() => onClaim(quest)}
            accessibilityLabel={claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`}
          >
            {claimed ? 'Claimed' : 'Claim'}
          </Button>
        ) : null}
      </View>
    </Card>
  );
}
