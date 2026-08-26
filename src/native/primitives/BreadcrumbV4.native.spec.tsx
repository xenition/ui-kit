import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { BreadcrumbV4 } from './BreadcrumbV4';

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

describe('BreadcrumbV4 (native)', () => {
  it('renders the trail in order and labels itself', () => {
    const { getByLabelText, getByText } = renderThemed(
      <BreadcrumbV4
        items={[{ label: 'Home', onPress: () => {} }, { label: 'Orders', onPress: () => {} }, { label: '#4821' }]}
      />,
      SEED_LIGHT
    );
    expect(getByLabelText('Breadcrumb')).toBeTruthy();
    expect(getByText('#4821')).toBeTruthy();
  });

  it('keeps to two registers: where you are, and the way back', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', onPress: () => {} }, { label: 'Orders' }]} />,
      SEED_LIGHT
    );
    expect(styleOf(getByText('Home')).color).toBe(theme.light.muted);
    expect(styleOf(getByText('Home')).fontWeight).toBe('400');
    expect(styleOf(getByText('Orders')).color).toBe(theme.light.onSurface);
    expect(styleOf(getByText('Orders')).fontWeight).toBe('600');
  });

  it('separates with a chevron by default — direction, not a filesystem path', () => {
    const { getByText, queryByText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', onPress: () => {} }, { label: 'Orders' }]} />,
      SEED_LIGHT
    );
    // The separator is hidden from assistive tech on purpose — the order
    // already carries the nesting — so the query has to opt into hidden nodes.
    expect(getByText('›', { includeHiddenElements: true })).toBeTruthy();
    expect(queryByText('/', { includeHiddenElements: true })).toBeNull();
  });

  it('honours a caller-supplied separator', () => {
    const { getByText } = renderThemed(
      <BreadcrumbV4
        items={[{ label: 'A', onPress: () => {} }, { label: 'B' }]}
        separator="/"
      />,
      SEED_LIGHT
    );
    expect(getByText('/', { includeHiddenElements: true })).toBeTruthy();
  });

  it('draws the separator in `muted`, so it never competes with the labels', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', onPress: () => {} }, { label: 'Orders' }]} />,
      SEED_LIGHT
    );
    expect(styleOf(getByText('›', { includeHiddenElements: true })).color).toBe(
      theme.light.muted
    );
  });

  it('makes every ancestor a real 44pt target', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByRole } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home', onPress: () => {} }, { label: 'Orders' }]} />,
      SEED_LIGHT
    );
    const links = getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(styleOf(links[0]).minHeight).toBe(theme.spacing['2xl'] - theme.spacing.xs);
  });

  it('fires the ancestor handler and never makes the current page pressable', () => {
    const onHome = jest.fn();
    const onCurrent = jest.fn();
    const { getAllByRole } = renderThemed(
      <BreadcrumbV4
        items={[{ label: 'Home', onPress: onHome }, { label: 'Here', onPress: onCurrent }]}
      />,
      SEED_LIGHT
    );
    const links = getAllByRole('link');
    // The last crumb is where you already are — pressing it goes nowhere.
    expect(links).toHaveLength(1);
    fireEvent.press(links[0]!);
    expect(onHome).toHaveBeenCalled();
    expect(onCurrent).not.toHaveBeenCalled();
  });

  it('renders a single-item trail as just the current page', () => {
    const { getByText, queryByText } = renderThemed(
      <BreadcrumbV4 items={[{ label: 'Home' }]} />,
      SEED_LIGHT
    );
    expect(getByText('Home')).toBeTruthy();
    expect(queryByText('›', { includeHiddenElements: true })).toBeNull();
  });
});
