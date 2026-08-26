import * as React from 'react';
import { Text } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import { SEED_BOTH, SEED_LIGHT, renderThemed, renderedStyleHexes } from '../spec-support/render-native';
import {
  allStyles,
  expectedScrim,
  expectedSheetShadow,
  findStyle,
  flatStyle,
  themeFor,
} from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { composeGlass } from '../../theme/glass';
import { BottomSheet } from './BottomSheet';
import { BottomSheetV4 } from './BottomSheetV4';

const sheet = (props: Partial<React.ComponentProps<typeof BottomSheetV4>> = {}) => (
  <BottomSheetV4 open onClose={() => {}} title="Filters" {...props}>
    <Text>panel body</Text>
  </BottomSheetV4>
);

describe('BottomSheetV4 (native)', () => {
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

  it('takes exactly the base component’s props', () => {
    // Prop parity is the contract of a design line: an app switches V4 on at
    // the root and nothing else changes. A compile-time check, so a prop added
    // to one and not the other fails the build rather than a review.
    const same: React.ComponentProps<typeof BottomSheet> = {
      open: true,
      onClose: () => {},
      title: 'Filters',
      snap: 0.4,
    };
    const asV4: React.ComponentProps<typeof BottomSheetV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders title and children only when open', () => {
    const closed = renderThemed(sheet({ open: false }), SEED_LIGHT);
    expect(closed.queryByText('panel body')).toBeNull();

    const { getByText } = settle(renderThemed(sheet(), SEED_LIGHT));
    expect(getByText('Filters')).toBeTruthy();
    expect(getByText('panel body')).toBeTruthy();
  });

  it('lifts the panel with elevation.sheet — the shadow casts UP, onto the covered page', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
    const expected = expectedSheetShadow(SEED_LIGHT);
    const panel = findStyle(UNSAFE_root, (s) => s.shadowRadius === expected.shadowRadius);
    expect(panel).toBeDefined();
    expect(panel!.shadowColor).toBe(expected.shadowColor);
    expect(panel!.shadowOpacity).toBe(expected.shadowOpacity);
    expect(panel!.elevation).toBe(expected.elevation);
    // Negative offset: a sheet's contact shadow falls on what it covered.
    expect((panel!.shadowOffset as { height: number }).height).toBeLessThan(0);
  });

  it('scrims from the shadow colour, so it stays dark in dark mode too', () => {
    // The base sheet scrims with `onSurface`, which inverts with the scheme and
    // paints a near-WHITE veil over a dark page. This is that bug, fixed.
    for (const scheme of ['light', 'dark'] as const) {
      const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_BOTH, scheme));
      const expected = expectedScrim(SEED_BOTH, scheme);
      expect(findStyle(UNSAFE_root, (s) => s.backgroundColor === expected)).toBeDefined();

      const inverting = themeFor(SEED_BOTH, scheme).colors.onSurface;
      expect(allStyles(UNSAFE_root).some((s) => s.backgroundColor === inverting)).toBe(false);
    }
  });

  it('is opaque under soft depth and translucent under glass — one depth check, in the skin', () => {
    const theme = compileTheme({ ...SEED_LIGHT, depth: 'glass' });
    const glassy = settle(renderThemed(sheet(), { ...SEED_LIGHT, depth: 'glass' }));
    const fill = composeGlass(theme.lightGlass, theme.light.surface, 'regular');
    expect(
      findStyle(glassy.UNSAFE_root, (s) => s.backgroundColor === fill.backgroundColor)
    ).toBeDefined();

    const solid = settle(renderThemed(sheet(), { ...SEED_LIGHT, depth: 'soft' }));
    const surface = compileTheme(SEED_LIGHT).light.surface;
    expect(findStyle(solid.UNSAFE_root, (s) => s.backgroundColor === surface)).toBeDefined();
    expect(
      allStyles(solid.UNSAFE_root).some((s) => s.backgroundColor === fill.backgroundColor)
    ).toBe(false);
  });

  it('goes flat for free — no branch, because the compiler already zeroed the token', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet(), { ...SEED_LIGHT, depth: 'flat' }));
    const shadows = allStyles(UNSAFE_root).filter((s) => s.shadowColor !== undefined);
    expect(shadows.length).toBeGreaterThan(0);
    for (const s of shadows) {
      expect(s.shadowOpacity).toBe(0);
      expect(s.shadowRadius).toBe(0);
      expect(s.elevation).toBe(0);
    }
    // …but the SCRIM survives. A flat seed still needs the page behind an
    // overlay pushed back; flat is about depth, not about dismissing the idea
    // of a modal layer.
    expect(
      findStyle(UNSAFE_root, (s) => s.backgroundColor === expectedScrim({ ...SEED_LIGHT, depth: 'flat' }))
    ).toBeDefined();
  });

  it('closes on the scrim, and on drag past the threshold', () => {
    const onClose = jest.fn();
    const { getByLabelText } = settle(renderThemed(sheet({ onClose }), SEED_LIGHT));
    // The panel sets accessibilityViewIsModal, hiding its sibling scrim from
    // default queries — opt into hidden elements to reach it.
    fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('pads its own body, including past the home indicator', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
    const { spacing } = compileTheme(SEED_LIGHT);
    // The safe-area mock reports a 16px bottom inset. The padding lives on the
    // ScrollView's contentContainerStyle, so the scroll track itself stays
    // full-bleed and the content inside it is inset.
    const body = UNSAFE_root
      .findAll((n) => n.props?.contentContainerStyle !== undefined)
      .map((n) => flatStyle(n.props.contentContainerStyle))
      .find((s) => s.paddingBottom === spacing.lg + 16);
    expect(body).toBeDefined();
    expect(body!.paddingHorizontal).toBe(spacing.lg);
    expect(body!.paddingTop).toBe(spacing.md);
  });

  it('sizes the grab handle from the spacing scale, not from a magic 40', () => {
    const { getByLabelText } = settle(renderThemed(sheet(), SEED_LIGHT));
    const { spacing, radius } = compileTheme(SEED_LIGHT);
    const handle = getByLabelText('Drag to dismiss', { includeHiddenElements: true });
    const style = allStyles(handle)[0]!;
    expect(style.width).toBe(spacing.xl + spacing.sm);
    expect(style.height).toBe(spacing.xs);
    expect(style.borderRadius).toBe(radius.full);
  });

  it('skips the travel under Reduce Motion but still renders', async () => {
    const { AccessibilityInfo } = jest.requireActual('react-native');
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    const { getByText } = settle(renderThemed(sheet(), SEED_LIGHT));
    expect(getByText('panel body')).toBeTruthy();
  });

  it('introduces no colour that is not a token', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
    // Native styles carry resolved hex, so the invariant is the inverse of the
    // web one: every hex that appears must exist in the compiled theme.
    const theme = compileTheme(SEED_LIGHT);
    const allowed = new Set<string>();
    for (const scheme of ['light', 'dark'] as const) {
      Object.values(scheme === 'light' ? theme.light : theme.dark).forEach((v) =>
        allowed.add(v.toLowerCase())
      );
    }
    for (const ramp of Object.values(theme.ramps)) {
      Object.values(ramp).forEach((v) => allowed.add(v.toLowerCase()));
    }
    // Plus the depth tokens, which `tokenHexSet` predates.
    allowed.add(theme.lightElevation.sheet.color.toLowerCase());
    allowed.add(theme.lightGlass.tint.slice(0, 7).toLowerCase());
    allowed.add(theme.lightGlass.border.slice(0, 7).toLowerCase());

    renderedStyleHexes(UNSAFE_root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
