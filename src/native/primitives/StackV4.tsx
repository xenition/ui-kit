/**
 * `Stack`, V4 — **the base component, unchanged, under a V4 name.**
 *
 * This is not an oversight and it is not a placeholder. `Stack` is a pure
 * layout primitive: it renders a `<View>` with a `flexDirection`, a `gap` off
 * the spacing scale, a cross-axis alignment and an optional main-axis
 * distribution. It paints no colour, draws no border, has no radius, sets no
 * type, owns no state and shows no feedback. The one thing it does spend — the
 * gap — already comes from `useXenitionTheme()`, so a re-scaled seed re-scales
 * a `Stack` today.
 *
 * There is therefore nothing for a design line to disagree with. A `StackV4`
 * that differed from `Stack` could only differ by changing what `gap="md"`
 * means, which would silently move the layout of every caller who upgraded —
 * the opposite of what a V4 is for. `design.md` §11 asks that a container earn
 * its existence; the same test applies to a component, and inventing a
 * decorated `Stack` so the V4 line has a full set would fail it.
 *
 * So the honest answer is an alias. It exists so a screen written in the V4
 * line can import every primitive it uses from one vocabulary without having to
 * remember which ones have no V4 — and so that when someone later asks "why is
 * there no `StackV4`?", the answer is written down rather than rediscovered.
 *
 * The same reasoning applies to `VirtualListV4`, and it is the reason `FormV4`
 * **is** a real component: `Form` had one number in it that was not a token.
 *
 * If a future V4 screen genuinely needs a different stacking rhythm, the change
 * belongs in the spacing scale the seed compiles, not in a second `Stack`.
 */

export { Stack as StackV4 } from './Stack';
export type {
  StackProps as StackV4Props,
  StackDirection,
  StackGap,
} from './Stack';
