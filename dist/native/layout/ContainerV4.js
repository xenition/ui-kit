"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerV4 = ContainerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
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
function ContainerV4({ maxWidth = 480, padding = 'lg', safeArea = false, style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const gutter = tokens.spacing[padding];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                width: '100%',
                maxWidth: maxWidth === 'none' ? undefined : maxWidth,
                alignSelf: 'center',
                paddingLeft: safeArea ? gutter + insets.left : gutter,
                paddingRight: safeArea ? gutter + insets.right : gutter,
            },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=ContainerV4.js.map