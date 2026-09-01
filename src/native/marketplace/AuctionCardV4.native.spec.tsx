import * as React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { AuctionCardV4, formatRemainingV4, spokenRemainingV4 } from './AuctionCardV4';

const NOW = 1_700_000_000_000;
const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;

const LIGHT = compileTheme(SEED_LIGHT).light;

/** Flatten a possibly-nested RN `style` into one object. */
function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

const fillsOf = (root: ReactTestInstance): unknown[] =>
  root.findAll((n) => n.props?.style !== undefined).map((n) => flat(n.props.style).backgroundColor);

describe('AuctionCardV4 (native)', () => {
  // ── the two formatters ─────────────────────────────────────────────

  it('shows at most two units, and drops the seconds unit when imprecise', () => {
    expect(formatRemainingV4(2 * DAY + 4 * HOUR, true)).toBe('2d 4h');
    expect(formatRemainingV4(3 * HOUR + 12 * MINUTE, true)).toBe('3h 12m');
    expect(formatRemainingV4(12 * MINUTE + 5000, true)).toBe('12m 5s');
    expect(formatRemainingV4(9000, true)).toBe('9s');
    expect(formatRemainingV4(0, true)).toBe('Ended');

    // Reduce Motion: no seconds anywhere.
    expect(formatRemainingV4(12 * MINUTE + 5000, false)).toBe('12m');
    expect(formatRemainingV4(9000, false)).toBe('Under a minute');
  });

  it('speaks in words, because "2d 4h" is read as "two dee four aitch"', () => {
    expect(spokenRemainingV4(2 * DAY + 4 * HOUR)).toBe('2 days 4 hours left');
    expect(spokenRemainingV4(DAY + HOUR)).toBe('1 day 1 hour left');
    expect(spokenRemainingV4(90_000)).toBe('1 minute 30 seconds left');
    expect(spokenRemainingV4(1000)).toBe('1 second left');
    expect(spokenRemainingV4(-1)).toBe('Auction ended');
  });

  // ── §4.2 ───────────────────────────────────────────────────────────

  it('paints `card`, not the page colour', () => {
    const { UNSAFE_root } = renderThemed(
      <AuctionCardV4 title="Lot 12" currentBidCents={4500} endsAtMs={NOW + HOUR} nowMs={NOW} />,
      SEED_LIGHT
    );
    expect(fillsOf(UNSAFE_root)).toContain(LIGHT.card);
  });

  // ── rule 3: no status colour on time ───────────────────────────────

  it('never paints the timer `warn` or `danger`, live or ended (rule 3)', () => {
    for (const endsAtMs of [NOW + 2 * DAY, NOW + 5 * MINUTE, NOW - 1]) {
      const { UNSAFE_root } = renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={endsAtMs} nowMs={NOW} />,
        SEED_LIGHT
      );
      const fills = fillsOf(UNSAFE_root);
      expect(fills).not.toContain(LIGHT.warn);
      expect(fills).not.toContain(LIGHT.danger);
    }
  });

  it('urgency is weight and the brand, not a status hue', () => {
    const { queryByTestId, UNSAFE_root } = renderThemed(
      <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 5 * MINUTE} nowMs={NOW} />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-v4-auction-countdown-urgent')).not.toBeNull();
    // `solid` at the urgent step: the brand's own fill, unmixed.
    expect(fillsOf(UNSAFE_root)).toContain(LIGHT.primary);
  });

  it('`urgentBeforeMs={0}` never emphasises', () => {
    const { queryByTestId } = renderThemed(
      <AuctionCardV4
        title="L"
        currentBidCents={1}
        endsAtMs={NOW + 1000}
        nowMs={NOW}
        urgentBeforeMs={0}
      />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-v4-auction-countdown-live')).not.toBeNull();
  });

  // ── the ended auction ──────────────────────────────────────────────

  it('an ended auction reads "Ended", disables bidding, and says so in the button', () => {
    const onPlaceBid = jest.fn();
    const { getByText, queryByTestId, getByLabelText } = renderThemed(
      <AuctionCardV4
        title="Lot 12"
        currentBidCents={4500}
        endsAtMs={NOW - 1}
        nowMs={NOW}
        onPlaceBid={onPlaceBid}
      />,
      SEED_LIGHT
    );
    expect(getByText('Ended', { includeHiddenElements: true })).toBeTruthy();
    expect(queryByTestId('xen-v4-auction-countdown-ended')).not.toBeNull();
    fireEvent.press(getByText('Auction ended'));
    expect(onPlaceBid).not.toHaveBeenCalled();
    expect(getByLabelText('Auction ended')).toBeTruthy();
  });

  // ── the countdown is announced ONCE ────────────────────────────────

  describe('the announcement', () => {
    beforeEach(() => {
      jest.useFakeTimers({ now: NOW });
    });
    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    /**
     * The countdown schedules **one timeout at a time** and the next one is
     * booked by the effect that runs after the re-render — so a single
     * `advanceTimersByTime(5000)` fires exactly one tick, not five. Stepping
     * inside `act` lets React flush between them, which is what a real second
     * does.
     */
    const advance = (ms: number, step = 1000): void => {
      for (let t = 0; t < ms; t += step) {
        act(() => {
          jest.advanceTimersByTime(step);
        });
      }
    };

    const spoken = (root: ReactTestInstance): unknown =>
      root
        .findAll((n) => n.props?.accessibilityLiveRegion === 'polite')[0]
        ?.props.accessibilityLabel;

    it('carries ONE sentence, in words', () => {
      const { UNSAFE_root } = renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 2 * DAY + 4 * HOUR} />,
        SEED_LIGHT
      );
      expect(spoken(UNSAFE_root)).toBe('2 days 4 hours left');
    });

    it('does NOT re-announce on every tick — the whole point of the component', () => {
      const { UNSAFE_root, queryByText } = renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 30_000} />,
        SEED_LIGHT
      );
      const said = spoken(UNSAFE_root);
      expect(said).toBe('30 seconds left');

      advance(5000);

      // The visible digits moved…
      expect(queryByText(/25s/, { includeHiddenElements: true })).not.toBeNull();
      // …and the screen reader was told nothing new. Five ticks, zero words.
      expect(spoken(UNSAFE_root)).toBe(said);
    });

    it('the visible countdown is hidden from the tree; only the sentence is exposed', () => {
      const { UNSAFE_root } = renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + HOUR} />,
        SEED_LIGHT
      );
      const hidden = UNSAFE_root.findAll(
        (n) => n.props?.importantForAccessibility === 'no-hide-descendants'
      );
      expect(hidden.length).toBeGreaterThan(0);
    });

    it('replaces the sentence exactly once more, when the auction closes', () => {
      const onEnd = jest.fn();
      const { UNSAFE_root, queryByText } = renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 3000} onEnd={onEnd} />,
        SEED_LIGHT
      );
      expect(spoken(UNSAFE_root)).toBe('3 seconds left');

      advance(4000);

      expect(queryByText('Ended', { includeHiddenElements: true })).not.toBeNull();
      expect(spoken(UNSAFE_root)).toBe('Auction ended');
      expect(onEnd).toHaveBeenCalledTimes(1);

      // Still once, however long we wait: the timer stops at the close.
      advance(60_000);
      expect(onEnd).toHaveBeenCalledTimes(1);
    });

    it('`onEnd` does not fire for an auction that was already closed on mount', () => {
      const onEnd = jest.fn();
      renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW - DAY} onEnd={onEnd} />,
        SEED_LIGHT
      );
      advance(10_000);
      expect(onEnd).not.toHaveBeenCalled();
    });

    it('a controlled `nowMs` starts no timer at all — the base’s determinism, kept', () => {
      const { queryByText } = renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 30_000} nowMs={NOW} />,
        SEED_LIGHT
      );
      expect(queryByText(/30s/, { includeHiddenElements: true })).not.toBeNull();
      advance(10_000);
      expect(queryByText(/30s/, { includeHiddenElements: true })).not.toBeNull();
      expect(jest.getTimerCount()).toBe(0);
    });

    it('ticks once a minute above an hour, and once a second below it', () => {
      const { queryByText } = renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 5 * HOUR} />,
        SEED_LIGHT
      );
      expect(queryByText(/5h 0m/, { includeHiddenElements: true })).not.toBeNull();
      advance(59_000);
      // A minute has not passed, so nothing repainted.
      expect(queryByText(/5h 0m/, { includeHiddenElements: true })).not.toBeNull();
      advance(2000);
      expect(queryByText(/4h 59m/, { includeHiddenElements: true })).not.toBeNull();
    });
  });

  // ── the money and the bid count ────────────────────────────────────

  it('draws the bid through `PriceTagV4` — nothing here formats a number (rule 7)', () => {
    const { getByText } = renderThemed(
      <AuctionCardV4 title="L" currentBidCents={450050} endsAtMs={NOW + HOUR} nowMs={NOW} />,
      SEED_LIGHT
    );
    expect(getByText('$4,500.50')).toBeTruthy();
  });

  it('`formatMoney` overrides the locale, per rule 1', () => {
    const { getByText } = renderThemed(
      <AuctionCardV4
        title="L"
        currentBidCents={4500}
        endsAtMs={NOW + HOUR}
        nowMs={NOW}
        formatMoney={(c) => `${c}c`}
      />,
      SEED_LIGHT
    );
    expect(getByText('4500c')).toBeTruthy();
  });

  it('no bids reads "No bids yet", and one bid is singular', () => {
    expect(
      renderThemed(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + HOUR} nowMs={NOW} />,
        SEED_LIGHT
      ).getByText('No bids yet')
    ).toBeTruthy();
    expect(
      renderThemed(
        <AuctionCardV4
          title="L"
          currentBidCents={1}
          bidCount={1}
          endsAtMs={NOW + HOUR}
          nowMs={NOW}
        />,
        SEED_LIGHT
      ).getByText('1 bid')
    ).toBeTruthy();
    expect(
      renderThemed(
        <AuctionCardV4
          title="L"
          currentBidCents={1}
          bidCount={1204}
          endsAtMs={NOW + HOUR}
          nowMs={NOW}
        />,
        SEED_LIGHT
      ).getByText('1,204 bids')
    ).toBeTruthy();
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('renders nothing without a title (§4.5)', () => {
    const { toJSON } = renderThemed(
      <AuctionCardV4 title="" currentBidCents={1} endsAtMs={NOW + HOUR} nowMs={NOW} />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('with no photo it draws the shared generated plate; `compact` draws no media at all', () => {
    const { getByTestId } = renderThemed(
      <AuctionCardV4 title="Lot 12" currentBidCents={1} endsAtMs={NOW + HOUR} nowMs={NOW} />,
      SEED_LIGHT
    );
    const media = getByTestId('xen-v4-auction-media');
    expect(flat(media.props.style).backgroundColor).toBe(LIGHT.muted);
    // The plate has no testID of its own; it identifies itself by being the
    // element hidden from the accessibility tree (a placeholder, not a picture
    // of the item), which is exactly the contract `ProductCardV4` relies on.
    expect(
      media.findAll((n) => n.props?.importantForAccessibility === 'no-hide-descendants').length
    ).toBeGreaterThan(0);

    const compact = renderThemed(
      <AuctionCardV4
        title="L"
        currentBidCents={1}
        endsAtMs={NOW + 2 * HOUR}
        nowMs={NOW}
        variant="compact"
      />,
      SEED_LIGHT
    );
    expect(compact.queryByTestId('xen-v4-auction-media')).toBeNull();
    // …and the countdown is still there, in the header.
    expect(compact.queryByTestId('xen-v4-auction-countdown-live')).not.toBeNull();
  });

  it('fires onPlaceBid while the auction is live', () => {
    const onPlaceBid = jest.fn();
    const { getByText } = renderThemed(
      <AuctionCardV4
        title="L"
        currentBidCents={1}
        endsAtMs={NOW + HOUR}
        nowMs={NOW}
        onPlaceBid={onPlaceBid}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Place bid'));
    expect(onPlaceBid).toHaveBeenCalledTimes(1);
  });
});
