import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { InputV4 } from './InputV4';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;

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

/** The reserved-space wrapper that paints the focus halo. */
function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

/** The field's own style. */
function field(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.borderWidth === 1);
}

describe('InputV4 (native)', () => {
  it('is taller and softer than the base field, entirely from the scales', () => {
    const { root } = renderThemed(<InputV4 placeholder="Email" />, SEED_LIGHT);
    const style = field(root);
    expect(style?.minHeight).toBe(THEME.spacing['2xl']);
    expect(style?.borderRadius).toBe(THEME.radius.md);
    expect(style?.paddingHorizontal).toBe(THEME.spacing.md);
    expect(style?.fontSize).toBe(THEME.typography.scale.base);
  });

  it('reserves the focus ring whether or not it is showing', () => {
    const { root } = renderThemed(<InputV4 placeholder="Email" />, SEED_LIGHT);
    const wrapper = halo(root);
    expect(wrapper).toBeDefined();
    expect(wrapper?.borderRadius).toBe(THEME.radius.md + RING);
    expect(wrapper?.backgroundColor).toBe('transparent');
  });

  it('paints a brand halo on focus — a ring, not a border swap', () => {
    const { root, getByPlaceholderText } = renderThemed(
      <InputV4 placeholder="Email" />,
      SEED_LIGHT
    );
    fireEvent(getByPlaceholderText('Email'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    // The border follows too, so the field reads as focused at a glance.
    expect(field(root)?.borderColor).toBe(THEME.light.primary);

    fireEvent(getByPlaceholderText('Email'), 'blur');
    expect(halo(root)?.backgroundColor).toBe('transparent');
    expect(field(root)?.borderColor).toBe(THEME.light.border);
  });

  it('takes the halo from the scheme-resolved brand slot, not the ramps', () => {
    const seed: ThemeSeed = { ...SEED_LIGHT, mode: 'both' };
    const theme = compileTheme(seed);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { root, getByPlaceholderText } = renderThemed(
        <InputV4 placeholder="Email" />,
        seed,
        scheme
      );
      fireEvent(getByPlaceholderText('Email'), 'focus');
      return field(root)?.borderColor;
    };
    expect(read('light')).toBe(theme.light.primary);
    expect(read('dark')).toBe(theme.dark.primary);
    expect(read('light')).not.toBe(read('dark'));
  });

  it('turns the field and its ring danger when invalid', () => {
    const { root, getByPlaceholderText } = renderThemed(
      <InputV4 placeholder="Email" invalid />,
      SEED_LIGHT
    );
    expect(field(root)?.borderColor).toBe(THEME.light.danger);
    fireEvent(getByPlaceholderText('Email'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    expect(field(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('shows the error as border AND message — §38, help recovery', () => {
    const { root, getByText } = renderThemed(
      <InputV4 placeholder="Email" error="Enter an address like name@work.com" />,
      SEED_LIGHT
    );
    // The message implies the invalid state, so the two can never disagree.
    expect(field(root)?.borderColor).toBe(THEME.light.danger);
    const message = getByText('Enter an address like name@work.com');
    expect((message.props.style as { color: string }).color).toBe(THEME.light.dangerText);
    expect(message.props.accessibilityLiveRegion).toBe('polite');
  });

  it('renders no message when there is nothing to say', () => {
    const { queryByText } = renderThemed(<InputV4 placeholder="Email" invalid />, SEED_LIGHT);
    expect(queryByText(/./)).toBeNull();
  });

  it('renders the label above the field', () => {
    const { getByText } = renderThemed(
      <InputV4 label="Work email" placeholder="Email" />,
      SEED_LIGHT
    );
    const label = getByText('Work email');
    expect((label.props.style as { fontSize: number }).fontSize).toBe(
      THEME.typography.scale.sm
    );
  });

  it('still calls the caller onFocus / onBlur / onChangeText', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderThemed(
      <InputV4
        placeholder="Email"
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
      />,
      SEED_LIGHT
    );
    const input = getByPlaceholderText('Email');
    fireEvent(input, 'focus');
    fireEvent(input, 'blur');
    fireEvent.changeText(input, 'a@b.c');
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onChangeText).toHaveBeenCalledWith('a@b.c');
  });

  it('dims and blocks a non-editable field', () => {
    const { root, getByPlaceholderText } = renderThemed(
      <InputV4 placeholder="Email" editable={false} />,
      SEED_LIGHT
    );
    expect(field(root)?.opacity).toBe(0.5);
    expect(getByPlaceholderText('Email').props.accessibilityState).toMatchObject({
      disabled: true,
    });
  });

  it('spends no depth on a form field — no gradient, no shadow', () => {
    const { root, queryByLabelText } = renderThemed(
      <InputV4 placeholder="Email" />,
      SEED_LIGHT
    );
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
