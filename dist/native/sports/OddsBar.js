"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OddsBar = OddsBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Format a decimal price for display, keeping two decimals. */
function formatPrice(v) {
    return Number.isFinite(v) ? v.toFixed(2) : '—';
}
/**
 * OddsBar — **V4** "broadcast" design. A three-segment odds split (home / draw /
 * away) as an elevated, evenly-divided bar. Each segment stacks a big price
 * numeral over a caption. Odds are **decimal prices**, so the **favourite is the
 * lowest price**: it is emphasized in the single `primary` accent. A `selected`
 * pick is filled in primary; when `onSelect` is given each segment is an
 * accessible ≥44px button reflecting its pressed state. Token-only colors via
 * `useXenitionTheme()`; dark-mode safe.
 */
function OddsBar({ home, draw, away, homeLabel = 'Home', drawLabel = 'Draw', awayLabel = 'Away', onSelect, selected, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 6,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: 6,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    const segments = [
        { pick: 'home', price: home, label: homeLabel },
        { pick: 'draw', price: draw, label: drawLabel },
        { pick: 'away', price: away, label: awayLabel },
    ];
    // Favourite = lowest decimal price (most likely outcome).
    const min = Math.min(home, draw, away);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", accessibilityLabel: "Match odds", style: [container, style], children: segments.map(({ pick, price, label }) => {
            const isSelected = selected === pick;
            const isFav = price === min && Number.isFinite(price);
            const bg = isSelected
                ? colors.primary
                : isFav
                    ? (0, color_1.withAlpha)(colors.primary, 0.12)
                    : (0, color_1.withAlpha)(colors.onSurface, 0.05);
            const priceColor = isSelected ? colors.onPrimary : isFav ? colors.primary : colors.onSurface;
            const labelColor = isSelected ? colors.onPrimary : colors.muted;
            const a11y = `${label} ${formatPrice(price)}${isFav ? ', favourite' : ''}${isSelected ? ', selected' : ''}`;
            const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: priceColor, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: formatPrice(price) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: labelColor, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: label })] }));
            const segStyle = {
                flex: 1,
                minHeight: 44,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: bg,
            };
            if (onSelect) {
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: isSelected }, accessibilityLabel: a11y, onPress: () => onSelect(pick), style: ({ pressed }) => [segStyle, { opacity: pressed ? 0.85 : 1 }], children: inner }, pick));
            }
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: segStyle, children: inner }, pick));
        }) }));
}
//# sourceMappingURL=OddsBar.js.map