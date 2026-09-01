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
exports.DriverRatingRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const fleet_v4_1 = require("./internal/fleet-v4");
/**
 * **V4 driver rating row** — the web twin of the native `DriverRatingRowV4`,
 * same props as {@link DriverRatingRow} plus three copy hooks.
 *
 * ## Four changes
 *
 * 1. **The read-only form is `RatingV4` with its value showing.**
 * 2. **Each interactive star is a real 44px target**, and the group is a
 *    `radiogroup` — so a keyboard user arrows through the stars instead of
 *    tabbing five times, and a reader hears one control rather than five.
 * 3. **The skeleton is opaque.**
 * 4. **Every English string is a prop.**
 *
 * **Renders nothing without a `driverName`** (§4.5).
 */
exports.DriverRatingRowV4 = React.forwardRef(function DriverRatingRowV4({ driverName, avatarUrl, subtitle, value = 0, max = 5, onRate, variant = 'interactive', loading = false, formatRating, formatStarLabel, unratedLabel = 'Not rated', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: (0, cn_1.cn)('flex items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-12 w-12 rounded-full', fleet_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-4 w-1/2', fleet_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-3 w-2/3', fleet_v4_1.SKELETON_CLASS) })] })] }));
    }
    if (!driverName)
        return null;
    const parts = (0, fleet_v4_1.ratingParts)({ value, max, format: formatRating });
    const interactive = variant === 'interactive' && Boolean(onRate);
    const starLabel = formatStarLabel ?? ((star, total) => `Rate ${star} of ${total} stars`);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-driver-rating": "", "aria-label": interactive ? undefined : `${driverName}, ${parts.text ? parts.label : unratedLabel}`, className: (0, cn_1.cn)('flex items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: driverName, size: "md" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-bold text-on-card", children: driverName }), subtitle ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted-text", children: subtitle }) : null] }), interactive ? ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": parts.label, className: "flex shrink-0", children: Array.from({ length: parts.total }, (_, i) => {
                    const star = i + 1;
                    const on = star <= parts.filled;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": on && star === parts.filled, "aria-label": starLabel(star, parts.total), onClick: () => onRate?.(star), "data-xen-v4-chrome": "on-surface", 
                        /* The target is 44; the glyph stays small. */
                        className: (0, cn_1.cn)('flex w-11 items-center justify-center rounded-full', chrome_v4_1.MIN_TAP_CLASS, on ? 'text-warn-text' : 'text-muted-text'), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: on ? 'star' : 'star-outline', size: "lg" }) }, star));
                }) })) : parts.text ? ((0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: value, max: max, size: "sm", showValue: true })) : ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted-text", children: unratedLabel }))] }));
});
//# sourceMappingURL=DriverRatingRowV4.js.map