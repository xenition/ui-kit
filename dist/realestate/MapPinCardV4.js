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
exports.MapPinCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * MapPinCard — **V4** "listing" design (web parity of the native V4). The
 * image-forward, editorial take on the location preview: a rounded elevated frame
 * with a subtle soft-primary gradient "ground" (no faux grid clutter) and a single
 * primary pill pin marking the spot. STATIC and dependency-free — it imports no map
 * library, so it renders in any environment; wire a real map behind `onClick`. Same
 * props/behavior as {@link MapPinCardProps}: `address` + `caption` in a floating
 * card overlay, `pin` position clamped to the frame. All colors come from the
 * `--xen-*` tokens (no literals); a11y-labelled.
 */
exports.MapPinCardV4 = React.forwardRef(function MapPinCardV4({ address, caption, pin = { x: 0.5, y: 0.5 }, height = 160, onClick, className, ...rest }, ref) {
    const x = (0, internal_1.clamp01)(pin.x);
    const y = (0, internal_1.clamp01)(pin.y);
    const interactive = (0, internal_1.clickableProps)(onClick, `Open map for ${address}`);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, onClick: onClick, "aria-label": interactive ? undefined : `Map showing ${address}`, role: interactive ? undefined : 'img', style: { height }, className: (0, cn_1.cn)('relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-gradient-to-br from-primary/10 to-surface shadow-md', onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("span", { "data-testid": "xen-re-map-pin", "aria-hidden": "true", className: "absolute flex -translate-x-1/2 -translate-y-full flex-col items-center", style: { left: `${x * 100}%`, top: `${y * 100}%` }, children: [(0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full border border-on-primary bg-primary px-2.5 py-1 text-xs font-bold text-on-primary shadow-md", children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDCCD" }), address] }), (0, jsx_runtime_1.jsx)("span", { className: "h-2 w-0.5 bg-primary" })] }), (0, jsx_runtime_1.jsxs)("span", { className: "absolute inset-x-2 bottom-2 block rounded-[var(--xen-radius-md)] border border-border bg-surface px-2 py-1 shadow-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm font-semibold text-on-surface", children: address }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted", children: caption }) : null] })] }));
});
//# sourceMappingURL=MapPinCardV4.js.map