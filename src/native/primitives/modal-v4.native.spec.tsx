import * as React from 'react';
import { Text } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import {
  SEED_BOTH,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
} from '../spec-support/render-native';
import {
  allStyles,
  expectedScrim,
  expectedSheetShadow,
  findStyle,
  flatStyle,
} from '../spec-support/surface-v4';
import { compileTheme } from '../../theme/compile';
import { composeGlass } from '../../theme/glass';
import { Modal } from './Modal';
import { ModalV4 } from './ModalV4';

const dialog = (props: Partial<React.ComponentProps<typeof ModalV4>> = {}) => (
  <ModalV4 open onClose={() => {}} title="Delete file" {...props}>
    <Text>dialog body</Text>
  </ModalV4>
);

describe('ModalV4 (native)', () => {
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
    const same: React.ComponentProps<typeof Modal> = {
      open: true,
      onClose: () => {},
      title: 'Delete file',
    };
    const asV4: React.ComponentProps<typeof ModalV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders title and children only when open', () => {
    expect(renderThemed(dialog({ open: false }), SEED_LIGHT).queryByText('dialog body')).toBeNull();
    const { getByText } = settle(renderThemed(dialog(), SEED_LIGHT));
    expect(getByText('Delete file')).toBeTruthy();
    expect(getByText('dialog body')).toBeTruthy();
  });

  it('floats on the sheet elevation — a halo, because nothing is under a dialog', () => {
    const { UNSAFE_root } = settle(renderThemed(dialog(), SEED_LIGHT));
    const expected = expectedSheetShadow(SEED_LIGHT);
    const panel = findStyle(UNSAFE_root, (s) => s.shadowRadius === expected.shadowRadius);
    expect(panel).toBeDefined();
    expect(panel!.shadowColor).toBe(expected.shadowColor);
    expect(panel!.shadowOpacity).toBe(expected.shadowOpacity);
    // A wide radius with a near-zero offset is a halo, not a drop shadow. A
    // drop shadow implies a surface below to receive it; a dialog has none.
    expect(expected.shadowRadius as number).toBeGreaterThan(
      Math.abs((expected.shadowOffset as { height: number }).height)
    );
  });

  it('scrims from the shadow colour, not from an inverting ramp step', () => {
    // The base Modal scrims with `ramps.neutral[950]`, and the ramps carry the
    // LIGHT orientation in BOTH schemes — so in dark mode that step is the
    // lightest colour in the theme and the scrim is a white veil.
    for (const scheme of ['light', 'dark'] as const) {
      const { UNSAFE_root } = settle(renderThemed(dialog(), SEED_BOTH, scheme));
      expect(
        findStyle(UNSAFE_root, (s) => s.backgroundColor === expectedScrim(SEED_BOTH, scheme))
      ).toBeDefined();
      // The property that actually matters: the scrim is DARK in both schemes.
      // (Asserting it merely differs from a ramp step would not catch this —
      // in dark mode `surface` IS `ramps.neutral[950]`, legitimately.)
      const rgb = /rgba\((\d+), (\d+), (\d+)/.exec(expectedScrim(SEED_BOTH, scheme))!;
      expect(Math.max(Number(rgb[1]), Number(rgb[2]), Number(rgb[3]))).toBeLessThan(64);
    }
  });

  it('turns translucent only when the seed asks for glass', () => {
    const theme = compileTheme({ ...SEED_LIGHT, depth: 'glass' });
    const fill = composeGlass(theme.lightGlass, theme.light.surface, 'regular');
    const glassy = settle(renderThemed(dialog(), { ...SEED_LIGHT, depth: 'glass' }));
    expect(
      findStyle(glassy.UNSAFE_root, (s) => s.backgroundColor === fill.backgroundColor)
    ).toBeDefined();

    for (const depth of ['soft', 'flat'] as const) {
      const solid = settle(renderThemed(dialog(), { ...SEED_LIGHT, depth }));
      expect(
        allStyles(solid.UNSAFE_root).some((s) => s.backgroundColor === fill.backgroundColor)
      ).toBe(false);
    }
  });

  it('goes flat for free — no depth branch on the shadow', () => {
    const { UNSAFE_root } = settle(renderThemed(dialog(), { ...SEED_LIGHT, depth: 'flat' }));
    const shadows = allStyles(UNSAFE_root).filter((s) => s.shadowColor !== undefined);
    expect(shadows.length).toBeGreaterThan(0);
    for (const s of shadows) {
      expect(s.shadowOpacity).toBe(0);
      expect(s.elevation).toBe(0);
    }
  });

  it('gives the caller a header and a body without asking them to pad either', () => {
    const { UNSAFE_root } = settle(renderThemed(dialog(), SEED_LIGHT));
    const { spacing, light } = compileTheme(SEED_LIGHT);

    const header = findStyle(
      UNSAFE_root,
      (s) => s.borderBottomWidth === 1 && s.paddingTop === spacing.lg
    );
    expect(header).toBeDefined();
    expect(header!.borderBottomColor).toBe(light.border);
    expect(header!.paddingHorizontal).toBe(spacing.lg);

    const body = UNSAFE_root.findAll((n) => n.props?.contentContainerStyle !== undefined)
      .map((n) => flatStyle(n.props.contentContainerStyle))
      .find((s) => s.padding === spacing.lg);
    expect(body).toBeDefined();
  });

  it('measures itself from the spacing scale, and caps its height so the title stays put', () => {
    const { UNSAFE_root } = settle(renderThemed(dialog(), SEED_LIGHT));
    const { spacing } = compileTheme(SEED_LIGHT);
    const panel = findStyle(UNSAFE_root, (s) => s.maxWidth !== undefined);
    expect(panel).toBeDefined();
    // Ten of the largest spacing step, not a literal 480 that cannot move when
    // the theme's density does.
    expect(panel!.maxWidth).toBe(spacing['2xl'] * 10);
    expect(panel!.maxHeight).toBeGreaterThan(0);
  });

  it('closes on the scrim', () => {
    const onClose = jest.fn();
    const { getByLabelText } = settle(renderThemed(dialog({ onClose }), SEED_LIGHT));
    fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders with no header when no title is given', () => {
    const { queryByText, getByText } = settle(
      renderThemed(dialog({ title: undefined }), SEED_LIGHT)
    );
    expect(queryByText('Delete file')).toBeNull();
    expect(getByText('dialog body')).toBeTruthy();
  });

  it('drops the scale under Reduce Motion and still renders', () => {
    const { AccessibilityInfo } = jest.requireActual('react-native');
    jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(true);
    const { getByText } = settle(renderThemed(dialog(), SEED_LIGHT));
    expect(getByText('dialog body')).toBeTruthy();
  });

  it('introduces no colour that is not a token', () => {
    const { UNSAFE_root } = settle(renderThemed(dialog(), SEED_LIGHT));
    const theme = compileTheme(SEED_LIGHT);
    const allowed = new Set<string>();
    Object.values(theme.light).forEach((v) => allowed.add(v.toLowerCase()));
    Object.values(theme.dark).forEach((v) => allowed.add(v.toLowerCase()));
    for (const ramp of Object.values(theme.ramps)) {
      Object.values(ramp).forEach((v) => allowed.add(v.toLowerCase()));
    }
    allowed.add(theme.lightElevation.sheet.color.toLowerCase());
    renderedStyleHexes(UNSAFE_root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
