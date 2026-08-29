/**
 * `ActionSheetV4` — the behavioural half of its coverage.
 *
 * `action-sheet-v4.native.spec.tsx` next door asserts the *depth* contract:
 * scrim colour, elevation altitude, glass, token purity. This file asserts what
 * a caller can observe by using the thing — the prop surface, open/closed, the
 * dismiss paths, the empty state §12 asks for, the accessibility affordances,
 * and Reduce Motion — so a refactor of the styling internals moves one file and
 * a regression in behaviour fails the other.
 */
import * as React from 'react';
import { Modal as RNModal } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { XenitionNativeThemeProvider } from '../theme';
import { allStyles, expectedScrim, findStyle, flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { ActionSheetV4 } from './ActionSheetV4';

/*
  The test renderer yields BOTH the composite element and the host view it
  rendered, so an unfiltered `findAll` counts every node twice.
*/
const host = (n: ReactTestInstance): boolean => typeof n.type === 'string';

/** An `Animated.Value` reads as a number; a plain style value already is one. */
function value(v: unknown): number {
  if (typeof v === 'number') return v;
  return (v as { __getValue: () => number }).__getValue();
}

const ACTIONS = [
  { label: 'Rename' },
  { label: 'Duplicate' },
  { label: 'Delete', destructive: true },
];

const sheet = (props: Partial<React.ComponentProps<typeof ActionSheetV4>> = {}) => (
  <ActionSheetV4 open onClose={() => {}} actions={ACTIONS} {...props} />
);

describe('ActionSheetV4 (native) — behaviour', () => {
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

  const menus = (root: ReactTestInstance): ReactTestInstance[] =>
    root.findAll((n) => host(n) && n.props?.accessibilityRole === 'menu');

  const rows = (root: ReactTestInstance): ReactTestInstance[] =>
    root.findAll((n) => host(n) && n.props?.accessibilityRole === 'menuitem');

  /**
   * A `Pressable`'s state-dependent style lives on the composite node; the host
   * view below it carries only the already-resolved result. Reach for the
   * composite when the question is "what does it look like while pressed".
   */
  const pressables = (root: ReactTestInstance, role: string): ReactTestInstance[] =>
    root.findAll(
      (n) => n.props?.accessibilityRole === role && typeof n.props?.style === 'function'
    );

  /** Everything a node rendered, excluding the node itself. */
  const contentsOf = (node: ReactTestInstance): ReactTestInstance[] =>
    node.findAll(host).filter((n) => n !== node);

  describe('the prop surface', () => {
    it('renders a row per action, plus the default Cancel affordance', () => {
      const { getByText } = settle(renderThemed(sheet(), SEED_LIGHT));
      for (const action of ACTIONS) expect(getByText(action.label)).toBeTruthy();
      expect(getByText('Cancel')).toBeTruthy();
    });

    it('takes a caller-supplied cancelLabel, as both the text and the label', () => {
      const { getByText, getByLabelText } = settle(
        renderThemed(sheet({ cancelLabel: 'Not now' }), SEED_LIGHT)
      );
      expect(getByText('Not now')).toBeTruthy();
      expect(getByLabelText('Not now', { includeHiddenElements: true })).toBeTruthy();
    });

    it('shows a title above the list, and treats an empty string as no title', () => {
      const titled = settle(renderThemed(sheet({ title: 'File actions' }), SEED_LIGHT));
      expect(titled.getByText('File actions')).toBeTruthy();

      // `''` is what a form-bound caller passes for "nothing yet". A header
      // hairline with no text in it is a hole, so the component omits it.
      const blank = settle(renderThemed(sheet({ title: '' }), SEED_LIGHT));
      const header = findStyle(
        blank.UNSAFE_root,
        (s) => s.borderBottomWidth === 1 && s.borderBottomColor === theme.light.border
      );
      expect(header).toBeUndefined();
    });

    it('separates the destructive actions into a second group', () => {
      const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
      expect(menus(UNSAFE_root)).toHaveLength(2);

      const ordinaryOnly = settle(
        renderThemed(sheet({ actions: [{ label: 'Rename' }] }), SEED_LIGHT)
      );
      expect(menus(ordinaryOnly.UNSAFE_root)).toHaveLength(1);
    });
  });

  describe('open, closed, and the ways out', () => {
    it('renders nothing while closed', () => {
      const { queryByText } = renderThemed(sheet({ open: false, title: 'File' }), SEED_LIGHT);
      expect(queryByText('Rename')).toBeNull();
      expect(queryByText('File')).toBeNull();
      expect(queryByText('Cancel')).toBeNull();
    });

    it('reopens when `open` flips back to true', () => {
      const r = renderThemed(sheet({ open: false }), SEED_LIGHT);
      expect(r.queryByText('Rename')).toBeNull();
      r.rerender(
        <XenitionNativeThemeProvider theme={SEED_LIGHT}>
          <ActionSheetV4 open onClose={() => {}} actions={ACTIONS} />
        </XenitionNativeThemeProvider>
      );
      settle(r);
      expect(r.getByText('Rename')).toBeTruthy();
    });

    it('runs the action, then closes', () => {
      const onSelect = jest.fn();
      const onClose = jest.fn();
      const { getByText } = settle(
        renderThemed(sheet({ onClose, actions: [{ label: 'Rename', onSelect }] }), SEED_LIGHT)
      );
      fireEvent.press(getByText('Rename'));
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('closes on an action that carries no onSelect at all', () => {
      const onClose = jest.fn();
      const { getByText } = settle(
        renderThemed(sheet({ onClose, actions: [{ label: 'Rename' }] }), SEED_LIGHT)
      );
      expect(() => fireEvent.press(getByText('Rename'))).not.toThrow();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('closes on Cancel and on the scrim', () => {
      const onClose = jest.fn();
      const { getByText, getByLabelText } = settle(renderThemed(sheet({ onClose }), SEED_LIGHT));
      fireEvent.press(getByText('Cancel'));
      expect(onClose).toHaveBeenCalledTimes(1);
      // The panel sets `accessibilityViewIsModal`, which hides its sibling
      // scrim from the default queries.
      fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
      expect(onClose).toHaveBeenCalledTimes(2);
    });

    it('closes on the Android back gesture', () => {
      const onClose = jest.fn();
      const { UNSAFE_getByType } = settle(renderThemed(sheet({ onClose }), SEED_LIGHT));
      const modal = UNSAFE_getByType(RNModal);
      expect(modal.props.transparent).toBe(true);
      act(() => modal.props.onRequestClose());
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('the empty state', () => {
    it('renders with no actions, no title and no crash', () => {
      const render = (): ReturnType<typeof renderThemed> =>
        settle(renderThemed(sheet({ actions: [], title: undefined }), SEED_LIGHT));
      expect(render).not.toThrow();
      const { UNSAFE_root, getByText } = render();
      expect(rows(UNSAFE_root)).toHaveLength(0);
      // The way out survives an empty list — an action sheet with no exit is a
      // trap, and an empty one is exactly where a caller would strand a user.
      expect(getByText('Cancel')).toBeTruthy();
    });

    it('leaves no hole where the list would have been', () => {
      const { UNSAFE_root } = settle(
        renderThemed(sheet({ actions: [], title: undefined }), SEED_LIGHT)
      );
      const group = menus(UNSAFE_root);
      expect(group).toHaveLength(1);
      const style = flatStyle(group[0]!.props.style);
      // No padding and no minimum of its own, so the empty card collapses to
      // nothing instead of floating an elevated slab of blank surface.
      expect(style.minHeight).toBeUndefined();
      expect(style.paddingVertical).toBeUndefined();
      expect(style.height).toBeUndefined();
      expect(contentsOf(group[0]!)).toHaveLength(0);
    });

    it('still dismisses when it has nothing to offer', () => {
      const onClose = jest.fn();
      const { getByText, getByLabelText } = settle(
        renderThemed(sheet({ actions: [], onClose }), SEED_LIGHT)
      );
      fireEvent.press(getByText('Cancel'));
      fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
      expect(onClose).toHaveBeenCalledTimes(2);
    });

    it('renders a destructive-only sheet without an empty ordinary group', () => {
      const { UNSAFE_root, getByText } = settle(
        renderThemed(sheet({ actions: [{ label: 'Delete', destructive: true }] }), SEED_LIGHT)
      );
      expect(getByText('Delete')).toBeTruthy();
      // Two groups, one of them empty — the ordinary card collapses rather than
      // drawing a blank slab above the destructive slot.
      const ordinary = flatStyle(menus(UNSAFE_root)[0]!.props.style);
      expect(ordinary.minHeight).toBeUndefined();
      expect(contentsOf(menus(UNSAFE_root)[0]!)).toHaveLength(0);
    });
  });

  describe('accessibility', () => {
    it('announces the groups as menus and the rows as menu items', () => {
      const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
      expect(menus(UNSAFE_root).length).toBeGreaterThan(0);
      expect(rows(UNSAFE_root)).toHaveLength(ACTIONS.length);
    });

    it('walls the sheet off from the page behind it', () => {
      const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
      expect(
        UNSAFE_root.findAll((n) => host(n) && n.props?.accessibilityViewIsModal === true).length
      ).toBeGreaterThan(0);
    });

    it('labels the scrim and gives Cancel a button role', () => {
      const { getByLabelText } = settle(renderThemed(sheet(), SEED_LIGHT));
      expect(getByLabelText('Close', { includeHiddenElements: true })).toBeTruthy();
      expect(getByLabelText('Cancel', { includeHiddenElements: true }).props.accessibilityRole).toBe(
        'button'
      );
    });

    it('clears the 44pt tap floor on every row and on Cancel', () => {
      const { UNSAFE_root, getByLabelText } = settle(renderThemed(sheet(), SEED_LIGHT));
      const target = theme.spacing['2xl'];
      // From the scale, not from a remembered 44 — but it must still clear it.
      expect(target).toBeGreaterThanOrEqual(44);
      for (const row of rows(UNSAFE_root)) {
        expect(flatStyle(row.props.style).minHeight).toBe(target);
      }
      const cancel = pressables(UNSAFE_root, 'button')[0]!;
      const resting = (cancel.props.style as (s: { pressed: boolean }) => unknown)({
        pressed: false,
      });
      expect(flatStyle(resting).minHeight).toBe(target);
    });

    it('marks a disabled action disabled, and dims it rather than hiding it', () => {
      const onSelect = jest.fn();
      const { UNSAFE_root, getByText } = settle(
        renderThemed(
          sheet({ actions: [{ label: 'Archive', disabled: true, onSelect }] }),
          SEED_LIGHT
        )
      );
      expect(getByText('Archive')).toBeTruthy();
      expect(rows(UNSAFE_root)[0]!.props.accessibilityState.disabled).toBe(true);
      const row = pressables(UNSAFE_root, 'menuitem')[0]!;
      expect(row.props.disabled).toBe(true);
      const style = flatStyle(
        (row.props.style as (s: { pressed: boolean }) => unknown)({ pressed: false })
      );
      expect(style.opacity).toBeLessThan(1);
    });

    it('gives a press its own feedback, on the pressed row only', () => {
      const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
      const row = pressables(UNSAFE_root, 'menuitem')[0]!;
      const styleFn = row.props.style as (s: { pressed: boolean }) => unknown;
      expect(flatStyle(styleFn({ pressed: false })).backgroundColor).toBe('transparent');
      expect(flatStyle(styleFn({ pressed: true })).backgroundColor).not.toBe('transparent');
    });
  });

  describe('reduced motion', () => {
    const scrimOpacity = (root: ReactTestInstance): number =>
      value(findStyle(root, (s) => s.backgroundColor === expectedScrim(SEED_LIGHT))!.opacity);

    it('is at rest the moment it opens, with no travel to wait through', async () => {
      const { AccessibilityInfo } = jest.requireActual('react-native');
      jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);

      const r = renderThemed(sheet(), SEED_LIGHT);
      await act(async () => {});
      // No timers run: under Reduce Motion the sheet is simply there.
      expect(scrimOpacity(r.UNSAFE_root)).toBe(1);
      expect(r.getByText('Rename')).toBeTruthy();
      settle(r);
    });

    it('animates in when motion is allowed, and still ends at rest', async () => {
      const r = renderThemed(sheet(), SEED_LIGHT);
      await act(async () => {});
      expect(scrimOpacity(r.UNSAFE_root)).toBeLessThan(1);
      settle(r);
      expect(r.getByText('Rename')).toBeTruthy();
    });

    it('keeps the scrim under Reduce Motion — an overlay with no veil reads as a glitch', async () => {
      const { AccessibilityInfo } = jest.requireActual('react-native');
      jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
      const r = renderThemed(sheet(), SEED_LIGHT);
      await act(async () => {});
      expect(
        allStyles(r.UNSAFE_root).some((s) => s.backgroundColor === expectedScrim(SEED_LIGHT))
      ).toBe(true);
      settle(r);
    });
  });
});
