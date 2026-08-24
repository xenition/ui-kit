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
exports.DeviceTileV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Switch_1 = require("../primitives/Switch");
const DOT = { on: 'bg-primary', off: 'bg-neutral-300', unavailable: 'bg-neutral-300' };
/**
 * DeviceTile, redesigned (v3): a **dense device row**. A leading icon with a small
 * state dot, the name + subtitle inline, and the Switch pinned right — hairline-
 * bordered for a long device list. The opposite of v2's square tile. Same props,
 * token-only.
 */
exports.DeviceTileV3 = React.forwardRef(function DeviceTileV3({ name, icon = '🔌', state = 'off', subtitle, onToggle, onClick, loading = false, className, style }, ref) {
    const unavailable = state === 'unavailable';
    const on = state === 'on';
    const interactive = typeof onClick === 'function';
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-device-tile": "", "aria-label": "Loading device", style: style, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-device-tile": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}, ${state}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, style: style, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), children: [(0, jsx_runtime_1.jsxs)("span", { className: "relative text-lg leading-none", children: [icon, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full', DOT[state]), "aria-hidden": true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-medium text-on-surface", children: name }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subtitle }) : null] }), (0, jsx_runtime_1.jsx)("span", { onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), children: (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: on, disabled: unavailable, "aria-label": `Toggle ${name}`, onCheckedChange: (next) => onToggle?.(next) }) })] }));
});
//# sourceMappingURL=DeviceTileV3.js.map