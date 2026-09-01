import '../spec-support/real-animations';
/**
 * `ModalV4` — the behavioural half of its coverage.
 *
 * `modal-v4.native.spec.tsx` next door asserts the *depth* contract: the halo,
 * the scrim colour, glass, token purity. This file asserts what a caller can
 * observe by using the thing — the prop surface (`open`, `onClose`, `title`,
 * `children`), open/closed, the dismiss paths, the empty state §12 asks for,
 * the accessibility affordances, and Reduce Motion.
 */
import * as React from 'react';
import { Modal as RNModal, Text } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { XenitionNativeThemeProvider } from '../theme';
import { expectedScrim, findStyle, flatStyle } from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { ModalV4 } from './ModalV4';

const host = (n: ReactTestInstance): boolean => typeof n.type === 'string';

/** An `Animated.Value` reads as a number; a plain style value already is one. */
function value(v: unknown): number {
  if (typeof v === 'number') return v;
  return (v as { __getValue: () => number }).__getValue();
}

const dialog = (props: Partial<React.ComponentProps<typeof ModalV4>> = {}) => (
  <ModalV4 open onClose={() => {}} title="Delete file" {...props}>
    <Text>dialog body</Text>
  </ModalV4>
);

describe('ModalV4 (native) — behaviour', () => {
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

  /** The dialog panel — the only node that caps its own width. */
  const panelOf = (root: ReactTestInstance): Record<string, unknown> => {
    const style = findStyle(root, (s) => s.maxWidth !== undefined);
    expect(style).toBeDefined();
    return style!;
  };

  describe('the prop surface', () => {
    it('renders a string title as a heading, and the children below it', () => {
      const { getByText } = settle(renderThemed(dialog(), SEED_LIGHT));
      const heading = flatStyle(getByText('Delete file').props.style);
      expect(heading.fontSize).toBe(theme.typography.scale.xl);
      expect(heading.fontFamily).toBe(theme.typography.fontHeading);
      expect(getByText('dialog body')).toBeTruthy();
    });

    it('takes a ReactNode title verbatim, adding no header chrome of its own', () => {
      const { getByText } = settle(
        renderThemed(dialog({ title: <Text>custom header</Text> }), SEED_LIGHT)
      );
      const custom = flatStyle(getByText('custom header').props.style);
      expect(custom.fontSize).toBeUndefined();
      expect(custom.fontFamily).toBeUndefined();
    });

    it('gives the caller a header and a padded body without being asked', () => {
      const { UNSAFE_root } = settle(renderThemed(dialog(), SEED_LIGHT));
      const header = findStyle(
        UNSAFE_root,
        (s) => s.borderBottomWidth === 1 && s.borderBottomColor === theme.light.border
      );
      expect(header).toBeDefined();
      expect(header!.paddingHorizontal).toBe(theme.spacing.lg);

      const body = UNSAFE_root.findAll((n) => n.props?.contentContainerStyle !== undefined)
        .map((n) => flatStyle(n.props.contentContainerStyle))
        .find((s) => s.padding === theme.spacing.lg);
      expect(body).toBeDefined();
    });

    it('caps its height so a long body scrolls under a pinned title', () => {
      const { UNSAFE_root } = settle(
        renderThemed(
          dialog({
            children: (
              <>
                {Array.from({ length: 40 }, (_, i) => (
                  <Text key={i}>{`line ${i}`}</Text>
                ))}
              </>
            ),
          }),
          SEED_LIGHT
        )
      );
      const panel = panelOf(UNSAFE_root);
      expect(panel.maxHeight as number).toBeGreaterThan(0);
      expect(panel.overflow).toBe('hidden');
      // The title lives outside the scroller, so it cannot be pushed off.
      const scroller = UNSAFE_root.findAll((n) => n.props?.contentContainerStyle !== undefined)[0]!;
      expect(scroller.findAll((n) => host(n) && n.props?.children === 'Delete file')).toHaveLength(
        0
      );
    });
  });

  describe('open, closed, and the ways out', () => {
    it('renders nothing while closed', () => {
      const { queryByText } = renderThemed(dialog({ open: false }), SEED_LIGHT);
      expect(queryByText('dialog body')).toBeNull();
      expect(queryByText('Delete file')).toBeNull();
    });

    it('reopens when `open` flips back to true', () => {
      const r = renderThemed(dialog({ open: false }), SEED_LIGHT);
      expect(r.queryByText('dialog body')).toBeNull();
      r.rerender(
        <XenitionNativeThemeProvider theme={SEED_LIGHT}>
          <ModalV4 open onClose={() => {}} title="Delete file">
            <Text>dialog body</Text>
          </ModalV4>
        </XenitionNativeThemeProvider>
      );
      settle(r);
      expect(r.getByText('dialog body')).toBeTruthy();
    });

    it('closes on the scrim', () => {
      const onClose = jest.fn();
      const { getByLabelText } = settle(renderThemed(dialog({ onClose }), SEED_LIGHT));
      // The panel sets `accessibilityViewIsModal`, which hides its sibling
      // scrim from the default queries.
      fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('closes on the Android back gesture', () => {
      const onClose = jest.fn();
      const { UNSAFE_getByType } = settle(renderThemed(dialog({ onClose }), SEED_LIGHT));
      const modal = UNSAFE_getByType(RNModal);
      expect(modal.props.transparent).toBe(true);
      act(() => modal.props.onRequestClose());
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not close itself — dismissal is the caller’s to decide', () => {
      const onClose = jest.fn();
      const { getByText } = settle(renderThemed(dialog({ onClose }), SEED_LIGHT));
      // Tapping the body is not a dismissal. A dialog that closes when you
      // touch its own content cannot hold a form.
      fireEvent.press(getByText('dialog body'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('the empty state', () => {
    it('renders with no title and no children, and does not crash', () => {
      const render = (): ReturnType<typeof renderThemed> =>
        settle(renderThemed(<ModalV4 open onClose={() => {}} />, SEED_LIGHT));
      expect(render).not.toThrow();
      const { UNSAFE_root } = render();
      expect(panelOf(UNSAFE_root).maxWidth).toBe(theme.spacing['2xl'] * 10);
    });

    it('draws no header hairline when there is no title to divide off', () => {
      const { UNSAFE_root } = settle(
        renderThemed(<ModalV4 open onClose={() => {}} />, SEED_LIGHT)
      );
      // A rule with nothing above it is a hole. The header is omitted whole.
      const header = findStyle(
        UNSAFE_root,
        (s) => s.borderBottomWidth === 1 && s.borderBottomColor === theme.light.border
      );
      expect(header).toBeUndefined();
    });

    it('keeps the scrim, so an empty dialog is still dismissible', () => {
      const onClose = jest.fn();
      const { getByLabelText } = settle(
        renderThemed(<ModalV4 open onClose={onClose} />, SEED_LIGHT)
      );
      fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('renders a title with no body, and a body with no title', () => {
      const titleOnly = settle(
        renderThemed(<ModalV4 open onClose={() => {}} title="Just a title" />, SEED_LIGHT)
      );
      expect(titleOnly.getByText('Just a title')).toBeTruthy();

      const bodyOnly = settle(renderThemed(dialog({ title: undefined }), SEED_LIGHT));
      expect(bodyOnly.queryByText('Delete file')).toBeNull();
      expect(bodyOnly.getByText('dialog body')).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('walls the dialog off from the page and announces it as an alert', () => {
      const { UNSAFE_root } = settle(renderThemed(dialog(), SEED_LIGHT));
      const panel = UNSAFE_root.findAll(
        (n) => host(n) && n.props?.accessibilityViewIsModal === true
      );
      expect(panel.length).toBeGreaterThan(0);
      expect(panel[0]!.props.accessibilityRole).toBe('alert');
    });

    it('labels the scrim, so the dismiss target is not silent', () => {
      const { getByLabelText } = settle(renderThemed(dialog(), SEED_LIGHT));
      expect(getByLabelText('Close', { includeHiddenElements: true })).toBeTruthy();
    });

    it('titles in plain ink, never in `muted` — the panel may be glass', () => {
      const { getByText } = settle(renderThemed(dialog(), SEED_LIGHT));
      const style = flatStyle(getByText('Delete file').props.style);
      expect(style.color).toBe(theme.light.onSurface);
      expect(style.color).not.toBe(theme.light.muted);
    });

    it('lifts the panel and nothing inside it', () => {
      const { UNSAFE_root } = settle(renderThemed(dialog(), SEED_LIGHT));
      const lifted = UNSAFE_root.findAll(host)
        .map((n) => flatStyle(n.props?.style))
        .filter((s) => s.shadowRadius === theme.lightElevation.sheet.radius);
      expect(lifted).toHaveLength(1);
    });
  });

  describe('reduced motion', () => {
    const opacityOf = (root: ReactTestInstance): number => value(panelOf(root).opacity);
    const scaleOf = (root: ReactTestInstance): unknown =>
      (panelOf(root).transform as { scale: unknown }[])[0]!.scale;

    it('drops the scale entirely and is at rest the moment it opens', async () => {
      const { AccessibilityInfo } = jest.requireActual('react-native');
      jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);

      const r = renderThemed(dialog(), SEED_LIGHT);
      await act(async () => {});
      // No timers run: under Reduce Motion the dialog is simply there, at its
      // natural size — the scale is a plain 1, not an interpolation.
      expect(scaleOf(r.UNSAFE_root)).toBe(1);
      expect(opacityOf(r.UNSAFE_root)).toBe(1);
      expect(r.getByText('dialog body')).toBeTruthy();
      settle(r);
    });

    it('scales and fades in when motion is allowed, and ends at rest', async () => {
      const r = renderThemed(dialog(), SEED_LIGHT);
      await act(async () => {});
      // Not a plain number while animating: it is driven off the progress value.
      expect(typeof scaleOf(r.UNSAFE_root)).not.toBe('number');
      expect(opacityOf(r.UNSAFE_root)).toBeLessThan(1);
      settle(r);
      expect(opacityOf(r.UNSAFE_root)).toBe(1);
      expect(value(scaleOf(r.UNSAFE_root))).toBe(1);
    });

    it('keeps the scrim under Reduce Motion — an overlay with no veil reads as a glitch', async () => {
      const { AccessibilityInfo } = jest.requireActual('react-native');
      jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
      const r = renderThemed(dialog(), SEED_LIGHT);
      await act(async () => {});
      const scrim = findStyle(r.UNSAFE_root, (s) => s.backgroundColor === expectedScrim(SEED_LIGHT));
      expect(scrim).toBeDefined();
      expect(value(scrim!.opacity)).toBe(1);
      settle(r);
    });
  });
});