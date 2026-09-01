"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartBarV4 = CartBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const commerce_1 = require("../commerce");
const menu_v4_1 = require("./internal/menu-v4");
/**
 * **V4 cart bar** — same props as {@link CartBar} plus `updatingLabel` and
 * `formatItemCount`.
 *
 * ## Five changes
 *
 * 1. **It clears the home indicator.** Its own docstring calls it a sticky
 *    bottom bar and it read no safe-area inset at all, so on a notched phone
 *    the total and the checkout action sat under the home indicator — the one
 *    bug that tells a user a screen was not built for their device. The band
 *    pays `spacing.md` *plus* `insets.bottom`, the way every other
 *    edge-anchored V4 component here does. Needs a `SafeAreaProvider` above
 *    it, which Expo mounts by default.
 * 2. **The count pill stops inverting the token pair.** It filled with the
 *    bar's `on-primary` ink and lettered it in `primary` — an `on` slot used
 *    as a *fill*, which the compiler guarantees nothing about in that
 *    direction. The pill is a hairline ring in the bar's own guaranteed ink
 *    now: correct as a 3:1 boundary and as text, in both schemes.
 * 3. **"1 items" is gone.** `formatItemCount` builds the phrase, and it is the
 *    same phrase the bar announces.
 * 4. **The total is tabular.** It re-renders every time the cart changes, and
 *    proportional figures make it jitter under the reader's eye.
 * 5. **Press is a state layer**, not `opacity: 0.9` — and the whole announced
 *    name is rebuilt from the same strings the bar draws, so the busy state
 *    reads as "Updating…" rather than as a stale "View cart".
 */
function CartBarV4({ itemCount, totalCents, currency = 'USD', label = 'View cart', onPress, variant = 'primary', loading = false, emptyLabel = 'Your cart is empty', updatingLabel = 'Updating…', formatItemCount, formatMoney = commerce_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const empty = itemCount <= 0;
    const bg = variant === 'accent' ? colors.accent : colors.primary;
    const fg = (0, menu_v4_1.onPair)(theme, variant === 'accent' ? 'accent' : 'primary');
    const disabled = empty || loading;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const countText = (formatItemCount ?? ((n) => `${n} ${n === 1 ? 'item' : 'items'}`))(itemCount);
    const totalText = formatMoney(totalCents, currency);
    const action = loading ? updatingLabel : label;
    const barStyle = (pressed) => ({
        borderRadius: tokens.radius.lg,
        minHeight: tap,
        paddingTop: tokens.spacing.md,
        // Change 1: the band sits above the home indicator, not under it.
        paddingBottom: tokens.spacing.md + insets.bottom,
        paddingHorizontal: tokens.spacing.lg,
        backgroundColor: empty
            ? colors.card
            : pressed
                ? (0, state_v4_1.pressOver)(theme, bg, fg)
                : bg,
        borderWidth: empty ? 1 : 0,
        borderColor: colors.border,
    });
    const content = empty ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", align: "center", children: emptyLabel })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            minWidth: tokens.spacing.lg,
                            height: tokens.spacing.lg,
                            paddingHorizontal: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: fg,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", style: [{ color: fg }, menu_v4_1.TABULAR], children: itemCount }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", style: { color: fg }, children: action })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", style: [{ color: fg }, menu_v4_1.TABULAR], children: totalText })] }));
    if (empty || !onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: empty ? emptyLabel : (0, menu_v4_1.spokenLine)([action, countText, totalText]), style: [barStyle(false), style], children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, menu_v4_1.spokenLine)([action, countText, totalText]), accessibilityState: { disabled, busy: loading }, disabled: disabled, onPress: disabled ? undefined : onPress, style: ({ pressed }) => [barStyle(pressed), style], children: content }));
}
//# sourceMappingURL=CartBarV4.js.map