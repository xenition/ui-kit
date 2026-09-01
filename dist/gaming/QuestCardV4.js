"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const arcade_v4_1 = require("./internal/arcade-v4");
const STATE_LABEL = {
    locked: 'Locked',
    active: 'In progress',
    completed: 'Ready to claim',
    claimed: 'Claimed',
};
/**
 * `warn` is freed, and the two states that mean something keep a colour.
 *
 * The base ran `neutral` / `primary` / `warn` / `success`, which spent the
 * **warning** colour on "Ready to claim" — the most inviting state a quest
 * has — and the brand on merely being in progress. `locked` and `active` are
 * lifecycle facts with no health in them and take a neutral chip carrying
 * their word; `completed` is the state with an action waiting behind it, so it
 * takes the brand; `claimed` is the affirmative end state and takes `success`.
 */
const STATE_TONE = {
    locked: arcade_v4_1.IDENTITY_TONE,
    active: arcade_v4_1.IDENTITY_TONE,
    completed: 'primary',
    claimed: 'success',
};
/**
 * **V4 quest card** — same props as {@link QuestCard} plus `stateLabels` and
 * `rewardLabel`.
 *
 * ## Four changes
 *
 * 1. **A locked quest is locked in words, not in dimming.** The base drew it
 *    at `opacity-60`, which sits inside M3's *disabled* band (0.38) and is
 *    therefore how the whole kit says "this control will not respond" — so a
 *    locked quest and a broken one looked alike, and neither the padlock nor
 *    the badge could be trusted to be the reason. The card draws at full
 *    strength; the padlock and the `Locked` chip carry the state, and the only
 *    thing actually disabled is the claim button, which really is.
 * 2. **The bar and the caption cannot disagree.** `questParts()` clamps once
 *    for both, and floors the goal at 1 — the V2 and V3 lines handed
 *    `quest.goal` straight to `aria-valuemax` while drawing a separately
 *    clamped percentage, so out-of-range input announced one number and drew
 *    another, and `goal: 0` produced an invalid range.
 * 3. **The reward medal stops being announced as decoration, and the card has
 *    one name.** `<Icon glyph="🏅" aria-label="Reward" />` made the medal its
 *    own focus stop that said "Reward" and nothing else, while the reward
 *    itself sat in unlabelled text beside it. The glyph is hidden and the
 *    reward joins the card's `group` name behind `rewardLabel`.
 * 4. **The status words are `stateLabels`**, where four English strings used
 *    to be compiled into the component, and the progress readout is tabular so
 *    it stops reflowing as a quest ticks up.
 */
exports.QuestCardV4 = React.forwardRef(function QuestCardV4({ quest, state, claiming = false, onClaim, stateLabels, rewardLabel = 'Reward', className }, ref) {
    if (!quest?.title)
        return null;
    const parts = (0, arcade_v4_1.questParts)(quest.progress, quest.goal);
    const derived = state ?? (parts.complete ? 'completed' : 'active');
    const locked = derived === 'locked';
    const claimed = derived === 'claimed';
    const claimable = derived === 'completed';
    const stateWord = stateLabels?.[derived] ?? STATE_LABEL[derived];
    const progressText = `${parts.value} / ${parts.goal}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, arcade_v4_1.spokenLine)([
            quest.title,
            stateWord,
            quest.description,
            progressText,
            quest.reward ? `${rewardLabel} ${quest.reward}` : undefined,
        ]), className: (0, cn_1.cn)('flex flex-col gap-sm rounded-[var(--xen-radius-lg)] border border-border', 'bg-card p-lg text-on-card', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: locked ? '🔒' : '⚔️', size: "lg", color: locked ? 'muted' : 'onSurface' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 font-heading text-base font-bold text-on-card", children: quest.title }), quest.description ? ((0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted-text", children: quest.description })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: STATE_TONE[derived], children: stateWord })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: parts.value, max: parts.goal, tone: claimed ? 'success' : 'primary', size: "sm", "aria-label": (0, arcade_v4_1.spokenLine)([quest.title, progressText]) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', arcade_v4_1.TABULAR_CLASS), children: progressText })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [quest.reward ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: "\uD83C\uDFC5" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-card", children: quest.reward })] })) : ((0, jsx_runtime_1.jsx)("span", {})), onClaim ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: claimable ? 'primary' : 'secondary', size: "sm", disabled: !claimable || claiming, "aria-busy": claiming || undefined, onClick: () => onClaim(quest), "aria-label": claimed ? `Reward claimed for ${quest.title}` : `Claim reward for ${quest.title}`, children: claimed ? (stateLabels?.claimed ?? STATE_LABEL.claimed) : 'Claim' })) : null] })] }));
});
//# sourceMappingURL=QuestCardV4.js.map