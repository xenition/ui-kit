import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  type KeyboardAvoidingViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface KeyboardAvoiderV4Props extends KeyboardAvoidingViewProps {
  /**
   * Extra distance, in points, between the top of the keyboard and the content
   * lifted above it — `KeyboardAvoidingView`'s `keyboardVerticalOffset` under
   * a name that says what it is for.
   *
   * A screen with a sticky footer needs this: the footer is what the keyboard
   * pushes up, and without an offset the field that triggered the keyboard
   * ends up behind it. Defaults to the base's behaviour (no offset). An
   * explicit `keyboardVerticalOffset` still works and this wins over it.
   */
  offset?: number;
  /**
   * Add the device's **top** safe-area inset to `offset`.
   *
   * `KeyboardAvoidingView` measures its own frame against the *window*, so
   * when it is mounted below the status bar or a header — the usual case on a
   * screen that has already consumed the top inset — its idea of where the
   * keyboard starts is off by exactly that inset, and the lifted content stops
   * short of clearing the keyboard. Reading the inset here is the same
   * `useSafeAreaInsets()` every other inset-aware V4 component uses
   * (`AuthStickyFooterV4`, `ScrollAreaV4`), rather than a second mechanism.
   *
   * Defaults to `false`, because the base read no inset and V4 is additive
   * (§1.4). Needs a `SafeAreaProvider` above it, which Expo mounts by default.
   */
  safeArea?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * **V4 keyboard avoider** — content lifts above the on-screen keyboard with
 * the platform-correct `behavior` (`padding` on iOS, `height` on Android).
 *
 * **Native only, deliberately.** There is no web twin and there should not be:
 * keyboard avoidance is a native concern — a browser scrolls the focused field
 * into view itself, and the visual-viewport API is a different mechanism with
 * different failure modes. §6.1 settles this the same way it settles `Sticky`
 * in the other direction — a documented single-platform exception, like
 * `XenitionNativeThemeProviderV4`.
 *
 * §5 calls this one "structure only": no colour, no spacing, no radius, no
 * type. It paints nothing at all, which is why it reads no theme.
 *
 * ## What V4 changes
 *
 * **The offset has a name.** §5's note verbatim: a screen with a sticky footer
 * needs `keyboardVerticalOffset`, and reaching for the raw
 * `KeyboardAvoidingView` prop through `...rest` is how a caller ends up
 * guessing a number per screen. `offset` is the same value under a name that
 * says what it does.
 *
 * **It can account for a consumed top inset.** See `safeArea` — the one
 * safe-area interaction this component has, and the reason lifted content
 * sometimes stops short of the keyboard on a notched phone.
 *
 * ## `flex: 1` is deliberate
 *
 * §5 asks for this to be written down rather than left as a surprise. The view
 * takes `flex: 1` **ahead of** the caller's `style`, so it fills its parent by
 * default — which is what it must do, because `KeyboardAvoidingView` lifts
 * content by shrinking *its own* frame, and a view sized to its content has
 * nothing to shrink. The caller's `style` still comes last and can override
 * it, for the rare case where the avoider is a sized panel rather than the
 * whole screen.
 *
 * ## Empty state
 *
 * With no children it renders an empty full-height box rather than `null`.
 * That is the opposite of §4.5's rule and it is correct here: this component
 * paints nothing — no ground, no border, no rule — so there is no blank box to
 * leave behind, and it is a *layout parent* whose `flex: 1` is holding the
 * screen's height. Collapsing it would move everything around it.
 */
export function KeyboardAvoiderV4({
  behavior,
  offset,
  safeArea = false,
  keyboardVerticalOffset,
  style,
  children,
  ...rest
}: KeyboardAvoiderV4Props): React.ReactElement {
  // Needs a `SafeAreaProvider` above it (Expo default).
  const insets = useSafeAreaInsets();
  // `0` is the absence of an offset, not a spacing decision (§1.1).
  const verticalOffset = (offset ?? keyboardVerticalOffset ?? 0) + (safeArea ? insets.top : 0);

  return (
    <KeyboardAvoidingView
      behavior={behavior ?? (Platform.OS === 'ios' ? 'padding' : 'height')}
      keyboardVerticalOffset={verticalOffset}
      // Fills its parent so there is a frame to shrink; the caller's `style`
      // comes after and can override it.
      style={[{ flex: 1 }, style]}
      {...rest}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
