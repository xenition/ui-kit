"use strict";
/**
 * `Stack`, V4 — **the base component, unchanged, under a V4 name.**
 *
 * This is not an oversight and it is not a placeholder. `Stack` is a pure
 * layout primitive: it renders a `<div class="flex">` with a `gap`, a
 * direction, a cross-axis alignment and a main-axis distribution. It paints no
 * colour, draws no border, has no radius, sets no type, owns no state and shows
 * no feedback. Every value it does spend — the gaps — is already read from
 * `--xen-space-*`, so a re-scaled seed re-scales a `Stack` today.
 *
 * There is therefore nothing for a design line to disagree with. A `StackV4`
 * that differed from `Stack` could only differ by changing what `gap="md"`
 * means, which would silently move the layout of every caller who upgraded —
 * the opposite of what a V4 is for. `design.md` §11 asks that a container earn
 * its existence; the same test applies to a component, and inventing a
 * decorated `Stack` so the V4 line has a full set would fail it.
 *
 * So the honest answer is an alias. It exists because a screen written in the
 * V4 line should be able to import every primitive it uses from one vocabulary
 * without having to remember which three have no V4 — and because when someone
 * later asks "why is there no `StackV4`?", the answer should be written down
 * rather than rediscovered.
 *
 * The same reasoning applies to `VirtualListV4`, which is a windowing wrapper,
 * and is the reason `FormV4` **is** a real component: `Form` had one number in
 * it that was not a token.
 *
 * If a future V4 screen genuinely needs a different stacking rhythm, the change
 * belongs in the spacing scale the seed compiles, not in a second `Stack`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackV4 = void 0;
var Stack_1 = require("./Stack");
Object.defineProperty(exports, "StackV4", { enumerable: true, get: function () { return Stack_1.Stack; } });
//# sourceMappingURL=StackV4.js.map