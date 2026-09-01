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
exports.MatrixQuestionV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * MatrixQuestion — **V4** "clean form / focus" design. A calm, legible row×column
 * grid: one `radiogroup` per statement row sharing the same column choices, laid
 * out as a header row plus one big-tap-target cell per column. Legible column
 * headers sit above zebra-free rows separated only by a hairline `border`. The
 * chosen cell fills with a solid **primary** disc (on a soft `bg-primary/10`
 * tint) and is announced via `aria-checked` — state is never color-only. One
 * accent, generous 8-pt air, no gradients. An empty `rows`/`columns` list renders
 * a muted {@link EmptyState}. Same props/behavior as {@link MatrixQuestionProps};
 * all colors from `--xen-*` token classes (no literal colors).
 */
exports.MatrixQuestionV4 = React.forwardRef(function MatrixQuestionV4({ rows, columns, value, onChange, 'aria-label': ariaLabel = 'Rating matrix', disabled = false, className }, ref) {
    if (rows.length === 0 || columns.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: "Nothing to rate here.", className: className });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": ariaLabel, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end px-sm pt-sm pb-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-[1.4]" }), columns.map((c) => ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "text-center text-xs font-bold tracking-wide text-muted", children: c.label }) }, c.id)))] }), rows.map((row) => {
                const chosen = value[row.id];
                return ((0, jsx_runtime_1.jsxs)("div", { role: "radiogroup", "aria-label": row.label, className: "flex items-center border-t border-border px-sm py-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-[1.4] py-xs pr-sm text-sm font-semibold text-on-surface", children: row.label }), columns.map((c) => {
                            const selected = chosen === c.id;
                            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${row.label}: ${c.label}`, disabled: disabled, onClick: () => onChange(row.id, c.id), className: (0, cn_1.cn)('flex min-h-[44px] flex-1 items-center justify-center rounded-[var(--xen-radius-md)] transition-colors', 'disabled:pointer-events-none disabled:opacity-50', selected ? 'bg-primary/10' : 'hover:bg-primary/10'), children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-7 w-7 items-center justify-center rounded-full transition-colors', selected ? 'bg-primary' : 'border border-border bg-surface'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-on-primary" }) : null }) }, c.id));
                        })] }, row.id));
            })] }));
});
//# sourceMappingURL=MatrixQuestionV4.js.map