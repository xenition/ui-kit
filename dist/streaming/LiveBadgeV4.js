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
exports.LiveBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
/**
 * LiveBadge — **V4** "spotlight" design (web parity of the native V4). A refined
 * LIVE pill: a pulsing-look `danger` dot (a solid core inside a soft-danger halo
 * ring, so live status reads by glyph + color, never color alone) beside a bold
 * "LIVE" label on a soft `bg-danger/10` tint pill. Keeps the base's three
 * variants (`solid` / `outline` / `dot`) and the optional viewer count. Same
 * props/behavior as {@link LiveBadgeProps}; every color resolves from `--xen-*`
 * danger / on-danger / muted tokens — no literal hex. The combined text
 * (label + viewers) is exposed as the element's `aria-label`.
 */
exports.LiveBadgeV4 = React.forwardRef(function LiveBadgeV4({ variant = 'solid', label = 'LIVE', viewers, className, 'aria-label': ariaLabel, ...rest }, ref) {
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const dotOnly = variant === 'dot';
    const countText = viewers != null ? `${(0, types_1.formatCount)(viewers)} watching` : undefined;
    const a11y = ariaLabel ?? [label, countText].filter(Boolean).join(', ');
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "data-xen-live-badge": "", "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center self-start gap-[var(--xen-space-xs)] rounded-full', !dotOnly && 'px-[var(--xen-space-sm)] py-0.5', 
        // V4 spotlight: soft-danger tint pill for solid, outline keeps its border, dot stays chrome-less.
        solid && 'bg-danger/10 text-danger', outline && 'border border-danger text-danger', dotOnly && 'text-danger', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-flex h-3 w-3 items-center justify-center rounded-full bg-danger/20", children: (0, jsx_runtime_1.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-danger" }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold tracking-wide", children: label.toUpperCase() }), countText ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium text-muted", children: countText })) : null] }));
});
//# sourceMappingURL=LiveBadgeV4.js.map