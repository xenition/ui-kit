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
exports.SwipeCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DistanceBadge_1 = require("./DistanceBadge");
/** Filled decision-stamp spec: a solid tone badge rather than an outline. */
const STAMP = {
    like: { text: 'LIKE', bg: 'bg-success', on: 'text-on-success', position: 'left-6', rotate: '-rotate-6' },
    nope: { text: 'NOPE', bg: 'bg-danger', on: 'text-on-danger', position: 'right-6', rotate: 'rotate-6' },
    superlike: { text: 'SUPER', bg: 'bg-accent', on: 'text-on-accent', position: 'left-6', rotate: '-rotate-6' },
};
/**
 * SwipeCard — design variant **V2** (web parity of the native V2). A softly
 * rounded full-bleed card with a multi-band gradient scrim (not the base's single
 * flat one), an inline name·distance line, and a **solid, filled decision stamp**
 * that swings in from the like/nope side. Reads as a plusher, more modern deck
 * card at a glance. Same `SwipeCardProps`, so it drops straight into `SwipeDeck`;
 * token classes only; photo-less profiles fall back to a token placeholder.
 */
exports.SwipeCardV2 = React.forwardRef(function SwipeCardV2({ profile, variant = 'photo', overlay = null, overlayOpacity, className, ...rest }, ref) {
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const stampOpacity = overlay ? Math.max(0, Math.min(1, overlayOpacity ?? 1)) : 0;
    const stamp = overlay ? STAMP[overlay] : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `${title}${profile.tagline ? `. ${profile.tagline}` : ''}`, className: (0, cn_1.cn)('relative w-full overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-200 shadow-lg', variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[3/4]', className), ...rest, children: [profile.photoUri ? ((0, jsx_runtime_1.jsx)("img", { src: profile.photoUri, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-3xl", children: "\uD83D\uDE42" }) })), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-neutral-50", children: title }), profile.verified ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2714", size: "sm", color: "onSurface", "aria-label": "Verified", className: "text-neutral-50" }) : null, profile.online ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2.5 w-2.5 rounded-full bg-success" }) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)("span", { className: "ml-auto", children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, unit: "km", variant: "soft" }) })) : null] }), profile.tagline ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-neutral-100", children: profile.tagline }) : null] }), stamp ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", style: { opacity: stampOpacity }, className: (0, cn_1.cn)('pointer-events-none absolute top-8 rounded-[var(--xen-radius-md)] px-md py-xs text-xl font-extrabold tracking-widest shadow-md', stamp.bg, stamp.on, stamp.position, stamp.rotate), children: stamp.text })) : null] }));
});
//# sourceMappingURL=SwipeCardV2.js.map