/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { COVER_FORMS, hashSeed, resolveCoverPlate } from './internal/cover-v4';
import { GenerativeCoverV4 } from './GenerativeCoverV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function mount(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return container;
}

const cover = (c: HTMLElement): SVGSVGElement =>
  c.querySelector('[data-xen-v4-cover]') as unknown as SVGSVGElement;

describe('GenerativeCoverV4 (web)', () => {
  // ── the twin that did not exist ─────────────────────────────────────

  it('draws the full geometric composition as inline SVG', () => {
    const c = mount(<GenerativeCoverV4 seed="ceramic-mug" />);
    const svg = cover(c);
    expect(svg.tagName.toLowerCase()).toBe('svg');
    // Not an empty plate: the form renderers put real geometry in it.
    expect(svg.querySelectorAll('circle, rect, path, line').length).toBeGreaterThan(1);
  });

  it('draws every one of the six forms the `form` prop names', () => {
    COVER_FORMS.forEach((form) => {
      const c = mount(<GenerativeCoverV4 seed="x" form={form} />);
      expect(cover(c).getAttribute('data-xen-v4-cover')).toBe(form);
      expect(cover(c).getAttribute('data-xen-cover')).toBe(form);
    });
  });

  // ── determinism: the same seed, the same output family ──────────────

  it('gives the same seed the same output, every render', () => {
    const a = mount(<GenerativeCoverV4 seed="ceramic-mug" />);
    const b = mount(<GenerativeCoverV4 seed="ceramic-mug" />);
    expect(cover(a).outerHTML).toBe(cover(b).outerHTML);
  });

  it('gives the same seed the same form and the same colour roles as the native twin', () => {
    // The shared decision, asserted at the source both twins read. The native
    // spec asserts the same three values land on the compiled tokens.
    ['ceramic-mug', 'linen-napkin', 42, 'cedar candle'].forEach((seed) => {
      const plate = resolveCoverPlate(seed);
      const c = mount(<GenerativeCoverV4 seed={seed} />);
      expect(cover(c).getAttribute('data-xen-v4-cover')).toBe(plate.form);
      expect(cover(c).innerHTML).toContain(`var(--xen-${plate.ink})`);
      expect(cover(c).innerHTML).toContain(`var(--xen-${plate.paper})`);
    });
  });

  it('spreads the three decisions across different slices of the hash', () => {
    // If form, ink and paper all came off `hash % n` they would move together
    // and a wall of covers would vary in one axis only.
    const plates = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((s) => resolveCoverPlate(s));
    const byForm = new Set(plates.map((p) => p.form));
    const byPaper = new Set(plates.map((p) => p.paper));
    expect(byForm.size).toBeGreaterThan(1);
    expect(byPaper.size).toBeGreaterThan(1);
  });

  it('hashes unsigned, so a seed past 2^31 still indexes forwards', () => {
    // The bug the native base caught live: a signed shift goes negative and
    // indexes an array backwards, which reaches the gradient as `undefined`.
    ['ember-oak-hero', 'ceramic-mug', 'x', ''].forEach((seed) => {
      expect(hashSeed(seed)).toBeGreaterThanOrEqual(0);
      const plate = resolveCoverPlate(seed);
      expect(COVER_FORMS).toContain(plate.form);
      expect(plate.ink).toMatch(/^accent-\d+$/);
      expect(plate.paper).toMatch(/^primary-\d+$/);
    });
  });

  // ── the new props ───────────────────────────────────────────────────

  it('lets an explicit form, ink and paper beat the seed', () => {
    const c = mount(<GenerativeCoverV4 seed="ceramic-mug" form="grid" ink="accent" paper="surface" />);
    expect(cover(c).getAttribute('data-xen-v4-cover')).toBe('grid');
    expect(cover(c).innerHTML).toContain('var(--xen-accent)');
    expect(cover(c).innerHTML).toContain('var(--xen-surface)');
  });

  it('paints tokens only — a literal colour role throws rather than best-efforts', () => {
    const c = mount(<GenerativeCoverV4 seed="ceramic-mug" />);
    expect(cover(c).innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // React logs the boundary-less throw; the throw is the assertion.
    const quiet = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => mount(<GenerativeCoverV4 seed="ceramic-mug" ink="#ff0000" />)).toThrow(
      /invalid ink role/
    );
    quiet.mockRestore();
  });

  // ── the accessible label ────────────────────────────────────────────

  it('is announced as an image when named', () => {
    const c = mount(<GenerativeCoverV4 seed="ceramic-mug" label="Ceramic Mug" />);
    expect(cover(c).getAttribute('role')).toBe('img');
    expect(cover(c).getAttribute('aria-label')).toBe('Ceramic Mug');
  });

  it('is decorative when unnamed — the state it is in inside a ProductCardV4', () => {
    const c = mount(<GenerativeCoverV4 seed="ceramic-mug" />);
    expect(cover(c).getAttribute('aria-hidden')).toBe('true');
    expect(cover(c).getAttribute('role')).toBeNull();
  });

  it('draws no initials, on either twin — the art carries no unverifiable text', () => {
    const c = mount(<GenerativeCoverV4 seed="Ceramic Mug" label="Ceramic Mug" />);
    expect(cover(c).querySelector('text')).toBeNull();
    expect(cover(c).textContent).toBe('');
  });

  // ── the empty case ──────────────────────────────────────────────────

  it('still draws a plate for an empty seed rather than nothing', () => {
    // There is no "no cover" state: the component exists because a product has
    // no image, so an empty slug must still produce art.
    const c = mount(<GenerativeCoverV4 seed="" />);
    expect(cover(c)).not.toBeNull();
    expect(cover(c).querySelectorAll('circle, rect, path, line').length).toBeGreaterThan(1);
  });

  it('forwards its ref and extra SVG props', () => {
    let node: SVGSVGElement | null = null;
    const c = mount(
      <GenerativeCoverV4
        seed="ceramic-mug"
        id="cover"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(c.querySelector('#cover'));
  });
});
