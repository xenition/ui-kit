"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingChecklistV4 = OnboardingChecklistV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const StepListV4_1 = require("../primitives/StepListV4");
const state_v4_1 = require("../primitives/internal/state-v4");
/**
 * **V4 onboarding checklist** — the native twin of the web
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
 * same `xs` text gap, the same `md` between rows, and the rail threshold
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
 *    corrected slot. The base checklist uses `colors.muted` for every line on
 *    the card, which is the exact bug the shadcn pass closed elsewhere.
 * 3. **The step owns its own handler.** `OnboardingStep.onPress` is per-step
 *    and pre-existing; `StepListV4` takes one list-level `onStepPress(index)`.
 *    Routing through it would silently change a documented prop's shape.
 *
 * ## Completion is never signalled by colour alone
 *
 * Three signals, and only one of them is a colour: the badge gains a **check
 * glyph** (`IconV4 name="check"` — the literal `✓` character the base ships is
 * gone), the badge **fills** where it was a wash, and the label drops to
 * `mutedText`. The accessible name says "completed" or "not completed" outright,
 * and a pressable step reports `accessibilityState={{ checked }}`.
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
 *   the hairline and `elevation.card`; the ground is named here because
 *   `CardV4` itself still defaults to `surface`.
 * - **The 22×22 marker is gone.** The badge is `IconV4`'s 44 disc — the HIG tap
 *   floor, so a pressable step is a real target rather than a 22px one.
 * - **The meter is `ProgressV4`**, not a hand-rolled `height: 6` bar. `size="sm"`
 *   is `spacing.xs` of track, off the scale; 6 was a literal.
 * - **Press feedback is the state layer.** `opacity: pressed ? 0.7 : 1` is
 *   deleted, not translated: dimming fades the row's own content, which is the
 *   signal M3 spends 0.38 on to mean *disabled*. `pressOver(card, onCard)` is
 *   the pressed layer flattened against the pair this card actually wears,
 *   because the row's text carries a measured contrast promise against it.
 * - **`steps: []` survives.** 0 of 0, no divide-by-zero, no meter (a progress
 *   bar with `max` 0 reports nothing), and an `EmptyStateV4` in the body.
 *
 * The web twin takes `className`, and its steps take `onClick`; every other
 * prop, name and default is identical.
 */
function OnboardingChecklistV4({ steps, title = 'Get started', subtitle, connector, empty, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const total = steps.length;
    const doneCount = steps.filter((s) => s.done).length;
    // Undefined means "decide from the count" — §8's three-row threshold, shared.
    const rail = connector ?? total >= StepListV4_1.RAIL_MIN_ROWS;
    // Opaque, and named: the row's own text is contrast-checked against `card`.
    const pressed = (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: "elevated", radius: "lg", padding: "lg", 
        /*
          Brief §4.2's headline fix: `colors.card`, not `colors.surface`. The
          split exists precisely so a raised card reads as raised in both schemes,
          and this module never adopted it — every card in it currently paints the
          same colour as the page it floats on. The style array puts this after
          `CardV4`'s own fill, so it wins.
        */
        style: [{ backgroundColor: colors.card, gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onCard", children: title }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numeric: "tabular", children: [doneCount, " of ", total] })] }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: subtitle })) : null, total > 0 ? ((0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: doneCount, max: total, size: "sm", tone: doneCount === total ? 'success' : 'primary' })) : null] }), total === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-checklist-empty", children: empty ?? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: "Nothing to set up", description: "Steps will appear here as soon as there is something to do." })) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: steps.map((step, i) => {
                    const last = i === total - 1;
                    const done = step.done;
                    const label = `${step.label}, ${done ? 'completed' : 'not completed'}`;
                    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            gap: tokens.spacing.md,
                            paddingBottom: last ? 0 : tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { badge: done ? 'solid' : 'soft', badgeShape: "circle", color: done ? 'success' : 'primary', size: "lg", name: done ? 'check' : step.icon, glyph: !done && step.icon == null ? String(i + 1) : undefined, style: {
                                            borderWidth: 1,
                                            borderColor: done ? 'transparent' : colors.border,
                                        } }), rail && !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-checkrail", style: { width: 1, flex: 1, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                    flex: 1,
                                    minWidth: 0,
                                    gap: tokens.spacing.xs,
                                    paddingTop: tokens.spacing.xs,
                                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: done ? 'mutedText' : 'onCard', children: step.label }), step.description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: step.description })) : null] })] }));
                    const key = step.id ?? `${step.label}-${i}`;
                    return step.onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { checked: done }, onPress: step.onPress, 
                        /*
                          A press tints; it never lifts, and it never dims. The opacity
                          dip the base ships fades the row's own content, which is how a
                          pressed step ended up looking like a disabled one.
                        */
                        style: ({ pressed: held }) => ({
                            borderRadius: tokens.radius.md,
                            backgroundColor: held ? pressed : 'transparent',
                        }), children: body }, key)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, children: body }, key));
                }) }))] }));
}
//# sourceMappingURL=OnboardingChecklistV4.js.map