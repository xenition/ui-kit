import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { ChildMood } from './ChildProfileCard';
import {
  FOCUS_RING_CLASS,
  GLYPH_SLOT_CLASS,
  spokenLine,
  surfaceStateVars,
} from './internal/tone-v4';

/** One child in the switcher. */
export interface ChildSwitcherItem {
  /** React key and the identity handed back to `onSelect`. */
  id: string | number;
  /** The child's name, shown under the avatar and spoken as the button's name. */
  name: string;
  /** Photo URL for the avatar; falls back to initials. */
  photoUrl?: string;
  /** Today's mood, drawn as a glyph beside the name. */
  mood?: ChildMood;
}

export interface ChildSwitcherV4Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The children to switch between. */
  items: ChildSwitcherItem[];
  /** Which one is currently being looked at. */
  selectedId?: string | number;
  /** Fires with the chosen child's `id`. */
  onSelect?: (id: string | number) => void;
  /** The strip's spoken name. Default `'Children'`. */
  label?: string;
  /** Loading placeholder state. */
  loading?: boolean;
  /** How many placeholder tiles a loading strip draws. Default 3. */
  skeletonCount?: number;
  /** The loading placeholder's spoken name. Default `'Loading children'`. */
  loadingLabel?: string;
  /** Headline when no children are set up. Default `'No children yet'`. */
  emptyLabel?: string;
  /** A sentence under the headline — an empty family needs a next step. */
  emptyDescription?: string;
  /** The "add a child" action's name. Rendered only with `onAdd`. */
  addLabel?: string;
  /** Fires when the add action is pressed. */
  onAdd?: () => void;
  /** The word appended to the selected child's spoken name. Default `'selected'`. */
  selectedLabel?: string;
}

/** The glyph each mood carries. The word lives on `ChildProfileCardV4`. */
const MOOD_GLYPH: Record<ChildMood, string> = {
  happy: '😊',
  excited: '🤩',
  calm: '😌',
  sad: '😢',
  tired: '😴',
  sick: '🤒',
};

/** How many placeholder tiles a loading strip draws. */
const SKELETON_TILES = 3;

/**
 * **V4 child switcher** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A family app can say which child it is talking about.** Every component
 *    in this module takes exactly one child, and nothing in it picks that
 *    child — so the first control on every screen in a family app was one the
 *    kit did not ship, and each app drew its own.
 * 2. **The selection is `aria-current`, not a colour.** A tint on the chosen
 *    tile is invisible to a screen reader and to a colour-blind parent; the
 *    selected tile carries the state in its name as well, through
 *    `selectedLabel`.
 * 3. **Each tile is a real, 44-clearing `<button>`** with the child's name,
 *    and press is the M3 state layer rather than an opacity — 0.38 is the band
 *    M3 spends on *disabled*, so a pressed tile would read as one that cannot
 *    be chosen.
 */
export const ChildSwitcherV4 = React.forwardRef<HTMLDivElement, ChildSwitcherV4Props>(
  function ChildSwitcherV4(
    {
      items,
      selectedId,
      onSelect,
      label = 'Children',
      loading = false,
      skeletonCount = SKELETON_TILES,
      loadingLabel = 'Loading children',
      emptyLabel = 'No children yet',
      emptyDescription,
      addLabel,
      onAdd,
      selectedLabel = 'selected',
      children,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const list = Array.isArray(items) ? items : [];

    if (loading) {
      return (
        <div
          {...rest}
          ref={ref}
          data-xen-child-switcher=""
          role="status"
          aria-live="polite"
          aria-label={loadingLabel}
          className={cn('flex gap-md overflow-x-auto', className)}
        >
          {Array.from({ length: Math.max(1, Math.floor(skeletonCount)) }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-xs">
              <SkeletonV4 className={cn(GLYPH_SLOT_CLASS, 'rounded-full')} />
              <SkeletonV4 className="h-3 w-12" />
            </div>
          ))}
        </div>
      );
    }

    if (list.length === 0 && children == null) {
      return (
        <div {...rest} ref={ref} data-xen-child-switcher="" className={className}>
          <EmptyStateV4
            icon={<span className="text-3xl">👨‍👩‍👧</span>}
            title={emptyLabel}
            description={emptyDescription}
          />
        </div>
      );
    }

    return (
      <div {...rest} ref={ref} data-xen-child-switcher="" className={className}>
        <ul aria-label={label} className="flex gap-md overflow-x-auto">
          {list.map((item) => {
            const selected = selectedId !== undefined && item.id === selectedId;
            const name = spokenLine([item.name, selected ? selectedLabel : undefined]);
            const glyph = item.mood ? MOOD_GLYPH[item.mood] : undefined;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-label={name}
                  aria-current={selected ? 'true' : undefined}
                  onClick={() => onSelect?.(item.id)}
                  data-xen-v4-state=""
                  style={surfaceStateVars()}
                  className={cn(
                    'flex flex-col items-center gap-xs rounded-[var(--xen-radius-md)]',
                    'bg-transparent px-sm py-xs',
                    MIN_TAP_CLASS,
                    FOCUS_RING_CLASS
                  )}
                >
                  <AvatarV4
                    size="lg"
                    src={item.photoUrl}
                    name={item.name}
                    alt=""
                    ring={selected}
                  />
                  <span className="flex items-center gap-xs">
                    {glyph ? (
                      <span aria-hidden="true" className="text-sm leading-none">
                        {glyph}
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        'max-w-[calc(var(--xen-space-2xl)*2)] truncate text-xs',
                        selected ? 'font-semibold text-on-surface' : 'text-muted-text'
                      )}
                    >
                      {item.name}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}

          {onAdd ? (
            <li>
              <button
                type="button"
                aria-label={addLabel ?? 'Add a child'}
                onClick={() => onAdd()}
                data-xen-v4-state=""
                style={surfaceStateVars()}
                className={cn(
                  'flex flex-col items-center gap-xs rounded-[var(--xen-radius-md)]',
                  'bg-transparent px-sm py-xs',
                  MIN_TAP_CLASS,
                  FOCUS_RING_CLASS
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(GLYPH_SLOT_CLASS, 'rounded-full border border-border text-xl')}
                >
                  +
                </span>
                {addLabel ? (
                  <span className="max-w-[calc(var(--xen-space-2xl)*2)] truncate text-xs text-muted-text">
                    {addLabel}
                  </span>
                ) : null}
              </button>
            </li>
          ) : null}
        </ul>
        {children}
      </div>
    );
  }
);
