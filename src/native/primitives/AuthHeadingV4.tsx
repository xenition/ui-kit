import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from './TextV4';
import type { AuthAlign, AuthHeadingProps } from './AuthCard';

/**
 * `AuthHeading`, V4 — the headline and its supporting line, drawn the same way
 * on every auth and onboarding surface. Native twin of the web
 * `AuthHeadingV4`, at prop parity.
 *
 * §9 treats this and `AuthBrandTileV4` as one opening block, so the two were
 * built together and share their alignment vocabulary. The block is the first
 * thing a user reads in the product; §4 gives it a full section and the base
 * implementation quietly disagrees with that section in four places.
 *
 * ## 1. The gap was one step too tight
 *
 * §4: "`tokens.spacing.sm` between them." The base uses `spacing.xs` — 8
 * against 4 at the default scale, which sounds like nothing and is the
 * difference between a headline with a subhead under it and a headline with a
 * subhead stuck to it. V4 uses `sm`, as written.
 *
 * ## 2. The headline was set in the body face
 *
 * The kit's native `Text` sets no `fontFamily` at all, so it falls back to the
 * platform face — which means a seed that chose `Fraunces` for headings
 * rendered its sign-in headline in San Francisco or Roboto, and the single
 * most prominent line in the product was the one place the brand's own face
 * did not appear. §10 puts typography before containers; this is the cheapest
 * possible way to honour it, and it is what the native `ButtonV4` already does
 * with `tokens.typography.fontBody`. The subhead is pinned to the body face
 * for the same reason, so the pairing is stated rather than inherited.
 *
 * ## 3. The subhead used a decorative slot for a sentence
 *
 * `muted` is a decorative colour with no contrast promise — the compiler
 * guarantees nothing about it against `surface`. `mutedText` is the same
 * quietness walked until it clears AA, and it exists for exactly this. §46
 * puts legibility ahead of quietness, and a subhead is a sentence the user is
 * meant to read, not a hairline. `EmptyStateV4` made the same move for the
 * same reason.
 *
 * ## 4. There was no measure, so it ran the width of the device
 *
 * §4: "comfortable measure — do not let it run the full width on a tablet."
 * The base has none, so on a tablet the subhead becomes a single ribbon of
 * text across the screen. The block now caps at `2xl × 10` off the spacing
 * scale — 480 at the default scale, around 60 characters at the base step,
 * inside the 45–75 range typography has agreed on for a century. It follows a
 * re-scaled seed rather than being a number picked by eye, and
 * `measure={false}` turns it off for the rare caller that owns its own column.
 *
 * ## What it deliberately does not do
 *
 * **It does not clamp by default.** §4 says the headline runs to at most two
 * lines and the subhead to three. That is a brief for whoever writes the copy,
 * not a licence to truncate what an app actually passed: the spec's own
 * diagnosis table lists a clipped label ("Confiden…") as a *defect*, and
 * silently eliding a headline is worse than a headline that wraps to three
 * lines. So the caps are offered — {@link AuthHeadingV4Props.titleLines} and
 * {@link AuthHeadingV4Props.subtitleLines} — and never applied unasked.
 *
 * **No motion.** A headline has no states to transition between, so there is
 * no duration in this file to drift from `internal/motion-v4.ts`.
 *
 * A string title or subtitle is styled; any other node is rendered exactly as
 * given, so a caller can pass its own markup without losing the block's
 * rhythm. And with neither, the component renders **nothing** (§12): an
 * opening block with no words in it must not leave a gap where two lines
 * would be.
 */

export type { AuthAlign };

export interface AuthHeadingV4Props extends AuthHeadingProps {
  /**
   * Cap the block at a comfortable measure (§4). Default `true`. Pass `false`
   * when the caller already owns the column width and wants the block to fill
   * it.
   */
  measure?: boolean;
  /** Clamp the headline to N lines. Off by default — see the note on §4 above. */
  titleLines?: number;
  /** Clamp the subhead to N lines. Off by default. */
  subtitleLines?: number;
}

/**
 * §4's comfortable measure, as a multiple of the spacing scale.
 *
 * `2xl × 10` is 480 at the default scale — about 60 characters at the `base`
 * step. The web twin spells the identical product out as a Tailwind class, and
 * both specs assert the arithmetic so the two cannot drift.
 */
const MEASURE_STEPS = 10;

export function AuthHeadingV4({
  title,
  subtitle,
  align = 'left',
  size = 'xl',
  measure = true,
  titleLines,
  subtitleLines,
  style,
}: AuthHeadingV4Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();

  // §12 — no words, no block. Not an empty column with a gap in it.
  if (title == null && subtitle == null) return null;

  const textAlign = align === 'center' ? 'center' : 'left';

  return (
    <View
      style={[
        {
          // §4's step between the headline and its supporting line, as written.
          gap: tokens.spacing.sm,
          alignItems: align === 'center' ? 'center' : 'flex-start',
        },
        measure ? { maxWidth: tokens.spacing['2xl'] * MEASURE_STEPS } : null,
        // A capped block that is meant to be centred has to be centred as a
        // block, not only as text — otherwise it sits left in its own column.
        measure && align === 'center' ? { alignSelf: 'center' } : null,
        style,
      ]}
    >
      {title != null ? (
        typeof title === 'string' ? (
          <TextV4
            size={size}
            weight="bold"
            align={textAlign}
            accessibilityRole="header"
            numberOfLines={titleLines}
            face="heading"
          >
            {title}
          </TextV4>
        ) : (
          title
        )
      ) : null}
      {subtitle != null ? (
        typeof subtitle === 'string' ? (
          <TextV4
            size="base"
            tone="mutedText"
            align={textAlign}
            numberOfLines={subtitleLines}
            face="body"
          >
            {subtitle}
          </TextV4>
        ) : (
          subtitle
        )
      ) : null}
    </View>
  );
}
