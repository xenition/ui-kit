/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { BidRowV4 } from './BidRowV4';
import { rowHeightClass } from '../dashboard/internal/row-v4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement): ReturnType<typeof render> {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

/** The row element itself — what every metric assertion is about. */
function row(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[data-xen-bid-row]');
}

function textNodes(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-text]'));
}

describe('BidRowV4 (web) — props', () => {
  it('keeps every base prop working', () => {
    const { container, getByText } = renderThemed(
      <BidRowV4 bidder="Ada" amountCents={4500} timeLabel="1m ago" rank={1} className="custom" />
    );
    expect(getByText('Ada')).toBeTruthy();
    expect(getByText('$45.00')).toBeTruthy();
    expect(getByText('1m ago')).toBeTruthy();
    expect(getByText('1')).toBeTruthy();
    expect(row(container)?.className).toContain('custom');
  });

  it('renders "You" for the current user and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByText } = renderThemed(<BidRowV4 ref={ref} bidder="b***7" amountCents={100} isYou />);
    expect(getByText('You')).toBeTruthy();
    expect(ref.current?.getAttribute('data-xen-bid-row')).toBe('');
  });

  it('showAvatar (new) drops the avatar without losing the leading slot', () => {
    const withAvatar = renderThemed(<BidRowV4 bidder="Ada" amountCents={100} />);
    expect(withAvatar.container.querySelector('[data-xen-v4-avatar]')).toBeTruthy();

    const without = renderThemed(<BidRowV4 bidder="Ada" amountCents={100} showAvatar={false} />);
    expect(without.container.querySelector('[data-xen-v4-avatar]')).toBeNull();
    // The row itself still stands, so a list of them keeps one left edge.
    expect(row(without.container)).toBeTruthy();
  });

  it('a rank wins the leading slot over the avatar — one slot, one thing', () => {
    const { container, getByText } = renderThemed(<BidRowV4 bidder="Ada" amountCents={100} rank={3} />);
    expect(getByText('3')).toBeTruthy();
    expect(container.querySelector('[data-xen-v4-avatar]')).toBeNull();
  });
});

describe('BidRowV4 (web) — the design line', () => {
  it('sets the money in tabular figures (rule 2) through formatMoney (rule 1)', () => {
    const { getByText } = renderThemed(<BidRowV4 bidder="Ada" amountCents={120450} />);
    const amount = getByText('$1,204.50');
    expect(amount.className).toContain('[font-variant-numeric:tabular-nums]');
  });

  it('takes the row metric, not a card of its own', () => {
    const oneLine = renderThemed(<BidRowV4 bidder="Ada" amountCents={100} />);
    expect(row(oneLine.container)?.className).toContain(rowHeightClass(false));

    const twoLine = renderThemed(<BidRowV4 bidder="Ada" amountCents={100} timeLabel="1m ago" />);
    expect(row(twoLine.container)?.className).toContain(rowHeightClass(true));

    // No border, no radius, no ground of its own — the container owns the card.
    expect(row(oneLine.container)?.className).toContain('bg-transparent');
    expect(row(oneLine.container)?.className).not.toMatch(/\brounded-/);
  });

  it('marks the leading bid with emphasis, never the success tone (rule 3)', () => {
    const { container, getByText } = renderThemed(
      <BidRowV4 bidder="Ada" amountCents={4500} leading />
    );
    expect(getByText('Leading')).toBeTruthy();
    // Scoped to the row: the provider drops its whole token sheet into the
    // container, and every semantic slot's name appears in it.
    expect(row(container)?.outerHTML).not.toContain('success');
    expect(row(container)?.className).toContain('bg-selected');
    // Every run takes the ink the compiler guarantees against that ground.
    textNodes(container).forEach((node) => {
      expect(node.className).not.toContain('text-muted-text');
    });
  });

  it('paints no literal colour anywhere', () => {
    const { container } = renderThemed(<BidRowV4 bidder="Ada" amountCents={4500} leading rank={1} />);
    const inline = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
      .map((el) => el.getAttribute('style') ?? '')
      .join('\n');
    expect(inline).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});

describe('BidRowV4 (web) — the empty case and the label', () => {
  it('renders nothing when there is no one to attribute the bid to', () => {
    const { container } = renderThemed(<BidRowV4 bidder="" amountCents={4500} />);
    expect(container.querySelector('[data-xen-bid-row]')).toBeNull();
    expect(container.querySelector('[data-xen-v4-text]')).toBeNull();
  });

  it('still renders for an empty bidder when the bid is the user\'s own', () => {
    const { getByText } = renderThemed(<BidRowV4 bidder="" amountCents={4500} isYou />);
    expect(getByText('You')).toBeTruthy();
  });

  it('announces the bidder and the amount as one thing', () => {
    const plain = renderThemed(<BidRowV4 bidder="Ada" amountCents={4500} />);
    expect(row(plain.container)?.getAttribute('aria-label')).toBe('Ada, $45.00');

    const top = renderThemed(<BidRowV4 bidder="Ada" amountCents={4500} leading />);
    expect(row(top.container)?.getAttribute('aria-label')).toBe('Leading bid, Ada, $45.00');
  });
});
