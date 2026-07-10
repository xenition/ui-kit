import * as React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  /** The choices (RN has no `<option>` children — pass them as data). */
  options: SelectOption[];
  /** Controlled selected value. */
  value?: string;
  /** Fires with the chosen option's value. */
  onValueChange?: (value: string) => void;
  /** Shown when nothing is selected. */
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Themed select — the native mirror of the web `Select`. RN has no `<select>`,
 * so this is a token-bound `Pressable` that opens a `Modal` option sheet. Pass
 * choices as `options` data (not `<option>` children) and drive it with the
 * `value` / `onValueChange` contract. No literal colors.
 */
export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select…',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: SelectProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled, expanded: open }}
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={({ pressed }) => [
          {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: invalid ? colors.danger : colors.border,
            borderRadius: tokens.radius.sm,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          },
          style,
        ]}
      >
        <Text
          style={{
            color: selected ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale.base,
          }}
        >
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>▾</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }}>
          {/* Backdrop scrim: the darkest neutral ramp step, faded via `opacity`
              so the rendered color stays a pure theme token. Tapping dismisses. */}
          <Pressable
            accessibilityLabel="Close"
            onPress={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: tokens.ramps.neutral[950],
              opacity: 0.5,
            }}
          />
          <View
            style={{
              maxHeight: '70%',
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: tokens.radius.lg,
              overflow: 'hidden',
            }}
          >
            <ScrollView>
              {options.map((opt) => {
                const active = opt.value === value;
                return (
                  <Pressable
                    key={opt.value}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: active }}
                    onPress={() => {
                      onValueChange?.(opt.value);
                      setOpen(false);
                    }}
                    style={({ pressed }) => ({
                      paddingVertical: tokens.spacing.md,
                      paddingHorizontal: tokens.spacing.lg,
                      backgroundColor: pressed ? colors.border : 'transparent',
                    })}
                  >
                    <Text
                      style={{
                        color: active ? colors.primary : colors.onSurface,
                        fontSize: tokens.typography.scale.base,
                        fontWeight: active ? '600' : '400',
                      }}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
