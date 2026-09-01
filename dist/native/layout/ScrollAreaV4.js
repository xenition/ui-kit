"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollAreaV4 = ScrollAreaV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
/**
 * **V4 scroll area** — the native twin of the web `ScrollAreaV4`, the base's
 * props plus `axis`, `padding="none"` and safe-area handling.
 *
 * §5 calls this one "structure and parity only, no visual change", and nothing
 * here moves a default: the same `padding="lg"`, the same `filled`.
 *
 * ## What V4 changes
 *
 * **Parity with web.** §5's named gap: web had `axis`, this twin did not, so
 * the same scrolling carousel needed two different call shapes on the two
 * platforms and native callers reached past the component to `horizontal`.
 * `axis` now maps to `horizontal` here (§1.3).
 *
 * **`padding="none"` exists.** The base's `SpaceKey` had no zero, so full-bleed
 * content — a row list whose rows carry §4.3's own `spacing.md`, a chip row
 * bleeding to the screen edge — had to fight the region's `lg` with a negative
 * margin. It is a real layout choice, so it gets a real value.
 *
 * **It can clear the home indicator.** HIG asks a scroll region to respect the
 * system safe areas and the base read none, so the final row of a full-height
 * list sat under the home indicator with no way to scroll it out. `safeArea`
 * adds `insets.bottom` to the *content* padding — not to the region's frame —
 * via `useSafeAreaInsets()`, which is how every other edge-aware V4 component
 * here reads an inset (`AuthStickyFooterV4`, `BottomNavV4`, `PageContainer`).
 * Padding the content rather than the box is what keeps the scroll indicator
 * and the region's own background running to the true bottom of the screen.
 *
 * ## What it deliberately does not do
 *
 * **No shadow, no scroll-edge line.** §4.6 gives a shadow to a card, a sheet
 * and the one dominant action; a scroll region is none of the three. §4.4:
 * between free-standing blocks, space rather than a rule.
 *
 * **An empty region still draws.** §4.5's "render nothing" is about a
 * component with nothing to *say*; a scroll region is a viewport the caller
 * has sized, and collapsing it would take the screen's scroll with it. With no
 * children it paints nothing but its own optional `surface`.
 */
function ScrollAreaV4({ axis = 'vertical', padding = 'lg', filled = false, safeArea = false, horizontal, style, contentContainerStyle, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const pad = padding === 'none' ? undefined : tokens.spacing[padding];
    // `0` is the absence of padding, not a spacing decision (§1.1).
    const bottom = safeArea ? (pad ?? 0) + insets.bottom : undefined;
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: horizontal ?? axis === 'horizontal', style: [filled ? { backgroundColor: colors.surface } : null, style], contentContainerStyle: [{ padding: pad, paddingBottom: bottom }, contentContainerStyle], ...rest, children: children }));
}
//# sourceMappingURL=ScrollAreaV4.js.map