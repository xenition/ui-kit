/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio, hexToHsl } from '../theme/color';
import { gradientInk } from './internal/v4-depth';
import type { ThemeSeed } from '../theme/types';
import { ButtonV4 } from './ButtonV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};
const FLAT_SEED: ThemeSeed = { ...SEED, depth: 'flat' };

function renderThemed(ui: ReactElement, seed: ThemeSeed = SEED) {
  return render(<XenitionUIProvider theme={seed}>{ui}</XenitionUIProvider>);
}

/** The stop list out of a `linear-gradient(45deg, #a, #b)` custom property. */
function stops(value: string): string[] {
  return value
    .replace(/^linear-gradient\(/, '')
    .replace(/\)$/, '')
    .split(',')
    .map((part) => part.trim())
    .slice(1);
}

describe('ButtonV4 (web)', () => {
  it('renders a <button> and marks itself as the raised action', () => {
    const { getByRole } = renderThemed(<ButtonV4>Continue</ButtonV4>);
    const el = getByRole('button');
    expect(el.tagName).toBe('BUTTON');
    expect(el.getAttribute('type')).toBe('button');
    expect(el.hasAttribute('data-xen-v4-btn')).toBe(true);
    expect(el.getAttribute('data-depth')).toBe('action');
  });

  it('paints the primary action with the compiled brand gradient, per scheme', () => {
    const theme = compileTheme(SEED);
    const extremes = { darkest: theme.ramps.neutral[950], lightest: theme.ramps.neutral[50] };
    const { getByRole } = renderThemed(<ButtonV4>Continue</ButtonV4>);
    const el = getByRole('button');
    (
      [
        ['--xen-v4-image-l', theme.lightGradient.brand, theme.light.onPrimary],
        ['--xen-v4-image-d', theme.darkGradient.brand, theme.dark.onPrimary],
      ] as const
    ).forEach(([prop, brand, ink]) => {
      const legible = gradientInk(brand, ink, extremes);
      expect(stops(el.style.getPropertyValue(prop))).toEqual([legible.from, legible.to]);
      // Whatever contrast correction ran, the brand's two hues survived it —
      // only lightness is allowed to move.
      expect(hexToHsl(legible.from).h).toBeCloseTo(hexToHsl(brand.from).h, 0);
      expect(hexToHsl(legible.to).h).toBeCloseTo(hexToHsl(brand.to).h, 0);
    });
  });

  it('labels the gradient with a colour that clears AA against BOTH stops', () => {
    // Includes a teal seed whose raw brand stops span so much luminance that
    // NO colour clears both of them — the stops move so the rule can hold.
    const seeds: ThemeSeed[] = [SEED, { ...SEED, primary: '#0D9488', neutral: 'pure' }];
    seeds.forEach((seed) => {
      const { container } = renderThemed(<ButtonV4>Continue</ButtonV4>, seed);
      const el = within(container).getByRole('button');
      (
        [
          ['--xen-v4-on-l', '--xen-v4-image-l'],
          ['--xen-v4-on-d', '--xen-v4-image-d'],
        ] as const
      ).forEach(([inkProp, imageProp]) => {
        const color = el.style.getPropertyValue(inkProp);
        const pair = stops(el.style.getPropertyValue(imageProp));
        expect(pair).toHaveLength(2);
        pair.forEach((stop) => expect(contrastRatio(color, stop)).toBeGreaterThanOrEqual(4.5));
      });
    });
  });

  it('keeps the gradient off every other variant — §35.11, gradients stay rare', () => {
    (['secondary', 'ghost', 'outline', 'soft', 'link', 'elevated'] as const).forEach((variant) => {
      const { container } = renderThemed(<ButtonV4 variant={variant}>Later</ButtonV4>);
      const el = within(container).getByRole('button');
      expect(el.style.getPropertyValue('--xen-v4-image-l')).toBe('');
    });
  });

  it('keeps the gradient off a semantic tone — §35.4, semantic is not brand', () => {
    (['danger', 'success'] as const).forEach((tone) => {
      const { container } = renderThemed(<ButtonV4 tone={tone}>Delete</ButtonV4>);
      const el = within(container).getByRole('button');
      expect(el.style.getPropertyValue('--xen-v4-image-l')).toBe('');
      expect(el.className).toContain(tone === 'danger' ? 'bg-danger' : 'bg-success');
    });
  });

  it("falls flat for a depth:'flat' seed without branching on depth", () => {
    const theme = compileTheme(FLAT_SEED);
    const { getByRole } = renderThemed(<ButtonV4>Continue</ButtonV4>, FLAT_SEED);
    const el = getByRole('button');
    const [from, to] = stops(el.style.getPropertyValue('--xen-v4-image-l'));
    expect(theme.lightGradient.brand.from).toBe(theme.lightGradient.brand.to);
    expect(from).toBe(to);
    // The compiler already zeroed the shadow; nothing here had to check.
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toContain('/ 0)');
  });

  it('carries elevation.action resting and a halved shadow for the pressed state', () => {
    const theme = compileTheme(SEED);
    const { getByRole } = renderThemed(<ButtonV4>Continue</ButtonV4>);
    const el = getByRole('button');
    expect(el.style.getPropertyValue('--xen-v4-shadow-l')).toContain(
      `${theme.lightElevation.action.offsetY}px`
    );
    expect(el.style.getPropertyValue('--xen-v4-shadow-held-l')).toContain(
      `${theme.lightElevation.action.offsetY * 0.5}px`
    );
    // A dark page needs MORE shadow, not less — straight from the compiler.
    expect(theme.darkElevation.action.opacity).toBeGreaterThan(
      theme.lightElevation.action.opacity
    );
  });

  it('renders an <a> when href is set, with no type leaking onto it', () => {
    const { getByRole } = renderThemed(
      <ButtonV4 href="/next" size="lg">
        Next
      </ButtonV4>
    );
    const link = getByRole('link');
    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/next');
    expect(link.getAttribute('type')).toBeNull();
    expect(link.className).toContain('text-lg');
  });

  it('still fires onClick', () => {
    const onClick = jest.fn();
    const { getByText } = renderThemed(<ButtonV4 onClick={onClick}>Tap</ButtonV4>);
    getByText('Tap').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('degrades to the flat token look with no provider rather than throwing', () => {
    const { getByRole } = render(<ButtonV4>Continue</ButtonV4>);
    const el = getByRole('button');
    expect(el.style.getPropertyValue('--xen-v4-image-l')).toBe('');
    expect(el.className).toContain('bg-primary');
  });

  it('names no literal colour in its classes — every value is a token', () => {
    const { getByRole } = renderThemed(<ButtonV4 variant="soft">Continue</ButtonV4>);
    expect(getByRole('button').className).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('injects the depth sheet once', () => {
    renderThemed(<ButtonV4>One</ButtonV4>);
    renderThemed(<ButtonV4>Two</ButtonV4>);
    expect(document.querySelectorAll('#xen-v4-button-styles')).toHaveLength(1);
    const css = document.getElementById('xen-v4-button-styles')?.textContent ?? '';
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('[data-theme="dark"] [data-xen-v4-btn][data-depth="action"]');
  });
});
