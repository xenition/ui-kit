/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { SellerCardV4, SELLER_CARD_V4_STYLE_ID } from './SellerCardV4';

function card(ui: ReactElement): HTMLElement | null {
  const { container } = render(ui);
  return container.querySelector('[data-xen-v4-seller-card]');
}

function sheet(): string {
  return document.getElementById(SELLER_CARD_V4_STYLE_ID)?.textContent ?? '';
}

describe('SellerCardV4 (web)', () => {
  // ── §4.2 ───────────────────────────────────────────────────────────

  it('paints `card` and composes CardV4 rather than re-rolling the recipe', () => {
    const el = card(<SellerCardV4 name="Nadia Okonkwo" />) as HTMLElement;
    expect(el.hasAttribute('data-xen-v4-card')).toBe(true);
    expect(sheet()).toContain('background-color: var(--xen-card)');
  });

  it('the `inline` variant keeps no container of its own (§4.3)', () => {
    const el = card(<SellerCardV4 name="Nadia Okonkwo" variant="inline" />) as HTMLElement;
    expect(el.getAttribute('data-xen-v4-seller-card')).toBe('inline');
    expect(el.hasAttribute('data-xen-v4-card')).toBe(false);
  });

  // ── rule 6: a number AND stars AND a count ─────────────────────────

  it('shows the rating as a number, as stars, and as a count — never stars alone', () => {
    const { container, getByText } = render(
      <SellerCardV4 name="Nadia Okonkwo" rating={4.83} reviewCount={1204} />
    );
    // the number
    expect(getByText('4.8')).toBeTruthy();
    // the stars, which announce themselves rather than relying on their shape
    const stars = container.querySelector('[data-xen-v4-rating]') as HTMLElement;
    expect(stars.getAttribute('aria-label')).toBe('4.83 out of 5 stars');
    // the count, in words rather than as a parenthesised footnote
    expect(getByText('1,204 reviews')).toBeTruthy();
  });

  it('singularises one review', () => {
    const { getByText } = render(<SellerCardV4 name="Ari" rating={5} reviewCount={1} />);
    expect(getByText('1 review')).toBeTruthy();
  });

  it('a rating with no count still says something, rather than showing bare stars', () => {
    const { getByText } = render(<SellerCardV4 name="Ari" rating={4.2} />);
    expect(getByText('No ratings yet')).toBeTruthy();
  });

  // ── rule 6: verified is a mark AND a word ──────────────────────────

  it('verified ships a tick and a word, and announces only the words', () => {
    const { container } = render(<SellerCardV4 name="Ari" verified />);
    const badge = container.querySelector('[data-xen-v4-seller-verified]') as HTMLElement;
    expect(badge.textContent).toContain('✓');
    expect(badge.textContent).toContain('Verified');
    expect(badge.getAttribute('aria-label')).toBe('Verified seller');
  });

  it('`verifiedLabel` is translatable but cannot be emptied into a bare tick', () => {
    const { container } = render(<SellerCardV4 name="Ari" verified verifiedLabel="ID checked" />);
    expect(
      (container.querySelector('[data-xen-v4-seller-verified]') as HTMLElement).textContent
    ).toContain('ID checked');

    const { container: blank } = render(<SellerCardV4 name="Ari" verified verifiedLabel="" />);
    expect(
      (blank.querySelector('[data-xen-v4-seller-verified]') as HTMLElement).textContent
    ).toContain('Verified');
  });

  // ── the new props ──────────────────────────────────────────────────

  it('`raised` is on by default for the on-page card and can be turned off (§4.6)', () => {
    const on = card(<SellerCardV4 name="Ari" />) as HTMLElement;
    const off = card(<SellerCardV4 name="Ari" raised={false} />) as HTMLElement;
    expect(on.getAttribute('data-raised')).toBe('true');
    expect(off.getAttribute('data-raised')).toBe('false');
  });

  it('`emptyRatingLabel` is the caller’s words', () => {
    const { getByText } = render(<SellerCardV4 name="Ari" emptyRatingLabel="New seller" />);
    expect(getByText('New seller')).toBeTruthy();
  });

  // ── the empty case ─────────────────────────────────────────────────

  it('renders nothing without a name — an identity block with no identity (§4.5)', () => {
    const { container } = render(<SellerCardV4 name="" />);
    expect(container.firstChild).toBeNull();
  });

  it('a seller with no rating, no sales and no location still says what it knows', () => {
    const el = card(<SellerCardV4 name="Ari" />) as HTMLElement;
    expect(el.textContent).toContain('Ari');
    expect(el.textContent).toContain('No ratings yet');
    // …and no empty meta line was drawn.
    expect(el.textContent).not.toContain('·');
  });

  // ── the accessible label ───────────────────────────────────────────

  it('names the press target with everything a buyer is deciding on', () => {
    const { getByRole } = render(
      <SellerCardV4
        name="Nadia Okonkwo"
        verified
        rating={4.83}
        reviewCount={1204}
        onClick={() => {}}
      />
    );
    expect(getByRole('button').getAttribute('aria-label')).toBe(
      'Nadia Okonkwo, verified seller, rated 4.8 of 5, 1,204 reviews'
    );
  });

  it('contacting never also navigates', () => {
    const onClick = jest.fn();
    const onContact = jest.fn();
    const { getByText, getByRole } = render(
      <SellerCardV4 name="Ari" onClick={onClick} onContact={onContact} />
    );
    fireEvent.click(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();

    fireEvent.keyDown(getByRole('button', { name: /^Ari/ }), { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('the press target takes the state layer and clears the tap floor', () => {
    const { getByRole } = render(<SellerCardV4 name="Ari" onClick={() => {}} />);
    const target = getByRole('button');
    expect(target.hasAttribute('data-xen-v4-state')).toBe(true);
    expect(target.className).toContain('min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]');
  });
});
