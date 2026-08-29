import * as React from 'react';
import { Text } from 'react-native';
import { act, fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_BOTH,
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import { UploadV4, acceptHint } from './UploadV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];
const WASH = mixToken(THEME.light.surface, THEME.light.primary, 0.16);

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

describe('acceptHint', () => {
  it('claims only what the component actually knows', () => {
    expect(acceptHint('image/*', true)).toBe('Accepts image/* · more than one is fine');
    expect(acceptHint('image/*', false)).toBe('Accepts image/*');
    expect(acceptHint(undefined, true)).toBe('More than one is fine');
    // Nothing to say, so nothing is said — §7, not "Any file type".
    expect(acceptHint(undefined, false)).toBeNull();
  });
});

describe('UploadV4 (native)', () => {
  it('reads as a place, not a button: three tap targets tall, dashed', () => {
    const { root } = renderThemed(<UploadV4 />, SEED_LIGHT);
    const zone = styles(root).find((s) => s.borderStyle === 'dashed');
    expect(zone?.minHeight).toBe(TARGET * 3);
    expect(zone?.borderRadius).toBe(THEME.radius.lg);
    expect(zone?.borderColor).toBe(THEME.light.border);
  });

  it('makes the headline the loudest thing in the box, not muted sm', () => {
    const { getByText } = renderThemed(<UploadV4 label="Add your receipts" />, SEED_LIGHT);
    const headline = getByText('Add your receipts');
    const style = headline.props.style as { color: string; fontSize: number; fontWeight: string };
    expect(style.color).toBe(THEME.light.onSurface);
    expect(style.color).not.toBe(THEME.light.muted);
    expect(style.fontSize).toBe(THEME.typography.scale.base);
    expect(style.fontWeight).toBe('600');
  });

  it('washes the mark with an opaque brand mix, never a ramp step', () => {
    const { root } = renderThemed(<UploadV4 />, SEED_LIGHT);
    const disc = styles(root).find((s) => s.width === TARGET && s.height === TARGET);
    expect(disc?.backgroundColor).toBe(WASH);
    expect(disc?.backgroundColor).not.toBe(THEME.ramps.primary[50]);
  });

  it('re-derives the wash per scheme, so a dark dropzone is not a white blob', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { root } = renderThemed(<UploadV4 />, SEED_BOTH, scheme);
      return styles(root).find((s) => s.width === TARGET && s.height === TARGET)?.backgroundColor;
    };
    expect(read('light')).toBe(mixToken(theme.light.surface, theme.light.primary, 0.16));
    expect(read('dark')).toBe(mixToken(theme.dark.surface, theme.dark.primary, 0.16));
    expect(read('light')).not.toBe(read('dark'));
  });

  it('says what fits, from the only two facts it has', () => {
    const { getByText } = renderThemed(<UploadV4 accept="image/*" multiple />, SEED_LIGHT);
    expect(getByText('Accepts image/* · more than one is fine')).toBeTruthy();
  });

  it('says nothing rather than padding the space', () => {
    const { queryByText } = renderThemed(<UploadV4 />, SEED_LIGHT);
    expect(queryByText(/Accepts/)).toBeNull();
    expect(queryByText(/Any file type/)).toBeNull();
  });

  it('hands off to the host picker and forwards what comes back', async () => {
    const onFiles = jest.fn();
    const pickFiles = jest.fn().mockResolvedValue([{ uri: 'file://a.png', name: 'a.png' }]);
    const { getByLabelText } = renderThemed(
      <UploadV4 accessibilityLabel="Upload" accept="image/*" multiple onFiles={onFiles} pickFiles={pickFiles} />,
      SEED_LIGHT
    );
    await act(async () => {
      fireEvent.press(getByLabelText('Upload'));
    });
    expect(pickFiles).toHaveBeenCalledWith({ accept: 'image/*', multiple: true });
    expect(onFiles).toHaveBeenCalledWith([{ uri: 'file://a.png', name: 'a.png' }]);
  });

  it('does not report an empty pick', async () => {
    const onFiles = jest.fn();
    const { getByLabelText } = renderThemed(
      <UploadV4 accessibilityLabel="Upload" onFiles={onFiles} pickFiles={async () => []} />,
      SEED_LIGHT
    );
    await act(async () => {
      fireEvent.press(getByLabelText('Upload'));
    });
    expect(onFiles).not.toHaveBeenCalled();
  });

  it('turns the edge danger when invalid', () => {
    const { root } = renderThemed(<UploadV4 invalid />, SEED_LIGHT);
    const zone = styles(root).find((s) => s.borderStyle === 'dashed');
    expect(zone?.borderColor).toBe(THEME.light.danger);
  });

  it('dims and blocks when disabled', () => {
    const onFiles = jest.fn();
    const pickFiles = jest.fn();
    const { root, getByLabelText } = renderThemed(
      <UploadV4 accessibilityLabel="Upload" disabled onFiles={onFiles} pickFiles={pickFiles} />,
      SEED_LIGHT
    );
    expect(styles(root).find((s) => s.borderStyle === 'dashed')?.opacity).toBe(
      V4_STATE.disabledContent
    );
    fireEvent.press(getByLabelText('Upload'));
    expect(pickFiles).not.toHaveBeenCalled();
  });

  it('takes a node label as given', () => {
    const { getByText } = renderThemed(
      <UploadV4 label={<Text>Custom</Text>} />,
      SEED_LIGHT
    );
    expect(getByText('Custom')).toBeTruthy();
  });

  it('spends no depth: a drop target is a hole, not a raised object', () => {
    const { root } = renderThemed(<UploadV4 />, SEED_LIGHT);
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });

  it('renders token-pure in both schemes, apart from the composited wash', () => {
    for (const scheme of ['light', 'dark'] as const) {
      const theme = compileTheme(SEED_BOTH);
      const { root } = renderThemed(<UploadV4 />, SEED_BOTH, scheme);
      const allowed = tokenHexSet(SEED_BOTH);
      // The wash is derived FROM tokens rather than being one.
      allowed.add(mixToken(theme[scheme].surface, theme[scheme].primary, 0.16).toLowerCase());
      for (const hex of renderedStyleHexes(root)) {
        expect(allowed.has(hex)).toBe(true);
      }
    }
  });
});
