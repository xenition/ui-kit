"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsTicker = NewsTicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A breaking-news ticker — the accent "LIVE / BREAKING" strip of latest
 * headlines. `scroll` lays the headlines out in a single horizontally
 * scrollable strip (separated by middots); `stacked` renders them as vertical
 * rows. Tapping a headline fires `onItemPress(id)`. Handles `loading` and empty
 * states. All colors from `SemanticColors`; no literal hex.
 */
function NewsTicker({ items, label = 'LIVE', onItemPress, variant = 'scroll', loading = false, emptyLabel = 'No headlines', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const labelChip = label != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            backgroundColor: colors.danger,
            borderRadius: tokens.radius.sm,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
            alignSelf: 'center',
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '800', letterSpacing: 0.8 }, children: label }) })) : null;
    const shell = (children) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                flexDirection: variant === 'scroll' ? 'row' : 'column',
                alignItems: variant === 'scroll' ? 'center' : 'stretch',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [labelChip, children] }));
    if (loading) {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Loading headlines\u2026" }));
    }
    if (items.length === 0) {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }));
    }
    if (variant === 'stacked') {
        return shell((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: items.map((item) => ((0, jsx_runtime_1.jsx)(HeadlineText, { item: item, onItemPress: onItemPress, numberOfLines: 2 }, item.id))) }));
    }
    return shell((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { alignItems: 'center', gap: tokens.spacing.sm }, style: { flex: 1 }, children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [i > 0 ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted }, children: "\u00B7" }) : null, (0, jsx_runtime_1.jsx)(HeadlineText, { item: item, onItemPress: onItemPress, numberOfLines: 1 })] }, item.id))) }));
}
/** A single tappable headline (or plain text when no handler). */
function HeadlineText({ item, onItemPress, numberOfLines, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const text = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: numberOfLines, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: item.text }));
    if (!onItemPress)
        return text;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "link", accessibilityLabel: item.text, onPress: () => onItemPress(item.id), style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1, flexShrink: 1 }), children: text }));
}
//# sourceMappingURL=NewsTicker.js.map