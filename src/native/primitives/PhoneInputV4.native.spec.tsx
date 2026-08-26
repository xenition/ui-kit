import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { PhoneInputV4 } from './PhoneInputV4';
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

describe('PhoneInputV4 (native)', () => {
  it('keeps the mask on screen and the raw digits in the callback', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderThemed(
      <PhoneInputV4 value="5551234567" onChangeText={onChangeText} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Phone number').props.value).toBe('(555) 123-4567');
    fireEvent.changeText(getByLabelText('Phone number'), '(555) 123-45');
    expect(onChangeText).toHaveBeenCalledWith('55512345');
  });

  it('caps the number at ten digits', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderThemed(
      <PhoneInputV4 onChangeText={onChangeText} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Phone number'), '5551234567890');
    expect(onChangeText).toHaveBeenCalledWith('5551234567');
  });

  it('is a field like the others, on the shared V4 metrics', () => {
    const { root } = renderThemed(<PhoneInputV4 />, SEED_LIGHT);
    const style = shell(root);
    expect(style?.minHeight).toBe(THEME.spacing['2xl']);
    expect(style?.borderRadius).toBe(THEME.radius.md);
    expect(style?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('sets both the code and the number in tabular figures', () => {
    const { getByLabelText, getByText } = renderThemed(<PhoneInputV4 />, SEED_LIGHT);
    expect((getByLabelText('Phone number').props.style as { fontVariant: string[] }).fontVariant)
      .toEqual(['tabular-nums']);
    expect((getByText('+1').props.style as { fontVariant: string[] }).fontVariant).toEqual([
      'tabular-nums',
    ]);
  });

  it('separates the country code with the field hairline, and mutes it', () => {
    const { root, getByText } = renderThemed(<PhoneInputV4 countryCode="+44" />, SEED_LIGHT);
    expect((getByText('+44').props.style as { color: string }).color).toBe(THEME.light.muted);
    const divider = styles(root).find((s) => s.borderRightWidth === 1);
    expect(divider?.borderRightColor).toBe(THEME.light.border);
  });

  it('rings the whole control, country code included', () => {
    const { root, getByLabelText } = renderThemed(<PhoneInputV4 />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByLabelText('Phone number'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    expect(shell(root)?.borderColor).toBe(THEME.light.primary);
  });

  it('turns the border danger when invalid, focus or not', () => {
    const { root, getByLabelText } = renderThemed(<PhoneInputV4 invalid />, SEED_LIGHT);
    expect(shell(root)?.borderColor).toBe(THEME.light.danger);
    fireEvent(getByLabelText('Phone number'), 'focus');
    expect(shell(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('keeps the phone keyboard and the autofill hint', () => {
    const { getByLabelText } = renderThemed(<PhoneInputV4 />, SEED_LIGHT);
    expect(getByLabelText('Phone number').props.keyboardType).toBe('phone-pad');
    expect(getByLabelText('Phone number').props.textContentType).toBe('telephoneNumber');
  });

  it('dims and blocks when disabled', () => {
    const { root, getByLabelText } = renderThemed(<PhoneInputV4 disabled />, SEED_LIGHT);
    expect(shell(root)?.opacity).toBe(V4_STATE.disabledContent);
    expect(getByLabelText('Phone number').props.editable).toBe(false);
  });

  it('spends no depth on a form control — no gradient, no shadow', () => {
    const { root, queryByLabelText } = renderThemed(<PhoneInputV4 />, SEED_LIGHT);
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
