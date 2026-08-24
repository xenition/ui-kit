import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface DescriptionItem {
  label: React.ReactNode;
  value: React.ReactNode;
}

export interface DescriptionsProps {
  items: DescriptionItem[];
  columns?: 1 | 2;
  style?: StyleProp<ViewStyle>;
}

/**
 * Key/value detail grid — the native mirror of the web `Descriptions`. Renders
 * a token-bound label/value pair per item, laid out in 1 or 2 columns via a
 * flex-wrap grid. For record/detail views. No literal colors.
 */
export function Descriptions({ items, columns = 1, style }: DescriptionsProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          columnGap: tokens.spacing.xl,
          rowGap: tokens.spacing.md,
        },
        style,
      ]}
    >
      {items.map((it, i) => (
        <View
          key={i}
          style={{ gap: 2, width: columns === 2 ? '45%' : '100%', flexGrow: 1 }}
        >
          {typeof it.label === 'string' ? (
            <Text
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.xs,
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {it.label}
            </Text>
          ) : (
            it.label
          )}
          {typeof it.value === 'string' ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{it.value}</Text>
          ) : (
            it.value
          )}
        </View>
      ))}
    </View>
  );
}
