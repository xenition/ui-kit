"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoreCardV2 = ChoreCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
    'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
    done: { glyph: '✅', label: 'Done', tone: 'success' },
    skipped: { glyph: '⏭️', label: 'Skipped', tone: 'warn' },
};
/**
 * ChoreCard, redesigned (v2): a **big tappable quest card**. A large rounded
 * icon tile leads, the title is set large, and the reward points sit in a
 * prominent star badge up top. A full-width "Mark done" CTA anchors the card so
 * the primary action is unmissable. Lifted with a shadow and a press-scale
 * spring. Distinct from v1's compact row + small inline button. Same props.
 */
function ChoreCardV2({ title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, onComplete, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status] ?? STATUS_META.todo;
    const isDone = status === 'done';
    const press = (0, motion_1.usePressScale)();
    const container = [
        {
            backgroundColor: colors.surface,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
            ...(0, elevation_1.shadow)('md', tokens),
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading chore", style: container, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 52, height: 52, borderRadius: tokens.radius.md, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }) }));
    }
    const subParts = [assignee, due].filter(Boolean);
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [container, { transform: [{ scale: press.scale }] }], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 52,
                            height: 52,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: icon }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.lg,
                                    fontWeight: '800',
                                    textDecorationLine: isDone ? 'line-through' : 'none',
                                }, children: title }), subParts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subParts.join(' · ') })) : null] }), typeof points === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "solid", size: "md", children: `⭐ ${points}` })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }) }), !isDone && onComplete ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", tone: "success", onPress: onComplete, style: { alignSelf: 'stretch' }, children: "Mark done" })) : null] }));
    const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${meta.label}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=ChoreCardV2.js.map