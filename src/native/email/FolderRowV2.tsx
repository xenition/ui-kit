import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Icon } from '../primitives';
import { withAlpha } from './tint';
import { shadow } from '../primitives/internal/elevation';
import type { FolderRowProps } from './FolderRow';

/** Same public contract as {@link FolderRow} — a drop-in alternate design. */
export type FolderRowV2Props = FolderRowProps;

/**
 * FolderRow — design V2. A **tile**: a large folder glyph on a soft tinted
 * chip, the name beneath, and the unread count as a corner `Badge`. The
 * `selected` state raises the tile (shadow + primary border) and reports
 * `selected` to a11y so it isn't color-alone. Same props as `FolderRow` — the
 * `depth` indent still applies. No literal colors.
 */
export function FolderRowV2({
  name,
  glyph,
  count = 0,
  selected = false,
  depth = 0,
  onPress,
  style,
}: FolderRowV2Props): React.ReactElement {
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
          margin: tokens.spacing.xs,
          marginLeft: tokens.spacing.xs + indent,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1.5,
          borderColor: selected ? colors.primary : colors.border,
          backgroundColor: selected ? withAlpha(colors.primary, 0.08) : pressed ? colors.border : colors.surface,
          gap: tokens.spacing.sm,
          ...shadow(selected ? 'md' : 'none', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selected ? withAlpha(colors.primary, 0.16) : withAlpha(colors.onSurface, 0.06),
          }}
        >
          <Icon glyph={glyph ?? '📁'} size="lg" color={selected ? 'primary' : 'muted'} />
        </View>
        {count > 0 ? (
          <Badge tone={selected ? 'primary' : 'neutral'} variant={selected ? 'solid' : 'soft'} size="sm">
            {count > 999 ? '999+' : String(count)}
          </Badge>
        ) : null}
      </View>

      <Text
        numberOfLines={1}
        style={{
          color: selected ? colors.primaryText : colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: selected ? '700' : '600',
        }}
      >
        {name}
      </Text>
    </Pressable>
  );
}
