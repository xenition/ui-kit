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
exports.FormStatusRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const status_1 = require("./internal/status");
const civic_v4_1 = require("./internal/civic-v4");
/**
 * **V4 form status row** — the web twin of the native `FormStatusRowV4`, same
 * props as {@link FormStatusRow} plus `reason` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Action needed" can say what action.** `action-needed` and `rejected`
 *    are the two states this row exists to communicate and the prop interface
 *    had no field for why — the status that stops an application was a pill and
 *    nothing else. `reason` renders under the title and joins the row's name
 *    whenever {@link isAdverse} is true.
 * 2. **An interactive row is a real `<button>`.** The base was a `div` with
 *    `role="button"`, `tabIndex` and a hand-written Enter/Space handler: three
 *    approximations of what a button already does, and the mechanism behind the
 *    Space bug on `ServiceCard`.
 * 3. **One name carrying the agency and the date.** The fixed
 *    `` `Form ${n}, ${title}, ${status}` `` template dropped the agency that
 *    owns the form and the date it was filed — and `role="button"` makes the
 *    subtree presentational, so nothing else was reachable either.
 * 4. **The form number is labelled**, so a reader hears what "APP-77412"
 *    identifies rather than a string of digits, and the agency stops being
 *    glued on with a bare `·` span.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a form list, a complaint list and a settings list are one
 *    rhythm. `hover:opacity-80` is M3's *disabled* signal, `ring-primary-300`
 *    is a ramp step, and the leading disc's ink was the `success` / `danger`
 *    **fill** used as a glyph on a tint of itself.
 *
 * The reason is **not** put in a live region here, deliberately: this is a list
 * row, and twenty rejected forms queueing twenty announcements is the failure
 * mode `role="alert"` warnings exist to prevent. `PermitStatusV4` — one permit,
 * one screen — is where the announcement belongs.
 */
exports.FormStatusRowV4 = React.forwardRef(function FormStatusRowV4({ formNumber, title, status, agency, date, onClick, reason, statusLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!title)
        return null;
    const sd = (0, status_1.formStatus)(status);
    const word = statusLabels?.[status] ?? sd.label;
    const reference = (0, civic_v4_1.labelledId)('Form', formNumber);
    const adverse = (0, civic_v4_1.isAdverse)(status);
    const why = adverse ? reason : undefined;
    const caption = (0, tone_v4_1.metaLine)([reference, agency]);
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-full)]'), style: { background: (0, civic_v4_1.tintGround)(sd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, className: (0, civic_v4_1.tintInkClass)(sd.tone) }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: title }), caption !== '' ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: caption }) : null, why != null ? (
                    // The reason takes the state's contrast-corrected ink, so it reads
                    // as part of the verdict rather than as another muted caption.
                    (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('line-clamp-2 text-xs font-medium', (0, civic_v4_1.tintInkClass)(sd.tone)), children: why })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${word}` }), date != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: date }) : null] })] }));
    if (onClick == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(rowClass, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, civic_v4_1.spokenLine)([title, reference, agency, word, why, date]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)(rowClass, 'rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body }) }));
});
//# sourceMappingURL=FormStatusRowV4.js.map