import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { ensureContrast } from '../../theme/color';
import { MIN_CONTRAST } from '../../theme/compile';
import { AvatarV4 } from './AvatarV4';
import { MONOGRAM_STEP, STACK_OVERLAP, avatarDiameters } from './internal/identity-v4';
import type { AvatarGroupProps } from './AvatarGroup';

export type { AvatarGroupProps as AvatarGroupV4Props };

/**
 * **V4 avatar stack** — same props as {@link AvatarGroup}, a different design
 * line. Built on `AvatarV4`, so every face in it carries the derived monogram
 * ground and a roster stops being a row of identical brand discs.
 *
 * Four changes, all of them about the stack rather than the faces:
 *
 * 1. **The overlap is a fraction, not eight pixels.** `-8` is 33% of an `xs`
 *    avatar and 11% of an `xl` one, so the base stack was cramped at small
 *    sizes and fell apart into a loose row at large ones. A fraction of the
 *    diameter holds the same rhythm at every size (§9 — spacing is structure,
 *    and structure that changes meaning with size is not structure).
 * 2. **The first face is on top.** DOM order put the LAST avatar over the ones
 *    before it, so the stack read right-to-left while the eye and the data both
 *    run the other way. V4 reverses the z-order: the leading face is whole, and
 *    each one after it tucks behind — which is what makes a stack read as an
 *    ordered list instead of a pile.
 * 3. **A `+N` that is not pretending to be a person.** The base overflow chip
 *    was a filled disc the same weight as a face, so a group of four people
 *    plus three more looked like five people. V4 gives it the page's own
 *    surface, a hairline, and muted text — present, countable, clearly not a
 *    face (§10: typography before containers, §6: hierarchy before styling).
 * 4. **No `+1`.** Collapsing a single extra avatar into a `+1` chip costs the
 *    same width and tells the reader less, so V4 simply shows the person. `max`
 *    is a budget, not a ceremony.
 *
 * The separating outline between overlapping faces is `colors.surface` — the
 * page colour, resolved for the active scheme. `tokens.ramps` is not, and a
 * near-white hairline between faces on a dark page is exactly the bug that
 * arrives when a stack reaches for `ramps.neutral[50]`.
 */
export function AvatarGroupV4({
  avatars,
  max = 4,
  size = 'md',
  style,
}: AvatarGroupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const d = avatarDiameters(tokens.spacing)[size];

  // A single hidden avatar is shown instead of collapsed: `+1` is the same
  // width as the face it replaced and says less.
  const overflow = avatars.length - max;
  const shown = overflow > 1 ? avatars.slice(0, max) : avatars;
  const extra = avatars.length - shown.length;

  const slide = -Math.round(d * STACK_OVERLAP);
  // The outline is what separates one face from the one behind it; it has to
  // be the page colour, which `colors` resolves per scheme and `ramps` does not.
  const outline = {
    borderWidth: 2,
    borderColor: colors.surface,
    borderRadius: tokens.radius.full,
  };

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {shown.map((a, i) => (
        <View
          key={i}
          style={[
            {
              marginLeft: i === 0 ? 0 : slide,
              // Leading face on top, each one after it tucked behind.
              zIndex: shown.length - i,
            },
            outline,
          ]}
        >
          <AvatarV4 name={a.name} src={a.src} size={size} />
        </View>
      ))}
      {extra > 0 ? (
        <View
          accessible
          accessibilityLabel={`${extra} more`}
          style={[
            {
              marginLeft: slide,
              zIndex: 0,
              width: d,
              height: d,
              alignItems: 'center',
              justifyContent: 'center',
              // The page's own surface with a hairline: countable, and clearly
              // not another face.
              backgroundColor: colors.surface,
            },
            outline,
          ]}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: tokens.radius.full,
            }}
          />
          <Text
            style={{
              // `muted` is `neutral[600]` with no promise against `surface` —
              // the compiler guarantees the on-pairs, not this one.
              color: colors.mutedText,
              fontSize: tokens.typography.scale[MONOGRAM_STEP[size]],
              fontFamily: tokens.typography.fontBody,
              fontWeight: '600',
            }}
          >
            +{extra}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
