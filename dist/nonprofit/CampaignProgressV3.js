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
exports.CampaignProgressV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const FILL = { primary: 'bg-primary', success: 'bg-success', accent: 'bg-accent' };
/**
 * CampaignProgress, redesigned (v3): a **minimal inline meter**. One thin bar with
 * a single caption line — "raised / goal · N%" — no headline, no ticks. For
 * embedding under a list item. The opposite of v2's stat hero. Same props,
 * token-only.
 */
exports.CampaignProgressV3 = React.forwardRef(function CampaignProgressV3({ raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant, tone = 'primary', hideAmounts = false, className, ...rest }, ref) {
    void variant;
    const pct = Math.round((0, internal_1.goalPct)(raisedCents, goalCents));
    const meta = [
        typeof donorCount === 'number' ? `${donorCount} donors` : null,
        typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-neutral-100", role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100, children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', FILL[tone]), style: { width: `${pct}%` } }) }), !hideAmounts ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold text-on-surface", children: (0, internal_1.formatMoney)(raisedCents, currency) }), " / ", (0, internal_1.formatMoney)(goalCents, currency), " \u00B7 ", pct, "%", meta.length > 0 ? ` · ${meta.join(' · ')}` : ''] })) : null] }));
});
//# sourceMappingURL=CampaignProgressV3.js.map