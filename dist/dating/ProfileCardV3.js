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
exports.ProfileCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const DistanceBadge_1 = require("./DistanceBadge");
const CompatibilityMeter_1 = require("./CompatibilityMeter");
const ProfilePrompt_1 = require("./ProfilePrompt");
const IcebreakerChip_1 = require("./IcebreakerChip");
const LikePassButtons_1 = require("./LikePassButtons");
/**
 * ProfileCard — design variant **V3**, an **editorial split** (web parity of the
 * native V3). A rounded hero photo sits at the top; below it a borderless
 * editorial header (oversized name, headline, distance) leads into the
 * compatibility bar, then the profile **prompts become the hero content** — each a
 * raised card — followed by a labelled interest rail. Airy, type-led, and
 * unmistakably distinct from the base summary card and the full-bleed V2. Same
 * `ProfileCardProps`; token classes only; guarded; loading/empty states included.
 */
exports.ProfileCardV3 = React.forwardRef(function ProfileCardV3({ profile, variant = 'full', showActions = false, onAction, onClickInterest, loading = false, emptyLabel = 'No profile to show', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", className: (0, cn_1.cn)('flex w-full flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-[5/4] w-full animate-pulse rounded-[var(--xen-radius-lg)] bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-5 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-4/5 rounded-[var(--xen-radius-sm)] bg-neutral-200" })] })] }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": emptyLabel, className: (0, cn_1.cn)('flex w-full flex-col items-center gap-xs rounded-[var(--xen-radius-lg)] border border-border p-lg text-center', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl", children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel })] }));
    }
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const hero = photos.length > 0 ? photos[0] : undefined;
    const interests = profile.interests ?? [];
    const prompts = profile.prompts ?? [];
    const heroRatio = variant === 'compact' ? 'aspect-[16/9]' : 'aspect-[5/4]';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex w-full flex-col gap-lg', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full overflow-hidden rounded-[var(--xen-radius-lg)] bg-neutral-200 shadow-md', heroRatio), role: "img", "aria-label": title, children: hero?.uri ? ((0, jsx_runtime_1.jsx)("img", { src: hero.uri, alt: hero.alt ?? '', className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-3xl", children: "\uD83D\uDE42" }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-extrabold tracking-tight text-on-surface", children: title }), profile.verified ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2714", size: "sm", color: "primary", "aria-label": "Verified" }) : null, profile.online ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", "aria-label": "Active now", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-success" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-success", children: "Active" })] })) : null] }), profile.headline ? (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted", children: profile.headline }) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)("span", { className: "mt-xs self-start", children: (0, jsx_runtime_1.jsx)(DistanceBadge_1.DistanceBadge, { distance: profile.distanceKm }) })) : null] }), profile.compatibility != null ? (0, jsx_runtime_1.jsx)(CompatibilityMeter_1.CompatibilityMeter, { score: profile.compatibility }) : null, profile.bio ? (0, jsx_runtime_1.jsx)("p", { className: "text-base leading-relaxed text-on-surface", children: profile.bio }) : null, prompts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-md", children: prompts.map((p) => ((0, jsx_runtime_1.jsx)("div", { className: "rounded-[var(--xen-radius-lg)] bg-surface shadow-sm", children: (0, jsx_runtime_1.jsx)(ProfilePrompt_1.ProfilePrompt, { prompt: p.prompt, answer: p.answer, variant: "card" }) }, p.id))) })) : null, interests.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: "Interests" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(IcebreakerChip_1.IcebreakerChip, { label: interest, variant: "outline", size: "sm", onClick: onClickInterest }, `${interest}-${i}`))) })] })) : null, showActions ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs border-t border-border pt-md", children: (0, jsx_runtime_1.jsx)(LikePassButtons_1.LikePassButtons, { actions: ['rewind', 'pass', 'superlike', 'like'], onAction: onAction }) })) : null] }));
});
//# sourceMappingURL=ProfileCardV3.js.map