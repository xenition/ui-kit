"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveCommentary = LiveCommentary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const KIND_META = {
    goal: { glyph: '⚽', label: 'Goal', tone: 'success' },
    card: { glyph: '🟨', label: 'Card', tone: 'warn' },
    sub: { glyph: '🔁', label: 'Substitution', tone: 'primary' },
    chance: { glyph: '🎯', label: 'Chance' },
    var: { glyph: '📺', label: 'VAR', tone: 'primary' },
    whistle: { glyph: '📣', label: 'Whistle' },
    info: { glyph: '•', label: 'Update' },
};
/**
 * A live text commentary feed — a vertical list of timestamped entries, each
 * with a kind glyph and an accessible kind prefix so meaning survives without
 * color. Handles a `live` header pulse, a loading skeleton, and an empty
 * state. Presentational: pass shaped `entries`; nothing polls. Token-only
 * colors.
 */
function LiveCommentary({ entries, title = 'Live commentary', live = false, loadingRows, emptyLabel = 'No commentary yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
    };
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [live ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger } }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), live ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "LIVE" })) : null] }));
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { busy: true }, accessibilityLabel: "Loading commentary", style: [container, style], children: [header, Array.from({ length: loadingRows }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.xl, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }, i)))] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [container, style], children: [header, entries.length === 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { paddingVertical: tokens.spacing.lg, alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: emptyLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "Updates will stream in once the match kicks off." })] })) : (entries.map((e) => {
                const meta = KIND_META[e.kind ?? 'info'] ?? KIND_META.info;
                const toneColor = meta.tone === 'success'
                    ? colors.success
                    : meta.tone === 'warn'
                        ? colors.warn
                        : meta.tone === 'danger'
                            ? colors.danger
                            : meta.tone === 'primary'
                                ? colors.primary
                                : colors.muted;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${e.minute ? e.minute + ', ' : ''}${meta.label}: ${e.text}`, style: {
                        flexDirection: 'row',
                        gap: tokens.spacing.sm,
                        paddingVertical: tokens.spacing.xs,
                        paddingLeft: e.important ? tokens.spacing.sm : 0,
                        borderLeftWidth: e.important ? 3 : 0,
                        borderColor: toneColor,
                        backgroundColor: e.important ? tokens.ramps.neutral[50] : 'transparent',
                        borderRadius: e.important ? tokens.radius.sm : 0,
                    }, children: [e.minute ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                minWidth: 40,
                                color: colors.muted,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '700',
                            }, children: e.minute })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                flex: 1,
                                color: e.important ? colors.onSurface : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: e.important ? '600' : '400',
                            }, children: e.text })] }, e.id));
            }))] }));
}
//# sourceMappingURL=LiveCommentary.js.map