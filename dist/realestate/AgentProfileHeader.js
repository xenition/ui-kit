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
exports.AgentProfileHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
function stars(rating) {
    const clamped = Math.max(0, Math.min(5, rating));
    const full = Math.round(clamped);
    return '★★★★★'.slice(0, full) + '☆☆☆☆☆'.slice(0, 5 - full);
}
/**
 * AgentProfileHeader — a brand-gradient agent hero for the real-estate V4
 * "listing" line (web parity of the native twin). The avatar (photo or token
 * monogram), near-white name + agency, an optional star rating, and headline
 * stats as frosted tiles sit on the brand gradient (`from-primary-500
 * to-primary-700`); near-white Call / Message CTAs anchor the bottom.
 * Presentational — shaped data + callbacks, nothing fetches. Token-only colors
 * (`--xen-*` classes + gradient utilities), dark-mode safe.
 */
exports.AgentProfileHeader = React.forwardRef(function AgentProfileHeader({ name, title, agency, photoUrl, rating, stats, verified = false, onCall, onMessage, className, ...rest }, ref) {
    const monogram = name.trim().charAt(0).toUpperCase() || '?';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [photoUrl ? ((0, jsx_runtime_1.jsx)("img", { src: photoUrl, alt: name, className: "h-16 w-16 flex-shrink-0 rounded-full border border-primary-50/30 object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": name, className: "flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-2xl font-extrabold text-primary-50", children: monogram })), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-xl font-extrabold text-primary-50", children: name }), verified ? ((0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": "Verified", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "onPrimary", "aria-hidden": "true" }) })) : null] }), title ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-primary-100", children: title }) : null, agency ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-primary-100", children: agency }) : null, typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("p", { "aria-label": `Rated ${Math.max(0, Math.min(5, rating)).toFixed(1)} out of 5`, className: "mt-0.5 text-sm font-semibold text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: stars(rating) }), ' ', Math.max(0, Math.min(5, rating)).toFixed(1)] })) : null] })] }), stats && stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-3 gap-[var(--xen-space-sm)]", children: stats.map((s) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-[var(--xen-space-md)] text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-extrabold text-primary-50", children: s.value }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-primary-100", children: s.label })] }, s.label))) })) : null, onCall || onMessage ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] sm:flex-row", children: [onCall ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Call ${name}`, onClick: onCall, className: "flex min-h-[44px] flex-1 items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCDE" }), " Call"] })) : null, onMessage ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Message ${name}`, onClick: onMessage, className: "flex min-h-[44px] flex-1 items-center justify-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 py-[var(--xen-space-md)] text-base font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDCAC" }), " Message"] })) : null] })) : null] }));
});
//# sourceMappingURL=AgentProfileHeader.js.map