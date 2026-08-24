import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge, Button, Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { useEnter } from '../primitives/internal/motion';
import type { AdoptionCardProps, AdoptionStatus } from './AdoptionCard';

/** Drop-in alternate design for {@link AdoptionCard} — identical props. */
export type AdoptionCardV2Props = AdoptionCardProps;

const STATUS_META: Record<AdoptionStatus, { label: string; tone: 'success' | 'warn' | 'neutral' | 'accent'; slot: keyof SemanticColors }> = {
  available: { label: 'Available', tone: 'success', slot: 'success' },
  pending: { label: 'Pending', tone: 'warn', slot: 'warn' },
  adopted: { label: 'Adopted', tone: 'neutral', slot: 'muted' },
  fostered: { label: 'In foster', tone: 'accent', slot: 'accent' },
};

/**
 * Full-bleed photo hero — an immersive alternate to {@link AdoptionCard}. The
 * pet photo (or an emoji placeholder) fills a tall banner; the status chip and a
 * favorite heart float over the top, while the name, meta, fee and an apply CTA
 * sit on a bottom scrim. Text over the scrim uses light neutral-ramp tokens for
 * a consistent dark-photo overlay. Same `AdoptionCardProps`. Token-pure.
 */
export function AdoptionCardV2({
  name,
  breed,
  age,
  sex,
  shelter,
  photoUrl,
  glyph = '🐾',
  fee,
  status,
  favorited = false,
  applyLabel = 'Apply to adopt',
  onApply,
  onFavorite,
  onPress,
  style,
}: AdoptionCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const statusMeta = STATUS_META[status];
  const meta = [age, sex, breed].filter(Boolean).join(' · ');
  const showApply = onApply != null && status !== 'adopted';

  // Fixed light-on-dark overlay palette, sourced from the neutral ramp (tokens).
  const onScrim = tokens.ramps.neutral[50] ?? colors.surface;
  const onScrimMuted = tokens.ramps.neutral[200] ?? tokens.ramps.neutral[100] ?? colors.muted;
  const scrim = withAlpha(tokens.ramps.neutral[900] ?? '#000000', 0.55);

  const inner = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ height: 220, backgroundColor: tokens.ramps.neutral[100] ?? colors.border, alignItems: 'center', justifyContent: 'center' }}>
        {!photoUrl ? <Icon glyph={glyph} size={64} /> : null}

        <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
          <Badge tone={statusMeta.tone} variant="solid" size="sm">
            {statusMeta.label}
          </Badge>
        </View>

        {onFavorite ? (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: favorited }}
            accessibilityLabel={favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            onPress={onFavorite}
            style={{
              position: 'absolute',
              top: tokens.spacing.sm,
              right: tokens.spacing.sm,
              width: 36,
              height: 36,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text allowFontScaling={false} style={{ color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }}>
              {favorited ? '♥' : '♡'}
            </Text>
          </Pressable>
        ) : null}

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: tokens.spacing.lg,
            backgroundColor: scrim,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
          }}
        >
          <View style={{ flex: 1, gap: 2 }}>
            <Text numberOfLines={1} style={{ color: onScrim, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
              {name}
            </Text>
            {meta ? (
              <Text numberOfLines={1} style={{ color: onScrimMuted, fontSize: tokens.typography.scale.sm }}>
                {meta}
              </Text>
            ) : null}
            {shelter ? (
              <Text numberOfLines={1} style={{ color: onScrimMuted, fontSize: tokens.typography.scale.xs }}>
                📍 {shelter}
              </Text>
            ) : null}
            {fee ? (
              <Text style={{ color: onScrim, fontSize: tokens.typography.scale.base, fontWeight: '700', marginTop: 2 }}>{fee}</Text>
            ) : null}
          </View>
          {showApply ? (
            <Button variant="primary" size="sm" onPress={onApply}>
              {applyLabel}
            </Button>
          ) : null}
        </View>
      </View>
    </View>
  );

  const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
  if (!onPress) {
    return (
      <Animated.View accessibilityLabel={a11y} style={{ opacity: enter.opacity, transform: enter.transform }}>
        {inner}
      </Animated.View>
    );
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}>
        {inner}
      </Pressable>
    </Animated.View>
  );
}
