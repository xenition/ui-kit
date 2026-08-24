import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface Sticker {
  id?: string | number;
  /** The sticker emoji/glyph. */
  glyph: string;
  /** Optional caption under the sticker. */
  label?: string;
  /** Whether the child has earned/unlocked it. */
  earned?: boolean;
}

export interface StickerRewardProps {
  /** Stickers to display in the grid. */
  stickers: Sticker[];
  /** Section title. */
  title?: string;
  /** Columns in the grid. */
  columns?: number;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Copy shown when there are no stickers. */
  emptyLabel?: string;
  /** Fires with the tapped sticker's index (e.g. to collect / redeem it). */
  onCollect?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A sticker-collection reward board: a grid of earned + locked stickers with an
 * earned/total summary. Locked stickers are dimmed and marked with a lock glyph
 * (state, not color alone). Tapping a sticker fires `onCollect(index)`. Renders
 * an explicit empty state. Token-only colors.
 */
export function StickerReward({
  stickers,
  title = 'Sticker rewards',
  columns = 4,
  loading = false,
  emptyLabel = 'No stickers yet',
  onCollect,
  style,
}: StickerRewardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cols = Math.max(1, Math.floor(columns));

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading stickers" style={container}>
        <View style={{ height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 48, width: '100%', borderRadius: tokens.radius.md, backgroundColor: colors.border }} />
      </View>
    );
  }

  if (stickers.length === 0) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
        <View style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            ✨
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  const earnedCount = stickers.filter((s) => s.earned).length;

  return (
    <View style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>{title}</Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {earnedCount}/{stickers.length}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {stickers.map((sticker, i) => {
          const earned = sticker.earned ?? false;
          const cell = (
            <View
              style={{
                alignItems: 'center',
                gap: 2,
                paddingVertical: tokens.spacing.sm,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: tokens.radius.full,
                  borderWidth: 1,
                  borderColor: earned ? colors.accent : colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: earned ? 1 : 0.45,
                }}
              >
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
                  {earned ? sticker.glyph : '🔒'}
                </Text>
              </View>
              {sticker.label ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {sticker.label}
                </Text>
              ) : null}
            </View>
          );

          const a11y = `${sticker.label ?? 'Sticker'}, ${earned ? 'earned' : 'locked'}`;
          if (!onCollect) {
            return (
              <View key={sticker.id ?? i} accessibilityLabel={a11y} style={{ width: `${100 / cols}%` }}>
                {cell}
              </View>
            );
          }
          return (
            <Pressable
              key={sticker.id ?? i}
              accessibilityRole="button"
              accessibilityLabel={a11y}
              onPress={() => onCollect(i)}
              style={({ pressed }) => ({ width: `${100 / cols}%`, opacity: pressed ? 0.6 : 1 })}
            >
              {cell}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
