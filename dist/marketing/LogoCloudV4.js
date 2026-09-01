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
exports.LogoCloudV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * LogoCloud — **V4** "showcase" design (web parity of the native V4). A tidy,
 * refined logo strip: an optional muted "Trusted by…" `label` above a soft,
 * evenly-spaced row of `children` logo slots rendered in a muted, desaturated
 * tone that lifts to full color on hover/focus. An optional continuous marquee
 * drift keeps a long strip alive; it is a decorative flourish, so it is dropped
 * under `prefers-reduced-motion: reduce` (the strip simply wraps and centers).
 * NOT a brand-gradient surface — clean and understated. Same props/behavior as
 * {@link LogoCloudProps}; every color is a `--xen-*` token (`text-muted`) — no
 * literals.
 */
exports.LogoCloudV4 = React.forwardRef(function LogoCloudV4({ label, className, children, ...rest }, ref) {
    const items = React.Children.toArray(children);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-logo-cloud": "", className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-lg)]', className), ...rest, children: [label !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold uppercase tracking-[0.2em] text-muted", children: label })) : null, (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-wrap items-center justify-center', 'gap-x-[var(--xen-space-2xl)] gap-y-[var(--xen-space-lg)]', 'motion-safe:sm:animate-[xen-logocloud-drift_28s_linear_infinite] motion-safe:sm:flex-nowrap motion-safe:sm:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'), children: items.map((child, index) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-logo": "", className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center text-muted opacity-70 grayscale', 'transition-all duration-200 hover:text-on-surface hover:opacity-100 hover:grayscale-0', 'focus-within:text-on-surface focus-within:opacity-100 focus-within:grayscale-0'), children: child }, index))) }), (0, jsx_runtime_1.jsx)("style", { children: XEN_LOGOCLOUD_CSS })] }));
});
/**
 * Marquee keyframes live in an injected sheet so the geometry carries no color.
 * Gated at the class level by Tailwind's `motion-safe:` variant, so
 * `prefers-reduced-motion: reduce` never starts the drift.
 */
const XEN_LOGOCLOUD_CSS = `
@keyframes xen-logocloud-drift {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
`;
//# sourceMappingURL=LogoCloudV4.js.map