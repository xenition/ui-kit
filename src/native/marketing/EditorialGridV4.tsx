import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { EditorialGridProps, EditorialItemProps, EditorialItemData } from './EditorialGrid';

/** Drop-in for {@link EditorialGridProps} — same props, the V4 "showcase" design. */
export type EditorialGridV4Props = EditorialGridProps;

/** Drop-in for {@link EditorialItemProps} — same props, the V4 "showcase" design. */
export type EditorialItemV4Props = EditorialItemProps;

/**
 * EditorialItem — **V4** "showcase" design (native mirror of the web V4). One
 * editorial cell as an elevated image-forward showcase card: the media floats in
 * a soft-primary media well, with the `caption` slotted below on the card
 * surface. NOT a gradient surface — a clean elevated card (`colors.card` +
 * border + soft shadow). The base's `span`/`start`/`offset`/`z` geometry props
 * are accepted for parity but are inert on native (phones are single-column, so
 * there is no overlap grid), exactly as the base native `EditorialItem`. Same
 * props/behavior as {@link EditorialItemProps}; token-only colors, no literals.
 */
export function EditorialItemV4({
  media,
  caption,
  children,
  style,
}: EditorialItemV4Props & { children?: React.ReactNode }): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const content = media !== undefined ? media : children;

  return (
    <View
      testID="xen-editorial-item"
      style={[
        {
          minWidth: 0,
          overflow: 'hidden',
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 2,
        },
        style,
      ]}
    >
      <View
        style={{
          minHeight: 144,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: withAlpha(colors.primary, 0.08),
        }}
      >
        {content !== undefined ? (
          content
        ) : (
          <View style={{ height: 32, width: 32, borderRadius: 8, borderWidth: 2, borderColor: colors.primary }} />
        )}
      </View>
      {caption !== undefined ? (
        <View
          style={{
            backgroundColor: colors.card,
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.md,
          }}
        >
          {caption}
        </View>
      ) : null}
    </View>
  );
}

/**
 * EditorialGrid — **V4** "showcase" design (native mirror of the web V4). A
 * clean vertical stack of elevated `EditorialItemV4` showcase cards. As with the
 * base native `EditorialGrid`, the web's 12-column overlap geometry has no phone
 * analogue and the `columns`/`span`/`start`/`offset`/`z` props are inert on
 * native. Accepts the base's `items` data array or `EditorialItemV4` children
 * (array wins). Same props/behavior as {@link EditorialGridProps}; token-only
 * colors, no literals.
 */
export function EditorialGridV4({ items, children, style }: EditorialGridV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <View testID="xen-editorial-grid" style={[{ gap: tokens.spacing.lg }, style]}>
      {items !== undefined
        ? items.map((it: EditorialItemData, i) => (
            <EditorialItemV4 key={i} media={it.media} caption={it.caption} />
          ))
        : children}
    </View>
  );
}
