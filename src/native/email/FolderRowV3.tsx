import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import type { FolderRowProps } from './FolderRow';

/** Same public contract as {@link FolderRow} — a drop-in alternate design. */
export type FolderRowV3Props = FolderRowProps;

/**
 * FolderRow — design V3. A **compact, indented list line** for a deep folder
 * tree: a small leading glyph, the name, and a plain right-aligned count — no
 * pill, no fill, tight vertical rhythm. The `selected` state adds a leading
 * accent rail + bold primary label and reports `selected` to a11y (never
 * color-alone). Indents by `depth`. Same props as `FolderRow`. No literal colors.
 */
export function FolderRowV3({
  name,
  glyph,
  count = 0,
  selected = false,
  depth = 0,
  onPress,
  style,
}: FolderRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const indent = Math.max(0, depth) * tokens.spacing.md;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}${count > 0 ? `, ${count} unread` : ''}`}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.xs,
          paddingRight: tokens.spacing.md,
          paddingLeft: tokens.spacing.sm + indent,
          backgroundColor: selected ? colors.border : pressed ? colors.border : 'transparent',
        },
        style,
      ]}
    >
      {/* Leading accent rail marks the selected row (paired with bold label + a11y state). */}
      <View
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={{
          width: 3,
          alignSelf: 'stretch',
          borderRadius: tokens.radius.full,
          backgroundColor: selected ? colors.primary : 'transparent',
        }}
      />
      {glyph ? <Icon glyph={glyph} size="sm" color={selected ? 'primary' : 'muted'} /> : null}
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          color: selected ? colors.primaryText : colors.onSurface,
          fontSize: tokens.typography.scale.sm,
          fontWeight: selected ? '700' : '500',
        }}
      >
        {name}
      </Text>
      {count > 0 ? (
        <Text
          style={{
            color: selected ? colors.primaryText : colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
          }}
        >
          {count > 999 ? '999+' : String(count)}
        </Text>
      ) : null}
    </Pressable>
  );
}
