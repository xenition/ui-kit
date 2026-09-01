/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { RatingBreakdownV4, RATING_BREAKDOWN_V4_STYLE_ID } from './RatingBreakdownV4';

function block(ui: ReactElement): HTMLElement {
  const { container } = render(ui);
  return container.querySelector('[data-xen-v4-rating-breakdown]') as HTMLElement;
}

function sheet(): string {
  return document.getElementById(RATING_BREAKDOWN_V4_STYLE_ID)?.textContent ?? '';
}

/** 4 × 1★, 2 × 2★, 6 × 3★, 20 × 4★, 68 × 5★ = 100 ratings. */
const COUNTS = [4, 2, 6, 20, 68];

describe('RatingBreakdownV4 (web)', () => {
  // ── it composes the chart rather than drawing bars ─────────────────

  it('is a `ProgressBarsV4`, not five hand-rolled divs', () => {
    const { container } = render(<RatingBreakdownV4 counts={COUNTS} />);
    const list = container.querySelector('[role="list"]') as HTMLElement;
    expect(list).not.toBeNull();
    expect(container.querySelectorAll('[data-xen-v4-progress-row]')).toHaveLength(5);
    // The track and fill are the chart line's, not this file's.
    expect(container.querySelector('[data-xen-v4-progress-track]')).not.toBeNull();
  });

  it('reads 5★ first and names each row in words a screen reader can use', () => {
    const { container } = render(<RatingBreakdownV4 counts={COUNTS} />);
    const list = container.querySelector('[role="list"]') as HTMLElement;
    const label = list.getAttribute('aria-label') ?? '';
    expect(label).toContain('5 stars 68');
    expect(label).toContain('1 star 4');
    expect(label.indexOf('5 stars')).toBeLessThan(label.indexOf('1 star'));
  });

  it('measures each bar against the TOTAL, not against the tallest bar', () => {
    const { container } = render(<RatingBreakdownV4 counts={COUNTS} />);
    const fills = Array.from(
      container.querySelectorAll<HTMLElement>('[data-xen-v4-progress-fill]')
    ).map((el) => el.style.width);
    // 68 of 100, not 68 of 68 — a distribution must not look unanimous at its
    // own mode.
    expect(fills[0]).toBe('68%');
    expect(fills[4]).toBe('4%');
  });

  // ── rule 6: a number AND stars AND a count ─────────────────────────

  it('summarises as a number, as stars, and as a count', () => {
    const { container, getByText } = render(<RatingBreakdownV4 counts={COUNTS} />);
    // 4*1 + 2*2 + 6*3 + 20*4 + 68*5 = 446 / 100 = 4.46 → "4.5"
    expect(getByText('4.5')).toBeTruthy();
    const stars = container.querySelector('[data-xen-v4-rating]') as HTMLElement;
    expect(stars.getAttribute('aria-label')).toBe('4.46 out of 5 stars');
    expect(getByText('100 ratings')).toBeTruthy();
  });

  it('accepts the `{1..5}` map shape as well as the array', () => {
    const { getByText } = render(<RatingBreakdownV4 counts={{ 5: 3, 4: 1 }} />);
    expect(getByText('4 ratings')).toBeTruthy();
  });

  it('a supplied `average` wins over the derived one', () => {
    const { getByText } = render(<RatingBreakdownV4 counts={COUNTS} average={3.2} />);
    expect(getByText('3.2')).toBeTruthy();
  });

  it('`hideSummary` drops the header and keeps the bars', () => {
    const { container, queryByText } = render(<RatingBreakdownV4 counts={COUNTS} hideSummary />);
    expect(queryByText('100 ratings')).toBeNull();
    expect(container.querySelectorAll('[data-xen-v4-progress-row]')).toHaveLength(5);
  });

  // ── the new props ──────────────────────────────────────────────────

  it('`framed` (default) is a `card`-ground CardV4; `framed={false}` is bare', () => {
    const framed = block(<RatingBreakdownV4 counts={COUNTS} />);
    expect(framed.hasAttribute('data-xen-v4-card')).toBe(true);
    expect(sheet()).toContain('background-color: var(--xen-card)');

    const bare = block(<RatingBreakdownV4 counts={COUNTS} framed={false} />);
    expect(bare.hasAttribute('data-xen-v4-card')).toBe(false);
  });

  it('`raised` is off by default — this block is almost never the on-page card (§4.6)', () => {
    expect(block(<RatingBreakdownV4 counts={COUNTS} />).getAttribute('data-raised')).toBe('false');
    expect(block(<RatingBreakdownV4 counts={COUNTS} raised />).getAttribute('data-raised')).toBe(
      'true'
    );
  });

  it('`loading` shows the chart’s placeholder instead of the bars', () => {
    const { container } = render(<RatingBreakdownV4 counts={COUNTS} loading />);
    expect(container.querySelectorAll('[data-xen-v4-progress-row]')).toHaveLength(0);
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('with no ratings it says so instead of claiming a 0.0 average', () => {
    const { container, getByText, queryByText } = render(<RatingBreakdownV4 counts={[]} />);
    expect(getByText('No ratings yet')).toBeTruthy();
    expect(queryByText('0.0')).toBeNull();
    expect(container.querySelectorAll('[data-xen-v4-progress-row]')).toHaveLength(0);
  });

  it('`emptyLabel` is the caller’s words', () => {
    const { getByText } = render(
      <RatingBreakdownV4 counts={{}} emptyLabel="Nobody has reviewed this seller" />
    );
    expect(getByText('Nobody has reviewed this seller')).toBeTruthy();
  });

  it('an average with no histogram behind it is still printed', () => {
    const { getByText, getAllByText } = render(<RatingBreakdownV4 counts={[]} average={4.9} />);
    expect(getByText('4.9')).toBeTruthy();
    // Twice: once as the summary's count line, once as the chart's empty
    // state. Both are true, and neither invents a histogram.
    expect(getAllByText('No ratings yet')).toHaveLength(2);
  });

  it('never divides by zero', () => {
    expect(() => render(<RatingBreakdownV4 counts={[0, 0, 0, 0, 0]} />)).not.toThrow();
  });
});
