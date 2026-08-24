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
exports.ProfileCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const PhotoCarousel_1 = require("./PhotoCarousel");
const DistanceBadge_1 = require("./DistanceBadge");
const CompatibilityMeter_1 = require("./CompatibilityMeter");
const ProfilePrompt_1 = require("./ProfilePrompt");
const IcebreakerChip_1 = require("./IcebreakerChip");
const LikePassButtons_1 = require("./LikePassButtons");
/**
 * A full profile summary — the web parity of the native profile card. Composes the
 * dating blocks (photo carousel, distance badge, compatibility meter, prompts,
 * interest chips, and an optional action row) into one card. `compact` collapses
 * to a headline row for lists. Token classes only — no literal colors. Explicit
 * loading and empty states; array access is guarded.
 */
exports.ProfileCard = React.forwardRef(function ProfileCard({ profile, variant = 'full', showActions = false, onAction, onClickInterest, loading = false, emptyLabel = 'No profile to show', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('overflow-hidden p-0', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-[4/5] w-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-4/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" })] })] }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('flex flex-col items-center gap-xs p-lg text-center', className), "aria-label": emptyLabel, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl", children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const interests = profile.interests ?? [];
    const prompts = profile.prompts ?? [];
    const nameRow = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-on-surface", children: title }), profile.verified ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2714", size: "sm", color: "primary", "aria-label": "Verified" }) : null, profile.online ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", "aria-label": "Active now", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-success" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-success", children: "Active" })] })) : null] }));
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('p-md', className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 shrink-0", children: (0, jsx_runtime_1.jsx)(PhotoCarousel_1.PhotoCarousel, { photos: photos.slice(0, 1), ratio: "square" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [nameRow, profile.headline ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: profile.headline }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [profile.distanceKm != null ? (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm }) : null, profile.compatibility != null ? ((0, jsx_runtime_1.jsx)(CompatibilityMeter_1.CompatibilityMeter, { score: profile.compatibility, variant: "compact", showValue: true })) : null] })] })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)('overflow-hidden p-0', className), ...rest, children: [(0, jsx_runtime_1.jsx)(PhotoCarousel_1.PhotoCarousel, { photos: photos, ratio: "portrait", rounded: false }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [nameRow, profile.headline ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: profile.headline }) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-sm", children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm }) })) : null] }), profile.compatibility != null ? (0, jsx_runtime_1.jsx)(CompatibilityMeter_1.CompatibilityMeter, { score: profile.compatibility }) : null, profile.bio ? (0, jsx_runtime_1.jsx)("p", { className: "text-base leading-relaxed text-on-surface", children: profile.bio }) : null, interests.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(IcebreakerChip_1.IcebreakerChip, { label: interest, variant: "soft", size: "sm", onClick: onClickInterest }, `${interest}-${i}`))) })) : null, prompts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: prompts.map((p) => ((0, jsx_runtime_1.jsx)(ProfilePrompt_1.ProfilePrompt, { prompt: p.prompt, answer: p.answer, variant: "card" }, p.id))) })) : null, showActions ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs", children: (0, jsx_runtime_1.jsx)(LikePassButtons_1.LikePassButtons, { actions: ['pass', 'superlike', 'like'], onAction: onAction }) })) : null] })] }));
});
//# sourceMappingURL=ProfileCard.js.map