import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { DeviceTileV4 } from './DeviceTileV4';
import type { DeviceTileProps } from './DeviceTile';

/** A favorite device entry — a {@link DeviceTileProps} plus a stable `id` key. */
export interface FavoriteDevice extends DeviceTileProps {
  /** Stable identity used as the React key (falls back to `name` if absent). */
  id?: string;
}

export interface FavoritesGridProps {
  /**
   * The favorite devices to render, each as a {@link DeviceTileV4}. Same prop
   * shape as {@link DeviceTileProps} (with an optional `id` key).
   */
  devices: readonly FavoriteDevice[];
  /** Section heading above the grid. Defaults to `'Favorites'`. Pass `null` to hide it. */
  title?: string | null;
  /** Preferred column count (1–4). Defaults to `2`; tiles wrap to fit the width. */
  columns?: 1 | 2 | 3 | 4;
  /** Copy shown when `devices` is empty. Defaults to `'No favorites yet'`. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * FavoritesGrid — **V4** "ambient" quick-control grid. A responsive grid of
 * favorite devices, each rendered as a glowing {@link DeviceTileV4} so active
 * devices light up while idle ones stay calm. Tiles wrap across `columns`.
 * Exposed as a `list` for assistive tech; presentational only (data + the
 * tiles' own callbacks). Token-only colors via `useXenitionTheme()` and the
 * reused tile; dark-mode safe.
 */
export function FavoritesGrid({
  devices,
  title = 'Favorites',
  columns = 2,
  emptyLabel = 'No favorites yet',
  style,
}: FavoritesGridProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(devices) ? devices : [];
  const cols = Math.min(4, Math.max(1, columns)) as 1 | 2 | 3 | 4;
  // Column width as a percentage, leaving room for the inter-tile gap.
  const basisPct = 100 / cols - (cols > 1 ? 2 : 0);

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title != null ? (
        <Text
          style={{
            paddingHorizontal: tokens.spacing.xs,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            color: colors.muted,
          }}
        >
          {title}
        </Text>
      ) : null}
      {list.length === 0 ? (
        <View
          style={{
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border,
            backgroundColor: colors.surface,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.lg,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: tokens.typography.scale.sm, color: colors.muted }}>{emptyLabel}</Text>
        </View>
      ) : (
        <View
          accessibilityRole="list"
          accessibilityLabel={typeof title === 'string' ? title : 'Favorites'}
          style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}
        >
          {list.map((device, i) => {
            const { id, ...tile } = device;
            return (
              <View key={id ?? `${device.name}-${i}`} style={{ flexGrow: 1, flexBasis: `${basisPct}%` as `${number}%` }}>
                <DeviceTileV4 {...tile} />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
