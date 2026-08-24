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
exports.CaseCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * CaseCard, redesigned (v2): an **elevated matter card**. The docket number is an
 * eyebrow over a large caption; client, practice/status/priority pills, and lead-
 * attorney·next-event meta follow, with an Open-case footer button. Distinct from
 * v1. Same props, token-only.
 */
exports.CaseCardV2 = React.forwardRef(function CaseCardV2({ caseNumber, title, client, practiceArea, status, priority, leadAttorney, nextEvent, variant, loading = false, onClick, onOpen, testID, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-case-card": "", "data-testid": testID, "aria-label": "Loading case", className: (0, cn_1.cn)('h-36 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const interactive = typeof onClick === 'function';
    const meta = [leadAttorney, nextEvent].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-case-card": "", "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(() => onClick?.()) : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "font-mono text-xs text-muted", children: caseNumber }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), client ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: client }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-1.5", children: [status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_STATUS_META[status], size: "sm" }) : null, practiceArea ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PRACTICE_AREA_META[practiceArea], variant: "soft", size: "sm" }) : null, priority ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_PRIORITY_META[priority], variant: "soft", size: "sm" }) : null] }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta }) : null, onOpen ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "w-full", onClick: (e) => { e.stopPropagation(); onOpen(); }, children: "Open case" }) : null] }));
});
//# sourceMappingURL=CaseCardV2.js.map