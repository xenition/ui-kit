import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ListItemData {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Leading slot (e.g. an Avatar or icon). */
  leading?: React.ReactNode;
  /** Trailing slot (e.g. a Badge, Button, or chevron). */
  trailing?: React.ReactNode;
  /** Makes the row pressable. */
  onPress?: () => void;
}

export interface ListProps {
  items: ListItemData[];
  style?: StyleProp<ViewStyle>;
}

/**
 * Vertical list of leading/title/description/trailing rows — the native mirror
 * of the web `List` (`onClick`→`onPress`). Token-bound surface, border and
 * divider. No literal colors.
 */
export function List({ items, style }: ListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: tokens.radius.md,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {items.map((it, i) => {
        const inner = (
          <>
            {it.leading != null ? <View>{it.leading}</View> : null}
            <View style={{ flex: 1, minWidth: 0 }}>
              {typeof it.title === 'string' ? (
                <Text
                  numberOfLines={1}
                  style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}
                >
                  {it.title}
                </Text>
              ) : (
                it.title
              )}
              {it.description != null ? (
                typeof it.description === 'string' ? (
                  <Text
                    numberOfLines={1}
                    style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}
                  >
                    {it.description}
                  </Text>
                ) : (
                  it.description
                )
              ) : null}
            </View>
            {it.trailing != null ? <View>{it.trailing}</View> : null}
          </>
        );
        const rowStyle: ViewStyle = {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
          borderTopWidth: i === 0 ? 0 : 1,
          borderColor: colors.border,
        };
        return it.onPress ? (
          <Pressable key={i} accessibilityRole="button" onPress={it.onPress} style={rowStyle}>
            {inner}
          </Pressable>
        ) : (
          <View key={i} style={rowStyle}>
            {inner}
          </View>
        );
      })}
    </View>
  );
}
