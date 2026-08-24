"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestoneCard = MilestoneCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const CATEGORY_META = {
    physical: { glyph: '🏃', label: 'Physical' },
    cognitive: { glyph: '🧠', label: 'Cognitive' },
    social: { glyph: '🤝', label: 'Social' },
    language: { glyph: '💬', label: 'Language' },
    emotional: { glyph: '❤️', label: 'Emotional' },
    other: { glyph: '🌟', label: 'Milestone' },
};
/**
 * A developmental milestone: a category icon, title, date/age band, an optional
 * note, and an achieved/upcoming chip. State is conveyed by glyph + text + a11y
 * label (never color alone). Renders a muted skeleton while `loading`.
 * Token-only colors.
 */
function MilestoneCard({ title, category = 'other', date, ageLabel, description, achieved = false, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = CATEGORY_META[category] ?? CATEGORY_META.other;
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.sm,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading milestone", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    const subParts = [ageLabel, date].filter(Boolean);
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [meta.label, ...subParts].join(' · ') })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: achieved ? 'success' : 'neutral', variant: "soft", size: "sm", children: achieved ? '✓ Achieved' : '◦ Upcoming' })] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] }));
    const a11y = `${title}, ${meta.label}, ${achieved ? 'achieved' : 'upcoming'}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=MilestoneCard.js.map