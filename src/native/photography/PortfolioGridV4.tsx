import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gallery } from '../media';
import { EmptyState } from '../commerce/EmptyState';
import type { PortfolioGridProps } from './PortfolioGrid';

/** Drop-in for {@link PortfolioGridProps} — same props, the V4 "studio" design. */
export type PortfolioGridV4Props = PortfolioGridProps;

/**
 * PortfolioGrid — **V4** "studio" design. The matted, image-forward take on a
 * portfolio: the body of work floats inside an elevated **mat** — a token
 * surface with a thin border and soft shadow — while the media {@link Gallery}
 * lays the photos out. Honors both `variant` layouts — `grid` (uniform square
 * tiles) and `masonry` (intrinsic ratios), tappable when `onOpen` is set — and
 * renders a token skeleton while `loading` and an {@link EmptyState} when there
 * are no photos. Identical props/behavior to {@link PortfolioGridProps};
 * token-only colors via `useXenitionTheme()`.
 */
export function PortfolioGridV4({
  items,
  columns = 3,
  variant = 'grid',
  title,
  onOpen,
  loading = false,
  loadingCount = 6,
  emptyLabel = 'No photos yet',
  emptyDescription,
  scrollEnabled,
  style,
}: PortfolioGridV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // The matted surface: the whole body of work floats inside an elevated card.
  const containerStyle: StyleProp<ViewStyle> = [
    {
      gap: tokens.spacing.md,
      borderRadius: tokens.radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      padding: tokens.spacing.md,
      shadowColor: colors.onSurface,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    style,
  ];

  const heading = title ? (
    <Text
      accessibilityRole="header"
      style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
    >
      {title}
    </Text>
  ) : null;

  if (loading) {
    const count = Math.max(1, loadingCount);
    const cells = Array.from({ length: count }, (_, i) => i);
    return (
      <View accessibilityLabel="Loading photos" style={containerStyle}>
        {heading}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {cells.map((i) => (
            <View
              key={i}
              style={{
                width: `${100 / columns - 2}%`,
                aspectRatio: 1,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: tokens.ramps.neutral[200],
              }}
            />
          ))}
        </View>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={containerStyle}>
        {heading}
        <EmptyState title={emptyLabel} description={emptyDescription} />
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      {heading}
      <Gallery
        items={items}
        columns={columns}
        variant={variant}
        onOpen={onOpen}
        scrollEnabled={scrollEnabled}
      />
    </View>
  );
}
