import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type BadgeTone } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { clamp, type QuestState } from './types';
import type { QuestCardProps } from './QuestCard';

/** Drop-in alternate of {@link QuestCardProps} — identical prop contract. */
export type QuestCardV3Props = QuestCardProps;

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
 * QuestCard — design variant **V3**: a **minimal single line with a status
 * dot**. A small tone dot plus its written status precede the title; the step
 * fraction and reward sit inline, and (when completed) a compact "Claim" text
 * button trails at the end. Where V1/V2 are cards with a progress bar, V3 is a
 * dense checklist row. The dot is always paired with a text label so state is
 * never signalled by color alone; state derives from `progress/goal` when
 * omitted and Claim only fires when `completed`. Same props as
 * {@link QuestCardProps}. Token-only, minimal.
 */
export function QuestCardV3({
  quest,
  state,
  claiming = false,
  onClaim,
  style,
}: QuestCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 6 });

  const goal = Math.max(1, quest.goal);
  const progress = clamp(quest.progress, 0, goal);
  const derived: QuestState = state ?? (progress >= goal ? 'completed' : 'active');
  const locked = derived === 'locked';
  const claimed = derived === 'claimed';
  const claimable = derived === 'completed';

  // Dot color traces to a semantic token via the tone map; cast to index colors.
  const toneKey = STATE_TONE[derived];
  const palette = colors as unknown as Record<string, string>;
  const dotColor = palette[toneKey === 'neutral' ? 'muted' : toneKey] ?? colors.muted;

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View
        accessibilityState={{ disabled: locked }}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            borderBottomWidth: 1,
            borderColor: colors.border,
            opacity: locked ? 0.6 : 1,
          },
          style,
        ]}
      >
        <View
          accessible
          accessibilityLabel={STATE_LABEL[derived]}
          style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: dotColor }}
        />
        <View style={{ flex: 1, gap: 1 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {quest.title}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`${STATE_LABEL[derived]} · ${progress}/${goal}${quest.reward ? ` · 🏅 ${quest.reward}` : ''}`}
          </Text>
        </View>
        {onClaim ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`}
            accessibilityState={{ disabled: !claimable || claiming }}
            disabled={!claimable || claiming}
            onPress={() => onClaim(quest)}
            hitSlop={8}
          >
            <Text
              style={{
                color: claimable ? colors.primary : colors.muted,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '700',
              }}
            >
              {claimed ? 'Claimed' : 'Claim'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}
