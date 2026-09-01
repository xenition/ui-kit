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
exports.FeatureCardV4 = exports.FeatureGridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const COLUMN_CLASSES = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
};
/**
 * FeatureGrid — **V4** "showcase" design (web parity of the native V4). A content
 * section, so NOT a gradient surface: a responsive grid of clean, elevated
 * `FeatureCardV4`s on the page ground, with generous 8-pt gutters. Same
 * props/behavior as {@link FeatureGridProps} (`columns` drives the breakpoint
 * grid); token-only colors, no literals.
 */
exports.FeatureGridV4 = React.forwardRef(function FeatureGridV4({ columns = 3, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-feature-grid": "", className: (0, cn_1.cn)('grid grid-cols-1 gap-[var(--xen-space-lg)]', COLUMN_CLASSES[columns], className), ...rest }));
});
/**
 * FeatureCard — **V4** "showcase" design (web parity of the native V4). One
 * feature as an elevated rounded card: an icon in a soft-primary well, an
 * extra-bold tight-tracked title, and muted body copy (children). The base's
 * `hoverLift` prop is honored as a subtle `hover:shadow-md` lift. Same
 * props/behavior as {@link FeatureCardProps}; token-only colors, no literals.
 */
exports.FeatureCardV4 = React.forwardRef(function FeatureCardV4({ icon, title, hoverLift = true, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-feature-card": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] text-on-surface', 'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)] shadow-sm', hoverLift && 'transition-shadow duration-300 hover:shadow-md', className), ...rest, children: [icon !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/10 text-primary", children: icon })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-lg font-extrabold leading-tight tracking-tight", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm leading-relaxed text-muted", children: children })] }));
});
//# sourceMappingURL=FeatureGridV4.js.map