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
exports.CampaignProgressV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const FILL = { primary: 'bg-primary', success: 'bg-success', accent: 'bg-accent' };
const TEXT = { primary: 'text-primary', success: 'text-success', accent: 'text-accent' };
/**
 * CampaignProgress, redesigned (v2): a **stat-hero meter**. The percentage is the
 * headline (large, tone-colored), with raised-of-goal beneath, a thick rounded
 * bar with quarter ticks, and donor/days meta chips. Distinct from v1's inline
 * bar/thermometer. Same props, token-only.
 */
exports.CampaignProgressV2 = React.forwardRef(function CampaignProgressV2({ raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant, tone = 'primary', hideAmounts = false, className, ...rest }, ref) {
    void variant;
    const pct = Math.round((0, internal_1.goalPct)(raisedCents, goalCents));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-3xl font-bold', TEXT[tone]), children: [pct, "%"] }), !hideAmounts ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [(0, internal_1.formatMoney)(raisedCents, currency), " of ", (0, internal_1.formatMoney)(goalCents, currency)] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative h-3 w-full overflow-hidden rounded-full bg-neutral-100", role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', FILL[tone]), style: { width: `${pct}%` } }), [25, 50, 75].map((t) => ((0, jsx_runtime_1.jsx)("span", { className: "absolute top-0 h-full w-px bg-surface", style: { left: `${t}%` }, "aria-hidden": true }, t)))] }), (typeof donorCount === 'number' || typeof daysLeft === 'number') ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [typeof donorCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: [donorCount, " donors"] })) : null, typeof daysLeft === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: [daysLeft, " days left"] })) : null] })) : null] }));
});
//# sourceMappingURL=CampaignProgressV2.js.map