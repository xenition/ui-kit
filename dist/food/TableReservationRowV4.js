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
exports.TableReservationRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const menu_v4_1 = require("./internal/menu-v4");
const STATUS_LABEL = {
    requested: 'Requested',
    confirmed: 'Confirmed',
    seated: 'Seated',
    completed: 'Completed',
    cancelled: 'Cancelled',
};
/** A reservation's lifecycle is genuinely a status, so it keeps status tones. */
const STATUS_TONE = {
    requested: 'warn',
    confirmed: 'primary',
    seated: 'success',
    completed: 'neutral',
    cancelled: 'danger',
};
const PARTY_CLASS = 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]';
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 table reservation row** — the web twin of the native
 * `TableReservationRowV4`, same props as {@link TableReservationRow} plus
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **The table number joins the row's name.** `aria-label` carried the
 *    guest, the party size, the date/time and the status on a `role="button"`
 *    root — children-presentational — so `tableLabel`, the one fact a host
 *    walking the floor needs, was rendered and pruned.
 * 2. **The party glyph stops being a reader stop.** `Icon aria-label="Party of
 *    4"` made the 👥 its own focusable-adjacent announcement, repeating what
 *    the row's own name already says. It is decorative now, and the words are
 *    in the name.
 * 3. **The words are props.** Five English status strings were compiled into
 *    the component with no way past them.
 * 4. **A real button on the card tokens.** The `div` + `role="button"` +
 *    hand-rolled Enter/Space handler is a `<button>`; `hover:opacity-90` — M3's
 *    *disabled* signal, spent on hover — is the state layer; `primary-300` is
 *    the `ring` token; and the party chip's `bg-neutral-100`, a ramp step that
 *    inverts under `[data-theme="dark"]`, is a hairline on the card.
 */
exports.TableReservationRowV4 = React.forwardRef(function TableReservationRowV4({ name, partySize, dateText, timeText, tableLabel, status = 'requested', statusLabels, onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!name)
        return null;
    const statusWord = statusLabels?.[status] ?? STATUS_LABEL[status] ?? STATUS_LABEL.requested;
    const tone = STATUS_TONE[status] ?? STATUS_TONE.requested;
    const when = (0, tone_v4_1.metaLine)([dateText, timeText]);
    const spoken = (0, menu_v4_1.spokenLine)([
        name,
        `Party of ${partySize}`,
        when !== '' ? when : undefined,
        tableLabel,
        statusWord,
    ]);
    const party = ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex shrink-0 flex-col items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-card', PARTY_CLASS), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm leading-none", children: "\uD83D\uDC65" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold text-on-card', menu_v4_1.TABULAR_CLASS), children: partySize })] }));
    const text = ((0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-semibold text-on-card", children: name }), when !== '' ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: when }) : null, tableLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: tableLabel }) : null] }));
    const badge = ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...menu_v4_1.BADGE_V4, tone: tone, children: statusWord }) }));
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-on-card', className), ...rest, children: [interactive ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": spoken, onClick: onClick, "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [party, text] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-center gap-md", children: [party, text] })), badge] }));
});
//# sourceMappingURL=TableReservationRowV4.js.map