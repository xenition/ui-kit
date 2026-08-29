import * as React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { ButtonGroupProps } from './ButtonGroup';

export type { ButtonGroupProps as ButtonGroupV4Props };

/** The platform minimum touch target — a property of fingers, not of the seed. */
const MIN_TAP = 44;

/**
 * **V4 button group** — same props as {@link ButtonGroup}, a different design
 * line. Still purely structural: it adds one colour, the `border` hairline, and
 * lets every child keep its own.
 *
 * 1. **The seams actually close.** `overflow: 'hidden'` clips the CONTAINER's
 *    corners; it does nothing to the children's. So every button inside the
 *    native group kept its own `radius.md` and the group showed a notch at each
 *    seam, with the page bleeding through — while the web twin had it right all
 *    along with `[&>*]:rounded-none`. V4 passes `borderRadius: 0` down to each
 *    cell, which is that rule's native equivalent.
 * 2. **It stops claiming to be a `toolbar`.** That role promises arrow-key
 *    navigation between its controls, and this component provides none — a
 *    screen-reader user who trusts it is stranded inside the group. React
 *    Native has no `group` role to swap in (the web twin's `role="group"` has
 *    no native equivalent), so V4 claims nothing: the buttons are the
 *    accessible elements and the row is layout. An honest silence beats a
 *    promise the component cannot keep (§46).
 * 3. **One row, one height.** Nothing made the cells the same height, so a
 *    group mixing an `sm` and an `md` button had a ragged bottom edge inside a
 *    single border. They stretch now, and the row has a 44pt floor — a joined
 *    control is still a row of tap targets.
 *
 * No fill, no gradient, no shadow. A segmented control groups by adjacency and
 * a hairline (§9, §11); the buttons inside it are what carry colour.
 */
export function ButtonGroupV4({
  children,
  fill = false,
  style,
}: ButtonGroupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const items = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <View
      // No role. React Native has no `group`, and `toolbar` — what the base
      // claimed — is a promise this component does not keep (see above). The
      // buttons inside are the accessible elements; the row is layout.
      style={[
        {
          flexDirection: 'row',
          alignItems: 'stretch',
          alignSelf: fill ? 'stretch' : 'flex-start',
          minHeight: MIN_TAP,
          borderRadius: tokens.radius.md,
          borderColor: colors.border,
          borderWidth: 1,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {items.map((child, i) => {
        const element = child as React.ReactElement<{ style?: StyleProp<ViewStyle> }>;
        // The native equivalent of the web twin's `[&>*]:rounded-none`: the
        // container's clip never reaches a child's own corners.
        const flush = React.cloneElement(element, {
          style: [element.props.style, { borderRadius: 0 }],
        });
        return (
          <React.Fragment key={i}>
            {i > 0 ? <View style={{ width: 1, backgroundColor: colors.border }} /> : null}
            <View style={{ flex: fill ? 1 : undefined, justifyContent: 'center' }}>{flush}</View>
          </React.Fragment>
        );
      })}
    </View>
  );
}
