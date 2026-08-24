"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBadge = StatusBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Semantic → contrast-checked `X`/`on-X` token pairs. Using the paired slots
 * (not a translucent tint) keeps the badge AA-readable in both modes with zero
 * configuration — the native mirror of the web `StatusBadge`.
 */
function pair(status, colors, neutral200) {
    switch (status) {
        case 'pending':
            return { bg: colors.warn, fg: colors.onWarn };
        case 'paid':
        case 'fulfilled':
            return { bg: colors.success, fg: colors.onSuccess };
        case 'shipped':
            return { bg: colors.primary, fg: colors.onPrimary };
        case 'cancelled':
            return { bg: colors.danger, fg: colors.onDanger };
        case 'refunded':
            return { bg: neutral200, fg: colors.onSurface };
    }
}
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/** Small pill badge for an order's status. Token-only, contrast-guaranteed. */
function StatusBadge({ status, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const { bg, fg } = pair(status, colors, tokens.ramps.neutral[200]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: bg,
                borderRadius: tokens.radius.full,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: 2,
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: children ?? capitalize(status) }) }));
}
//# sourceMappingURL=StatusBadge.js.map