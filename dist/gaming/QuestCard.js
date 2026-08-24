"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestCard = QuestCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Progress_1 = require("../primitives/Progress");
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
 * A quest / mission card — title, objective, a step progress bar, a reward chip,
 * and a state-aware Claim button. The status is shown as a labeled badge (not
 * color alone); the claim button only enables when `completed`. State is derived
 * from `progress/goal` when not supplied. `onClaim(quest)` fires the intent.
 * Composes `Card`, `Progress`, `Button`, `Badge`, `Icon`. Token-only.
 */
function QuestCard({ quest, state, claiming = false, onClaim, className, }) {
    const goal = Math.max(1, quest.goal);
    const progress = (0, types_1.clamp)(quest.progress, 0, goal);
    const derived = state ?? (progress >= goal ? 'completed' : 'active');
    const locked = derived === 'locked';
    const claimed = derived === 'claimed';
    const claimable = derived === 'completed';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', locked && 'opacity-60', className), "aria-disabled": locked || undefined, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: locked ? '🔒' : '⚔️', size: "lg", color: locked ? 'muted' : 'onSurface' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-base font-bold text-on-surface", children: quest.title }), quest.description ? ((0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: quest.description })) : null] }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: STATE_TONE[derived], children: STATE_LABEL[derived] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)(Progress_1.Progress, { value: progress, max: goal, tone: claimable || claimed ? 'success' : 'primary', size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${progress} / ${goal}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [quest.reward ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDFC5", size: "sm", color: "warn", "aria-label": "Reward" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: quest.reward })] })) : ((0, jsx_runtime_1.jsx)("div", {})), onClaim ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: claimable ? 'primary' : 'secondary', size: "sm", disabled: !claimable || claiming, "aria-busy": claiming || undefined, onClick: () => onClaim(quest), "aria-label": claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`, children: claimed ? 'Claimed' : 'Claim' })) : null] })] }));
}
//# sourceMappingURL=QuestCard.js.map