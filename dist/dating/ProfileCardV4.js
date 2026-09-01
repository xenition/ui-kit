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
exports.ProfileCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const profile_v4_1 = require("./internal/profile-v4");
const CompatibilityMeterV4_1 = require("./CompatibilityMeterV4");
const DistanceBadgeV4_1 = require("./DistanceBadgeV4");
const IcebreakerChipV4_1 = require("./IcebreakerChipV4");
const LikePassButtonsV4_1 = require("./LikePassButtonsV4");
const PhotoCarouselV4_1 = require("./PhotoCarouselV4");
const ProfilePromptV4_1 = require("./ProfilePromptV4");
/** 64 — the compact thumbnail, `2xl + md`. */
const THUMB_CLASS = 'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]';
/**
 * **V4 profile card** — the web twin of the native `ProfileCardV4`, same props
 * as {@link ProfileCard} plus `loadingLabel`.
 *
 * `onClickInterest` is the web spelling of native's `onPressInterest`; that is
 * the one permitted split in the twin contract, and both names mean the same
 * callback with the same argument.
 *
 * ## Four changes
 *
 * 1. **A card nobody can press does not look pressable.** Every state used the
 *    same `Card`, and the two twins picked different variants for it, so a
 *    static profile summary carried a hover raise and an affordance it had no
 *    handler for. The variant follows the presence of a click handler, and the
 *    component does not fabricate a `role="button"` around a `<div>` to make up
 *    the difference — a caller who wants a pressable profile wraps it in one.
 * 2. **The name is a heading.** A profile card is the top of a page's content
 *    far more often than it is a row, and its name was an anonymous `<span>`,
 *    so the card had no structure a reader could jump to.
 * 3. **Loading and empty are announced and shaped.** The skeleton was three
 *    `bg-neutral-200` blocks — a ramp step, a near-white slab in dark mode —
 *    with nothing telling assistive tech that anything was happening; empty was
 *    an emoji and a line of `muted`, a decorative slot used as text.
 * 4. **Its parts are the V4 parts**, so the interest chips clear 44 (they were
 *    rendered here at `sm`, around 22px, which is where most of the module's
 *    undersized targets actually lived), the distance badge honours its
 *    `variant`, the meter reports a value and the photo pager has visible
 *    controls. The compact thumbnail asks for `showControls={false}` — chevrons
 *    on a 64px square are decoration, and the row is not a pager.
 */
exports.ProfileCardV4 = React.forwardRef(function ProfileCardV4({ profile, variant = 'full', showActions = false, onAction, onClickInterest, loading = false, emptyLabel = 'No profile to show', loadingLabel = 'Loading profile', onClick, className, ...rest }, ref) {
    const pressable = onClick != null;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: "outlined", padding: "none", role: "status", "aria-busy": "true", "aria-label": loadingLabel, className: (0, cn_1.cn)('overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block aspect-[4/5] w-full', profile_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-md w-1/2', profile_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-sm w-4/5', profile_v4_1.PLACEHOLDER_CLASS) })] })] }));
    }
    if (!profile) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, variant: "outlined", padding: "none", className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)("span", { className: "text-2xl", children: "\uD83D\uDC64" }), title: emptyLabel }) }));
    }
    const title = profile.age != null ? `${profile.name}, ${profile.age}` : profile.name;
    const photos = profile.photos ?? [];
    const interests = profile.interests ?? [];
    const prompts = profile.prompts ?? [];
    const nameRow = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-heading text-xl font-bold text-on-surface", children: title }), profile.verified ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\u2714", size: "sm", color: "primary", "aria-label": "Verified" }) : null, profile.online ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-sm w-sm rounded-full bg-success" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-success-text", children: "Active now" })] })) : null] }));
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, variant: pressable ? 'interactive' : 'outlined', padding: "md", onClick: onClick, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('shrink-0', THUMB_CLASS), children: (0, jsx_runtime_1.jsx)(PhotoCarouselV4_1.PhotoCarouselV4, { photos: photos.slice(0, 1), ratio: "square", showControls: false }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [nameRow, profile.headline ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: profile.headline })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)(DistanceBadgeV4_1.DistanceBadgeV4, { distance: profile.distanceKm })) : null, profile.compatibility != null ? ((0, jsx_runtime_1.jsx)(CompatibilityMeterV4_1.CompatibilityMeterV4, { score: profile.compatibility, variant: "compact", showValue: true })) : null] })] })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: pressable ? 'interactive' : 'outlined', padding: "none", onClick: onClick, className: (0, cn_1.cn)('overflow-hidden', className), ...rest, children: [(0, jsx_runtime_1.jsx)(PhotoCarouselV4_1.PhotoCarouselV4, { photos: photos, ratio: "portrait", rounded: false }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [nameRow, profile.headline ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: profile.headline })) : null, profile.distanceKm != null ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-sm", children: (0, jsx_runtime_1.jsx)(DistanceBadgeV4_1.DistanceBadgeV4, { distance: profile.distanceKm }) })) : null] }), profile.compatibility != null ? ((0, jsx_runtime_1.jsx)(CompatibilityMeterV4_1.CompatibilityMeterV4, { score: profile.compatibility })) : null, profile.bio ? ((0, jsx_runtime_1.jsx)("p", { className: "text-base leading-relaxed text-on-surface", children: profile.bio })) : null, interests.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-xs", children: interests.map((interest, i) => ((0, jsx_runtime_1.jsx)(IcebreakerChipV4_1.IcebreakerChipV4, { label: interest, variant: "soft", size: "sm", onClick: onClickInterest }, `${interest}-${i}`))) })) : null, prompts.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: prompts.map((p) => ((0, jsx_runtime_1.jsx)(ProfilePromptV4_1.ProfilePromptV4, { prompt: p.prompt, answer: p.answer, variant: "card" }, p.id))) })) : null, showActions ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs", children: (0, jsx_runtime_1.jsx)(LikePassButtonsV4_1.LikePassButtonsV4, { onAction: onAction }) })) : null] })] }));
});
//# sourceMappingURL=ProfileCardV4.js.map