import * as React from 'react';
import { cn } from './cn';
import { AuthBrandTileV4, type AuthBrandTileShape, type AuthBrandTileSize } from './AuthBrandTileV4';
import { AuthHeadingV4 } from './AuthHeadingV4';
import { CardV4 } from './CardV4';
import { TextV4 } from './TextV4';
import type { CardPadding, CardVariant } from './Card';
import type { AuthCardProps } from './AuthCard';

/**
 * `AuthCard`, V4 — the shell every auth screen is assembled in.
 *
 * This is the container `LoginFormV4`, `SignupFormV4` and
 * `ForgotPasswordFormV4` are poured into, so it owns four things and nothing
 * else: the column the form sits in, the surface under it, the vertical rhythm
 * between its four bands, and the opening block (§9's brand tile + headline).
 * Everything between the headline and the footer is `children` — the shell has
 * no opinion about fields.
 *
 * It composes `CardV4`, `AuthBrandTileV4`, `AuthHeadingV4` and `TextV4` (§10.5
 * — a V4 composite composes V4 children). The base composes the base parts;
 * mixing the two lines is what makes a "V4 screen" look like a V3 screen with
 * one new button on it.
 *
 * ## 1. The rhythm was one flat `md` for everything
 *
 * The base sets `gap-md` on the card and stops, so the distance from the brand
 * tile to the headline, from the headline to the first field, and from the
 * last field to the footer are all the same 16 — and the card reads as five
 * things stacked at equal pitch rather than as four bands. §4 is explicit:
 * `tokens.spacing.sm` **inside** the headline block, `tokens.spacing.lg`
 * **above and below** it. `AuthHeadingV4` already owns the `sm`; this owns the
 * `lg`, so the two halves of §4 are finally stated in the same design line.
 *
 * 24 against 16 sounds like nothing written down and is the whole difference
 * between the reference screens and the ones the spec's diagnosis table calls
 * "everything left-aligned and tight to the top".
 *
 * ## 2. The column was a Tailwind size, not the seed's scale
 *
 * The base writes `max-w-sm` on web and `maxWidth: 384` on native. They agree
 * today by coincidence — `sm` is 24rem — and neither follows the theme: a seed
 * that tightens its spacing scale gets tighter padding, tighter gaps and a card
 * that stays exactly 384 wide, so the one box holding everything is the one box
 * out of rhythm with its contents. {@link AuthCardV4Props.width} composes the
 * column from the spacing scale instead: `2xl × 8` is **384 at the default
 * scale** — the same pixels, now derived. It is the argument `AuthHeadingV4`
 * makes for its measure (`2xl × 10`) and `AuthBrandTileV4` makes for its
 * square, and `'md'` deliberately lands on that same 480 so a wide auth card
 * and a headline measure agree instead of nearly agreeing.
 *
 * ## 3. The subtitle kept a rendering V4 has no caller to preserve
 *
 * The base wraps a string subtitle in its own `sm`/`muted` `Text` before
 * handing it to `AuthHeading` — a comment in that file says so plainly, and the
 * reason is historical: real apps ship that subhead today and it must not move
 * under them.
 *
 * **V4 hands the subtitle straight to `AuthHeadingV4` and lets it draw its own
 * step.** Three reasons, in order of weight:
 *
 * 1. There is nothing to preserve. `AuthCardV4` is a new export with no
 *    callers, so "the historical rendering" is not a constraint here — it is
 *    only a habit copied across.
 * 2. `muted` carries no contrast promise against `surface`; `mutedText` is the
 *    same quietness walked until it clears AA. A subhead is a sentence the user
 *    is meant to read (§46), and `AuthHeadingV4` already made exactly this fix.
 *    Re-wrapping the string here would reach around that fix and re-introduce
 *    the decorative slot.
 * 3. §4 sets the subhead at `size="base"`, not `sm`. The base renders one step
 *    smaller than the spec asks, and — worse — a form that called
 *    `AuthHeadingV4` directly would get `base`/`mutedText` while the same
 *    string routed through the shell got `sm`/`muted`. The family would
 *    disagree with itself about its own subhead depending on which door the
 *    copy came in.
 *
 * A non-string subtitle passes through untouched, exactly as before.
 *
 * ## 4. The footer disagreed across the twins
 *
 * The base's web footer wraps the node in a centred `div` and styles nothing;
 * the native twin wraps a **string** in `Text size="sm" tone="muted"`. So the
 * same `footer="Don't have an account?"` is body-sized ink on web and a small
 * muted line on native — a parity break hiding inside a component whose whole
 * job is to look the same on both. V4 states it once, in both twins: a string
 * footer is `sm`/`mutedText`, centred; any other node is rendered as given, so
 * §9's "Don't have an account? **Register**" (which needs a link inside it)
 * still works.
 *
 * {@link AuthCardV4Props.footerDivider} adds §5's hairline above that line.
 * Off by default, because §9's footer is one sentence and a rule above a
 * sentence is a container that has not earned itself — but a card whose footer
 * carries provider buttons or a legal block wants the separation, and the
 * alternative is every caller hand-rolling a `border-t`.
 *
 * ## What it deliberately does not have
 *
 * **No motion.** `internal/v4-motion.ts` exists so a component with a state
 * change takes M3's duration instead of inventing one. A shell has no states:
 * it does not hover, focus, press or disable — the controls inside it do, and
 * they own their own layers. An entrance animation on the card would be
 * decoration invented for its own sake, and it would fire again on every
 * re-render of a form that swapped a field. So there is no duration in this
 * file to drift.
 *
 * **No `titleSize` change.** §9 asks for a `3xl` headline on the auth screens,
 * and the default here stays `'xl'` — the same default `AuthHeadingV4` kept,
 * for the same reason: the step is the *screen's* decision, and the three forms
 * pass `titleSize="3xl"` when they are the screen rather than a panel inside
 * one. A shell that forced `3xl` could not be embedded in a modal.
 *
 * Survives every empty state §12 names: no brand mark (the tile renders
 * nothing, not an empty square), no title, no subtitle, no footer — and
 * children alone, which is a bare `CardV4` with the form in it and no holes
 * where a headline would be.
 */

/** The column the card holds, composed from the spacing scale. */
export type AuthCardWidth = 'sm' | 'md' | 'full';

export interface AuthCardV4Props extends AuthCardProps {
  /**
   * Surface treatment, forwarded to {@link CardV4}. Default `'elevated'`.
   *
   * The auth card is the only container on its page — there is nothing behind
   * it to be confused with — so it is the one place a real shadow is layer
   * order made visible rather than decoration (`design.md` §8). It is also not
   * a decision this file gets to impose: `CardV4` reads `elevation.card` from
   * the compiled theme, and a `flat` seed neutralises it to nothing. Pass
   * `'outlined'` for the base's hairline-only surface, or `'flat'` when the
   * card is already inside a sheet.
   */
  variant?: CardVariant;
  /** Card padding, forwarded to {@link CardV4}. Default `'lg'` — the base's. */
  padding?: CardPadding;
  /**
   * The column width. Default `'sm'` — `2xl × 8`, which is 384 at the default
   * scale and so the base's `max-w-sm` to the pixel. `'md'` is `2xl × 10`
   * (480), the same measure `AuthHeadingV4` caps at, for a card carrying a
   * two-column form. `'full'` removes the cap for a caller that owns its own
   * column — and hands the measure back to the headline block, which is then
   * the only thing that can stop a subhead running the width of a tablet (§4).
   */
  width?: AuthCardWidth;
  /**
   * Brand tile square, forwarded to {@link AuthBrandTileV4}. Default `'md'` —
   * §9's 56 tile. `'lg'` is §3's hero-slot medallion.
   */
  brandSize?: AuthBrandTileSize;
  /**
   * Brand tile silhouette, forwarded to {@link AuthBrandTileV4}. Default
   * `'rounded'` — §9's square. `'circle'` is §3's medallion.
   */
  brandShape?: AuthBrandTileShape;
  /**
   * Announced label for the brand mark. Decorative by default.
   *
   * The base gave the shell no way to reach the tile's `aria-label`, so an app
   * whose mark carries meaning ("Acme") had to drop out of `AuthCard` entirely
   * to say so.
   */
  brandLabel?: string;
  /**
   * Draw §5's hairline above the footer. Default `false` — the base's
   * rendering, and the right one for a single-sentence footer.
   */
  footerDivider?: boolean;
}

/*
  The column, composed from the spacing scale rather than picked off Tailwind's
  size ramp.

  `2xl × 8` is 384 at the default scale (the base's `max-w-sm`, exactly) and
  `2xl × 10` is 480 (`AuthHeadingV4`'s measure, exactly). Written out as whole
  class strings because Tailwind's content scanner reads source text — an
  interpolated class never reaches the generated CSS. The native twin computes
  the identical products from `tokens.spacing`, and both twins' specs assert
  the arithmetic so the two cannot drift apart.
*/
const WIDTH_CLASS: Record<AuthCardWidth, string | null> = {
  sm: 'max-w-[calc(var(--xen-space-2xl)*8)]',
  md: 'max-w-[calc(var(--xen-space-2xl)*10)]',
  full: null,
};

export function AuthCardV4({
  title,
  subtitle,
  children,
  footer,
  brandGlyph,
  brandIcon,
  align = 'left',
  titleSize = 'xl',
  variant = 'elevated',
  padding,
  width = 'sm',
  brandSize,
  brandShape,
  brandLabel,
  footerDivider = false,
  className,
}: AuthCardV4Props): React.ReactElement {
  return (
    <div
      data-xen-v4-auth-card=""
      data-width={width}
      data-align={align}
      className={cn('mx-auto w-full', WIDTH_CLASS[width], className)}
    >
      <CardV4
        variant={variant}
        padding={padding}
        // §4's `lg` above and below the headline block — the outer half of the
        // rule whose inner half (`sm`) `AuthHeadingV4` already owns.
        className="flex flex-col gap-lg"
      >
        <AuthBrandTileV4
          glyph={brandGlyph}
          name={brandIcon}
          align={align}
          size={brandSize}
          shape={brandShape}
          aria-label={brandLabel}
        />
        {/*
          The subtitle goes to `AuthHeadingV4` as-is — see §3 in the note above.
          The base re-wraps a string here to protect its existing callers; this
          component has none, and re-wrapping would reach around the `base` step
          §4 asks for and the AA-safe `mutedText` the heading already fixed.
        */}
        <AuthHeadingV4
          title={title}
          subtitle={subtitle}
          align={align}
          size={titleSize}
          /*
            The card is the column, so the heading must not cap a second time
            inside it — a 480 measure inside a 384 card is a cap that never
            binds, and inside a *centred* card it would add a `mx-auto` that
            does nothing. When the card gives up its own cap (`width="full"`)
            the heading's measure is the only thing left holding §4, so it comes
            back on.
          */
          measure={width === 'full'}
        />
        {children}
        {footer != null ? (
          <div
            data-xen-v4-auth-footer=""
            className={cn(
              'text-center',
              // §5's hairline, and the `lg` under it so the rule sits centred
              // in the same rhythm as everything else in the column.
              footerDivider && 'border-t border-border pt-lg'
            )}
          >
            {typeof footer === 'string' ? (
              <TextV4 size="sm" tone="mutedText" align="center">
                {footer}
              </TextV4>
            ) : (
              footer
            )}
          </div>
        ) : null}
      </CardV4>
    </div>
  );
}
