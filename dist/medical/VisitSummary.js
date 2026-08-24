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
exports.VisitSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const commerce_1 = require("../commerce");
/**
 * A visit / encounter summary card — the web mirror of the native
 * `VisitSummary`. Shows the title, provider + date, a highlighted diagnosis
 * chip, and any number of structured note sections (assessment, plan,
 * instructions). Renders loading and empty (`EmptyState`) states. Composes
 * `Card`; token-only colors. Informational UI only — not a medical device.
 */
exports.VisitSummary = React.forwardRef(function VisitSummary({ title, provider, date, diagnosis, sections, loading = false, emptyLabel = 'No visit notes available', className, ...rest }, ref) {
    const list = sections ?? [];
    const meta = [provider, date].filter(Boolean);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-visit-summary": "", "aria-label": "Loading visit summary", "aria-busy": "true", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-[55%] rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[80%] rounded-[var(--xen-radius-sm)] bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[70%] rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-xen-visit-summary": "", "aria-label": `Visit summary: ${title}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: title }), meta.length ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: meta.join('  ·  ') }) : null] }), diagnosis ? ((0, jsx_runtime_1.jsxs)("span", { className: "self-start rounded-full bg-primary-50 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary", children: ["\uD83E\uDE7A ", diagnosis] })) : null, list.length === 0 && !diagnosis ? ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { "data-xen-visit-empty": "", title: emptyLabel })) : (list.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase text-on-surface", children: s.heading }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: s.body })] }, `${s.heading}-${i}`))))] }));
});
//# sourceMappingURL=VisitSummary.js.map