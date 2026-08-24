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
exports.MoodPicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const MOOD_META = {
    awful: { glyph: '😣', label: 'Awful', color: 'danger' },
    bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
    okay: { glyph: '😐', label: 'Okay', color: 'muted' },
    good: { glyph: '🙂', label: 'Good', color: 'primary' },
    great: { glyph: '😄', label: 'Great', color: 'success' },
};
const MOOD_ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * A mood check-in: a row of emoji faces from awful to great. The selected face
 * gets a tinted ring in its mood color; the rest read muted. Each face is an
 * accessible radio labelled with its mood. `onChange` fires with the tapped
 * mood. Web parity of the native `MoodPicker`; token-only colors.
 */
exports.MoodPicker = React.forwardRef(function MoodPicker({ value, options = MOOD_ORDER, showLabels = true, onChange, className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "radiogroup", className: (0, cn_1.cn)('flex justify-between gap-[var(--xen-space-xs)]', className), ...rest, children: options.map((mood) => {
            const meta = MOOD_META[mood];
            const selected = value === mood;
            const ringClass = selected && meta.color !== 'muted' ? internal_1.BORDER_CLASS[meta.color] : 'border-border';
            const labelClass = selected ? internal_1.TEXT_CLASS[meta.color] : 'text-muted';
            const face = ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-12 w-12 items-center justify-center rounded-full border-2 bg-surface text-xl', ringClass, selected || value == null ? 'opacity-100' : 'opacity-50'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }) }), showLabels ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', selected ? 'font-bold' : 'font-normal', labelClass), children: meta.label })) : null] }));
            if (!onChange) {
                return ((0, jsx_runtime_1.jsx)("span", { "aria-label": meta.label, children: face }, mood));
            }
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": meta.label, onClick: () => onChange(mood), className: "transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: face }, mood));
        }) }));
});
//# sourceMappingURL=MoodPicker.js.map