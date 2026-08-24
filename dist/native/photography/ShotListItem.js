"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShotListItem = ShotListItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const PRIORITY_LABEL = {
    must: 'Must-have',
    nice: 'Nice-to-have',
    optional: 'Optional',
};
/**
 * A shot-list checklist row — a check affordance, the shot title (struck when
 * `done`), an optional notes line, and a priority `Badge`. The whole row is a
 * `checkbox` when `onToggle` is provided: its captured state is announced via
 * the accessibility `checked` state and a ✓ glyph, never color alone. Composes
 * `Icon` and `Badge`. Token-only colors.
 */
function ShotListItem({ title, notes, done = false, priority, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    const checkbox = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: 24,
            height: 24,
            borderRadius: tokens.radius.sm,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: done ? 0 : 1,
            borderColor: colors.border,
            backgroundColor: done ? colors.success : 'transparent',
        }, children: done ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "onSuccess" }) : null }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [checkbox, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: done ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: title }), notes ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: notes })) : null] }), priority ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: priority === 'must' ? 'danger' : 'neutral', variant: "soft", size: "sm", children: PRIORITY_LABEL[priority] })) : null] }));
    if (onToggle) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: title, onPress: onToggle, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner });
}
//# sourceMappingURL=ShotListItem.js.map