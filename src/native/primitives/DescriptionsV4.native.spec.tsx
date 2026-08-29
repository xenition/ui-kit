import * as React from 'react';
import { Text } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { DescriptionsV4 } from './DescriptionsV4';

const ITEMS = [
  { label: 'Status', value: 'Active' },
  { label: 'Balance', value: '$1,204.50' },
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

function outer(root: ReactTestInstance): Record<string, unknown> {
  return flat(root.findAll((n) => n.props?.style !== undefined)[0]?.props?.style);
}

describe('DescriptionsV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);

  it('makes the value the content and the label the caption', () => {
    const { getByText } = renderThemed(<DescriptionsV4 items={ITEMS} />, SEED_LIGHT);
    const value = flat(getByText('Active').props.style);
    const label = flat(getByText('Status').props.style);
    expect(value.fontSize).toBe(theme.typography.scale.base);
    expect(value.fontWeight).toBe('600');
    expect(value.color).toBe(theme.light.onSurface);
    expect(label.fontSize).toBe(theme.typography.scale.xs);
    expect(label.color).toBe(theme.light.muted);
    // The answer outranks its caption, which is the way round a record is read.
    expect(value.fontSize as number).toBeGreaterThan(label.fontSize as number);
  });

  it('stops the label shouting — no uppercase, no tracking', () => {
    const { getByText } = renderThemed(<DescriptionsV4 items={ITEMS} />, SEED_LIGHT);
    const label = flat(getByText('Status').props.style);
    expect(label.textTransform).toBeUndefined();
    expect(label.letterSpacing).toBeUndefined();
  });

  it('separates pairs by more than it separates a label from its value', () => {
    const { root } = renderThemed(<DescriptionsV4 items={ITEMS} />, SEED_LIGHT);
    const wrap = outer(root);
    expect(wrap.rowGap).toBe(theme.spacing.lg);
    expect(wrap.columnGap).toBe(theme.spacing.xl);
    const pair = root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .find((s) => s.flexBasis !== undefined);
    expect(pair?.gap).toBe(2);
    expect(theme.spacing.lg).toBeGreaterThan(2);
  });

  it('sets a quantity in tabular figures and leaves prose alone', () => {
    const { getByText } = renderThemed(<DescriptionsV4 items={ITEMS} />, SEED_LIGHT);
    expect(flat(getByText('$1,204.50').props.style).fontVariant).toEqual(['tabular-nums']);
    expect(flat(getByText('Active').props.style).fontVariant).toBeUndefined();
  });

  it('tiles two columns with a basis that grows, not a fixed 45%', () => {
    const two = renderThemed(<DescriptionsV4 items={ITEMS} columns={2} />, SEED_LIGHT);
    const pair = two.root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .find((s) => s.flexBasis !== undefined);
    expect(pair?.flexBasis).toBe('40%');
    expect(pair?.flexGrow).toBe(1);

    const one = renderThemed(<DescriptionsV4 items={ITEMS} />, SEED_LIGHT);
    const single = one.root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .find((s) => s.flexBasis !== undefined);
    expect(single?.flexBasis).toBe('100%');
  });

  it('wraps nothing in a container — §11', () => {
    const { root } = renderThemed(<DescriptionsV4 items={ITEMS} />, SEED_LIGHT);
    root
      .findAll((n) => typeof n.type === 'string' && n.props?.style !== undefined)
      .map((n) => flat(n.props.style))
      .forEach((s) => {
        expect(s.borderWidth).toBeUndefined();
        expect(s.shadowOpacity).toBeUndefined();
        expect(s.elevation).toBeUndefined();
      });
  });

  it('renders a node value untouched', () => {
    const { getByText } = renderThemed(
      <DescriptionsV4 items={[{ label: 'Owner', value: <Text>Ada</Text> }]} />,
      SEED_LIGHT
    );
    expect(getByText('Ada')).toBeTruthy();
  });
});
