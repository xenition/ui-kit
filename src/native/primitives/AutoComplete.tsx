import * as React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export interface AutoCompleteProps {
  /** Suggestions to filter against the typed text. */
  options: AutoCompleteOption[];
  /** Controlled input text. */
  value?: string;
  /** Fires with the new input text on every keystroke. */
  onChange?: (text: string) => void;
  /** Fires with the chosen option when a suggestion is tapped. */
  onSelect?: (option: AutoCompleteOption) => void;
  placeholder?: string;
  /** Max suggestions to render (default 6). */
  maxResults?: number;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Inline autocomplete — a token-bound `TextInput` with a filtered suggestion
 * list that drops in beneath it as you type (no `Modal`, unlike `Combobox`).
 * Filters `options` by label substring, caps at `maxResults`, and reports the
 * text via `onChange` and the chosen row via `onSelect`. Border flips to
 * `danger` when `invalid`. No literal colors.
 */
export function AutoComplete({
  options,
  value = '',
  onChange,
  onSelect,
  placeholder = 'Type to search…',
  maxResults = 6,
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Autocomplete',
  style,
}: AutoCompleteProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [focused, setFocused] = React.useState(false);

  const matches = React.useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, maxResults);
  }, [options, value, maxResults]);

  const showList = focused && matches.length > 0;

  const choose = (opt: AutoCompleteOption): void => {
    onChange?.(opt.label);
    onSelect?.(opt);
    setFocused(false);
  };

  return (
    <View style={[{ width: '100%' }, style]}>
      <TextInput
        editable={!disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, expanded: showList }}
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        autoCorrect={false}
        style={{
          width: '100%',
          color: colors.onSurface,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: invalid ? colors.danger : colors.border,
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          fontSize: tokens.typography.scale.base,
          opacity: disabled ? 0.5 : 1,
        }}
      />
      {showList ? (
        <View
          accessibilityLabel="Suggestions"
          style={{
            marginTop: tokens.spacing.xs,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
          }}
        >
          <ScrollView keyboardShouldPersistTaps="handled" style={{ maxHeight: 220 }}>
            {matches.map((opt) => (
              <Pressable
                key={opt.value}
                accessibilityRole="menuitem"
                onPress={() => choose(opt)}
                style={({ pressed }) => ({
                  paddingVertical: tokens.spacing.md,
                  paddingHorizontal: tokens.spacing.lg,
                  backgroundColor: pressed ? colors.border : 'transparent',
                })}
              >
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base }}>
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
