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
exports.ContainerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
/**
 * Gutter classes with the safe-area inset folded in.
 *
 * Written out per key rather than built from a template literal because
 * Tailwind's scanner is static and cannot see an interpolated string — the same
 * reason `_tokens.ts` spells its maps out in full. Every length in here is a
 * `--xen-*` token or the browser's own `env()`; the `0px` is the fallback an
 * `env()` needs so the whole declaration does not drop on a browser without
 * safe-area support, and zero is not a spacing decision.
 */
const SAFE_PX = {
    xs: 'pl-[calc(var(--xen-space-xs)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-xs)+env(safe-area-inset-right,0px))]',
    sm: 'pl-[calc(var(--xen-space-sm)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-sm)+env(safe-area-inset-right,0px))]',
    md: 'pl-[calc(var(--xen-space-md)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-md)+env(safe-area-inset-right,0px))]',
    lg: 'pl-[calc(var(--xen-space-lg)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-lg)+env(safe-area-inset-right,0px))]',
    xl: 'pl-[calc(var(--xen-space-xl)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-xl)+env(safe-area-inset-right,0px))]',
    '2xl': 'pl-[calc(var(--xen-space-2xl)+env(safe-area-inset-left,0px))] pr-[calc(var(--xen-space-2xl)+env(safe-area-inset-right,0px))]',
};
/**
 * **V4 container** — the web twin of the native `ContainerV4`, the base
 * `Container`'s props plus two, a different design line.
 *
 * This is the page-gutter component and the anchor for the brief's §4.1
 * rhythm: `padding="lg"` (24) is the distance from the screen edge to the
 * content, everywhere, and no other component in `layout` gets to invent one.
 * That default is already right, so V4 does not move it.
 *
 * ## What V4 changes
 *
 * 1. **`maxWidth` can be turned off.** The base types it as `number`, so the
 *    only way out of the 480 cap was to pass a number large enough to be a lie.
 *    `'none'` says what it means, and the doc comment now records that 480 is a
 *    *reading measure* rather than a page width — the reason a dashboard at the
 *    default looks stranded on a tablet.
 * 2. **`safeArea` exists.** See the prop. Off by default, because turning it on
 *    for every existing caller would move their layout.
 *
 * Everything else is the base: `w-full mx-auto`, the gutter off `--xen-space-*`,
 * and the numeric cap as the one layout literal (a caller's own number, not a
 * value this file chose). It paints nothing — no ground, no border, no radius —
 * so there is no state layer, no motion sheet and no depth here. A container
 * that acknowledged a pointer would be a container doing something it is not
 * for.
 *
 * ### Platform divergence
 *
 * None in the props. `safeArea` reads the device insets through
 * `useSafeAreaInsets()` on native and through CSS `env(safe-area-inset-*)` here;
 * both add the inset to the gutter, so the two twins land on the same number on
 * the same device. Documented identically in `src/native/layout/ContainerV4.tsx`.
 */
exports.ContainerV4 = React.forwardRef(function ContainerV4({ maxWidth = 480, padding = 'lg', safeArea = false, className, style, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-container": "", className: (0, cn_1.cn)('w-full mx-auto', safeArea ? SAFE_PX[padding] : _tokens_1.SPACE_PX[padding], className), style: maxWidth === 'none' ? style : { maxWidth, ...style }, ...rest }));
});
//# sourceMappingURL=ContainerV4.js.map