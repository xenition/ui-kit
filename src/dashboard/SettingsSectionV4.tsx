import * as React from 'react';
import { ListSeparatorV4 } from '../layout/ListSeparatorV4';
import { injectStyleOnce } from '../motion/internal/inject';
import type { CardVariant } from '../primitives/Card';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { cn } from '../primitives/cn';
import {
  DASHBOARD_CARD_V4_CSS,
  DASHBOARD_CARD_V4_STYLE_ID,
  type SectionCardV4Empty,
} from './SectionCardV4';

export type { SectionCardV4Empty as SettingsSectionV4Empty };

/**
 * The gutter the group heading and the footnote take.
 *
 * `spacing.md`, which is `ROW_V4_METRICS.padX` in `internal/row-v4.ts` — the
 * row family's own horizontal padding. That is the whole point of the number:
 * §5 asks that the heading "line up with the card edge", and what it actually
 * has to line up with is the **row title inside** the card, so the heading and
 * the rows pay the same gutter. The base pays `px-sm`, which lines up with
 * nothing. Written as the token rather than read off the metric object because
 * a Tailwind class has to be a literal string in the source for the scanner to
 * see it; the value is one token either way, so the two cannot disagree.
 */
const GROUP_PAD_X = 'px-[var(--xen-space-md)]';

/** Heading to card to footnote. §4.1's 4 — the base's `gap-xs`, unchanged. */
const GROUP_GAP = 'gap-[var(--xen-space-xs)]';

export interface SettingsSectionV4Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Group heading above the rows.
   *
   * Sentence case, `size="sm" weight="semibold" tone="mutedText"`. The base
   * sets `text-xs uppercase` — that is admin styling, and HIG's grouped-list
   * headers are sentence case (§5).
   */
  title?: string;
  /** Footnote under the group — the "why this setting exists" line. */
  footnote?: string;
  /**
   * Inset the separators to clear the rows' 44 leading slot. Default `false` —
   * the flush rule, which is what rows without a leading slot want.
   *
   * §4.4: where the rows carry an avatar or a tinted badge (`SettingsRowV4`
   * gains a `leading` slot in this pass) the rule starts at `44 + spacing.md`,
   * so it aligns with the labels above and below it instead of cutting the
   * badges in half. The number belongs to `ListSeparatorV4` and
   * `internal/row-v4.ts`; this prop is only the question of whether the rows
   * have a slot to clear, which the caller knows and the container cannot.
   */
  insetSeparators?: boolean;
  /**
   * Surface treatment, forwarded to {@link CardV4}. Default `'elevated'`:
   * §4.2's hairline plus `elevation.card`.
   *
   * §4.6 allows a shadow on a card sitting on the page and on nothing else, so
   * a settings group nested inside another card passes `'flat'` or
   * `'outlined'`. On a `depth: 'flat'` seed the token is already inert.
   */
  variant?: CardVariant;
  /**
   * What to show when there are no rows (§4.5). Routed through `EmptyStateV4`.
   *
   * With no rows and no empty state the whole component renders `null` — an
   * empty grouped card is the "blank bordered box" §4.5 forbids, and a group
   * heading over nothing is worse.
   */
  empty?: SectionCardV4Empty;
  /** {@link SettingsRow}s (or any rows) — separators are drawn between them. */
  children?: React.ReactNode;
}

/**
 * **V4 settings section** — HIG's inset-grouped list, and the container that
 * makes a settings row look right.
 *
 * ## What V4 changes
 *
 * 1. **The ground is `card`, not `surface`.** Same headline fix as
 *    `SectionCardV4`, through the same sheet — see
 *    `DASHBOARD_CARD_V4_GROUND_ATTR`. A grouped list painted the colour of the
 *    page is a border with rows in it.
 * 2. **The separators are `ListSeparatorV4`.** Both twins hand-roll
 *    `<div className="h-px bg-border" />` today, which is how the leading inset
 *    went missing in the first place. They are drawn **between** the rows, so
 *    the last row gets none and the list ends on the card's own edge (§4.4).
 * 3. **The uppercase `xs` heading is gone.** Admin styling; HIG's grouped
 *    headers are sentence case. It becomes `size="sm" weight="semibold"
 *    tone="mutedText"` — `mutedText`, never the `muted` **fill**, which is what
 *    both base twins paint their heading and footnote with.
 * 4. **The heading and footnote pay the row gutter.** `spacing.md`, not
 *    `px-sm`, so the heading sits over the row titles rather than near them.
 * 5. **It renders nothing for zero rows.** §4.5, and the base's exact bug: an
 *    empty `SettingsSection` today is a bordered rectangle with a heading over
 *    it.
 *
 * The card is `overflow: hidden` and pays no padding of its own: the rows own
 * their gutters (`internal/row-v4.ts`), so they run flush to the card edge and
 * clip to `radius.lg`. §4.3 in one sentence — **a list of rows is one card with
 * rows in it, not a stack of cards.**
 *
 * ### Platform divergence
 *
 * None. Same props, same names, same defaults as the native twin.
 */
export const SettingsSectionV4 = React.forwardRef<HTMLDivElement, SettingsSectionV4Props>(
  function SettingsSectionV4(
    {
      title,
      footnote,
      insetSeparators = false,
      variant = 'elevated',
      empty,
      children,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(DASHBOARD_CARD_V4_STYLE_ID, DASHBOARD_CARD_V4_CSS);

    const rows = React.Children.toArray(children).filter(Boolean);
    const hasBody = rows.length > 0 || empty !== undefined;

    // §4.5: a group with no rows and nothing to say about it renders nothing —
    // not an empty bordered box, and not a heading floating over one.
    if (!hasBody) return null;

    return (
      <div
        ref={ref}
        data-xen-v4-settings-section=""
        className={cn('flex flex-col', GROUP_GAP, className)}
        {...rest}
      >
        {title ? (
          <div data-xen-v4-settings-section-heading="" className={GROUP_PAD_X}>
            <TextV4 size="sm" weight="semibold" tone="mutedText">
              {title}
            </TextV4>
          </div>
        ) : null}

        <CardV4
          variant={variant}
          radius="lg"
          // No padding: the rows own their gutters, and a card that also paid
          // one would push every row's text into a channel down the middle.
          padding="none"
          data-xen-v4-settings-section-card=""
          // The same attribute `SectionCardV4` writes, matched by the same
          // sheet — `DASHBOARD_CARD_V4_GROUND_ATTR`, asserted in both specs.
          data-xen-v4-card-ground="card"
          // `overflow-hidden` so the first and last rows clip to `radius.lg`
          // instead of squaring off the card's corners.
          className="overflow-hidden"
        >
          {rows.length > 0
            ? rows.map((row, i) => (
                <React.Fragment key={i}>
                  {/*
                    Between the rows, never after the last one: a rule on the
                    card's own edge is a second border (§4.4).
                  */}
                  {i > 0 ? (
                    <ListSeparatorV4 inset={insetSeparators ? 'leading' : undefined} />
                  ) : null}
                  {row}
                </React.Fragment>
              ))
            : empty !== undefined
              ? <EmptyStateV4 {...empty} />
              : null}
        </CardV4>

        {footnote ? (
          <div data-xen-v4-settings-section-footnote="" className={GROUP_PAD_X}>
            {/*
              `sm`, the same step as the row's supporting line, rather than the
              base's `xs`. A footnote is a sentence the user is meant to read
              (§46 puts legibility ahead of quietness); `mutedText` is what
              makes it quiet.
            */}
            <TextV4 size="sm" tone="mutedText">
              {footnote}
            </TextV4>
          </div>
        ) : null}
      </div>
    );
  }
);
