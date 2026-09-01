import * as React from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { act, render, waitFor } from '@testing-library/react-native';
import { SEED_BOTH, SEED_DARK, SEED_LIGHT } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import {
  XenitionNativeThemeProvider,
  useDesignLine,
  useXenitionTheme,
  type XenitionNativeTheme,
} from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';
import {
  XenitionNativeThemeProviderV4,
  useXenitionMotionPreference,
} from './XenitionNativeThemeProviderV4';

// The first `render()` in a native suite pays for React Native's lazy module
// init (AccessibilityInfo's emitter, the theme compiler's first run). On a cold
// cache with the whole native project running in parallel that can exceed
// jest's 5s default before this file's first assertion is reached — it is
// startup cost, not a slow test, so give the file room rather than let a
// contended machine fail it.
jest.setTimeout(20000);

/** Every value `useReducedMotion()` has rendered, in order, across probes. */
let seen: boolean[] = [];
/** The last theme object handed to a `useXenitionTheme()` consumer. */
let captured: XenitionNativeTheme | null = null;

beforeEach(() => {
  seen = [];
  captured = null;
  // Several tests count OS reads and subscriptions. The shared setup installs
  // the `isReduceMotionEnabled` spy for us; clear call records (not
  // implementations) so a count is this test's, not the file's running total.
  jest.clearAllMocks();
});

function MotionProbe({ id = 'motion' }: { id?: string }): React.ReactElement {
  const reduced = useReducedMotion();
  seen.push(reduced);
  return <Text testID={id}>{String(reduced)}</Text>;
}

function ThemeProbe(): React.ReactElement {
  const theme = useXenitionTheme();
  captured = theme;
  return <Text testID="theme">{`${theme.scheme}|${theme.colors.primary}`}</Text>;
}

function LineProbe(): React.ReactElement {
  return <Text testID="line">{useDesignLine()}</Text>;
}

function PreferenceProbe(): React.ReactElement {
  const { reducedMotion, resolved } = useXenitionMotionPreference();
  return <Text testID="pref">{`${String(reducedMotion)}|${String(resolved)}`}</Text>;
}

/**
 * The shared native setup already replaces `isReduceMotionEnabled` with a spy
 * for every test; re-spying a spy survives `restoreAllMocks` and leaks call
 * counts into the next test, so set the implementation on the existing mock.
 */
function readReduceMotion(): jest.Mock {
  return AccessibilityInfo.isReduceMotionEnabled as unknown as jest.Mock;
}

function reduceMotion(value: boolean): void {
  readReduceMotion().mockResolvedValue(value);
}

describe('XenitionNativeThemeProviderV4 (native)', () => {
  describe('is a superset of the base provider', () => {
    it('resolves the same theme value underneath — useXenitionTheme() still works', async () => {
      reduceMotion(false);
      const v4 = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT}>
          <ThemeProbe />
        </XenitionNativeThemeProviderV4>
      );
      await waitFor(() => expect(v4.getByTestId('theme')).toBeTruthy());
      const underV4 = captured;

      captured = null;
      render(
        <XenitionNativeThemeProvider theme={SEED_LIGHT}>
          <ThemeProbe />
        </XenitionNativeThemeProvider>
      );
      const underBase = captured;

      // Not "looks similar" — the V4 root composes the base provider, so the
      // whole context value (tokens, colors, gradient, glass, elevation,
      // depth, state, motion, ringGeometry) has to be identical.
      expect(underV4).not.toBeNull();
      expect(underV4).toEqual(underBase);
    });

    it('inherits the seed-derived scheme default — dark seed, no scheme prop', async () => {
      reduceMotion(false);
      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_DARK}>
          <ThemeProbe />
        </XenitionNativeThemeProviderV4>
      );
      await waitFor(() =>
        expect(getByTestId('theme').props.children).toBe(
          `dark|${compileTheme(SEED_DARK).dark.primary}`
        )
      );
    });

    it('inherits the explicit `scheme` prop, overriding the seed', async () => {
      reduceMotion(false);
      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_BOTH} scheme="dark">
          <ThemeProbe />
        </XenitionNativeThemeProviderV4>
      );
      await waitFor(() =>
        expect(getByTestId('theme').props.children).toBe(
          `dark|${compileTheme(SEED_BOTH).dark.primary}`
        )
      );
    });

    it('accepts an already-compiled theme, exactly like the base', async () => {
      reduceMotion(false);
      const compiled = compileTheme(SEED_LIGHT);
      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={compiled}>
          <ThemeProbe />
        </XenitionNativeThemeProviderV4>
      );
      await waitFor(() =>
        expect(getByTestId('theme').props.children).toBe(`light|${compiled.light.primary}`)
      );
    });
  });

  describe('reduced motion — resolved once, on context', () => {
    it('reads ONE value from ONE listener however many components ask', async () => {
      reduceMotion(true);
      const listener = jest.spyOn(AccessibilityInfo, 'addEventListener');

      const { getAllByText } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT}>
          <MotionProbe id="a" />
          <MotionProbe id="b" />
          <MotionProbe id="c" />
          <MotionProbe id="d" />
          <MotionProbe id="e" />
        </XenitionNativeThemeProviderV4>
      );

      await waitFor(() => expect(getAllByText('true')).toHaveLength(5));
      // The whole point: five animated components, one OS read, one
      // `reduceMotionChanged` subscription — the provider's, not theirs.
      expect(readReduceMotion()).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls.filter(([event]) => event === 'reduceMotionChanged')).toHaveLength(
        1
      );
    });

    it('never renders a motion-ON frame when Reduce Motion is enabled', async () => {
      reduceMotion(true);
      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT}>
          <MotionProbe />
        </XenitionNativeThemeProviderV4>
      );

      await waitFor(() => expect(getByTestId('motion').props.children).toBe('true'));
      // The defect this component exists to fix: a `false` anywhere in here is
      // an entry animation that played on a device asking for no animation.
      expect(seen).not.toContain(false);
      expect(seen.length).toBeGreaterThan(0);
    });

    it('holds the first paint until the OS answers, then mounts once', async () => {
      reduceMotion(true);
      const { queryByTestId, getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT}>
          <MotionProbe />
        </XenitionNativeThemeProviderV4>
      );

      // Nothing has mounted yet — so nothing has animated yet.
      expect(queryByTestId('motion')).toBeNull();
      expect(seen).toEqual([]);
      await waitFor(() => expect(getByTestId('motion')).toBeTruthy());
      expect(seen).toEqual([true]);
    });

    it('propagates a live `reduceMotionChanged` to every consumer at once', async () => {
      reduceMotion(false);
      const listener = jest.spyOn(AccessibilityInfo, 'addEventListener');

      const { getAllByText } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT}>
          <MotionProbe id="a" />
          <MotionProbe id="b" />
        </XenitionNativeThemeProviderV4>
      );
      await waitFor(() => expect(getAllByText('false')).toHaveLength(2));

      const call = listener.mock.calls.find(([event]) => event === 'reduceMotionChanged');
      const handler = call?.[1] as (value: boolean) => void;
      act(() => handler(true));

      expect(getAllByText('true')).toHaveLength(2);
    });

    it('`reducedMotion` prop wins outright — no OS read, no listener, no gate', () => {
      reduceMotion(false);
      const listener = jest.spyOn(AccessibilityInfo, 'addEventListener');

      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT} reducedMotion>
          <MotionProbe />
          <PreferenceProbe />
        </XenitionNativeThemeProviderV4>
      );

      // Synchronous: an app-owned value is already resolved, so there is
      // nothing to wait for and nothing to gate on.
      expect(getByTestId('motion').props.children).toBe('true');
      expect(getByTestId('pref').props.children).toBe('true|true');
      expect(readReduceMotion()).not.toHaveBeenCalled();
      expect(listener.mock.calls.filter(([event]) => event === 'reduceMotionChanged')).toHaveLength(
        0
      );
    });

    it('ungated, reports reduced motion until the answer lands', async () => {
      reduceMotion(false);
      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT} gateFirstPaint={false}>
          <MotionProbe />
          <PreferenceProbe />
        </XenitionNativeThemeProviderV4>
      );

      // Children mount immediately, but the provider does not claim motion is
      // fine before it knows — it says so with `resolved: false`.
      expect(getByTestId('motion').props.children).toBe('true');
      expect(getByTestId('pref').props.children).toBe('true|false');

      await waitFor(() => expect(getByTestId('pref').props.children).toBe('false|true'));
      expect(getByTestId('motion').props.children).toBe('false');
    });

    it('resolves the gate even when the platform rejects the read', async () => {
      readReduceMotion().mockRejectedValue(new Error('unsupported platform'));

      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT}>
          <MotionProbe />
        </XenitionNativeThemeProviderV4>
      );

      // A rejection must not strand the tree behind the gate; it means
      // "no answer available", which the standalone hook treats as motion-on.
      await waitFor(() => expect(getByTestId('motion').props.children).toBe('false'));
    });
  });

  describe('the fallback path — no V4 provider', () => {
    it('useReducedMotion() still subscribes on its own and still works', async () => {
      reduceMotion(true);
      const listener = jest.spyOn(AccessibilityInfo, 'addEventListener');

      const { getByTestId } = render(
        <XenitionNativeThemeProvider theme={SEED_LIGHT}>
          <MotionProbe />
        </XenitionNativeThemeProvider>
      );

      await waitFor(() => expect(getByTestId('motion').props.children).toBe('true'));
      expect(readReduceMotion()).toHaveBeenCalledTimes(1);
      expect(listener.mock.calls.filter(([event]) => event === 'reduceMotionChanged')).toHaveLength(
        1
      );
    });

    it('keeps its historical shape exactly: `false` first, then the real value', async () => {
      reduceMotion(true);
      const { getByTestId } = render(
        <XenitionNativeThemeProvider theme={SEED_LIGHT}>
          <MotionProbe />
        </XenitionNativeThemeProvider>
      );

      // Documented, not endorsed. This IS the defect the V4 root removes, and
      // the standalone path must keep behaving as it always has so that no
      // existing caller changes when the shared hook grew a context read.
      expect(seen[0]).toBe(false);
      await waitFor(() => expect(getByTestId('motion').props.children).toBe('true'));
    });

    it('still costs one listener per component with no provider to share one', async () => {
      reduceMotion(false);
      const listener = jest.spyOn(AccessibilityInfo, 'addEventListener');

      const { getAllByText } = render(
        <XenitionNativeThemeProvider theme={SEED_LIGHT}>
          <MotionProbe id="a" />
          <MotionProbe id="b" />
          <MotionProbe id="c" />
        </XenitionNativeThemeProvider>
      );

      await waitFor(() => expect(getAllByText('false')).toHaveLength(3));
      expect(readReduceMotion()).toHaveBeenCalledTimes(3);
      expect(listener.mock.calls.filter(([event]) => event === 'reduceMotionChanged')).toHaveLength(
        3
      );
    });

    it('useXenitionMotionPreference() refuses to guess without a V4 root', () => {
      reduceMotion(false);
      jest.spyOn(console, 'error').mockImplementation(() => undefined);
      expect(() =>
        render(
          <XenitionNativeThemeProvider theme={SEED_LIGHT}>
            <PreferenceProbe />
          </XenitionNativeThemeProvider>
        )
      ).toThrow(/XenitionNativeThemeProviderV4/);
    });
  });

  describe('design line', () => {
    it('puts the tree on the V4 line by default', async () => {
      reduceMotion(false);
      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT}>
          <LineProbe />
        </XenitionNativeThemeProviderV4>
      );
      await waitFor(() => expect(getByTestId('line').props.children).toBe('v4'));
    });

    it('lets an app opt out with an explicit `design`', async () => {
      reduceMotion(false);
      const { getByTestId } = render(
        <XenitionNativeThemeProviderV4 theme={SEED_LIGHT} design="base">
          <LineProbe />
        </XenitionNativeThemeProviderV4>
      );
      await waitFor(() => expect(getByTestId('line').props.children).toBe('base'));
    });
  });

  it('survives its empty state — no children, no scheme, no crash', async () => {
    reduceMotion(false);
    expect(() => render(<XenitionNativeThemeProviderV4 theme={SEED_LIGHT} />)).not.toThrow();
    await waitFor(() => expect(readReduceMotion()).toHaveBeenCalled());
  });
});
