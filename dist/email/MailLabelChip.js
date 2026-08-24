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
exports.MailLabelChip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SOFT = {
    neutral: 'bg-neutral-100 text-on-surface',
    primary: 'bg-primary-50 text-primary',
    accent: 'bg-accent-50 text-accent',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
const SOLID = {
    neutral: 'bg-muted text-surface',
    primary: 'bg-primary text-on-primary',
    accent: 'bg-accent text-on-accent',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
const OUTLINE = {
    neutral: 'bg-transparent border border-border text-muted',
    primary: 'bg-transparent border border-primary text-primary',
    accent: 'bg-transparent border border-accent text-accent',
    success: 'bg-transparent border border-success text-success',
    warn: 'bg-transparent border border-warn text-warn',
    danger: 'bg-transparent border border-danger text-danger',
};
const VARIANT = {
    soft: SOFT,
    solid: SOLID,
    outline: OUTLINE,
};
/**
 * A colored label / category chip for mail (Gmail-style labels). `tone` selects
 * a semantic slot and `variant` picks a fill: `soft` tints the tone, `solid`
 * fills it, `outline` rings it — every color resolved from a `--xen-*` token
 * class. Optionally removable via `onRemove` (a real button); the whole chip is
 * clickable via `onClick`. No literal colors.
 */
exports.MailLabelChip = React.forwardRef(function MailLabelChip({ label, tone = 'neutral', variant = 'soft', glyph, onRemove, onClick, className }, ref) {
    const toneClasses = VARIANT[variant][tone];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs leading-none", children: glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: "truncate", children: label })] }));
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, className: (0, cn_1.cn)('inline-flex max-w-full items-center gap-[var(--xen-space-xs)] self-start rounded-full px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold', toneClasses, className), children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Label ${label}`, onClick: onClick, className: "inline-flex items-center gap-[var(--xen-space-xs)] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: inner })) : ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)]", children: inner })), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove label ${label}`, onClick: onRemove, className: "ml-0.5 inline-flex leading-none opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: "\u00D7" })) : null] }));
});
//# sourceMappingURL=MailLabelChip.js.map