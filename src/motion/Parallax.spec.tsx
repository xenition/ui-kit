/** @jest-environment jsdom */
import { act, render } from '@testing-library/react';
import { Parallax } from './Parallax';
import { installMatchMedia } from '../spec-support/mock-io';

let rafCallbacks: FrameRequestCallback[] = [];

const flushRaf = (): void => {
  const callbacks = rafCallbacks;
  rafCallbacks = [];
  callbacks.forEach((cb) => cb(0));
};

beforeEach(() => {
  installMatchMedia(false);
  rafCallbacks = [];
  window.requestAnimationFrame = (cb: FrameRequestCallback): number => {
    rafCallbacks.push(cb);
    return rafCallbacks.length;
  };
  window.cancelAnimationFrame = () => undefined;
});

const mockRect = (el: HTMLElement, top: number, height: number): void => {
  el.getBoundingClientRect = () =>
    ({ top, height, bottom: top + height, left: 0, right: 0, width: 100, x: 0, y: top }) as DOMRect;
};

describe('Parallax', () => {
  it('renders its children', () => {
    const { getByText } = render(<Parallax>content</Parallax>);
    expect(getByText('content')).toBeTruthy();
  });

  it('translates on scroll via requestAnimationFrame', () => {
    const { getByTestId } = render(
      <Parallax data-testid="p" speed={0.4}>
        content
      </Parallax>
    );
    const el = getByTestId('p');
    mockRect(el, 0, 100);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });
    // offset = (innerHeight/2 - elementCenter) * speed = (384 - 50) * 0.4
    expect(el.style.transform).toBe('translate3d(0, 133.60px, 0)');
  });

  it('clamps speed to ±0.5', () => {
    const { getByTestId } = render(
      <Parallax data-testid="p" speed={5}>
        content
      </Parallax>
    );
    const el = getByTestId('p');
    mockRect(el, 0, 100);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });
    // (384 - 50) * 0.5 — not * 5
    expect(el.style.transform).toBe('translate3d(0, 167.00px, 0)');
  });

  it('is disabled under prefers-reduced-motion', () => {
    installMatchMedia(true);
    const { getByTestId } = render(
      <Parallax data-testid="p" speed={0.4}>
        content
      </Parallax>
    );
    const el = getByTestId('p');
    mockRect(el, 0, 100);
    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });
    expect(el.style.transform).toBe('');
  });
});
