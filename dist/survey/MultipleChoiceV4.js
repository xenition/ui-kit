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
exports.MultipleChoiceV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * MultipleChoice — **V4** "clean form / focus" design. Calm, legible answer
 * rows rendered as big tappable cards (min height 44px, generous 8-pt padding).
 * Each row carries a leading radio (`single`) or check (`multiple`) indicator,
 * an optional icon, a label and optional description. The selected row lifts to
 * a soft `bg-primary/10` tint with a `border-primary` edge and a solid
 * **primary** indicator with on-primary glyph; unselected rows sit on
 * `bg-surface` + `border-border`. One accent throughout. Same props/behavior as
 * {@link MultipleChoiceProps} — `radiogroup`/`radio` vs. `checkbox` roles,
 * `aria-checked`, single/multiple selection and the empty state are all
 * preserved; all colors come from `--xen-*` token classes (no literal colors).
 */
exports.MultipleChoiceV4 = React.forwardRef(function MultipleChoiceV4({ options, value, onChange, selection = 'single', 'aria-label': ariaLabel = 'Answer options', disabled = false, className, }, ref) {
    const multiple = selection === 'multiple';
    const selectedSet = React.useMemo(() => {
        if (multiple)
            return new Set(Array.isArray(value) ? value : []);
        return new Set(typeof value === 'string' ? [value] : []);
    }, [multiple, value]);
    const toggle = (id) => {
        if (multiple) {
            const next = new Set(selectedSet);
            if (next.has(id))
                next.delete(id);
            else
                next.add(id);
            onChange(Array.from(next));
        }
        else {
            onChange(id);
        }
    };
    if (options.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: "No options available.", className: className });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: multiple ? 'group' : 'radiogroup', "aria-label": ariaLabel, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: options.map((opt) => {
            const selected = selectedSet.has(opt.id);
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: multiple ? 'checkbox' : 'radio', "aria-checked": selected, "aria-label": opt.label, disabled: disabled, onClick: () => toggle(opt.id), className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-sm rounded-[var(--xen-radius-lg)] border px-md py-sm text-left transition-colors', 'disabled:pointer-events-none disabled:opacity-50 hover:opacity-90', selected ? 'border-2 border-primary bg-primary/10' : 'border-border bg-surface'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-[22px] w-[22px] shrink-0 items-center justify-center', multiple ? 'rounded-sm' : 'rounded-full', selected ? 'bg-primary' : 'border border-border bg-surface'), children: selected ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: multiple ? '✓' : '●', size: "xs", color: "onPrimary" }) : null }), opt.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: opt.icon, size: "base", color: "onSurface" }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block text-base text-on-surface', selected ? 'font-bold' : 'font-medium'), children: opt.label }), opt.description ? ((0, jsx_runtime_1.jsx)("span", { className: "block text-sm text-muted", children: opt.description })) : null] })] }, opt.id));
        }) }));
});
//# sourceMappingURL=MultipleChoiceV4.js.map