import * as React from 'react';
import { AccessibilityInfo, Animated, Dimensions, Text } from 'react-native';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { PARALLAX_MAX_SPEED, ParallaxV4, clampParallaxSpeed } from './ParallaxV4';

const WINDOW_HEIGHT = Dimensions.get('window').height;

/** Report the layer's position inside the scroll content. */
const layout = (node: ReactTestInstance, y: number, height: number): void => {
  act(() => {
    fireEvent(node, 'layout', { nativeEvent: { layout: { x: 0, y, width: 320, height } } });
  });
};

/** Flatten a possibly-nested RN style prop. */
function flatten(style: unknown, out: Record<string, unknown>): Record<string, unknown> {
  if (Array.isArray(style)) style.forEach((s) => flatten(s, out));
  else if (style && typeof style === 'object') Object.assign(out, style);
  return out;
}

/** The layer's current `translateY` in px, or `null` when it declares none. */
function translateOf(node: ReactTestInstance): number | null {
  const style = flatten(node.props.style, {});
  const transform = style.transform as Array<Record<string, unknown>> | undefined;
  if (transform === undefined) return null;
  const entry = transform.find((t) => 'translateY' in t);
  if (entry === undefined) return null;
  const value = entry.translateY as number | { __getValue: () => number };
  return typeof value === 'number' ? value : value.__getValue();
}

/** offset = (viewportCentre − layerCentreOnScreen) × factor, exactly as on web. */
const expected = (scroll: number, y: number, height: number, factor: number): number =>
  (WINDOW_HEIGHT / 2 - (y + height / 2 - scroll)) * factor;

describe('ParallaxV4 (native)', () => {
  it('renders its children under both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const scrollY = new Animated.Value(0);
      const { getByText } = renderThemed(
        <ParallaxV4 scrollY={scrollY}>
          <Text>layer</Text>
        </ParallaxV4>,
        seed
      );
      expect(getByText('layer')).toBeTruthy();
    });
  });

  describe('the mapping (the same one the web twin computes)', () => {
    it('rests at zero when the layer is centred on screen', () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} speed={0.4}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      const height = 100;
      layout(getByTestId('p'), WINDOW_HEIGHT / 2 - height / 2, height);
      expect(translateOf(getByTestId('p'))).toBeCloseTo(0, 5);
    });

    it('tracks the scroll offset it is given', () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} speed={0.4}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      layout(getByTestId('p'), 0, 100);
      expect(translateOf(getByTestId('p'))).toBeCloseTo(expected(0, 0, 100, 0.4), 5);

      act(() => scrollY.setValue(500));
      expect(translateOf(getByTestId('p'))).toBeCloseTo(expected(500, 0, 100, 0.4), 5);
    });

    it('extrapolates past the interpolation range, so a long scroll keeps working', () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} speed={0.3}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      layout(getByTestId('p'), 200, 400);
      act(() => scrollY.setValue(8000));
      expect(translateOf(getByTestId('p'))).toBeCloseTo(expected(8000, 200, 400, 0.3), 5);
    });

    it('reverses direction for a negative speed', () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} speed={-0.3}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      layout(getByTestId('p'), 0, 100);
      act(() => scrollY.setValue(400));
      expect(translateOf(getByTestId('p'))).toBeCloseTo(expected(400, 0, 100, -0.3), 5);
    });
  });

  describe('the ±0.5 clamp, carried over from web with its reason', () => {
    it('clamps in both directions', () => {
      expect(PARALLAX_MAX_SPEED).toBe(0.5);
      expect(clampParallaxSpeed(5)).toBe(0.5);
      expect(clampParallaxSpeed(-5)).toBe(-0.5);
      expect(clampParallaxSpeed(0.2)).toBe(0.2);
    });

    it('applies the clamp to the rendered offset', () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} speed={5}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      layout(getByTestId('p'), 0, 100);
      act(() => scrollY.setValue(300));
      // × 0.5, not × 5. Past half the scroll's travel the layer stops reading
      // as depth and starts reading as detached from the page.
      expect(translateOf(getByTestId('p'))).toBeCloseTo(expected(300, 0, 100, 0.5), 5);
    });
  });

  it('defaults speed to 0.2, matching the web twin', () => {
    const scrollY = new Animated.Value(0);
    const { getByTestId } = renderThemed(
      <ParallaxV4 testID="p" scrollY={scrollY}>
        <Text>layer</Text>
      </ParallaxV4>,
      SEED_LIGHT
    );
    layout(getByTestId('p'), 0, 100);
    act(() => scrollY.setValue(250));
    expect(translateOf(getByTestId('p'))).toBeCloseTo(expected(250, 0, 100, 0.2), 5);
  });

  it('does not own a scroll container — the caller keeps their ScrollView', () => {
    const scrollY = new Animated.Value(0);
    const { UNSAFE_root, getByText } = renderThemed(
      <ParallaxV4 testID="p" scrollY={scrollY}>
        <Text>layer</Text>
      </ParallaxV4>,
      SEED_LIGHT
    );
    // A parallax that mounted its own ScrollView would nest scrollers inside
    // the screen it is placed in; the whole design is that it does not.
    const scrollers = UNSAFE_root.findAll((n) => String(n.type).includes('ScrollView'));
    expect(scrollers).toHaveLength(0);
    expect(getByText('layer')).toBeTruthy();
  });

  describe('reduced motion', () => {
    beforeEach(() => {
      jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    });

    it('declares no transform at all rather than an interpolation resolving to zero', async () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} speed={0.4}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      layout(getByTestId('p'), 0, 100);
      // The preference is read asynchronously, so wait for it to land.
      await waitFor(() => expect(translateOf(getByTestId('p'))).toBeNull());

      act(() => scrollY.setValue(600));
      // Switching the mapping off leaves the layer where the layout put it,
      // which is a complete frame — there is no arrival here to fade.
      expect(translateOf(getByTestId('p'))).toBeNull();
    });

    it('still renders its children', async () => {
      const scrollY = new Animated.Value(0);
      const { getByText, getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      await waitFor(() => expect(translateOf(getByTestId('p'))).toBeNull());
      expect(getByText('layer')).toBeTruthy();
    });
  });

  describe('the un-measured path (the native answer to SSR)', () => {
    it('renders complete content with no transform before any layout arrives', () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId, getByText } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} speed={0.4}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      // Applying a half-measured offset would place the layer wrong for one
      // frame and then jump it, so the transform is omitted until it is known.
      expect(translateOf(getByTestId('p'))).toBeNull();
      expect(getByText('layer')).toBeTruthy();
    });

    it('stays inert for a zero-height layout and starts once a real one arrives', () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} speed={0.4}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      layout(getByTestId('p'), 0, 0);
      expect(translateOf(getByTestId('p'))).toBeNull();
      layout(getByTestId('p'), 0, 100);
      expect(translateOf(getByTestId('p'))).toBeCloseTo(expected(0, 0, 100, 0.4), 5);
    });

    it('keeps a caller style while adding the transform', () => {
      const scrollY = new Animated.Value(0);
      const { getByTestId } = renderThemed(
        <ParallaxV4 testID="p" scrollY={scrollY} style={{ opacity: 0.5 }}>
          <Text>layer</Text>
        </ParallaxV4>,
        SEED_LIGHT
      );
      layout(getByTestId('p'), 0, 100);
      expect(flatten(getByTestId('p').props.style, {}).opacity).toBe(0.5);
      expect(translateOf(getByTestId('p'))).not.toBeNull();
    });
  });
});
