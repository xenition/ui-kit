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
exports.AchievementUnlockV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const arcade_v4_1 = require("./internal/arcade-v4");
const CARD_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)');
/**
 * **V4 achievement unlock** — same props as {@link AchievementUnlock} plus
 * `lockedLabel` and `pointsUnit`.
 *
 * ## Four changes
 *
 * 1. **A locked achievement no longer opens.** Its own JSDoc promised "a real
 *    `<button>`; disabled while locked", and what shipped was
 *    `aria-disabled={!unlocked}` on a fully live button — an attribute that
 *    *describes* a disabled control without being one, so every click and
 *    every Enter still ran `onClick` and pushed the user into a trophy they
 *    have not earned. It is `disabled` now. (The native twin tells the same
 *    lie the other way: it sets `accessibilityState` and not `disabled`.)
 * 2. **A trophy is identity, not a warning.** The medallion, its ring and the
 *    overline were all `warn` — the colour the kit reserves for "something
 *    needs your attention" — spent on the single most celebratory surface in
 *    the module. Unlocked reads in the brand ink, locked in muted, and the
 *    padlock and the `lockedLabel` overline say which it is in words.
 * 3. **The medallion's ground is a token mix.** `bg-neutral-100` is a step on
 *    the web neutral ramp, which mirrors under `[data-theme="dark"]` — so the
 *    disc that was a pale grey in light mode became a near-black in dark and
 *    the glyph on it went with it.
 * 4. **The point value carries a unit that is a prop.** `` `${points} G` ``
 *    hard-coded Xbox's gamerscore suffix into every app that ships this kit;
 *    `pointsUnit` names it, the figure is tabular, and press is a state layer
 *    on a target that clears 44 rather than `hover:opacity-90`.
 */
exports.AchievementUnlockV4 = React.forwardRef(function AchievementUnlockV4({ achievement, variant = 'toast', unlocked = true, label = 'Achievement unlocked', lockedLabel = 'Locked', pointsUnit = 'G', onClick, className, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!achievement?.title)
        return null;
    const inline = variant === 'inline';
    const overline = unlocked ? label : lockedLabel;
    const pointsText = achievement.points != null ? `${achievement.points} ${pointsUnit}` : undefined;
    const medallion = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-2xl w-2xl shrink-0 items-center justify-center rounded-full border-2 text-2xl', unlocked ? 'border-primary' : 'border-border'), style: { background: (0, tone_v4_1.toneGround)(arcade_v4_1.IDENTITY_TONE) }, children: unlocked ? (achievement.glyph ?? '🏆') : '🔒' }));
    const text = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex flex-col gap-xs', inline ? 'items-center text-center' : 'flex-1 items-start'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', unlocked ? 'text-primary-text' : 'text-muted-text'), children: overline }), (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 font-heading text-lg font-bold text-on-card", children: achievement.title }), achievement.description ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm text-muted-text', inline ? 'line-clamp-3' : 'line-clamp-2'), children: achievement.description })) : null, pointsText ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold text-muted-text', arcade_v4_1.TABULAR_CLASS), children: pointsText })) : null] }));
    const bodyClass = (0, cn_1.cn)('flex w-full gap-md', inline ? 'flex-col items-center' : 'flex-row items-center');
    const cardClass = (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-on-card', className);
    const name = (0, arcade_v4_1.spokenLine)([overline, achievement.title, achievement.description, pointsText]);
    if (!onClick) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": name, className: (0, cn_1.cn)(bodyClass, cardClass), children: [medallion, text] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", 
            // A real disabled button, not an attribute that only says so.
            disabled: !unlocked, "aria-label": name, onClick: () => onClick(achievement), "data-xen-v4-state": "", style: CARD_STATE, className: (0, cn_1.cn)(bodyClass, 'rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-left text-on-card', chrome_v4_1.MIN_TAP_CLASS, 
            // M3's disabled band, from the theme, rather than the base's
            // hand-picked `opacity-60`.
            v4_state_1.V4_DISABLED_CLASS, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [medallion, text] }) }));
});
//# sourceMappingURL=AchievementUnlockV4.js.map