import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface QuickAction {
  key: string;
  label: string;
  /** Optional glyph/icon slot rendered above the label. */
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export interface QuickActionsProps {
  actions: QuickAction[];
  /** Optional section heading. */
  title?: string;
  /** Number of columns in the grid. */
  columns?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A grid of labelled quick-action buttons — the shortcut launcher on a
 * dashboard home. Each tile is a square-ish token-bound button with an optional
 * icon above the label. Token-only.
 */
export function QuickActions({
  actions,
  title,
  columns = 3,
  style,
}: QuickActionsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const basis = `${Math.floor(100 / columns) - 2}%` as `${number}%`;

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {title ? (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.lg,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
        {actions.map((action) => (
          <Pressable
            key={action.key}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            accessibilityState={{ disabled: !!action.disabled }}
            disabled={action.disabled}
            onPress={action.onPress}
            style={({ pressed }) => ({
              flexGrow: 1,
              flexBasis: basis,
              alignItems: 'center',
              justifyContent: 'center',
              gap: tokens.spacing.xs,
              paddingVertical: tokens.spacing.lg,
              paddingHorizontal: tokens.spacing.sm,
              borderRadius: tokens.radius.md,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: colors.surface,
              opacity: action.disabled ? 0.5 : pressed ? 0.8 : 1,
            })}
          >
            {action.icon ? <View>{action.icon}</View> : null}
            <Text
              numberOfLines={1}
              style={{
                color: colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
              }}
            >
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
