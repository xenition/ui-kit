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
exports.ClusterV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/*
  Split gap classes, written out as whole literals for the same reason
  `_tokens.ts` writes its own out in full: Tailwind's content scanner reads
  source text and cannot follow a composed string. They live here rather than in
  `_tokens.ts` because `rowGap` is a `Cluster` concern — nothing else in the
  module wraps — and every value still traces to a `--xen-space-*` token, so the
  no-literal-spacings rule (§1.1) holds.

  When `rowGap` is set the component emits `gap-x` + `gap-y` rather than `gap`
  plus an override, so which rule wins never depends on the order Tailwind
  happens to emit its gap utilities in.
*/
const SPACE_GAP_X = {
    xs: 'gap-x-[var(--xen-space-xs)]',
    sm: 'gap-x-[var(--xen-space-sm)]',
    md: 'gap-x-[var(--xen-space-md)]',
    lg: 'gap-x-[var(--xen-space-lg)]',
    xl: 'gap-x-[var(--xen-space-xl)]',
    '2xl': 'gap-x-[var(--xen-space-2xl)]',
};
const SPACE_GAP_Y = {
    xs: 'gap-y-[var(--xen-space-xs)]',
    sm: 'gap-y-[var(--xen-space-sm)]',
    md: 'gap-y-[var(--xen-space-md)]',
    lg: 'gap-y-[var(--xen-space-lg)]',
    xl: 'gap-y-[var(--xen-space-xl)]',
    '2xl': 'gap-y-[var(--xen-space-2xl)]',
};
/**
 * **V4 cluster** — the wrapping inline group (tags, chips, a row of buttons),
 * on the V4 design line. **Web only, deliberately**: there is no native twin of
 * `Cluster` and V4 does not add one. React Native wraps with
 * `Flex wrap direction="row"`, and the native row of chips is a horizontal
 * `ScrollArea` rather than a wrapping box (§5's `Bleed edge` note is about
 * exactly that scroll), so a native `Cluster` would be a component with no
 * caller. The web/native parity rule (§1.3) binds twins that exist; it does not
 * require inventing one.
 *
 * ## No visual change to what exists
 *
 * The base is already token-pure and its defaults are already right for the
 * V4 line — `gap="sm"` is §4.1's chip gap, `align="center"` is what keeps a
 * chip and a taller button optically aligned, `wrap` defaults on because a
 * cluster that cannot wrap is a `RowV4`. With `rowGap` left off this renders
 * byte-for-byte what `Cluster` renders, and the spec asserts that against the
 * base.
 *
 * ## What V4 adds
 *
 * **`rowGap`** — see the prop. It is additive, it is bound to the spacing
 * scale, and it defaults to "whatever `gap` says", so no existing cluster
 * moves.
 *
 * The `data-xen-v4-cluster` marker carries no styling; it is the house handle
 * for finding a V4 cluster in the tree.
 */
exports.ClusterV4 = React.forwardRef(function ClusterV4({ gap = 'sm', rowGap, align = 'center', justify = 'start', wrap = true, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-cluster": "", className: (0, cn_1.cn)('flex flex-row', wrap ? 'flex-wrap' : 'flex-nowrap', _tokens_1.ALIGN_CLASSES[align], _tokens_1.JUSTIFY_CLASSES[justify], rowGap ? (0, cn_1.cn)(SPACE_GAP_X[gap], SPACE_GAP_Y[rowGap]) : _tokens_1.SPACE_GAP[gap], className), ...rest }));
});
//# sourceMappingURL=ClusterV4.js.map