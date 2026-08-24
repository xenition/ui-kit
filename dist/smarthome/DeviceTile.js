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
exports.DeviceTile = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
const Badge_1 = require("../primitives/Badge");
/** Per-state presentation: accent slot + a text label so state never relies on color alone. */
const STATE_META = {
    on: { accent: 'success', border: 'border-success', label: 'On', tone: 'success' },
    off: { accent: 'muted', border: 'border-muted', label: 'Off', tone: 'muted' },
    unavailable: { accent: 'danger', border: 'border-danger', label: 'Offline', tone: 'danger' },
};
/**
 * A single controllable device tile — a tinted glyph, name + status, and an
 * on/off {@link Switch}. `state` drives the accent slot and a text status label
 * (`on`→success, `off`→muted, `unavailable`→danger) so device status is never
 * conveyed by color alone; `unavailable` disables the switch. Optional `onClick`
 * makes the body open a detail view while the switch stays independently
 * clickable (its click is stopped from bubbling). Token-bound throughout — no
 * literal colors.
 */
exports.DeviceTile = React.forwardRef(function DeviceTile({ name, icon = '🔌', state = 'off', subtitle, onToggle, onClick, loading = false, className, style }, ref) {
    const meta = STATE_META[state];
    const isOn = state === 'on';
    const disabled = state === 'unavailable';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, style: style, className: className, "aria-busy": "true", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-9 w-9 rounded-[var(--xen-radius-md)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[70%] rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-[40%] rounded-[var(--xen-radius-sm)] bg-neutral-200" })] }) }));
    }
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, style: style, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${name}, ${meta.label}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)(isOn ? 'shadow-md' : 'shadow-sm', disabled && 'opacity-70', interactive && 'cursor-pointer', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface', meta.border), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: isOn ? meta.accent : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), subtitle != null ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subtitle }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, children: meta.label }), (0, jsx_runtime_1.jsx)("span", { onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), children: (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: isOn, disabled: disabled, onCheckedChange: onToggle, "aria-label": `${name} power` }) })] })] }));
});
//# sourceMappingURL=DeviceTile.js.map