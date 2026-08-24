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
exports.RenewalBanner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const Spinner_1 = require("../primitives/Spinner");
const format_1 = require("./internal/format");
const URGENCY = {
    upcoming: { glyph: '🗓️', heading: 'Renewal coming up', container: 'border-primary bg-primary-50', button: 'primary' },
    due: { glyph: '⏰', heading: 'Renewal due', container: 'border-warn bg-warn/10', button: 'primary' },
    overdue: { glyph: '⚠️', heading: 'Renewal overdue', container: 'border-danger bg-danger/10', button: 'danger' },
};
/**
 * A call-to-action banner prompting a policy renewal. Urgency is conveyed by
 * **glyph + heading + a tint that traces to a semantic token slot** (upcoming →
 * primary, overdue → danger) — never color alone. The optional renewal premium
 * is integer cents via `formatMoney`. The renew `Button` (a real `<button>`) is
 * only rendered when `onRenew` is supplied. Token-bound throughout. Web parity
 * of the native `RenewalBanner` (`loading` shows an inline `Spinner`, since the
 * web `Button` has no `loading` prop).
 */
exports.RenewalBanner = React.forwardRef(function RenewalBanner({ renewalDate, urgency = 'due', premiumCents, currency = 'USD', formatMoney: format = format_1.formatMoney, renewLabel = 'Renew now', loading = false, onRenew, className, ...rest }, ref) {
    const ud = URGENCY[urgency] ?? URGENCY.due;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${ud.heading}, ${renewalDate}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-lg)]', ud.container, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: ud.glyph, size: "xl", "aria-label": ud.heading }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: ud.heading }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted", children: ["Your policy renews on ", renewalDate, premiumCents != null ? ` · ${format(Math.max(0, Math.trunc(premiumCents)), currency)}` : ''] })] })] }), onRenew != null ? ((0, jsx_runtime_1.jsxs)(Button_1.Button, { variant: ud.button, onClick: onRenew, disabled: loading, "aria-busy": loading || undefined, children: [loading ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", className: "mr-2" }) : null, renewLabel] })) : null] }));
});
//# sourceMappingURL=RenewalBanner.js.map