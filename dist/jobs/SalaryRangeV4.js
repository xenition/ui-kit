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
exports.SalaryRangeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("./internal/tone-v4");
const TEXT_CLASS = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
};
/**
 * **V4 salary range** — same props as {@link SalaryRange} plus `formatMoney`,
 * `periodLabels` and `invalidLabel`.
 *
 * ## Four changes
 *
 * 1. **The salary was silent in Chrome and Firefox.** The base put the band's
 *    only accessible name on `role="text"`. That is not an ARIA role — it is a
 *    WebKit extension — so both other engines drop the role *and* the
 *    `aria-label` that hung off it, and the pay for the job was announced
 *    nowhere. There is no role here at all now: the band is ordinary text in
 *    an ordinary `<span>`, which is what a screen reader reads best and what a
 *    parent folds into its own name.
 * 2. **A band that runs backwards is no longer drawn backwards.**
 *    `{min: 120000, max: 90000}` rendered "$120K – $90K/yr" and repeated it in
 *    the label. `salaryParts` swaps the bounds, so the band reads forwards and
 *    renders — that is a correction, not an error state, and nothing extra is
 *    said beside it.
 * 3. **Undisclosed and broken are different sentences.** `formatSalary` tested
 *    `typeof min === 'number'`, which `NaN` and `Infinity` both pass; a
 *    negative bound printed "-$5K". All three are dropped — and a posting that
 *    offered bounds and had all of them dropped says `invalidLabel`, a fact
 *    about the data, rather than falling through to `emptyLabel`, a fact about
 *    the posting. The base could not tell them apart.
 * 4. **The empty hint stops being inked with a fill token.** `text-muted` is
 *    the decorative ramp slot the compiler makes no contrast promise about;
 *    "Salary not disclosed" is a sentence a reader has to read, so it takes
 *    `muted-text`.
 */
exports.SalaryRangeV4 = React.forwardRef(function SalaryRangeV4({ salary, size = 'md', format, emptyLabel = 'Salary not disclosed', glyph = '💰', formatMoney, periodLabels, invalidLabel = 'Salary range unavailable', className, ...rest }, ref) {
    // The `format` escape hatch is the caller taking the whole job over; it
    // predates this component and keeps working untouched.
    const override = salary && format ? format(salary) : null;
    const built = override != null ? null : (0, tone_v4_1.salaryLabelV4)(salary, { formatMoney, periodLabels });
    const band = override ?? built?.text;
    const disclosed = band != null && band !== '';
    // The fallback is a fork, not one string: `invalidLabel` when bounds were
    // offered and none survived, `emptyLabel` when none were offered at all.
    const text = disclosed ? band : built?.broken === true ? invalidLabel : emptyLabel;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-v4-salary-range": "", className: (0, cn_1.cn)('inline-flex items-center gap-xs', TEXT_CLASS[size], className), ...rest, children: [glyph && disclosed ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: glyph }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(disclosed ? 'font-semibold text-on-surface' : 'font-normal italic text-muted-text'), children: text })] }));
});
//# sourceMappingURL=SalaryRangeV4.js.map