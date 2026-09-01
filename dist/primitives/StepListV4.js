"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAIL_MIN_ROWS = void 0;
exports.StepListV4 = StepListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
const IconV4_1 = require("./IconV4");
const TextV4_1 = require("./TextV4");
const v4_motion_1 = require("./internal/v4-motion");
const v4_state_1 = require("./internal/v4-state");
/**
 * How many rows it takes before the rail earns its place. §8.
 *
 * Not a metric, so it is not a token: it is a count of list items, in the same
 * family as a flex factor.
 */
exports.RAIL_MIN_ROWS = 3;
/**
 * The one thing here a utility class bound to a token cannot say.
 *
 * A pressable row's focus indicator has to reach `:focus-visible`, and the
 * `outline-offset` has to survive the row's own rounding. The colour is
 * `--xen-ring`, the single focus slot every other V4 control uses, so tabbing
 * across a screen never changes the shape of the signal.
 *
 * The rail itself transitions, because `connector` can flip while the list is
 * mounted (a step completing, a row arriving) and a hairline that snaps into
 * existence reads as a rendering fault. `V4_MOTION.standard` by way of
 * {@link transitionCss} — nothing here picks a duration or an easing.
 */
const STEPLIST_V4_CSS = `
[data-xen-v4-steprow]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
[data-xen-v4-steprail] {
  transition: ${(0, v4_motion_1.transitionCss)(['background-color'])};
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-v4-steprail] { transition: none; }
}
`;
/**
 * **V4 step list** — the web twin of the native `StepListV4`, the same props as
 * {@link StepList} plus a glyph per row, a different design line.
 *
 * ## This is the pattern that carries the value proposition
 *
 * §8 of the onboarding spec calls it the feature row, and it is the signature
 * anatomy of the reference screens: a soft circular tinted badge on the left, a
 * bold title, a muted description, and a hairline rail threading the badges
 * into one continuous list. The paywall is made of it; so is the welcome offer.
 *
 * What changed from the base:
 *
 * 1. **The marker became a badge, and the badge can hold a glyph.** The base
 *    draws a 32px outlined circle with an ordinal in it, which is right for a
 *    recipe method and wrong for a list of promises — nobody unlocks feature 2
 *    before feature 3. An `icon` per row replaces the number where the list is
 *    not really ordered, and the disc grows to §8's 44 so it reads as an object
 *    rather than as a bullet.
 * 2. **The badge is `IconV4`'s badge**, not a local one. §8's feature-row disc
 *    and §9's brand tile are the same object at two settings, `IconV4` already
 *    owns both, and it owns them with the contrast correction and the per-scheme
 *    ground that a hand-rolled `bg-[color-mix(…)]` here would quietly skip. §10.2
 *    — reuse the kit's primitives — and §10.5 — a V4 composite composes V4
 *    children. `badge="soft"` for a step still ahead, `badge="solid"` for one
 *    behind: the ladder is the badge's own fill, not a fourth colour.
 * 3. **Typography carries the hierarchy.** Title `base`/semibold, description
 *    `sm`/muted — §8 exactly, and one step further apart than the base's
 *    `medium`, so the title is legibly the headline of its row without a rule
 *    under it.
 * 4. **The rail turns itself on at three.** See {@link StepListV4Props.connector}.
 * 5. **The rows sit `md` apart**, not `lg`. Tighter, because the rail is doing
 *    the work of saying these belong together and the space no longer has to.
 *
 * ## Why this is not the "icon in a coloured box on every row" tell
 *
 * `design.md` §8 lists that among the marks of generic AI UI, and the objection
 * is real. Three things keep this on the right side of it. The badge is a
 * **circle**, which reads as a marker on a timeline rather than as an app icon.
 * The rail makes the badges **one object** rather than n decorated rows. And
 * the component is scoped to the one place the onboarding spec asks for it —
 * the value proposition — rather than being the kit's default list, which is
 * `ListV4`, and which has no badge at all.
 *
 * ## The state ladder
 *
 * `current` stays optional, and omitting it is the paywall case: nothing is
 * done, nothing is active, every badge is the same soft disc and the list is a
 * flat set of promises. Given a `current`, three settings and no new colour —
 * a completed step **fills** (`badge="solid"`), the current step keeps the wash
 * and gains a hairline `primary` ring, and everything ahead is the plain wash.
 * The title never mutes: unlike `Steps`, whose labels sit on a progress bar,
 * these are instructions, and the one you have not reached yet is exactly the
 * one that has to be readable.
 *
 * The native twin takes `onStepPress` and `style`; every other prop, name and
 * default is identical.
 */
function StepListV4({ steps, current, onStepClick, connector, empty, className, }) {
    (0, inject_1.injectStyleOnce)('xen-v4-steplist-styles', STEPLIST_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // §12. Nothing, unless the caller owns the region and said what belongs here.
    if (steps.length === 0) {
        return (0, jsx_runtime_1.jsx)("div", { className: className, children: empty });
    }
    // Undefined means "decide from the count" — §8's three-row threshold.
    const rail = connector ?? steps.length >= exports.RAIL_MIN_ROWS;
    return ((0, jsx_runtime_1.jsx)("ol", { className: (0, cn_1.cn)('flex flex-col', className), children: steps.map((step, i) => {
            const last = i === steps.length - 1;
            // `current` stays optional: with no current step nothing is done and
            // nothing is active, and the list renders as a flat feature list —
            // which is what a paywall wants.
            const done = step.done === true || (current != null && i < current);
            const active = step.done !== true && current != null && i === current;
            const body = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full gap-md text-left', last ? 'pb-0' : 'pb-md'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { badge: done ? 'solid' : 'soft', badgeShape: "circle", color: "primary", size: "lg", name: step.icon, glyph: step.icon == null ? (done ? '✓' : String(i + 1)) : undefined, className: (0, cn_1.cn)('border', active ? 'border-primary' : 'border-transparent') }), rail && !last ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-steprail": "", className: "w-px flex-1 bg-border" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs pt-xs", children: [typeof step.title === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: step.title })) : (step.title), step.description != null ? (typeof step.description === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "muted", children: step.description })) : (step.description)) : null] })] }));
            return ((0, jsx_runtime_1.jsx)("li", { children: onStepClick ? (
                /*
                  `data-xen-v4-state` is the line's shared hover/focus/press layer
                  — M3's model, the control's own ink at the M3 opacity over
                  whatever is behind — rather than a local `hover:opacity-70`,
                  which dims the content and so makes a hovered row look disabled.
                */
                (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-steprow": "", "data-xen-v4-state": "", "aria-pressed": done, onClick: () => onStepClick(i), className: "w-full rounded-[var(--xen-radius-md)] text-left", children: body })) : (body) }, step.id ?? i));
        }) }));
}
//# sourceMappingURL=StepListV4.js.map