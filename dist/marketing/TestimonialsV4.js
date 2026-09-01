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
exports.TestimonialV4 = exports.TestimonialsV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Marquee_1 = require("../motion/Marquee");
const cn_1 = require("../primitives/cn");
const Testimonials_1 = require("./Testimonials");
/**
 * Testimonials — **V4** "showcase" design (web parity of the native V4). A
 * content section, so NOT a gradient surface: the layout container for
 * `TestimonialV4` quote cards. Honors the base's `mode` (`grid` default, or an
 * infinite `marquee` loop) and `speed`. Same props/behavior as
 * {@link TestimonialsProps}; token-only colors, no literals.
 */
exports.TestimonialsV4 = React.forwardRef(function TestimonialsV4({ mode = 'grid', speed, className, children, ...rest }, ref) {
    if (mode === 'marquee') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-testimonials": "marquee", className: className, ...rest, children: (0, jsx_runtime_1.jsx)(Marquee_1.Marquee, { speed: speed, children: children }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-testimonials": "grid", className: (0, cn_1.cn)('grid grid-cols-1 gap-[var(--xen-space-lg)] sm:grid-cols-2 lg:grid-cols-3', className), ...rest, children: children }));
});
/**
 * Testimonial — **V4** "showcase" design (web parity of the native V4). A clean,
 * elevated quote card: the quote (`children`) over a caption of an avatar (or
 * initials derived from `name`), an extra-bold name, and a muted role line. Same
 * props/behavior as {@link TestimonialProps}; token-only colors, no literals.
 */
exports.TestimonialV4 = React.forwardRef(function TestimonialV4({ name, role, avatar, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("figure", { ref: ref, "data-xen-testimonial": "", className: (0, cn_1.cn)('flex w-72 shrink-0 flex-col gap-[var(--xen-space-md)] text-on-surface sm:w-auto', 'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] shadow-sm', 'transition-shadow duration-300 hover:shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("blockquote", { className: "text-sm leading-relaxed", children: children }), (0, jsx_runtime_1.jsxs)("figcaption", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [avatar !== undefined ? (avatar) : ((0, jsx_runtime_1.jsx)("span", { "data-xen-avatar-initials": "", "aria-hidden": "true", className: "flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary/10 text-sm font-semibold text-primary", children: (0, Testimonials_1.initialsFromName)(name) })), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-extrabold tracking-tight", children: name }), role !== undefined ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: role }) : null] })] })] }));
});
//# sourceMappingURL=TestimonialsV4.js.map