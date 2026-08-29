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
exports.BleedV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * Negative inline-start margins, written out in full so the Tailwind scanner
 * finds them in the library source. Logical (`-ms-`), matching native's
 * `marginStart`, so the two twins bleed the same edge under RTL.
 *
 * These live here rather than in `_tokens.ts` because `Bleed` is their only
 * caller; the shared maps stay the vocabulary the whole module uses.
 */
const SPACE_MS_NEG = {
    xs: '-ms-[var(--xen-space-xs)]',
    sm: '-ms-[var(--xen-space-sm)]',
    md: '-ms-[var(--xen-space-md)]',
    lg: '-ms-[var(--xen-space-lg)]',
    xl: '-ms-[var(--xen-space-xl)]',
    '2xl': '-ms-[var(--xen-space-2xl)]',
};
/** Negative inline-end margins. Twin of {@link SPACE_MS_NEG}. */
const SPACE_ME_NEG = {
    xs: '-me-[var(--xen-space-xs)]',
    sm: '-me-[var(--xen-space-sm)]',
    md: '-me-[var(--xen-space-md)]',
    lg: '-me-[var(--xen-space-lg)]',
    xl: '-me-[var(--xen-space-xl)]',
    '2xl': '-me-[var(--xen-space-2xl)]',
};
/**
 * **V4 bleed** — the inverse of `Inset`: token-bound *negative* margins that
 * let content break out of a padded parent (a full-bleed image, an
 * edge-to-edge row) without the parent having to drop its gutter.
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 calls the base *"already the cleanest file
 * in the module"* and asks for exactly one addition, which is the whole of the
 * change here: **`edge`**. A horizontally scrolling strip — `FilterChips`, a
 * card carousel — has to bleed only its trailing side. Bleeding both, which is
 * all the base can do, pulls the *first* chip under the screen edge as well,
 * so the strip opens already looking scrolled and its first item is clipped.
 * Bleeding one side keeps the strip's leading edge on the page gutter (§4.1,
 * `spacing.lg`) while the last item can still be scrolled fully into reach.
 *
 * Everything else is unchanged and deliberately so: the default `edge="both"`
 * renders exactly what `Bleed` renders today, so upgrading an import cannot
 * move a pixel. No colour, no radius, no type — every margin traces to a
 * `--xen-space-*` token.
 *
 * The one-sided classes are the logical `-ms-` / `-me-` rather than `-ml-` /
 * `-mr-`, which is what keeps this at prop parity with the native twin's
 * `marginStart` / `marginEnd`: both twins bleed the same edge in an RTL
 * layout, so a screen does not have to special-case one platform.
 */
exports.BleedV4 = React.forwardRef(function BleedV4({ space = 'md', horizontal, vertical, edge = 'both', className, ...rest }, ref) {
    const inline = horizontal ?? space;
    const inlineClass = edge === 'both'
        ? _tokens_1.SPACE_MX_NEG[inline]
        : edge === 'start'
            ? SPACE_MS_NEG[inline]
            : SPACE_ME_NEG[inline];
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(inlineClass, _tokens_1.SPACE_MY_NEG[vertical ?? space], className), ...rest }));
});
//# sourceMappingURL=BleedV4.js.map