import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type SplitButtonVariant = 'primary' | 'secondary';

export interface SplitButtonAction {
  key: string;
  label: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  /** Tint the label with `colors.danger`. */
  destructive?: boolean;
}

export interface SplitButtonProps {
  /** Label for the primary (left) action. */
  label: React.ReactNode;
  /** Primary action press handler. */
  onPress?: () => void;
  /** Secondary actions revealed by the caret. */
  actions: SplitButtonAction[];
  variant?: SplitButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A primary action fused to a caret that toggles an inline menu of secondary
 * actions. `primary` fills with `colors.primary`; `secondary` is outlined. The
 * menu drops in below the button (no portal/modal). All colors, radii and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
export function SplitButton({
  label,
  onPress,
  actions,
  variant = 'primary',
  disabled = false,
  style,
}: SplitButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  const filled = variant === 'primary';
  const bg = filled ? colors.primary : 'transparent';
  const fg = filled ? colors.onPrimary : colors.primary;

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          borderRadius: tokens.radius.md,
          borderWidth: filled ? 0 : 1,
          borderColor: colors.primary,
          overflow: 'hidden',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onPress}
          style={{
            backgroundColor: bg,
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.sm,
          }}
        >
          {typeof label === 'string' ? (
            <Text style={{ color: fg, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>{label}</Text>
          ) : (
            label
          )}
        </Pressable>
        <View style={{ width: 1, backgroundColor: filled ? colors.onPrimary : colors.primary, opacity: 0.4 }} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="More actions"
          accessibilityState={{ disabled, expanded: open }}
          disabled={disabled}
          onPress={() => setOpen((o) => !o)}
          style={{
            backgroundColor: bg,
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.sm,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: fg, fontSize: tokens.typography.scale.xs, transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
            ▾
          </Text>
        </Pressable>
      </View>

      {open ? (
        <View
          style={{
            marginTop: tokens.spacing.xs,
            alignSelf: 'flex-start',
            minWidth: 160,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
            paddingVertical: tokens.spacing.xs,
          }}
        >
          {actions.map((action) => {
            const color = action.disabled
              ? colors.muted
              : action.destructive
                ? colors.danger
                : colors.onSurface;
            return (
              <Pressable
                key={action.key}
                accessibilityRole="button"
                accessibilityState={{ disabled: action.disabled }}
                disabled={action.disabled}
                onPress={() => {
                  setOpen(false);
                  action.onPress?.();
                }}
                style={{ paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.sm }}
              >
                {typeof action.label === 'string' ? (
                  <Text style={{ color, fontSize: tokens.typography.scale.sm }}>{action.label}</Text>
                ) : (
                  action.label
                )}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
