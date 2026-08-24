import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Gallery } from '../media';
import { EmptyState } from '../commerce/EmptyState';
import type { MediaItem } from '../../media/types';

/** Layout variants for the portfolio grid. */
export type PortfolioGridVariant = 'grid' | 'masonry';

export interface PortfolioGridProps {
  /** Photos to lay out (shaped media items — nothing is fetched). */
  items: MediaItem[];
  /** Column count (default 3). */
  columns?: 2 | 3 | 4;
  /** `grid` (uniform square tiles) or `masonry` (natural aspect ratios). Default `grid`. */
  variant?: PortfolioGridVariant;
  /** Optional heading above the grid. */
  title?: string;
  /** Fired with the item index when a tile is activated (wire to a lightbox). */
  onOpen?: (index: number) => void;
  /** Loading placeholder — renders a token-tinted skeleton grid, no content. */
  loading?: boolean;
  /** How many skeleton tiles to draw while loading (default 6). */
  loadingCount?: number;
  /** Copy for the empty state when there are no photos. */
  emptyLabel?: string;
  /** Supporting line under the empty label. */
  emptyDescription?: string;
  /** Passed through to the underlying list (e.g. `scrollEnabled`). */
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A photographer's portfolio grid — the entry surface for a body of work.
 * Wraps the media {@link Gallery} for the populated case (`grid` square tiles
 * or `masonry` intrinsic ratios, tappable when `onOpen` is set), and renders a
 * token-only skeleton while `loading` and an {@link EmptyState} when there are
 * no photos. Guarded indexing throughout; all colors trace to theme tokens.
 */
export function PortfolioGrid({
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
}: PortfolioGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

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
    const cells = Array.from({ length: count }, (_, i) => i);
    return (
      <View accessibilityLabel="Loading photos" style={[{ gap: tokens.spacing.sm }, style]}>
        {heading}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
          {cells.map((i) => (
            <View
              key={i}
              style={{
                width: `${100 / columns - 2}%`,
                aspectRatio: 1,
                borderRadius: tokens.radius.md,
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
      <View style={style}>
        {heading}
        <EmptyState title={emptyLabel} description={emptyDescription} />
      </View>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
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
