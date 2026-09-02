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
exports.ClaimRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const row_v4_1 = require("../dashboard/internal/row-v4");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * **V4 claim row** — same props as {@link ClaimRow}; every one of them
 * unchanged, and the row now says the amount out loud.
 *
 * ## Five changes
 *
 * 1. **The settled amount is announced.** The row put `aria-label="Claim
 *    CLM-20481, Windshield replacement, Approved"` on the same element that
 *    rendered the money and the date. ARIA replaces an element's contents with
 *    its name, so a screen-reader user scanning a claims list heard a status
 *    for every claim and **not one figure** — on the screen whose entire
 *    subject is how much was paid. The amount and the date are folded into the
 *    name, joined with commas.
 * 2. **`amountCents={-1}` no longer prints "$0.00".** The base clamped with
 *    `Math.max(0, …)`, so a recovery, a sentinel and a genuine zero settlement
 *    all rendered identically. The figure is printed as given and captioned
 *    when it is below zero.
 * 3. **It is a real `<button>`, joined to the row family.** `pressableProps`
 *    made it a `div` with `role="button"`, `tabIndex` and a hand-written
 *    Enter/Space handler — and that handler is what steals the keydown from
 *    any control nested in a row. The row now takes the shared height, the
 *    shared 44 leading slot and the shared state layer, so a claims list, a
 *    settings list and a notification list are one family rather than three
 *    row heights.
 * 4. **Press is a state layer, not `hover:opacity-80`.** Dimming fades the
 *    row's own content, which is M3's *disabled* signal.
 * 5. **The status disc is inked with an ink slot.** `internal/tint.ts` drew
 *    the glyph in `text-success` / `text-danger` — fill tokens the compiler
 *    guarantees nothing about as text — over `bg-neutral-100`, a ramp step
 *    that mirrors under `[data-theme="dark"]`. Both are gone; focus is
 *    `ring-ring` rather than `ring-primary-300`.
 */
exports.ClaimRowV4 = React.forwardRef(function ClaimRowV4({ claimNumber, title, status, amountCents, currency = 'USD', date, formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    if (!title)
        return null;
    const sd = (0, status_1.claimStatus)(status);
    const interactive = onClick != null;
    const amount = (0, tone_v4_1.moneyParts)(amountCents, currency, format);
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-full w-full items-center justify-center rounded-[var(--xen-radius-full)] text-base', (0, tone_v4_1.toneInkClass)(sd.tone)), style: (0, tone_v4_1.toneGroundStyle)(sd.tone), children: sd.glyph }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: claimNumber }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-semibold', (0, tone_v4_1.toneInkClass)(sd.tone)), children: sd.label })] })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [amount ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', tone_v4_1.TABULAR_CLASS, amount.negative ? 'text-danger-text' : 'text-on-card'), children: amount.text })) : null, date != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: date }) : null] })] }));
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true), (0, row_v4_1.rowGroundClass)(false));
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-row": "", className: (0, cn_1.cn)(rowClass, className), ...rest, children: content }));
    }
    // The activation is the row, and the row's own element stays a plain `div`
    // so the props a caller passes keep landing on a div — and so a sibling
    // control can be added here without ever being nested inside the button.
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": (0, tone_v4_1.spokenLine)([
                `Claim ${claimNumber}`,
                title,
                sd.label,
                amount?.text,
                amount?.negative ? tone_v4_1.NEGATIVE_AMOUNT_LABEL : undefined,
                date,
            ]), onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(rowClass, 'rounded-[var(--xen-radius-md)]', tone_v4_1.FOCUS_RING_CLASS), children: content }) }));
});
//# sourceMappingURL=ClaimRowV4.js.map