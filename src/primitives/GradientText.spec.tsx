/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { mixToken } from './internal/v4-depth';
import type { ThemeSeed } from '../theme/types';
import { GradientText, type GradientTextRamp } from './GradientText';

const [VIOLET, TEAL, EMBER]: ThemeSeed[] = [
  { primary: '#7C3AED', neutral: 'cool', font: { heading: 'Inter', body: 'Inter' }, shape: 'rounded', mode: 'both' },
  { primary: '#0D9488', neutral: 'pure', font: { heading: 'Inter', body: 'Inter' }, shape: 'pill', mode: 'both' },
  { primary: '#EA580C', accent: '#D4A24E', neutral: 'warm', font: { heading: 'Inter', body: 'Inter' }, shape: 'sharp', mode: 'both' },
] as [ThemeSeed, ThemeSeed, ThemeSeed];

const SEEDS: ThemeSeed[] = [VIOLET, TEAL, EMBER];

const RAMPS: GradientTextRamp[] = ['primary', 'accent', 'primary-accent', 'accent-primary'];
const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

function sheet(): string {
  return document.getElementById('xen-gradient-text-styles')?.textContent ?? '';
}

describe('GradientText (web)', () => {
  it('sweeps the brand pair in its contrast-safe TEXT form', () => {
    render(
      <XenitionUIProvider theme={VIOLET}>
        <GradientText>faster</GradientText>
      </XenitionUIProvider>
    );
    const css = sheet();
    expect(css).toContain('background-clip: text');
    // The default recipe started at `--xen-primary-300` — a pale tint of the
    // brand, used as text, on a light page. Nothing had measured it.
    expect(css).not.toContain('var(--xen-primary-300)');
    expect(css).not.toContain('var(--xen-accent-200)');
    expect(css).toContain('var(--xen-primary-text)');
    expect(css).toContain('var(--xen-accent-text)');
  });

  it('the slots it names really do clear AA, in both schemes and every seed', () => {
    SEEDS.forEach((seed) => {
      const theme = compileTheme(seed);
      (['light', 'dark'] as const).forEach((scheme) => {
        const surface = theme[scheme].surface;
        // The two stops of the default `primary-accent` recipe…
        expect(contrastRatio(theme[scheme].primaryText, surface)).toBeGreaterThanOrEqual(4.5);
        expect(contrastRatio(theme[scheme].accentText, surface)).toBeGreaterThanOrEqual(4.5);
        // …and the far stop of the single-ramp recipes, which fades the text
        // slot toward the page's own ink. A deep RAMP step will not do: on a
        // teal seed `primary-800` measures 3.81:1 on the page it lands on.
        // `color-mix(in srgb, X 55%, Y)` is 55% X + 45% Y.
        expect(
          contrastRatio(
            mixToken(theme[scheme].primaryText, theme[scheme].onSurface, 0.45),
            surface
          )
        ).toBeGreaterThanOrEqual(4.5);
        expect(
          contrastRatio(
            mixToken(theme[scheme].accentText, theme[scheme].onSurface, 0.45),
            surface
          )
        ).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it('keeps a recipe for every ramp name', () => {
    render(
      <XenitionUIProvider theme={VIOLET}>
        <GradientText>faster</GradientText>
      </XenitionUIProvider>
    );
    RAMPS.forEach((ramp) => {
      expect(sheet()).toContain(`[data-xen-gradient-text="${ramp}"]`);
    });
  });

  it('stays token-pure — no hex in the sheet or the inline style', () => {
    const { container } = render(
      <XenitionUIProvider theme={TEAL}>
        <GradientText ramp="accent" angle={135} as="strong">
          hot
        </GradientText>
      </XenitionUIProvider>
    );
    // The correction lives in the compiler and arrives as a variable, which is
    // the only way this component can carry an AA guarantee AND stay hex-free.
    expect(sheet()).not.toMatch(HEX_LITERAL);
    const inline = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
      .map((el) => el.getAttribute('style') ?? '')
      .filter((s) => !s.includes('display: contents'))
      .join('\n');
    expect(inline).not.toMatch(HEX_LITERAL);
  });

  it('still carries the angle, the ramp and the element choice', () => {
    const { getByText } = render(
      <XenitionUIProvider theme={VIOLET}>
        <GradientText ramp="accent" angle={135} as="strong">
          hot
        </GradientText>
      </XenitionUIProvider>
    );
    const el = getByText('hot');
    expect(el.tagName).toBe('STRONG');
    expect(el.getAttribute('data-xen-gradient-text')).toBe('accent');
    expect(el.getAttribute('style')).toContain('--xen-gradient-text-angle: 135deg');
  });

  it('works with no provider above it, on the variable fallbacks', () => {
    const { getByText } = render(<GradientText>faster</GradientText>);
    expect(getByText('faster').getAttribute('data-xen-gradient-text')).toBe('primary-accent');
  });
});
