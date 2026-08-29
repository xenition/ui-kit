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
exports.WatermarkV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const identity_v4_1 = require("./internal/identity-v4");
/**
 * **V4 watermark** — the web twin of the native `WatermarkV4`, same props as
 * {@link Watermark}, a different design line.
 *
 * A watermark that competes with the content has failed, and the base one
 * competed in two ways at once: it was laid out by chance, and it was a
 * different strength in each colour scheme.
 *
 * 1. **A lattice, not a blob.** The base dropped `count` spans into a
 *    centre-justified `flex-wrap` row. Where the rows broke depended on the
 *    container's width, the last row was always a short cluster in the middle,
 *    and `count` changed the size of the blob rather than the density of the
 *    field. V4 lays the same tiles out as explicit rows — a square-ish lattice
 *    derived from `count` — and offsets alternate rows by half a step, which is
 *    how a repeating mark is actually set.
 * 2. **One strength in both schemes.** The ink was `text-muted-text`, a MID tone
 *    whose distance from the page changes with the scheme, floated at 8%: the
 *    same number produced two different marks. V4 prints in `on-surface` — the
 *    only slot guaranteed to sit at the far end from the surface in either
 *    scheme — so a fixed alpha is a fixed *relative* strength.
 * 3. **The twins agree.** The web scaled the field by 1.5 and native by 1.4,
 *    and the tile padding was `px-6 py-3` (24/12) against `spacing.lg /
 *    spacing.md` (24/16). Both now read the same three constants.
 * 4. **It does not come along when you copy.** The overlay was real text on
 *    top of a document, so selecting a paragraph took twenty-four copies of
 *    "CONFIDENTIAL" with it. `select-none` makes the mark a mark.
 *
 * It still sits above the content rather than behind it — a confidentiality
 * mark that a dark screenshot can hide is not a confidentiality mark — and it
 * still takes no clicks and is hidden from assistive tech, because it is a
 * property of the page and not something to read.
 */
exports.WatermarkV4 = React.forwardRef(function WatermarkV4({ text, children, count = 24, className, ...rest }, ref) {
    const total = Math.max(1, count);
    // A square-ish lattice: `count` becomes a density, not the size of a blob.
    const cols = Math.max(1, Math.ceil(Math.sqrt(total)));
    const rows = [];
    for (let i = 0; i < total; i += cols) {
        rows.push(Array.from({ length: Math.min(cols, total - i) }, (_, j) => i + j));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative overflow-hidden', className), ...rest, children: [children, (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, "data-xen-v4-watermark": "", className: "pointer-events-none absolute inset-0 flex select-none flex-col justify-center", style: {
                    opacity: identity_v4_1.WATERMARK_ALPHA,
                    transform: `rotate(${identity_v4_1.WATERMARK_TILT}deg) scale(${identity_v4_1.WATERMARK_SCALE})`,
                }, children: rows.map((row, r) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex justify-center', 
                    // Half a step across on every other row — a brick course, which
                    // is what stops a lattice reading as a table.
                    r % 2 === 0 ? null : 'ml-2xl'), children: row.map((i) => ((0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap px-lg py-md font-body text-sm font-bold text-on-surface", children: text }, i))) }, r))) })] }));
});
//# sourceMappingURL=WatermarkV4.js.map