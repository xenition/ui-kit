import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Text } from '../primitives';
import type { FeatureLockCardProps } from './FeatureLockCard';

/** Drop-in for {@link FeatureLockCard} — identical props, different design. */
export type FeatureLockCardV3Props = FeatureLockCardProps;

/** §10.1 geometry: the 44pt minimum a whole-row target must clear. */
const TAP_TARGET = 44;

/**
 * Locked feature — V3, the compact line: **one row, the whole row is the
 * button**, ending in a chevron. No card, no badge circle, no separate CTA.
 *
 * The shape a settings list or a feature index needs. The base and V2 both put
 * a button inside a container, which means a list of eight gated features is a
 * list of eight buttons — and a user scanning it has to aim at a small target
 * inside a big one. Here the row is the target, which is how every other list
 * row in the kit behaves (§31: use the familiar interaction).
 *
 * `unlockLabel` moves to the row's accessible name rather than being drawn: the
 * chevron already says "this goes somewhere", and a visible "Unlock" beside it
 * would be the second affordance for one action.
 *
 * `variant` is accepted and ignored — this line is the compact row, and asking
 * it for a card is asking for the base.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
export function FeatureLockCardV3({
  title,
  description,
  icon = '🔒',
  planLabel = 'Pro',
  unlockLabel = 'Unlock',
  onUnlock,
  style,
}: FeatureLockCardV3Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (!title) return null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${planLabel}. ${unlockLabel}`}
      onPress={onUnlock}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          minHeight: TAP_TARGET,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: pressed ? colors.selected : 'transparent',
        },
        style,
      ]}
    >
      <Icon glyph={icon} size="lg" />
      <View style={{ flex: 1 }}>
        <Text size="base" weight="semibold" tone="onSurface">
          {title}
        </Text>
        {description ? (
          <Text size="xs" tone="mutedText" numberOfLines={1}>
            {description}
          </Text>
        ) : null}
      </View>
      {planLabel ? (
        <Text size="xs" weight="bold" tone="primaryText">
          {planLabel}
        </Text>
      ) : null}
      <Icon name="chevron-right" size="lg" color="mutedText" />
    </Pressable>
  );
}
