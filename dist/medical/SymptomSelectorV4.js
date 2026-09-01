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
exports.SymptomSelectorV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/**
 * SymptomSelector — **V4** "clinic" design (web parity of the native V4). A
 * multi-select symptom chip grid for intake / triage flows, presented inside a
 * calm, elevated rounded card with a soft shadow. Tap a pill to toggle a
 * symptom; fully controlled via `value` + `onChange`. A selected chip reads
 * with a soft-primary → primary fill **and** a ✓ marker, so selection never
 * relies on color alone. Each chip is a `role="checkbox"` button (keyboard +
 * `aria-checked`, ≥44px tap target). Renders an empty note when there are no
 * options. Identical props/behavior to {@link SymptomSelectorProps}. All colors
 * from `--xen-*` token classes (no literals). Informational UI only — not a
 * medical device.
 */
exports.SymptomSelectorV4 = React.forwardRef(function SymptomSelectorV4({ options, value, onChange, title, emptyLabel = 'No symptoms to choose from', className, ...rest }, ref) {
    const selected = new Set(value);
    const toggle = (id) => {
        const next = new Set(selected);
        if (next.has(id))
            next.delete(id);
        else
            next.add(id);
        onChange(options.filter((o) => next.has(o.id)).map((o) => o.id));
    };
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-symptom-selector": "", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: title }) : null, options.length === 0 ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-symptom-empty": "", className: "text-sm text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: options.map((opt) => {
                    const on = selected.has(opt.id);
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "checkbox", "aria-checked": on, "aria-label": opt.label, "data-xen-symptom-chip": "", onClick: () => toggle(opt.id), className: (0, cn_1.cn)('inline-flex min-h-[44px] items-center gap-[var(--xen-space-xs)] rounded-full border px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1', on
                            ? 'border-primary bg-primary font-bold text-on-primary'
                            : 'border-border bg-primary/10 font-medium text-on-surface hover:bg-primary/20'), children: [on ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2713", size: "xs", className: "font-bold text-on-primary" })) : opt.glyph ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: opt.glyph, size: "sm" })) : null, opt.label] }, opt.id));
                }) }))] }));
});
//# sourceMappingURL=SymptomSelectorV4.js.map