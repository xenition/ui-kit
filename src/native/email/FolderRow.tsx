import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from './tint';

export interface FolderRowProps {
  /** Folder / mailbox name (e.g. "Inbox", "Sent"). */
  name: string;
  /** Leading glyph (emoji / symbol). */
  glyph?: string;
  /** Unread / item count; > 0 renders a trailing count. */
  count?: number;
  /** Selected/active folder — tinted background + accent text. */
  selected?: boolean;
  /** Nesting depth for sub-folders (indents the row). */
  depth?: number;
  /** Open the folder. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A navigation row for a mailbox / folder in the mail sidebar — leading glyph,
 * name, and an optional unread count. The `selected` state tints the row with a
 * token-derived primary wash and colors the label with the primary slot; the
 * accessibility state also reports `selected` so it isn't signalled by color
 * alone. Indents by `depth` for nested folders. No literal colors.
 */
export function FolderRow({
  name,
  glyph,
  count = 0,
  selected = false,
  depth = 0,
  onPress,
  style,
}: FolderRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const indent = Math.max(0, depth) * tokens.spacing.lg;

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
          paddingVertical: tokens.spacing.sm,
          paddingRight: tokens.spacing.md,
          paddingLeft: tokens.spacing.md + indent,
          borderRadius: tokens.radius.md,
          backgroundColor: selected
            ? withAlpha(colors.primary, 0.14)
            : pressed
              ? colors.border
              : 'transparent',
        },
        style,
      ]}
    >
      {glyph ? <Icon glyph={glyph} size="base" color={selected ? 'primary' : 'muted'} /> : null}
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          color: selected ? colors.primary : colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: selected ? '700' : '500',
        }}
      >
        {name}
      </Text>
      {count > 0 ? (
        <View
          style={{
            minWidth: 22,
            paddingHorizontal: tokens.spacing.xs,
            paddingVertical: 1,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            backgroundColor: selected ? colors.primary : withAlpha(colors.onSurface, 0.1),
          }}
        >
          <Text
            style={{
              color: selected ? colors.onPrimary : colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
            }}
          >
            {count > 999 ? '999+' : String(count)}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}
