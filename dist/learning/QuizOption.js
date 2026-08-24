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
exports.QuizOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATE_VISUAL = {
    default: { borderClass: 'border-border', glyph: null, glyphClass: 'text-muted', a11ySuffix: '' },
    selected: { borderClass: 'border-primary', glyph: '●', glyphClass: 'text-primary', a11ySuffix: ', selected' },
    correct: { borderClass: 'border-success', glyph: '✓', glyphClass: 'text-success', a11ySuffix: ', correct answer' },
    incorrect: { borderClass: 'border-danger', glyph: '✕', glyphClass: 'text-danger', a11ySuffix: ', incorrect answer' },
};
/**
 * A single selectable quiz answer, rendered as an accessibility `radio`.
 * Correct/incorrect states carry an explicit glyph (`✓` / `✕`) and spoken
 * suffix so they never rely on color alone. Activates on click and on
 * Enter/Space. Token-only colors (`--xen-*`).
 */
exports.QuizOption = React.forwardRef(function QuizOption({ label, marker, state = 'default', selected, disabled = false, onSelect, className, ...rest }, ref) {
    const visual = STATE_VISUAL[state];
    const isSelected = selected ?? state === 'selected';
    const interactive = !disabled && !!onSelect;
    const handleKeyDown = (e) => {
        if (!interactive)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "radio", "aria-checked": isSelected, "aria-disabled": disabled || undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${marker ? `${marker}. ` : ''}${label}${visual.a11ySuffix}`, onClick: interactive ? onSelect : undefined, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] border bg-surface px-3 py-3', visual.borderClass, disabled ? 'opacity-50' : interactive && 'cursor-pointer', interactive && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [marker ? ((0, jsx_runtime_1.jsx)("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-bold text-muted", children: marker })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base text-on-surface", children: label }), visual.glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base font-bold', visual.glyphClass), children: visual.glyph })) : null] }));
});
//# sourceMappingURL=QuizOption.js.map