"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestCardV3 = QuestCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const types_1 = require("./types");
const STATE_LABEL = {
    locked: 'Locked',
    active: 'In progress',
    completed: 'Ready to claim',
    claimed: 'Claimed',
};
const STATE_TONE = {
    locked: 'neutral',
    active: 'primary',
    completed: 'warn',
    claimed: 'success',
};
/**
 * QuestCard — design variant **V3**: a **minimal single line with a status
 * dot**. A small tone dot plus its written status precede the title; the step
 * fraction and reward sit inline, and (when completed) a compact "Claim" text
 * button trails at the end. Where V1/V2 are cards with a progress bar, V3 is a
 * dense checklist row. The dot is always paired with a text label so state is
 * never signalled by color alone; state derives from `progress/goal` when
 * omitted and Claim only fires when `completed`. Same props as
 * {@link QuestCardProps}. Token-only, minimal.
 */
function QuestCardV3({ quest, state, claiming = false, onClaim, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const goal = Math.max(1, quest.goal);
    const progress = (0, types_1.clamp)(quest.progress, 0, goal);
    const derived = state ?? (progress >= goal ? 'completed' : 'active');
    const locked = derived === 'locked';
    const claimed = derived === 'claimed';
    const claimable = derived === 'completed';
    // Dot color traces to a semantic token via the tone map; cast to index colors.
    const toneKey = STATE_TONE[derived];
    const palette = colors;
    const dotColor = palette[toneKey === 'neutral' ? 'muted' : toneKey] ?? colors.muted;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityState: { disabled: locked }, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.sm,
                    borderBottomWidth: 1,
                    borderColor: colors.border,
                    opacity: locked ? 0.6 : 1,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: STATE_LABEL[derived], style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: dotColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: quest.title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${STATE_LABEL[derived]} · ${progress}/${goal}${quest.reward ? ` · 🏅 ${quest.reward}` : ''}` })] }), onClaim ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`, accessibilityState: { disabled: !claimable || claiming }, disabled: !claimable || claiming, onPress: () => onClaim(quest), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: claimable ? colors.primary : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '700',
                        }, children: claimed ? 'Claimed' : 'Claim' }) })) : null] }) }));
}
//# sourceMappingURL=QuestCardV3.js.map