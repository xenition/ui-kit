import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import { AvatarV4 } from './AvatarV4';
import { AVATAR_DIAMETER, MONOGRAM_CLASS, STACK_OVERLAP } from './internal/identity-v4';
import type { AvatarGroupProps } from './AvatarGroup';

export type { AvatarGroupProps as AvatarGroupV4Props };

/**
 * The stack's geometry is one `calc()` off the shared diameter, and the outline
 * that separates overlapping faces has to be the page colour rather than a
 * border on the face — neither is expressible as a utility class bound to a
 * token. Every colour here is a `--xen-*` custom property.
 */
const AVATAR_GROUP_V4_CSS = `
[data-xen-v4-avatars] { display: flex; align-items: center; }
[data-xen-v4-avatars] > * { border-radius: var(--xen-radius-full); }
[data-xen-v4-avatars] > * + * { margin-left: calc(var(--xen-v4-stack-d) * -${STACK_OVERLAP}); }
[data-xen-v4-avatar-slot] {
  box-shadow: 0 0 0 2px var(--xen-surface);
  border-radius: var(--xen-radius-full);
}
[data-xen-v4-avatars-more] {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--xen-v4-stack-d);
  height: var(--xen-v4-stack-d);
  background-color: var(--xen-surface);
  border: 1px solid var(--xen-border);
  box-shadow: 0 0 0 2px var(--xen-surface);
  color: var(--xen-muted-text);
}
`;

/**
 * **V4 avatar stack** — the web twin of the native `AvatarGroupV4`, same props
 * as {@link AvatarGroup}, a different design line. Built on `AvatarV4`, so
 * every face in it carries the derived monogram ground and a roster stops
 * being a row of identical brand-tinted discs.
 *
 * Four changes, all of them about the stack rather than the faces:
 *
 * 1. **The overlap is a fraction, not `-ml-2`.** Eight pixels is 33% of an
 *    `xs` avatar and 11% of an `xl` one, so the base stack was cramped at
 *    small sizes and fell apart into a loose row at large ones. A fraction of
 *    the diameter holds the same rhythm at every size (§9 — spacing is
 *    structure, and structure that changes meaning with size is not).
 * 2. **The first face is on top.** Document order put the LAST avatar over the
 *    ones before it, so the stack read right-to-left while the eye and the
 *    data both run the other way. V4 reverses the paint order, which is what
 *    makes a stack read as an ordered list rather than a pile.
 * 3. **A `+N` that is not pretending to be a person.** The base chip was a
 *    filled `bg-neutral-100` disc with the same visual weight as a face, so
 *    four people plus three more looked like five people. V4 gives it the
 *    page's own surface, a hairline and muted text — present, countable,
 *    clearly not a face (§10: typography before containers; §6: hierarchy
 *    before styling).
 * 4. **No `+1`.** Collapsing a single extra avatar into a `+1` chip costs the
 *    same width and tells the reader less, so V4 shows the person instead.
 *    `max` is a budget, not a ceremony.
 *
 * The separator is a `surface`-coloured `box-shadow` ring rather than a border
 * on the avatar, so the face keeps its full diameter and the outline sits
 * outside it — the same geometry as the native twin's outline view.
 */
export function AvatarGroupV4({
  avatars,
  max = 4,
  size = 'md',
  className,
}: AvatarGroupProps): React.ReactElement {
  injectStyleOnce('xen-v4-avatar-group-styles', AVATAR_GROUP_V4_CSS);

  // A single hidden avatar is shown instead of collapsed: `+1` is the same
  // width as the face it replaced and says less.
  const overflow = avatars.length - max;
  const shown = overflow > 1 ? avatars.slice(0, max) : avatars;
  const extra = avatars.length - shown.length;

  const vars: Record<string, string> = { '--xen-v4-stack-d': AVATAR_DIAMETER[size] };

  return (
    <div data-xen-v4-avatars="" className={className} style={vars as React.CSSProperties}>
      {shown.map((a, i) => (
        <span
          key={i}
          data-xen-v4-avatar-slot=""
          // Leading face on top, each one after it tucked behind.
          style={{ position: 'relative', zIndex: shown.length - i }}
        >
          <AvatarV4 name={a.name} src={a.src} size={size} />
        </span>
      ))}
      {extra > 0 ? (
        <span
          data-xen-v4-avatars-more=""
          aria-label={`${extra} more`}
          style={{ position: 'relative', zIndex: 0 }}
          className={cn('font-body font-semibold', MONOGRAM_CLASS[size])}
        >
          +{extra}
        </span>
      ) : null}
    </div>
  );
}
