"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAIL_MIN_ROWS = void 0;
exports.StepListV4 = StepListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("./IconV4");
const TextV4_1 = require("./TextV4");
const state_v4_1 = require("./internal/state-v4");
/**
 * How many rows it takes before the rail earns its place. §8.
 *
 * Not a metric, so it is not a token: it is a count of list items, in the same
 * family as a flex factor.
 */
exports.RAIL_MIN_ROWS = 3;
/**
 * **V4 step list** — the same props as {@link StepList} plus a glyph per row, a
 * different design line.
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
 *    draws a small outlined circle with an ordinal in it, which is right for a
 *    recipe method and wrong for a list of promises — nobody unlocks feature 2
 *    before feature 3. An `icon` per row replaces the number where the list is
 *    not really ordered, and the disc grows to §8's 44 so it reads as an object
 *    rather than as a bullet — and so a pressable row is a real target.
 * 2. **The badge is `IconV4`'s badge**, not a local one. §8's feature-row disc
 *    and §9's brand tile are the same object at two settings, `IconV4` already
 *    owns both, and it owns them with the contrast correction and the opaque
 *    per-scheme ground a local `mixToken` here would quietly skip — plus the
 *    circle drawn from its own diameter, which matters because `radius.full`
 *    compiles to 0 on a `sharp` seed and §8's badge is a circle in every brand.
 *    §10.2 — reuse the kit's primitives — and §10.5 — a V4 composite composes
 *    V4 children. `badge="soft"` for a step still ahead, `badge="solid"` for one
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
 * The web twin takes `onStepClick` and `className`; every other prop, name and
 * default is identical.
 */
function StepListV4({ steps, current, onStepPress, connector, empty, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // §12. Nothing, unless the caller owns the region and said what belongs here.
    if (steps.length === 0) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: empty });
    }
    // Undefined means "decide from the count" — §8's three-row threshold.
    const rail = connector ?? steps.length >= exports.RAIL_MIN_ROWS;
    const pressedFill = (0, state_v4_1.pressFill)(theme);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'column' }, style], children: steps.map((step, i) => {
            const last = i === steps.length - 1;
            // `current` stays optional: with no current step nothing is done and
            // nothing is active, and the list renders as a flat feature list —
            // which is what a paywall wants.
            const done = step.done === true || (current != null && i < current);
            const active = step.done !== true && current != null && i === current;
            const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    gap: tokens.spacing.md,
                    paddingBottom: last ? 0 : tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { badge: done ? 'solid' : 'soft', badgeShape: "circle", color: "primary", size: "lg", name: step.icon, glyph: step.icon == null ? (done ? '✓' : String(i + 1)) : undefined, style: {
                                    borderWidth: 1,
                                    borderColor: active ? colors.primary : 'transparent',
                                } }), rail && !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, flex: 1, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flex: 1,
                            minWidth: 0,
                            gap: tokens.spacing.xs,
                            paddingTop: tokens.spacing.xs,
                        }, children: [typeof step.title === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: step.title })) : (step.title), step.description != null ? (typeof step.description === 'string' ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "muted", children: step.description })) : (step.description)) : null] })] }));
            const key = step.id ?? String(i);
            return onStepPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { checked: done }, onPress: () => onStepPress(i), 
                /*
                  A press tints; it never lifts. `pressFill` is M3's pressed state
                  layer flattened against `surface` — the same value every other
                  pressable row in the V4 line uses — rather than an opacity dip,
                  which fades the row's own content and so makes a pressed row look
                  disabled.
                */
                style: ({ pressed }) => ({
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed ? pressedFill : 'transparent',
                }), children: row }, key)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: row }, key));
        }) }));
}
//# sourceMappingURL=StepListV4.js.map