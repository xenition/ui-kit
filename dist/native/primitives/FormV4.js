"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
exports.FormV4 = FormV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
// The headless form helper is pure React (no DOM), so it works unchanged on
// native — re-exported here, exactly as the base `Form` does, so a mobile app
// can wire submit and validation without a second import from the web entry.
var useForm_1 = require("../../primitives/useForm");
Object.defineProperty(exports, "useForm", { enumerable: true, get: function () { return useForm_1.useForm; } });
/**
 * `Form`, V4 — a structural primitive with exactly one number in it.
 *
 * ## Why this is a component and `StackV4` is an alias
 *
 * `Form` is as thin as `Stack`: a `<View>` with a vertical gap. The difference
 * is that the two twins disagreed about that gap by construction. The web wrote
 * `gap-4` — Tailwind's own scale, a fixed 16px a re-scaled seed cannot move —
 * against `spacing.md` here, which happens to be 16 at today's scale. They
 * agreed by coincidence, in the one component whose whole job is spacing, and
 * would have drifted apart the first time a seed changed its rhythm.
 *
 * ## The rhythm, and why it opened up
 *
 * `lg`, not `md`. Two reasons, and the first is the load-bearing one:
 *
 * - **A field's internal rhythm is `xs`.** `FieldV4` puts `spacing.xs` between
 *   its label, its control and its message. The gap *between* fields has to
 *   read as a different order of magnitude, or a three-part field and the next
 *   question look like one five-part thing. `lg` is six times the internal
 *   step; `md` is four.
 * - **V4 controls are `2xl` tall.** Two 48pt boxes 16pt apart read as a stack
 *   of blocks; at `lg` each question reads as one thing to answer, which is
 *   what §16's "forms should be minimal" is actually asking for — fewer things
 *   competing at once, not less space.
 *
 * Nothing else changes. There is no ground, no border and no radius here,
 * because a form is not a container (§11) — it is a sequence of questions, and
 * `Card` is what to reach for when the sequence genuinely needs a boundary.
 *
 * React Native has no `<form>`, so submit and validation are still driven by
 * the re-exported `useForm` with `handleSubmit` wired to a `Button onPress`.
 */
function FormV4({ style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.lg }, style], ...rest, children: children }));
}
//# sourceMappingURL=FormV4.js.map