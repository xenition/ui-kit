/** @jest-environment jsdom */
import { act, render } from '@testing-library/react';
import { Reveal, RevealEffect } from './Reveal';
import { Stagger } from './Stagger';
import {
  MockIntersectionObserver,
  installMatchMedia,
  installMockIntersectionObserver,
} from '../spec-support/mock-io';

beforeEach(() => {
  installMockIntersectionObserver();
  installMatchMedia(false);
});

const lastObserver = (): MockIntersectionObserver => {
  const instance = MockIntersectionObserver.instances.at(-1);
  if (instance === undefined) throw new Error('no IntersectionObserver created');
  return instance;
};

describe('Reveal', () => {
  it('renders its children', () => {
    const { getByText } = render(<Reveal>hello</Reveal>);
    expect(getByText('hello')).toBeTruthy();
  });

  it('starts hidden (opacity 0) before intersecting', () => {
    const { getByTestId } = render(<Reveal data-testid="r">content</Reveal>);
    const el = getByTestId('r');
    expect(el.getAttribute('data-state')).toBe('hidden');
    expect(el.style.opacity).toBe('0');
  });

  it('becomes visible when the IntersectionObserver callback fires', () => {
    const { getByTestId } = render(<Reveal data-testid="r">content</Reveal>);
    act(() => lastObserver().trigger(true));
    const el = getByTestId('r');
    expect(el.getAttribute('data-state')).toBe('visible');
    expect(el.style.opacity).toBe('1');
    expect(el.style.transform).toBe('none');
  });

  it('stays visible after leaving the viewport when once=true (default)', () => {
    const { getByTestId } = render(<Reveal data-testid="r">content</Reveal>);
    const observer = lastObserver();
    act(() => observer.trigger(true));
    expect(observer.disconnected).toBe(true);
    act(() => observer.trigger(false));
    expect(getByTestId('r').getAttribute('data-state')).toBe('visible');
  });

  it('re-hides after leaving the viewport when once=false', () => {
    const { getByTestId } = render(
      <Reveal data-testid="r" once={false}>
        content
      </Reveal>
    );
    const observer = lastObserver();
    act(() => observer.trigger(true));
    expect(getByTestId('r').getAttribute('data-state')).toBe('visible');
    act(() => observer.trigger(false));
    expect(getByTestId('r').getAttribute('data-state')).toBe('hidden');
  });

  it('forwards the threshold to the IntersectionObserver', () => {
    render(<Reveal threshold={0.4}>content</Reveal>);
    expect(lastObserver().thresholds).toEqual([0.4]);
  });

  it('applies delay and duration to the CSS transition', () => {
    const { getByTestId } = render(
      <Reveal data-testid="r" delay={120} duration={450}>
        content
      </Reveal>
    );
    const el = getByTestId('r');
    expect(el.style.transition).toContain('450ms');
    expect(el.style.transitionDelay).toBe('120ms');
  });

  it('renders instantly, without observing, under prefers-reduced-motion', () => {
    installMatchMedia(true);
    const { getByTestId, getByText } = render(<Reveal data-testid="r">content</Reveal>);
    const el = getByTestId('r');
    expect(getByText('content')).toBeTruthy();
    expect(el.getAttribute('data-state')).toBe('visible');
    expect(el.style.opacity).toBe(''); // no inline motion styles at all
    expect(el.style.transition).toBe('');
    expect(MockIntersectionObserver.instances).toHaveLength(0);
  });

  const hiddenExpectations: Array<[RevealEffect, (el: HTMLElement) => void]> = [
    ['fade-up', (el) => expect(el.style.transform).toContain('24px')],
    ['fade', (el) => expect(el.style.transform).toBe('')],
    ['slide-left', (el) => expect(el.style.transform).toContain('-32px')],
    ['slide-right', (el) => expect(el.style.transform).toContain('32px')],
    ['zoom', (el) => expect(el.style.transform).toContain('scale(0.92)')],
    ['blur-in', (el) => expect(el.style.filter).toContain('blur(8px)')],
  ];

  it.each(hiddenExpectations)('renders the %s hidden state', (effect, assert) => {
    const { getByTestId } = render(
      <Reveal data-testid="r" effect={effect}>
        content
      </Reveal>
    );
    const el = getByTestId('r');
    expect(el.style.opacity).toBe('0');
    assert(el);
  });
});

describe('Stagger', () => {
  it('applies incremental delays to child Reveals', () => {
    const { getByTestId } = render(
      <Stagger interval={150} delay={50}>
        <Reveal data-testid="a">a</Reveal>
        <Reveal data-testid="b">b</Reveal>
        <Reveal data-testid="c" delay={10}>
          c
        </Reveal>
      </Stagger>
    );
    expect(getByTestId('a').style.transitionDelay).toBe('50ms');
    expect(getByTestId('b').style.transitionDelay).toBe('200ms');
    // own delay is additive on top of the stagger offset
    expect(getByTestId('c').style.transitionDelay).toBe('360ms');
  });

  it('renders non-Reveal children untouched', () => {
    const { getByText } = render(
      <Stagger>
        <p>plain</p>
        <Reveal>animated</Reveal>
      </Stagger>
    );
    expect(getByText('plain').style.transitionDelay).toBe('');
    // the Reveal is the second child (index 1), default interval 100ms
    expect(getByText('animated').style.transitionDelay).toBe('100ms');
  });
});
