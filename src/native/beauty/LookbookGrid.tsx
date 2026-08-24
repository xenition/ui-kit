import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export interface LookbookItem {
  /** Stable id (used as the React key and passed to `onSelect`). */
  id: string;
  /** Image URL; a token-tinted tile shows when absent. */
  imageUrl?: string;
  /** Caption / style name shown over the tile. */
  label?: string;
  /** Optional stylist / category tag. */
  tag?: string;
}

export interface LookbookGridProps {
  /** Grid items. When empty, the `emptyLabel` state renders. */
  items: LookbookItem[];
  /** Column count (default 2). Clamped to at least 1. */
  columns?: number;
  /** Tile aspect ratio (width / height, default 0.8 = portrait). */
  aspectRatio?: number;
  /** Empty-state copy. */
  emptyLabel?: string;
  /** Fires with the tapped item's id. */
  onSelect?: (id: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A masonry-style lookbook / gallery grid of style photos. Renders `items` in a
 * flex-wrap grid of `columns`; each tile shows the image with a gradient-free
 * caption band and optional tag, and calls `onSelect(id)` on tap. An empty
 * `items` array renders a token-tinted empty state. Indices are guarded and
 * missing images degrade to a tinted placeholder. Token-only colors.
 */
export function LookbookGrid({
  items,
  columns = 2,
  aspectRatio = 0.8,
  emptyLabel = 'No looks yet',
  onSelect,
  style,
}: LookbookGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cols = Math.max(1, Math.floor(columns));
  const widthPct = `${100 / cols}%` as const;

  if (!items.length) {
    return (
      <View
        accessibilityLabel={emptyLabel}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: tokens.spacing['2xl'],
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: withAlpha(colors.muted, 0.08),
            gap: tokens.spacing.sm,
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
          📷
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  return (
    <View style={[{ flexDirection: 'row', flexWrap: 'wrap' }, style]}>
      {items.map((item, i) => (
        <View key={item.id ?? i} style={{ width: widthPct, padding: tokens.spacing.xs }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={item.label ?? `Look ${i + 1}`}
            disabled={!onSelect}
            onPress={onSelect ? () => onSelect(item.id) : undefined}
            style={({ pressed }) => ({
              aspectRatio,
              borderRadius: tokens.radius.md,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: withAlpha(colors.muted, 0.14),
              opacity: pressed && onSelect ? 0.9 : 1,
              justifyContent: 'flex-end',
            })}
          >
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} resizeMode="cover" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
            ) : (
              <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
                  ✂️
                </Text>
              </View>
            )}
            {item.tag ? (
              <View style={{ position: 'absolute', top: tokens.spacing.xs, left: tokens.spacing.xs, borderRadius: tokens.radius.sm, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1, backgroundColor: withAlpha(colors.onSurface, 0.55) }}>
                <Text style={{ color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>{item.tag}</Text>
              </View>
            ) : null}
            {item.label ? (
              <View style={{ padding: tokens.spacing.sm, backgroundColor: withAlpha(colors.onSurface, 0.45) }}>
                <Text numberOfLines={1} style={{ color: colors.surface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                  {item.label}
                </Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      ))}
    </View>
  );
}
