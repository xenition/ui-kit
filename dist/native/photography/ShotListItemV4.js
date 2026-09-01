"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShotListItemV4 = ShotListItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const PRIORITY = {
    must: { label: 'Must-have', glyph: '★', tone: 'danger', color: 'danger' },
    nice: { label: 'Nice-to-have', glyph: '☆', tone: 'primary', color: 'primary' },
    optional: { label: 'Optional', glyph: '○', tone: 'neutral', color: 'muted' },
};
/**
 * ShotListItem — **V4** "studio" design. A checklist row on a clean, elevated
 * studio surface: an elevated card row (soft shadow, hairline border), a check
 * affordance, the shot title (struck when `done`), a muted notes line, and the
 * `priority` shown three ways — a leading glyph, a token color, and a labelled
 * `Badge` — so it never rides on color alone: `must` (★, danger), `nice`
 * (☆, primary), `optional` (○, muted). The whole row is a `checkbox` when
 * `onToggle` is provided; its captured state is announced via the accessibility
 * `checked` state and a ✓ glyph. Identical props/behavior to
 * {@link ShotListItemProps}. Token-only colors via `useXenitionTheme()`.
 */
function ShotListItemV4({ title, notes, done = false, priority, onToggle, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = priority ? PRIORITY[priority] : null;
    const priorityColor = meta
        ? meta.color === 'danger'
            ? colors.onSurface
            : meta.color === 'primary'
                ? colors.primary
                : colors.muted
        : colors.muted;
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            minHeight: 44,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
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
                            fontWeight: '700',
                            textDecorationLine: done ? 'line-through' : 'none',
                        }, children: title }), notes ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: notes })) : null] }), meta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: priorityColor, fontSize: tokens.typography.scale.sm }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] })) : null] }));
    if (onToggle) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: title, onPress: onToggle, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: rowStyle, children: inner });
}
//# sourceMappingURL=ShotListItemV4.js.map