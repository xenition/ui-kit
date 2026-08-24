import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { Icon } from '../primitives/Icon';
import {
  rarityColorKey,
  RARITY_TEXT_CLASS,
  RARITY_BORDER_CLASS,
  type GameItem,
} from './types';

export type InventoryItemVariant = 'tile' | 'row';

const RARITY_LABEL: Record<NonNullable<GameItem['rarity']>, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

export interface InventoryItemProps {
  /** The item to render. */
  item: GameItem;
  /**
   * - `tile` — square art slot with a rarity ring (default, for a grid).
   * - `row`  — art left, name + rarity right (for a list).
   */
  variant?: InventoryItemVariant;
  /** Called when the item is clicked — inspect / open. */
  onClick?: (item: GameItem) => void;
  /** Extra classes on the root. */
  className?: string;
}

/**
 * An inventory / loadout item — art (or a glyph), a rarity-tinted frame + label
 * (rarity is shown as text, not color alone), an equipped marker, and a stack
 * `×N` quantity badge. The rarity accent resolves to a semantic token via
 * {@link rarityColorKey}. `onClick(item)` inspects it (a real `<button>`).
 * Composes `Badge`, `Icon`. Token-only.
 */
export function InventoryItem({
  item,
  variant = 'tile',
  onClick,
  className,
}: InventoryItemProps): React.ReactElement {
  const row = variant === 'row';
  const slot = rarityColorKey(item.rarity);
  // `Icon` has no `accent` color slot (unlike the text/border tokens); fall back
  // to `primary` for the epic glyph so the color still traces to a token.
  const iconColor = slot === 'accent' ? 'primary' : slot;
  const rarityLabel = item.rarity ? RARITY_LABEL[item.rarity] : undefined;

  const art = (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] border-2 bg-neutral-100',
        RARITY_BORDER_CLASS[slot],
        row ? 'h-12 w-12' : 'h-16 w-16'
      )}
    >
      {item.imageUrl ? (
        <img src={item.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <Icon glyph={item.glyph ?? '🎁'} size="xl" color={iconColor} />
      )}
      {item.quantity != null && item.quantity > 1 ? (
        <span className="absolute bottom-0.5 right-0.5">
          <Badge tone="neutral">{`×${item.quantity}`}</Badge>
        </span>
      ) : null}
    </div>
  );

  const label = (
    <div className={cn('flex flex-col gap-0.5', row ? 'flex-1 items-start' : 'items-center')}>
      <span className={cn('truncate text-sm font-semibold text-on-surface', row ? 'text-left' : 'text-center')}>
        {item.name}
      </span>
      <div className="flex items-center gap-[var(--xen-space-xs)]">
        {rarityLabel ? (
          <span className={cn('text-xs font-bold', RARITY_TEXT_CLASS[slot])}>{rarityLabel}</span>
        ) : null}
        {item.equipped ? <Badge tone="success">Equipped</Badge> : null}
      </div>
    </div>
  );

  const inner = row ? (
    <div className="flex items-center gap-[var(--xen-space-md)]">
      {art}
      {label}
    </div>
  ) : (
    <div className="flex flex-col items-center gap-[var(--xen-space-xs)]">
      {art}
      {label}
    </div>
  );

  const a11y = `${item.name}${rarityLabel ? `, ${rarityLabel}` : ''}${item.equipped ? ', equipped' : ''}`;

  if (!onClick) {
    return (
      <div className={className} aria-label={a11y}>
        {inner}
      </div>
    );
  }
  return (
    <button
      type="button"
      aria-label={a11y}
      aria-pressed={item.equipped || undefined}
      onClick={() => onClick(item)}
      className={cn(
        'block transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
    >
      {inner}
    </button>
  );
}
