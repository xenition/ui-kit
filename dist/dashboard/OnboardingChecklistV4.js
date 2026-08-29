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
exports.OnboardingChecklistV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const StepListV4_1 = require("../primitives/StepListV4");
const v4_state_1 = require("../primitives/internal/v4-state");
/**
 * The focus ring for a pressable step.
 *
 * The one thing here a utility class bound to a token cannot say: a
 * `:focus-visible` outline whose offset has to survive the row's own rounding.
 * The colour is `--xen-ring`, the single focus slot every other V4 control
 * uses, so tabbing across a screen never changes the shape of the signal. Same
 * rule, same selector shape as `StepListV4`'s — this is deliberately the same
 * row wearing a different label.
 */
const CHECKLIST_V4_CSS = `
[data-xen-v4-checkstep]:focus-visible {
  outline: 2px solid var(--xen-ring);
  outline-offset: 2px;
}
`;
/**
 * **V4 onboarding checklist** — the web twin of the native
 * `OnboardingChecklistV4`. `StepListV4`'s anatomy, with a completion state, a
 * meter and a card around it.
 *
 * ## It is the feature row, not a fifth kind of list
 *
 * `ONBOARDING-DESIGN-SPEC.md` §8's feature row — a circular tinted badge, a
 * bold title, a muted supporting line, a hairline rail joining the badges once
 * there are three or more — already ships as `StepListV4`. A getting-started
 * checklist is that exact anatomy plus a done/not-done state, so it wears it:
 * the same `IconV4` badge at the same `lg` glyph size, the same `md` gap, the
 * same `xs` text gap, the same `pb-md` between rows, and the rail threshold
 * **imported** from {@link RAIL_MIN_ROWS} rather than re-decided here.
 *
 * It is not a straight `StepListV4` composition for three reasons, each of
 * which would otherwise have to be pushed into that primitive:
 *
 * 1. **Completion is `success`, not `primary`** (brief §5). `StepListV4`'s
 *    `done` badge fills with the brand colour, which is right for "step 3 of 5
 *    is behind you" and wrong for "this task is finished".
 * 2. **The supporting line is `mutedText`, not `muted`** (brief §4.3).
 *    `StepListV4` sets `tone="muted"`, the decorative *fill*; a line of copy
 *    telling the user what a step involves is text and needs the contrast-
 *    corrected slot.
 * 3. **The step owns its own handler.** `OnboardingStep.onClick` is per-step
 *    and pre-existing; `StepListV4` takes one list-level `onStepClick(index)`.
 *    Routing through it would silently change a documented prop's shape.
 *
 * ## Completion is never signalled by colour alone
 *
 * Three signals, and only one of them is a colour: the badge gains a **check
 * glyph** (`IconV4 name="check"` — the literal `✓` character the base ships is
 * gone), the badge **fills** where it was a wash, and the label drops to
 * `mutedText`. The accessible name says "completed" or "not completed" outright,
 * and a pressable step carries `aria-pressed`.
 *
 * **The strike-through is gone**, per brief §5: struck text reads as *deleted*,
 * not as done, and it makes the one thing the user has already achieved the
 * hardest thing on the card to read.
 *
 * ## Everything else that changed
 *
 * - **The card is `card`, not `surface`** (brief §4.2). This module never
 *   adopted the shadcn card split, so every card in it currently paints the
 *   same colour as the page it floats on. `CardV4 variant="elevated"` supplies
 *   the hairline and `elevation.card`; the ground and the ink are named here
 *   because `CardV4` itself still defaults to `surface`.
 * - **The `w-[22px]` marker is gone.** The badge is `IconV4`'s 44 disc — the
 *   HIG tap floor, so a pressable step is a real target rather than a 22px one.
 * - **The meter is `ProgressV4`**, not a hand-rolled `h-1.5` bar with a `%`
 *   width. `size="sm"` is `spacing.xs` of track, off the scale.
 * - **Press feedback is the state layer.** `hover:opacity-80` is deleted, not
 *   translated: dimming fades the row's own content, which is the signal M3
 *   spends 0.38 on to mean *disabled*. The layer is made **opaque** against
 *   `card`/`on-card`, because the row's text carries a measured contrast
 *   promise against the fill it is drawn on.
 * - **`steps: []` survives.** 0 of 0, no divide-by-zero, no meter (a progress
 *   bar with `max` 0 reports nothing), and an `EmptyStateV4` in the body.
 *
 * The native twin takes `style`, and its steps take `onPress`; every other
 * prop, name and default is identical.
 */
exports.OnboardingChecklistV4 = React.forwardRef(function OnboardingChecklistV4({ steps, title = 'Get started', subtitle, connector, empty, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-v4-checklist-styles', CHECKLIST_V4_CSS);
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const total = steps.length;
    const doneCount = steps.filter((s) => s.done).length;
    // Undefined means "decide from the count" — §8's three-row threshold, shared.
    const rail = connector ?? total >= StepListV4_1.RAIL_MIN_ROWS;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: "elevated", radius: "lg", padding: "lg", 
        /*
          Brief §4.2's headline fix. `bg-card` / `text-on-card` are later in the
          generated palette than `bg-surface` / `text-on-surface`, which is what
          `CardV4` paints by default, so they win on cascade order without a
          `!important` — and a raised card finally reads as raised in both
          schemes instead of dissolving into the page.
        */
        className: (0, cn_1.cn)('flex flex-col gap-md bg-card text-on-card', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", children: title }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: [doneCount, " of ", total] })] }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: subtitle })) : null, total > 0 ? ((0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { "data-xen-v4-checklist-meter": "", value: doneCount, max: total, size: "sm", tone: doneCount === total ? 'success' : 'primary' })) : null] }), total === 0 ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-checklist-empty": "", children: empty ?? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: "Nothing to set up", description: "Steps will appear here as soon as there is something to do." })) })) : ((0, jsx_runtime_1.jsx)("ol", { className: "flex flex-col", children: steps.map((step, i) => {
                    const last = i === total - 1;
                    const done = step.done;
                    const label = `${step.label}, ${done ? 'completed' : 'not completed'}`;
                    const body = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex w-full gap-md text-left', last ? 'pb-0' : 'pb-md'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { "data-xen-v4-checkbadge": done ? 'done' : 'todo', badge: done ? 'solid' : 'soft', badgeShape: "circle", color: done ? 'success' : 'primary', size: "lg", name: done ? 'check' : step.icon, glyph: !done && step.icon == null ? String(i + 1) : undefined, className: (0, cn_1.cn)('border', done ? 'border-transparent' : 'border-border') }), rail && !last ? ((0, jsx_runtime_1.jsx)("span", { "data-xen-v4-checkrail": "", className: "w-px flex-1 bg-border" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs pt-xs", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: done ? 'mutedText' : 'onCard', children: step.label }), step.description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: step.description })) : null] })] }));
                    return ((0, jsx_runtime_1.jsx)("li", { children: step.onClick ? (
                        /*
                          `data-xen-v4-state` plus the opaque ground pair IS the whole
                          press and hover feedback. `hover:opacity-80` is deleted.
                        */
                        (0, jsx_runtime_1.jsx)("button", { type: "button", "data-xen-v4-checkstep": "", "data-xen-v4-state": "", "aria-label": label, "aria-pressed": done, onClick: step.onClick, className: "w-full rounded-[var(--xen-radius-md)] text-left", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), children: body })) : ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-checkstep": "", "aria-label": label, children: body })) }, step.id ?? `${step.label}-${i}`));
                }) }))] }));
});
//# sourceMappingURL=OnboardingChecklistV4.js.map