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
exports.HarvestLogV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * HarvestLog, redesigned (v3): a **compact ledger list**. A tight title·total
 * header over dense hairline rows — crop + field·date on the left, the yield (and
 * grade) pinned right. The opposite of v2's card. Same props, token-only.
 */
exports.HarvestLogV3 = React.forwardRef(function HarvestLogV3({ entries, title = 'Harvest log', total, maxRows, emptyTitle = 'No harvests logged', emptyDescription, className, ...rest }, ref) {
    if (entries.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83C\uDF3E" }), title: emptyTitle, description: emptyDescription, className: className, ...rest });
    }
    const rows = typeof maxRows === 'number' ? entries.slice(0, maxRows) : entries;
    const hidden = entries.length - rows.length;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-harvest-log": "", className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between py-1", children: [(0, jsx_runtime_1.jsx)("p", { role: "heading", "aria-level": 3, className: "text-sm font-bold text-on-surface", children: title }), total ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-success", children: total }) : null] }), rows.map((e) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 border-b border-border py-1.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-on-surface", children: e.crop }), (e.date || e.field) ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: [e.field, e.date].filter(Boolean).join(' · ') }) : null] }), e.grade ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: e.grade }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold tabular-nums text-on-surface", children: [e.quantity, e.unit ? ` ${e.unit}` : ''] })] }, e.id))), hidden > 0 ? (0, jsx_runtime_1.jsxs)("p", { className: "pt-1 text-xs text-muted", children: ["+", hidden, " more"] }) : null] }));
});
//# sourceMappingURL=HarvestLogV3.js.map