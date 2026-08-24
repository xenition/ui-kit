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
exports.MatrixQuestion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * A matrix / grid question — one `radiogroup` per statement row, each sharing
 * the same column choices, laid out as a header row plus one selectable cell per
 * column. The chosen cell in a row fills with the primary token and is announced
 * via `aria-checked` (state is never color-only). An empty `rows` or `columns`
 * list renders a muted {@link EmptyState}. No literal colors.
 */
exports.MatrixQuestion = React.forwardRef(function MatrixQuestion({ rows, columns, value, onChange, 'aria-label': ariaLabel = 'Rating matrix', disabled = false, className }, ref) {
    if (rows.length === 0 || columns.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: "Nothing to rate here.", className: className });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": ariaLabel, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-[1.4]" }), columns.map((c) => ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-center text-xs font-semibold text-muted", children: c.label }) }, c.id)))] }), rows.map((row) => {
                const chosen = value[row.id];
                return ((0, jsx_runtime_1.jsxs)("div", { role: "radiogroup", "aria-label": row.label, className: "flex items-center border-t border-border py-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-[1.4] text-sm font-semibold text-on-surface", children: row.label }), columns.map((c) => {
                            const selected = chosen === c.id;
                            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${row.label}: ${c.label}`, disabled: disabled, onClick: () => onChange(row.id, c.id), className: "flex flex-1 items-center justify-center py-xs disabled:pointer-events-none disabled:opacity-50", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-6 w-6 items-center justify-center rounded-full', selected ? 'bg-primary' : 'border border-border bg-surface'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-on-primary" }) : null }) }, c.id));
                        })] }, row.id));
            })] }));
});
//# sourceMappingURL=MatrixQuestion.js.map