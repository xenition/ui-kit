"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardAvoiderV4 = KeyboardAvoiderV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
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
function KeyboardAvoiderV4({ behavior, offset, safeArea = false, keyboardVerticalOffset, style, children, ...rest }) {
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    // `0` is the absence of an offset, not a spacing decision (§1.1).
    const verticalOffset = (offset ?? keyboardVerticalOffset ?? 0) + (safeArea ? insets.top : 0);
    return ((0, jsx_runtime_1.jsx)(react_native_1.KeyboardAvoidingView, { behavior: behavior ?? (react_native_1.Platform.OS === 'ios' ? 'padding' : 'height'), keyboardVerticalOffset: verticalOffset, 
        // Fills its parent so there is a frame to shrink; the caller's `style`
        // comes after and can override it.
        style: [{ flex: 1 }, style], ...rest, children: children }));
}
//# sourceMappingURL=KeyboardAvoiderV4.js.map