/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import { EYEBROW_TRACKING, EYEBROW_TRACKING_CLASS } from './internal/identity-v4';
import type { ThemeSeed } from '../theme/types';
import type { EyebrowTone } from './Eyebrow';
import { EyebrowV4 } from './EyebrowV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Fraunces', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function eyebrow(ui: ReactElement): HTMLElement {
  const { container } = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(container).getByTestId('eyebrow');
}

const TONES: EyebrowTone[] = ['primary', 'accent', 'muted'];

describe('EyebrowV4 (web)', () => {
  it('takes the TEXT form of a tone, not the fill it paints buttons with', () => {
    // `text-primary` resolves to the FILL — the preset says so in as many
    // words. `-text` is the form walked to AA on `surface`.
    const el = eyebrow(
      <EyebrowV4 data-testid="eyebrow" tone="primary">
        Now shipping
      </EyebrowV4>
    );
    expect(el.className).toContain('text-primary-text');
    // `-text` must be the whole class, not a prefix of it.
    expect(el.className).not.toMatch(/text-primary(?![-\w])/);
  });

  it('names a contrast-safe slot for every tone', () => {
    TONES.forEach((tone) => {
      const el = eyebrow(
        <EyebrowV4 data-testid="eyebrow" tone={tone}>
          Now shipping
        </EyebrowV4>
      );
      expect(el.className).toMatch(/text-(primary-text|accent-text|muted)/);
    });
  });

  it('and those slots really do clear AA in both schemes', () => {
    const theme = compileTheme(SEED);
    // The class names above resolve to these; the assertion is on the values.
    (
      [
        ['primaryText', theme.light.primaryText, theme.dark.primaryText],
        ['accentText', theme.light.accentText, theme.dark.accentText],
      ] as const
    ).forEach(([, light, dark]) => {
      expect(contrastRatio(light, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(dark, theme.dark.surface)).toBeGreaterThanOrEqual(4.5);
    });
  });

  it('tracks from one ratio, spelled out so Tailwind can see it', () => {
    const el = eyebrow(<EyebrowV4 data-testid="eyebrow">Now shipping</EyebrowV4>);
    expect(el.className).toContain(EYEBROW_TRACKING_CLASS);
    // The literal class and the number the native twin multiplies by must be
    // the same value, or the two eyebrows are different widths.
    expect(EYEBROW_TRACKING_CLASS).toBe(`tracking-[${EYEBROW_TRACKING}em]`);
  });

  it('sets it in the heading face — a kicker is display type, not body', () => {
    const el = eyebrow(<EyebrowV4 data-testid="eyebrow">Now shipping</EyebrowV4>);
    expect(el.className).toContain('font-heading');
    expect(el.className).toContain('uppercase');
    expect(el.className).toContain('text-xs');
  });

  it('draws the flanking rule as a hairline that frames, not a second voice', () => {
    const el = eyebrow(
      <EyebrowV4 data-testid="eyebrow" rule>
        Now shipping
      </EyebrowV4>
    );
    const ticks = el.querySelectorAll('[aria-hidden="true"]');
    expect(ticks).toHaveLength(2);
    ticks.forEach((t) => {
      // `bg-current` was the label's own colour and weight.
      expect(t.className).toContain('bg-border');
      expect(t.className).not.toContain('bg-current');
      expect(t.className).toContain('w-lg');
    });
  });

  it('omits the rule unless asked', () => {
    const el = eyebrow(<EyebrowV4 data-testid="eyebrow">Now shipping</EyebrowV4>);
    expect(el.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });

  it('centres when asked and leads otherwise', () => {
    expect(
      eyebrow(
        <EyebrowV4 data-testid="eyebrow" align="center">
          Now shipping
        </EyebrowV4>
      ).className
    ).toContain('justify-center');
    expect(
      eyebrow(<EyebrowV4 data-testid="eyebrow">Now shipping</EyebrowV4>).className
    ).not.toContain('justify-center');
  });

  it('stays a paragraph and passes DOM props through', () => {
    const el = eyebrow(
      <EyebrowV4 data-testid="eyebrow" id="kicker" className="mb-sm">
        Now shipping
      </EyebrowV4>
    );
    expect(el.tagName).toBe('P');
    expect(el.getAttribute('id')).toBe('kicker');
    expect(el.className).toContain('mb-sm');
    expect(el.getAttribute('data-xen-v4-eyebrow')).toBe('accent');
  });
});
