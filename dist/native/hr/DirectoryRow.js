"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryRow = DirectoryRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * Dense people-directory row: avatar with presence, name, title / department,
 * and contact meta (email / phone). Presence is conveyed by a glyph + word pill
 * so it never depends on color alone. `compact` trims to name + title for tight
 * lists. Optional trailing message affordance. All colors are theme tokens —
 * no literals.
 */
function DirectoryRow({ name, title, department, avatarUrl, email, phone, presence, variant = 'default', onPress, onMessage, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const presenceMeta = presence ? internal_1.PRESENCE_META[presence] : undefined;
    const subtitle = [title, department].filter(Boolean).join(' · ');
    const contact = [email, phone].filter(Boolean).join('  ·  ');
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl, status: presence }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null, !compact && contact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: contact })) : null] }), presenceMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, internal_1.toneColor)(colors, presenceMeta.tone), fontSize: tokens.typography.scale.xs }, children: presenceMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: presenceMeta.label })] })) : null, onMessage ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Message ${name}`, hitSlop: 8, onPress: onMessage, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingLeft: tokens.spacing.xs }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.lg }, children: "\u2709" }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Open ${name}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=DirectoryRow.js.map