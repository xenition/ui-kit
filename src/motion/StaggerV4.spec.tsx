/** @jest-environment jsdom */
import { render } from '@testing-library/react';
import { Reveal } from './Reveal';
import { RevealV4 } from './RevealV4';
import { StaggerV4, STAGGER_V4_MAX_DELAY } from './StaggerV4';
import { V4_MOTION } from '../primitives/internal/v4-motion';
import { installMatchMedia, installMockIntersectionObserver } from '../spec-support/mock-io';

beforeEach(() => {
  installMockIntersectionObserver();
  installMatchMedia(false);
});

const delays = (nodes: HTMLElement[]): string[] => nodes.map((n) => n.style.transitionDelay);

describe('StaggerV4 — the scale', () => {
  it('defaults its interval to V4_MOTION.quick', () => {
    const { getByTestId } = render(
      <StaggerV4>
        <RevealV4 data-testid="a">a</RevealV4>
        <RevealV4 data-testid="b">b</RevealV4>
        <RevealV4 data-testid="c">c</RevealV4>
      </StaggerV4>
    );
    expect(delays([getByTestId('a'), getByTestId('b'), getByTestId('c')])).toEqual([
      '0ms',
      `${V4_MOTION.quick}ms`,
      `${V4_MOTION.quick * 2}ms`,
    ]);
  });

  it('is the 100 the base already used, said properly', () => {
    expect(V4_MOTION.quick).toBe(100);
  });

  it('honours an explicit interval and base delay', () => {
    const { getByTestId } = render(
      <StaggerV4 interval={150} delay={50}>
        <RevealV4 data-testid="a">a</RevealV4>
        <RevealV4 data-testid="b">b</RevealV4>
      </StaggerV4>
    );
    expect(delays([getByTestId('a'), getByTestId('b')])).toEqual(['50ms', '200ms']);
  });

  it('adds a child’s own delay on top of the cascade offset', () => {
    const { getByTestId } = render(
      <StaggerV4 interval={150} delay={50}>
        <RevealV4 data-testid="a">a</RevealV4>
        <RevealV4 data-testid="b" delay={10}>
          b
        </RevealV4>
      </StaggerV4>
    );
    expect(getByTestId('b').style.transitionDelay).toBe('210ms');
  });
});

describe('StaggerV4 — the cap the base lacked', () => {
  const forty = Array.from({ length: 40 }, (_unused, i) => (
    <RevealV4 key={i} data-testid={`i${i}`}>
      {i}
    </RevealV4>
  ));

  it('caps the accumulated delay at STAGGER_V4_MAX_DELAY', () => {
    const { getByTestId } = render(<StaggerV4>{forty}</StaggerV4>);
    // Item 8 is the last one under the cap at the default 100ms interval.
    expect(getByTestId('i8').style.transitionDelay).toBe(`${STAGGER_V4_MAX_DELAY}ms`);
    expect(getByTestId('i39').style.transitionDelay).toBe(`${STAGGER_V4_MAX_DELAY}ms`);
  });

  it('is not the four seconds the base would have produced', () => {
    const { getByTestId } = render(<StaggerV4>{forty}</StaggerV4>);
    const last = Number(getByTestId('i39').style.transitionDelay.replace('ms', ''));
    expect(last).toBeLessThan(39 * V4_MOTION.quick);
    expect(last).toBe(800);
  });

  it('composes the cap from the scale', () => {
    expect(STAGGER_V4_MAX_DELAY).toBe(V4_MOTION.enter * 2);
  });

  it('takes an explicit maxDelay', () => {
    const { getByTestId } = render(
      <StaggerV4 maxDelay={200}>
        <RevealV4 data-testid="a">a</RevealV4>
        <RevealV4 data-testid="b">b</RevealV4>
        <RevealV4 data-testid="c">c</RevealV4>
        <RevealV4 data-testid="d">d</RevealV4>
      </StaggerV4>
    );
    expect(delays([getByTestId('a'), getByTestId('b'), getByTestId('c'), getByTestId('d')])).toEqual(
      ['0ms', '100ms', '200ms', '200ms']
    );
  });

  it('never caps the caller’s explicit base delay', () => {
    const { getByTestId } = render(
      <StaggerV4 delay={2000} maxDelay={100}>
        <RevealV4 data-testid="a">a</RevealV4>
        <RevealV4 data-testid="b">b</RevealV4>
        <RevealV4 data-testid="c">c</RevealV4>
      </StaggerV4>
    );
    expect(delays([getByTestId('a'), getByTestId('b'), getByTestId('c')])).toEqual([
      '2000ms',
      '2100ms',
      '2100ms',
    ]);
  });
});

describe('StaggerV4 — it bounds plain Reveals too', () => {
  it('caps a subtree of base Reveals, which could not read a cap of their own', () => {
    const { getByTestId } = render(
      <StaggerV4 maxDelay={150}>
        <Reveal data-testid="a">a</Reveal>
        <Reveal data-testid="b">b</Reveal>
        <Reveal data-testid="c">c</Reveal>
        <Reveal data-testid="d">d</Reveal>
      </StaggerV4>
    );
    expect(delays([getByTestId('a'), getByTestId('b'), getByTestId('c'), getByTestId('d')])).toEqual(
      ['0ms', '100ms', '150ms', '150ms']
    );
  });
});

describe('StaggerV4 — the base behaviour it keeps', () => {
  it('renders non-Reveal children untouched, and they still advance the index', () => {
    const { getByText } = render(
      <StaggerV4>
        <p>plain</p>
        <RevealV4>animated</RevealV4>
      </StaggerV4>
    );
    expect(getByText('plain').style.transitionDelay).toBe('');
    expect(getByText('animated').style.transitionDelay).toBe(`${V4_MOTION.quick}ms`);
  });

  it('forwards DOM props and a ref to the container', () => {
    const { getByTestId } = render(
      <StaggerV4 data-testid="s" className="grid" aria-label="list">
        <RevealV4>a</RevealV4>
      </StaggerV4>
    );
    const el = getByTestId('s');
    expect(el.className).toBe('grid');
    expect(el.getAttribute('aria-label')).toBe('list');
    expect(el.hasAttribute('data-xen-v4-stagger')).toBe(true);
  });

  it('renders with no children at all', () => {
    expect(() => render(<StaggerV4 />)).not.toThrow();
  });
});

describe('StaggerV4 — reduced motion and SSR', () => {
  it('still applies delays under reduced motion (a delayed fade is still a fade)', () => {
    installMatchMedia(true);
    const { getByTestId } = render(
      <StaggerV4>
        <RevealV4 data-testid="a">a</RevealV4>
        <RevealV4 data-testid="b">b</RevealV4>
      </StaggerV4>
    );
    expect(getByTestId('b').style.transitionDelay).toBe(`${V4_MOTION.quick}ms`);
    expect(getByTestId('b').style.transition).toContain(`${V4_MOTION.standard}ms`);
  });

  it('renders with no IntersectionObserver present', () => {
    delete (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver;
    const { getByTestId, getByText } = render(
      <StaggerV4>
        <RevealV4 data-testid="a">a</RevealV4>
        <RevealV4 data-testid="b">b</RevealV4>
      </StaggerV4>
    );
    expect(getByText('a')).toBeTruthy();
    // Visible immediately, but the cascade offsets are still on the elements.
    expect(getByTestId('a').getAttribute('data-state')).toBe('visible');
    expect(getByTestId('b').style.transitionDelay).toBe(`${V4_MOTION.quick}ms`);
  });
});
