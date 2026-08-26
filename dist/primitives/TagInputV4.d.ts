import * as React from 'react';
import type { TagInputProps } from './TagInput';
export type { TagInputProps as TagInputV4Props };
/**
 * **V4 tag input** — the web twin of `TagInputV4`, the same props as
 * {@link TagInput}, a different design line.
 *
 * ## The duplicate was the bug
 *
 * Type a tag you already have and the base clears the field and does nothing
 * else. From the outside that is indistinguishable from the app dropping your
 * input: you typed something, it vanished, no tag appeared. §38 is explicit
 * that an error state has to help you recover, and the recovery here is simply
 * being told what happened.
 *
 * So V4 **keeps what you typed** and says `“React” is already added` under the
 * field, in a polite live region. Nothing is lost, the reason is on screen, and
 * the message clears itself the moment you change the text. `dedupe={false}`
 * still turns the whole rule off.
 *
 * ## The remove ✕ was the other one
 *
 * A chip's ✕ is necessarily small — it lives inside a 32px chip — and the base
 * gives it no padding at all, so roughly a 16px target sitting next to other
 * chips' ✕s. `data-xen-v4-hit` centres an invisible `--xen-space-2xl`
 * pseudo-element on it: out of flow, costing no layout, the web's `hitSlop`.
 *
 * ## The rest
 *
 * The wrapper wears `InputV4`'s metrics and the same `box-shadow` halo, armed
 * on `:focus-within`. Chips are `accent`/`on-accent`, a pair the compiler
 * contrast-checks, at `text-sm` rather than `text-xs`: a tag is a thing you
 * have to be able to read, not a decoration.
 */
export declare function TagInputV4({ value, onChange, placeholder, dedupe, invalid, disabled, accessibilityLabel, className, }: TagInputProps): React.ReactElement;
//# sourceMappingURL=TagInputV4.d.ts.map