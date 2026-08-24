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
exports.AutoPayRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * An AutoPay enrollment row: a leading glyph, a title with an on/off status
 * conveyed by **a badge + label** (never the switch color alone), the token-bound
 * `Switch`, and — when enabled — a funding method / next-charge summary. Any
 * amount is integer cents via `formatMoney`. The switch is fully controlled
 * (`enabled` + `onToggle`) and honors `disabled`. Every color traces to a
 * `--xen-*` token. Web parity of the native `AutoPayRow`.
 */
exports.AutoPayRow = React.forwardRef(function AutoPayRow({ label = 'AutoPay', enabled, onToggle, method, nextChargeDate, amountCents, currency = 'USD', formatMoney: format = format_1.formatMoney, disabled = false, className, ...rest }, ref) {
    const summary = [];
    if (enabled) {
        if (method != null)
            summary.push(method);
        if (nextChargeDate != null)
            summary.push(`Next ${nextChargeDate}`);
        if (amountCents != null)
            summary.push(`up to ${format(Math.max(0, Math.trunc(amountCents)), currency)}`);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD04", size: "lg", "aria-label": "AutoPay" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: enabled ? 'success' : 'neutral', variant: "soft", size: "sm", children: enabled ? '✓ On' : '○ Off' })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: enabled
                            ? summary.length > 0
                                ? summary.join(' · ')
                                : 'Bills are paid automatically'
                            : 'Turn on to pay automatically each cycle' })] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, onCheckedChange: onToggle, disabled: disabled, "aria-label": `${label}, ${enabled ? 'on' : 'off'}` })] }));
});
//# sourceMappingURL=AutoPayRow.js.map