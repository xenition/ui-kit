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
exports.ProfileCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DistanceBadge_1 = require("./DistanceBadge");
const CompatibilityMeter_1 = require("./CompatibilityMeter");
const IcebreakerChip_1 = require("./IcebreakerChip");
const LikePassButtons_1 = require("./LikePassButtons");
/**
 * ProfileCard — design variant **V2** (web parity of the native V2). Where the
 * base stacks a photo carousel above separate meter/bio/prompt blocks, V2 is a
 * single **full-bleed hero**: the primary photo fills the card, a token gradient
 * scrim carries the name/age, headline and distance, a compatibility pill floats
 * top-right on a surface chip, and a slim detail strip beneath surfaces
 * bio/interests/actions. Same `ProfileCardProps`, so it is a genuine drop-in.
 * Token classes only; explicit loading/empty states; array access is guarded.
 */
exports.ProfileCardV2 = React.forwardRef(function ProfileCardV2({ profile, variant = 'full', showActions = false, onAction, onClickInterest, loading = false, emptyLabel = 'No profile to show', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('overflow-hidden p-0 shadow-lg', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-[4/5] w-full animate-pulse bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-4/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" })] })] }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center gap-xs p-lg text-center shadow-lg', className), "aria-label": emptyLabel, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl", children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const hero = photos.length > 0 ? photos[0] : undefined;
    const interests = (profile.interests ?? []).slice(0, 4);
    const heroRatio = variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[4/5]';
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('overflow-hidden p-0 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative w-full bg-neutral-200', heroRatio), role: "img", "aria-label": `${title}${profile.headline ? `. ${profile.headline}` : ''}`, children: [hero?.uri ? ((0, jsx_runtime_1.jsx)("img", { src: hero.uri, alt: hero.alt ?? '', className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-3xl", children: "\uD83D\uDE42" }) })), profile.compatibility != null ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute right-sm top-sm rounded-full bg-surface px-xs py-0.5 shadow-sm", children: (0, jsx_runtime_1.jsx)(CompatibilityMeter_1.CompatibilityMeter, { score: profile.compatibility, variant: "compact", showValue: true }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-x-0 bottom-0 flex flex-col gap-xs bg-gradient-to-t from-neutral-950 to-transparent p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-neutral-50", children: title }), profile.verified ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2714", size: "sm", color: "onSurface", "aria-label": "Verified", className: "text-neutral-50" }) : null, profile.online ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", "aria-label": "Active now", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-success" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-neutral-100", children: "Active" })] })) : null] }), profile.headline ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-neutral-100", children: profile.headline }) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start", children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm, unit: "km" }) })) : null] })] }), (profile.bio || interests.length > 0 || showActions) && variant !== 'compact' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [profile.bio ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-base leading-relaxed text-on-surface", children: profile.bio }) : null, interests.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(IcebreakerChip_1.IcebreakerChip, { label: interest, variant: "soft", size: "sm", onClick: onClickInterest }, `${interest}-${i}`))) })) : null, showActions ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs", children: (0, jsx_runtime_1.jsx)(LikePassButtons_1.LikePassButtons, { actions: ['pass', 'superlike', 'like'], onAction: onAction }) })) : null] })) : null] }));
});
//# sourceMappingURL=ProfileCardV2.js.map