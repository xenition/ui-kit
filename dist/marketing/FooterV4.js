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
exports.FooterColumnV4 = exports.FooterV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * Footer — **V4** "showcase" design (web parity of the native V4). A refined
 * multi-column marketing footer on `bg-surface` opened by a top hairline: a
 * wider brand/`logo` column beside `FooterColumnV4` link groups, then a
 * bordered bottom bar carrying the legal line + social/`bottom` row. A content
 * section, so NOT a gradient surface. `logo` and `bottom` are node slots. Same
 * props/behavior as {@link FooterProps}; token-only colors, no literals.
 */
exports.FooterV4 = React.forwardRef(function FooterV4({ logo, bottom, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("footer", { ref: ref, "data-xen-footer": "", className: (0, cn_1.cn)('border-t border-border bg-surface text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mx-auto grid max-w-6xl grid-cols-2 gap-[var(--xen-space-xl)] px-[var(--xen-space-lg)] py-[var(--xen-space-2xl)] md:grid-cols-4 lg:grid-cols-5", children: [logo !== undefined ? ((0, jsx_runtime_1.jsx)("div", { className: "col-span-2 flex flex-col gap-[var(--xen-space-md)] md:col-span-4 lg:col-span-2", children: logo })) : null, children] }), bottom !== undefined ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-footer-bottom": "", className: "border-t border-border px-[var(--xen-space-lg)] py-[var(--xen-space-md)]", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-[var(--xen-space-md)] text-sm text-muted", children: bottom }) })) : null] }));
});
/**
 * FooterColumn — **V4** "showcase" design (web parity of the native V4). One
 * refined link group: a bold, uppercase, wide-tracked `title` heading over a
 * column of muted links that brighten to `text-primary` on hover, each link a
 * `≥44px` tap target. `title` honored exactly. Same props/behavior as
 * {@link FooterColumnProps}; token-only colors, no literals.
 */
exports.FooterColumnV4 = React.forwardRef(function FooterColumnV4({ title, className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("nav", { ref: ref, "data-xen-footer-column": "", "aria-label": typeof title === 'string' ? title : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-xs font-extrabold uppercase tracking-widest text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] text-sm text-muted [&_a:hover]:text-primary [&_a]:inline-flex [&_a]:min-h-[44px] [&_a]:items-center [&_a]:transition-colors", children: children })] }));
});
//# sourceMappingURL=FooterV4.js.map