import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { canRewind, deckPosition } from './deck-v4';
import { PLACEHOLDER_CLASS } from './internal/profile-v4';
import { LikePassButtonsV4, type LikePassAction } from './LikePassButtonsV4';
import { SwipeCardV4, SwipeStampV4 } from './SwipeCardV4';
import type { SwipeCardProfile, SwipeOverlay } from './SwipeCard';
import type { SwipeDeckProps, SwipeDecision } from './SwipeDeck';

export interface SwipeDeckV4Props extends SwipeDeckProps {
  /**
   * Fires when the undo action is used. The deck steps its own index back
   * first, so a caller that only wants the card returned can leave this unset.
   */
  onRewind?: () => void;
  /** Name for the undo control. Default `'Undo'`. */
  rewindLabel?: string;
  /**
   * Which controls the built-in row shows, left→right. Defaults to today's
   * `pass · superlike · like`; add `'rewind'` to make a pass recoverable.
   */
  actions?: LikePassAction[];
  /** An action slot on the empty state — "widen your filters", "get Boost". */
  emptyAction?: React.ReactNode;
  /** Build the spoken position. Default `'Profile 3 of 12'`. */
  formatPosition?: (index: number, total: number) => string;
}

interface Offset {
  x: number;
  y: number;
}

const DEFAULT_ACTIONS: LikePassAction[] = ['pass', 'superlike', 'like'];

/**
 * **V4 swipe deck** — the web twin of the native `SwipeDeckV4`, same props as
 * {@link SwipeDeck} plus `onRewind`, `rewindLabel`, `actions`, `emptyAction`
 * and `formatPosition`.
 *
 * ## Seven changes
 *
 * 1. **Every like and pass was emitted twice.** `onSwipe`, `onSwipeRight`,
 *    `onSwipeLeft` and `onEmpty` were called from **inside a `setIndex`
 *    updater**. An updater must be pure, and React deliberately invokes it
 *    twice in StrictMode to catch exactly this — so in development every swipe
 *    fired the caller's handler twice, and a deck wired to an API sent two
 *    likes for one card. They now fire after the state is set, which is what
 *    the native twin already did.
 * 2. **A pass is recoverable.** The deck hard-coded
 *    `actions={['pass','superlike','like']}` and `onButton` tested exactly
 *    three strings, letting `'rewind'` fall through to nothing — so the undo
 *    control `LikePassButtons` has always shipped could not be reached from
 *    the one component that needs it. `actions` opens the row, `'rewind'`
 *    routes to `onRewind` **and steps the index back**, and it is disabled
 *    rather than dead when there is nothing to undo.
 * 3. **A custom card keeps its decision stamps.** `renderCard` computed
 *    `activeOverlay` and `overlayProgress` and then discarded both in that
 *    branch, so a caller who supplied their own card got no LIKE/NOPE feedback
 *    and no way to add it. The stamp is a sibling of the card now — native's
 *    arrangement — so it survives whichever card is rendered.
 * 4. **A lost pointer capture no longer freezes the card.** Scroll the page
 *    mid-drag, drag out of the window, take a phone call: the browser fires
 *    `pointercancel` or `lostpointercapture` and never `pointerup`, so the
 *    card stayed translated and rotated under a drag that had ended, with the
 *    stamp still up. Both events settle it.
 * 5. **The position is announced.** `Profile 3 of 12` was built and hung on a
 *    role-less `<div>`, where a reader ignored it, and it was never
 *    re-announced when the deck moved. It is a live region.
 * 6. **The empty state has somewhere to go.** It was a headline and a sentence
 *    and no next step — see `emptyAction`.
 * 7. **Loading is the shape it is about to be**, announced, and the peek card
 *    behind the top one is set back rather than faded: `opacity: 0.7` is not
 *    depth, and 0.38 of it is M3's *disabled* band, so a stack drawn in
 *    opacity reads as a stack of unavailable cards.
 */
export const SwipeDeckV4 = React.forwardRef<HTMLDivElement, SwipeDeckV4Props>(function SwipeDeckV4(
  {
    profiles,
    renderCard,
    onSwipe,
    onSwipeRight,
    onSwipeLeft,
    onSwipeUp,
    onEmpty,
    onRewind,
    rewindLabel = 'Undo',
    actions = DEFAULT_ACTIONS,
    emptyAction,
    formatPosition,
    showButtons = true,
    threshold = 120,
    loading = false,
    emptyTitle = "You're all caught up",
    emptySubtitle = 'Check back later for new people nearby.',
    className,
    ...rest
  },
  ref
) {
  const list = profiles ?? [];
  const [index, setIndex] = React.useState(0);
  const [offset, setOffset] = React.useState<Offset>({ x: 0, y: 0 });
  const dragStart = React.useRef<Offset | null>(null);

  const commit = (decision: SwipeDecision): void => {
    const profile = list[index];
    if (!profile) return;
    const next = index + 1;
    setIndex(next);
    setOffset({ x: 0, y: 0 });
    // Outside the updater, deliberately. See change 1.
    onSwipe?.(decision, profile);
    if (decision === 'like') onSwipeRight?.(profile);
    else if (decision === 'pass') onSwipeLeft?.(profile);
    else onSwipeUp?.(profile);
    if (next >= list.length) onEmpty?.();
  };

  const rewindable = canRewind(list.slice(0, index));

  const rewind = (): void => {
    if (!rewindable) return;
    setIndex(index - 1);
    setOffset({ x: 0, y: 0 });
    onRewind?.();
  };

  const onButton = (action: LikePassAction): void => {
    if (action === 'like' || action === 'pass' || action === 'superlike') commit(action);
    else if (action === 'rewind') rewind();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    dragStart.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!dragStart.current) return;
    setOffset({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
  };
  const onPointerUp = (): void => {
    if (!dragStart.current) return;
    dragStart.current = null;
    const { x, y } = offset;
    if (y < -threshold && Math.abs(y) > Math.abs(x)) commit('superlike');
    else if (x > threshold) commit('like');
    else if (x < -threshold) commit('pass');
    else setOffset({ x: 0, y: 0 });
  };
  /** The drag ended without a `pointerup`. Settle, do not decide. See change 4. */
  const onDragLost = (): void => {
    if (!dragStart.current) return;
    dragStart.current = null;
    setOffset({ x: 0, y: 0 });
  };

  if (loading) {
    return (
      <div
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label="Loading profiles"
        className={cn('flex flex-col gap-lg', className)}
        {...rest}
      >
        {/*
          The placeholder ground is a CHILD of each shape rather than a class on
          it: `PLACEHOLDER_CLASS` carries its own radius, and two arbitrary
          `rounded-[…]` values on one element resolve by stylesheet order, which
          nothing here controls. `overflow-hidden` on the wrapper decides it.
        */}
        <div className="aspect-[3/4] w-full overflow-hidden rounded-[var(--xen-radius-lg)]">
          <span className={cn('block h-full w-full', PLACEHOLDER_CLASS)} />
        </div>
        {showButtons ? (
          <div aria-hidden="true" className="flex items-center justify-center gap-md">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] overflow-hidden rounded-full"
              >
                <span className={cn('block h-full w-full', PLACEHOLDER_CLASS)} />
              </span>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  const current = list[index];
  const upcoming = list[index + 1];

  if (!current) {
    return (
      <div ref={ref} className={className} {...rest}>
        <EmptyStateV4
          icon={<span className="text-3xl">🌟</span>}
          title={emptyTitle}
          description={emptySubtitle}
          action={emptyAction}
        />
      </div>
    );
  }

  const renderOne = (p: SwipeCardProfile, i: number): React.ReactNode =>
    renderCard ? renderCard(p, i) : <SwipeCardV4 profile={p} />;

  const activeOverlay: SwipeOverlay | null =
    offset.y < -threshold / 2 && Math.abs(offset.y) > Math.abs(offset.x)
      ? 'superlike'
      : offset.x > threshold / 2
        ? 'like'
        : offset.x < -threshold / 2
          ? 'nope'
          : null;
  const overlayProgress = Math.min(
    1,
    Math.max(Math.abs(offset.x), Math.abs(offset.y)) / Math.max(1, threshold)
  );
  const rotate = Math.max(-12, Math.min(12, (offset.x / Math.max(1, threshold)) * 12));
  const position = deckPosition(index, list.length, formatPosition);

  const disabledActions: LikePassAction[] =
    actions.includes('rewind') && !rewindable ? ['rewind'] : [];

  return (
    <div ref={ref} className={cn('flex flex-col gap-lg', className)} {...rest}>
      <div className="relative aspect-[3/4] w-full select-none">
        {/* The next card, set BACK rather than faded — see change 7. */}
        {upcoming ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-95 translate-y-sm"
          >
            {renderOne(upcoming, index + 1)}
          </div>
        ) : null}

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onDragLost}
          onLostPointerCapture={onDragLost}
          className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg)` }}
        >
          {renderOne(current, index)}
          {/* A sibling, so it survives a caller's own `renderCard`. */}
          {activeOverlay ? (
            <SwipeStampV4 overlay={activeOverlay} opacity={overlayProgress} />
          ) : null}
        </div>
      </div>

      {showButtons ? (
        <LikePassButtonsV4
          actions={actions}
          disabledActions={disabledActions}
          actionLabels={{ rewind: rewindLabel }}
          onAction={onButton}
        />
      ) : null}

      {/* The deck's position, and the fact that it moved. */}
      <span role="status" aria-live="polite" className="sr-only">
        {position}
      </span>
    </div>
  );
});
