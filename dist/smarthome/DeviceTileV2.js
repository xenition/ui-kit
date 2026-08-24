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
exports.DeviceTileV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Switch_1 = require("../primitives/Switch");
const DISC = {
    on: 'bg-primary/15 text-primary',
    off: 'bg-neutral-100 text-muted',
    unavailable: 'bg-neutral-100 text-muted',
};
/**
 * DeviceTile, redesigned (v2): a **big square control tile**. The icon rides in a
 * large state-tinted disc up top, the name + subtitle sit beneath, and the Switch
 * anchors the bottom — an on device tints the whole tile. Distinct from v1's row.
 * Same props, token-only.
 */
exports.DeviceTileV2 = React.forwardRef(function DeviceTileV2({ name, icon = '🔌', state = 'off', subtitle, onToggle, onClick, loading = false, className, style }, ref) {
    const unavailable = state === 'unavailable';
    const on = state === 'on';
    const interactive = typeof onClick === 'function';
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-device-tile": "", "aria-label": "Loading device", style: style, className: (0, cn_1.cn)('h-32 animate-pulse rounded-lg bg-neutral-100', className) });
    }
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-device-tile": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${name}, ${state}`, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, style: style, className: (0, cn_1.cn)('flex h-32 flex-col justify-between rounded-lg p-3 shadow-sm transition-colors', on ? 'bg-primary/10' : 'bg-surface', interactive && 'cursor-pointer', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full text-xl', DISC[state]), children: icon }), (0, jsx_runtime_1.jsx)("span", { onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation(), children: (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: on, disabled: unavailable, "aria-label": `Toggle ${name}`, onCheckedChange: (next) => onToggle?.(next) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: name }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subtitle }) : null] })] }));
});
//# sourceMappingURL=DeviceTileV2.js.map