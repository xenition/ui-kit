"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveBadgeV4 = LiveBadgeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const types_1 = require("./types");
/**
 * LiveBadge — **V4** "spotlight" design. A refined LIVE pill: a pulsing-look
 * `danger` dot (a solid core inside a soft-danger halo ring, so live status
 * reads by glyph + color, never color alone) beside a bold "LIVE" label on a
 * soft `withAlpha(danger, 0.12)` tint pill. Keeps the base's three variants
 * (`solid` / `outline` / `dot`) and the optional viewer count. Same
 * props/behavior as {@link LiveBadgeProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` — no literal hex.
 */
function LiveBadgeV4({ variant = 'solid', label = 'LIVE', viewers, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const dotOnly = variant === 'dot';
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
                // V4 spotlight: soft-danger tint pill for solid, outline keeps its border, dot stays chrome-less.
                backgroundColor: solid ? (0, color_1.withAlpha)(colors.danger, 0.12) : 'transparent',
                borderWidth: outline ? 1 : 0,
                borderColor: outline ? colors.danger : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 12,
                    height: 12,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.2),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 6,
                        height: 6,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.danger,
                    } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.danger,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                }, children: label.toUpperCase() }), countText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '500',
                }, children: countText })) : null] }));
}
//# sourceMappingURL=LiveBadgeV4.js.map