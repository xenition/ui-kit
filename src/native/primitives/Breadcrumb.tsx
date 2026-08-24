import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface BreadcrumbItem {
  label: React.ReactNode;
  onPress?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Breadcrumb trail — the native mirror of the web `Breadcrumb` (`onClick`→
 * `onPress`; there is no `href` on native). The last item is the current page.
 * Token-bound muted links, separators, and current label. No literal colors.
 */
export function Breadcrumb({ items, separator = '/', style }: BreadcrumbProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const size = tokens.typography.scale.sm;
  return (
    <View
      accessibilityLabel="Breadcrumb"
      style={[{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.sm }, style]}
    >
      {items.map((it, i) => {
        const last = i === items.length - 1;
        const labelNode =
          typeof it.label === 'string' ? (
            <Text
              style={{
                fontSize: size,
                color: last ? colors.onSurface : colors.muted,
                fontWeight: last ? '500' : '400',
              }}
            >
              {it.label}
            </Text>
          ) : (
            it.label
          );
        return (
          <React.Fragment key={i}>
            {it.onPress && !last ? (
              <Pressable accessibilityRole="link" onPress={it.onPress}>
                {labelNode}
              </Pressable>
            ) : (
              labelNode
            )}
            {!last ? (
              typeof separator === 'string' ? (
                <Text style={{ fontSize: size, color: colors.muted }}>{separator}</Text>
              ) : (
                separator
              )
            ) : null}
          </React.Fragment>
        );
      })}
    </View>
  );
}
