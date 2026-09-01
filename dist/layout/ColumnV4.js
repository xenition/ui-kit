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
exports.ColumnV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * **V4 column** — the vertical stack, on the V4 design line.
 *
 * ## There is deliberately no visual change here
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Column` "structure only". The file
 * is already token-pure — every gap is a `--xen-space-*` class out of
 * `_tokens.ts`, and there is no colour, radius or font size in it to launder —
 * so this renders byte-for-byte what `Column` renders, and its spec asserts
 * that against the base rather than asking you to take it on trust.
 *
 * It ships so the V4 line is complete: a V4 composite composes V4 children
 * (§1.4), and the vertical stack is the skeleton under most of them.
 *
 * ## What it does settle
 *
 * **The `align` type, on both twins.** §5's parity note reads on `Column`;
 * `baseline` is not meaningful on a column — there is no shared baseline to sit
 * on when children are stacked vertically — so both twins take
 * `Exclude<Align, 'baseline'>`. The native base already narrowed it, so V4
 * pins the agreement by importing `ColumnProps` instead of restating it, and
 * the native twin does the same.
 *
 * **`gap` keeps its undefined default.** §4.1 owns the spacing rhythm and it is
 * the caller's to spend — section-to-section is `gap="xl"`, a title and its
 * supporting line are `gap="xs"`. A default here would outrank that rhythm
 * everywhere at once and would not be additive.
 *
 * The `data-xen-v4-column` marker carries no styling; it is the house handle
 * for finding a V4 column in the tree.
 */
exports.ColumnV4 = React.forwardRef(function ColumnV4({ gap, align = 'stretch', justify = 'start', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-column": "", className: (0, cn_1.cn)('flex flex-col', _tokens_1.ALIGN_CLASSES[align], _tokens_1.JUSTIFY_CLASSES[justify], gap ? _tokens_1.SPACE_GAP[gap] : undefined, className), ...rest }));
});
//# sourceMappingURL=ColumnV4.js.map