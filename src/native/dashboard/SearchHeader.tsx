import * as React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface SearchHeaderProps {
  /** Current query text (controlled). */
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  /** Fires on submit / return key. */
  onSubmit?: () => void;
  /** Trailing action slot (e.g. a filter button). */
  actions?: React.ReactNode;
  /** Show a clear (×) button when there is text. */
  clearable?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A search bar header: a token-bound search field with a leading glyph, an
 * optional clear button, and a trailing action slot. Token-only.
 */
export function SearchHeader({
  value,
  onChangeText,
  placeholder = 'Search',
  onSubmit,
  actions,
  clearable = true,
  style,
}: SearchHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
        style,
      ]}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.full,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>⌕</Text>
        <TextInput
          accessibilityLabel={placeholder}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          returnKeyType="search"
          style={{
            flex: 1,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            paddingVertical: tokens.spacing.sm,
          }}
        />
        {clearable && value.length > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear search"
            onPress={() => onChangeText('')}
            hitSlop={8}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>✕</Text>
          </Pressable>
        ) : null}
      </View>
      {actions ? <View>{actions}</View> : null}
    </View>
  );
}
