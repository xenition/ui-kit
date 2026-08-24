import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge, Button, Icon } from '../primitives';
import type { AdoptionCardProps, AdoptionStatus } from './AdoptionCard';

/** Drop-in alternate design for {@link AdoptionCard} — identical props. */
export type AdoptionCardV3Props = AdoptionCardProps;

const STATUS_META: Record<AdoptionStatus, { label: string; tone: 'success' | 'warn' | 'neutral' | 'accent'; slot: keyof SemanticColors }> = {
  available: { label: 'Available', tone: 'success', slot: 'success' },
  pending: { label: 'Pending', tone: 'warn', slot: 'warn' },
  adopted: { label: 'Adopted', tone: 'neutral', slot: 'muted' },
  fostered: { label: 'In foster', tone: 'accent', slot: 'accent' },
};

/**
 * Horizontal media-left row — a compact list alternate to {@link AdoptionCard}.
 * A square photo (or emoji placeholder) leads the row; name, meta, shelter, a
 * status chip and the fee + apply action stack on the right, with an optional
 * favorite heart in the top corner. Availability reads via a labelled chip. Same
 * `AdoptionCardProps`. Token-pure.
 */
export function AdoptionCardV3({
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
  applyLabel = 'Apply',
  onApply,
  onFavorite,
  onPress,
  style,
}: AdoptionCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const statusMeta = STATUS_META[status];
  const meta = [age, sex, breed].filter(Boolean).join(' · ');
  const showApply = onApply != null && status !== 'adopted';

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.md,
          padding: tokens.spacing.sm,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
        },
        style,
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={{
          width: 84,
          height: 84,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[100] ?? colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!photoUrl ? <Icon glyph={glyph} size="2xl" /> : null}
        <View style={{ position: 'absolute', top: 4, left: 4 }}>
          <Badge tone={statusMeta.tone} variant="solid" size="sm">
            {statusMeta.label}
          </Badge>
        </View>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }}>
          <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {name}
          </Text>
          {onFavorite ? (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: favorited }}
              accessibilityLabel={favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
              onPress={onFavorite}
              hitSlop={8}
            >
              <Text allowFontScaling={false} style={{ color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }}>
                {favorited ? '♥' : '♡'}
              </Text>
            </Pressable>
          ) : null}
        </View>
        {meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}
        {shelter ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            📍 {shelter}
          </Text>
        ) : null}
        {fee || showApply ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
            {fee ? (
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{fee}</Text>
            ) : (
              <View />
            )}
            {showApply ? (
              <Button variant="primary" size="sm" onPress={onApply}>
                {applyLabel}
              </Button>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );

  const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}>
      {inner}
    </Pressable>
  );
}
