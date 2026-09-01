/** @jest-environment jsdom */
import { act, fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import {
  AuctionCardV4,
  AUCTION_CARD_V4_STYLE_ID,
  formatRemainingV4,
  spokenRemainingV4,
} from './AuctionCardV4';

const NOW = 1_700_000_000_000;
const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;

function card(ui: ReactElement): HTMLElement {
  const { container } = render(ui);
  return container.querySelector('[data-xen-v4-auction-card]') as HTMLElement;
}

function sheet(): string {
  return document.getElementById(AUCTION_CARD_V4_STYLE_ID)?.textContent ?? '';
}

const countdownOf = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-xen-v4-auction-countdown]') as HTMLElement;
const announceOf = (root: HTMLElement): HTMLElement =>
  root.querySelector('[data-xen-v4-auction-announce]') as HTMLElement;

describe('AuctionCardV4 (web)', () => {
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

  // ── §4.2 + the digits do not animate ───────────────────────────────

  it('paints `card` and pins the countdown to `transition: none`', () => {
    const el = card(<AuctionCardV4 title="Lot 12" currentBidCents={4500} endsAtMs={NOW + HOUR} nowMs={NOW} />);
    expect(el.hasAttribute('data-xen-v4-card')).toBe(true);
    const css = sheet();
    expect(css).toContain('background-color: var(--xen-card)');
    expect(css).toContain('[data-xen-v4-auction-countdown]');
    expect(css).toContain('transition: none');
    expect(css).toContain('animation: none');
  });

  // ── rule 3: no status colour on time ───────────────────────────────

  it('never paints the timer `warn` or `danger`, live or ended (rule 3)', () => {
    const live = countdownOf(
      card(<AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 2 * DAY} nowMs={NOW} />)
    );
    const ended = countdownOf(
      card(<AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW - 1} nowMs={NOW} />)
    );
    for (const el of [live, ended]) {
      expect(el.className).not.toMatch(/warn/);
      expect(el.className).not.toMatch(/danger/);
    }
    expect(live.getAttribute('data-xen-v4-auction-countdown')).toBe('live');
    expect(ended.getAttribute('data-xen-v4-auction-countdown')).toBe('ended');
  });

  it('urgency is weight and the brand, not a status hue', () => {
    const urgent = countdownOf(
      card(<AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 5 * MINUTE} nowMs={NOW} />)
    );
    expect(urgent.getAttribute('data-xen-v4-auction-countdown')).toBe('urgent');
    expect(urgent.getAttribute('data-xen-v4-badge')).toBe('solid');
    expect(urgent.className).toMatch(/primary/);
    expect(urgent.className).not.toMatch(/warn|danger/);
  });

  it('`urgentBeforeMs={0}` never emphasises', () => {
    const el = countdownOf(
      card(
        <AuctionCardV4
          title="L"
          currentBidCents={1}
          endsAtMs={NOW + 1000}
          nowMs={NOW}
          urgentBeforeMs={0}
        />
      )
    );
    expect(el.getAttribute('data-xen-v4-auction-countdown')).toBe('live');
  });

  // ── the ended auction ──────────────────────────────────────────────

  it('an ended auction reads "Ended", disables bidding, and says so in the button', () => {
    const onPlaceBid = jest.fn();
    const { getByRole, container } = render(
      <AuctionCardV4
        title="Lot 12"
        currentBidCents={4500}
        endsAtMs={NOW - 1}
        nowMs={NOW}
        onPlaceBid={onPlaceBid}
      />
    );
    expect(countdownOf(container.firstChild as HTMLElement).textContent).toBe('Ended');
    const button = getByRole('button', { name: 'Auction ended' }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(onPlaceBid).not.toHaveBeenCalled();
    expect(announceOf(container.firstChild as HTMLElement).textContent).toBe('Auction ended');
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

    it('starts empty, then carries ONE sentence — a live region filled on render is not announced', () => {
      const { container } = render(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 2 * DAY + 4 * HOUR} />
      );
      const root = container.firstChild as HTMLElement;
      const region = announceOf(root);
      expect(region.getAttribute('aria-live')).toBe('polite');
      expect(region.textContent).toBe('2 days 4 hours left');
    });

    it('does NOT re-announce on every tick — the whole point of the component', () => {
      const { container } = render(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 30_000} />
      );
      const root = container.firstChild as HTMLElement;
      const said = announceOf(root).textContent;
      expect(said).toBe('30 seconds left');
      const first = countdownOf(root).textContent;

      advance(5000);

      // The visible digits moved…
      expect(countdownOf(root).textContent).not.toBe(first);
      expect(countdownOf(root).textContent).toContain('25s');
      // …and the screen reader was told nothing new. Five ticks, zero words.
      expect(announceOf(root).textContent).toBe(said);
    });

    it('the visible countdown is hidden from the tree; only the sentence is exposed', () => {
      const { container } = render(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + HOUR} />
      );
      const root = container.firstChild as HTMLElement;
      expect(countdownOf(root).getAttribute('aria-hidden')).toBe('true');
      expect(announceOf(root).className).toContain('sr-only');
    });

    it('replaces the sentence exactly once more, when the auction closes', () => {
      const onEnd = jest.fn();
      const { container } = render(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 3000} onEnd={onEnd} />
      );
      const root = container.firstChild as HTMLElement;
      expect(announceOf(root).textContent).toBe('3 seconds left');

      advance(4000);

      expect(countdownOf(root).textContent).toBe('Ended');
      expect(announceOf(root).textContent).toBe('Auction ended');
      expect(onEnd).toHaveBeenCalledTimes(1);

      // Still once, however long we wait: the timer stops at the close.
      advance(60_000);
      expect(onEnd).toHaveBeenCalledTimes(1);
    });

    it('`onEnd` does not fire for an auction that was already closed on mount', () => {
      const onEnd = jest.fn();
      render(<AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW - DAY} onEnd={onEnd} />);
      advance(10_000);
      expect(onEnd).not.toHaveBeenCalled();
    });

    it('a controlled `nowMs` starts no timer at all — the base’s determinism, kept', () => {
      const { container } = render(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 30_000} nowMs={NOW} />
      );
      const root = container.firstChild as HTMLElement;
      const before = countdownOf(root).textContent;
      advance(10_000);
      expect(countdownOf(root).textContent).toBe(before);
      expect(jest.getTimerCount()).toBe(0);
    });

    it('ticks once a minute above an hour, and once a second below it', () => {
      const { container, unmount } = render(
        <AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + 5 * HOUR} />
      );
      const root = container.firstChild as HTMLElement;
      expect(countdownOf(root).textContent).toContain('5h 0m');
      act(() => {
        jest.advanceTimersByTime(59_000);
      });
      // A minute has not passed, so nothing repainted.
      expect(countdownOf(root).textContent).toContain('5h 0m');
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(countdownOf(root).textContent).toContain('4h 59m');
      unmount();
    });
  });

  // ── the money and the bid count ────────────────────────────────────

  it('draws the bid through `PriceTagV4` — nothing here formats a number (rule 7)', () => {
    const { container } = render(
      <AuctionCardV4 title="L" currentBidCents={450050} endsAtMs={NOW + HOUR} nowMs={NOW} />
    );
    const tag = container.querySelector('[data-xen-price-tag]') as HTMLElement;
    expect(tag).not.toBeNull();
    expect(tag.textContent).toContain('$4,500.50');
  });

  it('`formatMoney` overrides the locale, per rule 1', () => {
    const { container } = render(
      <AuctionCardV4
        title="L"
        currentBidCents={4500}
        endsAtMs={NOW + HOUR}
        nowMs={NOW}
        formatMoney={(c) => `${c}c`}
      />
    );
    expect((container.querySelector('[data-xen-price-tag]') as HTMLElement).textContent).toBe('4500c');
  });

  it('no bids reads "No bids yet", and one bid is singular', () => {
    expect(
      card(<AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + HOUR} nowMs={NOW} />).textContent
    ).toContain('No bids yet');
    expect(
      card(
        <AuctionCardV4 title="L" currentBidCents={1} bidCount={1} endsAtMs={NOW + HOUR} nowMs={NOW} />
      ).textContent
    ).toContain('1 bid');
    expect(
      card(
        <AuctionCardV4
          title="L"
          currentBidCents={1}
          bidCount={1204}
          endsAtMs={NOW + HOUR}
          nowMs={NOW}
        />
      ).textContent
    ).toContain('1,204 bids');
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('renders nothing without a title (§4.5)', () => {
    const { container } = render(
      <AuctionCardV4 title="" currentBidCents={1} endsAtMs={NOW + HOUR} nowMs={NOW} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('with no photo it draws the shared generated plate; `compact` draws no media at all', () => {
    const withoutPhoto = card(
      <AuctionCardV4 title="Lot 12" currentBidCents={1} endsAtMs={NOW + HOUR} nowMs={NOW} />
    );
    expect(withoutPhoto.querySelector('[data-xen-v4-cover]')).not.toBeNull();
    expect(
      (withoutPhoto.querySelector('[data-xen-v4-auction-media]') as HTMLElement).className
    ).toContain('bg-muted');
    const compact = card(
      <AuctionCardV4
        title="L"
        currentBidCents={1}
        endsAtMs={NOW + HOUR}
        nowMs={NOW}
        variant="compact"
      />
    );
    expect(compact.querySelector('[data-xen-v4-auction-media]')).toBeNull();
    // …and the countdown is still there, in the header.
    expect(countdownOf(compact)).not.toBeNull();
  });

  it('omits the bid button when there is no handler', () => {
    const el = card(<AuctionCardV4 title="L" currentBidCents={1} endsAtMs={NOW + HOUR} nowMs={NOW} />);
    expect(el.querySelector('button')).toBeNull();
  });

  it('fires onPlaceBid while the auction is live', () => {
    const onPlaceBid = jest.fn();
    const { getByText } = render(
      <AuctionCardV4
        title="L"
        currentBidCents={1}
        endsAtMs={NOW + HOUR}
        nowMs={NOW}
        onPlaceBid={onPlaceBid}
      />
    );
    fireEvent.click(getByText('Place bid'));
    expect(onPlaceBid).toHaveBeenCalledTimes(1);
  });
});
