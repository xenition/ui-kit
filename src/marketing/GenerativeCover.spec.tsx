/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { COVER_FORMS, GenerativeCover, hashSeed } from './GenerativeCover';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('hashSeed', () => {
  it('is stable and input-sensitive', () => {
    expect(hashSeed('alpha')).toBe(hashSeed('alpha'));
    expect(hashSeed('alpha')).not.toBe(hashSeed('beta'));
    expect(hashSeed(42)).toBe(hashSeed('42'));
  });
});

describe('GenerativeCover', () => {
  it('renders identical SVG markup for the same seed (deterministic art)', () => {
    const a = render(<GenerativeCover seed="atlas-rebrand" />);
    const b = render(<GenerativeCover seed="atlas-rebrand" />);
    expect(a.container.innerHTML).toBe(b.container.innerHTML);
  });

  it('renders different art for different seeds', () => {
    const a = render(<GenerativeCover seed="atlas-rebrand" />);
    const b = render(<GenerativeCover seed="meridian-identity" />);
    expect(a.container.innerHTML).not.toBe(b.container.innerHTML);
  });

  it('derives the form from the seed hash when form is omitted', () => {
    const seed = 'north-editorial';
    const expected = COVER_FORMS[hashSeed(seed) % COVER_FORMS.length];
    const { container } = render(<GenerativeCover seed={seed} />);
    expect(container.querySelector('svg')?.getAttribute('data-xen-cover')).toBe(expected);
  });

  it('renders every forced form', () => {
    for (const form of COVER_FORMS) {
      const { container } = render(<GenerativeCover seed="s" form={form} />);
      const svg = container.querySelector('svg');
      expect(svg?.getAttribute('data-xen-cover')).toBe(form);
      expect(svg?.querySelector('g')).not.toBeNull();
    }
  });

  it('same seed with different forms yields different plates', () => {
    const a = render(<GenerativeCover seed="s" form="arc" />);
    const b = render(<GenerativeCover seed="s" form="wave" />);
    expect(a.container.innerHTML).not.toBe(b.container.innerHTML);
  });

  it('paints ink and paper as token variables only', () => {
    const { container } = render(
      <GenerativeCover seed="s" form="orbit" ink="accent-700" paper="surface" />
    );
    const svg = container.querySelector('svg');
    const paper = svg?.querySelector('rect');
    expect(paper?.getAttribute('fill')).toBe('var(--xen-surface)');
    expect(svg?.innerHTML).toContain('var(--xen-accent-700)');
    expect(svg?.outerHTML).not.toMatch(HEX_LITERAL);
  });

  it('rejects literal colors with a descriptive error (never best-effort)', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(<GenerativeCover seed="s" ink="#ff0000" />)).toThrow(
      /invalid ink role/
    );
    expect(() =>
      render(<GenerativeCover seed="s" paper="rebeccapurple" />)
    ).toThrow(/invalid paper role/);
    spy.mockRestore();
  });

  it('is announced with role="img" when labelled, decorative otherwise', () => {
    const labelled = render(<GenerativeCover seed="s" label="Atlas — cover plate" />);
    const svg = labelled.getByRole('img', { name: 'Atlas — cover plate' });
    expect(svg.getAttribute('aria-hidden')).toBeNull();

    const decorative = render(<GenerativeCover seed="s" />);
    expect(
      decorative.container.querySelector('svg')?.getAttribute('aria-hidden')
    ).toBe('true');
  });
});
