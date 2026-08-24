import * as React from 'react';
import {
  Animated,
  Image,
  Pressable,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { PortfolioGridProps } from './PortfolioGrid';

/** Drop-in alternate of {@link PortfolioGridProps} — identical prop contract. */
export type PortfolioGridV2Props = PortfolioGridProps;

/** Varied aspect presets cycled by position for a masonry rhythm. */
const RATIO_CYCLE = [1, 3 / 4, 4 / 3, 1, 2 / 3, 5 / 4] as const;

function tileRatio(item: { width?: number; height?: number }, index: number): number {
  if (item.width && item.height && item.width > 0 && item.height > 0) {
    return item.width / item.height;
  }
  return RATIO_CYCLE[index % RATIO_CYCLE.length] ?? 1;
}

/**
 * PortfolioGrid — design variant **V2**: a **masonry-feel** wall of photos.
 * Items are dealt round-robin into `columns` vertical stacks and each tile keeps
 * its own intrinsic aspect ratio (falling back to a cycled preset), so tiles
 * vary in height and read as a gallery wall rather than a uniform grid. A gentle
 * caption scrim rides the foot of any captioned tile. Same props as
 * {@link PortfolioGridProps}; token-only, guarded indexing, empty + loading.
 */
export function PortfolioGridV2({
  items,
  columns = 3,
  title,
  onOpen,
  loading = false,
  loadingCount = 6,
  emptyLabel = 'No photos yet',
  emptyDescription,
  style,
}: PortfolioGridV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter({ translateY: 10 });
  const colCount = Math.max(2, columns);

  const heading = title ? (
    <Text
      accessibilityRole="header"
      style={{
        color: colors.onSurface,
        fontSize: tokens.typography.scale.lg,
        fontWeight: '700',
        marginBottom: tokens.spacing.sm,
      }}
    >
      {title}
    </Text>
  ) : null;

  if (loading) {
    const count = Math.max(1, loadingCount);
    const cols: number[][] = Array.from({ length: colCount }, () => []);
    for (let i = 0; i < count; i += 1) {
      (cols[i % colCount] ?? cols[0]!).push(i);
    }
    return (
      <View accessibilityLabel="Loading photos" style={[{ gap: tokens.spacing.sm }, style]}>
        {heading}
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {cols.map((cellIdx, c) => (
            <View key={c} style={{ flex: 1, gap: tokens.spacing.sm }}>
              {cellIdx.map((i) => (
                <View
                  key={i}
                  style={{
                    width: '100%',
                    aspectRatio: RATIO_CYCLE[i % RATIO_CYCLE.length] ?? 1,
                    borderRadius: tokens.radius.md,
                    backgroundColor: tokens.ramps.neutral[200],
                  }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={style}>
        {heading}
        <EmptyState title={emptyLabel} description={emptyDescription} />
      </View>
    );
  }

  // Deal items into columns, tracking each item's ORIGINAL index for onOpen.
  const cols: { item: (typeof items)[number]; index: number }[][] = Array.from(
    { length: colCount },
    () => []
  );
  items.forEach((item, index) => {
    (cols[index % colCount] ?? cols[0]!).push({ item, index });
  });

  const scrim = withAlpha(tokens.ramps.neutral[900], 0.5);

  const renderTile = (item: (typeof items)[number], index: number): React.ReactElement => {
    const ratio = tileRatio(item, index);
    const inner = (
      <View
        style={{
          width: '100%',
          aspectRatio: ratio,
          overflow: 'hidden',
          borderRadius: tokens.radius.md,
          backgroundColor: tokens.ramps.neutral[100],
        }}
      >
        {item.url ? (
          <Image
            source={{ uri: item.url }}
            accessible={!onOpen}
            accessibilityLabel={onOpen ? undefined : item.alt ?? item.caption ?? ''}
            resizeMode="cover"
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
        {item.caption ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: scrim,
              paddingHorizontal: tokens.spacing.sm,
              paddingVertical: tokens.spacing.xs,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: tokens.ramps.neutral[50],
                fontSize: tokens.typography.scale.xs,
                fontWeight: '600',
              }}
            >
              {item.caption}
            </Text>
          </View>
        ) : null}
      </View>
    );

    if (onOpen) {
      return (
        <Pressable
          key={index}
          accessibilityRole="button"
          accessibilityLabel={item.alt ?? item.caption ?? `Photo ${index + 1}`}
          onPress={() => onOpen(index)}
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
        >
          {inner}
        </Pressable>
      );
    }
    return <View key={index}>{inner}</View>;
  };

  const containerStyle: StyleProp<ViewStyle> = [{ gap: tokens.spacing.sm }, style];

  return (
    <Animated.View style={[{ opacity: enter.opacity, transform: enter.transform }, containerStyle]}>
      {heading}
      <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
        {cols.map((col, c) => (
          <View key={c} style={{ flex: 1, gap: tokens.spacing.sm }}>
            {col.map(({ item, index }) => renderTile(item, index))}
          </View>
        ))}
      </View>
    </Animated.View>
  );
}
