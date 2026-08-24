import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import type { PortfolioGridProps } from './PortfolioGrid';

/** Drop-in alternate of {@link PortfolioGridProps} — identical prop contract. */
export type PortfolioGridV3Props = PortfolioGridProps;

/** Hairline gutter between tiles — the "contact-sheet" tightness. */
const TIGHT_GAP = 2;

/**
 * PortfolioGrid — design variant **V3**: a **uniform, tight contact-sheet grid**.
 * Every photo is a hard square packed with a 2px gutter and no per-tile radius,
 * so the wall reads as one dense sheet rather than spaced cards — the opposite
 * feel to V2's masonry. The whole sheet gets a single outer radius/clip. Same
 * props as {@link PortfolioGridProps}; token-only, guarded indexing, empty +
 * loading.
 */
export function PortfolioGridV3({
  items,
  columns = 3,
  title,
  onOpen,
  loading = false,
  loadingCount = 6,
  emptyLabel = 'No photos yet',
  emptyDescription,
  style,
}: PortfolioGridV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const cols = Math.max(2, columns);
  const widthPct = `${100 / cols}%` as const;

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

  const sheetStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: tokens.radius.md,
    overflow: 'hidden',
    backgroundColor: colors.border,
  };

  if (loading) {
    const count = Math.max(1, loadingCount);
    const cells = Array.from({ length: count }, (_, i) => i);
    return (
      <View accessibilityLabel="Loading photos" style={[{ gap: tokens.spacing.sm }, style]}>
        {heading}
        <View style={sheetStyle}>
          {cells.map((i) => (
            <View
              key={i}
              style={{
                width: widthPct,
                aspectRatio: 1,
                padding: TIGHT_GAP / 2,
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: tokens.ramps.neutral[200],
                }}
              />
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

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {heading}
      <View style={sheetStyle}>
        {items.map((item, index) => {
          const cell = (
            <View
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
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
            </View>
          );
          return (
            <View key={index} style={{ width: widthPct, aspectRatio: 1, padding: TIGHT_GAP / 2 }}>
              {onOpen ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={item.alt ?? item.caption ?? `Photo ${index + 1}`}
                  onPress={() => onOpen(index)}
                  style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 })}
                >
                  {cell}
                </Pressable>
              ) : (
                cell
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
