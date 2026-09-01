import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { CHART_MARK, chartSeries } from '../../primitives/internal/v4-chart';
import { SPARKLINE_V4_HAS_SVG, SparklineV4 } from './SparklineV4';

/** Flatten a possibly-nested RN `style` into one object. */
function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

/** Every node carrying an `accessibilityLabel`, in tree order. */
function labels(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => typeof n.props?.accessibilityLabel === 'string')
    .map((n) => n.props.accessibilityLabel as string);
}

/** The node carrying a given spoken sentence. */
function marked(root: ReactTestInstance, label: string): ReactTestInstance {
  return root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === label
  )[0] as ReactTestInstance;
}

/** The five derived slots for the light seed. */
function slots(): string[] {
  const tokens = toNativeTokens(compileTheme(SEED_LIGHT));
  return chartSeries(tokens.ramps.primary[500] as string, 'light');
}

describe('SparklineV4 (native)', () => {
  const light = compileTheme(SEED_LIGHT).light;

  // ── §5 Group A: the twins finally draw the same thing ───────────────

  it('draws an SVG polyline, not the base’s row of View bars', () => {
    expect(SPARKLINE_V4_HAS_SVG).toBe(true);
    const { getAllByTestId, queryAllByTestId } = renderThemed(
      <SparklineV4 data={[1, 4, 2, 6]} />,
      SEED_LIGHT
    );
    expect(getAllByTestId('sparkline-line').length).toBe(1);
    // The `View`-bar path is the documented fallback, not the design.
    expect(queryAllByTestId('sparkline-fallback').length).toBe(0);
  });

  it('carries none of the figure frame — no title, no legend, no axis', () => {
    const { root, queryByText } = renderThemed(<SparklineV4 data={[1, 2, 3]} />, SEED_LIGHT);
    expect(queryByText('Series 1')).toBeNull();
    // A mark prints no words at all; the frame belongs to the figure it sits in.
    expect(root.findAllByType('Text' as never).length).toBe(0);
  });

  // ── §1 rules 1–2: the palette and the marks ─────────────────────────

  it('takes slot 1 by default — the brand hue, not `colors.primary`', () => {
    const { getAllByTestId } = renderThemed(<SparklineV4 data={[1, 2, 3]} />, SEED_LIGHT);
    const line = getAllByTestId('sparkline-line')[0] as ReactTestInstance;
    expect(line.props.stroke).toBe(slots()[0]);
    expect(line.props.stroke).not.toBe(light.primary);
  });

  it('takes another slot when told to, and a status hue only via `tone`', () => {
    const slotted = renderThemed(<SparklineV4 data={[1, 2]} slot={2} />, SEED_LIGHT);
    expect(slotted.getAllByTestId('sparkline-line')[0]?.props.stroke).toBe(slots()[2]);

    const toned = renderThemed(<SparklineV4 data={[1, 2]} tone="danger" />, SEED_LIGHT);
    expect(toned.getAllByTestId('sparkline-line')[0]?.props.stroke).toBe(light.danger);
  });

  it('throws past the fifth slot rather than cycling (§1 rule 4)', () => {
    expect(() => renderThemed(<SparklineV4 data={[1, 2]} slot={5} />, SEED_LIGHT)).toThrow(
      /never cycled/
    );
  });

  it('strokes at CHART_MARK.stroke — `strokeWidth={1.5}` is retired', () => {
    const { getAllByTestId } = renderThemed(<SparklineV4 data={[1, 2, 3]} />, SEED_LIGHT);
    expect(getAllByTestId('sparkline-line')[0]?.props.strokeWidth).toBe(CHART_MARK.stroke);
  });

  // ── §4.5: empty, single datum, loading, all at one footprint ────────

  it('keeps the footprint when there is no data, as a recessive baseline', () => {
    const { getByTestId } = renderThemed(
      <SparklineV4 data={[]} width={100} height={28} />,
      SEED_LIGHT
    );
    const box = getByTestId('sparkline-empty');
    const style = flat(box.props.style);
    expect(style.width).toBe(100);
    expect(style.height).toBe(28);
    // Never a bare `Text` that changes the height — the base's "No data" note.
    expect(box.findAll((n) => n.type === 'Text').length).toBe(0);
  });

  it('says “no data” in words even though it has no room to print it', () => {
    const { root } = renderThemed(<SparklineV4 data={[]} />, SEED_LIGHT);
    expect(labels(root)).toContain('Sparkline, no data');
  });

  it('shows the skeleton at the mark’s own footprint while loading', () => {
    const { queryAllByTestId, toJSON } = renderThemed(
      <SparklineV4 data={[1, 2]} loading width={120} height={30} />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('sparkline-line').length).toBe(0);
    expect(toJSON()).toBeTruthy();
  });

  it('draws ONE datum as a centred dot, with no divide-by-zero', () => {
    const { getAllByTestId, queryAllByTestId } = renderThemed(
      <SparklineV4 data={[9]} width={100} height={28} />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('sparkline-line').length).toBe(0);
    const dot = getAllByTestId('sparkline-dot')[0] as ReactTestInstance;
    expect(dot.props.cx).toBe(50);
    expect(Number.isFinite(dot.props.cy)).toBe(true);
    // The ring of surface comes with it (§4.4).
    expect(dot.props.strokeWidth).toBe(CHART_MARK.ring);
    expect(dot.props.stroke).toBe(light.surface);
  });

  it('draws a FLAT series as a level line rather than dividing by zero', () => {
    const { getAllByTestId } = renderThemed(
      <SparklineV4 data={[4, 4, 4]} width={100} height={28} />,
      SEED_LIGHT
    );
    const points = getAllByTestId('sparkline-line')[0]?.props.points as string;
    expect(points).not.toMatch(/NaN|Infinity/);
    expect(new Set(points.split(' ').map((p) => p.split(',')[1])).size).toBe(1);
  });

  it('honours an explicit `min` / `max` window', () => {
    const { getAllByTestId } = renderThemed(
      <SparklineV4 data={[5]} min={0} max={10} width={100} height={28} />,
      SEED_LIGHT
    );
    // Half of the inner band, so the dot sits mid-box rather than at the floor.
    expect(getAllByTestId('sparkline-dot')[0]?.props.cy).toBe(14);
  });

  // ── §1 rule 6: it says its value in words ───────────────────────────

  it('derives a sentence naming the count and the range', () => {
    const { root } = renderThemed(<SparklineV4 data={[3, 9, 6]} />, SEED_LIGHT);
    expect(labels(root)).toContain('Sparkline, 3 points, 3 to 9');
  });

  it('says “1 point” rather than “1 points”, and takes an override', () => {
    const one = renderThemed(<SparklineV4 data={[2]} />, SEED_LIGHT);
    expect(labels(one.root)).toContain('Sparkline, 1 point, 2 to 2');

    const custom = renderThemed(
      <SparklineV4 data={[1, 2]} accessibilityLabel="Signups, up" />,
      SEED_LIGHT
    );
    expect(marked(custom.root, 'Signups, up')).toBeTruthy();
  });

  // ── §7 open question 6: the documented fallback ─────────────────────

  /*
    The whole point of the `View` path is the app that never installed the
    optional peer, so the only honest way to test it is to take the peer away.
    That means a fresh module registry — and everything the render touches has
    to come out of the SAME fresh registry, React and the testing library
    included, or the probe render blows up on a dispatcher belonging to the
    other copy of React.

    This is also the test that found the real defect: `SparklineV4` used to
    import its colour resolver from `LineChartV4`, which hard-imports
    `react-native-svg` — so the fallback threw on `require` in exactly the app
    it exists for. See the note at the top of `SparklineV4.tsx`.
  */
  describe('without the optional `react-native-svg` peer', () => {
    afterEach(() => {
      jest.dontMock('react-native-svg');
      jest.resetModules();
    });

    it('falls back to View bars rather than crashing, and still says its value', () => {
      jest.resetModules();
      jest.doMock('react-native-svg', () => {
        throw new Error("Cannot find module 'react-native-svg'");
      });

      /* eslint-disable @typescript-eslint/no-var-requires */
      /*
        `react-test-renderer` directly rather than the testing library: RTL
        registers its `beforeAll` / `afterEach` cleanup hooks at import time,
        and jest refuses a hook declared inside a running test. The renderer
        has no such side effect, and `findAll` over a `ReactTestInstance` is
        what the helpers at the top of this file already walk.
      */
      const FreshReact = require('react') as typeof import('react');
      // The shared setup spied on the OLD registry's `AccessibilityInfo`; the
      // fresh one is unmocked and its `isReduceMotionEnabled` resolves to
      // nothing under the preset, which `useReducedMotion` would `.then` on.
      const RN = require('react-native') as typeof import('react-native');
      jest.spyOn(RN.AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(false);
      const TestRenderer = require('react-test-renderer') as typeof import('react-test-renderer');
      const { XenitionNativeThemeProvider } = require('../theme') as typeof import('../theme');
      const mod = require('./SparklineV4') as typeof import('./SparklineV4');
      /* eslint-enable @typescript-eslint/no-var-requires */

      // The module loaded at all, which is the first half of the promise.
      expect(mod.SPARKLINE_V4_HAS_SVG).toBe(false);

      let tree: import('react-test-renderer').ReactTestRenderer | undefined;
      TestRenderer.act(() => {
        tree = TestRenderer.create(
          FreshReact.createElement(
            XenitionNativeThemeProvider,
            { theme: SEED_LIGHT },
            FreshReact.createElement(mod.SparklineV4, { data: [1, 4, 2], width: 90, height: 24 })
          )
        );
      });
      const root = (tree as import('react-test-renderer').ReactTestRenderer).root;

      const bars = root.findAll(
        (n) => n.props?.testID === 'sparkline-fallback'
      )[0] as ReactTestInstance;
      expect(bars).toBeTruthy();
      expect((bars.props.children as unknown[]).length).toBe(3);
      // `gap: 1` is retired; the fallback takes the module's one separator.
      expect(flat(bars.props.style).gap).toBe(CHART_MARK.gap);
      // …and the sentence is unchanged, because that is what a screen reader
      // gets either way.
      expect(labels(root)).toContain('Sparkline, 3 points, 1 to 4');

      // This tree is mounted outside the testing library, so its auto-cleanup
      // will never take it down — without this the chart stays mounted for the
      // rest of the worker's life, holding its entrance animation and its
      // `AccessibilityInfo` subscription open.
      TestRenderer.act(() => {
        (tree as import('react-test-renderer').ReactTestRenderer).unmount();
      });
    });
  });
});
