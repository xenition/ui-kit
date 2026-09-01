import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { isIconName } from '../primitives/icon-names';
import { flowGroundVars, type OnboardingAccentV4 } from './internal/flow-v4';
import type { PaywallFeatureRowsProps } from './PaywallScreen';

export interface PaywallFeatureRowsV4Props extends PaywallFeatureRowsProps {
  /** Which brand slot the badges answer in. Default `'primary'`. */
  accent?: OnboardingAccentV4;
  /**
   * Number the rows instead of drawing their glyphs.
   *
   * The same anatomy answers two different questions — "what do I get" (icons)
   * and "how does this work" (1, 2, 3) — and an onboarding needs both. Without
   * it every host that wanted a numbered how-it-works list rebuilt the row.
   */
  numbered?: boolean;
}

/**
 * Below this many rows the connecting rail is off by default: two badges
 * joined by a line read as a diagram of something, and there is nothing to
 * diagram. At three or more the rail is what makes the rows read as one list
 * rather than three fragments (spec §8).
 */
const RAIL_MIN_ROWS = 3;

/**
 * **V4 feature rows** — the web twin of the native `PaywallFeatureRowsV4`,
 * same props as {@link PaywallFeatureRows} plus `accent` and `numbered`.
 *
 * The §8 anatomy, and the component the reference welcome-offer screen is
 * mostly made of: a circular tinted badge, a semibold title, a muted
 * description, and a hairline rail joining the badges into one list.
 *
 * ## Four changes
 *
 * 1. **The tint is mixed, not ramped.** `bg-primary-50` carries the light
 *    orientation in both schemes, so the base's badge was a near-white circle
 *    on a dark page.
 * 2. **The rail is `aria-hidden`.** It is decoration between two badges and it
 *    was reaching the accessibility tree as an empty element in each row.
 * 3. **`numbered`** — the same rows as an ordered list.
 * 4. **Descriptions take `muted-text`.** `muted` carries no contrast promise,
 *    and this is the copy carrying the value proposition.
 *
 * **Renders nothing for an empty `rows`** (§4.5) — a heading with no list under
 * it is worse than no section.
 */
export const PaywallFeatureRowsV4 = React.forwardRef<HTMLDivElement, PaywallFeatureRowsV4Props>(
  function PaywallFeatureRowsV4(
    {
      rows,
      heading,
      rail,
      dense = false,
      accent = 'primary',
      numbered = false,
      className,
      style,
      ...rest
    },
    ref
  ) {
    const list = rows?.filter((row) => row.title) ?? [];
    if (list.length === 0) return null;

    const showRail = rail ?? list.length >= RAIL_MIN_ROWS;
    const pad = dense ? 'pb-sm' : 'pb-md';

    return (
      <div
        ref={ref}
        style={{ ...flowGroundVars('plain', accent), ...style }}
        className={cn('flex w-full flex-col gap-sm', className)}
        {...rest}
      >
        {heading ? (
          <TextV4 size="sm" weight="semibold" tone="mutedText">
            {heading}
          </TextV4>
        ) : null}

        <ul className="flex flex-col">
          {list.map((row, i) => {
            const last = i === list.length - 1;
            const glyph = row.icon;
            return (
              <li
                key={row.id ?? row.title}
                className={cn('flex items-stretch', !last && pad)}
              >
                {/*
                  The badge column owns the rail, so the line runs from this
                  badge to the next and simply is not drawn on the last row.
                */}
                <div className="flex shrink-0 flex-col items-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--flow-badge)] text-[var(--flow-ink)]">
                    <BadgeMark glyph={glyph} index={i} numbered={numbered} title={row.title} />
                  </span>
                  {showRail && !last ? (
                    <span
                      aria-hidden
                      data-testid="xen-paywall-rail"
                      className="mt-xs w-px flex-1 bg-border"
                    />
                  ) : null}
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-xs pl-md">
                  <TextV4 size="base" weight="semibold" tone="onSurface">
                    {row.title}
                  </TextV4>
                  {row.description ? (
                    <TextV4 size="sm" tone="mutedText">
                      {row.description}
                    </TextV4>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

/**
 * The badge's contents: the row's 1-based index when `numbered`, the named
 * icon when the glyph is one of the kit's names, and the raw glyph otherwise.
 *
 * Split out because the three-way choice inside the list's JSX was the one
 * place this component stopped being readable.
 */
function BadgeMark({
  glyph,
  index,
  numbered,
  title,
}: {
  glyph?: string;
  index: number;
  numbered: boolean;
  title: string;
}): React.ReactElement {
  if (numbered) {
    return (
      <span className="text-base font-bold [font-variant-numeric:tabular-nums]">{index + 1}</span>
    );
  }
  if (glyph && isIconName(glyph)) return <IconV4 name={glyph} size="lg" />;
  return <IconV4 glyph={glyph ?? '✦'} size="lg" aria-label={glyph ? undefined : title} />;
}
