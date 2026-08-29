import * as React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import {
  SEED_BOTH,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
} from '../spec-support/render-native';
import { allStyles, expectedScrim, expectedSheetShadow, findStyle, flatStyle } from '../spec-support/surface-v4';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import { composeGlass } from '../../theme/glass';
import { ActionSheet } from './ActionSheet';
import { ActionSheetV4 } from './ActionSheetV4';

/*
  The test renderer yields BOTH the composite element and the host view it
  rendered, so an unfiltered `findAll` counts every node twice. Only host nodes
  are real output.
*/
const host = (n: ReactTestInstance): boolean => typeof n.type === 'string';

const ACTIONS = [
  { label: 'Rename' },
  { label: 'Delete', destructive: true },
  { label: 'Duplicate' },
  { label: 'Archive', disabled: true },
];

const sheet = (props: Partial<React.ComponentProps<typeof ActionSheetV4>> = {}) => (
  <ActionSheetV4 open onClose={() => {}} actions={ACTIONS} {...props} />
);

describe('ActionSheetV4 (native)', () => {
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
    const same: React.ComponentProps<typeof ActionSheet> = {
      open: true,
      onClose: () => {},
      title: 'File',
      actions: ACTIONS,
      cancelLabel: 'Not now',
    };
    const asV4: React.ComponentProps<typeof ActionSheetV4> = same;
    expect(asV4).toBe(same);
  });

  it('renders every action only when open', () => {
    expect(renderThemed(sheet({ open: false }), SEED_LIGHT).queryByText('Rename')).toBeNull();
    const { getByText } = settle(renderThemed(sheet(), SEED_LIGHT));
    for (const action of ACTIONS) expect(getByText(action.label)).toBeTruthy();
  });

  it('puts the destructive action in its own group, after the ordinary ones', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
    const menus = UNSAFE_root.findAll((n) => host(n) && n.props?.accessibilityRole === 'menu');
    expect(menus).toHaveLength(2);
    const text = (node: (typeof menus)[number]): string =>
      node
        .findAll((n) => host(n) && typeof n.props?.children === 'string')
        .map((n) => String(n.props.children))
        .join('');
    expect(text(menus[0]!)).toContain('Rename');
    expect(text(menus[0]!)).not.toContain('Delete');
    expect(text(menus[1]!)).toBe('Delete');
  });

  it('renders one group when nothing is destructive', () => {
    const { UNSAFE_root } = settle(
      renderThemed(sheet({ actions: [{ label: 'Rename' }, { label: 'Duplicate' }] }), SEED_LIGHT)
    );
    expect(UNSAFE_root.findAll((n) => host(n) && n.props?.accessibilityRole === 'menu')).toHaveLength(1);
  });

  it('colours only the destructive row — everything else is plain ink', () => {
    const { getByText } = settle(renderThemed(sheet(), SEED_LIGHT));
    const { light } = compileTheme(SEED_LIGHT);
    const colorOf = (label: string): unknown => allStyles(getByText(label))[0]!.color;

    // The base tints EVERY row with `primary`, leaving no hierarchy at all —
    // and `primary` is a FILL colour with no contrast promise as text.
    expect(colorOf('Rename')).toBe(light.onSurface);
    expect(colorOf('Duplicate')).toBe(light.onSurface);
    expect(colorOf('Rename')).not.toBe(light.primary);
    // `dangerText`, the contrast-corrected form — not the `danger` fill.
    expect(colorOf('Delete')).toBe(light.dangerText);
  });

  it('lifts every group to the same altitude, and nests none inside another', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
    const expected = expectedSheetShadow(SEED_LIGHT);
    const lifted = UNSAFE_root.findAll(host)
      .map((n) => flatStyle(n.props?.style))
      .filter((s) => s.shadowRadius === expected.shadowRadius);
    // Two action groups plus the Cancel card, all siblings on one plane.
    expect(lifted).toHaveLength(3);
    for (const s of lifted) {
      expect(s.shadowOpacity).toBe(expected.shadowOpacity);
      expect(s.elevation).toBe(expected.elevation);
    }
  });

  it('scrims from the shadow colour, which stays dark in both schemes', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_BOTH, scheme));
      const expected = expectedScrim(SEED_BOTH, scheme);
      expect(findStyle(UNSAFE_root, (s) => s.backgroundColor === expected)).toBeDefined();
      const rgb = /rgba\((\d+), (\d+), (\d+)/.exec(expected)!;
      expect(Math.max(Number(rgb[1]), Number(rgb[2]), Number(rgb[3]))).toBeLessThan(64);
    }
  });

  it('turns translucent only when the seed asks for glass', () => {
    const theme = compileTheme({ ...SEED_LIGHT, depth: 'glass' });
    const fill = composeGlass(theme.lightGlass, theme.light.surface, 'regular');
    const glassy = settle(renderThemed(sheet(), { ...SEED_LIGHT, depth: 'glass' }));
    expect(
      findStyle(glassy.UNSAFE_root, (s) => s.backgroundColor === fill.backgroundColor)
    ).toBeDefined();

    for (const depth of ['soft', 'flat'] as const) {
      const solid = settle(renderThemed(sheet(), { ...SEED_LIGHT, depth }));
      expect(
        allStyles(solid.UNSAFE_root).some((s) => s.backgroundColor === fill.backgroundColor)
      ).toBe(false);
    }
  });

  it('goes flat for free — no depth branch on the shadow', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet(), { ...SEED_LIGHT, depth: 'flat' }));
    const shadows = allStyles(UNSAFE_root).filter((s) => s.shadowColor !== undefined);
    expect(shadows.length).toBeGreaterThan(0);
    for (const s of shadows) expect(s.shadowOpacity).toBe(0);
  });

  it('fires onSelect and closes; a disabled row is marked disabled', () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    const { getByText, UNSAFE_root } = settle(
      renderThemed(
        sheet({ onClose, actions: [{ label: 'Rename', onSelect }, { label: 'Archive', disabled: true }] }),
        SEED_LIGHT
      )
    );
    fireEvent.press(getByText('Rename'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    const archive = UNSAFE_root.findAll(
      (n) => host(n) && n.props?.accessibilityState?.disabled === true
    );
    expect(archive.length).toBeGreaterThan(0);
  });

  it('closes on Cancel and on the scrim', () => {
    const onClose = jest.fn();
    const { getByText, getByLabelText } = settle(
      renderThemed(sheet({ onClose, cancelLabel: 'Not now' }), SEED_LIGHT)
    );
    fireEvent.press(getByText('Not now'));
    fireEvent.press(getByLabelText('Close', { includeHiddenElements: true }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('renders the title in plain ink, because the card may be glass', () => {
    const { getByText } = settle(renderThemed(sheet({ title: 'File actions' }), SEED_LIGHT));
    const { light, typography } = compileTheme(SEED_LIGHT);
    const style = allStyles(getByText('File actions'))[0]!;
    // `muted` measurably falls below AA on glass; size does the de-emphasis.
    expect(style.color).toBe(light.onSurface);
    expect(style.color).not.toBe(light.muted);
    expect(style.fontSize).toBe(typography.scale.sm);
  });

  it('gives every row a tap target from the spacing scale', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet(), SEED_LIGHT));
    const { spacing } = compileTheme(SEED_LIGHT);
    const rows = UNSAFE_root.findAll((n) => host(n) && n.props?.accessibilityRole === 'menuitem');
    expect(rows.length).toBe(ACTIONS.length);
    for (const row of rows) {
      expect(flatStyle(row.props.style).minHeight).toBe(spacing['2xl']);
    }
  });

  it('introduces no colour that is not a token', () => {
    const { UNSAFE_root } = settle(renderThemed(sheet({ title: 'File actions' }), SEED_LIGHT));
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
