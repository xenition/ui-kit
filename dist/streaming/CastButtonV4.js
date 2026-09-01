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
exports.CastButtonV4 = void 0;
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
 * CastButton — **V4** "spotlight" design (web parity of the native V4). A
 * polished cast control: the glyph (plus a "Cast" / device-name label in the
 * `labeled` variant) sits in a ≥44px rounded tap target that lights up with a
 * soft `bg-primary/10` tint and a `primary` accent when **connected**, staying
 * plain otherwise. Keeps the base's variants (`icon` / `labeled`) and sizes,
 * and reports clicks via `onClick`. The `connected` state is reflected in the
 * color, `aria-pressed`, and accessible label ("Cast to a device" vs. "Casting
 * to <device>. Disconnect"). Token-only colors via `--xen-*` — no literal hex.
 */
exports.CastButtonV4 = React.forwardRef(function CastButtonV4({ connected = false, deviceName, variant = 'icon', size = 'md', disabled, className, ...rest }, ref) {
    const tint = connected ? 'primary' : 'onSurface';
    const label = connected
        ? `Casting${deviceName ? ` to ${deviceName}` : ''}. Disconnect`
        : 'Cast to a device';
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "data-xen-cast-button": "", "aria-label": label, "aria-pressed": connected, disabled: disabled, className: (0, cn_1.cn)(
        // ≥44px rounded tap target with 8-pt padding.
        'inline-flex min-h-[44px] items-center justify-center gap-[var(--xen-space-xs)]', 'rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', 'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-40', 
        // V4 spotlight: soft-primary tint + accent when connected, plain otherwise.
        connected ? 'bg-primary/10 text-primary' : 'bg-transparent text-on-surface hover:opacity-70', className), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: connected ? '📲' : '🔗', size: GLYPH_SIZE[size], color: tint }), variant === 'labeled' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold", children: connected && deviceName ? deviceName : 'Cast' })) : null] }));
});
//# sourceMappingURL=CastButtonV4.js.map