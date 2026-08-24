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
exports.CertificateCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const VARIANT_META = {
    standard: { seal: '🎓', borderClass: 'border-primary', textClass: 'text-primary', label: 'Certificate of Completion' },
    honors: { seal: '🏅', borderClass: 'border-accent', textClass: 'text-accent', label: 'Certificate with Honors' },
    professional: { seal: '📜', borderClass: 'border-success', textClass: 'text-success', label: 'Professional Certificate' },
};
/**
 * An earned-certificate card: a seal, the certificate type, the course, the
 * recipient, and issuer / date / credential metadata, plus an optional
 * share/download action. `variant` sets the seal glyph and tone. Token-only
 * colors (`--xen-*`).
 */
exports.CertificateCard = React.forwardRef(function CertificateCard({ courseTitle, recipient, issuer, issuedOn, credentialId, variant = 'standard', actionLabel = 'Share', onAction, className, ...rest }, ref) {
    const meta = VARIANT_META[variant];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${meta.label} for ${courseTitle}, awarded to ${recipient}`, className: (0, cn_1.cn)('flex flex-col items-center gap-2 rounded-[var(--xen-radius-lg)] border-2 bg-surface p-[var(--xen-space-xl)] text-center', meta.borderClass, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl", "aria-hidden": "true", children: meta.seal }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', meta.textClass), children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "This certifies that" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-on-surface", children: recipient }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "has completed" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-semibold text-on-surface", children: courseTitle }), issuer || issuedOn || credentialId ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex flex-col items-center gap-0.5", children: [issuer ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Issued by ", issuer] }) : null, issuedOn ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: issuedOn }) : null, credentialId ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["ID: ", credentialId] }) : null] })) : null, onAction ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-2 self-stretch", children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: onAction, className: "w-full", children: actionLabel }) })) : null] }));
});
//# sourceMappingURL=CertificateCard.js.map