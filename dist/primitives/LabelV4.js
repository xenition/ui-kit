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
exports.LabelV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/**
 * **V4 form label** — the web twin of the native `LabelV4`, same props as
 * {@link Label}, a different design line.
 *
 * A label is the least decorative thing in a kit and the easiest to get
 * quietly wrong, so V4 changes three things and nothing else.
 *
 * 1. **"Required" is announced, not just drawn.** The base label rendered a
 *    red `*` marked `aria-hidden`, so the single fact the marker exists to
 *    carry never reached a screen reader at all. A visual-only requirement is
 *    not a requirement (§46). The glyph stays hidden — an asterisk read aloud
 *    is noise — and the word rides along in a visually-hidden span, so the
 *    field announces itself as required when it takes focus.
 * 2. **The marker takes the measured red.** `text-danger` is the FILL slot;
 *    the compiler guarantees `on-danger` against it and guarantees nothing
 *    about it as ink on `surface`. `text-danger-text` is the same hue walked
 *    until it clears AA — and this glyph is small, which is precisely where
 *    the difference shows.
 * 3. **The offset comes from the scale.** `ml-0.5` is Tailwind's rhythm, not
 *    the seed's; the marker now sits half a spacing step off the word.
 *
 * No container, no fill, no gradient. A label is typography, and §10 asks that
 * typography do this work before anything else is reached for.
 */
exports.LabelV4 = React.forwardRef(function LabelV4({ className, required = false, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("label", { ref: ref, "data-xen-v4-label": "", className: (0, cn_1.cn)('font-body text-sm font-semibold text-on-surface', className), ...rest, children: [children, required ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "ml-[calc(var(--xen-space-xs)/2)] text-danger-text", children: "*" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: " (required)" })] })) : null] }));
});
//# sourceMappingURL=LabelV4.js.map