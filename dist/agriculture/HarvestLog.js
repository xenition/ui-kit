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
exports.HarvestLog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A harvest log — a titled {@link Card} listing recent harvest records (crop,
 * quantity + unit, date, field, optional grade chip). The header can show a
 * period `total`. When `entries` is empty an {@link EmptyState} stands in for
 * the list. Rows are keyed and indexed defensively, and `maxRows` truncates a
 * long log to a "+N more" summary. Token-bound throughout — no literal colors.
 */
exports.HarvestLog = React.forwardRef(function HarvestLog({ entries, title = 'Harvest log', total, maxRows, emptyTitle = 'No harvests logged', emptyDescription = 'Recorded harvests will appear here.', className, ...rest }, ref) {
    const list = Array.isArray(entries) ? entries : [];
    const visible = typeof maxRows === 'number' ? list.slice(0, Math.max(0, maxRows)) : list;
    const remaining = list.length - visible.length;
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-harvest-log": "", className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83E\uDDFA", color: "primary", size: "base" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: title }), total != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: total }) : null] }), list.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-3", children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF3E", size: "2xl", color: "muted" }), title: emptyTitle, description: emptyDescription }) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "mt-2", children: [visible.map((entry, i) => {
                        const isLast = i === visible.length - 1 && remaining <= 0;
                        const subLine = [entry.field, entry.date]
                            .filter((s) => s != null && s !== '')
                            .join(' · ');
                        return ((0, jsx_runtime_1.jsxs)("div", { className: `flex items-center gap-2 py-2${isLast ? '' : ' border-b border-border'}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: entry.crop }), subLine !== '' ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subLine }) : null] }), entry.grade != null ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: entry.grade }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "font-heading text-sm font-bold text-on-surface", children: [String(entry.quantity), entry.unit != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "font-normal text-muted", children: [" ", entry.unit] })) : null] })] }, entry.id ?? `harvest-${i}`));
                    }), remaining > 0 ? ((0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-xs text-muted", children: ["+", remaining, " more"] })) : null] }))] }));
});
//# sourceMappingURL=HarvestLog.js.map