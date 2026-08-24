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

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  /** The choices (pass as data — RN has no `<option>` children). */
  options: MultiSelectOption[];
  /** Controlled set of selected values. */
  value?: string[];
  /** Fires with the full next selection array. */
  onChange?: (value: string[]) => void;
  /** Shown on the trigger when nothing is selected. */
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Multi-select — like the native `Select` but the sheet lets several options be
 * checked. The trigger shows the picked options as token-bound chips (or the
 * `placeholder`); the `Modal` rows show a check on the selected ones. Same
 * `options` data contract; `onChange` reports the whole next `string[]`. No
 * literal colors.
 */
export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = 'Select…',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: MultiSelectProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [open, setOpen] = React.useState(false);

  const selectedOptions = options.filter((o) => value.includes(o.value));

  const toggle = (v: string): void => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange?.(next);
  };

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
            gap: tokens.spacing.sm,
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
        {selectedOptions.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>
            {placeholder}
          </Text>
        ) : (
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
            {selectedOptions.map((o) => (
              <View
                key={o.value}
                style={{
                  backgroundColor: colors.accent,
                  borderRadius: tokens.radius.full,
                  paddingVertical: 2,
                  paddingHorizontal: tokens.spacing.sm,
                }}
              >
                <Text style={{ color: colors.onAccent, fontSize: tokens.typography.scale.xs }}>
                  {o.label}
                </Text>
              </View>
            ))}
          </View>
        )}
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>▾</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }}>
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
                const active = value.includes(opt.value);
                return (
                  <Pressable
                    key={opt.value}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: active }}
                    onPress={() => toggle(opt.value)}
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
                    <Text
                      style={{
                        color: active ? colors.primary : colors.muted,
                        fontSize: tokens.typography.scale.base,
                      }}
                    >
                      {active ? '✓' : ''}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Done"
              onPress={() => setOpen(false)}
              style={({ pressed }) => ({
                alignItems: 'center',
                paddingVertical: tokens.spacing.md,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  color: colors.primaryText,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: '600',
                }}
              >
                Done
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
