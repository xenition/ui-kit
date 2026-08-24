"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactTimeline = ContactTimeline;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * Vertical activity timeline for a contact / deal: each event is a glyph node
 * (kind → glyph + tone, matching {@link ActivityLogRow}) on a connector rail,
 * with title, detail and an actor · timestamp meta line. The connector is
 * suppressed on the last node via guarded indexing. Renders a `loading`
 * skeleton and an `emptyLabel` placeholder. All colors are theme tokens; node
 * tints use `withAlpha` over a token.
 */
function ContactTimeline({ items, onItemPress, loading = false, emptyLabel = 'No activity yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading timeline", style: [{ gap: tokens.spacing.md }, style], children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, paddingTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }, i))) }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyLabel, style: [{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: items.map((item, index) => {
            const meta = internal_1.ACTIVITY_META[item.kind];
            const accent = (0, internal_1.toneColor)(colors, meta.tone);
            const isLast = index === items.length - 1;
            const metaLine = [item.actor, item.timestamp].filter(Boolean).join(' · ');
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onItemPress ? 'button' : 'text', accessibilityLabel: `${meta.label}: ${item.title}`, disabled: !onItemPress, onPress: onItemPress ? () => onItemPress(item) : undefined, style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 28 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 28,
                                    height: 28,
                                    borderRadius: 14,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, color_1.withAlpha)(accent, 0.14),
                                    borderWidth: 1,
                                    borderColor: accent,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: accent }, children: meta.glyph }) }), isLast ? null : (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 2, backgroundColor: colors.border, marginVertical: 2 } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1, paddingBottom: isLast ? 0 : tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: item.title }), item.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: item.detail })) : null, metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: metaLine })) : null] })] }, item.id));
        }) }));
}
//# sourceMappingURL=ContactTimeline.js.map