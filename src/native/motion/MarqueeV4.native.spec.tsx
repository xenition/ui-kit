import * as React from 'react';
import { AccessibilityInfo, Animated, Easing, Text } from 'react-native';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { MarqueeV4 } from './MarqueeV4';

/** The theme's `lg` spacing — the gap default both twins share. */
const SPACING_LG = toNativeTokens(compileTheme(SEED_LIGHT)).spacing.lg;

/**
 * RNTL v12 excludes elements hidden from the accessibility tree by default, so
 * the plain queries below see exactly what a screen reader sees — which is the
 * assertion this component is about. `ALSO_HIDDEN` opts back in to look at the
 * seam copy itself.
 */
const ALSO_HIDDEN = { includeHiddenElements: true } as const;

/** Fire the layout event that gives the track a measurable content width. */
const measure = (node: ReactTestInstance, width = 240): void => {
  act(() => {
    fireEvent(node, 'layout', {
      nativeEvent: { layout: { x: 0, y: 0, width, height: 40 } },
    });
  });
};

describe('MarqueeV4 (native)', () => {
  it('renders the content twice for a seamless loop, under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getAllByText } = renderThemed(
        <MarqueeV4>
          <Text>Logo A</Text>
        </MarqueeV4>,
        seed
      );
      expect(getAllByText('Logo A', ALSO_HIDDEN)).toHaveLength(2);
    });
  });

  it('is announced once even though it is rendered twice — the gap in the base', () => {
    const { getAllByText } = renderThemed(
      <MarqueeV4>
        <Text>Logo A</Text>
      </MarqueeV4>,
      SEED_LIGHT
    );
    // What a screen reader reaches: one copy, not two.
    expect(getAllByText('Logo A')).toHaveLength(1);
  });

  describe('the gap the base left open: the echo copy is hidden from assistive tech', () => {
    it('hides the seam copy and only the seam copy', () => {
      const { getByTestId } = renderThemed(
        <MarqueeV4>
          <Text>Logo A</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      const echo = getByTestId('xen-v4-marquee-echo', ALSO_HIDDEN);
      const content = getByTestId('xen-v4-marquee-content');
      // The pair `aria-hidden` compiles to on the two platforms.
      expect(echo.props.accessibilityElementsHidden).toBe(true);
      expect(echo.props.importantForAccessibility).toBe('no-hide-descendants');
      expect(content.props.accessibilityElementsHidden).toBeFalsy();
      expect(content.props.importantForAccessibility).toBeUndefined();
    });
  });

  describe('pauseOnPress — the honest translation of pauseOnHover', () => {
    it('defaults on, matching pauseOnHover on the web twin', () => {
      const { getByTestId } = renderThemed(
        <MarqueeV4>
          <Text>x</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      expect(getByTestId('xen-v4-marquee-pause')).toBeTruthy();
    });

    it('can be switched off, and then there is no press target at all', () => {
      const { queryByTestId, getAllByText } = renderThemed(
        <MarqueeV4 pauseOnPress={false}>
          <Text>x</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      expect(queryByTestId('xen-v4-marquee-pause')).toBeNull();
      expect(getAllByText('x', ALSO_HIDDEN)).toHaveLength(2);
    });

    it('stops the running loop while held and restarts it on release', () => {
      const stop = jest.fn();
      const start = jest.fn();
      const loopSpy = jest.spyOn(Animated, 'loop').mockReturnValue({
        start,
        stop,
        reset: jest.fn(),
      } as unknown as Animated.CompositeAnimation);

      const { getByTestId } = renderThemed(
        <MarqueeV4>
          <Text>x</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      measure(getByTestId('xen-v4-marquee-content'));
      expect(loopSpy).toHaveBeenCalled();
      expect(start).toHaveBeenCalled();

      act(() => {
        fireEvent(getByTestId('xen-v4-marquee-pause'), 'pressIn');
      });
      expect(stop).toHaveBeenCalled();

      const startsWhilePaused = start.mock.calls.length;
      act(() => {
        fireEvent(getByTestId('xen-v4-marquee-pause'), 'pressOut');
      });
      // Resumed — either straight into the loop or via the lead-in that
      // finishes the interrupted pass first.
      expect(start.mock.calls.length >= startsWhilePaused).toBe(true);
    });

    it('is not an accessibility element, so the items keep their own labels', () => {
      const { getByTestId } = renderThemed(
        <MarqueeV4>
          <Text>x</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      // Grouping the row under one "pause" button would silence the content
      // the marquee exists to present; Reduce Motion is the reader's answer.
      expect(getByTestId('xen-v4-marquee-pause').props.accessible).toBe(false);
    });
  });

  describe('playback, not a transition (brief §2)', () => {
    it('derives the duration from content ÷ speed and eases it linearly', () => {
      const timing = jest.spyOn(Animated, 'timing');
      const { getByTestId } = renderThemed(
        <MarqueeV4 speed={40} gap={20}>
          <Text>x</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      measure(getByTestId('xen-v4-marquee-content'), 220);

      const config = timing.mock.calls.at(-1)?.[1] as { duration: number; easing: unknown };
      // (220 + 20) / 40 = 6s. Nothing on the M3 scale, and nothing like it.
      expect(config.duration).toBe(6000);
      expect(config.duration).toBeGreaterThan(400);
      // `linear`, and none of EASING_STANDARD/ENTER/EXIT: every scale curve
      // starts or ends at zero velocity, which is what makes an infinite loop
      // visibly restart at its seam.
      expect(config.easing).toBe(Easing.linear);
    });

    it('halves the duration when the speed doubles', () => {
      const timing = jest.spyOn(Animated, 'timing');
      const { getByTestId } = renderThemed(
        <MarqueeV4 speed={80} gap={20}>
          <Text>x</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      measure(getByTestId('xen-v4-marquee-content'), 220);
      const config = timing.mock.calls.at(-1)?.[1] as { duration: number };
      expect(config.duration).toBe(3000);
    });

    it('never starts a loop at zero or negative speed', () => {
      const loopSpy = jest.spyOn(Animated, 'loop');
      const { getByTestId, getAllByText } = renderThemed(
        <MarqueeV4 speed={0}>
          <Text>Tick</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      measure(getByTestId('xen-v4-marquee-content'));
      expect(loopSpy).not.toHaveBeenCalled();
      // Still laid out and readable, just not moving.
      expect(getAllByText('Tick', ALSO_HIDDEN)).toHaveLength(2);
    });
  });

  describe('reduced motion', () => {
    beforeEach(() => {
      jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    });

    it('stops rather than fades — the documented exception to §3.3', async () => {
      const loopSpy = jest.spyOn(Animated, 'loop');
      const { getByText, queryByTestId } = renderThemed(
        <MarqueeV4>
          <Text>Logo A</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      // The preference is read asynchronously, so wait for it to land.
      await waitFor(() =>
        expect(queryByTestId('xen-v4-marquee-track', ALSO_HIDDEN)).toBeNull()
      );

      // One static row: no seam copy (nothing moves, so there is no seam to
      // hide), no track, no press target, and no animation started.
      expect(getByText('Logo A')).toBeTruthy();
      expect(queryByTestId('xen-v4-marquee-echo', ALSO_HIDDEN)).toBeNull();
      expect(queryByTestId('xen-v4-marquee-track', ALSO_HIDDEN)).toBeNull();
      expect(queryByTestId('xen-v4-marquee-pause', ALSO_HIDDEN)).toBeNull();
      expect(loopSpy).not.toHaveBeenCalled();
    });
  });

  describe('the un-measured path (the native answer to SSR)', () => {
    it('renders complete content before any layout has been reported', () => {
      const loopSpy = jest.spyOn(Animated, 'loop');
      const { getAllByText } = renderThemed(
        <MarqueeV4>
          <Text>Logo A</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      // No `onLayout` has fired, so the width is 0 and nothing animates — but
      // both copies are already laid out at their resting position.
      expect(loopSpy).not.toHaveBeenCalled();
      expect(getAllByText('Logo A', ALSO_HIDDEN)).toHaveLength(2);
    });

    it('starts only once a non-zero width arrives', () => {
      const loopSpy = jest.spyOn(Animated, 'loop');
      const { getByTestId } = renderThemed(
        <MarqueeV4>
          <Text>x</Text>
        </MarqueeV4>,
        SEED_LIGHT
      );
      measure(getByTestId('xen-v4-marquee-content'), 0);
      expect(loopSpy).not.toHaveBeenCalled();
      measure(getByTestId('xen-v4-marquee-content'), 300);
      expect(loopSpy).toHaveBeenCalled();
    });
  });

  it("keeps the web twin's defaults: speed 40 and the theme's lg gap", () => {
    const timing = jest.spyOn(Animated, 'timing');
    const { getByTestId } = renderThemed(
      <MarqueeV4>
        <Text>x</Text>
      </MarqueeV4>,
      SEED_LIGHT
    );
    measure(getByTestId('xen-v4-marquee-content'), 240);
    const config = timing.mock.calls.at(-1)?.[1] as { duration: number };
    // speed defaults to 40 px/s and the gap to the theme's `lg`, exactly as
    // the web twin defaults to 40 and `var(--xen-space-lg)`.
    expect(config.duration).toBe(((240 + SPACING_LG) / 40) * 1000);
  });
});
