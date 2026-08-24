"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildProfileCardV2 = ChildProfileCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const MOOD_META = {
    happy: { glyph: '😊', label: 'Happy' },
    excited: { glyph: '🤩', label: 'Excited' },
    calm: { glyph: '😌', label: 'Calm' },
    sad: { glyph: '😢', label: 'Sad' },
    tired: { glyph: '😴', label: 'Tired' },
    sick: { glyph: '🤒', label: 'Not well' },
};
/**
 * ChildProfileCard, redesigned (v2): a **playful profile banner**. A soft
 * primary-tinted banner band tops the card; a large avatar overlaps it, centered
 * above a big name, a pill-shaped mood chip, and a centered wrap of interest
 * chips. Lifted with a shadow and a gentle mount-fade. Reads as a warm "hero"
 * card — clearly distinct from v1's flat left-aligned row. Same props.
 */
function ChildProfileCardV2({ name, photoUrl, age, grade, birthday, mood, interests, loading = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const container = [
        {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading child profile", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 56, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingBottom: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 72, height: 72, marginTop: -36, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '30%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }));
    }
    const moodMeta = mood ? MOOD_META[mood] : undefined;
    const subParts = [age, grade].filter(Boolean);
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [container, { opacity: enter.opacity, transform: enter.transform }], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 56, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: -36, borderRadius: tokens.radius.full, borderWidth: 3, borderColor: colors.surface }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: name }), subParts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subParts.join(' · ') })) : null, birthday ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83C\uDF82 ", birthday] })) : null, moodMeta ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", variant: "soft", size: "sm", children: `${moodMeta.glyph} ${moodMeta.label}` })) : null, interests && interests.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: interest }, `${interest}-${i}`))) })) : null] })] }));
    const a11y = `${name}${age ? `, ${age}` : ''}${grade ? `, ${grade}` : ''}${moodMeta ? `, mood ${moodMeta.label}` : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=ChildProfileCardV2.js.map