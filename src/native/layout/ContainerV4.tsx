import * as React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { SpacingScale } from '../../theme/types';
import { useXenitionTheme } from '../theme';

export type SpaceKey = keyof SpacingScale;

/** `maxWidth="none"` lets the column run the full width of its parent. */
export type ContainerV4MaxWidth = number | 'none';

export interface ContainerV4Props extends ViewProps {
  /**
   * Max content width in px, or `'none'` to uncap. Content is centered within
   * it. Defaults to `480` — the **mobile reading measure**, not a page width.
   *
   * 480 is the base `Container`'s value and it is kept so the default renders
   * exactly as it does today, but it is a phone-shaped number: a dashboard on a
   * tablet reads as a narrow ribbon down the middle of the screen at 480. Pass
   * a wider cap, or `'none'` and let a parent do the capping, for anything that
   * is not a column of reading copy.
   */
  maxWidth?: ContainerV4MaxWidth;
  /**
   * Horizontal page gutter, from the spacing scale. Defaults to `lg` (24) —
   * the brief's §4.1 page gutter, which is also M3's medium-window margin.
   */
  padding?: SpaceKey;
  /**
   * Grow the gutter by the device's horizontal safe-area inset. Default
   * `false`, so today's rendering is unchanged.
   *
   * HIG asks every layout to respect the system-defined safe areas, and nothing
   * in this module did. A landscape phone with a notch puts a real inset on the
   * leading edge; without this the first character of every line sits under it.
   *
   * The gutter is paid **on top of** the inset (`gutter + inset`) rather than
   * `max(gutter, inset)`, so content keeps its breathing room against the safe
   * edge instead of being flush with it — the same arithmetic
   * `AuthStickyFooterV4` uses for the bottom inset.
   */
  safeArea?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * **V4 container** — the native twin of the web `ContainerV4`, the base
 * `Container`'s props plus two, a different design line.
 *
 * This is the page-gutter component and the anchor for the brief's §4.1
 * rhythm: `padding="lg"` (24) is the distance from the screen edge to the
 * content, everywhere, and no other component in `layout` gets to invent one.
 * That default is already right, so V4 does not move it.
 *
 * ## What V4 changes
 *
 * 1. **`maxWidth` can be turned off.** The base types it as `number`, so the
 *    only way out of the 480 cap was to pass a number large enough to be a lie.
 *    `'none'` says what it means, and the doc comment now records that 480 is a
 *    *reading measure* rather than a page width — the reason a dashboard at the
 *    default looks stranded on a tablet.
 * 2. **`safeArea` exists.** See the prop. Off by default, because turning it on
 *    for every existing caller would move their layout.
 *
 * Everything else is the base: full width, self-centred, the gutter read off
 * `tokens.spacing`, and the numeric cap as the one layout literal (a caller's
 * own number, not a value this file chose). It paints nothing — no ground, no
 * border, no radius — so there is no state layer, no motion and no elevation
 * here. A container that acknowledged a press would be a container doing
 * something it is not for.
 *
 * ### Platform divergence
 *
 * None in the props. `safeArea` reads the device insets through
 * `useSafeAreaInsets()` here and through CSS `env(safe-area-inset-*)` on web;
 * both add the inset to the gutter, so the two twins land on the same number on
 * the same device. Documented identically in `src/layout/ContainerV4.tsx`.
 *
 * `useSafeAreaInsets()` is called unconditionally — hooks cannot be
 * conditional — and its result is only spent when `safeArea` is on, which is
 * the same shape every other edge-anchored component in the kit uses.
 */
export function ContainerV4({
  maxWidth = 480,
  padding = 'lg',
  safeArea = false,
  style,
  children,
  ...rest
}: ContainerV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const insets = useSafeAreaInsets();
  const gutter = tokens.spacing[padding];

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth: maxWidth === 'none' ? undefined : maxWidth,
          alignSelf: 'center',
          paddingLeft: safeArea ? gutter + insets.left : gutter,
          paddingRight: safeArea ? gutter + insets.right : gutter,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
