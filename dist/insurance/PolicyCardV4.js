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
exports.PolicyCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const coverage_v4_1 = require("./coverage-v4");
const tone_v4_1 = require("./internal/tone-v4");
const CADENCE_SUFFIX = {
    monthly: '/mo',
    quarterly: '/qtr',
    annual: '/yr',
};
/**
 * **V4 policy card** — same props as {@link PolicyCard} plus `statusReason`,
 * `statusDate` and `labels`.
 *
 * ## Six changes
 *
 * 1. **A cancelled policy can say why, and when.** The base carried `status`
 *    and nothing else, so "✕ Cancelled" sat above a live-looking $250,000
 *    coverage figure with no reason, no effective date and no next step. The
 *    holder could not tell a non-payment lapse from a mid-term cancellation,
 *    and the largest number on the card was one they were no longer entitled
 *    to. An adverse status now renders the caller's sentence and its date, and
 *    the coverage figure is captioned as no longer in force.
 * 2. **The card announces its own money.** `aria-label` sat on the element
 *    that also contained the coverage, the premium and the renewal date —
 *    ARIA replaces an element's contents with its name, so the card announced
 *    "Premier Auto, Auto policy, Active" and **no amount at all**. Coverage,
 *    premium and renewal are folded into the name, joined with commas.
 * 3. **`coverageCents={-1}` no longer prints "$0.00".** Every figure in the
 *    module was clamped with `Math.max(0, …)`, so a sentinel or a bad fetch
 *    was indistinguishable from a policy that genuinely covers nothing. A
 *    below-zero amount is printed as it is and captioned.
 * 4. **The card is not a `div` pretending to be a button.** `pressableProps`
 *    gave it `role="button"`, `tabIndex` and a hand-written Enter/Space
 *    handler — three approximations of a `<button>`, and the handler is the
 *    one that steals keydowns from anything nested inside it. The activation
 *    is a real `<button>` wrapping the identity and the figures; the status
 *    pill is its **sibling**.
 * 5. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*, so a
 *    hovered card and a dead one looked alike.
 * 6. **Every word is a prop and focus is `ring-ring`.** "Insured",
 *    "Coverage", "Premium" and "Renews" were hard-coded English, and the focus
 *    ring was `ring-primary-300` — a ramp step that ignores the seed and
 *    mirrors under `[data-theme="dark"]`.
 */
exports.PolicyCardV4 = React.forwardRef(function PolicyCardV4({ variant, name, policyNumber, coverageCents, premiumCents, cadence = 'monthly', status = 'active', holder, renewalDate, currency = 'USD', formatMoney: format = format_1.formatMoney, statusReason, statusDate, labels, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    if (!name)
        return null;
    const vd = (0, status_1.policyVariant)(variant);
    const sd = tone_v4_1.POLICY_STATUS_META_V4[status] ?? tone_v4_1.POLICY_STATUS_META_V4.active;
    const interactive = onClick != null;
    const adverse = (0, coverage_v4_1.isAdverse)(status);
    const insuredLabel = labels?.insured ?? 'Insured';
    const coverageLabel = labels?.coverage ?? 'Coverage';
    const premiumLabel = labels?.premium ?? 'Premium';
    const renewsLabel = labels?.renews ?? 'Renews';
    const coverage = (0, tone_v4_1.moneyParts)(coverageCents, currency, format);
    const premium = (0, tone_v4_1.moneyParts)(premiumCents, currency, format);
    const figures = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between border-t border-border pt-md", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: coverageLabel }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-bold text-on-card', tone_v4_1.TABULAR_CLASS), children: coverage?.text ?? '—' }), coverage?.negative ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-danger-text", children: tone_v4_1.NEGATIVE_AMOUNT_LABEL })) : null] }), premium ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: premiumLabel }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-primary-text', tone_v4_1.TABULAR_CLASS), children: premium.text }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-normal text-muted-text", children: CADENCE_SUFFIX[cadence] })] })] })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]', 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]', 'text-xl'), style: (0, tone_v4_1.toneGroundStyle)('primary'), children: vd.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-card", children: name }), (0, jsx_runtime_1.jsxs)("span", { className: "truncate text-sm text-muted-text", children: [vd.label, " \u00B7 ", policyNumber] })] })] }), holder != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted-text", children: [insuredLabel, ": ", holder] })) : null, figures, renewalDate != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted-text", children: [renewsLabel, " ", renewalDate] })) : null] }));
    // Everything the reader would otherwise lose: ARIA drops the children of a
    // named element, and the children here are the whole point of the card.
    const spoken = (0, tone_v4_1.spokenLine)([
        name,
        `${vd.label} policy`,
        policyNumber,
        sd.label,
        statusDate,
        statusReason,
        holder != null ? `${insuredLabel} ${holder}` : undefined,
        coverage ? `${coverageLabel} ${coverage.text}` : undefined,
        coverage?.negative ? tone_v4_1.NEGATIVE_AMOUNT_LABEL : undefined,
        premium ? `${premiumLabel} ${premium.text} ${CADENCE_SUFFIX[cadence]}` : undefined,
        renewalDate != null ? `${renewsLabel} ${renewalDate}` : undefined,
    ]);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-sm", children: [interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": spoken, onClick: onClick, "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col gap-sm rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 flex-col gap-sm", children: body })), (0, jsx_runtime_1.jsxs)("span", { "aria-hidden": interactive || undefined, className: (0, cn_1.cn)('inline-flex shrink-0 items-center gap-xs rounded-[var(--xen-radius-full)] px-sm py-xs text-xs font-semibold', (0, tone_v4_1.toneInkClass)(sd.tone)), style: (0, tone_v4_1.toneGroundStyle)(sd.tone), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), sd.label] })] }), adverse && (statusReason != null || statusDate != null) ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-danger-text", children: [statusDate, statusReason].filter((part) => part != null && part !== '').join(' · ') })) : null] }));
});
//# sourceMappingURL=PolicyCardV4.js.map