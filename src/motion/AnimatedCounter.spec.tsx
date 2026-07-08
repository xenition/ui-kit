/** @jest-environment jsdom */
import { act, render } from '@testing-library/react';
import { AnimatedCounter } from './AnimatedCounter';
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

describe('AnimatedCounter', () => {
  it('renders the starting value before intersecting', () => {
    const { getByTestId } = render(<AnimatedCounter data-testid="c" to={500} />);
    expect(getByTestId('c').textContent).toBe('0');
  });

  it('counts up to the target once in view', () => {
    const { getByTestId } = render(
      <AnimatedCounter data-testid="c" to={500} duration={1000} />
    );
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0)); // first frame establishes the start time
    act(() => flushRaf(500));
    const midway = Number(getByTestId('c').textContent);
    expect(midway).toBeGreaterThan(0);
    expect(midway).toBeLessThan(500);
    act(() => flushRaf(1000));
    expect(getByTestId('c').textContent).toBe('500');
    expect(rafCallbacks).toHaveLength(0); // loop stops at completion
  });

  it('supports a custom starting value', () => {
    const { getByTestId } = render(<AnimatedCounter data-testid="c" from={50} to={90} />);
    expect(getByTestId('c').textContent).toBe('50');
  });

  it('formats with the provided format function', () => {
    const { getByTestId } = render(
      <AnimatedCounter
        data-testid="c"
        to={98.5}
        duration={100}
        format={(v) => `${v.toFixed(1)}%`}
      />
    );
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    act(() => flushRaf(100));
    expect(getByTestId('c').textContent).toBe('98.5%');
  });

  it('uses a locale-grouped default format', () => {
    const { getByTestId } = render(
      <AnimatedCounter data-testid="c" to={1234567} duration={100} />
    );
    act(() => lastObserver().trigger(true));
    act(() => flushRaf(0));
    act(() => flushRaf(100));
    expect(getByTestId('c').textContent).toBe('1,234,567');
  });

  it('shows the final value immediately under prefers-reduced-motion', () => {
    installMatchMedia(true);
    const { getByTestId } = render(<AnimatedCounter data-testid="c" to={500} />);
    expect(getByTestId('c').textContent).toBe('500');
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });
});
