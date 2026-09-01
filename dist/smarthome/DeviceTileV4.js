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
exports.DeviceTileV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
const Badge_1 = require("../primitives/Badge");
const STATE_META = {
    on: { label: 'On', tone: 'success' },
    off: { label: 'Off', tone: 'muted' },
    unavailable: { label: 'Offline', tone: 'danger' },
};
/**
 * DeviceTile — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a device tile: an **active device glows** — when `on`,
 * the tile takes a soft success-tinted wash, a success border, and a glowing icon
 * disc; `off`/`unavailable` stay calm. A soft status pill + the on/off
 * {@link Switch} keep the meaning readable (status never by color alone). Same
 * props/behavior as {@link DeviceTileProps}; all colors from `--xen-*` token
 * classes (no literals). `loading` shows a skeleton.
 */
exports.DeviceTileV4 = React.forwardRef(function DeviceTileV4({ name, icon = '🔌', state = 'off', subtitle, onToggle, onClick, loading = false, className, style }, ref) {
    const meta = STATE_META[state];
    const isOn = state === 'on';
    const disabled = state === 'unavailable';
    const shell = (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-md)]', isOn ? 'border-success/50 bg-success/[0.08] shadow-md' : 'border-border bg-surface shadow-sm', disabled && 'opacity-70');
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, "aria-busy": "true", className: (0, cn_1.cn)(shell, className), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-11 w-11 rounded-[var(--xen-radius-md)] bg-on-surface/10" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-[70%] rounded-[var(--xen-radius-sm)] bg-on-surface/10" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-[40%] rounded-[var(--xen-radius-sm)] bg-on-surface/10" })] }) }));
    }
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${name}, ${meta.label}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)(shell, interactive && 'cursor-pointer', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border', isOn ? 'border-success/40 bg-success/15' : 'border-border bg-on-surface/5'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: isOn ? 'success' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: name }), subtitle != null ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subtitle }) : null] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: meta.label }), (0, jsx_runtime_1.jsx)("span", { onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), children: (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: isOn, disabled: disabled, onCheckedChange: onToggle, "aria-label": `${name} power` }) })] })] }));
});
//# sourceMappingURL=DeviceTileV4.js.map