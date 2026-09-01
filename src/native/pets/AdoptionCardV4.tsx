import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { AdoptionCardProps, AdoptionStatus } from './AdoptionCard';

/** V4 layout choices for the "companion" design. */
export type AdoptionCardLayout = 'cover' | 'list' | 'compact';

/** Drop-in for {@link AdoptionCardProps} — same props, the V4 "companion" design. */
export interface AdoptionCardV4Props extends AdoptionCardProps {
  /** V4 layout: `cover` (photo banner on top, default), `list` (horizontal thumbnail row), `compact` (dense, no photo). */
  variant?: AdoptionCardLayout;
}

const STATUS_META: Record<AdoptionStatus, { label: string; tone: 'success' | 'warn' | 'neutral' | 'accent' }> = {
  available: { label: 'Available', tone: 'success' },
  pending: { label: 'Pending', tone: 'warn' },
  adopted: { label: 'Adopted', tone: 'neutral' },
  fostered: { label: 'In foster', tone: 'accent' },
};

/**
 * AdoptionCard — **V4** "companion" design. The warm, friendly take on an
 * adoption listing: an elevated rounded card with a soft shadow, a photo banner
 * (or a big glyph in a soft-primary tinted well), a frosted favorite heart, a
 * labelled status chip, and the fee shown as a soft-primary chip beside a rounded
 * adopt CTA. Same props/behavior as {@link AdoptionCardProps}; availability reads
 * via a labelled chip (never color alone). Token-only colors via
 * `useXenitionTheme()`; the whole card is pressable when `onPress` is set.
 */
export function AdoptionCardV4({
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
  variant = 'cover',
}: AdoptionCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const statusMeta = STATUS_META[status];
  const meta = [age, sex, breed].filter(Boolean).join(' · ');
  const showApply = onApply != null && status !== 'adopted';

  const shellStyle: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.card,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      overflow: 'hidden',
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const statusBadge = (
    <Badge tone={statusMeta.tone} variant="soft" size="sm">
      {statusMeta.label}
    </Badge>
  );

  const feeChip = fee ? (
    <View style={{ backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }}>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{fee}</Text>
    </View>
  ) : null;

  const applyButton = showApply ? (
    <Button variant="primary" size="sm" onPress={onApply}>
      {applyLabel}
    </Button>
  ) : null;

  const favoriteButton = (extra: StyleProp<ViewStyle>) =>
    onFavorite ? (
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: favorited }}
        accessibilityLabel={favorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        onPress={onFavorite}
        style={[
          {
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.surface, 0.9),
            alignItems: 'center',
            justifyContent: 'center',
          },
          extra,
        ]}
      >
        <Text allowFontScaling={false} style={{ color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }}>
          {favorited ? '♥' : '♡'}
        </Text>
      </Pressable>
    ) : null;

  let inner: React.ReactElement;

  if (variant === 'list') {
    inner = (
      <View style={shellStyle}>
        <View style={{ flexDirection: 'row', gap: tokens.spacing.md, padding: tokens.spacing.md }}>
          {/* Thumbnail (photo or glyph) inside a thin mat, favorite heart top-right. */}
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: withAlpha(colors.primary, 0.1),
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
                {glyph}
              </Text>
            )}
            {favoriteButton({ position: 'absolute', top: 2, right: 2, width: 36, height: 36 })}
          </View>

          <View style={{ flex: 1, gap: tokens.spacing.xs }}>
            <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
              {name}
            </Text>
            {meta ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {meta}
              </Text>
            ) : null}
            {shelter ? (
              <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                📍 {shelter}
              </Text>
            ) : null}
            <View style={{ flexDirection: 'row' }}>
              <View>{statusBadge}</View>
            </View>

            {fee || showApply ? (
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }}>
                {feeChip ?? <View />}
                {applyButton}
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  } else if (variant === 'compact') {
    inner = (
      <View style={shellStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.sm }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.primary, 0.1),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
              {glyph}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
            <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {name}
            </Text>
            {meta ? (
              <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {meta}
              </Text>
            ) : null}
          </View>
          {statusBadge}
          {feeChip}
          {favoriteButton(undefined)}
        </View>
      </View>
    );
  } else {
    inner = (
      <View style={shellStyle}>
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ height: 132, backgroundColor: withAlpha(colors.primary, 0.1), alignItems: 'center', justifyContent: 'center' }}
        >
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
          ) : (
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
              {glyph}
            </Text>
          )}
          <View style={{ position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm }}>
            <Badge tone={statusMeta.tone} variant="soft" size="sm">
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
                backgroundColor: withAlpha(colors.surface, 0.9),
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text allowFontScaling={false} style={{ color: favorited ? colors.danger : colors.muted, fontSize: tokens.typography.scale.lg }}>
                {favorited ? '♥' : '♡'}
              </Text>
            </Pressable>
          ) : null}
        </View>

        <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {name}
          </Text>
          {meta ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
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
                <View style={{ backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }}>
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{fee}</Text>
                </View>
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
  }

  const a11y = `${name}${meta ? `, ${meta}` : ''}, ${statusMeta.label}`;
  if (!onPress) {
    return <View accessibilityLabel={a11y}>{inner}</View>;
  }
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
      {inner}
    </Pressable>
  );
}
