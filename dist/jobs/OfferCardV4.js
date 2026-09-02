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
exports.OfferCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const cn_1 = require("../primitives/cn");
const v4_state_1 = require("../primitives/internal/v4-state");
const format_1 = require("./format");
const SalaryRangeV4_1 = require("./SalaryRangeV4");
const tone_v4_1 = require("./internal/tone-v4");
/** Status → [word, tone]. All four are genuine statuses and keep status colour. */
const STATUS = {
    pending: ['Pending', 'primary'],
    accepted: ['Accepted', 'success'],
    declined: ['Declined', 'danger'],
    expired: ['Expired', 'danger'],
};
/**
 * **V4 offer card** — a new component, so it has no base to extend.
 *
 * ## Why it exists
 *
 * `ApplicationStage` ends at `'offer' | 'hired'` and nothing in the module
 * renders what sits between them. There are twelve components here for
 * finding, filtering, applying and tracking, and **none at all for the screen
 * that decides the outcome** — the pay, the start date, the deadline, and the
 * two buttons that end it either way. An app building a job-seeker product on
 * this kit reached the last step of its own funnel and had to leave.
 *
 * Four things it does that the rest of the module was not doing:
 *
 * 1. **The deadline is words, not an implication.** `respondBy` is captioned
 *    and folded into the card's accessible name, and while the offer is still
 *    pending it is drawn in `warn-text` — a genuine warning, because the offer
 *    lapses, not a category wearing a status colour.
 * 2. **Accept and Decline are siblings of the card's activation**, never
 *    inside it. That is the defect found in six components in this module and
 *    four more elsewhere in the kit: a `<button>` inside a `role="button"` is
 *    invalid ARIA, and its keyboard activation is cancelled by the ancestor's
 *    own Enter handler. A decision has to be reachable.
 * 3. **The card is one accessible name**, so the role, the employer, the pay,
 *    both dates and the status arrive as a sentence rather than as six stops —
 *    the failure that made every existing row in this module unusable with a
 *    screen reader.
 * 4. **The band is validated.** Pay goes through the same {@link SalaryRangeV4}
 *    as the rest of the module, so an offer whose bounds run backwards says so
 *    rather than printing "$120K – $90K/yr".
 */
exports.OfferCardV4 = React.forwardRef(function OfferCardV4({ offer, onClick, onAccept, onDecline, acceptLabel = 'Accept offer', declineLabel = 'Decline', startLabel = 'Starts', deadlineLabel = 'Respond by', statusLabels, formatDate, formatMoney, periodLabels, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    // An offer with no role and no employer is not an offer; a frame around
    // nothing is worse than nothing.
    if (!offer.jobTitle && !offer.companyName)
        return null;
    const status = offer.status ?? 'pending';
    const meta = STATUS[status];
    const statusWord = statusLabels?.[status] ?? meta[0];
    const date = (iso) => {
        if (!iso)
            return undefined;
        return (formatDate ? formatDate(iso) : (0, format_1.formatShortDate)(iso)) || undefined;
    };
    const start = date(offer.startsAt);
    const deadline = date(offer.respondBy);
    const pay = (0, tone_v4_1.salaryLabelV4)(offer.salary, { formatMoney, periodLabels }).text;
    const name = (0, tone_v4_1.spokenLine)([
        offer.jobTitle,
        offer.companyName,
        pay,
        start ? `${startLabel} ${start}` : undefined,
        deadline ? `${deadlineLabel} ${deadline}` : undefined,
        statusWord,
    ]);
    const summary = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: offer.companyLogoUrl, name: offer.companyName, size: "md", alt: "" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-base font-bold text-on-card", children: offer.jobTitle }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: offer.companyName })] })] }));
    const decidable = status === 'pending' && (onAccept != null || onDecline != null);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-offer-card": "", className: (0, cn_1.cn)('flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border', 'bg-card p-lg text-on-card', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-md", children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(offer), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-start gap-md rounded-[var(--xen-radius-md)] text-left', tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: summary })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-start gap-md", children: summary })), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta[1], className: "shrink-0", "aria-hidden": onClick != null || undefined, children: statusWord })] }), offer.salary ? ((0, jsx_runtime_1.jsx)(SalaryRangeV4_1.SalaryRangeV4, { salary: offer.salary, size: "md", formatMoney: formatMoney, periodLabels: periodLabels, "aria-hidden": onClick != null || undefined })) : null, start || deadline ? ((0, jsx_runtime_1.jsxs)("div", { "aria-hidden": onClick != null || undefined, className: "flex flex-wrap items-center gap-md text-sm", children: [start ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-on-card", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted-text", children: `${startLabel} ` }), (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: start })] })) : null, deadline ? ((0, jsx_runtime_1.jsxs)("span", { className: status === 'pending' ? 'text-warn-text' : 'text-on-card', children: [(0, jsx_runtime_1.jsx)("span", { className: "text-muted-text", children: `${deadlineLabel} ` }), (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: deadline })] })) : null] })) : null, decidable ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-xs", children: [onAccept ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "primary", onClick: () => onAccept(offer), className: (0, cn_1.cn)('flex-1', tone_v4_1.MIN_TAP_CLASS), children: acceptLabel })) : null, onDecline ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "md", variant: "outline", tone: "danger", onClick: () => onDecline(offer), className: (0, cn_1.cn)('flex-1', tone_v4_1.MIN_TAP_CLASS), children: declineLabel })) : null] })) : null] }));
});
//# sourceMappingURL=OfferCardV4.js.map