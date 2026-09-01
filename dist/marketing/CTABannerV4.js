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
exports.CTABannerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AuroraBackground_1 = require("./AuroraBackground");
/**
 * CTABanner — **V4** "showcase" design (web parity of the native V4). The bold,
 * conversion-forward closing band: a vibrant primary→accent brand gradient
 * ground carrying a big extra-bold near-white headline, a soft supporting line,
 * and a centered call-to-action. The base's `AuroraBackground` is kept as a
 * subtle texture overlay so `variant`/`grain`/`pattern` still apply. Same
 * props/behavior as {@link CTABannerProps}; every color is a `--xen-*` token
 * (`from-primary-500`, `to-accent-500`, `text-primary-50`) — no literals.
 */
exports.CTABannerV4 = React.forwardRef(function CTABannerV4({ title, subtitle, action, variant = 'radial', grain = false, pattern = 'none', className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, "data-xen-cta": "", className: (0, cn_1.cn)('relative isolate overflow-hidden rounded-[var(--xen-radius-lg)] shadow-lg', 'bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 text-primary-50', 'px-[var(--xen-space-xl)] py-[var(--xen-space-2xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-0 -z-10 opacity-60", children: (0, jsx_runtime_1.jsx)(AuroraBackground_1.AuroraBackground, { variant: variant, grain: grain, pattern: pattern }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative mx-auto flex max-w-3xl flex-col items-center gap-[var(--xen-space-md)] text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-3xl font-extrabold leading-tight tracking-tight text-primary-50 sm:text-4xl", children: title }), subtitle !== undefined ? (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-primary-100", children: subtitle }) : null, children, action !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)] flex flex-wrap justify-center gap-[var(--xen-space-sm)]", children: action })) : null] })] }));
});
//# sourceMappingURL=CTABannerV4.js.map