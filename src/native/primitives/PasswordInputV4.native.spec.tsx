import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { PasswordInputV4 } from './PasswordInputV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;

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

function shell(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.minHeight === THEME.spacing['2xl'] && s.borderWidth === 1);
}

describe('PasswordInputV4 (native)', () => {
  it('masks by default and reveals on request, in a word not an icon', () => {
    const { getByLabelText } = renderThemed(<PasswordInputV4 value="hunter2" />, SEED_LIGHT);
    expect(getByLabelText('Password').props.secureTextEntry).toBe(true);

    const toggle = getByLabelText('Show password');
    fireEvent.press(toggle);
    expect(getByLabelText('Password').props.secureTextEntry).toBe(false);
    expect(getByLabelText('Hide password')).toBeTruthy();
  });

  it('is a field like the others, on the shared V4 metrics', () => {
    const { root } = renderThemed(<PasswordInputV4 />, SEED_LIGHT);
    const style = shell(root);
    expect(style?.minHeight).toBe(THEME.spacing['2xl']);
    expect(style?.borderRadius).toBe(THEME.radius.md);
    expect(style?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('rings the whole control when the secret takes focus', () => {
    const { root, getByLabelText } = renderThemed(<PasswordInputV4 />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByLabelText('Password'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    expect(shell(root)?.borderColor).toBe(THEME.light.primary);
  });

  it('turns the word into a real target with slop off the scale', () => {
    const { getByLabelText } = renderThemed(<PasswordInputV4 />, SEED_LIGHT);
    expect(getByLabelText('Show password').props.hitSlop).toBe(
      THEME.spacing.sm + THEME.spacing.xs
    );
  });

  it('tints the revealed toggle with the contrast-safe text form', () => {
    const { getByText, getByLabelText } = renderThemed(<PasswordInputV4 />, SEED_LIGHT);
    expect((getByText('Show').props.style as { color: string }).color).toBe(THEME.light.muted);
    fireEvent.press(getByLabelText('Show password'));
    expect((getByText('Hide').props.style as { color: string }).color).toBe(
      THEME.light.primaryText
    );
  });

  it('turns the border danger when invalid, focus or not', () => {
    const { root, getByLabelText } = renderThemed(<PasswordInputV4 invalid />, SEED_LIGHT);
    expect(shell(root)?.borderColor).toBe(THEME.light.danger);
    fireEvent(getByLabelText('Password'), 'focus');
    expect(shell(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('renders the label at the same size InputV4 uses', () => {
    const { getByText } = renderThemed(
      <PasswordInputV4 label="Choose a password" />,
      SEED_LIGHT
    );
    const style = getByText('Choose a password').props.style as {
      fontSize: number;
      fontWeight: string;
    };
    expect(style.fontSize).toBe(THEME.typography.scale.sm);
    expect(style.fontWeight).toBe('500');
  });

  it('reports typed text and blocks when disabled', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderThemed(
      <PasswordInputV4 onChangeText={onChangeText} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Password'), 'abc');
    expect(onChangeText).toHaveBeenCalledWith('abc');

    const { root, getByLabelText: off } = renderThemed(
      <PasswordInputV4 disabled />,
      SEED_LIGHT
    );
    expect(shell(root)?.opacity).toBe(V4_STATE.disabledContent);
    expect(off('Password').props.editable).toBe(false);
  });

  it('spends no depth on a form control — no gradient, no shadow', () => {
    const { root, queryByLabelText } = renderThemed(<PasswordInputV4 />, SEED_LIGHT);
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
