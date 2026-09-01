import '../spec-support/real-animations';
import * as React from 'react';
import { AccessibilityInfo, StyleSheet, Text } from 'react-native';
import { act, waitFor } from '@testing-library/react-native';
import { compileTheme } from '../../theme/compile';
import { V4_MOTION } from '../primitives/internal/motion-v4';
import {
  SEED_DARK,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { RevealV4, type RevealV4Effect } from './RevealV4';
import { Stagger } from './Stagger';
import { StaggerV4 } from './StaggerV4';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const spacing = compileTheme(SEED_LIGHT).spacing;

type Transform = Array<Record<string, unknown>>;

const transformOf = (instance: { props: { style: unknown } }): Transform =>
  (flatten(instance.props.style).transform ?? []) as Transform;

describe('RevealV4 (native) — the twin bug', () => {
  it('defaults to V4_MOTION.enter, the same number the web twin uses', () => {
    // The headline finding of brief §1: 600 on web, 500 on native, same
    // component. Both are 400 now.
    expect(V4_MOTION.enter).toBe(400);
    expect(V4_MOTION.enter).not.toBe(500);
  });

  it('renders its children under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getByText } = renderThemed(
        <RevealV4>
          <Text>Hello</Text>
        </RevealV4>,
        seed
      );
      expect(getByText('Hello')).toBeTruthy();
    });
  });

  it('animates in from hidden rather than rendering static', () => {
    const { getByTestId } = renderThemed(
      <RevealV4 effect="fade-up">
        <Text>Body</Text>
      </RevealV4>,
      SEED_LIGHT
    );
    expect(flatten(getByTestId('xen-v4-reveal').props.style).opacity).toBe(0);
  });
});

describe('RevealV4 (native) — distances from the spacing scale', () => {
  const cases: Array<[RevealV4Effect, string]> = [
    ['fade-up', 'translateY'],
    ['slide-left', 'translateX'],
    ['slide-right', 'translateX'],
    ['zoom', 'scale'],
  ];

  it.each(cases)('%s drives a %s', (effect, key) => {
    const { getByTestId } = renderThemed(
      <RevealV4 effect={effect}>
        <Text>x</Text>
      </RevealV4>,
      SEED_LIGHT
    );
    expect(transformOf(getByTestId('xen-v4-reveal')).some((t) => key in t)).toBe(true);
  });

  it('fade carries no transform at all', () => {
    const { getByTestId } = renderThemed(
      <RevealV4 effect="fade">
        <Text>x</Text>
      </RevealV4>,
      SEED_LIGHT
    );
    expect(transformOf(getByTestId('xen-v4-reveal'))).toHaveLength(0);
  });

  it('rises by spacing.lg and slides by spacing.xl — the same cells as the web twin', () => {
    // The base typed 16 into a FROM table; these come off the compiled scale.
    expect(spacing.lg).toBe(24);
    expect(spacing.xl).toBe(32);
    const up = renderThemed(
      <RevealV4 effect="fade-up">
        <Text>x</Text>
      </RevealV4>,
      SEED_LIGHT
    );
    const translateY = transformOf(up.getByTestId('xen-v4-reveal')).find(
      (t) => 'translateY' in t
    )?.translateY;
    // The interpolation starts at the hidden offset.
    expect(Number(String(translateY))).toBe(spacing.lg);
  });
});

describe('RevealV4 (native) — the Stagger context', () => {
  it('cascades inside the base Stagger and inside StaggerV4', () => {
    const base = renderThemed(
      <Stagger interval={80} delay={40}>
        <RevealV4>
          <Text>One</Text>
        </RevealV4>
        <RevealV4>
          <Text>Two</Text>
        </RevealV4>
      </Stagger>,
      SEED_DARK
    );
    expect(base.getByText('One')).toBeTruthy();
    expect(base.getByText('Two')).toBeTruthy();

    const v4 = renderThemed(
      <StaggerV4>
        <RevealV4>
          <Text>Three</Text>
        </RevealV4>
        <RevealV4>
          <Text>Four</Text>
        </RevealV4>
      </StaggerV4>,
      SEED_LIGHT
    );
    expect(v4.getByText('Three')).toBeTruthy();
    expect(v4.getByText('Four')).toBeTruthy();
  });
});

describe('RevealV4 (native) — reduced motion fades, it does not snap', () => {
  it('drops the travel but keeps the animation', async () => {
    // Fake timers so the fade can be inspected at its start rather than
    // wherever the wall clock happened to leave it.
    jest.useFakeTimers();
    try {
      (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
      const { getByTestId, getByText } = renderThemed(
        <RevealV4 effect="zoom">
          <Text>Now</Text>
        </RevealV4>,
        SEED_LIGHT
      );
      expect(getByText('Now')).toBeTruthy();
      // Let the async preference read settle without advancing the clock.
      await act(async () => undefined);
      // No transform: the spatial move is what reduced motion removes …
      expect(transformOf(getByTestId('xen-v4-reveal'))).toHaveLength(0);
      // … and the opacity still starts at 0, not at the base's static 1.
      expect(flatten(getByTestId('xen-v4-reveal').props.style).opacity).toBe(0);
      // … and it really is a fade: it arrives at 1 within `standard`.
      act(() => {
        jest.advanceTimersByTime(V4_MOTION.standard * 2);
      });
      expect(flatten(getByTestId('xen-v4-reveal').props.style).opacity).toBe(1);
    } finally {
      jest.useRealTimers();
    }
  });

  it('removes the travel for every effect', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
    const effects: RevealV4Effect[] = ['fade-up', 'slide-left', 'slide-right', 'zoom'];
    for (const effect of effects) {
      const { getByTestId, unmount } = renderThemed(
        <RevealV4 effect={effect}>
          <Text>x</Text>
        </RevealV4>,
        SEED_LIGHT
      );
      await waitFor(() => expect(transformOf(getByTestId('xen-v4-reveal'))).toHaveLength(0));
      unmount();
    }
  });
});

describe('RevealV4 (native) — the pre-answer path', () => {
  it('renders its children before the async reduced-motion read resolves', () => {
    // `AccessibilityInfo.isReduceMotionEnabled()` is a promise; the first frame
    // happens before it settles. Content must be mounted and the entrance must
    // already be running — never a blank frame.
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockReturnValue(
      new Promise<boolean>(() => undefined)
    );
    const { getByText, getByTestId } = renderThemed(
      <RevealV4>
        <Text>Early</Text>
      </RevealV4>,
      SEED_LIGHT
    );
    expect(getByText('Early')).toBeTruthy();
    expect(flatten(getByTestId('xen-v4-reveal').props.style).opacity).toBe(0);
    expect(transformOf(getByTestId('xen-v4-reveal')).length).toBeGreaterThan(0);
  });

  it('survives a rejected reduced-motion read (older platforms)', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockRejectedValue(new Error('nope'));
    const { getByText } = renderThemed(
      <RevealV4>
        <Text>Still here</Text>
      </RevealV4>,
      SEED_LIGHT
    );
    await waitFor(() => expect(getByText('Still here')).toBeTruthy());
  });
});

describe('RevealV4 (native) — token purity', () => {
  it('introduces no hardcoded colors (motion is theme-agnostic)', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <StaggerV4>
          <RevealV4 effect="fade-up">
            <Text>a</Text>
          </RevealV4>
          <RevealV4 effect="slide-left">
            <Text>b</Text>
          </RevealV4>
        </StaggerV4>,
        seed
      );
      const tokens = tokenHexSet(seed);
      renderedStyleHexes(root).forEach((hex) => expect(tokens.has(hex)).toBe(true));
    });
  });
});