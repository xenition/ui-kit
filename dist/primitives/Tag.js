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
exports.Tag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Historical fill look — preserved exactly for `variant="solid"` (the default). */
const SOLID = {
    neutral: 'bg-neutral-100 text-on-surface',
    primary: 'bg-primary-50 text-primary',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
    accent: 'bg-accent text-on-accent',
};
/** Soft tint. success/warn/danger have no `-50` ramp → neutral bg + colored text. */
const SOFT = {
    neutral: 'bg-neutral-100 text-on-surface',
    primary: 'bg-primary-50 text-primary',
    accent: 'bg-accent-50 text-accent',
    success: 'bg-neutral-100 text-success',
    warn: 'bg-neutral-100 text-warn',
    danger: 'bg-neutral-100 text-danger',
};
const OUTLINE = {
    neutral: 'border border-border text-on-surface',
    primary: 'border border-primary text-primary',
    accent: 'border border-accent text-accent',
    success: 'border border-success text-success',
    warn: 'border border-warn text-warn',
    danger: 'border border-danger text-danger',
};
const VARIANT = {
    solid: SOLID,
    soft: SOFT,
    outline: OUTLINE,
};
const DOT = {
    neutral: 'bg-on-surface',
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
};
const SIZE = {
    sm: 'px-1.5 py-px',
    md: 'px-2 py-0.5',
};
const DOT_SIZE = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
};
/**
 * Removable chip/tag bound to the theme tokens — for filters, keywords,
 * multi-select values. The default (`neutral`, `solid`, `md`) renders exactly
 * as before; the `accent` tone, `soft`/`outline` variants, `sm` size, a leading
 * `dot`, and a `removable` flag (× also shows whenever `onRemove` is set) are
 * additive opt-ins mirroring the native `Tag`. No literal colors.
 */
exports.Tag = React.forwardRef(function Tag({ className, tone = 'neutral', variant = 'solid', size = 'md', removable = false, dot = false, onRemove, children, ...rest }, ref) {
    const showRemove = removable || onRemove != null;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-[var(--xen-radius-sm)] text-xs font-medium', SIZE[size], VARIANT[variant][tone], className), ...rest, children: [dot && ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('inline-block shrink-0 rounded-full', DOT_SIZE[size], DOT[tone]) })), children, showRemove && ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Remove", onClick: onRemove, className: "ml-0.5 opacity-70 transition-opacity hover:opacity-100", children: "\u00D7" }))] }));
});
//# sourceMappingURL=Tag.js.map