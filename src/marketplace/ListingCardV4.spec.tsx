/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { ListingCardV4, LISTING_CARD_V4_STYLE_ID } from './ListingCardV4';
import { BadgeV4 } from '../primitives/BadgeV4';

function card(ui: ReactElement): HTMLElement {
  const { container } = render(ui);
  return container.querySelector('[data-xen-v4-listing-card]') as HTMLElement;
}

function sheet(): string {
  return document.getElementById(LISTING_CARD_V4_STYLE_ID)?.textContent ?? '';
}

describe('ListingCardV4 (web)', () => {
  // ── §4.2 + the ProductCardV4 anatomy ───────────────────────────────

  it('paints `card`, not the page colour, and composes CardV4', () => {
    const el = card(<ListingCardV4 title="Vintage film camera" priceCents={12500} />);
    expect(el.hasAttribute('data-xen-v4-card')).toBe(true);
    expect(sheet()).toContain('background-color: var(--xen-card)');
    expect(sheet()).not.toContain('var(--xen-surface)');
  });

  it('leads with the title and puts the price beneath it, as `ProductCardV4` does', () => {
    const el = card(<ListingCardV4 title="Vintage film camera" priceCents={12500} />);
    const text = el.textContent ?? '';
    expect(text.indexOf('Vintage film camera')).toBeLessThan(text.indexOf('$125.00'));
  });

  it('caps the title at two lines', () => {
    const { getByText } = render(<ListingCardV4 title="A very long listing title" priceCents={1} />);
    const title = getByText('A very long listing title');
    // jsdom's CSSOM drops the two `-webkit-` longhands, so the reachable half
    // of `TextV4`'s clamp is asserted here; `TextV4.spec` owns the clamp count.
    expect(title.getAttribute('style')).toContain('display: -webkit-box');
    expect(title.getAttribute('style')).toContain('overflow: hidden');
  });

  it('draws the price through `PriceTagV4` — nothing here formats a number', () => {
    const { container } = render(
      <ListingCardV4 title="Camera" priceCents={12500} compareAtCents={19900} />
    );
    const tag = container.querySelector('[data-xen-price-tag]') as HTMLElement;
    expect(tag).not.toBeNull();
    expect(tag.textContent).toContain('$125.00');
    // The compare-at is announced rather than only struck through.
    expect((container.querySelector('[data-xen-compare-at]') as HTMLElement).getAttribute('aria-label'))
      .toBe('Was $199.00');
  });

  // ── the new props ──────────────────────────────────────────────────

  it('`aspect` names the same four ratios `ProductCardV4` does, and defaults per variant', () => {
    const grid = card(<ListingCardV4 title="C" priceCents={1} />);
    const featured = card(<ListingCardV4 title="C" priceCents={1} variant="featured" />);
    const forced = card(<ListingCardV4 title="C" priceCents={1} aspect="1:1" />);
    const media = (el: HTMLElement): string =>
      (el.querySelector('[data-xen-v4-listing-media]') as HTMLElement).className;
    expect(media(grid)).toContain('aspect-[4/5]');
    expect(media(featured)).toContain('aspect-[16/9]');
    expect(media(forced)).toContain('aspect-square');
  });

  it('`raised` is on by default and can be turned off (§4.6)', () => {
    expect(card(<ListingCardV4 title="C" priceCents={1} />).getAttribute('data-raised')).toBe('true');
    expect(
      card(<ListingCardV4 title="C" priceCents={1} raised={false} />).getAttribute('data-raised')
    ).toBe('false');
  });

  it('`formatMoney` reaches both the tag and the accessible name', () => {
    const money = (cents: number): string => `${cents} minor units`;
    const { getByRole } = render(
      <ListingCardV4 title="Camera" priceCents={12500} formatMoney={money} onClick={() => {}} />
    );
    const el = getByRole('button');
    expect(el.textContent).toContain('12500 minor units');
    expect(el.getAttribute('aria-label')).toBe('Camera, 12500 minor units');
  });

  it('`badge` fills the one badge slot and REPLACES the condition chip', () => {
    const el = card(
      <ListingCardV4 title="C" priceCents={1} condition="used" badge={<BadgeV4>Sold</BadgeV4>} />
    );
    expect(el.textContent).toContain('Sold');
    expect(el.querySelector('[data-xen-v4-condition-badge]')).toBeNull();
  });

  it('the default badge is a `ConditionBadgeV4`, over the media', () => {
    const el = card(<ListingCardV4 title="C" priceCents={1} condition="refurb" />);
    const chip = el.querySelector('[data-xen-v4-condition-badge]') as HTMLElement;
    expect(chip.getAttribute('data-xen-v4-condition-badge')).toBe('refurb');
    expect(el.querySelector('[data-xen-v4-listing-media]')?.contains(chip)).toBe(true);
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('renders nothing without a title (§4.5)', () => {
    const { container } = render(<ListingCardV4 title="" priceCents={100} />);
    expect(container.firstChild).toBeNull();
  });

  it('with no photo it draws the same generated plate `ProductCardV4` falls back to', () => {
    const { container } = render(<ListingCardV4 title="Vintage camera" priceCents={1} />);
    const cover = container.querySelector('[data-xen-v4-cover]');
    expect(cover).not.toBeNull();
    // Unlabelled: it is a placeholder, not a picture of the item, and the
    // title is printed directly beneath it.
    expect(cover?.getAttribute('aria-hidden')).toBe('true');
  });

  it('the media well paints `muted`, not a neutral ramp step', () => {
    const el = card(<ListingCardV4 title="C" priceCents={1} />);
    const media = el.querySelector('[data-xen-v4-listing-media]') as HTMLElement;
    expect(media.className).toContain('bg-muted');
    expect(media.className).not.toContain('neutral');
  });

  it('`loading` is a skeleton at the card’s footprint, not the sentence "Loading listing…"', () => {
    const el = card(<ListingCardV4 title="C" priceCents={1} loading />);
    expect(el.textContent).not.toContain('Loading');
    expect(el.querySelector('[data-xen-price-tag]')).toBeNull();
  });

  // ── the watch chip ─────────────────────────────────────────────────

  it('the watch chip clears the 44 tap floor and never navigates', () => {
    const onClick = jest.fn();
    const onToggleWatch = jest.fn();
    const { getByLabelText } = render(
      <ListingCardV4
        title="Camera"
        priceCents={100}
        onClick={onClick}
        onToggleWatch={onToggleWatch}
      />
    );
    const chip = getByLabelText('Watch Camera');
    expect(chip.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
    fireEvent.click(chip);
    expect(onToggleWatch).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('a watched listing is emphasis, never `danger` (rule 3)', () => {
    const { getByLabelText } = render(
      <ListingCardV4 title="Camera" priceCents={100} watched onToggleWatch={() => {}} />
    );
    const chip = getByLabelText('Unwatch Camera');
    expect(chip.getAttribute('aria-pressed')).toBe('true');
    expect((chip.firstElementChild as HTMLElement).className).not.toMatch(/danger/);
    expect((chip.firstElementChild as HTMLElement).className).toContain('text-primary');
  });

  // ── the accessible label ───────────────────────────────────────────

  it('announces the condition in words, not as the database slug', () => {
    const { getByRole } = render(
      <ListingCardV4 title="Camera" priceCents={12500} condition="like-new" onClick={() => {}} />
    );
    expect(getByRole('button').getAttribute('aria-label')).toBe('Camera, $125.00, Like New');
  });

  it('a non-interactive card is not a button', () => {
    const el = card(<ListingCardV4 title="Camera" priceCents={100} />);
    expect(el.getAttribute('role')).toBeNull();
  });

  it('opens from the keyboard', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ListingCardV4 title="Camera" priceCents={100} onClick={onClick} />
    );
    fireEvent.keyDown(getByRole('button'), { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
