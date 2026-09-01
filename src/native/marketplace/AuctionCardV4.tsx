import * as React from 'react';
import { Image, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { BadgeV4 } from '../primitives/BadgeV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { PriceTagV4 } from '../commerce/PriceTagV4';
import { GenerativeCoverV4 } from '../commerce/GenerativeCoverV4';
import type { MoneyFormatter } from '../commerce/money';
import type { AuctionCardProps, AuctionCardVariant } from './AuctionCard';

export type { AuctionCardVariant };

const SECOND_MS = 1_000;
const MINUTE_MS = 60_000;
const HOUR_MS = 3_600_000;
const DAY_MS = 86_400_000;

export interface AuctionCardV4Props extends AuctionCardProps {
  /**
   * How long before the close the card starts leaning on the countdown.
   * Default one hour. Pass `0` to never emphasise it.
   *
   * **The emphasis is weight, not colour.** Rule 3 names "an ending auction"
   * explicitly as *not* status — so the chip goes from `soft` to `solid` and
   * from neutral to the brand, and never to `warn` or `danger`. The base did
   * the opposite: it painted every live auction `warn` and every closed one
   * `danger`, which taught a reader that amber means "an auction" and red
   * means "an auction that finished normally".
   */
  urgentBeforeMs?: number;
  /**
   * Fires once, when the auction crosses its close while the card is mounted.
   *
   * Not fired for a card that was already closed when it mounted — that is not
   * an event, it is a fact — and not fired again on re-render. Use it to
   * refetch the final price.
   */
  onEnd?: () => void;
  /**
   * Carry `elevation.card`. Default `true` — §4.6 gives a shadow to "a card
   * sitting on the page". Pass `false` inside another card.
   */
  raised?: boolean;
  /** Locale override for the bid, handed straight to `PriceTagV4`. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * The visible countdown — **at most two units**, and only as precise as the
 * reader asked for.
 *
 * `precise` is off under Reduce Motion, which drops the seconds unit
 * altogether. That is the honest reduction for this component: a digit
 * repainting once a second *is* motion, it is motion nobody can pause, and it
 * is the kind that pulls the eye off the rest of the screen. What is left —
 * `3h 12m`, `14m`, `Under a minute` — is still true, still current, and
 * changes at most once a minute. See {@link useCountdownV4} for the matching
 * change to how often it is recomputed.
 */
export function formatRemainingV4(ms: number, precise: boolean): string {
  if (ms <= 0) return 'Ended';
  const totalSec = Math.floor(ms / SECOND_MS);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  if (!precise) return m > 0 ? `${m}m` : 'Under a minute';
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

const plural = (n: number, unit: string): string => `${n} ${unit}${n === 1 ? '' : 's'}`;

/**
 * The **spoken** countdown, which is a different string from the visible one
 * and has to be.
 *
 * `2d 4h` is a set of abbreviations a screen reader pronounces as "two dee
 * four aitch". This is the same fact in words, and it is said **once** — see
 * the component note on why a countdown must never live in a live region that
 * updates.
 */
export function spokenRemainingV4(ms: number): string {
  if (ms <= 0) return 'Auction ended';
  const totalSec = Math.floor(ms / SECOND_MS);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const parts: string[] = [];
  if (d > 0) {
    parts.push(plural(d, 'day'));
    if (h > 0) parts.push(plural(h, 'hour'));
  } else if (h > 0) {
    parts.push(plural(h, 'hour'));
    if (m > 0) parts.push(plural(m, 'minute'));
  } else if (m > 0) {
    parts.push(plural(m, 'minute'));
    if (s > 0) parts.push(plural(s, 'second'));
  } else {
    parts.push(plural(s, 'second'));
  }
  return `${parts.join(' ')} left`;
}

/**
 * The clock, and the only place in either module that owns one.
 *
 * ## Controlled vs. self-ticking
 *
 * Passing `nowMs` keeps the base's contract exactly: the card is a pure
 * function of its props, no timer is started, and a test can render any moment
 * it likes. Omitting it makes the card live — which is what the brief asks
 * for, and what every real auction screen needs, since the base's "no internal
 * timer" meant the countdown was frozen at whatever `Date.now()` returned
 * during the render that happened to mount it.
 *
 * ## Why a self-scheduling timeout and not `setInterval(…, 1000)`
 *
 * Three things fall out of it, and none of them can be had from a fixed
 * interval:
 *
 * - **The period follows the smallest unit on screen.** While the readout says
 *   `2d 4h`, ticking every second repaints an identical string 3,599 times an
 *   hour — and on a phone that is a wake-up per second per visible lot.
 * - **Reduce Motion floors the period at a minute** and
 *   {@link formatRemainingV4} drops the seconds unit to match, so the two
 *   agree: nothing on screen changes more than once a minute, and nothing on
 *   screen is stale.
 * - **The last wait lands exactly on the close.** `Math.min(period,
 *   remaining)` means "Ended" appears at `endsAtMs`, not up to a minute after
 *   it — which matters, because the moment the button must stop accepting bids
 *   is that instant and not the next tick.
 *
 * The timer stops dead once the auction is over. A closed auction has nothing
 * left to count, and a list of fifty closed lots should not be running fifty
 * timers.
 */
export function useCountdownV4(
  endsAtMs: number,
  nowMs: number | undefined,
  reduced: boolean
): { now: number; remaining: number; ended: boolean } {
  const [tick, setTick] = React.useState(() => Date.now());
  const now = nowMs ?? tick;
  const remaining = endsAtMs - now;

  React.useEffect(() => {
    if (nowMs !== undefined) return undefined;
    const left = endsAtMs - tick;
    if (left <= 0) return undefined;
    const period = reduced || left > HOUR_MS ? MINUTE_MS : SECOND_MS;
    const id = setTimeout(() => setTick(Date.now()), Math.min(period, left));
    return () => clearTimeout(id);
  }, [endsAtMs, nowMs, reduced, tick]);

  return { now, remaining, ended: remaining <= 0 };
}

/**
 * **V4 auction card** — the one genuinely time-driven component in either
 * module, and the only one that owns a clock.
 *
 * Brief §3 Group C, in one sentence: "derive from `endsAtMs`/`nowMs`, tick no
 * faster than the second, do not animate the digits, and announce the
 * remaining time once rather than on every tick." Each clause is a decision:
 *
 * 1. **Derive, and tick.** {@link useCountdownV4}. `nowMs` still freezes the
 *    card for a test; omitting it now makes it live, which the base could not
 *    do at all.
 * 2. **No faster than the second, and usually far slower.** The period follows
 *    the smallest unit actually on screen, and Reduce Motion floors it at a
 *    minute while the readout drops its seconds unit to match.
 * 3. **The digits do not animate.** No `AnimatedCounterV4` here, and no
 *    `Animated` value anywhere near the readout. A number *arriving* at a
 *    value is an arrival, which is what the counter's easing is for; a number
 *    *counting down* is a clock, and an eased clock is unreadable in its final
 *    seconds.
 * 4. **It is announced once.** This is the accessibility decision the whole
 *    component turns on. The naive fix — a live region around the countdown —
 *    is *worse than silence*: a screen reader would read a number every
 *    second, forever, and the auction screen would be unusable. So the chip's
 *    own descendants are hidden from the accessibility tree (their value is
 *    wrong a moment later) and the slot around them is one polite live element
 *    whose label is a **sentence in words**, set on mount and replaced exactly
 *    once more when the auction closes.
 *
 *    Putting the label on the slot rather than on a hidden node elsewhere is
 *    deliberate: a reader exploring by touch finds the countdown where the
 *    countdown is drawn, and hears "2 days 4 hours left" instead of "two dee
 *    four aitch".
 *
 * ## What else changed
 *
 * - **The status colours are gone** (rule 3). See
 *   {@link AuctionCardV4Props.urgentBeforeMs} — the base painted a live
 *   auction `warn` and a finished one `danger`.
 * - **The bid is `PriceTagV4`** (rule 7). The base drew the most important
 *   figure on the card with a hand-written `formatMoney` call and a font size,
 *   which is the defect §2 names first.
 * - **The ground is `card`** (§4.2), the media is edge-to-edge at a fixed
 *   ratio rather than a hard-coded 180 tall, and the body carries the inset —
 *   the anatomy `ProductCardV4` and `ListingCardV4` share.
 * - **No bids reads "No bids yet"**, not "0 bids". A zero is a measurement; an
 *   auction nobody has bid on has not been measured.
 *
 * Composes `CardV4`, `PriceTagV4`, `BadgeV4`, `ButtonV4` and `TextV4`
 * (rule 7). Renders **nothing** without a title (§4.5).
 */
export function AuctionCardV4({
  title,
  currentBidCents,
  currency = 'USD',
  bidCount = 0,
  endsAtMs,
  nowMs,
  imageUrl,
  actionLabel = 'Place bid',
  onPlaceBid,
  variant = 'card',
  urgentBeforeMs = HOUR_MS,
  onEnd,
  raised = true,
  formatMoney,
  style,
}: AuctionCardV4Props): React.ReactElement | null {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();
  const { remaining, ended } = useCountdownV4(endsAtMs, nowMs, reduced);
  const compact = variant === 'compact';

  /*
    One sentence, said at most twice in the card's life: once when it mounts
    (or when `endsAtMs` moves, which is a real event — a sniping extension),
    and once when the auction closes. Never on a tick.
  */
  const [announcement, setAnnouncement] = React.useState('');
  React.useEffect(() => {
    setAnnouncement(spokenRemainingV4(endsAtMs - (nowMs ?? Date.now())));
    // Deliberately NOT keyed on the tick: that is the whole point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAtMs]);
  React.useEffect(() => {
    if (ended) setAnnouncement('Auction ended');
  }, [ended]);

  /*
    `onEnd` fires on the *crossing*, never on mount. A card that was already
    closed when it rendered has not just ended; it ended before anyone looked
    at it, and calling back would refetch a price that never changed.
  */
  const wasEnded = React.useRef(ended);
  React.useEffect(() => {
    if (ended && !wasEnded.current) onEnd?.();
    wasEnded.current = ended;
  }, [ended, onEnd]);

  // A lot with no title is the blank bordered box §4.5 rules out.
  if (title === undefined || title === null || title === '') return null;

  const urgent = !ended && urgentBeforeMs > 0 && remaining <= urgentBeforeMs;
  const countdown = formatRemainingV4(remaining, !reduced);

  /*
    The chip and its one accessible carrier, together, so the sentence a screen
    reader reaches sits exactly where the countdown is drawn. The visible
    string is hidden from the tree — it is decoration whose value is wrong a
    moment later — and the slot speaks in words.
  */
  const timerSlot = (
    <View
      accessible
      accessibilityLiveRegion="polite"
      accessibilityLabel={announcement}
      testID={`xen-v4-auction-countdown-${ended ? 'ended' : urgent ? 'urgent' : 'live'}`}
    >
      <View importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        <BadgeV4
          // Rule 3: emphasis is weight and the brand, never `warn` / `danger`.
          tone={urgent ? 'primary' : 'neutral'}
          variant={ended ? 'outline' : urgent ? 'solid' : 'soft'}
          size="sm"
        >
          {ended ? 'Ended' : `${resolveIconGlyph('clock')} ${countdown}`}
        </BadgeV4>
      </View>
    </View>
  );

  const media = compact ? null : (
    <View
      testID="xen-v4-auction-media"
      style={{
        aspectRatio: 16 / 9,
        width: '100%',
        /*
          `muted`, not a neutral ramp step. The ramps carry the LIGHT
          orientation in both schemes, so a ramp well is a pale rectangle
          punched into a dark page — the same slot `ProductCardV4` and
          `ListingCardV4` reach for instead.
        */
        backgroundColor: colors.muted,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {imageUrl !== undefined && imageUrl !== '' ? (
        <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
      ) : (
        // The same plate the other two cards fall back to, from the same seed.
        // Deliberately unlabelled: the title is printed beneath it.
        <GenerativeCoverV4 seed={title} style={{ width: '100%', height: '100%' }} />
      )}
      <View style={{ position: 'absolute', top: tokens.spacing.sm, right: tokens.spacing.sm }}>
        {timerSlot}
      </View>
    </View>
  );

  return (
    <CardV4
      testID="xen-v4-auction-card"
      variant={raised ? 'elevated' : 'outlined'}
      radius="lg"
      padding="none"
      // `style` is the last entry in `CardV4`'s own array, so this is how a
      // composite overrides the `surface` fill the primitive hard-codes.
      style={[{ backgroundColor: colors.card, overflow: 'hidden' }, style]}
    >
      {media}
      <View style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <TextV4 size="base" weight="bold" tone="onCard" numberOfLines={1} style={{ flex: 1 }}>
            {title}
          </TextV4>
          {compact ? timerSlot : null}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
          }}
        >
          <View style={{ gap: tokens.spacing.xs }}>
            <TextV4 size="xs" tone="mutedText">
              Current bid
            </TextV4>
            <PriceTagV4
              cents={currentBidCents}
              currency={currency}
              formatMoney={formatMoney}
              size="lg"
            />
          </View>
          <TextV4 size="sm" tone="mutedText" numeric="tabular">
            {bidCount === 0
              ? 'No bids yet'
              : `${bidCount.toLocaleString()} ${bidCount === 1 ? 'bid' : 'bids'}`}
          </TextV4>
        </View>
        {onPlaceBid != null ? (
          <ButtonV4 variant="primary" onPress={onPlaceBid} disabled={ended}>
            {ended ? 'Auction ended' : actionLabel}
          </ButtonV4>
        ) : null}
      </View>
    </CardV4>
  );
}

/** Exported for the twin's parity check and for tests that assert the scale. */
export const AUCTION_V4_TIMING = { SECOND_MS, MINUTE_MS, HOUR_MS, DAY_MS };
