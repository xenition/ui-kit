/** @jest-environment jsdom */
import { act, render } from '@testing-library/react';
import { AnimatedCounterV4, COUNT_MS } from './AnimatedCounterV4';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import {
  MockIntersectionObserver,
  installMatchMedia,
  installMockIntersectionObserver,
} from '../spec-support/mock-io';

let rafCallbacks: FrameRequestCallback[] = [];

const flushRaf = (time: number): void => {
  const callbacks = rafCallbacks;
  rafCallbacks = [];
  callbacks.forEach((cb) => cb(time));
};

beforeEach(() => {
  installMockIntersectionObserver();
  installMatchMedia(false);
  rafCallbacks = [];
  window.requestAnimationFrame = (cb: FrameRequestCallback): number => {
    rafCallbacks.push(cb);
    return rafCallbacks.length;
  };
  window.cancelAnimationFrame = () => undefined;
});

const lastObserver = (): MockIntersectionObserver => {
  const instance = MockIntersectionObserver.instances.at(-1);
  if (instance === undefined) throw new Error('no IntersectionObserver created');
  return instance;
};

const shown = (el: HTMLElement): string =>
  el.querySelector('[data-xen-v4-counter-value]')?.textContent ?? '';

const announced = (el: HTMLElement): string =>
  el.querySelector('[data-xen-v4-counter-announce]')?.textContent ?? '';

describe('AnimatedCounterV4 — playback, counted', () => {
  it('renders the starting value before intersecting', () => {
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={500} />);
    expect(shown(getByTestId('c'))).toBe('0');
  });

  it('counts up to the target once in view', () => {
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={500} duration={1000} />);
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    act(() => flushRaf(500));
    const midway = Number(shown(getByTestId('c')));
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(500);
    act(() => flushRaf(1000));
    expect(shown(getByTestId('c'))).toBe('500');
    expect(rafCallbacks).toHaveLength(0);
  });

  it('supports a custom starting value and format', () => {
    const { getByTestId } = render(
      <AnimatedCounterV4
        data-testid="c"
        from={50}
        to={98.5}
        duration={100}
        format={(v) => `${v.toFixed(1)}%`}
      />
    );
    expect(shown(getByTestId('c'))).toBe('50.0%');
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    act(() => flushRaf(100));
    expect(shown(getByTestId('c'))).toBe('98.5%');
  });

  it('uses a locale-grouped default format', () => {
    const { getByTestId } = render(
      <AnimatedCounterV4 data-testid="c" to={1234567} duration={100} />
    );
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    act(() => flushRaf(100));
    expect(shown(getByTestId('c'))).toBe('1,234,567');
  });
});

describe('AnimatedCounterV4 — the easing comes from the scale, the duration does not', () => {
  it('keeps the caller’s duration (brief §2: playback, not a transition)', () => {
    expect(COUNT_MS).toBe(1500);
    expect(COUNT_MS).not.toBe(V4_MOTION.enter);
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={100} />);
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    // Still mid-count at the scale's longest transition — the duration is the
    // content's, not the interface's.
    act(() => flushRaf(V4_MOTION.enter));
    expect(Number(shown(getByTestId('c')))).toBeLessThan(100);
    act(() => flushRaf(COUNT_MS));
    expect(shown(getByTestId('c'))).toBe('100');
  });

  it('decelerates on M3 emphasized-decelerate, not the base’s easeOutCubic', () => {
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={1000} duration={1000} />);
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    act(() => flushRaf(500));
    const half = Number(shown(getByTestId('c')));
    // Both curves are past halfway at t=0.5, but they are not the same curve:
    // easeOutCubic(0.5) = 0.875, cubic-bezier(0.05, 0.7, 0.1, 1)(0.5) ≈ 0.93.
    expect(half).toBeGreaterThan(875);
    expect(half).toBeLessThan(1000);
  });

  it('is monotonic and lands exactly on the target', () => {
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={100} duration={1000} />);
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    let previous = 0;
    [100, 250, 400, 600, 800, 950].forEach((t) => {
      act(() => flushRaf(t));
      const now = Number(shown(getByTestId('c')));
      expect(now).toBeGreaterThanOrEqual(previous);
      previous = now;
    });
    act(() => flushRaf(1000));
    expect(shown(getByTestId('c'))).toBe('100');
  });

  it('counts down as happily as up', () => {
    const { getByTestId } = render(
      <AnimatedCounterV4 data-testid="c" from={100} to={0} duration={100} />
    );
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    act(() => flushRaf(100));
    expect(shown(getByTestId('c'))).toBe('0');
  });
});

describe('AnimatedCounterV4 — announced once, not four thousand times', () => {
  it('marks the ticking text aria-hidden inside an aria-live="off" host', () => {
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={500} duration={1000} />);
    const host = getByTestId('c');
    expect(host.getAttribute('aria-live')).toBe('off');
    expect(
      host.querySelector('[data-xen-v4-counter-value]')?.getAttribute('aria-hidden')
    ).toBe('true');
  });

  it('says nothing while counting and the final value when it lands', () => {
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={4182} duration={1000} />);
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    act(() => flushRaf(400));
    expect(announced(getByTestId('c'))).toBe('');
    act(() => flushRaf(1000));
    expect(announced(getByTestId('c'))).toBe('4,182');
  });

  it('announces through a polite, visually hidden region', () => {
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={7} duration={0} />);
    act(() => lastObserver().trigger(true));
    const region = getByTestId('c').querySelector('[data-xen-v4-counter-announce]');
    expect(region?.getAttribute('aria-live')).toBe('polite');
    expect(region?.className).toContain('sr-only');
    expect(region?.textContent).toBe('7');
  });
});

describe('AnimatedCounterV4 — reduced motion and SSR', () => {
  it('shows and announces the final value immediately under reduced motion', () => {
    installMatchMedia(true);
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={500} />);
    expect(shown(getByTestId('c'))).toBe('500');
    expect(announced(getByTestId('c'))).toBe('500');
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  it('counts without an IntersectionObserver (SSR / ancient browser)', () => {
    delete (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver;
    const { getByTestId } = render(<AnimatedCounterV4 data-testid="c" to={42} duration={100} />);
    act(() => flushRaf(0));
    act(() => flushRaf(100));
    expect(shown(getByTestId('c'))).toBe('42');
    expect(announced(getByTestId('c'))).toBe('42');
  });

  it('does not throw when matchMedia is missing (server-shaped window)', () => {
    delete (window as { matchMedia?: unknown }).matchMedia;
    expect(() => render(<AnimatedCounterV4 to={1} />)).not.toThrow();
  });
});
