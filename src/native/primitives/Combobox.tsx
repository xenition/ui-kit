import * as React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps {
  /** The choices (RN has no `<option>` children — pass them as data). */
  options: ComboboxOption[];
  /** Controlled selected value. */
  value?: string;
  /**
   * Fires with the chosen option's value. Prefer `onChange` — that is the kit's
   * one canonical name for "the value changed", and what the web twin has
   * always called this. `onValueChange` is the original native spelling, kept
   * so existing callers keep working; if both are passed this one wins.
   */
  onValueChange?: (value: string) => void;
  /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
  onChange?: (value: string) => void;
  /** Shown on the trigger when nothing is selected, and as the search hint. */
  placeholder?: string;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Searchable single-select (typeahead) — the native mirror of the web
 * `Combobox`. RN has no `<input>`-with-listbox, so this is a token-bound
 * `Pressable` trigger that opens a `Modal` holding a search `TextInput` (which
 * filters `options` by label) plus keyboard-free `Pressable` option rows. Same
 * `options`/`value`/`placeholder` contract as the web version; the web
 * `onChange` becomes the native `onValueChange`, and (like the native `Select`)
 * it adds `invalid`/`disabled`. No literal colors.
 */
export function Combobox({
  options,
  value,
  onValueChange,
  onChange,
  placeholder = 'Search…',
  invalid = false,
  disabled = false,
  accessibilityLabel,
  style,
}: ComboboxProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Two spellings, one callback: the original wins when both are passed, so a
  // caller who has migrated half a file never gets the change reported twice.
  const emit = onValueChange ?? onChange;
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const selected = options.find((o) => o.value === value);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const close = (): void => {
    setOpen(false);
    setQuery('');
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

      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <View style={{ flex: 1, justifyContent: 'center', padding: tokens.spacing.lg }}>
          {/* Backdrop scrim: darkest neutral ramp step faded via `opacity` so the
              rendered color stays a pure theme token. Tapping dismisses. */}
          <Pressable
            accessibilityLabel="Close"
            onPress={close}
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
            <View style={{ padding: tokens.spacing.md }}>
              <TextInput
                autoFocus
                value={query}
                onChangeText={setQuery}
                placeholder={placeholder}
                placeholderTextColor={colors.muted}
                accessibilityLabel="Filter options"
                style={{
                  color: colors.onSurface,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: tokens.radius.sm,
                  paddingVertical: tokens.spacing.sm,
                  paddingHorizontal: tokens.spacing.md,
                  fontSize: tokens.typography.scale.base,
                }}
              />
            </View>
            <ScrollView keyboardShouldPersistTaps="handled">
              {filtered.length === 0 ? (
                <Text
                  style={{
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                  }}
                >
                  No matches
                </Text>
              ) : (
                filtered.map((opt) => {
                  const active = opt.value === value;
                  return (
                    <Pressable
                      key={opt.value}
                      accessibilityRole="menuitem"
                      accessibilityState={{ selected: active }}
                      onPress={() => {
                        emit?.(opt.value);
                        close();
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
                })
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
