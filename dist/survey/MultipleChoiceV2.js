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
exports.MultipleChoiceV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
/**
 * MultipleChoice, redesigned (v2): **big option cards**. Each choice is a bordered
 * tile with a radio/checkbox marker, optional glyph, label and description; a
 * selected tile fills primary-tinted with a ring. Bolder than v1's list. Same
 * props, token-only.
 */
exports.MultipleChoiceV2 = React.forwardRef(function MultipleChoiceV2({ options, value, onChange, selection = 'single', disabled = false, className, ...rest }, ref) {
    if (options.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCDD" }), title: "No options", className: className });
    }
    const multiple = selection === 'multiple';
    const isSel = (id) => (multiple ? Array.isArray(value) && value.includes(id) : value === id);
    const toggle = (id) => {
        if (multiple) {
            const arr = Array.isArray(value) ? value : [];
            onChange(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
        }
        else {
            onChange(id);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-multiple-choice": "", role: multiple ? 'group' : 'radiogroup', "aria-label": rest['aria-label'] ?? 'Answer options', className: (0, cn_1.cn)('flex flex-col gap-2', className), children: options.map((opt) => {
            const selected = isSel(opt.id);
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: multiple ? 'checkbox' : 'radio', "aria-checked": selected, disabled: disabled, onClick: () => toggle(opt.id), className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-colors disabled:opacity-50', selected ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:bg-neutral-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-5 w-5 shrink-0 items-center justify-center border-2', multiple ? 'rounded' : 'rounded-full', selected ? 'border-primary bg-primary text-on-primary' : 'border-border'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs", children: multiple ? '✓' : '●' }) : null }), opt.icon ? (0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: opt.icon }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "block text-sm font-semibold text-on-surface", children: opt.label }), opt.description ? (0, jsx_runtime_1.jsx)("span", { className: "block text-xs text-muted", children: opt.description }) : null] })] }, opt.id));
        }) }));
});
//# sourceMappingURL=MultipleChoiceV2.js.map