/** @jest-environment jsdom */
import * as React from 'react';
import { render } from '@testing-library/react';
import { MarqueeV4 } from './MarqueeV4';
import { installMatchMedia } from '../spec-support/mock-io';

/**
 * `react-dom/server` reads `TextEncoder` at module scope and jsdom ships none,
 * so it is polyfilled and the module required lazily rather than imported.
 */
function ssr(): typeof import('react-dom/server') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const util = require('util') as typeof import('util');
  Object.assign(globalThis, { TextEncoder: util.TextEncoder, TextDecoder: util.TextDecoder });
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('react-dom/server') as typeof import('react-dom/server');
}

beforeEach(() => {
  installMatchMedia(false);
  document.head.innerHTML = '';
});

describe('MarqueeV4', () => {
  it('renders the content twice for a seamless loop', () => {
    const { getAllByText } = render(
      <MarqueeV4>
        <span>Logo A</span>
      </MarqueeV4>
    );
    expect(getAllByText('Logo A')).toHaveLength(2);
  });

  it('hides exactly one copy from assistive technology', () => {
    const { getAllByText } = render(
      <MarqueeV4>
        <span>Logo A</span>
      </MarqueeV4>
    );
    const hidden = getAllByText('Logo A').filter(
      (el) => el.closest('[aria-hidden="true"]') !== null
    );
    expect(hidden).toHaveLength(1);
  });

  describe('the gap prop (parity with the native twin)', () => {
    it('leaves the theme spacing in charge by default', () => {
      const { getByTestId } = render(<MarqueeV4 data-testid="m">x</MarqueeV4>);
      // No override: the sheet's `var(--xen-marquee-v4-gap, var(--xen-space-lg))`
      // falls through to the theme's `lg`, matching `tokens.spacing.lg` on native.
      expect(getByTestId('m').style.getPropertyValue('--xen-marquee-v4-gap')).toBe('');
    });

    it('overrides the spacing in px when given', () => {
      const { getByTestId } = render(
        <MarqueeV4 data-testid="m" gap={12}>
          x
        </MarqueeV4>
      );
      expect(getByTestId('m').style.getPropertyValue('--xen-marquee-v4-gap')).toBe('12px');
    });

    it('does not eat a caller style', () => {
      const { getByTestId } = render(
        <MarqueeV4 data-testid="m" gap={12} style={{ opacity: 0.5 }}>
          x
        </MarqueeV4>
      );
      const el = getByTestId('m');
      expect(el.style.getPropertyValue('--xen-marquee-v4-gap')).toBe('12px');
      expect(el.style.opacity).toBe('0.5');
    });
  });

  it('exposes pauseOnHover as a data attribute for the hover rule, defaulting on', () => {
    const { getByTestId, rerender } = render(<MarqueeV4 data-testid="m">x</MarqueeV4>);
    expect(getByTestId('m').getAttribute('data-pause-on-hover')).toBe('true');
    rerender(
      <MarqueeV4 data-testid="m" pauseOnHover={false}>
        x
      </MarqueeV4>
    );
    expect(getByTestId('m').getAttribute('data-pause-on-hover')).toBe('false');
  });

  it('injects its sheet exactly once, however many marquees mount', () => {
    render(<MarqueeV4>x</MarqueeV4>);
    render(<MarqueeV4>y</MarqueeV4>);
    expect(document.querySelectorAll('#xen-marquee-v4-styles')).toHaveLength(1);
  });

  describe('playback, not a transition (brief §2)', () => {
    it('keeps a linear timing function — an eased loop shows its seam', () => {
      render(<MarqueeV4>x</MarqueeV4>);
      const css = document.getElementById('xen-marquee-v4-styles')?.textContent ?? '';
      expect(css).toContain('animation-timing-function: linear');
      // None of the scale's curves may appear here; all of them start or end
      // at zero velocity, which is what makes a loop restart visibly.
      expect(css).not.toContain('cubic-bezier');
    });

    it('derives the duration rather than taking one off the scale', () => {
      const { container } = render(<MarqueeV4>x</MarqueeV4>);
      const track = container.querySelector<HTMLElement>('[data-xen-marquee-v4-track]');
      // Seconds, from content ÷ speed — never 100/200/400ms.
      expect(track?.style.animationDuration).toMatch(/^\d+(\.\d+)?s$/);
      expect(track?.style.animationDuration).not.toMatch(/ms$/);
    });

    it('re-derives the duration when the measured width says so', () => {
      const { container, rerender } = render(<MarqueeV4 speed={40}>x</MarqueeV4>);
      const track = container.querySelector<HTMLElement>('[data-xen-marquee-v4-track]');
      if (track === null) throw new Error('no track');
      Object.defineProperty(track, 'scrollWidth', { value: 800, configurable: true });
      // One copy is 400px; 400 / 20 = 20s, 400 / 40 = 10s.
      rerender(<MarqueeV4 speed={20}>x</MarqueeV4>);
      expect(track.style.animationDuration).toBe('20s');
      rerender(<MarqueeV4 speed={40}>x</MarqueeV4>);
      expect(track.style.animationDuration).toBe('10s');
    });
  });

  describe('reduced motion', () => {
    it('stops the loop rather than fading it — the documented exception to §3.3', () => {
      render(<MarqueeV4>x</MarqueeV4>);
      const css = document.getElementById('xen-marquee-v4-styles')?.textContent ?? '';
      expect(css).toContain('prefers-reduced-motion: reduce');
      expect(css).toContain('animation: none');
      // A loop has no still frame to fade to, so there is deliberately no
      // opacity transition in the reduced-motion block.
      expect(css).not.toContain('opacity');
    });

    it('still renders the content when the preference is set', () => {
      installMatchMedia(true);
      const { getAllByText } = render(
        <MarqueeV4>
          <span>Logo A</span>
        </MarqueeV4>
      );
      // The stop is CSS-only, so the markup is unchanged and nothing vanishes.
      expect(getAllByText('Logo A')).toHaveLength(2);
    });
  });

  describe('SSR / no-measurement path', () => {
    it('renders to static markup without a document, keeping the aria-hidden copy', () => {
      const html = ssr().renderToStaticMarkup(
        <MarqueeV4>
          <span>Logo A</span>
        </MarqueeV4>
      );
      expect(html.match(/Logo A/g)).toHaveLength(2);
      expect(html).toContain('aria-hidden="true"');
      // The measuring effect has not run, so the fallback duration ships.
      expect(html).toContain('animation-duration:24s');
    });

    it('uses the fallback duration until the track can be measured', () => {
      // jsdom reports scrollWidth 0, so the effect never overwrites the default.
      const { container } = render(<MarqueeV4>x</MarqueeV4>);
      const track = container.querySelector<HTMLElement>('[data-xen-marquee-v4-track]');
      expect(track?.style.animationDuration).toBe('24s');
    });
  });
});
