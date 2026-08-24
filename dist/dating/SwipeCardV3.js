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
exports.SwipeCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DistanceBadge_1 = require("./DistanceBadge");
const STAMP = {
    like: { text: 'LIKE', color: 'text-success border-success', tint: 'bg-success/10' },
    nope: { text: 'NOPE', color: 'text-danger border-danger', tint: 'bg-danger/10' },
    superlike: { text: 'SUPER', color: 'text-accent border-accent', tint: 'bg-accent/10' },
};
/**
 * SwipeCard — design variant **V3**, a **framed card with a caption strip** (web
 * parity of the native V3). Unlike the full-bleed base/V2, the photo is inset
 * inside a padded surface frame (a tasteful, editorial "polaroid"), and the
 * name/age/tagline/distance live in a **solid caption strip below the image**
 * rather than overlaid on it. The decision stamp still floats over the photo. Same
 * `SwipeCardProps`; token classes only; a placeholder covers missing photos.
 */
exports.SwipeCardV3 = React.forwardRef(function SwipeCardV3({ profile, variant = 'photo', overlay = null, overlayOpacity, className, ...rest }, ref) {
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const stampOpacity = overlay ? Math.max(0, Math.min(1, overlayOpacity ?? 1)) : 0;
    const stamp = overlay ? STAMP[overlay] : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `${title}${profile.tagline ? `. ${profile.tagline}` : ''}`, className: (0, cn_1.cn)('w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface p-sm shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative w-full overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-200', variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[3/4]'), children: [profile.photoUri ? ((0, jsx_runtime_1.jsx)("img", { src: profile.photoUri, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-3xl", children: "\uD83D\uDE42" }) })), stamp ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", style: { opacity: stampOpacity }, className: (0, cn_1.cn)('pointer-events-none absolute left-4 top-4 -rotate-12 rounded-[var(--xen-radius-md)] border-[3px] px-sm py-xs text-xl font-extrabold tracking-widest', stamp.color, stamp.tint), children: stamp.text })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 px-xs pt-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-on-surface", children: title }), profile.verified ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2714", size: "sm", color: "primary", "aria-label": "Verified" }) : null, profile.online ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-success" }) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)("span", { className: "ml-auto", children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, unit: "km", variant: "outline" }) })) : null] }), profile.tagline ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-muted", children: profile.tagline }) : null] })] }));
});
//# sourceMappingURL=SwipeCardV3.js.map