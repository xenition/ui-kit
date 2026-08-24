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
exports.SignatureBlock = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * An email signature block — avatar/logo, name, title · company, and a set of
 * contact lines (email / phone / website). Rendered read-only for a thread
 * footer or compose preview; a leading accent rule (token border) anchors it.
 * All colors from token classes. No literal colors.
 */
exports.SignatureBlock = React.forwardRef(function SignatureBlock({ name, title, company, avatarUri, contacts, tagline, className }, ref) {
    const safeContacts = contacts ?? [];
    const roleLine = [title, company].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex gap-[var(--xen-space-md)] border-l-[3px] border-primary py-[var(--xen-space-md)] pl-[var(--xen-space-md)]', className), children: [avatarUri || name ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", src: avatarUri, name: name }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: name }), roleLine ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: roleLine }) : null, safeContacts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-xs)] flex flex-col gap-0.5", children: safeContacts.map((c) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [c.glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: c.glyph, size: "xs", color: "muted" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-primary", children: c.value })] }, c.id))) })) : null, tagline ? (0, jsx_runtime_1.jsx)("span", { className: "mt-[var(--xen-space-xs)] text-xs text-muted", children: tagline }) : null] })] }));
});
//# sourceMappingURL=SignatureBlock.js.map