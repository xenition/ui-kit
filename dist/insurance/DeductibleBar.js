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
exports.DeductibleBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Progress_1 = require("../primitives/Progress");
const format_1 = require("./internal/format");
/**
 * Progress toward an annual deductible: a token `Progress` bar sized to
 * `met / deductible` with a "met of ceiling" caption and a remaining/"met"
 * line. The bar tone shifts as the deductible is satisfied — `warn` in
 * progress, `success` once fully met — both tracing to semantic token slots. A
 * `deductibleCents <= 0` ceiling is guarded (treated as fully met, no
 * divide-by-zero). Amounts are integer cents via `formatMoney`. Web parity of
 * the native `DeductibleBar`.
 */
exports.DeductibleBar = React.forwardRef(function DeductibleBar({ metCents, deductibleCents, label = 'Deductible', currency = 'USD', formatMoney: format = format_1.formatMoney, className, ...rest }, ref) {
    const met = Number.isFinite(metCents) ? Math.max(0, Math.trunc(metCents)) : 0;
    const ceiling = Number.isFinite(deductibleCents) ? Math.max(0, Math.trunc(deductibleCents)) : 0;
    const clampedMet = ceiling > 0 ? Math.min(met, ceiling) : met;
    const ratio = ceiling > 0 ? clampedMet / ceiling : 1;
    const fullyMet = ratio >= 1;
    const remaining = Math.max(0, ceiling - met);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [format(clampedMet, currency), " / ", format(ceiling, currency)] })] }), (0, jsx_runtime_1.jsx)(Progress_1.Progress, { value: ratio * 100, max: 100, tone: fullyMet ? 'success' : 'warn', "aria-label": `${label}, ${(0, format_1.formatPct)(ratio * 100)} met` }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', fullyMet ? 'text-success' : 'text-muted'), children: fullyMet ? 'Deductible met' : `${format(remaining, currency)} to go` })] }));
});
//# sourceMappingURL=DeductibleBar.js.map