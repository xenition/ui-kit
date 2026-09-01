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
exports.MaterialsRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const row_v4_1 = require("../dashboard/internal/row-v4");
const job_v4_1 = require("./internal/job-v4");
const format_1 = require("./internal/format");
const STOCK_V4 = {
    'in-stock': { label: 'In stock', glyph: '✓', tone: 'success' },
    low: { label: 'Low', glyph: '▲', tone: 'warn' },
    'back-ordered': { label: 'Back-ordered', glyph: '⋯', tone: 'danger' },
};
/**
 * **V4 materials row** — the web twin of the native `MaterialsRowV4`, same
 * props as {@link MaterialsRow} plus `glyph` and `stockLabels`.
 *
 * ## Four changes
 *
 * 1. **The stock state is announced.** On a parts list "back-ordered" is the
 *    single field that changes what the technician does next — and it was the
 *    single field the row's `` `${name}, ${qty} ${unit}, ${total}` `` name
 *    omitted. The SKU joins the name too.
 * 2. **It takes the `glyph` every sibling row has.** The box emoji was
 *    hard-coded, so a materials list could not distinguish a fitting from a
 *    length of pipe the way the equipment register distinguishes its assets.
 * 3. **Money is tabular**, so a column of extended totals lines up on the
 *    decimal instead of drifting with the digits.
 * 4. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, and the disc no longer announces "Material" ahead of
 *    the part's own name.
 */
exports.MaterialsRowV4 = React.forwardRef(function MaterialsRowV4({ name, sku, quantity, unit = 'ea', unitCents, stock, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, glyph = '📦', stockLabels, className, style, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const sd = stock ? STOCK_V4[stock] : undefined;
    const stockWord = stock ? (stockLabels?.[stock] ?? sd?.label) : undefined;
    const qty = Number.isFinite(quantity) ? Math.max(0, quantity) : 0;
    const unitSafe = Math.max(0, Math.trunc(unitCents || 0));
    const totalCents = Math.round(qty * unitSafe);
    const breakdown = `${qty} ${unit} × ${format(unitSafe, currency)}`;
    const caption = (0, tone_v4_1.metaLine)([breakdown, sku]);
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-md)]'), style: { background: (0, job_v4_1.discGround)('neutral') }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold text-on-card', job_v4_1.TABULAR_CLASS), children: format(totalCents, currency) }), sd ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...job_v4_1.BADGE_V4, children: `${sd.glyph} ${stockWord}` })) : null] })] }));
    if (onClick == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)(rowClass, className), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, className: (0, cn_1.cn)('w-full', className), children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, job_v4_1.spokenLine)([
                name,
                sku,
                breakdown,
                format(totalCents, currency),
                stockWord,
            ]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)(rowClass, 'rounded-[var(--xen-radius-md)]'), children: body }) }));
});
//# sourceMappingURL=MaterialsRowV4.js.map