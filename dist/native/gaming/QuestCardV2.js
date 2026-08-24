"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestCardV2 = QuestCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const types_1 = require("./types");
const STATE_LABEL = {
    locked: 'Locked',
    active: 'In progress',
    completed: 'Ready to claim',
    claimed: 'Claimed',
};
const STATE_GLYPH = {
    locked: '🔒',
    active: '⚔️',
    completed: '✨',
    claimed: '✅',
};
/**
 * QuestCard — design variant **V2**: an **elevated card led by a big progress
 * bar**, with a prominent reward badge and a full-width Claim CTA. Where V1 is a
 * bordered card with a header row and a small `sm` bar, V2 headlines the medium
 * progress bar + percentage under the title, floats the reward as a soft badge,
 * and stretches the claim button across the footer. Status is a glyph + labeled
 * badge (never color alone); state derives from `progress/goal` when omitted and
 * the CTA only enables when `completed`. Same props as {@link QuestCardProps}.
 * Token-only.
 */
function QuestCardV2({ quest, state, claiming = false, onClaim, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const goal = Math.max(1, quest.goal);
    const progress = (0, types_1.clamp)(quest.progress, 0, goal);
    const derived = state ?? (progress >= goal ? 'completed' : 'active');
    const locked = derived === 'locked';
    const claimed = derived === 'claimed';
    const claimable = derived === 'completed';
    const pct = Math.round((progress / goal) * 100);
    const tone = claimed ? 'success' : claimable ? 'warn' : locked ? 'neutral' : 'primary';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { disabled: locked }, style: [
                {
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                    opacity: locked ? 0.6 : 1,
                    ...(0, elevation_1.shadow)('md', tokens),
                },
                style,
            ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 40,
                                height: 40,
                                borderRadius: tokens.radius.md,
                                backgroundColor: (0, types_1.withAlpha)(colors.primary, 0.1),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: STATE_GLYPH[derived], size: "lg", color: locked ? 'muted' : 'onSurface' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: quest.title }), quest.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: quest.description })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, variant: "soft", size: "sm", children: STATE_LABEL[derived] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress, max: goal, tone: claimable || claimed ? 'success' : 'primary', size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${progress} / ${goal}` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${pct}%` })] })] }), quest.reward ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "warn", variant: "soft", size: "md", children: `🏅 ${quest.reward}` }) })) : null, onClaim ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: claimable ? 'primary' : 'secondary', size: "md", tone: "success", loading: claiming, disabled: !claimable, onPress: () => onClaim(quest), accessibilityLabel: claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`, style: { alignSelf: 'stretch' }, children: claimed ? 'Claimed' : 'Claim reward' })) : null] }) }));
}
//# sourceMappingURL=QuestCardV2.js.map