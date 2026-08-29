"use strict";
/**
 * `Spacer`, V4 — **the base component, unchanged, under a V4 name.**
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 records the finding this file implements:
 * *"Spacer — Structure only. Token-pure, `aria-hidden` already correct. No
 * visual change."* Both twins were read for this pass and neither has anything
 * a design line owns.
 *
 * The component renders one inert `<div>`. It paints no colour, draws no
 * border, has no radius, sets no type, owns no state and shows no feedback.
 * The only values it spends are its width and height, and those are already
 * `w-[var(--xen-space-*)]` / `h-[var(--xen-space-*)]` — so re-scaling the seed
 * re-scales every `Spacer` in the product today, with no V4 involved. The
 * `'flex'` size spends `grow shrink`, which are flex factors: geometric, not
 * design values, and correctly bare.
 *
 * A `SpacerV4` that differed from `Spacer` could therefore only differ by
 * changing what `size="md"` means. That would silently move the layout of
 * every caller who upgraded — the exact opposite of what a V4 is for, and a
 * change that belongs in the spacing scale the seed compiles rather than in a
 * second `Spacer`. So this file is an alias, deliberately, and the reasoning
 * is written down here rather than left to be rediscovered.
 *
 * It exists because a screen written in the V4 line should import its whole
 * vocabulary from one place without having to remember which primitives have
 * no V4. Same precedent, same argument as `primitives/StackV4.tsx`.
 *
 * Accessibility note carried forward, because it is easy to lose in a rewrite:
 * the element is `aria-hidden="true"`. A spacer is furniture; a screen reader
 * announcing it would read the layout aloud.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacerV4 = void 0;
var Spacer_1 = require("./Spacer");
Object.defineProperty(exports, "SpacerV4", { enumerable: true, get: function () { return Spacer_1.Spacer; } });
//# sourceMappingURL=SpacerV4.js.map