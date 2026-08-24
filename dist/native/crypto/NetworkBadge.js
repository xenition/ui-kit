"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkBadge = NetworkBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATUS_SLOT = {
    connected: 'success',
    congested: 'warn',
    disconnected: 'danger',
};
const STATUS_LABEL = {
    connected: 'Connected',
    congested: 'Congested',
    disconnected: 'Offline',
};
/**
 * Compact chain identifier pill — a dot (accented by `tone`) plus the network
 * name, and, when `status` is set, a second health dot with an accessible
 * label so the connection state is announced, not just colored. Token-bound;
 * the accent dot uses a subtle ramp-tinted background. No literal colors.
 */
function NetworkBadge({ name, status, tone = 'primary', glyph, size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const textKey = size === 'sm' ? 'xs' : 'sm';
    const dotSize = size === 'sm' ? 6 : 8;
    const statusLabel = status ? STATUS_LABEL[status] : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: statusLabel ? `${name}, ${statusLabel}` : name, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: tokens.ramps.neutral[100],
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.full,
                paddingVertical: 2,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [glyph != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale[textKey], color: colors[tone] }, children: glyph })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: dotSize,
                    height: dotSize,
                    borderRadius: dotSize / 2,
                    backgroundColor: colors[tone],
                } })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale[textKey], fontWeight: '600' }, children: name }), status != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: dotSize,
                            height: dotSize,
                            borderRadius: dotSize / 2,
                            backgroundColor: colors[STATUS_SLOT[status]],
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: statusLabel })] })) : null] }));
}
//# sourceMappingURL=NetworkBadge.js.map