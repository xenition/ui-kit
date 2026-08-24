import * as React from 'react';
import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type HashtagChipSize = 'sm' | 'md';

export interface HashtagChipProps {
  /** Tag text — a leading `#` is added automatically if missing. */
  tag: string;
  /** Filled/primary appearance when the tag is selected/active. */
  active?: boolean;
  /** Optional post count shown after the tag (e.g. `1.2k`). */
  count?: string | number;
  size?: HashtagChipSize;
  /** Fires with the bare tag (no `#`). */
  onPress?: (tag: string) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tappable hashtag pill. Idle chips read muted-on-surface; `active` chips
 * fill with the primary color. Composes into topic bars, trending lists, and
 * post footers. Token-only, `link` a11y role.
 */
export function HashtagChip({
  tag,
  active = false,
  count,
  size = 'md',
  onPress,
  style,
}: HashtagChipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const bare = tag.replace(/^#/, '');
  const label = `#${bare}`;
  const fontSize = size === 'sm' ? tokens.typography.scale.xs : tokens.typography.scale.sm;
  const padV = size === 'sm' ? 2 : tokens.spacing.xs;

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
          gap: tokens.spacing.xs,
          borderRadius: tokens.radius.full,
          borderWidth: 1,
          borderColor: active ? colors.primary : colors.border,
          backgroundColor: active ? colors.primary : colors.surface,
          paddingVertical: padV,
          paddingHorizontal: tokens.spacing.sm,
          opacity: pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text style={{ color: active ? colors.onPrimary : colors.primary, fontSize, fontWeight: '600' }}>
        {label}
      </Text>
      {count != null ? (
        <Text style={{ color: active ? colors.onPrimary : colors.muted, fontSize }}>
          {String(count)}
        </Text>
      ) : null}
    </Pressable>
  );
}
