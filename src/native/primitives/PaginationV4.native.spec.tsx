import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { PaginationV4 } from './PaginationV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

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

function labelStyle(cell: ReactTestInstance): Record<string, unknown> {
  return flatten(cell.findAll((n) => n.type === 'Text')[0]?.props?.style);
}

describe('PaginationV4 (native)', () => {
  it('renders nothing at all for a single page', () => {
    const { toJSON } = renderThemed(
      <PaginationV4 page={1} pageCount={1} onPageChange={() => {}} />,
      SEED_LIGHT
    );
    expect(toJSON()).toBeNull();
  });

  it('truncates with an ellipsis exactly as the base does', () => {
    const { getByLabelText, getAllByText } = renderThemed(
      <PaginationV4 page={5} pageCount={20} onPageChange={() => {}} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Page 1')).toBeTruthy();
    expect(getByLabelText('Page 20')).toBeTruthy();
    expect(getByLabelText('Page 4')).toBeTruthy();
    expect(getAllByText('…').length).toBeGreaterThan(0);
  });

  it('fills exactly one cell — the page you are on', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByLabelText, getAllByRole } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />,
      SEED_LIGHT
    );
    const current = getByLabelText('Page 3');
    expect(current.props.accessibilityState.selected).toBe(true);
    expect(styleOf(current).backgroundColor).toBe(theme.light.primary);
    expect(labelStyle(current).color).toBe(theme.light.onPrimary);
    expect(labelStyle(current).fontWeight).toBe('600');

    const filled = getAllByRole('button').filter(
      (cell) => styleOf(cell).backgroundColor === theme.light.primary
    );
    expect(filled).toHaveLength(1);
  });

  it('leaves every other cell without chrome', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />,
      SEED_LIGHT
    );
    const other = getByLabelText('Page 2');
    expect(styleOf(other).backgroundColor).toBe('transparent');
    expect(styleOf(other).borderWidth).toBeUndefined();
    expect(labelStyle(other).color).toBe(theme.light.onSurface);
  });

  it('gives every cell a 44 x 44 target — the base was 32', () => {
    const theme = compileTheme(SEED_LIGHT);
    const tap = theme.spacing['2xl'] - theme.spacing.xs;
    const { getAllByRole } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={() => {}} />,
      SEED_LIGHT
    );
    getAllByRole('button').forEach((cell) => {
      expect(styleOf(cell).minHeight).toBe(tap);
      expect(styleOf(cell).minWidth).toBe(tap);
    });
    expect(tap).toBe(44);
  });

  it('says "you cannot go back" in colour AND opacity', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={1} pageCount={5} onPageChange={() => {}} />,
      SEED_LIGHT
    );
    const previous = getByLabelText('Previous');
    expect(previous.props.accessibilityState.disabled).toBe(true);
    expect(styleOf(previous).opacity).toBe(V4_STATE.disabledContent);
    expect(labelStyle(previous).color).toBe(theme.light.muted);
    expect(getByLabelText('Next').props.accessibilityState.disabled).toBe(false);
  });

  it('emits the page that was pressed, and steps with the arrows', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={3} pageCount={5} onPageChange={onPageChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Page 5'));
    expect(onPageChange).toHaveBeenCalledWith(5);
    fireEvent.press(getByLabelText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(4);
    fireEvent.press(getByLabelText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('does not step past either end', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <PaginationV4 page={1} pageCount={3} onPageChange={onPageChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Previous'));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('keeps the ellipsis a gap marker, in `muted`', () => {
    const theme = compileTheme(SEED_LIGHT);
    const { getAllByText } = renderThemed(
      <PaginationV4 page={10} pageCount={20} onPageChange={() => {}} />,
      SEED_LIGHT
    );
    getAllByText('…').forEach((node) => {
      expect(flatten(node.props.style).color).toBe(theme.light.muted);
    });
  });

  it('honours siblingCount', () => {
    const { getByLabelText, queryByLabelText } = renderThemed(
      <PaginationV4 page={10} pageCount={20} siblingCount={2} onPageChange={() => {}} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Page 8')).toBeTruthy();
    expect(getByLabelText('Page 12')).toBeTruthy();
    expect(queryByLabelText('Page 7')).toBeNull();
  });
});
