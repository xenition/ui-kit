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
exports.SwipeCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DistanceBadge_1 = require("./DistanceBadge");
const STAMP_SPEC = {
    like: { text: 'LIKE', color: 'text-success border-success', position: 'left-6' },
    nope: { text: 'NOPE', color: 'text-danger border-danger', position: 'right-6' },
    superlike: { text: 'SUPER', color: 'text-accent border-accent', position: 'left-1/2 -translate-x-1/2' },
};
/**
 * A single deck card — the web parity of the native swipe card. Renders a
 * full-bleed profile photo with a bottom scrim carrying the name/age/tagline and
 * a distance badge, plus a decision stamp (LIKE / NOPE / SUPER) whose opacity
 * tracks drag progress. Used standalone or, more often, driven by {@link SwipeDeck}.
 * Scrim and colors derive from token classes — no literal colors. Missing photos
 * fall back to a token placeholder.
 */
exports.SwipeCard = React.forwardRef(function SwipeCard({ profile, variant = 'photo', overlay = null, overlayOpacity, className, ...rest }, ref) {
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const stampOpacity = overlay ? Math.max(0, Math.min(1, overlayOpacity ?? 1)) : 0;
    const stamp = overlay ? STAMP_SPEC[overlay] : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "img", "aria-label": `${title}${profile.tagline ? `. ${profile.tagline}` : ''}`, className: (0, cn_1.cn)('relative w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-neutral-200', variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[3/4]', className), ...rest, children: [profile.photoUri ? ((0, jsx_runtime_1.jsx)("img", { src: profile.photoUri, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-3xl", children: "\uD83D\uDE42" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 bottom-0 flex flex-col gap-xs bg-gradient-to-t from-neutral-950 to-transparent p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-neutral-50", children: title }), profile.verified ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2714", size: "sm", color: "onSurface", "aria-label": "Verified", className: "text-neutral-50" }) : null, profile.online ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-success" }) : null] }), profile.tagline ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-sm text-neutral-100", children: profile.tagline }) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, unit: "km" }) })) : null] }), stamp ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", style: { opacity: stampOpacity }, className: (0, cn_1.cn)('pointer-events-none absolute top-6 -rotate-12 rounded-[var(--xen-radius-md)] border-[3px] bg-surface px-sm py-xs', 'text-xl font-extrabold tracking-widest', stamp.color, stamp.position), children: stamp.text })) : null] }));
});
//# sourceMappingURL=SwipeCard.js.map