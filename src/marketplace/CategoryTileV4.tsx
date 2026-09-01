import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import { stateGroundVars, V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { IconName } from '../primitives/icon-names';
import { activateOnKey } from './internal';
import type { CategoryTileProps, CategoryTileVariant } from './CategoryTile';

export type { CategoryTileVariant };

export interface CategoryTileV4Props extends CategoryTileProps {
  /**
   * A name from the kit's icon set, drawn in the **tinted circular badge**
   * (brief §4.7 — "use one when the tile is categorical… when the leading slot
   * names *a kind of thing*"). A category tile is the textbook case for that
   * rule, which is why the badge is the tile's default treatment rather than
   * an option.
   *
   * {@link CategoryTileProps.glyph} stays as the escape hatch for a one-off
   * mark the named set has no name for, and takes the same badge. Passing
   * both, `glyph` wins — the same precedence `IconV4` itself applies.
   */
  iconName?: IconName;
}

/** The one `<style>` id this component injects its own sheet from. Idempotent. */
export const CATEGORY_TILE_V4_STYLE_ID = 'xen-v4-category-tile-styles';

/**
 * Two rules, saying two things a class bound to a token cannot say.
 *
 * **The ground** (§4.2). The tile paints `--xen-card`, not `--xen-surface`.
 * `CardV4` hard-codes `bg-surface text-on-surface` in its own class list and
 * `cn()` is a plain string join with no `tailwind-merge` behind it, so passing
 * `bg-card` in `className` would put both utilities on the element and let the
 * generated stylesheet's ordering pick the winner. Two attributes (0-2-0) beat
 * one class (0-1-0) wherever the sheets land.
 *
 * **The selected container.** `--xen-selected` / `--xen-on-selected` is the
 * token the shadcn pass added for exactly this — "the selected-row container"
 * — and the base was hand-mixing `bg-primary-50` instead, which is a *ramp
 * step*: on a dark page `primary[50]` is a near-white, so a selected tile in
 * dark mode was a bright slab with brand-coloured text on it. The border
 * follows, because a selected tile is a container that has changed state and
 * §4.3's transition list moves fill and edge together.
 */
export const CATEGORY_TILE_V4_CSS = `
[data-xen-v4-card][data-xen-v4-category-tile] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
[data-xen-v4-card][data-xen-v4-category-tile][data-selected="true"] {
  background-color: var(--xen-selected);
  color: var(--xen-on-selected);
  border-color: var(--xen-primary);
}
`;

/**
 * **V4 category tile** — the browse-grid entry, as a card with a badge.
 *
 * Six changes, each one a rule this module was breaking:
 *
 * 1. **The ground is `card`** (§4.2). Every card in `marketplace` painted the
 *    colour of the page and leaned on a border to be visible at all, which is
 *    why a browse grid in dark mode read as a flat sheet of rectangles.
 * 2. **The glyph became the tinted circular badge** (§4.7). A category names a
 *    kind of thing, which is the exact case the badge exists for, and the
 *    badge is the same 44 circle the row family's leading slot uses — so a
 *    category in a grid and a category in a list are recognisably one object.
 * 3. **Selection is not colour alone** (rule 6). The base carried it as an
 *    accent ring plus a tinted surface plus `aria-pressed` — two colour
 *    channels and one channel a sighted reader cannot see. V4 adds a
 *    **checkmark**, which is M3's filter-chip behaviour and HIG's option-list
 *    rule: a selected option shows a mark, not just a shade.
 * 4. **The selected ground is the `selected` token**, not a ramp step. See
 *    {@link CATEGORY_TILE_V4_CSS}.
 * 5. **The tile clears the tap floor.** `MIN_TAP_CLASS` (44) on the chip, and
 *    the tile keeps its taller block. The base's chip was `py-sm` around a
 *    `text-sm` label, which lands around 32.
 * 6. **Press feedback is the state layer** (§4.3), given the opaque
 *    `card`/`onCard` (or `selected`/`onSelected`) pair, because the label's
 *    contrast promise is made against the fill the tile actually wears.
 *
 * Composes `CardV4`, `IconV4` and `TextV4` (rule 7). Renders **nothing** when
 * it has neither a label nor a mark (§4.5) — never a blank bordered box.
 */
export const CategoryTileV4 = React.forwardRef<HTMLDivElement, CategoryTileV4Props>(
  function CategoryTileV4(
    { label, glyph, iconName, count, selected = false, variant = 'tile', onClick, className, ...rest },
    ref
  ) {
    injectStyleOnce(CATEGORY_TILE_V4_STYLE_ID, CATEGORY_TILE_V4_CSS);
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const chip = variant === 'chip';
    const interactive = onClick != null;
    const hasLabel = label !== undefined && label !== null && label !== '';
    const hasMark = glyph !== undefined || iconName !== undefined;

    // Nothing to name and nothing to show, so nothing is drawn (§4.5).
    if (!hasLabel && !hasMark) return null;

    const countLabel = typeof count === 'number' ? `${count.toLocaleString()} items` : undefined;

    /*
      A chip is a 44-tall pill: a 44 badge inside it would leave no room for
      its own padding, so the chip takes the bare glyph and the tile takes the
      badge. Both are `IconV4`; only the `badge` prop differs.
    */
    const mark = hasMark ? (
      <IconV4
        glyph={glyph}
        name={iconName}
        size={chip ? 'base' : 'lg'}
        color="primary"
        badge={chip ? undefined : 'soft'}
        className="shrink-0"
      />
    ) : null;

    // Rule 6: the selected state gets a mark, not only a shade.
    const check = selected ? (
      <IconV4 name="check" size="sm" color="primary" className="shrink-0" />
    ) : null;

    const body = (
      <>
        {mark}
        <div className={cn('flex min-w-0 flex-col gap-xs', chip ? 'items-start' : 'items-center')}>
          {hasLabel ? (
            <TextV4
              size="sm"
              weight="semibold"
              tone={selected ? 'onSelected' : 'onCard'}
              numberOfLines={1}
            >
              {label}
            </TextV4>
          ) : null}
          {countLabel !== undefined ? (
            <TextV4 size="xs" tone="mutedText" numberOfLines={1}>
              {countLabel}
            </TextV4>
          ) : null}
        </div>
        {check}
      </>
    );

    const shared = {
      'data-xen-v4-category-tile': '',
      'data-selected': selected ? 'true' : 'false',
      radius: 'lg' as const,
      padding: (chip ? 'sm' : 'lg') as 'sm' | 'lg',
      className: cn(
        'flex items-center justify-center',
        MIN_TAP_CLASS,
        chip ? 'flex-row gap-sm px-md' : 'flex-col gap-sm',
        className
      ),
    };

    if (!interactive) {
      return (
        <CardV4 ref={ref} {...shared} {...rest}>
          {body}
        </CardV4>
      );
    }

    /*
      A `role="button"` container rather than a real `<button>`, which is the
      pattern every tappable card in the kit uses and the only one available
      here: the state layer has to sit on the element that owns the ground, and
      a `<button>` wrapped around an opaque card would tint a region the card
      covers completely — a press with no visible feedback.
    */
    return (
      <CardV4
        ref={ref}
        {...shared}
        {...rest}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`${String(label ?? '')}${countLabel !== undefined ? `, ${countLabel}` : ''}`}
        data-xen-v4-state=""
        style={
          stateGroundVars(
            selected ? 'var(--xen-selected)' : 'var(--xen-card)',
            selected ? 'var(--xen-on-selected)' : 'var(--xen-on-card)'
          ) as React.CSSProperties
        }
        onClick={onClick}
        onKeyDown={activateOnKey}
      >
        {body}
      </CardV4>
    );
  }
);
