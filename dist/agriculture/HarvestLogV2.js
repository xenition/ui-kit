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
exports.HarvestLogV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * HarvestLog, redesigned (v2): an **elevated ledger card**. A header pairs the
 * title with a period-total badge; each harvest is a row — crop, a big yield
 * figure, date·field, and a grade chip. Distinct from v1. Same props, token-only.
 */
exports.HarvestLogV2 = React.forwardRef(function HarvestLogV2({ entries, title = 'Harvest log', total, maxRows, emptyTitle = 'No harvests logged', emptyDescription, className, ...rest }, ref) {
    if (entries.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDF3E" }), title: emptyTitle, description: emptyDescription, className: className, ...rest });
    }
    const rows = typeof maxRows === 'number' ? entries.slice(0, maxRows) : entries;
    const hidden = entries.length - rows.length;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-harvest-log": "", className: (0, cn_1.cn)('flex flex-col rounded-lg bg-surface p-md shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-2 flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "text-base font-bold text-on-surface", children: title }), total ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: total }) : null] }), rows.map((e) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 border-t border-border py-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: e.crop }), (e.date || e.field) ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [e.field, e.date].filter(Boolean).join(' · ') }) : null] }), e.grade ? (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: e.grade }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "text-base font-bold tabular-nums text-on-surface", children: [e.quantity, e.unit ? ` ${e.unit}` : ''] })] }, e.id))), hidden > 0 ? (0, jsx_runtime_1.jsxs)("p", { className: "pt-2 text-xs text-muted", children: ["+", hidden, " more"] }) : null] }));
});
//# sourceMappingURL=HarvestLogV2.js.map