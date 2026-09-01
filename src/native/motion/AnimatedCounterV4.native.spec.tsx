import '../spec-support/real-animations';
import * as React from 'react';
import { AccessibilityInfo, StyleSheet } from 'react-native';
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
import { AnimatedCounterV4, COUNT_MS } from './AnimatedCounterV4';

const flatten = (style: unknown): Record<string, unknown> =>
  (StyleSheet.flatten(style as never) ?? {}) as Record<string, unknown>;

const text = (instance: { children: unknown[] }): string => String(instance.children.join(''));

describe('AnimatedCounterV4 (native) — playback, counted', () => {
  it('renders the starting value first', () => {
    const { getByTestId } = renderThemed(<AnimatedCounterV4 to={500} />, SEED_LIGHT);
    expect(text(getByTestId('xen-v4-counter'))).toBe('0');
  });

  it('counts up to the target', () => {
    jest.useFakeTimers();
    try {
      const { getByTestId } = renderThemed(
        <AnimatedCounterV4 to={500} duration={1000} />,
        SEED_LIGHT
      );
      act(() => {
        jest.advanceTimersByTime(500);
      });
      const midway = Number(text(getByTestId('xen-v4-counter')));
      expect(midway).toBeGreaterThan(0);
      expect(midway).toBeLessThan(500);
      act(() => {
        jest.advanceTimersByTime(600);
      });
      expect(text(getByTestId('xen-v4-counter'))).toBe('500');
    } finally {
      jest.useRealTimers();
    }
  });

  it('supports a custom starting value and format', () => {
    const { getByTestId } = renderThemed(
      <AnimatedCounterV4 from={50} to={98.5} format={(v) => `${v.toFixed(1)}%`} />,
      SEED_LIGHT
    );
    expect(text(getByTestId('xen-v4-counter'))).toBe('50.0%');
  });

  it('uses a locale-grouped default format at the end of the count', () => {
    jest.useFakeTimers();
    try {
      const { getByTestId } = renderThemed(
        <AnimatedCounterV4 to={1234567} duration={100} />,
        SEED_DARK
      );
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(text(getByTestId('xen-v4-counter'))).toBe('1,234,567');
    } finally {
      jest.useRealTimers();
    }
  });
});

describe('AnimatedCounterV4 (native) — the easing comes from the scale', () => {
  it('decelerates harder than the base’s Easing.out(Easing.cubic)', () => {
    // `motion-v4.ts` names `Easing.out(Easing.cubic)` as what the line reached
    // for before the scale existed. M3 emphasized-decelerate is a different,
    // stronger curve: at the halfway point it is past 0.9, where ease-out-cubic
    // is at 0.875.
    jest.useFakeTimers();
    try {
      const { getByTestId } = renderThemed(
        <AnimatedCounterV4 to={1000} duration={1000} />,
        SEED_LIGHT
      );
      act(() => {
        jest.advanceTimersByTime(500);
      });
      const half = Number(text(getByTestId('xen-v4-counter')).replace(/,/g, ''));
      expect(half).toBeGreaterThan(875);
      expect(half).toBeLessThan(1000);
    } finally {
      jest.useRealTimers();
    }
  });

  it('keeps the caller’s duration — playback, not a transition (brief §2)', () => {
    expect(COUNT_MS).toBe(1500);
    expect(COUNT_MS).not.toBe(V4_MOTION.enter);
  });

  it('agrees with the web twin on the default duration', () => {
    // Brief §3 rule 4. The `Reveal` 600/500 split is the bug this exists for.
    expect(COUNT_MS).toBe(1500);
  });

  it('renders the final value immediately at duration 0', () => {
    const { getByTestId } = renderThemed(<AnimatedCounterV4 to={12} duration={0} />, SEED_LIGHT);
    expect(text(getByTestId('xen-v4-counter'))).toBe('12');
  });

  it('counts down as happily as up', () => {
    jest.useFakeTimers();
    try {
      const { getByTestId } = renderThemed(
        <AnimatedCounterV4 from={100} to={0} duration={100} />,
        SEED_LIGHT
      );
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(text(getByTestId('xen-v4-counter'))).toBe('0');
    } finally {
      jest.useRealTimers();
    }
  });
});

describe('AnimatedCounterV4 (native) — announced once, not four thousand times', () => {
  it('labels itself with the FINAL value from the first frame', () => {
    const { getByTestId } = renderThemed(<AnimatedCounterV4 to={4182} />, SEED_LIGHT);
    const el = getByTestId('xen-v4-counter');
    expect(el.props.accessibilityLabel).toBe('4,182');
    // …while the visible text is still at the start of the count.
    expect(text(el)).toBe('0');
  });

  it('keeps the live region silent while counting and speaks once at the end', () => {
    jest.useFakeTimers();
    try {
      const { getByTestId } = renderThemed(
        <AnimatedCounterV4 to={4182} duration={1000} />,
        SEED_LIGHT
      );
      expect(getByTestId('xen-v4-counter').props.accessibilityLiveRegion).toBe('none');
      act(() => {
        jest.advanceTimersByTime(400);
      });
      expect(getByTestId('xen-v4-counter').props.accessibilityLiveRegion).toBe('none');
      act(() => {
        jest.advanceTimersByTime(800);
      });
      expect(getByTestId('xen-v4-counter').props.accessibilityLiveRegion).toBe('polite');
      expect(text(getByTestId('xen-v4-counter'))).toBe('4,182');
    } finally {
      jest.useRealTimers();
    }
  });

  it('honours a custom format in the label too', () => {
    const { getByTestId } = renderThemed(
      <AnimatedCounterV4 to={98.5} format={(v) => `${v.toFixed(1)} percent`} />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-v4-counter').props.accessibilityLabel).toBe('98.5 percent');
  });
});

describe('AnimatedCounterV4 (native) — reduced motion and the pre-answer path', () => {
  it('shows and announces the final value immediately under reduced motion', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
    const { getByTestId } = renderThemed(<AnimatedCounterV4 to={500} />, SEED_LIGHT);
    await waitFor(() => expect(text(getByTestId('xen-v4-counter'))).toBe('500'));
    expect(getByTestId('xen-v4-counter').props.accessibilityLiveRegion).toBe('polite');
    expect(getByTestId('xen-v4-counter').props.accessibilityLabel).toBe('500');
  });

  it('renders the start value before the async reduced-motion read resolves', () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockReturnValue(
      new Promise<boolean>(() => undefined)
    );
    const { getByTestId } = renderThemed(<AnimatedCounterV4 from={7} to={9} />, SEED_LIGHT);
    // Never blank, and never the wrong number: it starts where it was told to.
    expect(text(getByTestId('xen-v4-counter'))).toBe('7');
    expect(getByTestId('xen-v4-counter').props.accessibilityLabel).toBe('9');
  });

  it('survives a rejected reduced-motion read (older platforms)', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockRejectedValue(new Error('nope'));
    const { getByTestId } = renderThemed(<AnimatedCounterV4 to={3} duration={0} />, SEED_LIGHT);
    await waitFor(() => expect(text(getByTestId('xen-v4-counter'))).toBe('3'));
  });
});

describe('AnimatedCounterV4 (native) — colour', () => {
  it('defaults to onSurface and lets an explicit colour win', () => {
    const { getByTestId } = renderThemed(<AnimatedCounterV4 to={1} />, SEED_DARK);
    const dark = compileTheme(SEED_DARK).dark;
    expect(flatten(getByTestId('xen-v4-counter').props.style).color).toBe(dark.onSurface);

    const override = renderThemed(
      <AnimatedCounterV4 to={1} style={{ color: dark.primary }} />,
      SEED_DARK
    );
    expect(flatten(override.getByTestId('xen-v4-counter').props.style).color).toBe(dark.primary);
  });

  it('introduces no hardcoded colors', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(<AnimatedCounterV4 to={42} />, seed);
      const tokens = tokenHexSet(seed);
      renderedStyleHexes(root).forEach((hex) => expect(tokens.has(hex)).toBe(true));
    });
  });
});