/** @jest-environment jsdom */
import { act, render } from '@testing-library/react';
import { RevealV4, type RevealV4Effect } from './RevealV4';
import { Reveal } from './Reveal';
import { Stagger } from './Stagger';
import { StaggerV4 } from './StaggerV4';
import { V4_MOTION, EASE_ENTER, EASE_STANDARD } from '../primitives/internal/v4-motion';
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

describe('RevealV4 — the scale', () => {
  it('defaults to V4_MOTION.enter, not the base 600', () => {
    const { getByTestId } = render(<RevealV4 data-testid="r">content</RevealV4>);
    const transition = getByTestId('r').style.transition;
    expect(transition).toContain(`${V4_MOTION.enter}ms`);
    expect(transition).not.toContain('600ms');
  });

  it('is the same default the native twin uses (400)', () => {
    expect(V4_MOTION.enter).toBe(400);
  });

  it('eases on EASE_ENTER — an arrival', () => {
    const { getByTestId } = render(<RevealV4 data-testid="r">content</RevealV4>);
    expect(getByTestId('r').style.transition).toContain(EASE_ENTER);
  });

  it('honours an explicit duration and delay', () => {
    const { getByTestId } = render(
      <RevealV4 data-testid="r" delay={120} duration={450}>
        content
      </RevealV4>
    );
    const el = getByTestId('r');
    expect(el.style.transition).toContain('450ms');
    expect(el.style.transitionDelay).toBe('120ms');
  });
});

describe('RevealV4 — distances from the spacing scale', () => {
  const hidden: Array<[RevealV4Effect, string]> = [
    ['fade-up', 'var(--xen-space-lg)'],
    ['slide-left', 'var(--xen-space-xl)'],
    ['slide-right', 'var(--xen-space-xl)'],
  ];

  it.each(hidden)('%s starts at %s, not a literal px', (effect, token) => {
    const { getByTestId } = render(
      <RevealV4 data-testid="r" effect={effect}>
        content
      </RevealV4>
    );
    const transform = getByTestId('r').getAttribute('style') ?? '';
    expect(transform).toContain(token);
    expect(transform).not.toContain('24px');
    expect(transform).not.toContain('32px');
  });

  it('leaves fade with no transform and zoom/blur on their geometry constants', () => {
    const fade = render(
      <RevealV4 data-testid="f" effect="fade">
        c
      </RevealV4>
    );
    expect(fade.getByTestId('f').style.transform).toBe('');

    const zoom = render(
      <RevealV4 data-testid="z" effect="zoom">
        c
      </RevealV4>
    );
    expect(zoom.getByTestId('z').style.transform).toContain('scale(0.92)');

    const blur = render(
      <RevealV4 data-testid="b" effect="blur-in">
        c
      </RevealV4>
    );
    expect(blur.getByTestId('b').style.filter).toContain('blur(8px)');
  });
});

describe('RevealV4 — the base behaviour it keeps', () => {
  it('renders its children', () => {
    const { getByText } = render(<RevealV4>hello</RevealV4>);
    expect(getByText('hello')).toBeTruthy();
  });

  it('starts hidden and becomes visible on intersection', () => {
    const { getByTestId } = render(<RevealV4 data-testid="r">content</RevealV4>);
    expect(getByTestId('r').getAttribute('data-state')).toBe('hidden');
    expect(getByTestId('r').style.opacity).toBe('0');
    act(() => lastObserver().trigger(true));
    expect(getByTestId('r').getAttribute('data-state')).toBe('visible');
    expect(getByTestId('r').style.opacity).toBe('1');
    expect(getByTestId('r').style.transform).toBe('none');
  });

  it('stays visible after leaving the viewport when once=true (default)', () => {
    const { getByTestId } = render(<RevealV4 data-testid="r">content</RevealV4>);
    const observer = lastObserver();
    act(() => observer.trigger(true));
    expect(observer.disconnected).toBe(true);
    act(() => observer.trigger(false));
    expect(getByTestId('r').getAttribute('data-state')).toBe('visible');
  });

  it('re-hides when once=false', () => {
    const { getByTestId } = render(
      <RevealV4 data-testid="r" once={false}>
        content
      </RevealV4>
    );
    const observer = lastObserver();
    act(() => observer.trigger(true));
    expect(getByTestId('r').getAttribute('data-state')).toBe('visible');
    act(() => observer.trigger(false));
    expect(getByTestId('r').getAttribute('data-state')).toBe('hidden');
  });

  it('forwards the threshold to the IntersectionObserver', () => {
    render(<RevealV4 threshold={0.4}>content</RevealV4>);
    expect(lastObserver().thresholds).toEqual([0.4]);
  });

  it('reads the base Stagger context, and StaggerV4s', () => {
    const base = render(
      <Stagger interval={150} delay={50}>
        <RevealV4 data-testid="a">a</RevealV4>
        <RevealV4 data-testid="b">b</RevealV4>
      </Stagger>
    );
    expect(base.getByTestId('a').style.transitionDelay).toBe('50ms');
    expect(base.getByTestId('b').style.transitionDelay).toBe('200ms');

    const v4 = render(
      <StaggerV4 interval={150} delay={50}>
        <RevealV4 data-testid="c">c</RevealV4>
        <RevealV4 data-testid="d">d</RevealV4>
      </StaggerV4>
    );
    expect(v4.getByTestId('c').style.transitionDelay).toBe('50ms');
    expect(v4.getByTestId('d').style.transitionDelay).toBe('200ms');
  });
});

describe('RevealV4 — reduced motion fades, it does not snap', () => {
  it('keeps a transition, at standard, with no travel', () => {
    installMatchMedia(true);
    const { getByTestId } = render(
      <RevealV4 data-testid="r" effect="fade-up">
        content
      </RevealV4>
    );
    const el = getByTestId('r');
    expect(el.getAttribute('data-reduced')).toBe('true');
    // A transition still exists — brief §3 rule 3 / design.md §36.10.
    expect(el.style.transition).toContain(`${V4_MOTION.standard}ms`);
    expect(el.style.transition).toContain(EASE_STANDARD);
    expect(el.style.transition).not.toContain(`${V4_MOTION.enter}ms`);
    // …but it is a pure fade: no transform, no filter.
    expect(el.style.transform).toBe('');
    expect(el.style.filter).toBe('');
    expect(el.style.opacity).toBe('0');
  });

  it('drops the travel for every effect, not just fade-up', () => {
    installMatchMedia(true);
    const effects: RevealV4Effect[] = ['slide-left', 'slide-right', 'zoom', 'blur-in'];
    effects.forEach((effect) => {
      const { getByTestId, unmount } = render(
        <RevealV4 data-testid="r" effect={effect}>
          content
        </RevealV4>
      );
      expect(getByTestId('r').style.transform).toBe('');
      expect(getByTestId('r').style.filter).toBe('');
      unmount();
    });
  });

  it('still observes, so the fade is triggered by the same scroll', () => {
    installMatchMedia(true);
    const { getByTestId } = render(<RevealV4 data-testid="r">content</RevealV4>);
    expect(MockIntersectionObserver.instances.length).toBeGreaterThan(0);
    act(() => lastObserver().trigger(true));
    expect(getByTestId('r').style.opacity).toBe('1');
  });
});

describe('RevealV4 — SSR / no IntersectionObserver', () => {
  it('renders visible immediately when IntersectionObserver is missing', () => {
    delete (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver;
    const { getByTestId, getByText } = render(<RevealV4 data-testid="r">content</RevealV4>);
    expect(getByText('content')).toBeTruthy();
    expect(getByTestId('r').getAttribute('data-state')).toBe('visible');
    expect(getByTestId('r').style.opacity).toBe('1');
  });

  it('does not throw when matchMedia is missing (server-shaped window)', () => {
    delete (window as { matchMedia?: unknown }).matchMedia;
    expect(() => render(<RevealV4>content</RevealV4>)).not.toThrow();
  });
});

describe('RevealV4 — additive', () => {
  it('leaves the base Reveal exactly as it was (600ms, snap under reduced motion)', () => {
    const { getByTestId } = render(<Reveal data-testid="r">content</Reveal>);
    expect(getByTestId('r').style.transition).toContain('600ms');
  });
});
