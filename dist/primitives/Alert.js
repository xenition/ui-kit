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
exports.Alert = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
/** Subtle look — `border-{tone} text-{tone}` for the left rule + title. Historical. */
const SUBTLE = {
    info: 'border-primary text-primary',
    success: 'border-success text-success',
    warn: 'border-warn text-warn',
    danger: 'border-danger text-danger',
};
/** Solid fill: tone background with on-tone text. */
const SOLID_CONTAINER = {
    info: 'bg-primary text-on-primary',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
const SOLID_TEXT = {
    info: 'text-on-primary',
    success: 'text-on-success',
    warn: 'text-on-warn',
    danger: 'text-on-danger',
};
/** Outline: full ring in the tone color. */
const OUTLINE_BORDER = {
    info: 'border-primary',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
};
const TONE_TEXT = {
    info: 'text-primary',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
};
/**
 * Inline, optionally dismissible alert bound to the theme tokens —
 * info/success/warn/danger. The default (`subtle`) renders exactly as before;
 * `solid` (filled) and `outline` (full ring) variants and an optional trailing
 * `action` are additive opt-ins mirroring the native `Alert`. No literal colors.
 */
exports.Alert = React.forwardRef(function Alert({ className, tone = 'info', variant = 'subtle', title, onClose, icon, action, children, ...rest }, ref) {
    const solid = variant === 'solid';
    const container = variant === 'solid'
        ? (0, cn_1.cn)('flex gap-3 rounded-[var(--xen-radius-md)] p-3', SOLID_CONTAINER[tone])
        : variant === 'outline'
            ? (0, cn_1.cn)('flex gap-3 rounded-[var(--xen-radius-md)] border bg-surface p-3', OUTLINE_BORDER[tone])
            : (0, cn_1.cn)('flex gap-3 rounded-[var(--xen-radius-md)] border-l-4 bg-neutral-50 p-3', SUBTLE[tone]);
    const titleColor = solid ? SOLID_TEXT[tone] : variant === 'outline' ? TONE_TEXT[tone] : SUBTLE[tone];
    const bodyColor = solid ? SOLID_TEXT[tone] : 'text-on-surface';
    const closeColor = solid
        ? (0, cn_1.cn)(SOLID_TEXT[tone], 'opacity-80 transition-opacity hover:opacity-100')
        : 'text-muted transition-colors hover:text-on-surface';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: tone === 'danger' ? 'alert' : 'status', className: (0, cn_1.cn)(container, className), ...rest, children: [icon != null && (0, jsx_runtime_1.jsx)("span", { className: "mt-0.5 shrink-0", children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('min-w-0 flex-1', bodyColor), children: [title != null && (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('text-sm font-semibold', titleColor), children: title }), children != null && (0, jsx_runtime_1.jsx)("div", { className: "text-sm", children: children }), action != null && (0, jsx_runtime_1.jsx)("div", { className: "mt-2", children: action })] }), onClose && ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClose, "aria-label": "Dismiss", className: (0, cn_1.cn)('shrink-0', closeColor), children: "\u00D7" }))] }));
});
//# sourceMappingURL=Alert.js.map