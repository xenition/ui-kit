"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeline = Timeline;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Maps a tone to its dot color slot (allowed tokens only). */
const DOT = {
    primary: 'primary',
    success: 'success',
    warn: 'accent',
    danger: 'danger',
    neutral: 'border',
};
/**
 * Vertical activity timeline — the native mirror of the web `Timeline`. Each
 * item renders a token-colored dot joined by a connector line, with title /
 * description / time. No literal colors.
 */
function Timeline({ items, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'column' }, style], children: items.map((it, i) => {
            const last = i === items.length - 1;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: last ? 0 : tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    marginTop: 4,
                                    width: 10,
                                    height: 10,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: colors[DOT[it.tone ?? 'primary']],
                                } }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, flex: 1, backgroundColor: colors.border, marginTop: 2 } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [typeof it.title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }, children: it.title })) : (it.title), it.description != null ? (typeof it.description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: it.description })) : (it.description)) : null, it.time != null ? (typeof it.time === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: it.time })) : (it.time)) : null] })] }, i));
        }) }));
}
//# sourceMappingURL=Timeline.js.map