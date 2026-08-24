import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { MenuSectionProps } from './MenuSection';

/** Drop-in for {@link MenuSection}: identical props, a distinct design. */
export type MenuSectionV2Props = MenuSectionProps;

const isEmptyChildren = (children: React.ReactNode): boolean =>
  React.Children.toArray(children).length === 0;

/**
 * MenuSection, alternate design **V2** — a *panelled banner* group. The whole
 * section is wrapped in an elevated surface card; the heading sits in a soft
 * primary-tinted banner strip across the top (title, description, and the
 * `aside` slot as a right-hand chip), with the items grouped inside below. The
 * empty state is a soft-tinted inset panel rather than a dashed box. This reads
 * as a bold, contained category card — the opposite of the flat classic. Same
 * props as the classic.
 */
export function MenuSectionV2({
  title,
  description,
  aside,
  children,
  emptyLabel = 'No items yet',
  emptyState,
  style,
}: MenuSectionV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const empty = isEmptyChildren(children);

  return (
    <View
      accessibilityRole="summary"
      style={[
        {
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: colors.surface,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
          backgroundColor: withAlpha(colors.primary, 0.08),
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
        }}
      >
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            accessibilityRole="header"
            style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}
          >
            {title}
          </Text>
          {description ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{description}</Text>
          ) : null}
        </View>
        {aside ? <View>{aside}</View> : null}
      </View>

      <View style={{ padding: tokens.spacing.lg }}>
        {empty ? (
          emptyState ?? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.md,
                backgroundColor: withAlpha(colors.primary, 0.05),
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
    </View>
  );
}
