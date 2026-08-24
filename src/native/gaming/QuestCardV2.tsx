import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { Badge, Button, Icon, Progress, useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import { clamp, withAlpha, type QuestState } from './types';
import type { QuestCardProps } from './QuestCard';

/** Drop-in alternate of {@link QuestCardProps} — identical prop contract. */
export type QuestCardV2Props = QuestCardProps;

const STATE_LABEL: Record<QuestState, string> = {
  locked: 'Locked',
  active: 'In progress',
  completed: 'Ready to claim',
  claimed: 'Claimed',
};

const STATE_GLYPH: Record<QuestState, string> = {
  locked: '🔒',
  active: '⚔️',
  completed: '✨',
  claimed: '✅',
};

/**
 * QuestCard — design variant **V2**: an **elevated card led by a big progress
 * bar**, with a prominent reward badge and a full-width Claim CTA. Where V1 is a
 * bordered card with a header row and a small `sm` bar, V2 headlines the medium
 * progress bar + percentage under the title, floats the reward as a soft badge,
 * and stretches the claim button across the footer. Status is a glyph + labeled
 * badge (never color alone); state derives from `progress/goal` when omitted and
 * the CTA only enables when `completed`. Same props as {@link QuestCardProps}.
 * Token-only.
 */
export function QuestCardV2({
  quest,
  state,
  claiming = false,
  onClaim,
  style,
}: QuestCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 8 });

  const goal = Math.max(1, quest.goal);
  const progress = clamp(quest.progress, 0, goal);
  const derived: QuestState = state ?? (progress >= goal ? 'completed' : 'active');
  const locked = derived === 'locked';
  const claimed = derived === 'claimed';
  const claimable = derived === 'completed';
  const pct = Math.round((progress / goal) * 100);

  const tone = claimed ? 'success' : claimable ? 'warn' : locked ? 'neutral' : 'primary';

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View
        accessibilityState={{ disabled: locked }}
        style={[
          {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
            opacity: locked ? 0.6 : 1,
            ...shadow('md', tokens),
          },
          style,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: tokens.radius.md,
              backgroundColor: withAlpha(colors.primary, 0.1),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon glyph={STATE_GLYPH[derived]} size="lg" color={locked ? 'muted' : 'onSurface'} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
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
          <Progress value={progress} max={goal} tone={claimable || claimed ? 'success' : 'primary'} size="md" />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`${progress} / ${goal}`}</Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`${pct}%`}</Text>
          </View>
        </View>

        {quest.reward ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, alignSelf: 'flex-start' }}>
            <Badge tone="warn" variant="soft" size="md">
              {`🏅 ${quest.reward}`}
            </Badge>
          </View>
        ) : null}

        {onClaim ? (
          <Button
            variant={claimable ? 'primary' : 'secondary'}
            size="md"
            tone="success"
            loading={claiming}
            disabled={!claimable}
            onPress={() => onClaim(quest)}
            accessibilityLabel={claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`}
            style={{ alignSelf: 'stretch' }}
          >
            {claimed ? 'Claimed' : 'Claim reward'}
          </Button>
        ) : null}
      </View>
    </Animated.View>
  );
}
