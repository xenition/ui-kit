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
exports.MindfulnessStreakV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * MindfulnessStreak, redesigned (v2): a **big streak medallion**. A large flame +
 * count lead in a tone-tinted panel, the best streak is a secondary stat, and the
 * last-7-days render as filled/empty dots. Bolder than v1. Same props, token-only.
 */
exports.MindfulnessStreakV2 = React.forwardRef(function MindfulnessStreakV2({ count, best, week, tone = 'primary', unit = 'day', emptyLabel = 'Start your streak', className }, ref) {
    const slot = tone;
    const last7 = (week ?? []).slice(-7);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-mindfulness-streak": "", className: (0, cn_1.cn)('flex flex-col items-center gap-3 rounded-lg p-md text-center', _tokens_1.SLOT_TINT[slot], className), children: [count > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-4xl", "aria-hidden": true, children: "\uD83D\uDD25" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-5xl font-bold', _tokens_1.SLOT_TEXT[slot]), children: count })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-medium text-on-surface", children: [unit, count === 1 ? '' : 's', " in a row", typeof best === 'number' ? ` · best ${best}` : ''] })] })) : ((0, jsx_runtime_1.jsx)("p", { className: "py-4 text-sm text-muted", children: emptyLabel })), last7.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-1.5", children: last7.map((done, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-4 w-4 rounded-full', done ? _tokens_1.SLOT_BG[slot] : 'bg-neutral-200'), "aria-hidden": true }, i))) })) : null] }));
});
//# sourceMappingURL=MindfulnessStreakV2.js.map