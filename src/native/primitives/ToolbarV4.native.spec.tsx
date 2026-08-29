import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { ToolbarV4 } from './ToolbarV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const ACTIONS = [
  { key: 'share', label: 'Share' },
  { key: 'delete', label: 'Delete', destructive: true },
];
const OVERFLOW = [
  { key: 'export', label: 'Export' },
  { key: 'archive', label: 'Archive', disabled: true },
];
const FLAT_SEED: ThemeSeed = { ...SEED_LIGHT, depth: 'flat' };
const SHARP_SEED: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };

function flatten(style: unknown): Record<string, unknown> {
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

function styleOf(node: ReactTestInstance | undefined): Record<string, unknown> {
  return flatten(node?.props?.style);
}

/**
 * The bar itself. Queried by prop rather than by role: the bar carries
 * `accessibilityRole="toolbar"` but is deliberately NOT an accessibility
 * element of its own — making it one would collapse every control inside it
 * into a single announcement.
 */
function barOf(root: ReactTestInstance): ReactTestInstance | undefined {
  return root.findAll((n) => n.props?.accessibilityRole === 'toolbar')[0];
}

function panelOf(root: ReactTestInstance): Record<string, unknown> {
  return flatten(root.findAll((n) => n.props?.accessibilityRole === 'menu')[0]?.props?.style);
}

describe('ToolbarV4 (native)', () => {
  it('renders a toolbar with a title and its inline actions', () => {
    const { getByText, UNSAFE_root } = renderThemed(
      <ToolbarV4 title="Order #4821" actions={ACTIONS} />,
      SEED_LIGHT
    );
    expect(barOf(UNSAFE_root)).toBeTruthy();
    expect(getByText('Order #4821')).toBeTruthy();
    expect(getByText('Share')).toBeTruthy();
  });

  it('is a bar, not a capsule — and follows the seed corner (§8)', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { UNSAFE_root } = renderThemed(<ToolbarV4 actions={ACTIONS} />, SEED_LIGHT);
    expect(styleOf(barOf(UNSAFE_root)).borderRadius).toBe(theme.radius.md);
    expect(styleOf(barOf(UNSAFE_root)).borderRadius).not.toBe(theme.radius.full);

    const sharp = renderThemed(<ToolbarV4 actions={ACTIONS} />, SHARP_SEED);
    expect(styleOf(barOf(sharp.UNSAFE_root)).borderRadius).toBe(0);
  });

  it('colours actions with the contrast-safe text slots, never the fills', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(<ToolbarV4 actions={ACTIONS} />, SEED_LIGHT);
    expect(styleOf(getByText('Share')).color).toBe(theme.light.primaryText);
    expect(styleOf(getByText('Delete')).color).toBe(theme.light.dangerText);
  });

  it('says "disabled" in colour AND opacity', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText, getAllByRole } = renderThemed(
      <ToolbarV4 actions={[{ key: 'x', label: 'Publish', disabled: true }]} />,
      SEED_LIGHT
    );
    expect(styleOf(getByText('Publish')).color).toBe(theme.light.muted);
    const button = getAllByRole('button')[0]!;
    expect(styleOf(button).opacity).toBe(V4_STATE.disabledContent);
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it('gives every action and the overflow toggle a 44pt target', () => {
    const theme = compileTheme(SEED_LIGHT);
    const tap = theme.spacing['2xl'] - theme.spacing.xs;
    const { getAllByRole, getByLabelText } = renderThemed(
      <ToolbarV4 actions={ACTIONS} overflowActions={OVERFLOW} />,
      SEED_LIGHT
    );
    getAllByRole('button').forEach((button) => {
      expect(styleOf(button).minHeight).toBe(tap);
    });
    // The `⋯` was the smallest target in the kit; it is now square and full size.
    const toggle = getByLabelText('More actions');
    expect(styleOf(toggle).minWidth).toBe(tap);
  });

  it('opens the overflow as a menu at the same altitude as MenuV4', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByLabelText, UNSAFE_root, queryByText } = renderThemed(
      <ToolbarV4 actions={ACTIONS} overflowActions={OVERFLOW} />,
      SEED_LIGHT
    );
    expect(queryByText('Export')).toBeNull();
    fireEvent.press(getByLabelText('More actions'));
    const panel = panelOf(UNSAFE_root);
    expect(panel.shadowOpacity).toBe(theme.lightElevation.sheet.opacity);
    expect(panel.backgroundColor).toBe(theme.light.surface);
  });

  it("falls flat for a depth:'flat' seed without branching on depth", () => {
    const { getByLabelText, UNSAFE_root } = renderThemed(
      <ToolbarV4 overflowActions={OVERFLOW} />,
      FLAT_SEED
    );
    fireEvent.press(getByLabelText('More actions'));
    expect(panelOf(UNSAFE_root).shadowOpacity).toBe(0);
  });

  it('reports the overflow expanded state', () => {
    const { getByLabelText } = renderThemed(
      <ToolbarV4 actions={ACTIONS} overflowActions={OVERFLOW} />,
      SEED_LIGHT
    );
    const toggle = getByLabelText('More actions');
    expect(toggle.props.accessibilityState.expanded).toBe(false);
    fireEvent.press(toggle);
    expect(getByLabelText('More actions').props.accessibilityState.expanded).toBe(true);
  });

  it('fires an overflow action and closes the panel', () => {
    const onPress = jest.fn();
    const { getByLabelText, getByText, queryByText } = renderThemed(
      <ToolbarV4 overflowActions={[{ key: 'export', label: 'Export', onPress }]} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('More actions'));
    fireEvent.press(getByText('Export'));
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(queryByText('Export')).toBeNull();
  });

  it('renders no overflow toggle when there is nothing to overflow', () => {
    const { queryByLabelText } = renderThemed(<ToolbarV4 actions={ACTIONS} />, SEED_LIGHT);
    expect(queryByLabelText('More actions')).toBeNull();
  });
});
