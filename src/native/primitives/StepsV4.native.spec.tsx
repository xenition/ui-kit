import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { StepsV4 } from './StepsV4';

const STEPS = [
  { title: 'Cart' },
  { title: 'Shipping' },
  { title: 'Pay', description: 'Card or transfer' },
  { title: 'Done' },
];

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

/** Every rail segment: a 2pt absolutely-positioned bar. */
function rails(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flatten(n.props.style))
    .filter((s) => s.position === 'absolute' && s.height === 2);
}

/** Every marker: a round box sized from the spacing scale. */
function markers(root: ReactTestInstance, size: number): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flatten(n.props.style))
    .filter((s) => s.width === size && s.height === size);
}

describe('StepsV4 (native)', () => {
  it('renders every title and description', () => {
    const { getByText } = renderThemed(<StepsV4 steps={STEPS} current={1} />, SEED_LIGHT);
    expect(getByText('Cart')).toBeTruthy();
    expect(getByText('Card or transfer')).toBeTruthy();
  });

  it('draws a rail between every neighbouring pair, and none past the ends', () => {
    const { root } = renderThemed(<StepsV4 steps={STEPS} current={1} />, SEED_LIGHT);
    // Each of the 3 gaps is drawn as two halves — one on each side of a marker.
    expect(rails(root)).toHaveLength(6);

    const single = renderThemed(<StepsV4 steps={[{ title: 'Only' }]} current={0} />, SEED_LIGHT);
    expect(rails(single.root)).toHaveLength(0);
  });

  it('fills the rail up to where you are, and no further', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<StepsV4 steps={STEPS} current={2} />, SEED_LIGHT);
    const all = rails(root);
    // The path runs from step 0 to the marker you are standing on: step 0's
    // outgoing half, both of step 1's, and step 2's incoming half.
    expect(all.filter((r) => r.backgroundColor === theme.light.primary)).toHaveLength(4);
    expect(all.filter((r) => r.backgroundColor === theme.light.border)).toHaveLength(2);
  });

  it('leaves the whole rail unfilled at the first step', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<StepsV4 steps={STEPS} current={0} />, SEED_LIGHT);
    expect(rails(root).filter((r) => r.backgroundColor === theme.light.primary)).toHaveLength(0);
  });

  it('gives the three states three shapes', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(<StepsV4 steps={STEPS} current={1} />, SEED_LIGHT);
    const [done, active, later] = markers(root, theme.spacing.xl);

    expect(done!.backgroundColor).toBe(theme.light.primary);
    expect(done!.borderWidth).toBe(0);

    expect(active!.backgroundColor).toBe(theme.light.surface);
    expect(active!.borderWidth).toBe(2);
    expect(active!.borderColor).toBe(theme.light.primary);

    expect(later!.borderWidth).toBe(2);
    expect(later!.borderColor).toBe(theme.light.border);
  });

  it('checks the done steps and numbers the rest', () => {
    const { getAllByText, getByText } = renderThemed(
      <StepsV4 steps={STEPS} current={2} />,
      SEED_LIGHT
    );
    expect(getAllByText('✓')).toHaveLength(2);
    expect(getByText('3')).toBeTruthy();
    expect(getByText('4')).toBeTruthy();
  });

  it('numbers the current step with `primaryText`, never the bare fill slot', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(<StepsV4 steps={STEPS} current={1} />, SEED_LIGHT);
    expect(flatten(getByText('2').props.style).color).toBe(theme.light.primaryText);
    expect(flatten(getByText('3').props.style).color).toBe(theme.light.muted);
  });

  it('sizes the marker from the spacing scale, not a remembered 32', () => {
    const theme = compileTheme(SEED_LIGHT);
    expect(theme.spacing.xl).toBe(32);
    const { root } = renderThemed(<StepsV4 steps={STEPS} current={1} />, SEED_LIGHT);
    expect(markers(root, theme.spacing.xl)).toHaveLength(4);
  });

  it('gives the current title the only full weight in the row', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(<StepsV4 steps={STEPS} current={1} />, SEED_LIGHT);
    expect(flatten(getByText('Shipping').props.style).fontWeight).toBe('600');
    expect(flatten(getByText('Cart').props.style).fontWeight).toBe('500');
    expect(flatten(getByText('Pay').props.style).fontWeight).toBe('400');
    expect(flatten(getByText('Pay').props.style).color).toBe(theme.light.muted);
  });

  it('labels each step with its position and state', () => {
    const { getByLabelText } = renderThemed(<StepsV4 steps={STEPS} current={1} />, SEED_LIGHT);
    expect(getByLabelText('Step 1 of 4, done')).toBeTruthy();
    expect(getByLabelText('Step 2 of 4, current')).toBeTruthy();
    expect(getByLabelText('Step 3 of 4')).toBeTruthy();
  });
});
