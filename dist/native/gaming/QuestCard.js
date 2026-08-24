"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestCard = QuestCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const STATE_LABEL = {
    locked: 'Locked',
    active: 'In progress',
    completed: 'Ready to claim',
    claimed: 'Claimed',
};
/**
 * A quest / mission card — title, objective, a step progress bar, a reward
 * chip, and a state-aware Claim button. The status is shown as a labeled badge
 * (not color alone); the claim button only enables when `completed`. State is
 * derived from `progress/goal` when not supplied. `onClaim(quest)` fires the
 * intent. Composes `Card`, `Progress`, `Button`, `Badge`, `Icon`. Token-only.
 */
function QuestCard({ quest, state, claiming = false, onClaim, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const goal = Math.max(1, quest.goal);
    const progress = (0, types_1.clamp)(quest.progress, 0, goal);
    const derived = state ?? (progress >= goal ? 'completed' : 'active');
    const locked = derived === 'locked';
    const claimed = derived === 'claimed';
    const claimable = derived === 'completed';
    const tone = claimed ? 'success' : claimable ? 'warn' : locked ? 'neutral' : 'primary';
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { style: [{ gap: tokens.spacing.sm, opacity: locked ? 0.6 : 1 }, style], accessibilityState: { disabled: locked }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: locked ? '🔒' : '⚔️', size: "lg", color: locked ? 'muted' : 'onSurface' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: quest.title }), quest.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: quest.description })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: tone, variant: "soft", size: "sm", children: STATE_LABEL[derived] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress, max: goal, tone: claimable || claimed ? 'success' : 'primary', size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${progress} / ${goal}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [quest.reward ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFC5", size: "sm", color: "warn", accessibilityLabel: "Reward" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: quest.reward })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onClaim ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: claimable ? 'primary' : 'secondary', size: "sm", tone: "success", loading: claiming, disabled: !claimable, onPress: () => onClaim(quest), accessibilityLabel: claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`, children: claimed ? 'Claimed' : 'Claim' })) : null] })] }));
}
//# sourceMappingURL=QuestCard.js.map