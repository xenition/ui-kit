import * as React from 'react';
import type { FormProps } from './Form';
export type { FormProps as FormV4Props };
/**
 * `Form`, V4 — a structural primitive with exactly one number in it, and that
 * number is now a token.
 *
 * ## Why this is a component and `StackV4` is an alias
 *
 * `Form` is as thin as `Stack`: a `<form>` with a vertical gap. The difference
 * is that its one value was **not** a token. `gap-4` is Tailwind's own scale —
 * a fixed 16px that a re-scaled seed cannot move, sitting in a component whose
 * whole job is spacing. The native twin used `spacing.md`, which happens to be
 * 16 at today's scale, so the two agreed by coincidence rather than by
 * construction and would have drifted apart the first time a seed changed its
 * rhythm.
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
 * - **V4 controls are `2xl` tall.** Two 48px boxes 16px apart read as a stack
 *   of blocks; at `lg` each question reads as one thing to answer, which is
 *   what §16's "forms should be minimal" is actually asking for — fewer things
 *   competing at once, not less space.
 *
 * Nothing else changes. There is no ground, no border and no radius here,
 * because a form is not a container (§11) — it is a sequence of questions, and
 * `Card` is what to reach for when the sequence genuinely needs a boundary.
 */
export declare const FormV4: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>;
//# sourceMappingURL=FormV4.d.ts.map