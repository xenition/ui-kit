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
exports.GradientHero = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AuroraBackground_1 = require("./AuroraBackground");
/**
 * Full-bleed marketing hero over an animated aurora gradient. Everything is
 * token-driven: the aurora reads the primary/accent ramps, text reads the
 * semantic slots — dark mode is just the flipped variables.
 */
exports.GradientHero = React.forwardRef(function GradientHero({ eyebrow, title, subtitle, actions, media, variant = 'aurora', grain = false, pattern = 'none', align = 'center', className, children, ...rest }, ref) {
    const centered = align === 'center';
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, "data-xen-hero": "", className: (0, cn_1.cn)('relative overflow-hidden bg-surface text-on-surface', 'px-[var(--xen-space-lg)] py-[calc(var(--xen-space-2xl)*2)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)(AuroraBackground_1.AuroraBackground, { variant: variant, grain: grain, pattern: pattern }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative mx-auto flex max-w-5xl flex-col gap-[var(--xen-space-lg)]', centered ? 'items-center text-center' : 'items-start text-left'), children: [eyebrow !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "font-heading text-sm font-semibold uppercase tracking-widest text-primary", children: eyebrow })) : null, (0, jsx_runtime_1.jsx)("h1", { className: "font-heading font-bold leading-tight", style: { fontSize: 'clamp(var(--xen-text-3xl), 6vw, calc(var(--xen-text-3xl) * 1.9))' }, children: title }), subtitle !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "max-w-2xl text-lg text-muted", children: subtitle })) : null, actions !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-wrap gap-[var(--xen-space-sm)]', centered && 'justify-center'), children: actions })) : null, children, media !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xl)] w-full", children: media })) : null] })] }));
});
//# sourceMappingURL=GradientHero.js.map