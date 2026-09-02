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
exports.RewardStarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const family_v4_1 = require("./family-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** The star glyph's size, from the type scale. */
const GLYPH_SIZE = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
};
/**
 * The **ink** each colour slot takes.
 *
 * The base handed `color` to `Icon`, whose table inks with the *fill* tokens —
 * `text-warn` is `var(--xen-warn)` and measures as low as 1.3:1 as text. A star
 * is a glyph, which is text, so it takes the contrast-corrected `*Text` slot.
 */
const STAR_INK = {
    onSurface: 'text-on-surface',
    onPrimary: 'text-on-primary',
    primary: 'text-primary-text',
    muted: 'text-muted-text',
    success: 'text-success-text',
    onSuccess: 'text-on-success',
    warn: 'text-warn-text',
    onWarn: 'text-on-warn',
    danger: 'text-danger-text',
    onDanger: 'text-on-danger',
};
/**
 * **V4 reward star** — same props as {@link RewardStar} plus `formatCount` and
 * `awardLabel`.
 *
 * ## Six changes
 *
 * 1. **Awarding never takes stars away.** `RewardStarV2` fired
 *    `onReward(filled >= total ? 1 : filled + 1)`, so a parent at five of five
 *    who tapped once more silently dropped the child to **one** star, with no
 *    undo and no confirmation. The "one more" gesture is `nextAward` now: at
 *    the maximum it is a disabled control rather than a destructive one.
 * 2. **The stars are targets a child can hit.** They were roughly 20px, with
 *    `hitSlop={6}` on native and nothing at all on web — in the one module of
 *    the kit whose users have small hands and poor aim. Every star clears 44.
 * 3. **One interaction model on both twins.** Native declared
 *    `accessibilityRole="adjustable"` with no `accessibilityActions`, so
 *    VoiceOver's swipe-up and swipe-down did nothing; web was a `role="group"`
 *    of buttons or a `role="img"`, depending on a prop. Both twins are now a
 *    named group of real, individually-named buttons, and a display-only row is
 *    a single `role="img"` carrying the count.
 * 4. **The count is a string a caller owns.** `Reward: 3 of 5 stars` was
 *    assembled inline in English, including the plural. Every award control —
 *    each star, and the "one more" shortcut beside them — is named
 *    `` `${awardLabel}: ${formatCount(n, max)}` ``, the same composition the
 *    native twin uses, so the two twins say the same sentence for the same
 *    props. `awardLabel` is the **verb** in that sentence and is never drawn
 *    as prose on its own; a button reading only "Award" tells a parent
 *    nothing about what it will award.
 * 5. **A star is inked with the corrected slot.** `Icon`'s colour table maps
 *    `warn` to the *fill* token, which measures as low as 1.3:1 drawn as a
 *    glyph — and `warn` is this component's default.
 * 6. **Press is a state layer.** `hover:opacity-70` is inside M3's *disabled*
 *    band, so a hovered star and a dead star looked alike.
 */
exports.RewardStarV4 = React.forwardRef(function RewardStarV4({ value, max = 5, size = 'md', label, color = 'warn', readOnly = false, formatCount, awardLabel = 'Award', onReward, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const parts = (0, family_v4_1.starParts)(value, max);
    if (!parts.hasScale)
        return null;
    const count = formatCount ?? ((filled, total) => `${filled} of ${total} stars`);
    const countText = count(parts.filled, parts.max);
    const name = (0, tone_v4_1.spokenLine)([countText, label]);
    const interactive = !readOnly && typeof onReward === 'function';
    const next = (0, family_v4_1.nextAward)(parts.filled, parts.max);
    /**
     * The one sentence every award control announces — `awardLabel` as the
     * verb, `formatCount` as the object, exactly as the native twin composes
     * it. `awardLabel` is a verb, not prose: it is never drawn on its own,
     * because "Award" by itself is not a label a parent can act on and it read
     * as one only because this twin used the prop for two different jobs.
     */
    const awardName = (value) => `${awardLabel}: ${count(value, parts.max)}`;
    const glyphClass = (0, cn_1.cn)('leading-none', GLYPH_SIZE[size]);
    const stars = Array.from({ length: parts.max }).map((_, index) => {
        const filled = index < parts.filled;
        const glyph = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)(glyphClass, filled ? STAR_INK[color] : 'text-muted-text'), children: filled ? '★' : '☆' }));
        if (!interactive) {
            return ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center justify-center", children: glyph }, index));
        }
        return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": awardName(index + 1), onClick: () => onReward?.(index + 1), "data-xen-v4-state": "", style: (0, tone_v4_1.surfaceStateVars)(), className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-[var(--xen-radius-md)] bg-transparent', nav_v4_1.MIN_TAP_SQUARE_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: glyph }, index));
    });
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-reward-star": "", role: interactive ? 'group' : 'img', "aria-label": name, className: (0, cn_1.cn)('flex flex-col items-start gap-xs', className), children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap items-center gap-xs", children: stars }), interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", 
                // At the maximum `nextAward` returns `undefined` and the gesture is
                // a no-op — which is the whole fix. A disabled control says so.
                disabled: next === undefined, "aria-label": awardName(next ?? parts.filled), onClick: () => {
                    if (next !== undefined)
                        onReward?.(next);
                }, "data-xen-v4-state": "", style: (0, tone_v4_1.surfaceStateVars)(), className: (0, cn_1.cn)('inline-flex items-center justify-center bg-transparent', 'rounded-[var(--xen-radius-md)] font-semibold text-primary-text', v4_state_1.V4_DISABLED_CLASS, nav_v4_1.MIN_TAP_SQUARE_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: glyphClass, children: "\uFF0B" }) })) : null, label ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: label }) : null] }));
});
//# sourceMappingURL=RewardStarV4.js.map