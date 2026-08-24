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
exports.WeatherAlert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const SEVERITY = {
    advisory: { tone: 'warn', glyph: 'ℹ️', label: 'Advisory' },
    watch: { tone: 'warn', glyph: '⚠️', label: 'Watch' },
    warning: { tone: 'danger', glyph: '⚠️', label: 'Warning' },
    emergency: { tone: 'danger', glyph: '🚨', label: 'Emergency' },
};
/** Left-rail border color, keyed by severity tone (token classes only). */
const TONE_RAIL = {
    warn: 'border-l-warn',
    danger: 'border-l-danger',
};
/** Translucent surface tint derived from the tone token via `color-mix` (no literal color). */
const TONE_TINT = {
    warn: 'bg-[color-mix(in_srgb,var(--xen-warn)_12%,transparent)]',
    danger: 'bg-[color-mix(in_srgb,var(--xen-danger)_12%,transparent)]',
};
/**
 * Banner for a weather advisory (web parity of the native `WeatherAlert`). The
 * severity drives the token tone (warn for advisory/watch, danger for
 * warning/emergency) but is ALSO spelled out with a glyph + a text severity
 * `Badge`, so it never relies on color alone. The surface is a token tint with a
 * matching left rail. Pass `onClick` to make the banner tappable
 * (keyboard-activatable) and `onDismiss` to render a separate dismiss button.
 * All colors come from the `--xen-*` tokens via Tailwind classes.
 */
exports.WeatherAlert = React.forwardRef(function WeatherAlert({ title, description, severity = 'advisory', until, onDismiss, className, onKeyDown, ...rest }, ref) {
    const meta = SEVERITY[severity];
    const clickable = rest.onClick != null;
    const interactive = clickable
        ? {
            role: 'button',
            tabIndex: 0,
            onKeyDown: (e) => {
                onKeyDown?.(e);
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    rest.onClick?.(e);
                }
            },
        }
        : { role: 'alert', onKeyDown };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label}: ${title}`, className: (0, cn_1.cn)('flex flex-row gap-2 rounded-[var(--xen-radius-md)] border-l-4 p-[var(--xen-space-md)]', TONE_RAIL[meta.tone], TONE_TINT[meta.tone], clickable && 'cursor-pointer', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "lg", "aria-label": meta.label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, className: "uppercase", children: meta.label }), (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-base font-bold text-on-surface", children: title }), description ? (0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-on-surface", children: description }) : null, until ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-muted", children: ["Until ", until] }) : null] }), onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss alert", onClick: (e) => {
                    e.stopPropagation();
                    onDismiss();
                }, className: "shrink-0 rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2715", size: "sm", color: "muted", "aria-label": "Dismiss" }) })) : null] }));
});
//# sourceMappingURL=WeatherAlert.js.map