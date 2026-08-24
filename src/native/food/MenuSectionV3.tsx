import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { MenuSectionProps } from './MenuSection';

/** Drop-in for {@link MenuSection}: identical props, a distinct design. */
export type MenuSectionV3Props = MenuSectionProps;

const isEmptyChildren = (children: React.ReactNode): boolean =>
  React.Children.toArray(children).length === 0;

/**
 * MenuSection, alternate design **V3** — a *minimal editorial* group. The title
 * is a compact heading followed by a hairline rule that runs to the edge, with
 * the `aside` slot tucked at the far right of that rule; the optional
 * description sits under it. Items follow, tightly stacked. The empty state is
 * a single quiet line, not a boxed panel. Line-based and understated — the
 * opposite of V2's contained banner. Same props as the classic.
 */
export function MenuSectionV3({
  title,
  description,
  aside,
  children,
  emptyLabel = 'No items yet',
  emptyState,
  style,
}: MenuSectionV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const empty = isEmptyChildren(children);

  const container: StyleProp<ViewStyle> = [{ gap: tokens.spacing.sm }, style];

  return (
    <View accessibilityRole="summary" style={container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '800',
            letterSpacing: 0.5,
          }}
        >
          {title}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
        {aside ? <View>{aside}</View> : null}
      </View>

      {description ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
      ) : null}

      {empty ? (
        emptyState ?? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }}>
            {emptyLabel}
          </Text>
        )
      ) : (
        <View style={{ gap: tokens.spacing.xs }}>{children}</View>
      )}
    </View>
  );
}
