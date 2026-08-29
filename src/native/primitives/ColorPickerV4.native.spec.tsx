import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_BOTH,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { ColorPickerV4 } from './ColorPickerV4';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  root.findAll(() => true).forEach((node) => walk(node.props?.style));
  return out;
}

/** The swatch button's own style (the one carrying the selection ring). */
function ring(cell: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(cell).find((s) => s.borderWidth === 2);
}

describe('ColorPickerV4 (native)', () => {
  it('gives every swatch the tap-target floor, not a 36px chip', () => {
    const { getByLabelText } = renderThemed(<ColorPickerV4 />, SEED_LIGHT);
    const swatch = getByLabelText('Primary');
    const style = swatch.props.style as { width: number; height: number };
    expect(style.width).toBe(TARGET);
    expect(style.height).toBe(TARGET);
    expect(TARGET).toBeGreaterThanOrEqual(44);
  });

  it('draws the coloured chip smaller than the target it sits in', () => {
    const { getByLabelText } = renderThemed(<ColorPickerV4 />, SEED_LIGHT);
    const chip = styles(getByLabelText('Primary')).find(
      (s) => s.backgroundColor === THEME.light.primary
    );
    expect(chip?.width).toBe(TARGET - THEME.spacing.md);
  });

  it('marks the selection with a ring, never with ink on the swatch', () => {
    const { getByLabelText, queryByText } = renderThemed(
      <ColorPickerV4 value={THEME.light.success} />,
      SEED_LIGHT
    );
    expect(ring(getByLabelText('Success'))?.borderColor).toBe(THEME.light.primary);
    expect(getByLabelText('Success').props.accessibilityState).toMatchObject({ selected: true });
    // No tick: `onPrimary` over an arbitrary swatch carries no contrast promise.
    expect(queryByText('✓')).toBeNull();
  });

  it('reserves the ring so choosing a colour never reflows the grid', () => {
    const { getByLabelText } = renderThemed(<ColorPickerV4 />, SEED_LIGHT);
    const unselected = ring(getByLabelText('Primary'));
    expect(unselected?.borderWidth).toBe(2);
    expect(unselected?.borderColor).toBe('transparent');
  });

  it('gives every chip a hairline, so a surface-coloured swatch still has an edge', () => {
    const { getByLabelText } = renderThemed(<ColorPickerV4 />, SEED_LIGHT);
    const chip = styles(getByLabelText('Surface')).find(
      (s) => s.backgroundColor === THEME.light.surface
    );
    expect(chip?.borderWidth).toBe(1);
    expect(chip?.borderColor).toBe(THEME.light.border);
  });

  it('resolves the ring per scheme, not from a ramp', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { getByLabelText } = renderThemed(
        <ColorPickerV4 value={theme[scheme].accent} />,
        SEED_BOTH,
        scheme
      );
      return ring(getByLabelText('Accent'))?.borderColor;
    };
    expect(read('light')).toBe(theme.light.primary);
    expect(read('dark')).toBe(theme.dark.primary);
  });

  it('reports the chosen swatch value', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(<ColorPickerV4 onChange={onChange} />, SEED_LIGHT);
    fireEvent.press(getByLabelText('Danger'));
    expect(onChange).toHaveBeenCalledWith(THEME.light.danger);
  });

  it('takes caller swatches as given', () => {
    const onChange = jest.fn();
    const { getByLabelText, queryByLabelText } = renderThemed(
      <ColorPickerV4
        swatches={[{ label: 'Brand', value: THEME.light.primary }]}
        onChange={onChange}
      />,
      SEED_LIGHT
    );
    expect(queryByLabelText('Success')).toBeNull();
    fireEvent.press(getByLabelText('Brand'));
    expect(onChange).toHaveBeenCalledWith(THEME.light.primary);
  });

  it('spends no depth on a swatch grid', () => {
    const { root } = renderThemed(<ColorPickerV4 value={THEME.light.primary} />, SEED_LIGHT);
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });

  it('renders token-pure in both schemes', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const { root } = renderThemed(<ColorPickerV4 />, SEED_BOTH, scheme);
      const allowed = tokenHexSet(SEED_BOTH);
      for (const hex of renderedStyleHexes(root)) {
        expect(allowed.has(hex)).toBe(true);
      }
    }
  });
});
