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
exports.LoyaltyCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * Tier → tone, glyph and default word.
 *
 * `silver` takes `neutral` rather than the base's `muted`: both mean "no
 * status", but `muted` is a ramp step with no contrast promise and this is a
 * *label*, not a wash.
 */
const TIER_META = {
    bronze: { label: 'Bronze', glyph: '🥉', tone: 'warn' },
    silver: { label: 'Silver', glyph: '🥈', tone: 'neutral' },
    gold: { label: 'Gold', glyph: '🥇', tone: 'accent' },
    platinum: { label: 'Platinum', glyph: '💎', tone: 'primary' },
};
/**
 * **V4 loyalty card** — the web twin of the native `LoyaltyCardV4`, same props
 * as {@link LoyaltyCard} plus four copy hooks.
 *
 * ## Four changes
 *
 * 1. **The progress bar is `ProgressV4`.** The base drew its own track and
 *    fill, so the one meter on this card did not match the meters everywhere
 *    else and announced no value.
 * 2. **The points figure is tabular and formatted** — a loyalty balance is a
 *    number a member compares against a target.
 * 3. **The tier ink is contrast-corrected**, where the base put a fill slot on
 *    text, including `muted`, which promises nothing.
 * 4. **A top-tier member is told so** rather than silently getting a full bar.
 *
 * **Renders nothing without a `memberName`** (§4.5).
 */
exports.LoyaltyCardV4 = React.forwardRef(function LoyaltyCardV4({ memberName, points, tier = 'bronze', nextTierAt, nextTierLabel, memberId, tierLabels, formatPoints, formatRemaining, topTierLabel = 'Top tier', className, ...rest }, ref) {
    if (!memberName)
        return null;
    const meta = TIER_META[tier] ?? TIER_META.bronze;
    const word = tierLabels?.[tier] ?? meta.label;
    const total = Number.isFinite(points) ? points : 0;
    const pointsText = (formatPoints ?? ((n) => `${n.toLocaleString()} points`))(total);
    const hasTarget = typeof nextTierAt === 'number' && nextTierAt > 0 && nextTierAt > total;
    const pct = hasTarget ? Math.max(0, Math.min(100, (total / nextTierAt) * 100)) : 100;
    const remaining = hasTarget ? nextTierAt - total : 0;
    const remainingText = hasTarget
        ? (formatRemaining ?? ((n, t) => `${n.toLocaleString()} to ${t}`))(remaining, nextTierLabel ?? 'next tier')
        : topTierLabel;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-loyalty-card": tier, "aria-label": (0, salon_v4_1.metaLine)([word, memberName, pointsText, remainingText]), className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-bold text-on-card", children: memberName }), memberId ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: memberId })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "lg" }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: word })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-2xl font-bold [font-variant-numeric:tabular-nums]', salon_v4_1.TONE_INK[meta.tone]), children: pointsText }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: remainingText })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: "primary" })] })] }));
});
//# sourceMappingURL=LoyaltyCardV4.js.map