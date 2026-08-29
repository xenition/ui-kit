import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { SegmentedV4 } from './SegmentedV4';

const OPTIONS = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
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

function allStyles(root: ReactTestInstance): Record<string, unknown>[] {
  return root
    .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
    .map((n) => flatten(n.props.style));
}

function thumbStyle(root: ReactTestInstance): Record<string, unknown> {
  return allStyles(root).find((s) => s.position === 'absolute') ?? {};
}

function labelStyle(tab: ReactTestInstance): Record<string, unknown> {
  return flatten(tab.findAll((n) => n.type === 'Text')[0]?.props?.style);
}

describe('SegmentedV4 (native)', () => {
  it('renders a tablist of segments and reports the selected one', () => {
    const { getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="week" onChange={() => {}} />,
      SEED_LIGHT
    );
    const segments = getAllByRole('tab');
    expect(segments).toHaveLength(3);
    expect(segments[1]!.props.accessibilityState.selected).toBe(true);
    expect(segments[0]!.props.accessibilityState.selected).toBe(false);
  });

  it('says "selected" in colour AND weight', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="week" onChange={() => {}} />,
      SEED_LIGHT
    );
    const segments = getAllByRole('tab');
    expect(labelStyle(segments[1]!).color).toBe(theme.light.onSurface);
    expect(labelStyle(segments[1]!).fontWeight).toBe('600');
    expect(labelStyle(segments[0]!).color).toBe(theme.light.muted);
    expect(labelStyle(segments[0]!).fontWeight).toBe('500');
  });

  it('gives every segment a 44pt target composed from the spacing scale', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />,
      SEED_LIGHT
    );
    getAllByRole('tab').forEach((segment) => {
      expect(flatten(segment.props.style).minHeight).toBe(theme.spacing['2xl'] - theme.spacing.xs);
    });
  });

  it('has exactly ONE thumb, which travels — no per-segment fill', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root, getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="week" onChange={() => {}} />,
      SEED_LIGHT
    );
    const absolutes = allStyles(root).filter((s) => s.position === 'absolute');
    expect(absolutes).toHaveLength(1);
    expect(absolutes[0]!.backgroundColor).toBe(theme.light.surface);
    // The segments themselves paint nothing — the thumb is the whole state.
    getAllByRole('tab').forEach((segment) => {
      expect(flatten(segment.props.style).backgroundColor).toBeUndefined();
    });
  });

  it('stays hidden until it has an honest position to sit at', () => {
    const { root } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(thumbStyle(root).opacity).toBe(0);
  });

  it('lifts the thumb with `elevation.card`, and flattens with the seed', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />,
      SEED_LIGHT
    );
    const thumb = thumbStyle(root);
    expect(thumb.shadowOpacity).toBe(theme.lightElevation.card.opacity);
    expect(thumb.shadowRadius).toBe(theme.lightElevation.card.radius);
    // No hairline: the rail underneath is a different colour by construction.
    expect(thumb.borderWidth).toBeUndefined();

    const flat = thumbStyle(
      renderThemed(<SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />, FLAT_SEED)
        .root
    );
    // The control still asks for elevation.card; the compiler already zeroed it.
    expect(flat.shadowOpacity).toBe(0);
  });

  it('builds the rail by compositing `border` into `surface`, opaquely', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { root } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />,
      SEED_LIGHT
    );
    const rail = allStyles(root).find((s) => s.padding === theme.spacing.xs) ?? {};
    const bg = rail.backgroundColor as string;
    expect(bg).toMatch(/^#[0-9a-f]{6}$/i);
    expect(bg).not.toBe(theme.light.surface);
    expect(bg).not.toBe(theme.light.border);
  });

  it('defers to the seed shape rather than smuggling the capsule in', () => {
    const sharp = compileTheme(SHARP_SEED);
    expect(sharp.radius.full).toBe(0);
    const { root } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={() => {}} />,
      SHARP_SEED
    );
    expect(thumbStyle(root).borderRadius).toBe(0);
  });

  it('emits the pressed value', () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <SegmentedV4 options={OPTIONS} value="day" onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getAllByRole('tab')[2]!);
    expect(onChange).toHaveBeenCalledWith('month');
  });
});
