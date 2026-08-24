import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SettingsSectionProps {
  /** Optional group heading rendered above the grouped rows. */
  title?: string;
  /** Optional footnote rendered under the group. */
  footnote?: string;
  /** {@link SettingsRow}s (or any rows) — hairline dividers are drawn between. */
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Groups {@link SettingsRow}s into a titled, bordered card with hairline
 * dividers between rows — the iOS-style grouped-list section. Token-only.
 */
export function SettingsSection({
  title,
  footnote,
  children,
  style,
}: SettingsSectionProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const rows = React.Children.toArray(children).filter(Boolean);

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {title ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '600',
            textTransform: 'uppercase',
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          {title}
        </Text>
      ) : null}
      <View
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
        }}
      >
        {rows.map((row, i) => (
          <View key={i}>
            {i > 0 ? <View style={{ height: 1, backgroundColor: colors.border }} /> : null}
            {row}
          </View>
        ))}
      </View>
      {footnote ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          {footnote}
        </Text>
      ) : null}
    </View>
  );
}
