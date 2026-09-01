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
exports.EmptyDashboardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
/**
 * **64** — the empty-state badge, brief §4.7: "44 × 44 (64 in an empty state)".
 *
 * Composed, never typed: `2xl + md`. `IconV4` derives its own diameter as
 * `max(44px, 1em + space-sm * 2)`, which tops out at 46 on the `3xl` step, so
 * the empty state's larger disc has to be *stated*. It is stated by overriding
 * the one custom property `IconV4` reads for that diameter, which keeps the
 * ground, the ink, the contrast correction and the circle geometry exactly
 * where they already live rather than re-rolling a badge here (§10.2 / §10.5).
 *
 * Inline rather than in a class because an inline declaration is the only one
 * guaranteed to outrank `IconV4`'s own sheet regardless of which of the two the
 * document injected first — injection order is not something two components
 * should have to agree on.
 */
const EMPTY_BADGE_DIAMETER = 'calc(var(--xen-space-2xl) + var(--xen-space-md))';
/**
 * **V4 empty dashboard** — the web twin of the native `EmptyDashboardV4`, a
 * thin opinionated wrapper over {@link EmptyStateV4} rather than a second
 * implementation of it.
 *
 * ## The whole point is that it is not its own thing
 *
 * Brief §4.5: "every empty state routes through `EmptyStateV4`". The base
 * `EmptyDashboard` hand-rolls the anatomy — its own centred column, its own
 * `text-xl font-bold` headline, its own `text-muted` body, its own
 * `max-w-[340px]` measure — so an empty dashboard and an empty list are two
 * different objects that happen to look similar. V4 deletes all of that and
 * hands the three parts to the primitive. What is left here is the two
 * decisions the primitive cannot make for a *dashboard*:
 *
 * 1. **The illustration is a 64 tinted circular badge** (§4.5, §4.7), built
 *    from `IconV4` so it is the same disc the feature rows and the activity
 *    feed wear, at the one size the empty state gets.
 * 2. **The action is a full-width pill, inset from the screen edge** — HIG's
 *    "full-width buttons must be inset from the screen edge, aligned with
 *    adjacent safe areas" and the house sticky-CTA shape, which agree. The
 *    base ships a shrink-wrapped `Button` in the middle of the column.
 *
 * ## Why the CTA is a sibling of the empty state and not its `action` slot
 *
 * `EmptyStateV4` centres its column (`items-center`), so every child is sized
 * to its own content. A button inside that column cannot be full-width —
 * `w-full` resolves against a parent whose width is itself resolved from the
 * button. Stretching the slot from outside would need either a `:has()` rule or
 * an alignment override that also un-centres the measure on the description,
 * and the native twin has no equivalent lever at all. So the CTA sits below the
 * state, in this component's own `lg` gutter, which is *also* the more literal
 * reading of "inset from the screen edge": the inset is the page gutter, and
 * the page gutter belongs to the container, not to the copy above it.
 *
 * The block above it is still `EmptyStateV4`, node for node.
 *
 * ## What is deliberately NOT overridden
 *
 * The headline and body **keep the primitive's type ramp** (`lg`/semibold over
 * `sm`/`muted-text`) rather than being wrapped in a `TextV4` at brief §4.5's
 * `xl`/`base`. Overriding it here would recreate, one level up, precisely the
 * divergence §4.5 exists to remove — an empty dashboard that is a *different
 * size* from an empty list is not "the same object". If the empty-state ramp is
 * to move, it moves in `EmptyStateV4` and every empty state moves with it.
 *
 * `max-w-[340px]` is gone; the measure is the primitive's, off the spacing
 * scale.
 *
 * The native twin takes `style` and `onAction`; every other prop, name and
 * default is identical.
 */
exports.EmptyDashboardV4 = React.forwardRef(function EmptyDashboardV4({ title, message, actionLabel, onAction, icon, iconName, tone = 'primary', className, ...rest }, ref) {
    // The caller's own node wins — the additive rule. Only when there is none
    // does `iconName` build §4.5's badge, and with neither the state renders
    // without an illustration, exactly as the base does today.
    const mark = icon ??
        (iconName != null ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { "data-xen-v4-empty-badge": "", badge: "soft", badgeShape: "circle", color: tone, size: "2xl", name: iconName, style: { ['--xen-v4-icon-d']: EMPTY_BADGE_DIAMETER } })) : undefined);
    const cta = actionLabel != null && onAction != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-v4-empty-dashboard": "", "aria-label": title, className: (0, cn_1.cn)('flex w-full flex-col', className), ...rest, children: [(0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: mark, title: title, description: message, className: (0, cn_1.cn)('w-full', cta && 'pb-lg') }), cta ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full px-lg pb-2xl", children: (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { "data-xen-v4-empty-cta": "", onClick: onAction, 
                    /*
                      Full width and a pill: HIG's inset full-width button and the
                      house CTA shape. `--xen-radius-full` compiles to 0 on a `sharp`
                      seed, so a brand that asked for square corners still gets them —
                      the token knows, and there is no branch here.
                    */
                    className: "w-full rounded-[var(--xen-radius-full)]", children: actionLabel }) })) : null] }));
});
//# sourceMappingURL=EmptyDashboardV4.js.map