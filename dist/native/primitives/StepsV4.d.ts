import * as React from 'react';
import type { StepItem, StepsProps } from './Steps';
export type { StepsProps as StepsV4Props, StepItem };
/**
 * **V4 steps** — same props as {@link Steps}, a different design line.
 *
 * ## The connector is the component
 *
 * The base drew a row of disconnected circles. That is a set of badges, not a
 * progress indicator: it says which markers are filled, and leaves the reader
 * to infer that they form a sequence at all. §29 asks that navigation reflect
 * the user's mental model, and the model of a checkout is a **path** — so V4
 * draws the path.
 *
 * The rail runs behind the markers and is split at each one, which makes the
 * completed portion a single continuous filled line ending exactly at where you
 * are. That is the whole answer to "how far along am I", available without
 * counting circles (§32, §33).
 *
 * ## Three states, three shapes
 *
 * - **Done** is filled with `primary` and carries a check in `onPrimary` — a
 *   compiler-guaranteed pair.
 * - **Now** is an outlined marker on `surface`, ringed in `primary`, with its
 *   number in `primaryText`. It is the only hollow marker inside the filled
 *   run, so it reads as the head of the path rather than as another completed
 *   step.
 * - **Later** is the same outline in `border` with a `muted` number: present,
 *   plainly not reached.
 *
 * The number is `primaryText` rather than `primary`, because a numeral is text
 * and the fill slot carries no contrast promise as text.
 *
 * ## Still a progress indicator, not an instruction list
 *
 * Each step takes `flex: 1` of the row, so this is at its best with three or
 * four one-word titles ("Cart · Shipping · Pay") and falls apart past that. If
 * what you have is content — a recipe method, a setup guide — reach for
 * `StepList`, the vertical sibling. `Steps` answers "where am I in this flow";
 * `StepList` answers "here are the instructions".
 *
 * Nothing here is a tap target: `Steps` reports progress and takes no input, so
 * the 44pt rule does not apply and the markers stay the size they need to be.
 */
export declare function StepsV4({ steps, current, style }: StepsProps): React.ReactElement;
//# sourceMappingURL=StepsV4.d.ts.map