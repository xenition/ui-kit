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
exports.EscalationBanner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
// critical → danger, warning → warn, info → primary. The role word + glyph carry
// severity so it's never color-alone.
const LEVEL = {
    info: { glyph: 'ℹ', role: 'Notice', iconColor: 'primary', borderCls: 'border-l-primary', escalateVariant: 'primary' },
    warning: { glyph: '⚠', role: 'Warning', iconColor: 'warn', borderCls: 'border-l-warn', escalateVariant: 'primary' },
    critical: { glyph: '⛔', role: 'Critical', iconColor: 'danger', borderCls: 'border-l-danger', escalateVariant: 'danger' },
};
/**
 * A prominent escalation banner for at-risk / breached tickets. Severity is
 * shown by a leading glyph, a role word ("Warning"/"Critical") **and** a
 * semantic left-border tone — never color alone — mapping `critical`→danger,
 * `warning`→warn, `info`→primary. Exposes an "Escalate" primary action
 * (`onEscalate`; disabled while `escalating`) and an "Acknowledge" secondary
 * (`onAcknowledge`). All colors come from token classes; no literal hex.
 */
exports.EscalationBanner = React.forwardRef(function EscalationBanner({ level = 'warning', title, message, onEscalate, onAcknowledge, escalateLabel = 'Escalate', acknowledgeLabel = 'Acknowledge', escalating = false, className, ...rest }, ref) {
    const spec = LEVEL[level] ?? LEVEL.warning;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "aria-label": `${spec.role}: ${title}${message ? `. ${message}` : ''}`, className: (0, cn_1.cn)('flex items-start gap-2 rounded-[var(--xen-radius-md)] border border-border border-l-4 bg-surface p-3', spec.borderCls, className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: spec.glyph, size: "lg", color: spec.iconColor, "aria-label": spec.role }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: title }), message ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: message }) : null, onEscalate || onAcknowledge ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex gap-2", children: [onEscalate ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: spec.escalateVariant, disabled: escalating, onClick: onEscalate, children: escalateLabel })) : null, onAcknowledge ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", onClick: onAcknowledge, children: acknowledgeLabel })) : null] })) : null] })] }));
});
//# sourceMappingURL=EscalationBanner.js.map