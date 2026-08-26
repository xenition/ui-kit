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
import { CalendarV4 } from './CalendarV4';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];

/** Every style object in the tree, flattened one level out of arrays. */
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

const MARCH = new Date(2024, 2, 15);

describe('CalendarV4 (native)', () => {
  it('gives every day cell a target off the spacing scale, not a 36px pill', () => {
    const { getByLabelText } = renderThemed(<CalendarV4 month={MARCH} />, SEED_LIGHT);
    const cell = getByLabelText('March 14, 2024');
    expect((cell.props.style as { height: number }).height).toBe(TARGET);
    // 48 clears the 44px floor both platform guidelines set.
    expect(TARGET).toBeGreaterThanOrEqual(44);
  });

  it('gives the month chevrons the same target as a day', () => {
    const { getByLabelText } = renderThemed(<CalendarV4 month={MARCH} />, SEED_LIGHT);
    for (const label of ['Previous month', 'Next month']) {
      const style = styles(getByLabelText(label)).find((s) => s.width === TARGET);
      expect(style?.width).toBe(TARGET);
      expect(style?.height).toBe(TARGET);
    }
  });

  it('fills the selected day with the contrast-checked brand pair', () => {
    const { getByLabelText } = renderThemed(
      <CalendarV4 month={MARCH} selected={MARCH} />,
      SEED_LIGHT
    );
    const cell = getByLabelText('March 15, 2024');
    const discs = styles(cell).filter((s) => s.borderRadius === THEME.radius.full);
    expect(discs.some((s) => s.backgroundColor === THEME.light.primary)).toBe(true);
    expect(cell.props.accessibilityState).toMatchObject({ selected: true });
  });

  it('keeps the selection unmistakable in dark mode', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { getByLabelText } = renderThemed(
        <CalendarV4 month={MARCH} selected={MARCH} />,
        SEED_BOTH,
        scheme
      );
      const cell = getByLabelText('March 15, 2024');
      return styles(cell).find((s) => s.backgroundColor === theme[scheme].primary)
        ?.backgroundColor;
    };
    expect(read('light')).toBe(theme.light.primary);
    expect(read('dark')).toBe(theme.dark.primary);
    // The two are different colours: the fill is resolved per scheme, not a ramp step.
    expect(read('light')).not.toBe(read('dark'));
  });

  it('rings today in primary so it cannot be mistaken for a cell edge', () => {
    const today = new Date();
    const label = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(today);
    const { getByLabelText } = renderThemed(<CalendarV4 month={today} />, SEED_LIGHT);
    const cell = getByLabelText(label);
    const ringed = styles(cell).find((s) => s.borderWidth === 1);
    expect(ringed?.borderColor).toBe(THEME.light.primary);
    expect(ringed?.borderColor).not.toBe(THEME.light.border);
  });

  it('floats the panel on elevation.card and keeps its hairline', () => {
    const { root } = renderThemed(<CalendarV4 month={MARCH} />, SEED_LIGHT);
    const panel = styles(root).find((s) => s.shadowOpacity !== undefined);
    expect(panel?.shadowOpacity).toBe(THEME.lightElevation.card.opacity);
    expect(panel?.borderRadius).toBe(THEME.radius.lg);
    expect(panel?.borderColor).toBe(THEME.light.border);
  });

  it('reports the tapped day and the paged month', () => {
    const onSelectDate = jest.fn();
    const onMonthChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <CalendarV4 month={MARCH} onSelectDate={onSelectDate} onMonthChange={onMonthChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('March 14, 2024'));
    expect(onSelectDate).toHaveBeenCalledTimes(1);
    expect((onSelectDate.mock.calls[0]![0] as Date).getDate()).toBe(14);

    fireEvent.press(getByLabelText('Next month'));
    expect((onMonthChange.mock.calls[0]![0] as Date).getMonth()).toBe(3);
  });

  it('marks a day with an accent dot, flipped to onPrimary on the selection', () => {
    const { getByLabelText } = renderThemed(
      <CalendarV4 month={MARCH} marks={[new Date(2024, 2, 20)]} selected={MARCH} />,
      SEED_LIGHT
    );
    const marked = styles(getByLabelText('March 20, 2024'));
    expect(marked.some((s) => s.backgroundColor === THEME.light.accent)).toBe(true);

    const selectedMarked = renderThemed(
      <CalendarV4 month={MARCH} marks={[MARCH]} selected={MARCH} />,
      SEED_LIGHT
    );
    const dots = styles(selectedMarked.getByLabelText('March 15, 2024'));
    expect(dots.some((s) => s.backgroundColor === THEME.light.onPrimary)).toBe(true);
  });

  it('renders token-pure in both schemes', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const { root } = renderThemed(
        <CalendarV4 month={MARCH} selected={MARCH} marks={[MARCH]} />,
        SEED_BOTH,
        scheme
      );
      const allowed = tokenHexSet(SEED_BOTH);
      for (const hex of renderedStyleHexes(root)) {
        expect(allowed.has(hex)).toBe(true);
      }
    }
  });
});
