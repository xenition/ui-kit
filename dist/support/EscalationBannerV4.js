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
exports.EscalationBannerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
// critical → danger, warning → warn, info → primary. The role word + glyph carry
// severity so it's never color-alone. Tints are soft (`/10`) to stay calm.
const LEVEL = {
    info: { glyph: 'ℹ', role: 'Notice', bar: 'bg-primary', tint: 'bg-primary/10', accent: 'text-primary', escalateVariant: 'primary' },
    warning: { glyph: '⚠', role: 'Warning', bar: 'bg-warn', tint: 'bg-warn/10', accent: 'text-warn', escalateVariant: 'primary' },
    critical: { glyph: '⛔', role: 'Critical', bar: 'bg-danger', tint: 'bg-danger/10', accent: 'text-danger', escalateVariant: 'danger' },
};
/**
 * EscalationBanner — **V4** "calm console" design (web parity of the native V4).
 * A prominent-but-calm banner: an elevated rounded card with a left severity-
 * accent bar (the signature at-a-glance cue), a leading glyph in a soft-tint
 * chip, and a role word ("Warning"/"Critical") — severity is encoded by glyph
 * **and** color (never color alone), mapping `critical`→danger, `warning`→warn,
 * `info`→primary. Exposes an "Escalate" primary action (`onEscalate`; disabled
 * while `escalating`) and an "Acknowledge" dismiss (`onAcknowledge`); both
 * actions are ≥44px tall. Same props/behavior as {@link EscalationBannerProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
exports.EscalationBannerV4 = React.forwardRef(function EscalationBannerV4({ level = 'warning', title, message, onEscalate, onAcknowledge, escalateLabel = 'Escalate', acknowledgeLabel = 'Acknowledge', escalating = false, className, ...rest }, ref) {
    const spec = LEVEL[level] ?? LEVEL.warning;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "aria-label": `${spec.role}: ${title}${message ? `. ${message}` : ''}`, className: (0, cn_1.cn)('flex overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-1 shrink-0', spec.bar), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-start gap-3 p-3", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-lg font-bold', spec.tint, spec.accent), children: spec.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), message ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: message }) : null, onEscalate || onAcknowledge ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex flex-wrap gap-2", children: [onEscalate ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: spec.escalateVariant, disabled: escalating, onClick: onEscalate, className: "min-h-[44px]", children: escalateLabel })) : null, onAcknowledge ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", onClick: onAcknowledge, className: "min-h-[44px]", children: acknowledgeLabel })) : null] })) : null] })] })] }));
});
//# sourceMappingURL=EscalationBannerV4.js.map