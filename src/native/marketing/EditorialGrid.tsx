import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface EditorialItemData {
  /**
   * Column span at the web `lg` breakpoint. Kept for prop parity with the web
   * `EditorialItem`; **inert on native** (phones are single-column, so there is
   * no multi-column grid to span).
   */
  span?: number;
  /**
   * 1-based start column at the web `lg` breakpoint. Kept for parity; **inert
   * on native** (no grid to place into).
   */
  start?: number;
  /**
   * Vertical overlap offset (px) at the web `lg` breakpoint. Kept for parity;
   * **inert on native** — the overlap has no phone analogue, so items always
   * stack cleanly with no negative pull.
   */
  offset?: number;
  /**
   * Explicit web stacking order. Kept for parity; **inert on native** — a
   * clean vertical stack has no overlap to order.
   */
  z?: number;
  /** The media / cover content for this cell. */
  media?: React.ReactNode;
  /** Caption slot rendered below the media on a `surface` backing. */
  caption?: React.ReactNode;
}

export interface EditorialItemProps extends EditorialItemData {
  style?: StyleProp<ViewStyle>;
}

export interface EditorialGridProps {
  /**
   * Column count at the web `lg` breakpoint. Kept for parity with the web
   * `EditorialGrid`; **inert on native** (always a single column).
   */
  columns?: number;
  /**
   * The editorial cells to render (mirrors the web `EditorialItem` children).
   * Provide either this data array or `EditorialItem` children — the array
   * wins if both are given.
   */
  items?: EditorialItemData[];
  /**
   * `EditorialItem` children, for callers that prefer composition over the
   * `items` array. Ignored when `items` is provided.
   */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * One editorial cell — the native mirror of the web `EditorialItem`: the media
 * with a `surface`-backed caption below it. The web `span`/`start`/`offset`/`z`
 * geometry props are accepted for parity but are inert on native (see their
 * doc comments). Token-only.
 */
export function EditorialItem({
  media,
  caption,
  children,
  style,
}: EditorialItemProps & { children?: React.ReactNode }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View testID="xen-editorial-item" style={[{ minWidth: 0 }, style]}>
      {media !== undefined ? media : children}
      {caption !== undefined ? (
        <View style={{ backgroundColor: colors.surface, paddingTop: tokens.spacing.sm }}>
          {caption}
        </View>
      ) : null}
    </View>
  );
}

/**
 * Editorial layout — the native mirror of the web `EditorialGrid`.
 *
 * The web version is an asymmetric 12-column overlap grid (uneven spans/starts
 * plus negative offsets so covers overlap each other's rows, with z-order
 * keeping captions readable). That overlap has **no phone analogue**, so native
 * renders the items as a clean vertical stack, each item's caption slotted
 * directly below its media/children. The `columns`/`span`/`start`/`offset`/`z`
 * props are preserved for prop parity but are **inert** on native. Token-only.
 */
export function EditorialGrid({
  items,
  children,
  style,
}: EditorialGridProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View
      testID="xen-editorial-grid"
      style={[{ gap: tokens.spacing['2xl'] }, style]}
    >
      {items !== undefined
        ? items.map((it, i) => (
            <EditorialItem key={i} media={it.media} caption={it.caption} />
          ))
        : children}
    </View>
  );
}
