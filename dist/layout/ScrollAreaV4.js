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
exports.ScrollAreaV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
const OVERFLOW_CLASSES = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
    both: 'overflow-auto',
};
/**
 * The bottom padding when the region pays the safe-area inset: the chosen
 * spacing token **plus** `env(safe-area-inset-bottom)`.
 *
 * Written out as whole literals because Tailwind's content scanner reads
 * source text and cannot follow a composed string — the same shape
 * `AuthStickyFooterV4` uses for the sticky CTA band, so a scroll region and
 * the footer pinned below it clear the home indicator by the same amount.
 *
 * `env(safe-area-inset-bottom)` is 0 wherever there is no inset — a desktop
 * browser, an Android device with on-screen keys — so this needs no media
 * query and no branch: one expression is correct everywhere.
 */
const PAD_SAFE_BOTTOM = {
    none: 'pb-[env(safe-area-inset-bottom)]',
    xs: 'pb-[calc(var(--xen-space-xs)_+_env(safe-area-inset-bottom))]',
    sm: 'pb-[calc(var(--xen-space-sm)_+_env(safe-area-inset-bottom))]',
    md: 'pb-[calc(var(--xen-space-md)_+_env(safe-area-inset-bottom))]',
    lg: 'pb-[calc(var(--xen-space-lg)_+_env(safe-area-inset-bottom))]',
    xl: 'pb-[calc(var(--xen-space-xl)_+_env(safe-area-inset-bottom))]',
    '2xl': 'pb-[calc(var(--xen-space-2xl)_+_env(safe-area-inset-bottom))]',
};
/**
 * **V4 scroll area** — the web twin of the native `ScrollAreaV4`, the base's
 * props plus `padding="none"` and safe-area handling.
 *
 * §5 calls this one "structure and parity only, no visual change", and nothing
 * here moves a default: the same `axis`, the same `padding="lg"`, the same
 * `filled`.
 *
 * ## What V4 changes
 *
 * **Parity with native.** The base pair diverged: web had `axis`, native did
 * not, so the same scrolling carousel needed two different call shapes on the
 * two platforms. `axis` is now on both twins (§1.3).
 *
 * **`padding="none"` exists.** The base's `SpaceKey` had no zero, so full-bleed
 * content — a row list whose rows carry §4.3's own `spacing.md`, a chip row
 * bleeding to the screen edge — had to fight the region's `lg` with a negative
 * margin. It is a real layout choice, so it gets a real value.
 *
 * **It can clear the home indicator.** HIG asks a scroll region to respect the
 * system safe areas and the base read none, so the final row of a full-height
 * list sat under the home indicator with no way to scroll it out. `safeArea`
 * adds `env(safe-area-inset-bottom)` to the content's bottom padding, the same
 * expression `AuthStickyFooterV4` uses — one approach to the inset across the
 * kit, not two.
 *
 * ## What it deliberately does not do
 *
 * **No shadow, no scroll-edge line.** §4.6 gives a shadow to a card, a sheet
 * and the one dominant action; a scroll region is none of the three. §4.4:
 * between free-standing blocks, space rather than a rule.
 *
 * **An empty region still draws.** §4.5's "render nothing" is about a
 * component with nothing to *say*; a scroll region is a viewport the caller
 * has sized, and collapsing it would take the page's scroll with it. With no
 * children it paints nothing but its own optional `surface` and takes up the
 * room it was given.
 */
exports.ScrollAreaV4 = React.forwardRef(function ScrollAreaV4({ axis = 'vertical', padding = 'lg', filled = false, safeArea = false, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-scroll": "", ref: ref, className: (0, cn_1.cn)(OVERFLOW_CLASSES[axis], padding === 'none' ? undefined : _tokens_1.SPACE_P[padding], safeArea ? PAD_SAFE_BOTTOM[padding] : undefined, filled ? 'bg-surface text-on-surface' : undefined, className), ...rest }));
});
//# sourceMappingURL=ScrollAreaV4.js.map