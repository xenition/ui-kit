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
exports.StatusPill = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * Reusable status indicator for the POS module — the DOM parity of the native
 * `StatusPill`. Renders a {@link StatusMeta} as a **glyph + word** so state is
 * never conveyed by color alone. Color always resolves from a `--xen-*` token
 * class, never a literal. `inline` drops the pill chrome for dense rows. Every
 * POS block composes it, so tender / ticket / refund state reads the same.
 */
exports.StatusPill = React.forwardRef(function StatusPill({ meta, variant = 'soft', size = 'md', className, ...rest }, ref) {
    const inline = variant === 'inline';
    const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
    const toneClass = inline
        ? internal_1.TONE_TEXT[meta.tone]
        : variant === 'solid'
            ? internal_1.TONE_SOLID[meta.tone]
            : internal_1.TONE_SOFT[meta.tone];
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": meta.label, "data-xen-status-pill": "", className: (0, cn_1.cn)('inline-flex items-center gap-1 font-semibold', textSize, inline ? '' : 'rounded-full px-2 py-0.5', toneClass, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: meta.label })] }));
});
//# sourceMappingURL=StatusPill.js.map