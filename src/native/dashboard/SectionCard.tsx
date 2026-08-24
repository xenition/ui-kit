import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SectionCardProps {
  /** Section heading. */
  title: string;
  /** Optional muted description under the title. */
  subtitle?: string;
  /** Trailing header slot, e.g. a "See all" link. */
  action?: React.ReactNode;
  /** Optional divider between the header and the body. */
  divided?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A titled card wrapper: a header row (title + optional subtitle + trailing
 * action) above a body slot, inside a bordered `surface` card. The standard
 * container for grouping dashboard content. Token-only.
 */
export function SectionCard({
  title,
  subtitle,
  action,
  divided = false,
  children,
  style,
}: SectionCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
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
        }}
      >
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            accessibilityRole="header"
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.lg,
              fontWeight: '700',
            }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {action ? <View>{action}</View> : null}
      </View>
      {divided ? <View style={{ height: 1, backgroundColor: colors.border }} /> : null}
      <View>{children}</View>
    </View>
  );
}
