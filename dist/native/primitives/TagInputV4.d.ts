import * as React from 'react';
import type { TagInputProps } from './TagInput';
export type { TagInputProps as TagInputV4Props };
/**
 * **V4 tag input** — the same props as {@link TagInput}, a different design
 * line.
 *
 * ## The duplicate was the bug
 *
 * Type a tag you already have and the base clears the field and does nothing
 * else. From the outside that is indistinguishable from the app dropping your
 * input: you typed something, it vanished, and no tag appeared. §38 is explicit
 * that an error state has to help you recover, and the recovery here is simply
 * being told what happened.
 *
 * So V4 **keeps what you typed** and says `“React” is already added` under the
 * field, announced politely. Nothing is lost, the reason is on screen, and the
 * message clears itself the moment you change the text. `dedupe={false}` still
 * turns the whole rule off.
 *
 * ## The remove ✕ was the other one
 *
 * A chip's ✕ is necessarily small — it lives inside a 32px chip — and the base
 * gives it 6px of slop, so about a 24px target, sitting next to other chips'
 * ✕s. `hitSlopTo` opens it out to the same `tapTarget()` the rest of the line
 * uses without growing the chip by a pixel: the touch area extends past the
 * view, which is exactly what `hitSlop` is for.
 *
 * ## The rest
 *
 * The wrapper wears `InputV4`'s treatment — `2xl` minimum height, `md` radius,
 * the brand halo with its space reserved — and wraps to as many rows as the
 * tags need. Chips are `accent`/`onAccent`, a pair the compiler
 * contrast-checks, at `sm` rather than `xs`: a tag is a thing you have to be
 * able to read, not a decoration.
 */
export declare function TagInputV4({ value, onChange, placeholder, dedupe, invalid, disabled, accessibilityLabel, style, }: TagInputProps): React.ReactElement;
//# sourceMappingURL=TagInputV4.d.ts.map