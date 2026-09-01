import '../spec-support/real-animations';
import * as React from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_BOTH, SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { AutoCompleteV4 } from './AutoCompleteV4';

const THEME = compileTheme(SEED_LIGHT);
const TARGET = THEME.spacing['2xl'];
const RING = THEME.spacing.xs;

const OPTIONS = [
  { label: 'Amsterdam', value: 'ams' },
  { label: 'Rotterdam', value: 'rtm' },
  { label: 'Utrecht', value: 'utc' },
];

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

describe('AutoCompleteV4 (native)', () => {
  it('wears InputV4 s field treatment', () => {
    const { root } = renderThemed(<AutoCompleteV4 options={OPTIONS} />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
    expect(field?.borderRadius).toBe(THEME.radius.md);
    expect(field?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('reserves the focus halo whether or not it is showing', () => {
    const { root, getByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} />,
      SEED_LIGHT
    );
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
  });

  it('gives every suggestion row the tap-target floor', () => {
    const { getByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="dam" />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    const row = styles(getByLabelText('Amsterdam')).find((s) => s.minHeight === TARGET);
    expect(row?.minHeight).toBe(TARGET);
    expect(TARGET).toBeGreaterThanOrEqual(44);
  });

  it('marks the matched substring so the eye can confirm a row', () => {
    const { getByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="dam" />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    // The hit is a nested <Text> inside the row's label, so it is found by
    // its children rather than by a text query over the composed string.
    const hits = getByLabelText('Amsterdam').findAll((n) => n.props?.children === 'dam');
    expect(hits.length).toBeGreaterThan(0);
    expect((hits[0]!.props.style as { fontWeight: string }).fontWeight).toBe('700');
  });

  it('says when nothing matches instead of vanishing', () => {
    const { getByLabelText, getByText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="zzz" />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    expect(getByText('No matches for “zzz”')).toBeTruthy();
  });

  it('stays closed until there is something to say', () => {
    const { getByLabelText, queryByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    expect(queryByLabelText('Suggestions')).toBeNull();
  });

  it('reports the text and the chosen option', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();
    const { getByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="dam" onChange={onChange} onSelect={onSelect} />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    fireEvent.press(getByLabelText('Rotterdam'));
    expect(onChange).toHaveBeenCalledWith('Rotterdam');
    expect(onSelect).toHaveBeenCalledWith(OPTIONS[1]);
  });

  it('caps the list at maxResults', () => {
    const { getByLabelText, queryByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="t" maxResults={1} />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    expect(getByLabelText('Amsterdam')).toBeTruthy();
    expect(queryByLabelText('Rotterdam')).toBeNull();
  });

  it('floats the panel on elevation.card with its hairline', () => {
    const { root, getByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="dam" />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    const panel = styles(root).find((s) => s.shadowOpacity !== undefined);
    expect(panel?.shadowOpacity).toBe(THEME.lightElevation.card.opacity);
    expect(panel?.borderRadius).toBe(THEME.radius.lg);
    expect(panel?.borderColor).toBe(THEME.light.border);
  });

  it('turns the field danger when invalid', () => {
    const { root } = renderThemed(<AutoCompleteV4 options={OPTIONS} invalid />, SEED_LIGHT);
    const field = styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET);
    expect(field?.borderColor).toBe(THEME.light.danger);
  });

  it('resolves the field border per scheme', () => {
    const theme = compileTheme(SEED_BOTH);
    const read = (scheme: 'light' | 'dark'): unknown => {
      const { root, getByLabelText } = renderThemed(
        <AutoCompleteV4 options={OPTIONS} />,
        SEED_BOTH,
        scheme
      );
      fireEvent(getByLabelText('Autocomplete'), 'focus');
      return styles(root).find((s) => s.borderWidth === 1 && s.minHeight === TARGET)?.borderColor;
    };
    expect(read('light')).toBe(theme.light.ring);
    expect(read('dark')).toBe(theme.dark.ring);
  });

  // ── §36: the panel arrives ─────────────────────────────────────────

  /*
    This was the one member of the native picker line with no `Animated` in it
    at all — a bare `{showPanel ? … : null}` — while its own web twin faded and
    `ComboboxV4`, `DatePickerV4` and `TimePickerV4` beside it all rose and
    faded over `PICKER_MOTION.popover`.
  */
  it('rises and fades its suggestion panel in, like every other native picker', () => {
    const { getByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="dam" />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    const panel = getByLabelText('Suggestions');
    const style = Object.assign({}, ...[panel.props.style].flat(2)) as Record<string, unknown>;

    // Frame zero of an entrance, not a panel that is simply there.
    expect(style.opacity).toBe(0);
    // The same `xs` rise the web sheet's `xen-v4-picker-in` keyframe uses, so
    // the two twins move on one arc.
    const shift = (style.transform as { translateY: number }[])[0]?.translateY;
    expect(shift).toBe(-THEME.spacing.xs);
  });

  it('drops the panel’s entrance under reduced motion — §36.10', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
    const { getByLabelText } = renderThemed(
      <AutoCompleteV4 options={OPTIONS} value="dam" />,
      SEED_LIGHT
    );
    fireEvent(getByLabelText('Autocomplete'), 'focus');
    // The preference resolves on a promise, so the reduced path lands on the
    // render after it.
    await act(async () => {});

    const panel = getByLabelText('Suggestions');
    const style = Object.assign({}, ...[panel.props.style].flat(2)) as Record<string, unknown>;
    expect(style.opacity).toBe(1);
    expect((style.transform as { translateY: number }[])[0]?.translateY).toBe(0);
  });
});