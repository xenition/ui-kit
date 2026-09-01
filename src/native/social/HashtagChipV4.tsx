import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import type { HashtagChipProps } from './HashtagChip';

/** Drop-in for {@link HashtagChipProps} — same props, the V4 "feed" design. */
export type HashtagChipV4Props = HashtagChipProps;

/**
 * HashtagChip — **V4** "feed" design. A rounded soft-primary chip: `#tag`
 * rendered in primary on a soft-primary tint, tappable with a ≥44px target.
 * When `active` it fills with the primary color. Same props/behavior as
 * {@link HashtagChipProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`, `link` a11y role.
 */
export function HashtagChipV4({
  tag,
  active = false,
  count,
  size = 'md',
  onPress,
  style,
}: HashtagChipV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const bare = tag.replace(/^#/, '');
  const label = `#${bare}`;
  const fontSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
      disabled={!onPress}
      onPress={onPress ? () => onPress(bare) : undefined}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          minHeight: 44,
          gap: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          backgroundColor: active ? colors.primary : withAlpha(colors.primary, 0.1),
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.md,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text style={{ color: active ? colors.onPrimary : colors.primaryText, fontSize, fontWeight: '600' }}>
        {label}
      </Text>
      {count != null ? (
        <Text style={{ color: active ? colors.onPrimary : withAlpha(colors.primaryText, 0.7), fontSize }}>
          {String(count)}
        </Text>
      ) : null}
    </Pressable>
  );
}
