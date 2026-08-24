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
exports.InterestPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
/**
 * Multi-select interest chips — the "personalize your feed" onboarding step. A
 * wrap of toggleable chips where a selected chip fills with the primary token
 * and shows a check; selection state is announced per-chip (`aria-checked`) and
 * the running count is exposed on the group label plus a polite live region, so
 * screen-reader users hear their progress. Enforces an optional `maxSelections`
 * cap. Guards an empty option list with the {@link EmptyState}. No literal
 * colors.
 */
exports.InterestPicker = React.forwardRef(function InterestPicker({ options, selectedIds, onChange, title, helper, maxSelections, groupLabel = 'Interests', className, ...rest }, ref) {
    const selectedSet = React.useMemo(() => new Set(selectedIds), [selectedIds]);
    const atCap = maxSelections != null && selectedSet.size >= maxSelections;
    const toggle = (id) => {
        const next = new Set(selectedSet);
        if (next.has(id))
            next.delete(id);
        else {
            if (atCap)
                return;
            next.add(id);
        }
        onChange(Array.from(next));
    };
    if (options.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { title: "No topics to choose from." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-4', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold text-on-surface", children: title }) : null, helper ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: helper }) : null, (0, jsx_runtime_1.jsx)("div", { role: "group", "aria-label": `${groupLabel}, ${selectedSet.size} selected`, className: "flex flex-wrap gap-2", children: options.map((opt) => {
                    const selected = selectedSet.has(opt.id);
                    const disabled = !selected && atCap;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "checkbox", "aria-checked": selected, "aria-label": opt.label, disabled: disabled, onClick: () => toggle(opt.id), className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-semibold transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', 'disabled:pointer-events-none disabled:opacity-45', selected
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-border bg-surface text-on-surface'), children: [selected ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "sm", color: "onPrimary" })) : opt.icon ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: opt.icon, size: "sm", color: "onSurface" })) : null, opt.label] }, opt.id));
                }) }), (0, jsx_runtime_1.jsxs)("p", { "aria-live": "polite", className: "sr-only", children: [selectedSet.size, " selected"] })] }));
});
//# sourceMappingURL=InterestPicker.js.map