/**
 * `Center`, V4 — **the base component, unchanged, under a V4 name.**
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5: *"Center — Structure only. Nothing to
 * fix. Do not add padding to it; that is `Inset`'s job."*
 *
 * `Center` renders `flex items-center justify-center`, plus `flex-1` when
 * `fill` is set. Three alignment utilities and a flex factor: there is no
 * colour, border, radius, type size or spacing in the component at all, so
 * there is no number in it that could fail the no-literals rule and nothing a
 * design line could disagree with.
 *
 * The tempting change — giving it a `padding` prop so a centred empty state
 * needs one wrapper instead of two — is the one the brief explicitly refuses.
 * Padding is `Inset`'s single job, and a primitive that centres *and* pads is
 * two primitives wearing one name; the next caller then has to know which of
 * the two components pads, which is precisely the ambiguity the layout module
 * exists to remove. Compose `Inset` around `Center` (or inside it) instead.
 *
 * So this file is an alias, and the reasoning is recorded rather than left to
 * be rediscovered the next time someone asks why `CenterV4` looks empty. Same
 * precedent, same argument as `primitives/StackV4.tsx`.
 */
export { Center as CenterV4 } from './Center';
export type { CenterProps as CenterV4Props } from './Center';
//# sourceMappingURL=CenterV4.d.ts.map