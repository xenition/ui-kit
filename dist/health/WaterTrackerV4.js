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
exports.WaterTrackerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/** The card's own copy. The spec's table settles this component's copy surface. */
const TITLE = 'Water';
const MET_LABEL = 'Goal reached';
/**
 * **V4 water tracker** — same props as {@link WaterTracker} plus `noGoalLabel`,
 * `formatAmount`, `glassLabel` and `appearance`.
 *
 * ## Six changes
 *
 * 1. **Ten glasses against a goal of eight no longer displays "8 / 8".** The
 *    base clamped the *measurement*, so someone who logged 10 glasses and
 *    2,500 ml was shown 8 and 2,000 and told "goal reached" — the overshoot,
 *    which is the one interesting fact on the card, was destroyed rather than
 *    merely not drawn. The readout, the millilitres and the glasses now all
 *    carry it; only the meter's fill is clamped.
 * 2. **Filled and empty are different objects.** `{isFilled ? '🥛' : '🥛'}` was
 *    a dead ternary and the two states were separated by `opacity: 0.3` alone —
 *    which is also, near enough, how a disabled control looks, and is invisible
 *    to anyone who cannot see fine contrast. A full glass is now a filled disc
 *    with a drop in it and an empty one is an open ring.
 * 3. **A glass is a 44px target.** They were about 20px, and they are the most
 *    tapped control on a hydration screen.
 * 4. **The card exposes its progress.** It drew a `filled / goal` readout and
 *    no meter at all.
 * 5. **Press is a state layer**, not `hover:opacity-70` — see change 2 for why
 *    dimming a control cannot mean two things at once.
 * 6. **The no-goal branch keeps `className` and `appearance`**, where the base
 *    returned a bare line of text and dropped both.
 */
exports.WaterTrackerV4 = React.forwardRef(function WaterTrackerV4({ count, goal, mlPerGlass, onChange, noGoalLabel = 'No hydration goal set', formatAmount, glassLabel, appearance = 'classic', className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const shell = (0, cn_1.cn)('flex flex-col gap-md', tone_v4_2.HEALTH_CARD_CLASS, (0, tone_v4_2.appearanceClass)(appearance), className);
    const logged = Math.max(Math.floor(count), 0);
    const parts = (0, goal_v4_1.goalParts)(logged, Math.floor(goal));
    if (!parts.hasGoal) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: shell, ...rest, children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: noGoalLabel }) }));
    }
    const target = parts.target ?? 0;
    const amount = formatAmount ?? ((ml) => `${ml} ml`);
    const nameGlass = glassLabel ??
        ((index, filled) => `Glass ${index + 1}, ${filled ? 'filled' : 'empty'}`);
    // Draw every glass that was logged, not only the ones the goal asked for:
    // the extra glasses ARE the overshoot, so hiding them hides it.
    const slots = Math.max(target, logged);
    const handlePress = (index) => {
        if (!onChange)
            return;
        const position = index + 1;
        onChange(position === logged ? position - 1 : position);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-base font-semibold text-on-card", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: "\uD83D\uDCA7 " }), TITLE] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold', parts.met ? tone_v4_1.TONE_INK.success : 'text-muted-text'), children: [
                            `${logged} / ${target}`,
                            mlPerGlass != null ? amount(logged * mlPerGlass) : undefined,
                        ]
                            .filter(Boolean)
                            .join('  ·  ') })] }), (0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-label": TITLE, "aria-valuenow": Math.min(logged, target), "aria-valuemin": 0, "aria-valuemax": target, "aria-valuetext": (0, tone_v4_2.spokenLine)([
                    `${logged} of ${target}`,
                    mlPerGlass != null ? amount(logged * mlPerGlass) : undefined,
                    parts.met ? MET_LABEL : undefined,
                    parts.over > 0 ? `+${parts.over}` : undefined,
                ]), className: (0, cn_1.cn)('h-2 overflow-hidden rounded-full', tone_v4_2.TRACK_CLASS), children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary", style: { width: `${parts.percent ?? 0}%` } }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-sm", children: Array.from({ length: slots }, (_, index) => {
                    const filled = index < logged;
                    const label = nameGlass(index, filled);
                    // Shape and fill, not alpha: a ring and a disc are still two
                    // different things to someone who cannot see a 30% opacity step.
                    const glass = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm leading-none', filled
                            ? 'border-primary bg-primary text-on-primary'
                            : 'border-border bg-transparent'), children: filled ? '💧' : '' }));
                    if (!onChange) {
                        return ((0, jsx_runtime_1.jsx)("span", { role: "img", "aria-label": label, className: "inline-flex", children: glass }, index));
                    }
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, "aria-pressed": filled, onClick: () => handlePress(index), "data-xen-v4-state": "", style: (0, tone_v4_2.appearanceStateVars)(appearance), className: (0, cn_1.cn)('flex min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] items-center justify-center', 'rounded-full bg-transparent', chrome_v4_1.MIN_TAP_CLASS, tone_v4_2.FOCUS_RING_CLASS), children: glass }, index));
                }) })] }));
});
//# sourceMappingURL=WaterTrackerV4.js.map