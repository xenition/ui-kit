import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button, Icon, Text } from '../primitives';
import type { FeatureLockCardProps } from './FeatureLockCard';

/** Drop-in for {@link FeatureLockCard} — identical props, different design. */
export type FeatureLockCardV2Props = FeatureLockCardProps;

/** §10.1 geometry: the glyph plate that fills the banner's leading edge. */
const PLATE = 64;

/**
 * Locked feature — V2, the editorial line: a **banner** on the brand fill,
 * with the plan ribbon over it and the CTA as a light button on the colour.
 *
 * The base is a quiet card that says "this is locked". This one is an
 * advertisement: it is the loudest thing on whatever screen it lands on, which
 * is right when the gate IS the screen — an empty state, a feature the user
 * just tried to open — and wrong in a list, which is what V3 is for.
 *
 * The copy is `onPrimary` throughout rather than `onSurface`, so the contrast
 * promise is the one the compiler actually made about this fill; the CTA
 * inverts to a `surface` fill with `primaryText` on it, which is the only
 * shape that stays legible on top of a saturated band.
 *
 * `variant="inline"` is accepted and ignored: an inline banner is a
 * contradiction, and an app that wants a compact row wants V3.
 *
 * Same props as {@link FeatureLockCard}. Token-pure.
 */
export function FeatureLockCardV2({
  title,
  description,
  icon = '🔒',
  planLabel = 'Pro',
  unlockLabel = 'Unlock',
  onUnlock,
  style,
}: FeatureLockCardV2Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  if (!title) return null;

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          backgroundColor: colors.primary,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: PLATE,
            height: PLATE,
            borderRadius: tokens.radius.lg,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
          }}
        >
          <Icon glyph={icon} size="2xl" accessibilityLabel="Locked" />
        </View>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          {planLabel ? (
            <Badge tone="neutral" size="sm">
              {planLabel}
            </Badge>
          ) : null}
          <Text size="lg" weight="bold" tone="onPrimary">
            {title}
          </Text>
        </View>
      </View>

      {description ? (
        <Text size="sm" tone="onPrimary" style={{ opacity: 0.9 }}>
          {description}
        </Text>
      ) : null}

      <Button
        variant="secondary"
        size="md"
        onPress={onUnlock}
        accessibilityLabel={unlockLabel}
        style={{ alignSelf: 'stretch', backgroundColor: colors.surface }}
      >
        <Text size="base" weight="semibold" tone="primaryText">
          {unlockLabel}
        </Text>
      </Button>
    </View>
  );
}
