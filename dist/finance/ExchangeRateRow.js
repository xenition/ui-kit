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
exports.ExchangeRateRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const pressable_1 = require("./internal/pressable");
/**
 * A currency-pair quote row: `BASE → QUOTE`, the rate at fixed precision, and an
 * optional signed change chip (up = `text-success`, down = `text-danger`). The
 * rate is a display-only number formatted to `precision` decimals via `toFixed`,
 * so the shown value never drifts. Colors trace to tokens; becomes a button when
 * `onClick` is given. Web parity of the native `ExchangeRateRow`.
 */
exports.ExchangeRateRow = React.forwardRef(function ExchangeRateRow({ baseCurrency, quoteCurrency, rate, changePct, precision = 4, onClick, className, ...rest }, ref) {
    const safeRate = Number.isFinite(rate) ? rate : 0;
    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const up = (changePct ?? 0) >= 0;
    const changeClass = up ? 'text-success' : 'text-danger';
    const fixed = safeRate.toFixed(Math.max(0, Math.trunc(precision)));
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${baseCurrency} to ${quoteCurrency}, ${fixed}` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: [baseCurrency, " ", (0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: "\u2192" }), " ", quoteCurrency] }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold tabular-nums text-on-surface", children: fixed }), hasChange ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', changeClass), children: [up ? '▲' : '▼', " ", up ? '+' : '', changePct.toFixed(2), "%"] })) : null] }));
});
//# sourceMappingURL=ExchangeRateRow.js.map