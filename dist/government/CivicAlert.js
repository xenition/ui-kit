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
exports.CivicAlert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const SEVERITY = {
    info: {
        label: 'Information',
        glyph: 'ℹ️',
        container: 'border-primary bg-primary-50',
        text: 'text-primary',
        icon: 'primary',
        button: 'primary',
    },
    // Native `accent` slot folds to `primary` on web (no `accent` token class).
    advisory: {
        label: 'Advisory',
        glyph: '📢',
        container: 'border-primary bg-primary-50',
        text: 'text-primary',
        icon: 'primary',
        button: 'primary',
    },
    warning: {
        label: 'Warning',
        glyph: '⚠️',
        container: 'border-warn bg-warn/10',
        text: 'text-warn',
        icon: 'warn',
        button: 'primary',
    },
    emergency: {
        label: 'Emergency',
        glyph: '🚨',
        container: 'border-danger bg-danger/10',
        text: 'text-danger',
        icon: 'danger',
        button: 'danger',
    },
};
/**
 * An emergency / civic alert banner. Severity is conveyed by **glyph + label +
 * a token color slot** (info → primary, warning → warn, emergency → danger) —
 * never color alone; the severity label is always rendered as text. Uses
 * `role="alert"` so screen readers announce it. Optional primary and dismiss
 * actions are real `<button>`s. Token-bound throughout — no literal colors. Web
 * parity of the native `CivicAlert`.
 */
exports.CivicAlert = React.forwardRef(function CivicAlert({ severity, title, message, source, time, actionLabel = 'View details', onAction, onDismiss, className, ...rest }, ref) {
    const sd = SEVERITY[severity] ?? SEVERITY.info;
    const meta = [source, time].filter((v) => v != null && v !== '').join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "aria-label": `${sd.label}: ${title}`, className: (0, cn_1.cn)('flex items-start gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border p-[var(--xen-space-md)]', sd.container, className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: sd.glyph, size: "xl", color: sd.icon, "aria-label": sd.label }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs font-bold uppercase', sd.text), children: sd.label }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), message != null ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-on-surface", children: message }) : null, meta !== '' ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta }) : null, onAction != null ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: sd.button, onClick: onAction, children: actionLabel }) })) : null] }), onDismiss != null ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Dismiss alert", onClick: onDismiss, className: "shrink-0 rounded-[var(--xen-radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2715", size: "sm", color: "muted", "aria-label": "Dismiss" }) })) : null] }));
});
//# sourceMappingURL=CivicAlert.js.map