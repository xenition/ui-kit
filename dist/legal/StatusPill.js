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
/** Soft (tinted) treatment per tone — every value is a `--xen-*` token class. */
const SOFT = {
    neutral: 'bg-neutral-100 text-on-surface',
    primary: 'bg-primary-50 text-primary',
    accent: 'bg-accent-50 text-accent',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
/** Solid (filled) treatment per tone. */
const SOLID = {
    neutral: 'bg-neutral-200 text-on-surface',
    primary: 'bg-primary text-on-primary',
    accent: 'bg-accent text-on-accent',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
/** Inline (chrome-less) treatment — tone text color only. */
const INLINE = {
    neutral: 'text-muted',
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
};
/**
 * Reusable status indicator for the legal module (web) — renders a
 * {@link StatusMeta} as a **glyph + word** pill so state is never conveyed by
 * color alone. Color always resolves from a `--xen-*` token utility class, never
 * a literal. `inline` drops the pill chrome for use inside a dense row. Not
 * domain-specific; every legal block composes it.
 */
exports.StatusPill = React.forwardRef(function StatusPill({ meta, variant = 'soft', size = 'md', className, ...rest }, ref) {
    const inline = variant === 'inline';
    const tone = variant === 'solid' ? SOLID[meta.tone] : inline ? INLINE[meta.tone] : SOFT[meta.tone];
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": meta.label, "data-xen-status-pill": meta.tone, className: (0, cn_1.cn)('inline-flex items-center gap-1 font-semibold leading-none', size === 'sm' ? 'text-xs' : 'text-sm', inline ? '' : 'rounded-full px-2 py-0.5', tone, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: meta.label })] }));
});
//# sourceMappingURL=StatusPill.js.map