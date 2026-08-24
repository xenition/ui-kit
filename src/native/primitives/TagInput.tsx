import * as React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type StyleProp,
  type TextInputKeyPressEventData,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface TagInputProps {
  /** Controlled list of tokens. */
  value?: string[];
  /** Fires with the full next token list on add/remove. */
  onChange?: (value: string[]) => void;
  placeholder?: string;
  /** Reject a token that already exists (case-insensitive). Default true. */
  dedupe?: boolean;
  /** Renders the danger border state. */
  invalid?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Free-text token input — type and submit (return) to add a chip; press a chip's
 * ✕ (or backspace on the empty field) to remove one. Selected tokens render as
 * token-bound chips; the wrapper border flips to `danger` when `invalid`. All
 * colors, radii, and spacing come from `useXenitionTheme()`. No literal colors.
 */
export function TagInput({
  value = [],
  onChange,
  placeholder = 'Add a tag…',
  dedupe = true,
  invalid = false,
  disabled = false,
  accessibilityLabel = 'Add a tag',
  style,
}: TagInputProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [draft, setDraft] = React.useState('');

  const add = (): void => {
    const t = draft.trim();
    if (!t) return;
    if (dedupe && value.some((v) => v.toLowerCase() === t.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange?.([...value, t]);
    setDraft('');
  };

  const removeAt = (index: number): void => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>): void => {
    if (e.nativeEvent.key === 'Backspace' && draft.length === 0 && value.length > 0) {
      removeAt(value.length - 1);
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: invalid ? colors.danger : colors.border,
          borderRadius: tokens.radius.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {value.map((tag, i) => (
        <View
          key={`${tag}-${i}`}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            backgroundColor: colors.accent,
            borderRadius: tokens.radius.full,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
          }}
        >
          <Text style={{ color: colors.onAccent, fontSize: tokens.typography.scale.xs }}>
            {tag}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remove ${tag}`}
            disabled={disabled}
            onPress={() => removeAt(i)}
            hitSlop={6}
          >
            <Text style={{ color: colors.onAccent, fontSize: tokens.typography.scale.xs }}>✕</Text>
          </Pressable>
        </View>
      ))}
      <TextInput
        editable={!disabled}
        accessibilityLabel={accessibilityLabel}
        value={draft}
        onChangeText={setDraft}
        onSubmitEditing={add}
        onKeyPress={onKeyPress}
        blurOnSubmit={false}
        placeholder={value.length === 0 ? placeholder : ''}
        placeholderTextColor={colors.muted}
        returnKeyType="done"
        style={{
          flexGrow: 1,
          minWidth: 80,
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          padding: 0,
        }}
      />
    </View>
  );
}
