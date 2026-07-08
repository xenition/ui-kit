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
exports.Testimonial = exports.Testimonials = void 0;
exports.initialsFromName = initialsFromName;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Marquee_1 = require("../motion/Marquee");
const cn_1 = require("../primitives/cn");
/** Layout container for `Testimonial` cards. */
exports.Testimonials = React.forwardRef(function Testimonials({ mode = 'grid', speed, className, children, ...rest }, ref) {
    if (mode === 'marquee') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-testimonials": "marquee", className: className, ...rest, children: (0, jsx_runtime_1.jsx)(Marquee_1.Marquee, { speed: speed, children: children }) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-testimonials": "grid", className: (0, cn_1.cn)('grid grid-cols-1 gap-[var(--xen-space-lg)] sm:grid-cols-2 lg:grid-cols-3', className), ...rest, children: children }));
});
/** Derive up to two initials from a display name. */
function initialsFromName(name) {
    return name
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0))
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}
/** One quote card. The quote itself is `children`. */
exports.Testimonial = React.forwardRef(function Testimonial({ name, role, avatar, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("figure", { ref: ref, "data-xen-testimonial": "", className: (0, cn_1.cn)('flex w-72 shrink-0 flex-col gap-[var(--xen-space-md)] border border-border bg-surface text-on-surface sm:w-auto', 'rounded-[var(--xen-radius-lg)] p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("blockquote", { className: "text-sm leading-relaxed", children: children }), (0, jsx_runtime_1.jsxs)("figcaption", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [avatar !== undefined ? (avatar) : ((0, jsx_runtime_1.jsx)("span", { "data-xen-avatar-initials": "", "aria-hidden": "true", className: "flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary-100 text-sm font-semibold text-primary-700", children: initialsFromName(name) })), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", children: name }), role !== undefined ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: role }) : null] })] })] }));
});
//# sourceMappingURL=Testimonials.js.map