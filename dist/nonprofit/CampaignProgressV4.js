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
exports.CampaignProgressV4 = void 0;
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
 * CampaignProgress — **V4** "rally" design (web parity of the native V4). The
 * warm, mission-driven take on a goal meter: a bold raised numeral, a thick
 * rounded track on a soft-primary well, and the percent + donor/days meta as
 * soft chips; when the goal is met it celebrates with a labelled success note
 * (never color alone). Honors both `variant`s (`bar` / `thermometer`) and every
 * `tone`, identical props/behavior to {@link CampaignProgressProps}. Progress is
 * announced via `role="progressbar"` and printed as a percentage + amounts. All
 * colors from `--xen-*` token classes (no literals).
 */
exports.CampaignProgressV4 = React.forwardRef(function CampaignProgressV4({ raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant = 'bar', tone = 'primary', hideAmounts = false, className, ...rest }, ref) {
    const pct = (0, internal_1.goalPct)(raisedCents, goalCents);
    const rounded = Math.round(pct);
    const pctLabel = `${rounded}%`;
    const met = pct >= 100;
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
    const metaChips = meta.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: meta.map((m) => ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center rounded-full bg-primary/10 px-sm py-0.5 text-xs font-semibold text-on-surface", children: m }, m))) })) : null;
    if (variant === 'thermometer') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-end gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { ...a11y, className: "w-lg overflow-hidden rounded-full bg-primary/15", style: { height: 140 }, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full rounded-full', FILL[tone]), style: { height: `${pct}%`, marginTop: `${100 - pct}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold text-on-surface", children: pctLabel }), !hideAmounts ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `${(0, internal_1.formatMoney)(raisedCents, currency)} of ${(0, internal_1.formatMoney)(goalCents, currency)}` })) : null, met ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-success", children: "\uD83C\uDF89 Goal reached" }) : null, metaChips] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [!hideAmounts ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-on-surface", children: (0, internal_1.formatMoney)(raisedCents, currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `of ${(0, internal_1.formatMoney)(goalCents, currency)}` })] })) : null, (0, jsx_runtime_1.jsx)("div", { ...a11y, className: "h-3.5 w-full overflow-hidden rounded-full bg-primary/15", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', FILL[tone]), style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', met ? 'text-success' : PCT_TEXT[tone]), children: met ? `🎉 ${pctLabel} — goal reached` : pctLabel }), metaChips] })] }));
});
//# sourceMappingURL=CampaignProgressV4.js.map