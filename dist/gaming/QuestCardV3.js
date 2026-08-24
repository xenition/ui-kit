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
exports.QuestCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
/**
 * QuestCard, redesigned (v3): a **dense quest line**. The title over a thin
 * progress bar with `progress/goal`, the reward folded in, and a compact Claim on
 * the right — hairline-bordered for a quest log. The opposite of v2's banner. Same
 * props, token-only.
 */
exports.QuestCardV3 = React.forwardRef(function QuestCardV3({ quest, state, claiming = false, onClaim, className }, ref) {
    const derived = state ?? (quest.progress >= quest.goal ? 'completed' : 'active');
    const locked = derived === 'locked';
    const claimed = derived === 'claimed';
    const claimable = derived === 'completed';
    const pct = quest.goal > 0 ? Math.min(100, Math.round((quest.progress / quest.goal) * 100)) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-quest-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', locked && 'opacity-60', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: locked ? '🔒' : '⚔️' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [quest.title, quest.reward ? (0, jsx_runtime_1.jsxs)("span", { className: "ml-1.5 text-xs font-normal text-warn", children: ["\uD83C\uDFC6 ", quest.reward] }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1 flex-1 overflow-hidden rounded-full bg-neutral-100", role: "progressbar", "aria-valuenow": quest.progress, "aria-valuemin": 0, "aria-valuemax": quest.goal, children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary", style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "text-[10px] tabular-nums text-muted", children: [quest.progress, "/", quest.goal] })] })] }), onClaim && (claimable || claimed) ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", disabled: claimed || claiming, onClick: () => onClaim(quest), children: claimed ? 'Claimed' : 'Claim' })) : null] }));
});
//# sourceMappingURL=QuestCardV3.js.map