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
exports.RowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * **V4 row** — the horizontal stack, on the V4 design line.
 *
 * ## There is deliberately no visual change here
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 marks `Row` "structure only": the file is
 * already token-pure (every gap is a `--xen-space-*` class from `_tokens.ts`,
 * there is not a colour, radius or font size in it), and `align='center'` is
 * the right default for the row family §4.3 describes. A V4 that moved the
 * default alignment or paid a gap the caller did not ask for would silently
 * re-space every screen that composes it, which is exactly what §1.4's
 * additive-only rule exists to prevent. So this renders byte-for-byte what
 * `Row` renders, and its spec asserts that against the base rather than
 * trusting the claim.
 *
 * It exists so the V4 line is complete — a V4 composite composes V4 children
 * (§1.4), and until now a `ListRowV4` had to reach back into the V3 `Row` for
 * its own skeleton.
 *
 * ## What it does settle
 *
 * **The `align` type.** §5 asks the twins' align vocabularies to agree.
 * `baseline` *is* meaningful on a row — it is how a title and a trailing
 * timestamp sit on the same optical line — so both twins take the full
 * `Align` from `_tokens.ts`, and the props come straight off `RowProps` so they
 * cannot drift apart later. (`Column` is the mirror-image decision: there
 * `baseline` is meaningless, so both twins narrow it away.)
 *
 * **`gap` stays optional with no default.** §4.1 owns the spacing rhythm and it
 * is the caller's to apply — a row inside a card header and a row of chips do
 * not want the same gap, and a default here would quietly outrank the rhythm.
 *
 * The `data-xen-v4-row` marker carries no styling of its own; it is the house
 * handle a future sheet or a spec uses to find a V4 row in the tree.
 */
exports.RowV4 = React.forwardRef(function RowV4({ gap, align = 'center', justify = 'start', wrap = false, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-row": "", className: (0, cn_1.cn)('flex flex-row', wrap ? 'flex-wrap' : 'flex-nowrap', _tokens_1.ALIGN_CLASSES[align], _tokens_1.JUSTIFY_CLASSES[justify], gap ? _tokens_1.SPACE_GAP[gap] : undefined, className), ...rest }));
});
//# sourceMappingURL=RowV4.js.map