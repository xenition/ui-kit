import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';

export type BookmarkButtonVariant = 'icon' | 'labeled';

export interface BookmarkButtonProps {
  /** Whether the article is currently bookmarked (controlled). */
  bookmarked: boolean;
  /** Called with the next bookmarked state when the user taps. */
  onToggle: (next: boolean) => void;
  /**
   * - `icon`    — just the bookmark glyph (default).
   * - `labeled` — glyph + "Save"/"Saved" text.
   */
  variant?: BookmarkButtonVariant;
  /** Blocks presses (e.g. while a save request is in flight). */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A toggle for saving / bookmarking an article. Controlled: it reflects the
 * `bookmarked` prop and calls `onToggle(!bookmarked)` on press — the parent
 * owns the state. Filled accent glyph when saved, muted outline glyph when not.
 * Announces its pressed/selected state to screen readers. Two variants
 * (`icon` / `labeled`). All colors from `SemanticColors`; no literal hex.
 */
export function BookmarkButton({
  bookmarked,
  onToggle,
  variant = 'icon',
  disabled = false,
  style,
}: BookmarkButtonProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const glyph = bookmarked ? '★' : '☆';
  const glyphColor = bookmarked ? 'accent' : 'muted';
  const label = bookmarked ? 'Saved' : 'Save';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
      accessibilityState={{ selected: bookmarked, disabled }}
      disabled={disabled}
      onPress={() => onToggle(!bookmarked)}
      hitSlop={8}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: variant === 'labeled' ? tokens.spacing.sm : tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          borderWidth: variant === 'labeled' ? 1 : 0,
          borderColor: colors.border,
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Icon glyph={glyph} size="lg" color={glyphColor} />
      {variant === 'labeled' ? (
        <Text
          style={{
            color: bookmarked ? colors.accent : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          {label}
        </Text>
      ) : (
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" />
      )}
    </Pressable>
  );
}
