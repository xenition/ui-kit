import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { InventoryItemProps } from './InventoryItem';
import { rarityRank, type ItemRarity } from './types';
import {
  BADGE_V4,
  IDENTITY_TONE,
  PLACEHOLDER_CLASS,
  TABULAR_CLASS,
  spokenLine,
} from './internal/arcade-v4';

export interface InventoryItemV4Props extends InventoryItemProps {
  /** Override the five rarity words. */
  rarityLabels?: Partial<Record<ItemRarity, string>>;
}

const RARITY_LABEL: Record<ItemRarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

/**
 * The tier as a **shape**: the frame thickens as the rarity climbs.
 *
 * `IDENTITY_TONE` flattens all five tiers to one colour on purpose, so a
 * neutral frame alone would say nothing — and the conventions sanction exactly
 * this substitution: identity gets "a glyph, a shape or a neutral chip".
 *
 * Three weights across five tiers, not five: the kit's border scale steps
 * 1 → 2 → 4 → 8, and 8px of frame around a 64px tile is a box rather than an
 * accent. The word beside it is what names the tier precisely; the frame is
 * the glance.
 */
const RARITY_FRAME: readonly string[] = [
  'border',
  'border',
  'border-2',
  'border-2',
  'border-4',
];

const CARD_STATE = stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties;

/**
 * **V4 inventory item** — same props as {@link InventoryItem} plus
 * `rarityLabels`.
 *
 * ## Four changes
 *
 * 1. **Inspect stops claiming to be a toggle.** The button announced
 *    `aria-pressed={item.equipped}`, so a reader was told it was a two-state
 *    control whose state it could change — and pressing it opens an inspect
 *    view and can never change `equipped` at all. A user who pressed it
 *    listening for the state to flip waited for something that was never going
 *    to happen. (The twins told different lies about it: native reported
 *    `selected`.) It is a plain action now, named for what it does.
 * 2. **A rarity tier is identity, so it stops wearing the status palette.**
 *    `rarityColorKey` ran the five tiers across `muted`/`success`/`primary`/
 *    `accent`/`warn`, which put a **green** frame on an uncommon sword and an
 *    **amber** one on a legendary — the two colours the kit uses for "fine"
 *    and "look at this", spent on a category. That helper is still exported
 *    from the module index, so it stays; this component simply stops calling
 *    it. The tier is a neutral chip carrying its own word (overridable through
 *    `rarityLabels`) over a frame whose *weight* climbs with the tier — see
 *    {@link RARITY_FRAME}. Only `Equipped` keeps a status colour, because an
 *    equipped item is in an affirmative state rather than a category.
 * 3. **The item's name lands.** Both the interactive and the static form built
 *    a good combined name; the static one hung it on a bare `<div>`, where
 *    ARIA forbids naming a generic element, so the browser discarded it —
 *    while the native twin sets `accessible` and does announce it. Two twins,
 *    two different amounts of information. The static form is a `group`.
 * 4. **The art slot is a token ground and the press is a state layer.**
 *    `bg-neutral-100` inverts under `[data-theme="dark"]` while the item art
 *    over it does not; `hover:opacity-85` dims the item's own content, which
 *    is M3's disabled signal. The tap target clears 44 and the focus ring is
 *    the kit's one `ring` colour rather than a ramp step.
 */
export const InventoryItemV4 = React.forwardRef<HTMLDivElement, InventoryItemV4Props>(
  function InventoryItemV4({ item, variant = 'tile', onClick, rarityLabels, className }, ref) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!item?.name) return null;

    const row = variant === 'row';
    const rarityWord = item.rarity
      ? (rarityLabels?.[item.rarity] ?? RARITY_LABEL[item.rarity])
      : undefined;
    const stacked = item.quantity != null && item.quantity > 1;
    const frame = RARITY_FRAME[rarityRank(item.rarity)] ?? 'border';

    const art = (
      <span
        aria-hidden="true"
        className={cn(
          'relative flex items-center justify-center overflow-hidden text-xl',
          'rounded-[var(--xen-radius-md)] border-border',
          frame,
          PLACEHOLDER_CLASS,
          row
            ? 'h-2xl w-2xl'
            : cn(
                'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]',
                'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]'
              )
        )}
      >
        {item.imageUrl ? (
          <img src={item.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
        ) : (
          (item.glyph ?? '🎁')
        )}
        {stacked ? (
          <span className="absolute bottom-0 right-0">
            <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE} className={TABULAR_CLASS}>
              {`×${item.quantity}`}
            </BadgeV4>
          </span>
        ) : null}
      </span>
    );

    const label = (
      <span className={cn('flex flex-col gap-xs', row ? 'flex-1 items-start' : 'items-center')}>
        <span
          className={cn(
            'truncate text-sm font-semibold text-on-card',
            row ? 'text-left' : 'text-center'
          )}
        >
          {item.name}
        </span>
        {rarityWord != null || item.equipped ? (
          <span className="flex items-center gap-xs">
            {rarityWord ? (
              <BadgeV4 {...BADGE_V4} tone={IDENTITY_TONE}>
                {rarityWord}
              </BadgeV4>
            ) : null}
            {item.equipped ? (
              // Equipped is an affirmative state of the item, not a name for
              // it — one of the module's only two remaining status badges.
              <BadgeV4 {...BADGE_V4} tone="success">
                Equipped
              </BadgeV4>
            ) : null}
          </span>
        ) : null}
      </span>
    );

    const bodyClass = cn(
      'flex',
      row ? 'flex-row items-center gap-md' : 'flex-col items-center gap-xs'
    );
    const name = spokenLine([
      item.name,
      rarityWord,
      stacked ? `×${item.quantity}` : undefined,
      item.equipped ? 'Equipped' : undefined,
    ]);

    if (!onClick) {
      return (
        <div ref={ref} role="group" aria-label={name} className={cn(bodyClass, className)}>
          {art}
          {label}
        </div>
      );
    }

    return (
      <div ref={ref} className={className}>
        <button
          type="button"
          // No `aria-pressed`: inspecting an item is an action, not a toggle.
          aria-label={name}
          onClick={() => onClick(item)}
          data-xen-v4-state=""
          style={CARD_STATE}
          className={cn(
            bodyClass,
            'w-full rounded-[var(--xen-radius-md)] p-xs',
            MIN_TAP_CLASS,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {art}
          {label}
        </button>
      </div>
    );
  }
);
