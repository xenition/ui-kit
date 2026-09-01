import '../spec-support/real-animations';
/**
 * `BottomSheetV4` — the behavioural half of its coverage.
 *
 * `bottom-sheet-v4.native.spec.tsx` next door asserts the *depth* contract:
 * scrim colour, the upward-casting shadow, glass, token purity. This file
 * asserts what a caller can observe by using the thing — the prop surface
 * (`title`, `children`, `snap`, `style`), open/closed, the dismiss paths, the
 * empty state §12 asks for, the accessibility affordances, and Reduce Motion.
 */
import * as React from 'react';
import { Modal as RNModal, Text, View } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { XenitionNativeThemeProvider } from '../theme';
import { expectedScrim, findStyle, flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { BottomSheetV4 } from './BottomSheetV4';

const host = (n: ReactTestInstance): boolean => typeof n.type === 'string';

/** An `Animated.Value` reads as a number; a plain style value already is one. */
function value(v: unknown): number {
  if (typeof v === 'number') return v;
  return (v as { __getValue: () => number }).__getValue();
}

const sheet = (props: Partial<React.ComponentProps<typeof BottomSheetV4>> = {}) => (
  <BottomSheetV4 open onClose={() => {}} title="Filters" {...props}>
    <Text>panel body</Text>
  </BottomSheetV4>
);

describe('BottomSheetV4 (native) — behaviour', () => {
  const theme = compileTheme(SEED_LIGHT);

  beforeEach(() => jest.useFakeTimers());
  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  const settle = (r: ReturnType<typeof renderThemed>): ReturnType<typeof renderThemed> => {
    act(() => {
      jest.runAllTimers();
    });
    return r;
  };

  /** The sheet itself — the only node with a top-corner radius. */
  const panelOf = (root: ReactTestInstance): Record<string, unknown> => {
    const style = findStyle(root, (s) => s.borderTopLeftRadius !== undefined);
    expect(style).toBeDefined();
    return style!;
  };

  /** The sheet's translateY, in points, right now. */
  const offsetOf = (root: ReactTestInstance): number => {
    const transform = panelOf(root).transform as { translateY: unknown }[];
    return value(transform[0]!.translateY);
  };

  describe('the prop surface', () => {
    it('renders a string title as a heading, and the children below it', () => {
      const { getByText } = settle(renderThemed(sheet(), SEED_LIGHT));
      const heading = flatStyle(getByText('Filters').props.style);
      expect(heading.fontSize).toBe(theme.typography.scale.xl);
      expect(heading.fontFamily).toBe(theme.typography.fontHeading);
      expect(getByText('panel body')).toBeTruthy();
    });

    it('takes a ReactNode title verbatim, adding no header chrome of its own', () => {
      const { getByText } = settle(
        renderThemed(sheet({ title: <Text>custom header</Text> }), SEED_LIGHT)
      );
      const custom = flatStyle(getByText('custom header').props.style);
      // The caller's node is rendered as given — not restyled into the
      // component's own heading.
      expect(custom.fontSize).toBeUndefined();
      expect(custom.fontFamily).toBeUndefined();
    });

    it('sizes itself from `snap`, as a fraction of the screen', () => {
      const short = settle(renderThemed(sheet({ snap: 0.25 }), SEED_LIGHT));
      const tall = settle(renderThemed(sheet({ snap: 0.9 }), SEED_LIGHT));
      expect(panelOf(short.UNSAFE_root).height as number).toBeLessThan(
        panelOf(tall.UNSAFE_root).height as number
      );
    });

    it('clamps a nonsense `snap` at both ends instead of vanishing or overflowing', () => {
      const floor = theme.spacing['2xl'] * 2;
      const tiny = settle(renderThemed(sheet({ snap: 0 }), SEED_LIGHT));
      // A sheet you cannot see is a sheet you cannot dismiss.
      expect(panelOf(tiny.UNSAFE_root).height).toBe(floor);

      const over = settle(renderThemed(sheet({ snap: 4 }), SEED_LIGHT));
      const full = settle(renderThemed(sheet({ snap: 1 }), SEED_LIGHT));
      expect(panelOf(over.UNSAFE_root).height).toBe(panelOf(full.UNSAFE_root).height);
    });

    it('merges a caller `style` onto the panel', () => {
      const { UNSAFE_root } = settle(renderThemed(sheet({ style: { marginTop: 7 } }), SEED_LIGHT));
      const panel = panelOf(UNSAFE_root);
      expect(panel.marginTop).toBe(7);
      // …without losing what the component set.
      expect(panel.borderTopLeftRadius).toBe(theme.radius.lg);
      expect(panel.overflow).toBe('hidden');
    });
  });

  describe('open, closed, and the ways out', () => {
    it('renders nothing while closed', () => {
      const { queryByText } = renderThemed(sheet({ open: false }), SEED_LIGHT);
      expect(queryByText('panel body')).toBeNull();
      expect(queryByText('Filters')).toBeNull();
    });

    it('reopens when `open` flips back to true', () => {
      const r = renderThemed(sheet({ open: false }), SEED_LIGHT);
      expect(r.queryByText('panel body')).toBeNull();
      r.rerender(
        <XenitionNativeThemeProvider theme={SEED_LIGHT}>
          <BottomSheetV4 open onClose={() => {}} title="Filters">
            <Text>panel body</Text>
          </BottomSheetV4>
        </XenitionNativeThemeProvider>
      );
      settle(r);
      expect(r.getByText('panel body')).toBeTruthy();
    });

    it('closes on the scrim', () => {
      const onClose = jest.fn();
      const { getByLabelText } = settle(renderThemed(sheet({ onClose }), SEED_LIGHT));
      // The panel sets `accessibilityViewIsModal`, which hides its sibling
      // scrim from the default queries.
      fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('closes on the Android back gesture', () => {
      const onClose = jest.fn();
      const { UNSAFE_getByType } = settle(renderThemed(sheet({ onClose }), SEED_LIGHT));
      const modal = UNSAFE_getByType(RNModal);
      expect(modal.props.transparent).toBe(true);
      act(() => modal.props.onRequestClose());
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('offers a drag gesture on the handle area', () => {
      const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
      // The grabber is not decoration: it claims the responder, which is what
      // makes drag-to-dismiss reachable at all.
      const grabbable = UNSAFE_root.findAll(
        (n) => host(n) && typeof n.props?.onMoveShouldSetResponder === 'function'
      );
      expect(grabbable.length).toBeGreaterThan(0);
    });
  });

  describe('the empty state', () => {
    it('renders with no title and no children, and does not crash', () => {
      const render = (): ReturnType<typeof renderThemed> =>
        settle(
          renderThemed(
            <BottomSheetV4 open onClose={() => {}} />,
            SEED_LIGHT
          )
        );
      expect(render).not.toThrow();
      const { UNSAFE_root } = render();
      // Still a sheet, at its full snap height — an empty sheet is a state, not
      // an absence, and it must stay dismissible.
      expect(panelOf(UNSAFE_root).height as number).toBeGreaterThan(0);
    });

    it('draws no header hairline when there is no title to divide off', () => {
      const { UNSAFE_root } = settle(
        renderThemed(<BottomSheetV4 open onClose={() => {}} />, SEED_LIGHT)
      );
      // A rule with nothing above it is a hole. The header is omitted whole.
      const header = findStyle(
        UNSAFE_root,
        (s) => s.borderBottomWidth === 1 && s.borderBottomColor === theme.light.border
      );
      expect(header).toBeUndefined();
    });

    it('keeps the grabber and the scrim, so an empty sheet is still dismissible', () => {
      const onClose = jest.fn();
      const { getByLabelText } = settle(
        renderThemed(<BottomSheetV4 open onClose={onClose} />, SEED_LIGHT)
      );
      expect(getByLabelText('Drag to dismiss', { includeHiddenElements: true })).toBeTruthy();
      fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('keeps its body padding with nothing in it, so content does not jump on arrival', () => {
      const { UNSAFE_root } = settle(
        renderThemed(<BottomSheetV4 open onClose={() => {}} />, SEED_LIGHT)
      );
      const body = UNSAFE_root.findAll((n) => n.props?.contentContainerStyle !== undefined)
        .map((n) => flatStyle(n.props.contentContainerStyle))
        .find((s) => s.paddingHorizontal === theme.spacing.lg);
      expect(body).toBeDefined();
      // 16 is the mocked bottom inset — the body clears the home indicator even
      // when it is empty.
      expect(body!.paddingBottom).toBe(theme.spacing.lg + 16);
    });
  });

  describe('accessibility', () => {
    it('walls the sheet off from the page behind it', () => {
      const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
      expect(
        UNSAFE_root.findAll((n) => host(n) && n.props?.accessibilityViewIsModal === true).length
      ).toBeGreaterThan(0);
    });

    it('labels the scrim and the grabber, so neither is a silent target', () => {
      const { getByLabelText } = settle(renderThemed(sheet(), SEED_LIGHT));
      expect(getByLabelText('Close', { includeHiddenElements: true })).toBeTruthy();
      expect(getByLabelText('Drag to dismiss', { includeHiddenElements: true })).toBeTruthy();
    });

    it('titles in plain ink, never in `muted` — the sheet may be glass', () => {
      const { getByText } = settle(renderThemed(sheet(), SEED_LIGHT));
      const style = flatStyle(getByText('Filters').props.style);
      expect(style.color).toBe(theme.light.onSurface);
      expect(style.color).not.toBe(theme.light.muted);
    });

    it('leaves caller content untouched, and lifts nothing inside the sheet', () => {
      const { UNSAFE_root, getByText } = settle(
        renderThemed(
          sheet({ children: <View accessibilityLabel="row"><Text>panel body</Text></View> }),
          SEED_LIGHT
        )
      );
      expect(getByText('panel body')).toBeTruthy();
      // §8: the sheet is the layer; a card inside a glass sheet is not another
      // glass panel. Exactly one node carries the lift.
      const lifted = UNSAFE_root.findAll(host)
        .map((n) => flatStyle(n.props?.style))
        .filter((s) => s.shadowRadius === theme.lightElevation.sheet.radius);
      expect(lifted).toHaveLength(1);
    });
  });

  describe('reduced motion', () => {
    it('is at rest the moment it opens, with no travel to wait through', async () => {
      const { AccessibilityInfo } = jest.requireActual('react-native');
      jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);

      const r = renderThemed(sheet(), SEED_LIGHT);
      await act(async () => {});
      // No timers run: under Reduce Motion the sheet is simply there.
      expect(offsetOf(r.UNSAFE_root)).toBe(0);
      expect(r.getByText('panel body')).toBeTruthy();
      settle(r);
    });

    it('starts off-screen and travels up when motion is allowed', async () => {
      const r = renderThemed(sheet(), SEED_LIGHT);
      await act(async () => {});
      expect(offsetOf(r.UNSAFE_root)).toBeGreaterThan(0);
      settle(r);
      expect(offsetOf(r.UNSAFE_root)).toBe(0);
    });

    it('keeps the scrim under Reduce Motion — an overlay with no veil reads as a glitch', async () => {
      const { AccessibilityInfo } = jest.requireActual('react-native');
      jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
      const r = renderThemed(sheet(), SEED_LIGHT);
      await act(async () => {});
      const scrim = findStyle(r.UNSAFE_root, (s) => s.backgroundColor === expectedScrim(SEED_LIGHT));
      expect(scrim).toBeDefined();
      // The scrim's opacity is derived from the sheet's own position, so a
      // seated sheet means a fully drawn veil — no timing function involved.
      expect(value(scrim!.opacity)).toBe(1);
      settle(r);
    });
  });
});