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
exports.LightboxThumbV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Studio mat sizes — both stay ≥44px so a pressable thumb is a valid tap target. */
const THUMB_CLASS = {
    sm: 'h-14 w-14', // 56px
    md: 'h-20 w-20', // 80px
};
/**
 * LightboxThumb — **V4** "studio" design (web parity of the native V4). A
 * **matted** filmstrip thumbnail — the photo sits inside a thin inset mat ring
 * (`ring-1 ring-inset ring-border`) over a `bg-neutral-100` ground, with **no
 * gradient** (the studio line reserves gradient for the gallery hero). When
 * `active`, the mat ring turns primary and a small `✓` glyph badge appears, so
 * selection is never carried by color alone; it is also reported via
 * `aria-pressed`. Both `sm` (56px) and `md` (80px) sizes are honored and stay
 * ≥44px so a pressable thumb is a valid tap target. Renders a real keyboard-
 * operable `<button>` when `onClick` is set. Identical props/behavior to
 * {@link LightboxThumbProps}; all colors from `--xen-*` token classes.
 */
exports.LightboxThumbV4 = React.forwardRef(function LightboxThumbV4({ url, alt, active = false, size = 'md', index, onClick, className, ...rest }, ref) {
    const frame = (0, cn_1.cn)('relative overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset transition-shadow', THUMB_CLASS[size], active ? 'ring-2 ring-primary opacity-100' : 'ring-border opacity-80', className);
    const media = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [url ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: onClick ? '' : alt ?? '', loading: "lazy", className: "h-full w-full object-cover" })) : null, active ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "absolute right-1 top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-on-primary", children: "\u2713" })) : null] }));
    if (typeof onClick === 'function') {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "data-xen-lightbox-thumb": "", "aria-pressed": active, "aria-label": alt ?? (typeof index === 'number' ? `Photo ${index}` : 'Photo'), onClick: onClick, className: (0, cn_1.cn)(frame, 'block cursor-pointer p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), ...rest, children: media }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-lightbox-thumb": "", className: frame, ...rest, children: media }));
});
//# sourceMappingURL=LightboxThumbV4.js.map