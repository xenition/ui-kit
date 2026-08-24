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
exports.LightboxThumb = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const THUMB_CLASS = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
};
/**
 * A filmstrip thumbnail for a lightbox — a small square image with a token
 * accent ring when `active`. Reports its selection through `aria-pressed` (not
 * color alone) and renders a real `<button>` when pressable. Meant to sit in a
 * horizontal scroll strip under a `Lightbox`. Token-only colors.
 */
exports.LightboxThumb = React.forwardRef(function LightboxThumb({ url, alt, active = false, size = 'md', index, onClick, className, ...rest }, ref) {
    const frame = (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100', THUMB_CLASS[size], active ? 'border-2 border-accent opacity-100' : 'border border-border opacity-70', className);
    const img = url ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: onClick ? '' : alt ?? '', loading: "lazy", className: "h-full w-full object-cover" })) : null;
    if (typeof onClick === 'function') {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "data-xen-lightbox-thumb": "", "aria-pressed": active, "aria-label": alt ?? (typeof index === 'number' ? `Photo ${index}` : 'Photo'), onClick: onClick, className: (0, cn_1.cn)(frame, 'block cursor-pointer p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), ...rest, children: img }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-lightbox-thumb": "", className: frame, ...rest, children: img }));
});
//# sourceMappingURL=LightboxThumb.js.map