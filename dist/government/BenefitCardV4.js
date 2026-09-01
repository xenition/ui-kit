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
exports.BenefitCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const format_1 = require("./internal/format");
const civic_v4_1 = require("./internal/civic-v4");
const TYPE_V4 = {
    food: { label: 'Food assistance', glyph: '🥫' },
    unemployment: { label: 'Unemployment', glyph: '💼' },
    housing: { label: 'Housing', glyph: '🏘️' },
    medical: { label: 'Medical', glyph: '⚕️' },
    disability: { label: 'Disability', glyph: '♿' },
    family: { label: 'Family support', glyph: '👪' },
    other: { label: 'Benefit', glyph: '🤝' },
};
const STATUS_V4 = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    expiring: { label: 'Expiring soon', glyph: '⚠️', tone: 'warn' },
    expired: { label: 'Expired', glyph: '✕', tone: 'neutral' },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
    suspended: { label: 'Suspended', glyph: '!', tone: 'danger' },
};
/**
 * **V4 benefit card** — the web twin of the native `BenefitCardV4`, same props
 * as {@link BenefitCard} plus `reason`, `typeLabels`, `statusLabels` and
 * `nextLabel`.
 *
 * ## Five changes
 *
 * 1. **A suspension says why, and announces.** The status that stops someone's
 *    food assistance was a pill and nothing else — the interface had no field
 *    for the reason at all. `reason` renders under the header whenever
 *    {@link isAdverse} is true, and reaches a polite live region one commit
 *    after mount, because a live region announces *changes* and text present at
 *    first paint is read by nobody.
 * 2. **The card's name carries the money and the dates.** The fixed
 *    `` `${name}, ${type}, ${status}` `` template dropped the amount, the
 *    cadence, the next payment date and the case number — everything a
 *    claimant opens the card for — and `role="button"` made the subtree
 *    presentational, so none of it was reachable another way.
 * 3. **The case number is labelled and on its own line**, instead of glued to
 *    the programme type with a bare `·` so a reader hears "Housing dot
 *    SNP-4471".
 * 4. **The amount is ink, not a fill.** `text-primary` is the *fill* slot with
 *    no contrast promise as words; the headline figure takes `primary-text`.
 *    The programme disc likewise stops being `bg-primary-50` — a ramp step that
 *    mirrors under `[data-theme="dark"]` — and takes the neutral identity tint,
 *    because a benefit type is identity and has no status to report.
 * 5. **An interactive card is a real `<button>` that clears 44 and answers with
 *    a state layer**, not a `div` with `role="button"`, a hand-written
 *    Enter/Space handler, `hover:opacity-90` (M3's *disabled* signal) and a
 *    `primary-300` focus ring off the neutral ramp.
 */
exports.BenefitCardV4 = React.forwardRef(function BenefitCardV4({ name, benefitType, status = 'active', amountCents, cadence = '/mo', caseNumber, nextDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, reason, typeLabels, statusLabels, nextLabel = 'Next', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!name)
        return null;
    const bt = TYPE_V4[benefitType] ?? TYPE_V4.other;
    const typeWord = typeLabels?.[benefitType] ?? bt.label;
    const sd = STATUS_V4[status] ?? STATUS_V4.active;
    const word = statusLabels?.[status] ?? sd.label;
    const reference = (0, civic_v4_1.labelledId)('Case', caseNumber);
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const why = adverse ? reason : undefined;
    const amount = amountCents != null
        ? `${format(Math.max(0, Math.trunc(amountCents)), currency)}${cadence}`
        : undefined;
    const next = nextDate != null ? `${nextLabel}: ${nextDate}` : undefined;
    const announcement = (0, civic_v4_1.spokenLine)([name, word, why]);
    const [announced, setAnnounced] = React.useState('');
    React.useEffect(() => {
        setAnnounced(adverse ? announcement : '');
    }, [adverse, announcement]);
    const header = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]", style: { background: (0, civic_v4_1.tintGround)(civic_v4_1.IDENTITY_TONE) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: bt.glyph, size: "xl", className: (0, civic_v4_1.tintInkClass)(civic_v4_1.IDENTITY_TONE) }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: typeWord }), reference != null ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: reference })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${word}` })] }));
    const headerClass = 'flex w-full items-center gap-md text-left';
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: civic_v4_1.CARD_V4, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { role: "status", "aria-live": "polite", className: "sr-only", children: announced }), onClick != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, civic_v4_1.spokenLine)([name, typeWord, word, reference, amount, next, why]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)(headerClass, chrome_v4_1.MIN_TAP_CLASS, 'rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: header })) : ((0, jsx_runtime_1.jsx)("div", { className: headerClass, children: header })), why != null ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('mt-sm text-sm font-medium', (0, civic_v4_1.tintInkClass)(sd.tone)), children: why })) : null, amountCents != null || nextDate != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex items-end justify-between border-t border-border pt-md", children: [amountCents != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-primary-text", children: format(Math.max(0, Math.trunc(amountCents)), currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: cadence })] })) : ((0, jsx_runtime_1.jsx)("span", {})), next != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: next }) : null] })) : null] }));
});
//# sourceMappingURL=BenefitCardV4.js.map