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
exports.InterviewSlotV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const BadgeV4_1 = require("../primitives/BadgeV4");
const cn_1 = require("../primitives/cn");
const v4_state_1 = require("../primitives/internal/v4-state");
const format_1 = require("./format");
const hiring_v4_1 = require("./hiring-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Mode → [glyph, word]. Both, so the channel is never colour or glyph alone. */
const MODE = {
    onsite: ['📍', 'On-site'],
    video: ['🎥', 'Video'],
    phone: ['📞', 'Phone'],
};
/** Status → [word, tone]. These are genuine statuses and keep status colour. */
const STATUS = {
    scheduled: ['Scheduled', 'neutral'],
    confirmed: ['Confirmed', 'success'],
    cancelled: ['Cancelled', 'danger'],
    rescheduled: ['Rescheduled', 'warn'],
};
/**
 * **V4 interview slot** — same props as {@link InterviewSlot} plus `status`,
 * `statusReason`, `modeLabels`, `formatDate` and `formatTime`.
 *
 * ## Six changes
 *
 * 1. **An unparseable instant no longer renders a blank card.** `formatTime`
 *    and `formatShortDate` both return `''` on bad input, and the base
 *    interpolated them anyway — so a slot with a malformed `startsAt` drew an
 *    empty date, an empty time, and an accessible name that was literally
 *    `" , Video"`. A slot with no time is not a slot: it returns `null`.
 * 2. **An unknown mode stops claiming to be a video call.** `MODE[mode] ??
 *    MODE.video` announced "Video" for anything it did not recognise, so a
 *    candidate could be told to expect a video interview for something that is
 *    not one. An unrecognised mode now contributes no glyph and no word rather
 *    than a confident wrong one.
 * 3. **A display-only slot is no longer drawn as disabled.** `disabled={
 *    disabled || !onSelect}` meant that any slot rendered without a handler —
 *    a confirmed interview on a candidate's schedule, the common case — was
 *    dimmed and announced as unavailable, which reads as cancelled. Without
 *    `onSelect` it is now a plain, full-contrast, non-interactive card.
 * 4. **A cancelled interview says so, in a word and with a reason.** See
 *    `status` and `statusReason`. `disabled` no longer has to stand in for
 *    four different things.
 * 5. **The slot is a real tap target and its focus ring is the kit's.** It had
 *    no minimum height and rang itself in `ring-primary`, the raw brand
 *    colour, rather than `ring-ring`, which is that colour already corrected
 *    to 3:1 against the page.
 * 6. **Disabled is M3's 0.38 band and press is a state layer.** The base used
 *    `disabled:opacity-50` — a round number, not a measured one — and
 *    `hover:opacity-95`, which fades the card's own content.
 */
exports.InterviewSlotV4 = React.forwardRef(function InterviewSlotV4({ interview, selected = false, disabled = false, onSelect, status, statusReason, modeLabels, formatDate, formatTime, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const date = formatDate ? formatDate(interview.startsAt) : (0, format_1.formatShortDate)(interview.startsAt);
    const start = formatTime
        ? formatTime(interview.startsAt)
        : (0, format_1.formatTime)(interview.startsAt);
    // A frame around nothing is worse than nothing: the base drew one, named
    // it " , Video", and put it in the tab order.
    if (!date && !start)
        return null;
    const end = interview.endsAt
        ? formatTime
            ? formatTime(interview.endsAt)
            : (0, format_1.formatTime)(interview.endsAt)
        : '';
    const timeRange = end ? `${start} – ${end}` : start;
    const known = MODE[interview.mode];
    const glyph = known?.[0];
    const modeLabel = modeLabels?.[interview.mode] ?? known?.[1];
    const statusMeta = status ? STATUS[status] : undefined;
    const reason = status && (0, hiring_v4_1.isAdverse)(status) ? statusReason : undefined;
    // A cancelled slot really is unavailable — and now there is a word on the
    // card saying which kind of unavailable it is.
    const unavailable = disabled || status === 'cancelled';
    const name = (0, tone_v4_1.spokenLine)([
        date,
        timeRange,
        modeLabel,
        interview.interviewer ? `with ${interview.interviewer}` : undefined,
        statusMeta?.[0],
        reason,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm", children: glyph })) : null, (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', selected ? 'text-on-primary' : 'text-muted-text'), children: [date, modeLabel ? ` · ${modeLabel}` : ''] })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-semibold', selected ? 'text-on-primary' : 'text-on-card'), children: timeRange }), interview.interviewer ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs', selected ? 'text-on-primary' : 'text-muted-text'), children: interview.interviewer })) : null, statusMeta ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: statusMeta[1], size: "sm", className: "self-start", children: statusMeta[0] })) : null, reason ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', selected ? 'text-on-primary' : 'text-danger-text'), children: reason })) : null] }));
    const skin = (0, cn_1.cn)('flex flex-col gap-xs rounded-[var(--xen-radius-md)] p-md text-left', selected
        ? 'border-2 border-primary bg-primary text-on-primary'
        : 'border border-border bg-card text-on-card', className);
    // No handler means this is a record of an interview, not an offer of one.
    // It is not a control, so it is not focusable and not announced as
    // disabled — its words are simply read.
    if (!onSelect) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-interview-slot": "static", className: skin, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "data-xen-v4-interview-slot": "", "data-xen-v4-state": "", "aria-label": name, "aria-pressed": selected, disabled: unavailable, onClick: () => onSelect(interview), style: (0, tone_v4_1.cardStateVars)(selected ? 'var(--xen-primary)' : 'var(--xen-card)', selected ? 'var(--xen-on-primary)' : 'var(--xen-on-card)'), className: (0, cn_1.cn)(skin, tone_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS, v4_state_1.V4_DISABLED_CLASS), ...rest, children: body }));
});
//# sourceMappingURL=InterviewSlotV4.js.map