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
exports.RenewalBannerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const SpinnerV4_1 = require("../primitives/SpinnerV4");
const format_1 = require("./internal/format");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 renewal banner** — same props as {@link RenewalBanner} plus
 * `amountDueCents` and `graceDate`.
 *
 * ## Five changes
 *
 * 1. **An overdue renewal announces itself.** The banner had no live region at
 *    all, so a policy that had lapsed into its grace period appeared silently:
 *    a screen-reader user who had just submitted a payment, or landed on the
 *    page from a link, was told nothing. Overdue is the one genuinely urgent
 *    state in this module — cover is ending — so it, and only it, is an
 *    `alert`. Upcoming and due stay quiet, because announcing everything
 *    teaches a user to ignore everything.
 * 2. **The label sat on a roleless `<div>`.** ARIA forbids naming a generic
 *    element and browsers drop the label, so `aria-label="Renewal overdue, 12
 *    Aug"` was never spoken by anything — while also being the only place the
 *    date was joined to the heading.
 * 3. **The heading is a heading.** It was a `<p>` in bold, so the banner was
 *    invisible to a reader navigating a policy page by heading.
 * 4. **It can say what is owed, and by when.** See `amountDueCents` and
 *    `graceDate`.
 * 5. **The tint follows the theme.** `bg-primary-50` and `border-primary` over
 *    `bg-warn/10` were three different recipes; the ground is now the tone
 *    mixed 10% into the card, which is what the native twin mixes, and the
 *    Renew button clears 44.
 */
exports.RenewalBannerV4 = React.forwardRef(function RenewalBannerV4({ renewalDate, urgency = 'due', premiumCents, amountDueCents, graceDate, amountDueLabel = 'Amount due', graceLabel = 'Grace period ends', formatRenewal, currency = 'USD', formatMoney: format = format_1.formatMoney, renewLabel = 'Renew now', loading = false, onRenew, className, ...rest }, ref) {
    const ud = tone_v4_1.RENEWAL_URGENCY_META_V4[urgency] ?? tone_v4_1.RENEWAL_URGENCY_META_V4.due;
    const overdue = urgency === 'overdue';
    const due = (0, tone_v4_1.moneyParts)(amountDueCents, currency, format);
    const premium = (0, tone_v4_1.moneyParts)(premiumCents, currency, format);
    const amount = due ?? premium;
    const dateLine = (formatRenewal ?? ((date) => `Your policy renews on ${date}`))(renewalDate);
    const graceLine = graceDate != null ? `${graceLabel} ${graceDate}` : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, 
        // Only the state that has actually gone wrong interrupts. No
        // `aria-label` here: a roleless <div> is `generic`, ARIA forbids naming
        // one, and that is exactly how the base lost its own label.
        role: overdue ? 'alert' : undefined, className: (0, cn_1.cn)('flex flex-col gap-md rounded-[var(--xen-radius-lg)] border p-lg', overdue ? 'border-danger' : 'border-border', className), style: (0, tone_v4_1.toneGroundStyle)(ud.tone), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-xl', (0, tone_v4_1.toneInkClass)(ud.tone)), children: ud.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-base font-bold text-on-card", children: ud.label }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: (0, tone_v4_1.spokenLine)([dateLine, graceLine]) }), amount != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-xs flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: amountDueLabel }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: amount.text })] })) : null] })] }), onRenew != null ? ((0, jsx_runtime_1.jsxs)(ButtonV4_1.ButtonV4, { variant: overdue ? 'danger' : 'primary', onClick: onRenew, disabled: loading, "aria-busy": loading || undefined, className: tone_v4_1.MIN_TAP_CLASS, children: [loading ? (0, jsx_runtime_1.jsx)(SpinnerV4_1.SpinnerV4, { size: "sm", className: "mr-xs" }) : null, renewLabel] })) : null] }));
});
//# sourceMappingURL=RenewalBannerV4.js.map