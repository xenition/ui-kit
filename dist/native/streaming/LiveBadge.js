"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveBadge = LiveBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A "LIVE" indicator for streams — a `danger`-toned pill with a leading dot.
 * Three variants (`solid` / `outline` / `dot`) and an optional viewer count.
 * Presentational only; every color resolves from `SemanticColors` (`danger` /
 * `onDanger` / `muted`) — no literal hex.
 */
function LiveBadge({ variant = 'solid', label = 'LIVE', viewers, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const solid = variant === 'solid';
    const dotOnly = variant === 'dot';
    const fg = solid ? colors.onDanger : colors.danger;
    const countText = viewers != null ? `${(0, types_1.formatCount)(viewers)} watching` : undefined;
    const a11y = accessibilityLabel ?? [label, countText].filter(Boolean).join(', ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11y, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                paddingVertical: dotOnly ? 0 : 2,
                paddingHorizontal: dotOnly ? 0 : tokens.spacing.sm,
                backgroundColor: solid ? colors.danger : 'transparent',
                borderWidth: variant === 'outline' ? 1 : 0,
                borderColor: variant === 'outline' ? colors.danger : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 6,
                    height: 6,
                    borderRadius: tokens.radius.full,
                    backgroundColor: fg,
                } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: fg,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                }, children: label.toUpperCase() }), countText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: solid ? colors.onDanger : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '500',
                }, children: countText })) : null] }));
}
//# sourceMappingURL=LiveBadge.js.map