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
exports.ModeSelector = exports.DEFAULT_MODES = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** The default Home / Away / Night / Vacation mode set. */
exports.DEFAULT_MODES = [
    { id: 'home', label: 'Home', glyph: '🏠' },
    { id: 'away', label: 'Away', glyph: '🚶' },
    { id: 'night', label: 'Night', glyph: '🌙' },
    { id: 'vacation', label: 'Vacation', glyph: '✈️' },
];
/**
 * ModeSelector — **V4** "ambient" home-mode switch. A calm control-panel
 * `radiogroup` of big (≥44px) mode tiles: the **selected** mode is a solid
 * `primary` fill with `on-primary` glyph + label, while the rest stay on a calm
 * surface with a soft tint — one accent, nothing shouting. Selection is
 * announced via `role="radio"`/`aria-checked`, arrow keys move between tiles,
 * and the meaning is carried by glyph + label (never color alone). Presentational
 * only: `value` in, `onChange` out. All colors from `--xen-*` token classes
 * (no literals); dark-mode safe.
 */
exports.ModeSelector = React.forwardRef(function ModeSelector({ value, onChange, modes = exports.DEFAULT_MODES, label = 'Home mode', disabled = false, className, style, ...rest }, ref) {
    const list = Array.isArray(modes) && modes.length > 0 ? modes : exports.DEFAULT_MODES;
    const selectedIndex = Math.max(0, list.findIndex((m) => m.id === value));
    const focusTile = (idx) => {
        const el = tileRefs.current[idx];
        if (el)
            el.focus();
    };
    const tileRefs = React.useRef([]);
    const onKeyDown = (e, idx) => {
        if (disabled)
            return;
        let next = idx;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
            next = (idx + 1) % list.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
            next = (idx - 1 + list.length) % list.length;
        else
            return;
        e.preventDefault();
        focusTile(next);
        onChange?.(list[next].id);
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "radiogroup", "aria-label": label, "aria-disabled": disabled || undefined, style: style, className: (0, cn_1.cn)('grid grid-cols-2 gap-[var(--xen-space-sm)] sm:grid-cols-4', className), ...rest, children: list.map((mode, idx) => {
            const selected = mode.id === value;
            return ((0, jsx_runtime_1.jsxs)("button", { ref: (el) => {
                    tileRefs.current[idx] = el;
                }, type: "button", role: "radio", "aria-checked": selected, "aria-label": mode.label, disabled: disabled, tabIndex: disabled ? -1 : selected || (selectedIndex === -1 && idx === 0) ? 0 : -1, onClick: () => onChange?.(mode.id), onKeyDown: (e) => onKeyDown(e, idx), className: (0, cn_1.cn)('flex min-h-[64px] flex-col items-center justify-center gap-[var(--xen-space-xs)]', 'rounded-[var(--xen-radius-lg)] border px-[var(--xen-space-sm)] py-[var(--xen-space-md)]', 'text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', selected
                    ? 'border-primary bg-primary text-on-primary shadow-md'
                    : 'border-border bg-surface text-on-surface hover:bg-primary/[0.06]', disabled && 'cursor-not-allowed opacity-60'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl leading-none", children: mode.glyph ?? '•' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', selected ? 'text-on-primary' : 'text-on-surface'), children: mode.label })] }, mode.id));
        }) }));
});
//# sourceMappingURL=ModeSelector.js.map