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
exports.CertificateCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const VARIANT_META = {
    standard: { seal: '🎓', label: 'Certificate of Completion' },
    honors: { seal: '🏅', label: 'Certificate with Honors' },
    professional: { seal: '📜', label: 'Professional Certificate' },
};
/**
 * CertificateCard — **V4** "campus" design (web parity of the native V4), and the
 * ONE reserved gradient moment of the learning V4 "campus" line: the award hero
 * (seal, certificate type, "This certifies that", recipient) rides a
 * brand-gradient ground (`bg-gradient-to-br from-primary-500 to-primary-700`) in
 * near-white ink (`text-primary-50` / `text-primary-100`). The body — the course,
 * plus issuer / date / credential metadata and an optional share action — stays
 * on the plain surface. Reuses the base `variant`
 * (`standard` / `honors` / `professional`), which sets the seal glyph + label.
 * All colors from `--xen-*` token classes / gradient utilities (no literals).
 */
exports.CertificateCardV4 = React.forwardRef(function CertificateCardV4({ courseTitle, recipient, issuer, issuedOn, credentialId, variant = 'standard', actionLabel = 'Share', onAction, className, ...rest }, ref) {
    const meta = VARIANT_META[variant];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-certificate-card": "", "aria-label": `${meta.label} for ${courseTitle}, awarded to ${recipient}`, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)] text-center text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-4xl", "aria-hidden": "true", children: meta.seal }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-primary-100", children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "mt-1 text-sm text-primary-100", children: "This certifies that" }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-primary-50", children: recipient })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 p-[var(--xen-space-lg)] text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "has completed" }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg font-semibold text-on-surface", children: courseTitle }), issuer || issuedOn || credentialId ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-2 flex flex-col items-center gap-0.5", children: [issuer ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Issued by ", issuer] }) : null, issuedOn ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: issuedOn }) : null, credentialId ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs tabular-nums text-muted", children: ["ID: ", credentialId] }) : null] })) : null, onAction ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-3 self-stretch", children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", onClick: onAction, className: "w-full", children: actionLabel }) })) : null] })] }));
});
//# sourceMappingURL=CertificateCardV4.js.map