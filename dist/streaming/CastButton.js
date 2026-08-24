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
exports.CastButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const GLYPH_SIZE = {
    sm: 'sm',
    md: 'base',
    lg: 'lg',
};
/**
 * A cast / AirPlay toggle (web) — a `<button>` shell that reports clicks via
 * `onClick` and reflects the current `connected` state in its color and
 * accessible label ("Cast to a device" vs. "Casting to <device>. Disconnect").
 * No native cast dependency; wire an app's cast framework to `onClick`.
 * Token-only: the active (connected) tint is `primary`, idle is `on-surface`.
 */
exports.CastButton = React.forwardRef(function CastButton({ connected = false, deviceName, variant = 'icon', size = 'md', disabled, className, ...rest }, ref) {
    const tint = connected ? 'primary' : 'onSurface';
    const label = connected
        ? `Casting${deviceName ? ` to ${deviceName}` : ''}. Disconnect`
        : 'Cast to a device';
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-cast-button": "", "aria-label": label, "aria-pressed": connected, disabled: disabled, className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] bg-transparent', 'transition-opacity hover:opacity-70', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-40', connected ? 'text-primary' : 'text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: connected ? '📲' : '🔗', size: GLYPH_SIZE[size], color: tint }), variant === 'labeled' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", children: connected && deviceName ? deviceName : 'Cast' })) : null] }));
});
//# sourceMappingURL=CastButton.js.map