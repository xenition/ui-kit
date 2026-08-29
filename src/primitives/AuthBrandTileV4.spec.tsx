/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import type { ThemeSeed } from '../theme/types';
import { AuthBrandTileV4 } from './AuthBrandTileV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

/** A seed whose `shape` zeroes the whole radius scale, `full` included. */
const SHARP_SEED: ThemeSeed = { ...SEED, shape: 'sharp' };

/** Two more brand hues, so a contrast claim is a claim about the compiler. */
const SEEDS: ThemeSeed[] = [
  SEED,
  { ...SEED, primary: '#EA580C', neutral: 'warm' },
  { ...SEED, primary: '#0D9488', neutral: 'pure' },
];

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

function tile(ui: ReactElement, seed: ThemeSeed = SEED): HTMLElement {
  const { container } = renderThemed(ui, seed);
  const el = container.querySelector('[data-xen-v4-brand-tile]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

/** The provider's own wrapper — everything the component actually rendered. */
function host(container: HTMLElement): HTMLElement {
  return container.querySelector('[data-theme]') as HTMLElement;
}

describe('AuthBrandTileV4 (web)', () => {
  it('renders NOTHING when there is neither a glyph nor a name — §12', () => {
    // The kit ships no brand marks, so "this app has no mark" is a state the
    // tile has to survive. An empty 56px primary square is worse than no
    // square: it reads as a picture that failed to load.
    const { container } = renderThemed(<AuthBrandTileV4 />);
    expect(container.querySelector('[data-xen-v4-brand-tile]')).toBeNull();
    expect(host(container).childElementCount).toBe(0);

    // Not merely "no tile" — nothing at all, including no icon slot.
    const empty = renderThemed(<AuthBrandTileV4 align="center" size="lg" />);
    expect(host(empty.container).innerHTML).toBe('');
  });

  it('draws the mark when it is given one, either way round', () => {
    expect(tile(<AuthBrandTileV4 glyph="🌱" />).textContent).toContain('🌱');
    expect(tile(<AuthBrandTileV4 name="home" />).childElementCount).toBe(1);
  });

  it('composes the square from the SPACING SCALE, landing on §9’s 56', () => {
    const theme = compileTheme(SEED);
    // The base typed `56`. This is the same 56 — derived, so a seed that
    // re-scales its rhythm re-scales the tile with the fields beneath it.
    expect(theme.spacing['2xl'] + theme.spacing.sm).toBe(56);
    const el = tile(<AuthBrandTileV4 glyph="🌱" />);
    expect(el.className).toContain('h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]');
    expect(el.className).toContain('w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]');
    // A square, not a rectangle: the two axes read the same expression.
    expect(el.className).not.toMatch(/h-\[[^\]]*\][^ ]* w-\[(?!calc\(var\(--xen-space-2xl\)_\+_var\(--xen-space-sm\)\))/);
  });

  it('offers §3’s hero size, and it is a bigger square from the same scale', () => {
    const theme = compileTheme(SEED);
    expect(theme.spacing['2xl'] + theme.spacing.lg).toBe(72);
    const el = tile(<AuthBrandTileV4 glyph="🌱" size="lg" />);
    expect(el.getAttribute('data-size')).toBe('lg');
    expect(el.className).toContain('h-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]');
    expect(el.className).toContain('w-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]');
  });

  it('steps the mark up with the square so it keeps its share of the tile', () => {
    // `2xl` inside 56 and `3xl` inside 72 are both ~43% — the mark reads as
    // centred in a tile rather than as a glyph that happens to be in a box.
    const theme = compileTheme(SEED);
    const md = theme.typography.scale['2xl'] / (theme.spacing['2xl'] + theme.spacing.sm);
    const lg = theme.typography.scale['3xl'] / (theme.spacing['2xl'] + theme.spacing.lg);
    expect(md).toBeCloseTo(lg, 1);
  });

  it('keeps §9’s rounded square by default and offers §3’s medallion', () => {
    const square = tile(<AuthBrandTileV4 glyph="🌱" />);
    expect(square.getAttribute('data-shape')).toBe('rounded');
    expect(square.className).toContain('rounded-[var(--xen-radius-lg)]');

    const disc = tile(<AuthBrandTileV4 glyph="🌱" shape="circle" />);
    expect(disc.className).toContain('rounded-[50%]');
    // NOT `rounded-full`: the preset maps it to `--xen-radius-full`, and…
    expect(disc.className).not.toMatch(/rounded-full|radius-full/);
  });

  it('…and the reason is that `radius.full` is 0 on a sharp seed', () => {
    // The Addendum records the same trap for `Switch`. A ratio is geometry
    // (§10.1); a radius token that squares off the one round thing is a bug.
    expect(compileTheme(SHARP_SEED).radius.full).toBe(0);
    expect(tile(<AuthBrandTileV4 glyph="🌱" shape="circle" />, SHARP_SEED).className).toContain(
      'rounded-[50%]'
    );
  });

  it('fills with `primary` and marks in `onPrimary` — the one guaranteed pair', () => {
    const el = tile(<AuthBrandTileV4 glyph="🌱" />);
    expect(el.className).toMatch(/bg-primary(?![-\w])/);
    // Whatever spelling `IconV4` uses for the slot, it is the on-fill one.
    expect(el.innerHTML).toMatch(/on-?[Pp]rimary/);
  });

  it('and that pair clears AA on every brand hue, in both schemes', () => {
    // The tempting alternative — §8’s `primary[50]` ground with the mark in
    // `primary` — measures 1.72:1 on the teal seed in light, under the 3:1 a
    // non-text graphic must clear. This is why the tile has no soft variant.
    SEEDS.forEach((seed) => {
      const theme = compileTheme(seed);
      expect(contrastRatio(theme.light.onPrimary, theme.light.primary)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme.dark.onPrimary, theme.dark.primary)).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('sits top-LEFT by default — §9 is explicit that it is not centred', () => {
    const el = tile(<AuthBrandTileV4 glyph="🌱" />);
    expect(el.className).toContain('self-start');
    expect(el.className).toContain('mr-auto');
    expect(el.className).not.toContain('mx-auto');
  });

  it('centres deliberately when asked, in a block parent as well as a flex one', () => {
    // `self-*` alone does nothing outside a flex container, which is how the
    // base drew it — so a tile in a plain block never centred at all.
    const el = tile(<AuthBrandTileV4 glyph="🌱" align="center" />);
    expect(el.className).toContain('self-center');
    expect(el.className).toContain('mx-auto');
  });

  it('announces a label when given one, and is decorative otherwise', () => {
    const labelled = renderThemed(<AuthBrandTileV4 glyph="🌱" aria-label="Acme" />);
    expect(labelled.getByLabelText('Acme')).toBeTruthy();
    expect(labelled.container.querySelector('[aria-label="Acme"]')).not.toBeNull();

    const plain = renderThemed(<AuthBrandTileV4 glyph="🌱" />);
    expect(plain.container.querySelector('[aria-label]')).toBeNull();
  });

  it('takes a className for layout without losing its own', () => {
    const el = tile(<AuthBrandTileV4 glyph="🌱" className="mb-lg" />);
    expect(el.className).toContain('mb-lg');
    expect(el.className).toMatch(/bg-primary(?![-\w])/);
  });

  it('paints nothing with a literal — every value traces to a `--xen-*` token', () => {
    const el = tile(<AuthBrandTileV4 glyph="🌱" size="lg" shape="circle" />);
    const markup = el.outerHTML;
    expect(markup).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(markup).not.toMatch(/rgba?\(/);
    // The only bare numbers are geometry: the 50% disc and the type steps.
    expect(el.className).not.toMatch(/\[\d+px\]/);
  });
});
