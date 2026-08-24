import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';
import { SwipeCard, type SwipeCardProfile, type SwipeOverlay } from './SwipeCard';
import { LikePassButtons, type SwipeAction } from './LikePassButtons';

/** The three swipe decisions the deck emits. */
export type SwipeDecision = 'like' | 'pass' | 'superlike';

export interface SwipeDeckProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Profiles to swipe through (top of the stack = index 0). */
  profiles?: SwipeCardProfile[];
  /** Custom card renderer; defaults to {@link SwipeCard}. */
  renderCard?: (profile: SwipeCardProfile, index: number) => React.ReactNode;
  /** Fires with the decision + profile whenever a card leaves the stack. */
  onSwipe?: (decision: SwipeDecision, profile: SwipeCardProfile) => void;
  /** Convenience: right swipe. */
  onSwipeRight?: (profile: SwipeCardProfile) => void;
  /** Convenience: left swipe. */
  onSwipeLeft?: (profile: SwipeCardProfile) => void;
  /** Convenience: up swipe (super like). */
  onSwipeUp?: (profile: SwipeCardProfile) => void;
  /** Fires when the last card has been swiped away. */
  onEmpty?: () => void;
  /** Show the built-in pass/super/like button row. Defaults to true. */
  showButtons?: boolean;
  /** Horizontal drag (px) needed to commit a like/pass. Defaults to 120. */
  threshold?: number;
  /** Loading skeleton. */
  loading?: boolean;
  /** Empty-state title. */
  emptyTitle?: string;
  /** Empty-state subtitle. */
  emptySubtitle?: string;
}

interface Offset {
  x: number;
  y: number;
}

/**
 * The swipeable card stack — the web parity of the native dating deck. Unlike the
 * native pan-gesture deck, swipes here are driven by the built-in, fully
 * accessible {@link LikePassButtons} row (keyboard + screen-reader friendly) and
 * an optional pointer drag on the top card: dragging past `threshold` right = like,
 * left = pass, up = super like. Each committed swipe advances the stack and reports
 * through `onSwipe` (+ the directional convenience callbacks). LIKE / NOPE / SUPER
 * stamps fade in with drag progress. Shows an explicit {@link EmptyState} once the
 * stack is exhausted. Token classes only — no literal colors.
 */
export const SwipeDeck = React.forwardRef<HTMLDivElement, SwipeDeckProps>(function SwipeDeck(
  {
    profiles,
    renderCard,
    onSwipe,
    onSwipeRight,
    onSwipeLeft,
    onSwipeUp,
    onEmpty,
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

  const commit = React.useCallback(
    (decision: SwipeDecision): void => {
      setIndex((i) => {
        const profile = list[i];
        if (!profile) return i;
        onSwipe?.(decision, profile);
        if (decision === 'like') onSwipeRight?.(profile);
        else if (decision === 'pass') onSwipeLeft?.(profile);
        else onSwipeUp?.(profile);
        const next = i + 1;
        if (next >= list.length) onEmpty?.();
        return next;
      });
      setOffset({ x: 0, y: 0 });
    },
    [list, onSwipe, onSwipeRight, onSwipeLeft, onSwipeUp, onEmpty]
  );

  const onButton = (action: SwipeAction): void => {
    if (action === 'like') commit('like');
    else if (action === 'pass') commit('pass');
    else if (action === 'superlike') commit('superlike');
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

  if (loading) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-md', className)} {...rest}>
        <div aria-label="Loading profiles" className="aspect-[3/4] w-full rounded-[var(--xen-radius-lg)] bg-neutral-200" />
      </div>
    );
  }

  const current = list[index];
  const upcoming = list[index + 1];

  if (!current) {
    return (
      <div ref={ref} className={className} {...rest}>
        <EmptyState icon={<span className="text-3xl">🌟</span>} title={emptyTitle} description={emptySubtitle} />
      </div>
    );
  }

  const renderOne = (p: SwipeCardProfile, i: number): React.ReactNode =>
    renderCard ? renderCard(p, i) : <SwipeCard profile={p} />;

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

  return (
    <div ref={ref} className={cn('flex flex-col gap-lg', className)} {...rest}>
      <div className="relative aspect-[3/4] w-full select-none">
        {/* Peek of the next card. */}
        {upcoming ? (
          <div className="absolute inset-0 scale-95 opacity-70">{renderOne(upcoming, index + 1)}</div>
        ) : null}

        {/* Draggable top card. */}
        <div
          aria-label={`Profile ${index + 1} of ${list.length}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing"
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg)` }}
        >
          {renderCard ? (
            renderCard(current, index)
          ) : (
            <SwipeCard profile={current} overlay={activeOverlay} overlayOpacity={overlayProgress} />
          )}
        </div>
      </div>

      {showButtons ? <LikePassButtons actions={['pass', 'superlike', 'like']} onAction={onButton} /> : null}
    </div>
  );
});
