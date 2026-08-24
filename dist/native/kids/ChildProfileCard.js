"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildProfileCard = ChildProfileCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const MOOD_META = {
    happy: { glyph: '😊', label: 'Happy' },
    excited: { glyph: '🤩', label: 'Excited' },
    calm: { glyph: '😌', label: 'Calm' },
    sad: { glyph: '😢', label: 'Sad' },
    tired: { glyph: '😴', label: 'Tired' },
    sick: { glyph: '🤒', label: 'Not well' },
};
/**
 * Header card for a single child: avatar/photo, name, an age·grade line, an
 * optional mood chip, and a wrapped strip of interest chips. Pressable when
 * `onPress` is set; renders a muted skeleton while `loading`. Every color
 * traces to a `SemanticColors` token — no literals.
 */
function ChildProfileCard({ name, photoUrl, age, grade, birthday, mood, interests, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading child profile", style: container, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 56, height: 56, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }) }));
    }
    const moodMeta = mood ? MOOD_META[mood] : undefined;
    const subParts = [age, grade].filter(Boolean);
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: name }), subParts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subParts.join(' · ') })) : null, birthday ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83C\uDF82 ", birthday] })) : null] }), moodMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: moodMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: moodMeta.label })] })) : null] }), interests && interests.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: interest }, `${interest}-${i}`))) })) : null] }));
    const a11y = `${name}${age ? `, ${age}` : ''}${grade ? `, ${grade}` : ''}${moodMeta ? `, mood ${moodMeta.label}` : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=ChildProfileCard.js.map