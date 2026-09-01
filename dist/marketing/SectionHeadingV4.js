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
exports.SectionHeadingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * SectionHeading — **V4** "showcase" design (web parity of the native V4). NOT
 * a gradient surface: a clean, refined section opener with a strong soft-primary
 * eyebrow chip, an extra-bold tight-tracked heading, and a muted supporting
 * lede. Honors every prop of {@link SectionHeadingProps}
 * (`eyebrow`/`title`/`lede`/`align`/`as` heading level); token-only colors, no
 * literals.
 */
exports.SectionHeadingV4 = React.forwardRef(function SectionHeadingV4({ eyebrow, title, lede, align = 'left', as: Heading = 'h2', className, ...rest }, ref) {
    const centered = align === 'center';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-section-heading": "", className: (0, cn_1.cn)('flex max-w-3xl flex-col gap-[var(--xen-space-sm)]', centered && 'mx-auto items-center text-center', className), ...rest, children: [eyebrow !== undefined ? ((0, jsx_runtime_1.jsx)("p", { className: "inline-flex items-center rounded-[var(--xen-radius-full)] bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] font-heading text-sm font-semibold uppercase tracking-widest text-primary", children: eyebrow })) : null, (0, jsx_runtime_1.jsx)(Heading, { className: "font-heading text-3xl font-extrabold leading-tight tracking-tight text-on-surface", children: title }), lede !== undefined ? (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-muted", children: lede }) : null] }));
});
//# sourceMappingURL=SectionHeadingV4.js.map