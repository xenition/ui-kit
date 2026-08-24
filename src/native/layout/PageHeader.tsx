import * as React from 'react';
import { Text, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface PageHeaderProps extends ViewProps {
  title: string;
  subtitle?: string;
  /** Trailing action node(s) (e.g. buttons) rendered opposite the title. */
  actions?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Screen header: a prominent `title` with optional `subtitle` on the left and
 * an `actions` slot on the right, laid out over a token bottom border. Type
 * sizes, colors, and spacing trace to the compiled theme; no literal colors.
 * The title carries the `header` accessibility role.
 */
export function PageHeader({
  title,
  subtitle,
  actions,
  style,
  ...rest
}: PageHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: tokens.spacing.md,
          paddingBottom: tokens.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
      {...rest}
    >
      <View style={{ flexShrink: 1, gap: tokens.spacing.xs }}>
        <Text
          accessibilityRole="header"
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['2xl'],
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
      {actions ? <View style={{ flexShrink: 0 }}>{actions}</View> : null}
    </View>
  );
}
