import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { XenitionNativeThemeProvider } from '../theme';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { V4_STATE } from '../../primitives/internal/v4-state';
import { AuthFieldV4 } from './AuthFieldV4';

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

/** The resolved `color` of a rendered node, wherever in its style array it sits. */
function colorOf(node: ReactTestInstance): unknown {
  const flat: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') flat.push(style as Record<string, unknown>);
  };
  walk(node.props?.style);
  return flat.find((s) => s.color !== undefined)?.color;
}

/** The reserved-space wrapper that paints the focus halo. */
function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

/** The bordered box the text sits in. */
function shell(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.minHeight === THEME.spacing['2xl'] && s.borderWidth === 1);
}

describe('AuthFieldV4 (native)', () => {
  it('takes the settled V4 field metrics, not §6’s 56 / radius.lg', () => {
    const { root } = renderThemed(<AuthFieldV4 accessibilityLabel="Email" />, SEED_LIGHT);
    const style = shell(root);
    expect(style?.minHeight).toBe(THEME.spacing['2xl']);
    expect(style?.borderRadius).toBe(THEME.radius.md);
    expect(style?.paddingHorizontal).toBe(THEME.spacing.md);
    // The Addendum's whole point: the base's 56 / radius.lg must not survive.
    expect(style?.height).toBeUndefined();
    expect(style?.borderRadius).not.toBe(THEME.radius.lg);
  });

  it('leads with a muted icon and a muted placeholder that never fakes the label', () => {
    const { getByText, getByPlaceholderText } = renderThemed(
      <AuthFieldV4 label="Email address" icon="mail" placeholder="you@example.com" />,
      SEED_LIGHT
    );
    // §6: the leading icon is `muted`.
    // Decorative, so it is hidden from the a11y tree — that is the point of it.
    const icon = getByText(resolveIconGlyph('mail'), { includeHiddenElements: true });
    expect(colorOf(icon)).toBe(THEME.light.muted);
    // §6: the placeholder is `muted`, and the label is real, above the control.
    expect(getByPlaceholderText('you@example.com').props.placeholderTextColor).toBe(
      THEME.light.muted
    );
    expect(getByText('Email address')).toBeTruthy();
  });

  it('RENDERS the error message, not only a red border', () => {
    const { root, getByText } = renderThemed(
      <AuthFieldV4 accessibilityLabel="Email" error="Enter a valid email" />,
      SEED_LIGHT
    );
    const message = getByText('Enter a valid email');
    expect(message.props.accessibilityRole).toBe('alert');
    expect(colorOf(message)).toBe(THEME.light.dangerText);
    expect(shell(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('keeps the border and the halo danger from the one flag', () => {
    const { root, getByPlaceholderText } = renderThemed(
      <AuthFieldV4 placeholder="Email" error="Enter a valid email" />,
      SEED_LIGHT
    );
    fireEvent(getByPlaceholderText('Email'), 'focus');
    expect(shell(root)?.borderColor).toBe(THEME.light.danger);
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
  });

  it('shows the hint below when there is nothing wrong, and yields it to the error', () => {
    const hinted = renderThemed(
      <AuthFieldV4 accessibilityLabel="Password" hint="At least 8 characters" />,
      SEED_LIGHT
    );
    expect(hinted.getByText('At least 8 characters')).toBeTruthy();

    const failed = renderThemed(
      <AuthFieldV4 accessibilityLabel="Password" hint="At least 8 characters" error="Too short" />,
      SEED_LIGHT
    );
    expect(failed.getByText('Too short')).toBeTruthy();
    expect(failed.queryByText('At least 8 characters')).toBeNull();
  });

  it('earns its trailing affordance: the eye masks and reveals', () => {
    const { getByPlaceholderText, getByLabelText } = renderThemed(
      <AuthFieldV4 placeholder="Password" secure icon="lock" />,
      SEED_LIGHT
    );
    expect(getByPlaceholderText('Password').props.secureTextEntry).toBe(true);

    fireEvent.press(getByLabelText('Show password'));
    expect(getByPlaceholderText('Password').props.secureTextEntry).toBe(false);
    expect(getByLabelText('Hide password').props.accessibilityState).toMatchObject({
      selected: true,
    });
  });

  it('draws the clear ✕ only once there is something to clear, and empties the field', () => {
    const onChangeText = jest.fn();
    const onClear = jest.fn();
    const { getByPlaceholderText, getByLabelText, queryByLabelText } = renderThemed(
      <AuthFieldV4
        placeholder="you@example.com"
        clearable
        onChangeText={onChangeText}
        onClear={onClear}
      />,
      SEED_LIGHT
    );
    // §10.6 — no affordance over an empty field.
    expect(queryByLabelText('Clear')).toBeNull();

    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'ada@example.com');
    expect(onChangeText).toHaveBeenLastCalledWith('ada@example.com');

    fireEvent.press(getByLabelText('Clear'));
    expect(onChangeText).toHaveBeenLastCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(queryByLabelText('Clear')).toBeNull();
  });

  it('follows a controlled value for the clear affordance', () => {
    const { queryByLabelText, getByLabelText, rerender } = renderThemed(
      <AuthFieldV4 accessibilityLabel="Email" clearable value="" />,
      SEED_LIGHT
    );
    expect(queryByLabelText('Clear')).toBeNull();
    rerender(
      <XenitionNativeThemeProvider theme={SEED_LIGHT}>
        <AuthFieldV4 accessibilityLabel="Email" clearable value="ada" />
      </XenitionNativeThemeProvider>
    );
    expect(getByLabelText('Clear')).toBeTruthy();
  });

  it('rings the whole control on focus, in space reserved whether or not it shows', () => {
    const { root, getByPlaceholderText } = renderThemed(
      <AuthFieldV4 placeholder="Email" />,
      SEED_LIGHT
    );
    expect(halo(root)?.backgroundColor).toBe('transparent');
    expect(halo(root)?.padding).toBe(RING);

    fireEvent(getByPlaceholderText('Email'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    expect(shell(root)?.borderColor).toBe(THEME.light.ring);
    // The box it occupies is identical either way — focus never nudges a form.
    expect(halo(root)?.padding).toBe(RING);

    fireEvent(getByPlaceholderText('Email'), 'blur');
    expect(halo(root)?.backgroundColor).toBe('transparent');
    expect(shell(root)?.borderColor).toBe(THEME.light.border);
  });

  it('survives its empty state: a bare field, and no hole where a part would be', () => {
    const { root, queryAllByRole } = renderThemed(
      <AuthFieldV4 accessibilityLabel="Email" />,
      SEED_LIGHT
    );
    expect(queryAllByRole('button')).toHaveLength(0);
    expect(queryAllByRole('alert')).toHaveLength(0);
    // The control itself is still fully drawn.
    const style = shell(root);
    expect(style?.borderColor).toBe(THEME.light.border);
    expect(style?.minHeight).toBe(THEME.spacing['2xl']);
  });

  it('freezes and dims when disabled, and offers nothing to press', () => {
    const { root, getByLabelText, queryByLabelText } = renderThemed(
      <AuthFieldV4 accessibilityLabel="Email" clearable value="ada" disabled />,
      SEED_LIGHT
    );
    expect(shell(root)?.opacity).toBe(V4_STATE.disabledContent);
    expect(getByLabelText('Email').props.accessibilityState).toMatchObject({ disabled: true });
    expect(getByLabelText('Email').props.editable).toBe(false);
    expect(queryByLabelText('Clear')).toBeNull();
  });

  it('paints nothing it cannot trace to a token, and spends no depth on a form field', () => {
    const { root } = renderThemed(
      <AuthFieldV4 label="Email" icon="mail" hint="We never share it" placeholder="you@" />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
