import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { fireEvent } from '@testing-library/react-native';
import { SEED_DARK, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { contrastRatio } from '../../theme/color';
import { mixToken } from '../../primitives/internal/v4-depth';
import { resolveIconGlyph } from '../../primitives/icon-names';
import type { ThemeSeed } from '../../theme/types';
import { SplitButtonV4 } from './SplitButtonV4';

const ACTIONS = [
  { key: 'draft', label: 'Save as draft' },
  { key: 'delete', label: 'Delete', destructive: true },
  { key: 'archive', label: 'Archive', disabled: true },
];

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

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flat(n.props.style));
}

const button = (
  <SplitButtonV4 label="Publish" actions={ACTIONS} />
);

describe('SplitButtonV4 (native)', () => {
  it('gives both halves the 44pt a finger needs', () => {
    const { getByText, getByLabelText } = renderThemed(button, SEED_LIGHT);
    // The face was ~36pt tall and the caret ~28pt wide, on the control a
    // screen puts its PRIMARY action in.
    let face: ReactTestInstance | null = getByText('Publish').parent;
    while (face && flat(face.props?.style).minHeight === undefined) face = face.parent;
    expect(flat(face?.props?.style).minHeight).toBe(44);

    const caret = flat(getByLabelText('More actions').props.style);
    expect(caret.minWidth).toBe(44);
    expect(caret.minHeight).toBe(44);
  });

  it('gives every menu row 44pt as well', () => {
    const { getByLabelText, getByText } = renderThemed(button, SEED_LIGHT);
    fireEvent.press(getByLabelText('More actions'));
    let row: ReactTestInstance | null = getByText('Save as draft').parent;
    while (row && flat(row.props?.style).minHeight === undefined) row = row.parent;
    expect(flat(row?.props?.style).minHeight).toBe(44);
  });

  it('labels the outlined variant with the measured brand, on a real ground', () => {
    ([SEED_LIGHT, SEED_DARK] as ThemeSeed[]).forEach((seed) => {
      (['light', 'dark'] as const).forEach((scheme) => {
        const theme = compileTheme(seed);
        const { getByText } = renderThemed(
          <SplitButtonV4 label="Publish" actions={ACTIONS} variant="secondary" />,
          seed,
          scheme
        );
        const color = flat(getByText('Publish').props.style).color as string;
        // `primary` is a FILL slot; `primaryText` is the form walked to AA.
        expect(color).toBe(theme[scheme].primaryText);
        expect(contrastRatio(color, theme[scheme].surface)).toBeGreaterThanOrEqual(4.5);
      });
    });
  });

  it('measures a destructive and a disabled row against the menu', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByLabelText, getByText } = renderThemed(button, SEED_LIGHT);
    fireEvent.press(getByLabelText('More actions'));
    const danger = flat(getByText('Delete').props.style).color as string;
    expect(danger).toBe(theme.light.dangerText);
    expect(contrastRatio(danger, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
    const muted = flat(getByText('Archive').props.style).color as string;
    expect(contrastRatio(muted, theme.light.surface)).toBeGreaterThanOrEqual(4.5);
  });

  it('composites the seam into the face instead of floating it at 40%', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(button, SEED_LIGHT);
    const seam = styles(root).find((s) => s.width === 1);
    // A translucent seam on the outlined variant was 40% of `primary` over
    // whatever happened to be behind the button.
    expect(seam?.backgroundColor).toBe(
      mixToken(theme.light.primary, theme.light.onPrimary, 0.4)
    );
    expect(seam?.opacity).toBeUndefined();
  });

  it('floats the menu on `elevation.card`, which the base gave no shadow at all', () => {
    const theme = compileTheme(SEED_DARK);
    const { getByLabelText, root } = renderThemed(button, SEED_DARK, 'dark');
    fireEvent.press(getByLabelText('More actions'));
    const menu = styles(root).find((s) => s.shadowOpacity !== undefined);
    expect(menu?.shadowOpacity).toBe(theme.darkElevation.card.opacity);
    expect(menu?.shadowColor).toBe(theme.darkElevation.card.color);
  });

  it('zeroes that shadow on a flat seed, with no branch in the component', () => {
    const flatSeed: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
    const { getByLabelText, root } = renderThemed(button, flatSeed);
    fireEvent.press(getByLabelText('More actions'));
    const menu = styles(root).find((s) => s.shadowOpacity !== undefined);
    expect(menu?.shadowOpacity).toBe(0);
  });

  it('sizes the menu from the spacing scale, not from a literal 160', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByLabelText, root } = renderThemed(button, SEED_LIGHT);
    fireEvent.press(getByLabelText('More actions'));
    const menu = styles(root).find((s) => s.minWidth !== undefined && s.borderWidth === 1);
    expect(menu?.minWidth).toBe(theme.spacing['2xl'] * 3 + theme.spacing.md);
  });

  it('takes the caret from the named icon set, decoratively', () => {
    const { getByText } = renderThemed(button, SEED_LIGHT);
    const caret = getByText(resolveIconGlyph('chevron-down'), { includeHiddenElements: true });
    // The state is already on the caret button's `accessibilityState`.
    expect(caret.props.importantForAccessibility).toBe('no');
  });

  it('opens, reports expansion, runs an action and closes', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText, queryByText } = renderThemed(
      <SplitButtonV4
        label="Publish"
        actions={[{ key: 'draft', label: 'Save as draft', onPress }]}
      />,
      SEED_LIGHT
    );
    const caret = getByLabelText('More actions');
    expect(caret.props.accessibilityState.expanded).toBe(false);
    expect(queryByText('Save as draft')).toBeNull();

    fireEvent.press(caret);
    expect(getByLabelText('More actions').props.accessibilityState.expanded).toBe(true);

    fireEvent.press(getByText('Save as draft'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(queryByText('Save as draft')).toBeNull();
  });

  it('fires the primary action, and stops when disabled', () => {
    const onPress = jest.fn();
    const live = renderThemed(
      <SplitButtonV4 label="Publish" actions={ACTIONS} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(live.getByText('Publish'));
    expect(onPress).toHaveBeenCalledTimes(1);

    const dead = renderThemed(
      <SplitButtonV4 label="Publish" actions={ACTIONS} onPress={onPress} disabled />,
      SEED_LIGHT
    );
    fireEvent.press(dead.getByText('Publish'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
