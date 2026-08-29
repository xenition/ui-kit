import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { TextareaV4 } from './TextareaV4';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;
const LINE = Math.round(THEME.typography.scale.base * 1.5);

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

function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

function field(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.borderWidth === 1);
}

describe('TextareaV4 (native)', () => {
  it('matches the field above it — same radius and horizontal padding', () => {
    const { root } = renderThemed(<TextareaV4 placeholder="Notes" />, SEED_LIGHT);
    const style = field(root);
    expect(style?.borderRadius).toBe(THEME.radius.md);
    expect(style?.paddingHorizontal).toBe(THEME.spacing.md);
    expect(style?.fontSize).toBe(THEME.typography.scale.base);
  });

  it('is set to be read, at 1.5 lines', () => {
    const { root } = renderThemed(<TextareaV4 placeholder="Notes" />, SEED_LIGHT);
    expect(field(root)?.lineHeight).toBe(LINE);
  });

  it('grows with rows, but never below a single-line control', () => {
    const { root: tall } = renderThemed(
      <TextareaV4 placeholder="Notes" rows={6} />,
      SEED_LIGHT
    );
    expect(field(tall)?.minHeight).toBe(6 * LINE + THEME.spacing.sm * 2);

    const { root: short } = renderThemed(
      <TextareaV4 placeholder="Notes" rows={1} />,
      SEED_LIGHT
    );
    expect(field(short)?.minHeight).toBe(THEME.spacing['2xl']);
  });

  it('reserves the focus ring and lights it on focus', () => {
    const { root, getByPlaceholderText } = renderThemed(
      <TextareaV4 placeholder="Notes" />,
      SEED_LIGHT
    );
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByPlaceholderText('Notes'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    expect(field(root)?.borderColor).toBe(THEME.light.primary);
    fireEvent(getByPlaceholderText('Notes'), 'blur');
    expect(halo(root)?.backgroundColor).toBe('transparent');
    expect(field(root)?.borderColor).toBe(THEME.light.border);
  });

  it('turns the border danger when invalid, focus or not', () => {
    const { root, getByPlaceholderText } = renderThemed(
      <TextareaV4 placeholder="Notes" invalid />,
      SEED_LIGHT
    );
    expect(field(root)?.borderColor).toBe(THEME.light.danger);
    fireEvent(getByPlaceholderText('Notes'), 'focus');
    expect(field(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('renders the label at the same size InputV4 uses', () => {
    const { getByText } = renderThemed(
      <TextareaV4 label="What happened?" placeholder="Notes" />,
      SEED_LIGHT
    );
    const style = getByText('What happened?').props.style as {
      fontSize: number;
      fontWeight: string;
    };
    expect(style.fontSize).toBe(THEME.typography.scale.sm);
    expect(style.fontWeight).toBe('500');
  });

  it('stays multi-line and still calls the caller handlers', () => {
    const onFocus = jest.fn();
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderThemed(
      <TextareaV4 placeholder="Notes" onFocus={onFocus} onChangeText={onChangeText} />,
      SEED_LIGHT
    );
    expect(getByPlaceholderText('Notes').props.multiline).toBe(true);
    fireEvent(getByPlaceholderText('Notes'), 'focus');
    fireEvent.changeText(getByPlaceholderText('Notes'), 'hello');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith('hello');
  });

  it('dims and blocks a non-editable field', () => {
    const { root, getByPlaceholderText } = renderThemed(
      <TextareaV4 placeholder="Notes" editable={false} />,
      SEED_LIGHT
    );
    expect(field(root)?.opacity).toBe(0.5);
    expect(getByPlaceholderText('Notes').props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });

  it('spends no depth on a box someone is writing in', () => {
    const { root, queryByLabelText } = renderThemed(
      <TextareaV4 placeholder="Notes" />,
      SEED_LIGHT
    );
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
