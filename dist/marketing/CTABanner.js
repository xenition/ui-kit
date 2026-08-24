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
exports.CTABanner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AuroraBackground_1 = require("./AuroraBackground");
/**
 * Closing gradient band — the same aurora machinery as `GradientHero` in a
 * compact rounded section with a single call to action.
 */
exports.CTABanner = React.forwardRef(function CTABanner({ title, subtitle, action, variant = 'radial', grain = false, pattern = 'none', className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, "data-xen-cta": "", className: (0, cn_1.cn)('relative overflow-hidden bg-surface text-on-surface', 'rounded-[var(--xen-radius-lg)] border border-border', 'px-[var(--xen-space-xl)] py-[var(--xen-space-2xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(AuroraBackground_1.AuroraBackground, { variant: variant, grain: grain, pattern: pattern }), (0, jsx_runtime_1.jsxs)("div", { className: "relative mx-auto flex max-w-3xl flex-col items-center gap-[var(--xen-space-md)] text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-3xl font-bold leading-tight", children: title }), subtitle !== undefined ? (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-muted", children: subtitle }) : null, children, action !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)] flex flex-wrap justify-center gap-[var(--xen-space-sm)]", children: action })) : null] })] }));
});
//# sourceMappingURL=CTABanner.js.map