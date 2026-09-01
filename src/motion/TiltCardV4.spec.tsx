/** @jest-environment jsdom */
import * as React from 'react';
import { act, render } from '@testing-library/react';
import { TiltCardV4 } from './TiltCardV4';
import { EASE_STANDARD, V4_MOTION } from '../primitives/internal/v4-motion';
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
});

const mockRect = (el: HTMLElement): void => {
  el.getBoundingClientRect = () =>
    ({ top: 0, left: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0 }) as DOMRect;
};

const firePointer = (
  el: HTMLElement,
  type: 'pointermove' | 'pointerleave',
  init: { clientX?: number; clientY?: number; pointerType?: string } = {}
): void => {
  // React maps onPointerLeave to native pointerout with an external relatedTarget.
  const event =
    type === 'pointerleave'
      ? new Event('pointerout', { bubbles: true })
      : new Event('pointermove', { bubbles: true });
  Object.assign(event, { clientX: 0, clientY: 0, pointerType: 'mouse', ...init });
  if (type === 'pointerleave') {
    Object.defineProperty(event, 'relatedTarget', { value: document.body });
  }
  act(() => {
    el.dispatchEvent(event);
  });
};

/** The reset transition, spelled from the scale rather than typed by hand. */
const RESET = `transform ${V4_MOTION.standard}ms ${EASE_STANDARD}`;

describe('TiltCardV4', () => {
  it('renders its children', () => {
    const { getByText } = render(<TiltCardV4>content</TiltCardV4>);
    expect(getByText('content')).toBeTruthy();
  });

  it('tilts toward the pointer, clamped to maxTilt', () => {
    const { getByTestId } = render(
      <TiltCardV4 data-testid="t" maxTilt={8}>
        content
      </TiltCardV4>
    );
    const el = getByTestId('t');
    mockRect(el);
    firePointer(el, 'pointermove', { clientX: 100, clientY: 0 }); // top-right corner
    expect(el.style.transform).toBe('perspective(800px) rotateX(8.00deg) rotateY(8.00deg)');
  });

  it('clamps maxTilt at the 15° geometry ceiling', () => {
    const { getByTestId } = render(
      <TiltCardV4 data-testid="t" maxTilt={90}>
        content
      </TiltCardV4>
    );
    const el = getByTestId('t');
    mockRect(el);
    firePointer(el, 'pointermove', { clientX: 100, clientY: 0 });
    // 15, not 90: past ~15° the near edge stretches and the card reads broken.
    expect(el.style.transform).toBe('perspective(800px) rotateX(15.00deg) rotateY(15.00deg)');
  });

  describe('the reset takes the scale; tracking does not (brief §4)', () => {
    it('declares the reset transition from V4_MOTION.standard + EASE_STANDARD', () => {
      const { getByTestId } = render(<TiltCardV4 data-testid="t">content</TiltCardV4>);
      // 200ms and M3 standard, not the base's hand-picked `200ms ease-out`.
      expect(getByTestId('t').style.transition).toBe(RESET);
      expect(RESET).toContain('cubic-bezier(0.2, 0, 0, 1)');
    });

    it('drops the transition while tracking, so the card is not 200ms behind the cursor', () => {
      const { getByTestId } = render(<TiltCardV4 data-testid="t">content</TiltCardV4>);
      const el = getByTestId('t');
      mockRect(el);
      firePointer(el, 'pointermove', { clientX: 100, clientY: 0 });
      expect(el.style.transition).toBe('none');
    });

    it('puts the transition back for the return to flat', () => {
      const { getByTestId } = render(<TiltCardV4 data-testid="t">content</TiltCardV4>);
      const el = getByTestId('t');
      mockRect(el);
      firePointer(el, 'pointermove', { clientX: 100, clientY: 0 });
      expect(el.style.transform).not.toBe('');
      firePointer(el, 'pointerleave');
      expect(el.style.transform).toBe('');
      expect(el.style.transition).toBe(RESET);
    });
  });

  it('ignores touch pointers — the reason this component stays web-only', () => {
    const { getByTestId } = render(<TiltCardV4 data-testid="t">content</TiltCardV4>);
    const el = getByTestId('t');
    mockRect(el);
    firePointer(el, 'pointermove', { clientX: 100, clientY: 0, pointerType: 'touch' });
    expect(el.style.transform).toBe('');
  });

  it('ignores a pointer over a zero-sized element', () => {
    const { getByTestId } = render(<TiltCardV4 data-testid="t">content</TiltCardV4>);
    const el = getByTestId('t');
    el.getBoundingClientRect = () => ({ top: 0, left: 0, width: 0, height: 0 }) as DOMRect;
    firePointer(el, 'pointermove', { clientX: 10, clientY: 10 });
    expect(el.style.transform).toBe('');
  });

  it('still calls a caller pointer handler', () => {
    const onPointerMove = jest.fn();
    const onPointerLeave = jest.fn();
    const { getByTestId } = render(
      <TiltCardV4 data-testid="t" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        content
      </TiltCardV4>
    );
    const el = getByTestId('t');
    mockRect(el);
    firePointer(el, 'pointermove', { clientX: 100, clientY: 0 });
    firePointer(el, 'pointerleave');
    expect(onPointerMove).toHaveBeenCalledTimes(1);
    expect(onPointerLeave).toHaveBeenCalledTimes(1);
  });

  describe('reduced motion', () => {
    it('declares neither a transition nor a compositing layer', () => {
      installMatchMedia(true);
      const { getByTestId } = render(<TiltCardV4 data-testid="t">content</TiltCardV4>);
      const el = getByTestId('t');
      expect(el.style.transition).toBe('');
      expect(el.style.willChange).toBe('');
    });

    it('does not track the pointer, and leaves the card at its resting state', () => {
      installMatchMedia(true);
      const { getByTestId } = render(<TiltCardV4 data-testid="t">content</TiltCardV4>);
      const el = getByTestId('t');
      mockRect(el);
      firePointer(el, 'pointermove', { clientX: 100, clientY: 0 });
      // Nothing to fade to: the un-tilted card IS the resting state, so §3.3's
      // fade substitution does not apply here.
      expect(el.style.transform).toBe('');
      firePointer(el, 'pointerleave');
      expect(el.style.transition).toBe('');
    });
  });

  describe('SSR / no-pointer path', () => {
    it('renders to static markup without touching window', () => {
      const html = ssr().renderToStaticMarkup(<TiltCardV4>content</TiltCardV4>);
      expect(html).toContain('content');
      expect(html).toContain('data-xen-tilt-v4');
      // The reset transition ships in the server frame; no transform does.
      expect(html).toContain('transform 200ms');
      expect(html).not.toContain('perspective(');
    });

    it('needs no pointer event to render a complete, usable card', () => {
      const { getByTestId } = render(<TiltCardV4 data-testid="t">content</TiltCardV4>);
      expect(getByTestId('t').style.transform).toBe('');
    });
  });
});
