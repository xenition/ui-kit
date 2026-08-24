import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ButtonGroupProps {
  /** `Button` (or compatible) children to join into a single control. */
  children: React.ReactNode;
  /** Stretch children to equal width. Default `false`. */
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Button group — joins a row of `Button` children into one segmented control
 * with a single shared outer radius and hairline dividers in the `border`
 * token. The container clips inner corners (`overflow: 'hidden'`) so each child
 * button's own radius is neutralised at the seams; pass `fill` for equal-width
 * children. Purely structural — the buttons keep their own token-bound colors,
 * and the only color this adds (the divider) is the `border` token. No literals.
 */
export function ButtonGroup({ children, fill = false, style }: ButtonGroupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const items = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <View
      accessibilityRole="toolbar"
      style={[
        {
          flexDirection: 'row',
          alignSelf: fill ? 'stretch' : 'flex-start',
          borderRadius: tokens.radius.md,
          borderColor: colors.border,
          borderWidth: 1,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <View style={{ width: 1, backgroundColor: colors.border }} /> : null}
          <View style={{ flex: fill ? 1 : undefined }}>{child}</View>
        </React.Fragment>
      ))}
    </View>
  );
}
