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
exports.InspectionRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const row_v4_1 = require("../dashboard/internal/row-v4");
const job_v4_1 = require("./internal/job-v4");
/**
 * Result → word, glyph and tone.
 *
 * `pending` is `neutral`, not `primary`: "nobody has inspected this yet" is an
 * absence of a result, and a brand-coloured pill beside a green Pass and a red
 * Fail reads as a third verdict.
 */
const RESULT_V4 = {
    pass: { label: 'Pass', glyph: '✓', tone: 'success' },
    fail: { label: 'Fail', glyph: '✕', tone: 'danger' },
    na: { label: 'N/A', glyph: '–', tone: 'neutral' },
    pending: { label: 'Pending', glyph: '○', tone: 'neutral' },
};
/**
 * **V4 inspection row** — the web twin of the native `InspectionRowV4`, same
 * props as {@link InspectionRow} plus `resultLabels`.
 *
 * ## Four changes
 *
 * 1. **The defect note is announced.** On a failed checkpoint the note *is*
 *    the reason for the failure — and it was exactly what the row's
 *    `` `${label}, ${result}` `` name replaced. The code goes into the name
 *    too.
 * 2. **The result is announced once.** The glyph disc carried the result as
 *    its accessible label and the pill carried it again, so a reader walking
 *    an inspection sheet heard "Fail, Fail" on every failing line.
 * 3. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, not a `div` with `role="button"` and a hand-written
 *    key handler at 36px.
 * 4. **It joins the shared row family**, so an inspection sheet, an equipment
 *    register and a materials list are one row height and one rhythm.
 */
exports.InspectionRowV4 = React.forwardRef(function InspectionRowV4({ label, result, code, note, onClick, resultLabels, className, style }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const rd = RESULT_V4[result] ?? RESULT_V4.pending;
    const word = resultLabels?.[result] ?? rd.label;
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(code != null || note != null));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-full)]'), style: { background: (0, job_v4_1.discGround)(rd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: rd.glyph, className: (0, job_v4_1.discInkClass)(rd.tone) }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-base font-semibold text-on-card", children: label }), code != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: code }) : null, note != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: note }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: rd.tone, ...job_v4_1.BADGE_V4, children: `${rd.glyph} ${word}` }) })] }));
    if (onClick == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)(rowClass, className), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)('w-full', className), children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, job_v4_1.spokenLine)([label, code, word, note]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)(rowClass, 'rounded-[var(--xen-radius-md)]'), children: body }) }));
});
//# sourceMappingURL=InspectionRowV4.js.map