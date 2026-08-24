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
exports.CampaignProgress = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const FILL = {
    primary: 'bg-primary',
    success: 'bg-success',
    accent: 'bg-accent',
};
const PCT_TEXT = {
    primary: 'text-primary',
    success: 'text-success',
    accent: 'text-accent',
};
/**
 * Web parity of the native `CampaignProgress`: a goal-progress meter for a
 * campaign — a horizontal `bar` or a vertical `thermometer`. The fill is sized
 * to `raised/goal` with the divide-by-zero guarded (`goalPct`) and clamped to
 * [0, 100]. Progress is announced through `role="progressbar"` AND printed as a
 * percentage + raised/goal amounts, so state never rests on color alone. Money
 * is integer cents formatted via `formatMoney`. All colors come from the
 * `--xen-*` token classes — no literal colors.
 */
exports.CampaignProgress = React.forwardRef(function CampaignProgress({ raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant = 'bar', tone = 'primary', hideAmounts = false, className, ...rest }, ref) {
    const pct = (0, internal_1.goalPct)(raisedCents, goalCents);
    const rounded = Math.round(pct);
    const pctLabel = `${rounded}%`;
    const meta = [
        typeof donorCount === 'number' ? `${donorCount} donors` : null,
        typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter(Boolean);
    const a11y = {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': rounded,
        'aria-label': `${pctLabel} of goal raised`,
    };
    if (variant === 'thermometer') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-end gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { ...a11y, className: "w-lg overflow-hidden rounded-full bg-border", style: { height: 140 }, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full rounded-full', FILL[tone]), style: { height: `${pct}%`, marginTop: `${100 - pct}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-on-surface", children: pctLabel }), !hideAmounts ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `${(0, internal_1.formatMoney)(raisedCents, currency)} of ${(0, internal_1.formatMoney)(goalCents, currency)}` })) : null, meta.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: meta.join(' · ') })) : null] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [!hideAmounts ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-on-surface", children: (0, internal_1.formatMoney)(raisedCents, currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `of ${(0, internal_1.formatMoney)(goalCents, currency)}` })] })) : null, (0, jsx_runtime_1.jsx)("div", { ...a11y, className: "h-3 w-full overflow-hidden rounded-full bg-border", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', FILL[tone]), style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', PCT_TEXT[tone]), children: pctLabel }), meta.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: meta.join(' · ') })) : null] })] }));
});
//# sourceMappingURL=CampaignProgress.js.map