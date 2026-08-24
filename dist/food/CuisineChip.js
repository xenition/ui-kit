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
exports.CuisineChip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * A pill chip for a cuisine / category filter. When `onClick` is given it is a
 * real `<button>` filter toggle whose selected state is carried in
 * `aria-pressed` (never signalled by color alone); without `onClick` it is a
 * static label. Selected chips use the `primary`/`on-primary` token pair. Web
 * parity of the native `CuisineChip`; token-only.
 */
exports.CuisineChip = React.forwardRef(function CuisineChip({ label, glyph, selected = false, onClick, disabled = false, size = 'md', className }, ref) {
    const sizeClass = size === 'sm' ? 'px-[var(--xen-space-sm)] py-1 text-xs' : 'px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm';
    const chipClass = (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] self-start rounded-full border font-semibold', sizeClass, selected ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface', disabled && 'opacity-50', className);
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [glyph ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "xs" }) : null, (0, jsx_runtime_1.jsx)("span", { children: label })] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-pressed": selected, disabled: disabled, onClick: onClick, className: (0, cn_1.cn)(chipClass, 'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', !selected && !disabled && 'hover:bg-neutral-100', disabled && 'pointer-events-none'), children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, className: chipClass, children: inner }));
});
//# sourceMappingURL=CuisineChip.js.map