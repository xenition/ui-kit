/** @jest-environment jsdom */
import * as React from 'react';
import { act, render } from '@testing-library/react';
import { PARALLAX_MAX_SPEED, ParallaxV4, clampParallaxSpeed } from './ParallaxV4';
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

let rafCallbacks: FrameRequestCallback[] = [];
let scrollListeners = 0;
let resizeListeners = 0;

const flushRaf = (): void => {
  const callbacks = rafCallbacks;
  rafCallbacks = [];
  callbacks.forEach((cb) => cb(0));
};

const realAdd = window.addEventListener.bind(window);
const realRemove = window.removeEventListener.bind(window);

beforeEach(() => {
  installMatchMedia(false);
  rafCallbacks = [];
  scrollListeners = 0;
  resizeListeners = 0;
  window.requestAnimationFrame = (cb: FrameRequestCallback): number => {
    rafCallbacks.push(cb);
    return rafCallbacks.length;
  };
  window.cancelAnimationFrame = () => undefined;
  window.addEventListener = ((type: string, ...args: unknown[]) => {
    if (type === 'scroll') scrollListeners += 1;
    if (type === 'resize') resizeListeners += 1;
    return (realAdd as unknown as (...a: unknown[]) => void)(type, ...args);
  }) as typeof window.addEventListener;
  window.removeEventListener = ((type: string, ...args: unknown[]) => {
    if (type === 'scroll') scrollListeners -= 1;
    if (type === 'resize') resizeListeners -= 1;
    return (realRemove as unknown as (...a: unknown[]) => void)(type, ...args);
  }) as typeof window.removeEventListener;
});

afterEach(() => {
  window.addEventListener = realAdd;
  window.removeEventListener = realRemove;
});

/**
 * A rect that MOVES with the transform, the way a browser's does.
 *
 * The mock used to return a fixed `top` no matter what the component had
 * written, which is not how `getBoundingClientRect()` behaves — it reports
 * where the element is *painted*, translate included. That gap is exactly what
 * hid a real bug: the component fed its own previous offset back into the next
 * measurement, so a layer asked for `speed 0.2` settled at 0.167 and one asked
 * for `-0.2` at -0.25. Measured in a browser, invisible to this spec.
 *
 * `top` here is the layer's UNTRANSFORMED position; the applied offset is added
 * on read, so the spec now exercises the feedback path.
 */
const mockRect = (el: HTMLElement, top: number, height: number): void => {
  el.getBoundingClientRect = () => {
    const applied = Number.parseFloat(el.style.getPropertyValue('--xen-parallax-v4-y')) || 0;
    const painted = top + applied;
    return {
      top: painted,
      height,
      bottom: painted + height,
      left: 0,
      right: 0,
      width: 100,
      x: 0,
      y: painted,
    } as DOMRect;
  };
};

const offsetOf = (el: HTMLElement): string => el.style.getPropertyValue('--xen-parallax-v4-y');

describe('ParallaxV4', () => {
  it('renders its children', () => {
    const { getByText } = render(<ParallaxV4>content</ParallaxV4>);
    expect(getByText('content')).toBeTruthy();
  });

  it('maps scroll position onto an offset custom property', () => {
    const { getByTestId } = render(
      <ParallaxV4 data-testid="p" speed={0.4}>
        content
      </ParallaxV4>
    );
    const el = getByTestId('p');
    mockRect(el, 0, 100);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });
    // (innerHeight/2 − elementCentre) * speed = (384 − 50) * 0.4
    expect(offsetOf(el)).toBe('133.60px');
  });

  it('declares the transform once so the mapping never rewrites it', () => {
    const { getByTestId } = render(<ParallaxV4 data-testid="p">content</ParallaxV4>);
    const el = getByTestId('p');
    const before = el.style.transform;
    mockRect(el, 0, 100);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });
    expect(before).toContain('var(--xen-parallax-v4-y');
    expect(el.style.transform).toBe(before);
  });

  it('lets a caller style override the transform deliberately', () => {
    const { getByTestId } = render(
      <ParallaxV4 data-testid="p" style={{ transform: 'scale(2)' }}>
        content
      </ParallaxV4>
    );
    expect(getByTestId('p').style.transform).toBe('scale(2)');
  });

  describe('the ±0.5 clamp', () => {
    it('clamps in both directions', () => {
      expect(PARALLAX_MAX_SPEED).toBe(0.5);
      expect(clampParallaxSpeed(5)).toBe(0.5);
      expect(clampParallaxSpeed(-5)).toBe(-0.5);
      expect(clampParallaxSpeed(0.2)).toBe(0.2);
    });

    it('applies the clamp to the rendered offset', () => {
      const { getByTestId } = render(
        <ParallaxV4 data-testid="p" speed={5}>
          content
        </ParallaxV4>
      );
      const el = getByTestId('p');
      mockRect(el, 0, 100);
      act(() => {
        window.dispatchEvent(new Event('scroll'));
        flushRaf();
      });
      // (384 − 50) * 0.5 — not * 5. Past half the page's travel the layer
      // reads as detached rather than deep.
      expect(offsetOf(el)).toBe('167.00px');
    });
  });

  it('re-evaluates on resize, which the base ignored', () => {
    const { getByTestId } = render(
      <ParallaxV4 data-testid="p" speed={0.4}>
        content
      </ParallaxV4>
    );
    const el = getByTestId('p');
    mockRect(el, 0, 100);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });
    expect(offsetOf(el)).toBe('133.60px');

    // A rotation halves the viewport with no scroll event to notice it.
    Object.defineProperty(window, 'innerHeight', { value: 384, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('resize'));
      flushRaf();
    });
    // (192 − 50) * 0.4
    expect(offsetOf(el)).toBe('56.80px');
    Object.defineProperty(window, 'innerHeight', { value: 768, configurable: true });
  });

  it('detaches both listeners on unmount', () => {
    const { unmount } = render(<ParallaxV4 speed={0.4}>content</ParallaxV4>);
    expect(scrollListeners).toBe(1);
    expect(resizeListeners).toBe(1);
    unmount();
    expect(scrollListeners).toBe(0);
    expect(resizeListeners).toBe(0);
  });

  describe('reduced motion', () => {
    it('attaches no listener at all rather than computing zero', () => {
      installMatchMedia(true);
      render(<ParallaxV4 speed={0.4}>content</ParallaxV4>);
      expect(scrollListeners).toBe(0);
      expect(resizeListeners).toBe(0);
    });

    it('leaves the layer at its natural position, with no transform and no will-change', () => {
      installMatchMedia(true);
      const { getByTestId } = render(
        <ParallaxV4 data-testid="p" speed={0.4}>
          content
        </ParallaxV4>
      );
      const el = getByTestId('p');
      mockRect(el, 0, 100);
      act(() => {
        window.dispatchEvent(new Event('scroll'));
        flushRaf();
      });
      // Nothing to fade to: a mapping switched off leaves a complete frame.
      expect(el.style.transform).toBe('');
      expect(el.style.willChange).toBe('');
      expect(offsetOf(el)).toBe('');
    });
  });

  describe('SSR / no-listener path', () => {
    it('renders to static markup without touching window', () => {
      const html = ssr().renderToStaticMarkup(<ParallaxV4 speed={0.4}>content</ParallaxV4>);
      expect(html).toContain('content');
      expect(html).toContain('data-xen-parallax-v4');
      // The fallback in the `var()` keeps the server frame at zero offset, so
      // the first client frame is identical.
      expect(html).toContain('var(--xen-parallax-v4-y, 0px)');
    });

    it('renders unchanged when the offset property was never written', () => {
      const { getByTestId } = render(<ParallaxV4 data-testid="p">content</ParallaxV4>);
      const el = getByTestId('p');
      // No scroll has happened yet; the declared transform resolves through the
      // `var()` fallback rather than being absent.
      expect(offsetOf(el)).toBe('');
      expect(el.style.transform).toContain('0px');
    });
  });
});

describe('ParallaxV4 — the feedback the browser exposed', () => {
  /**
   * The regression test for the bug the showcase found. Repeated scroll events
   * at a FIXED scroll position must not move the layer: if the measurement
   * still included the component's own transform, each pass would pull the
   * offset toward `f / (1 + f)` and the layer would drift for several events
   * after a jump-scroll.
   */
  it('settles on the first pass and does not drift on repeats', () => {
    const { getByTestId } = render(
      <ParallaxV4 data-testid="p" speed={0.4}>
        content
      </ParallaxV4>
    );
    const el = getByTestId('p');
    mockRect(el, 0, 100);

    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });
    const first = offsetOf(el);

    for (let i = 0; i < 5; i += 1) {
      act(() => {
        window.dispatchEvent(new Event('scroll'));
        flushRaf();
      });
    }
    expect(offsetOf(el)).toBe(first);
  });

  it('applies the factor it was given, not a factor damped by its own output', () => {
    const { getByTestId } = render(
      <ParallaxV4 data-testid="p" speed={0.4}>
        content
      </ParallaxV4>
    );
    const el = getByTestId('p');
    // Untransformed: top 0, height 100 → resting centre 50. Viewport 768 → centre 384.
    mockRect(el, 0, 100);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });
    // (384 - 50) * 0.4 = 133.60. Under the feedback bug this converged on
    // 0.4 / 1.4 = 0.286 of the distance instead, i.e. ~95.4.
    expect(offsetOf(el)).toBe('133.60px');
  });
});
