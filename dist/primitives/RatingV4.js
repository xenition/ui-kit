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
exports.RatingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const SIZE_CLASS = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
};
const STAR = '★';
/**
 * **V4 rating** — the web twin of the native `RatingV4`, same props as
 * {@link Rating}, a different design line.
 *
 * ## The row stops rounding the number away
 *
 * The base drew `Math.round(value)` filled glyphs. A 4.2 and a 4.4 render
 * identically, a 4.4 and a 4.6 render a whole star apart, and every product
 * that has ever shown "4.2 ★" beside the glyphs was showing two different
 * numbers at once. `design.md` §8 bans meaningless charts, and a five-cell bar
 * chart that rounds its input to the nearest cell is one.
 *
 * V4 clips a filled row over an empty one at the exact fraction, so 4.2 of 5 is
 * 84% of the row and the glyphs agree with the label. Nothing about the props
 * changed — this is the same number, drawn honestly.
 *
 * ## The filled star is text, so it takes a text colour
 *
 * `text-accent` is a FILL token: the compiler guarantees `on-accent` against it
 * and promises nothing about it against `surface`. A filled star is not a fill —
 * it is a glyph, and this twin measured at **1.43:1** in light mode, which is a
 * star you cannot see. `accent-text` is the same hue walked until it clears AA,
 * and identical wherever `accent` already did. The native base had already made
 * this correction; this one had not, and now both agree.
 *
 * A rating is also, deliberately, the one place in this line that uses a BRAND
 * colour rather than a semantic one. §35.4 reserves success-green for success:
 * four stars out of five is not a healthy state, it is a measurement, and
 * painting it green would spend a meaning on something that does not have one.
 *
 * ## One label, no glyph soup
 *
 * The whole row is a single `role="img"` carrying `"{value} out of {max}
 * stars"`. A screen reader hearing "black star, black star, black star" has
 * been told nothing, and the exact value survives even though the visual is a
 * fraction.
 */
exports.RatingV4 = React.forwardRef(function RatingV4({ value, max = 5, size = 'md', showValue = false, label, className, ...rest }, ref) {
    const total = Math.max(0, Math.floor(max));
    const ariaLabel = label ?? `${value} out of ${total} stars`;
    // The exact fraction of the row, not the nearest whole star.
    // Rounded to two decimals: 4.2/5 is 84%, not 84.00000000000001%, and a
    // width string is not the place to leak binary floating point.
    const pct = total > 0 ? Math.round(Math.max(0, Math.min(1, value / total)) * 10000) / 100 : 0;
    const stars = Array.from({ length: total }, (_, i) => ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: STAR }, i)));
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, role: "img", "aria-label": ariaLabel, "data-xen-v4-rating": size, className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)]', SIZE_CLASS[size], className), ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: "relative inline-flex leading-none tracking-[0.1em]", children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex text-muted-text", children: stars }), (0, jsx_runtime_1.jsx)("span", { "data-xen-v4-rating-fill": "", 
                        // `accent-text`, not `accent` — a filled star IS the text here.
                        className: "absolute inset-y-0 left-0 inline-flex overflow-hidden text-accent-text", style: { width: `${pct}%` }, children: (0, jsx_runtime_1.jsx)("span", { className: "inline-flex", children: stars }) })] }), showValue ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "font-heading text-sm font-semibold text-on-surface", children: value })) : null] }));
});
//# sourceMappingURL=RatingV4.js.map