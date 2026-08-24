import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface MenuSectionProps {
  /** Section heading (e.g. "Starters", "Mains"). */
  title: string;
  /** Optional supporting line under the heading. */
  description?: string;
  /** Right-aligned slot next to the title (e.g. item count, a chip). */
  aside?: React.ReactNode;
  /** Section body — typically a list of `DishCard`s. */
  children?: React.ReactNode;
  /** Message shown when the section has no items (default `No items yet`). */
  emptyLabel?: string;
  /** Slot rendered instead of `emptyLabel` when empty (illustration/action). */
  emptyState?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const isEmptyChildren = (children: React.ReactNode): boolean =>
  // React.Children.toArray already strips null/undefined/boolean children.
  React.Children.toArray(children).length === 0;

/**
 * A titled group of menu items — heading, optional description and `aside`
 * slot, then its `children` (usually `DishCard`s) stacked with token spacing.
 * When it has no children it renders a muted empty message (or a custom
 * `emptyState`) so an empty category still reads clearly. Token-only.
 */
export function MenuSection({
  title,
  description,
  aside,
  children,
  emptyLabel = 'No items yet',
  emptyState,
  style,
}: MenuSectionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const empty = isEmptyChildren(children);

  return (
    <View accessibilityRole="summary" style={[{ gap: tokens.spacing.md }, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            accessibilityRole="header"
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {title}
          </Text>
          {description ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
          ) : null}
        </View>
        {aside ? <View>{aside}</View> : null}
      </View>

      {empty ? (
        emptyState ?? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: tokens.radius.lg,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.border,
              backgroundColor: colors.surface,
              paddingVertical: tokens.spacing.xl,
              paddingHorizontal: tokens.spacing.lg,
            }}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }}>
              {emptyLabel}
            </Text>
          </View>
        )
      ) : (
        <View style={{ gap: tokens.spacing.sm }}>{children}</View>
      )}
    </View>
  );
}
