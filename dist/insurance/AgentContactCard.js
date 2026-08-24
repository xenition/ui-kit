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
exports.AgentContactCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
/**
 * A contact card for the policyholder's agent / adjuster: avatar, name/title/
 * agency, and call + email actions. Availability is shown by **text + a
 * presence pill** (glyph + label + a `success`/`neutral` token tone) — never
 * color alone. Call/email actions are real `<button>`s that only render when the
 * corresponding contact detail and handler are supplied. Token-bound throughout
 * — no literal colors. Web parity of the native `AgentContactCard`.
 */
exports.AgentContactCard = React.forwardRef(function AgentContactCard({ name, title, agency, phone, email, avatarUrl, available, onCall, onEmail, className, ...rest }, ref) {
    const showCall = phone != null && onCall != null;
    const showEmail = email != null && onEmail != null;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: avatarUrl, name: name, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), title != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: [title, agency != null ? ` · ${agency}` : ''] })) : agency != null ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: agency })) : null, available != null ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: available ? 'success' : 'neutral', className: "mt-1", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: available ? '●' : '○' }), ' ', available ? 'Available' : 'Offline'] })) : null] })] }), phone != null || email != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex flex-col gap-[var(--xen-space-xs)]", children: [phone != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCDE", size: "sm", "aria-label": "Phone" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: phone })] })) : null, email != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2709\uFE0F", size: "sm", "aria-label": "Email" }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-on-surface", children: email })] })) : null] })) : null, showCall || showEmail ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('mt-[var(--xen-space-md)] flex gap-[var(--xen-space-sm)]'), children: [showCall ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "sm", onClick: onCall, className: "flex-1", children: "Call" })) : null, showEmail ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "secondary", size: "sm", onClick: onEmail, className: "flex-1", children: "Email" })) : null] })) : null] }));
});
//# sourceMappingURL=AgentContactCard.js.map