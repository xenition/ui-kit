/** @jest-environment jsdom */
import { render, within } from '@testing-library/react';
import type { ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { compileTheme } from '../theme/compile';
import { contrastRatio } from '../theme/color';
import type { ThemeSeed } from '../theme/types';
import { RatingV4 } from './RatingV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement) {
  const result = render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
  return within(result.container).getByTestId('rating');
}

function fill(el: HTMLElement): HTMLElement {
  return el.querySelector('[data-xen-v4-rating-fill]') as HTMLElement;
}

describe('RatingV4 (web)', () => {
  it('draws the exact fraction, not the nearest whole star', () => {
    // The base rounded, so a 4.2 and a 4.4 were the same picture beside two
    // different numbers.
    expect(fill(renderThemed(<RatingV4 data-testid="rating" value={4.2} />)).style.width).toBe(
      '84%'
    );
    expect(fill(renderThemed(<RatingV4 data-testid="rating" value={4.4} />)).style.width).toBe(
      '88%'
    );
    expect(fill(renderThemed(<RatingV4 data-testid="rating" value={3} />)).style.width).toBe(
      '60%'
    );
  });

  it('clamps a value outside the scale', () => {
    expect(fill(renderThemed(<RatingV4 data-testid="rating" value={-1} />)).style.width).toBe(
      '0%'
    );
    expect(fill(renderThemed(<RatingV4 data-testid="rating" value={99} />)).style.width).toBe(
      '100%'
    );
    expect(
      fill(renderThemed(<RatingV4 data-testid="rating" value={2} max={0} />)).style.width
    ).toBe('0%');
  });

  it('fills with `accent-text`, never the raw `accent` fill', () => {
    const el = renderThemed(<RatingV4 data-testid="rating" value={5} />);
    // The base painted `text-accent` here and measured 1.43:1 in light mode.
    expect(fill(el).className).toContain('text-accent-text');
    expect(fill(el).className).not.toMatch(/text-accent(?!-text)/);
  });

  it('keeps both rows legible on the page — both schemes', () => {
    const theme = compileTheme(SEED);
    (['light', 'dark'] as const).forEach((scheme) => {
      // A star is a glyph — held at the text threshold, not 3:1.
      expect(contrastRatio(theme[scheme].accentText, theme[scheme].surface))
        .toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme[scheme].muted, theme[scheme].surface)).toBeGreaterThanOrEqual(3);
    });
  });

  it('draws `max` empty glyphs and `max` filled ones behind the clip', () => {
    const el = renderThemed(<RatingV4 data-testid="rating" value={2} max={7} />);
    expect(el.textContent).toHaveLength(14);
  });

  it('announces the exact value once, not a run of glyphs', () => {
    const el = renderThemed(<RatingV4 data-testid="rating" value={4.2} />);
    expect(el.getAttribute('role')).toBe('img');
    expect(el.getAttribute('aria-label')).toBe('4.2 out of 5 stars');
    // Every glyph is hidden, so a screen reader never spells the row out.
    expect(el.querySelector('.relative')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('takes a custom label', () => {
    const el = renderThemed(
      <RatingV4 data-testid="rating" value={4} label="Rated 4 by 12 people" />
    );
    expect(el.getAttribute('aria-label')).toBe('Rated 4 by 12 people');
  });

  it('sizes from the typography scale', () => {
    expect(renderThemed(<RatingV4 data-testid="rating" value={3} size="lg" />).className)
      .toContain('text-xl');
    expect(renderThemed(<RatingV4 data-testid="rating" value={3} size="sm" />).className)
      .toContain('text-sm');
  });

  it('shows the numeric value when asked', () => {
    const el = renderThemed(<RatingV4 data-testid="rating" value={4.2} showValue />);
    expect(el.textContent).toContain('4.2');
  });

  it('names no literal colour — every value is a token', () => {
    const el = renderThemed(<RatingV4 data-testid="rating" value={3.5} />);
    expect(el.outerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it('forwards its ref and extra DOM props', () => {
    let node: HTMLSpanElement | null = null;
    const el = renderThemed(
      <RatingV4
        data-testid="rating"
        value={3}
        title="rating"
        ref={(n) => {
          node = n;
        }}
      />
    );
    expect(node).toBe(el);
    expect(el.getAttribute('title')).toBe('rating');
  });
});
