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
exports.StickyV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * The spacing scale as raw custom-property references, for the inline `top` /
 * `bottom` this component computes.
 *
 * `_tokens.ts` carries Tailwind *class* strings; an offset cannot be one,
 * because it is composed with `env()` when `safeArea` is on and a class cannot
 * be built by template literal and still be found by the scanner. These are
 * the same tokens, spelled for `style`.
 */
const SPACE_VAR = {
    xs: 'var(--xen-space-xs)',
    sm: 'var(--xen-space-sm)',
    md: 'var(--xen-space-md)',
    lg: 'var(--xen-space-lg)',
    xl: 'var(--xen-space-xl)',
    '2xl': 'var(--xen-space-2xl)',
};
/**
 * The viewport inset for each edge. 0 wherever there is no inset — a desktop
 * browser, an Android device with on-screen keys — so the same expression is
 * correct everywhere and needs no media query and no branch. This is the shape
 * `AuthStickyFooterV4` uses for the sticky CTA band, so a pinned header, a
 * pinned footer and the auth footer all clear the system chrome by the same
 * amount.
 */
const SAFE_VAR = {
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)',
};
/** The §5 band treatment: opaque ground plus a hairline on the edge content passes. */
const FILL_CLASS = {
    top: 'bg-surface text-on-surface border-b border-border',
    bottom: 'bg-surface text-on-surface border-t border-border',
};
/**
 * The custom property the resolved distance is handed down as, and the classes
 * that read it.
 *
 * The distance has to be *composed* — a token or a px number, optionally plus
 * an `env()` — and a class built by template literal is invisible to
 * Tailwind's content scanner. So the composition happens in an element-scoped
 * custom property (the mechanism `internal/v4-depth.ts` already uses to hand
 * compiled values to a web twin) and the class that consumes it is a whole
 * literal, one per edge.
 */
const OFFSET_VAR = '--xen-v4-sticky-offset';
const EDGE_CLASS = {
    top: 'top-[var(--xen-v4-sticky-offset)]',
    bottom: 'bottom-[var(--xen-v4-sticky-offset)]',
};
/**
 * **V4 sticky** — `position: sticky` pinned to the top or bottom edge of the
 * nearest scrolling ancestor.
 *
 * **Web only, deliberately.** There is no native twin and there should not be:
 * `position: sticky` has no React Native equivalent, and faking one with a
 * measured `onScroll` and an absolutely positioned overlay is a different
 * component with different failure modes. §6.1 settles this the same way it
 * settles `KeyboardAvoider` in the other direction — a documented
 * single-platform exception, like `XenitionNativeThemeProviderV4`.
 *
 * ## What V4 changes
 *
 * **The offset can be a token.** `offset` was px-only, so every caller that
 * wanted a normal gap from the edge typed a number — §1.1's "no literal
 * spacings", arriving through the front door. It now also takes a `SpaceKey`,
 * while a number still means what it always did, for the measured case.
 *
 * **It can clear the system chrome.** HIG asks edge-anchored content to
 * respect the safe areas; a bar pinned to `bottom: 0` on a notched phone sits
 * under the home indicator, which is the most visible way a web surface admits
 * it was not designed for a phone. `safeArea` adds `env(safe-area-inset-*)` to
 * the offset — the same expression `AuthStickyFooterV4` uses, so there is one
 * approach to the inset in the kit rather than two.
 *
 * **It can wear §5's band.** `filled` gives it the opaque `surface` and the
 * hairline that make content scroll under a pinned bar rather than collide
 * with it. Without it, a sticky header over a scrolling list is transparent
 * and the list reads straight through it.
 *
 * ## What it deliberately does not do
 *
 * **No shadow.** §4.6 gives a shadow to a card, a sheet and the one dominant
 * action, and §5's band is a hairline — the CTA inside such a band already
 * carries `elevation.action`, and two stacked shadows read as a UI element
 * that has come loose from the screen.
 *
 * **Nothing renders when there is nothing to pin** (§4.5). An empty band is a
 * hairline and a strip of surface across the edge of the screen with no
 * explanation — the same defect as a divider above no content.
 *
 * The `z-10` is a stacking order, not a design value: without it a
 * transformed or positioned child of the scrolling content paints over the
 * pinned bar, which defeats the entire point of pinning it.
 */
exports.StickyV4 = React.forwardRef(function StickyV4({ side = 'top', offset = 0, safeArea = false, filled = false, className, style, children, ...rest }, ref) {
    // `toArray` drops `null`, `undefined` and booleans, so a bar behind a false
    // conditional counts as absent rather than as a child.
    const hasChildren = React.Children.toArray(children).length > 0;
    if (!hasChildren)
        return null;
    const base = typeof offset === 'number' ? `${offset}px` : SPACE_VAR[offset];
    const distance = safeArea ? `calc(${base} + ${SAFE_VAR[side]})` : base;
    return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-sticky": side, ref: ref, className: (0, cn_1.cn)('sticky z-10', EDGE_CLASS[side], filled ? FILL_CLASS[side] : undefined, className), style: { [OFFSET_VAR]: distance, ...style }, ...rest, children: children }));
});
//# sourceMappingURL=StickyV4.js.map