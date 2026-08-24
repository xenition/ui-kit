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
exports.FeatureSplit = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const GenerativeCover_1 = require("./GenerativeCover");
/** Alternating image/text feature row — two columns on desktop, stacked on mobile. */
exports.FeatureSplit = React.forwardRef(function FeatureSplit({ eyebrow, title, description, bullets, media, reverse = false, action, className, ...rest }, ref) {
    const seed = typeof title === 'string' ? title : 'feature';
    const mediaNode = media !== undefined ? media : ((0, jsx_runtime_1.jsx)("div", { className: "aspect-video overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-100", children: (0, jsx_runtime_1.jsx)(GenerativeCover_1.GenerativeCover, { seed: seed, className: "h-full w-full" }) }));
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, "data-xen-feature-split": "", className: (0, cn_1.cn)('grid grid-cols-1 items-center gap-[var(--xen-space-xl)] lg:grid-cols-2', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-feature-split-media": "", className: (0, cn_1.cn)(reverse && 'lg:order-2'), children: mediaNode }), (0, jsx_runtime_1.jsxs)("div", { "data-xen-feature-split-copy": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', reverse && 'lg:order-1'), children: [eyebrow !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "font-heading text-xs font-bold uppercase tracking-[0.22em] text-accent", children: eyebrow })) : null, (0, jsx_runtime_1.jsx)("h2", { className: "font-heading text-3xl font-bold leading-tight text-on-surface", children: title }), description !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "text-lg leading-relaxed text-muted", children: description })) : null, bullets && bullets.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: bullets.map((bullet, i) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start gap-[var(--xen-space-sm)] text-on-surface", children: [(0, jsx_runtime_1.jsx)("svg", { "aria-hidden": "true", viewBox: "0 0 20 20", className: "mt-0.5 h-5 w-5 shrink-0 text-primary", fill: "none", stroke: "currentColor", strokeWidth: 2, children: (0, jsx_runtime_1.jsx)("path", { d: "M5 10.5l3.5 3.5L15 6", strokeLinecap: "round", strokeLinejoin: "round" }) }), (0, jsx_runtime_1.jsx)("span", { children: bullet })] }, i))) })) : null, action !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)] flex flex-wrap gap-[var(--xen-space-sm)]", children: action })) : null] })] }));
});
//# sourceMappingURL=FeatureSplit.js.map