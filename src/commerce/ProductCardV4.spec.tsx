/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { installMatchMedia } from '../spec-support/mock-io';
import { BadgeV4 } from '../primitives/BadgeV4';
import { formatMoney } from './money';
import { PRODUCT_CARD_V4_STYLE_ID, ProductCardV4 } from './ProductCardV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'warm',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

const card = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-v4-product-card]') as HTMLElement;
const media = (c: HTMLElement): HTMLElement =>
  c.querySelector('[data-xen-product-media]') as HTMLElement;

/** The sheet this component injects — where the `card` ground override lives. */
const sheet = (): string =>
  document.getElementById(PRODUCT_CARD_V4_STYLE_ID)?.textContent ?? '';

beforeEach(() => {
  installMatchMedia(false);
});

describe('ProductCardV4 (web)', () => {
  // ── §4.2: the card ground, the pass's headline fix ──────────────────

  it('paints `card`, not the page colour, and does it by specificity', () => {
    const c = mount(<ProductCardV4 title="Ceramic Mug" priceCents={2400} />);
    // It really is a `CardV4` — the recipe is composed, not re-rolled.
    expect(card(c).hasAttribute('data-xen-v4-card')).toBe(true);
    expect(sheet()).toContain('[data-xen-v4-card][data-xen-v4-product-card]');
    expect(sheet()).toContain('background-color: var(--xen-card)');
    expect(sheet()).toContain('color: var(--xen-on-card)');
    expect(sheet()).not.toContain('var(--xen-surface)');
  });

  it('raises by default and goes flat inside another card (never a shadow in a shadow)', () => {
    const raised = mount(<ProductCardV4 title="Mug" priceCents={2400} />);
    expect(card(raised).getAttribute('data-raised')).toBe('true');
    const flat = mount(<ProductCardV4 title="Mug" priceCents={2400} raised={false} />);
    expect(card(flat).getAttribute('data-raised')).not.toBe('true');
  });

  // ── the anatomy ─────────────────────────────────────────────────────

  it('composes PriceTagV4, never a hand-rolled price', () => {
    const c = mount(
      <ProductCardV4 title="Ceramic Mug" priceCents={120450} compareAtCents={150000} />
    );
    const tag = c.querySelector('[data-xen-price-tag]') as HTMLElement;
    expect(tag).not.toBeNull();
    expect((tag.querySelector('[data-xen-price]') as HTMLElement).textContent).toBe(
      formatMoney(120450)
    );
    expect((tag.querySelector('[data-xen-compare-at]') as HTMLElement).getAttribute('aria-label')).toBe(
      `Was ${formatMoney(150000)}`
    );
  });

  it('routes every amount through formatMoney, including an override', () => {
    const c = mount(
      <ProductCardV4
        title="Mug"
        priceCents={1200}
        currency="EUR"
        formatMoney={(cents, cur) => `${cur} ${cents}`}
      />
    );
    expect((c.querySelector('[data-xen-price]') as HTMLElement).textContent).toBe('EUR 1200');
  });

  it('caps the title at two lines so one long name cannot push a row out of shape', () => {
    const c = mount(
      <ProductCardV4 title="A hand-thrown stoneware mug in speckled cream" priceCents={2400} />
    );
    const title = c.querySelector('h3 span') as HTMLElement;
    // jsdom's CSSOM drops `-webkit-line-clamp` as an unknown property, so the
    // observable claim is the clamp box itself.
    expect(title.style.display).toBe('-webkit-box');
    expect(title.style.overflow).toBe('hidden');
  });

  it('holds the media at the ratio it was given, and 4:5 by default', () => {
    expect(media(mount(<ProductCardV4 title="Mug" priceCents={1} />)).className).toContain(
      'aspect-[4/5]'
    );
    ([
      ['1:1', 'aspect-square'],
      ['3:4', 'aspect-[3/4]'],
      ['16:9', 'aspect-[16/9]'],
    ] as const).forEach(([aspect, cls]) => {
      const c = mount(<ProductCardV4 title="Mug" priceCents={1} aspect={aspect} />);
      expect(media(c).className).toContain(cls);
    });
  });

  it('gives the media a semantic placeholder, not a light-only ramp step', () => {
    const c = mount(<ProductCardV4 title="Mug" priceCents={1} />);
    expect(media(c).className).toContain('bg-muted');
    expect(media(c).className).not.toContain('neutral-100');
  });

  // ── the new props ───────────────────────────────────────────────────

  it('takes exactly one badge, over the media', () => {
    const c = mount(
      <ProductCardV4
        title="Mug"
        priceCents={2400}
        badge={<BadgeV4 tone="danger">Sale</BadgeV4>}
      />
    );
    const slot = c.querySelector('[data-xen-product-badge]') as HTMLElement;
    expect(slot).not.toBeNull();
    expect(slot.textContent).toBe('Sale');
    expect(media(c).contains(slot)).toBe(true);
    expect(c.querySelectorAll('[data-xen-product-badge]')).toHaveLength(1);
  });

  it('draws no badge slot at all when it was given no badge', () => {
    const c = mount(<ProductCardV4 title="Mug" priceCents={2400} />);
    expect(c.querySelector('[data-xen-product-badge]')).toBeNull();
  });

  it('falls back to a GenerativeCoverV4 when there is no image, and an <img> when there is', () => {
    const drawn = mount(<ProductCardV4 title="Mug" slug="mug" priceCents={2400} />);
    expect(drawn.querySelector('[data-xen-v4-cover]')).not.toBeNull();
    expect(drawn.querySelector('img')).toBeNull();

    const shot = mount(<ProductCardV4 title="Mug" priceCents={2400} imageUrl="/mug.jpg" />);
    expect(shot.querySelector('img')?.getAttribute('loading')).toBe('lazy');
    expect(shot.querySelector('[data-xen-v4-cover]')).toBeNull();
  });

  it('fires onAdd from a ButtonV4, and renders no button without a handler', () => {
    const onAdd = jest.fn();
    const c = mount(
      <ProductCardV4 title="Mug" priceCents={2400} onAdd={onAdd} addLabel="Add" />
    );
    fireEvent.click(c.querySelector('button') as HTMLButtonElement);
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(mount(<ProductCardV4 title="Mug" priceCents={2400} />).querySelector('button')).toBeNull();
  });

  // ── the accessible label ────────────────────────────────────────────

  it('exposes one link and one name for the product, not two of each', () => {
    const c = mount(<ProductCardV4 title="Ceramic Mug" priceCents={2400} href="/p/mug" />);
    const links = Array.from(c.querySelectorAll('a'));
    expect(links).toHaveLength(2); // the media and the title…
    const named = links.filter((a) => a.getAttribute('aria-hidden') !== 'true');
    expect(named).toHaveLength(1); // …but only one is announced.
    expect(named[0]?.textContent).toBe('Ceramic Mug');
    const hidden = links.find((a) => a.getAttribute('aria-hidden') === 'true') as HTMLAnchorElement;
    expect(hidden.getAttribute('tabindex')).toBe('-1');
  });

  it('leaves the generated cover decorative so the title is announced once', () => {
    const c = mount(<ProductCardV4 title="Ceramic Mug" priceCents={2400} />);
    const cover = c.querySelector('[data-xen-v4-cover]') as Element;
    expect(cover.getAttribute('aria-hidden')).toBe('true');
    expect(cover.getAttribute('aria-label')).toBeNull();
  });

  it('names a real photo with imageAlt, falling back to the title', () => {
    const c = mount(
      <ProductCardV4 title="Mug" priceCents={1} imageUrl="/m.jpg" imageAlt="Cream mug, side on" />
    );
    expect(c.querySelector('img')?.getAttribute('alt')).toBe('Cream mug, side on');
    const fallback = mount(<ProductCardV4 title="Mug" priceCents={1} imageUrl="/m.jpg" />);
    expect(fallback.querySelector('img')?.getAttribute('alt')).toBe('Mug');
  });

  // ── the empty case (§4.5) ───────────────────────────────────────────

  it('renders nothing for a product with no name — never a blank bordered box', () => {
    const c = mount(<ProductCardV4 title="" priceCents={2400} onAdd={() => undefined} />);
    expect(c.querySelector('[data-xen-product-card]')).toBeNull();
    expect(c.querySelector('[data-xen-price-tag]')).toBeNull();
    expect(c.querySelector('button')).toBeNull();
  });

  it('survives a product with no image, no compare-at, no badge and no add handler', () => {
    const c = mount(<ProductCardV4 title="Mug" priceCents={0} />);
    expect(card(c)).not.toBeNull();
    expect((c.querySelector('[data-xen-price]') as HTMLElement).textContent).toBe(formatMoney(0));
    expect(c.querySelector('[data-xen-compare-at]')).toBeNull();
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLDivElement | null = null;
    const c = mount(
      <ProductCardV4
        title="Mug"
        priceCents={1}
        id="pc"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(c.querySelector('#pc'));
  });
});
