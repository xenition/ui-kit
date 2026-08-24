/** @jest-environment jsdom */
import { act, render } from '@testing-library/react';
import { TiltCard } from './TiltCard';
import { installMatchMedia } from '../spec-support/mock-io';

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

describe('TiltCard', () => {
  it('renders its children', () => {
    const { getByText } = render(<TiltCard>content</TiltCard>);
    expect(getByText('content')).toBeTruthy();
  });

  it('tilts toward the pointer, clamped to maxTilt', () => {
    const { getByTestId } = render(
      <TiltCard data-testid="t" maxTilt={8}>
        content
      </TiltCard>
    );
    const el = getByTestId('t');
    mockRect(el);
    firePointer(el, 'pointermove', { clientX: 100, clientY: 0 }); // top-right corner
    expect(el.style.transform).toBe('perspective(800px) rotateX(8.00deg) rotateY(8.00deg)');
  });

  it('resets the tilt on pointer leave', () => {
    const { getByTestId } = render(<TiltCard data-testid="t">content</TiltCard>);
    const el = getByTestId('t');
    mockRect(el);
    firePointer(el, 'pointermove', { clientX: 100, clientY: 0 });
    expect(el.style.transform).not.toBe('');
    firePointer(el, 'pointerleave');
    expect(el.style.transform).toBe('');
  });

  it('ignores touch pointers', () => {
    const { getByTestId } = render(<TiltCard data-testid="t">content</TiltCard>);
    const el = getByTestId('t');
    mockRect(el);
    firePointer(el, 'pointermove', { clientX: 100, clientY: 0, pointerType: 'touch' });
    expect(el.style.transform).toBe('');
  });

  it('is disabled under prefers-reduced-motion', () => {
    installMatchMedia(true);
    const { getByTestId } = render(<TiltCard data-testid="t">content</TiltCard>);
    const el = getByTestId('t');
    mockRect(el);
    firePointer(el, 'pointermove', { clientX: 100, clientY: 0 });
    expect(el.style.transform).toBe('');
    expect(el.style.transition).toBe('');
  });
});
