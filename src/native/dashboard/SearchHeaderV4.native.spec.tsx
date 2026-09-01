import * as React from 'react';
import { Text as RNText } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { SearchHeaderV4 } from './SearchHeaderV4';

const THEME = compileTheme(SEED_LIGHT);

const noop = (): void => {};

/** One style object, arrays flattened in order so later entries win. */
function flat(style: unknown): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(out, s as Record<string, unknown>);
  };
  walk(style);
  return out;
}

/** The outer row — the one box carrying the bar's `spacing.sm` gap. */
function bar(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.flexDirection === 'row' && style.gap === THEME.spacing.sm;
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** The composed `SearchInputV4`'s field skin — the box at the control metric. */
function fieldSkin(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.minHeight === THEME.spacing['2xl'];
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

/** The halo wrapper the header stretches across the row. */
function ringWrap(root: ReactTestInstance): Record<string, unknown> {
  const hit = root.findAll((node) => {
    const style = flat((node.props as { style?: unknown } | undefined)?.style);
    return style.padding === THEME.spacing.xs && style.margin === -THEME.spacing.xs;
  })[0];
  expect(hit).toBeDefined();
  return flat((hit.props as { style?: unknown }).style);
}

describe('SearchHeaderV4 (native)', () => {
  // ── it composes the field (§10.5, §5) ──────────────────────────────

  it('composes `SearchInputV4` instead of re-rolling a second search field', () => {
    const { getByLabelText } = renderThemed(
      <SearchHeaderV4 value="" onChangeText={noop} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Search')).toBeTruthy();
  });

  it('inherits the 48 control metric and the field line’s reserved halo', () => {
    // §5 asks this component for the `spacing['2xl']` height and `field-v4`'s
    // ring. Both arrive by composition rather than by being restated here,
    // which is the point — one field, one metric.
    const { root } = renderThemed(<SearchHeaderV4 value="" onChangeText={noop} />, SEED_LIGHT);
    const skin = fieldSkin(root);
    expect(skin.minHeight).toBe(THEME.spacing['2xl']);
    expect(skin.borderWidth).toBe(1);
    expect(skin.borderColor).toBe(THEME.light.border);
    // The halo's space is reserved whether or not it is showing, so focusing
    // the query never nudges the row.
    expect(ringWrap(root).backgroundColor).toBe('transparent');
  });

  it('stretches the field across the row and never lets it collapse', () => {
    const { root } = renderThemed(<SearchHeaderV4 value="" onChangeText={noop} />, SEED_LIGHT);
    const wrap = ringWrap(root);
    expect(wrap.flexGrow).toBe(1);
    expect(wrap.flexShrink).toBe(1);
  });

  it('draws no glyph of its own — every mark belongs to the composed field', () => {
    // The base painted `⌕` and `✕` as literal characters in this file, both in
    // `colors.muted`, a decorative fill used as a text colour. With no leading
    // slot and no actions, every `Text` in the tree is inside the field — this
    // component contributes none of its own.
    const { root } = renderThemed(<SearchHeaderV4 value="ada" onChangeText={noop} />, SEED_LIGHT);
    const skin = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.minHeight === THEME.spacing['2xl'];
    })[0];
    expect(skin).toBeDefined();
    expect(skin.findAllByType(RNText).length).toBe(root.findAllByType(RNText).length);
    expect(root.findAllByType(RNText).length).toBeGreaterThan(0);
  });

  // ── the query ──────────────────────────────────────────────────────

  it('is controlled, labelled by its placeholder, and reports every keystroke', () => {
    const onChangeText = jest.fn();
    const { getByLabelText } = renderThemed(
      <SearchHeaderV4 value="ada" onChangeText={onChangeText} placeholder="Search people" />,
      SEED_LIGHT
    );
    const input = getByLabelText('Search people');
    expect(input.props.value).toBe('ada');
    expect(input.props.placeholder).toBe('Search people');
    fireEvent.changeText(input, 'adam');
    expect(onChangeText).toHaveBeenCalledWith('adam');
  });

  it('takes an explicit accessible name when the placeholder is not one', () => {
    const { getByLabelText } = renderThemed(
      <SearchHeaderV4
        value=""
        onChangeText={noop}
        placeholder="e.g. tomato"
        accessibilityLabel="Search recipes"
      />,
      SEED_LIGHT
    );
    expect(getByLabelText('Search recipes').props.placeholder).toBe('e.g. tomato');
  });

  it('submits on the return key', () => {
    const onSubmit = jest.fn();
    const { getByLabelText } = renderThemed(
      <SearchHeaderV4 value="ada" onChangeText={noop} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    const input = getByLabelText('Search');
    expect(input.props.returnKeyType).toBe('search');
    fireEvent(input, 'submitEditing');
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('survives having no `onSubmit` at all', () => {
    const { getByLabelText } = renderThemed(
      <SearchHeaderV4 value="ada" onChangeText={noop} />,
      SEED_LIGHT
    );
    expect(() => fireEvent(getByLabelText('Search'), 'submitEditing')).not.toThrow();
  });

  it('clears the query, and tells the caller it happened', () => {
    const onChangeText = jest.fn();
    const onClear = jest.fn();
    const { getByLabelText } = renderThemed(
      <SearchHeaderV4 value="ada" onChangeText={onChangeText} onClear={onClear} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Clear search'));
    expect(onChangeText).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('carries no clear control while there is nothing to clear', () => {
    const { queryByLabelText } = renderThemed(
      <SearchHeaderV4 value="" onChangeText={noop} />,
      SEED_LIGHT
    );
    expect(queryByLabelText('Clear search')).toBeNull();
  });

  it('keeps the clear control on `clearable={false}` — accepted and ignored', () => {
    // The documented exception: the decision belongs to `SearchInputV4`, and
    // suppressing it on one twin and not the other would be the parity break
    // this pass exists to close. Both twins behave identically.
    const { queryByLabelText } = renderThemed(
      <SearchHeaderV4 value="ada" onChangeText={noop} clearable={false} />,
      SEED_LIGHT
    );
    expect(queryByLabelText('Clear search')).not.toBeNull();
  });

  it('freezes the field on `disabled`', () => {
    const { getByLabelText } = renderThemed(
      <SearchHeaderV4 value="ada" onChangeText={noop} disabled />,
      SEED_LIGHT
    );
    expect(getByLabelText('Search').props.editable).toBe(false);
  });

  // ── the row (§4.1) ─────────────────────────────────────────────────

  it('sets the bar out on `spacing.sm` and centres it', () => {
    const { root } = renderThemed(<SearchHeaderV4 value="" onChangeText={noop} />, SEED_LIGHT);
    const style = bar(root);
    expect(style.gap).toBe(THEME.spacing.sm);
    expect(style.alignItems).toBe('center');
  });

  it('renders a leading slot and a trailing actions slot that do not shrink', () => {
    const { root, getByText } = renderThemed(
      <SearchHeaderV4
        value=""
        onChangeText={noop}
        leading={<RNText>Back</RNText>}
        actions={<RNText>Filter</RNText>}
      />,
      SEED_LIGHT
    );
    expect(getByText('Back')).toBeTruthy();
    expect(getByText('Filter')).toBeTruthy();
    const slots = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.flexShrink === 0;
    });
    expect(slots.length).toBeGreaterThanOrEqual(2);
  });

  // ── the border default (§4.4) ──────────────────────────────────────

  it('draws NO hairline under the bar by default — §4.4', () => {
    const { root } = renderThemed(<SearchHeaderV4 value="" onChangeText={noop} />, SEED_LIGHT);
    expect(bar(root).borderBottomWidth).toBeUndefined();
  });

  it('puts a hairline in, verbatim, on `divided`', () => {
    const { root } = renderThemed(
      <SearchHeaderV4 value="" onChangeText={noop} divided />,
      SEED_LIGHT
    );
    const style = bar(root);
    expect(style.borderBottomWidth).toBe(1);
    expect(style.borderBottomColor).toBe(THEME.light.border);
    expect(style.paddingBottom).toBe(THEME.spacing.md);
  });

  // ── empty states (§4.5) ────────────────────────────────────────────

  it('renders exactly the field with no leading, no actions and no query', () => {
    const { root, queryByLabelText, queryByText } = renderThemed(
      <SearchHeaderV4 value="" onChangeText={noop} />,
      SEED_LIGHT
    );
    expect(fieldSkin(root)).toBeDefined();
    expect(queryByLabelText('Clear search')).toBeNull();
    expect(queryByText('Back')).toBeNull();
    // No empty slots held open beside the field.
    const slots = root.findAll((node) => {
      const style = flat((node.props as { style?: unknown } | undefined)?.style);
      return style.flexShrink === 0;
    });
    expect(slots).toHaveLength(0);
  });

  it('still draws the bar with an empty query — that is its resting state, not an empty state', () => {
    const { toJSON, getByLabelText } = renderThemed(
      <SearchHeaderV4 value="" onChangeText={noop} />,
      SEED_LIGHT
    );
    expect(toJSON()).not.toBeNull();
    expect(getByLabelText('Search').props.value).toBe('');
  });

  it('renders a leading slot with no actions, and actions with no leading', () => {
    const lead = renderThemed(
      <SearchHeaderV4 value="" onChangeText={noop} leading={<RNText>Back</RNText>} />,
      SEED_LIGHT
    );
    expect(lead.getByText('Back')).toBeTruthy();
    expect(lead.queryByText('Filter')).toBeNull();

    const act = renderThemed(
      <SearchHeaderV4 value="" onChangeText={noop} actions={<RNText>Filter</RNText>} />,
      SEED_LIGHT
    );
    expect(act.getByText('Filter')).toBeTruthy();
    expect(act.queryByText('Back')).toBeNull();
  });

  // ── pass-through and purity ────────────────────────────────────────

  it('takes a style for layout and keeps the row underneath', () => {
    const { root } = renderThemed(
      <SearchHeaderV4 value="" onChangeText={noop} style={{ marginBottom: 12 }} testID="bar" />,
      SEED_LIGHT
    );
    const hit = root.findAll((node) => node.props?.testID === 'bar')[0];
    expect(hit).toBeDefined();
    const style = flat(hit?.props.style);
    expect(style.marginBottom).toBe(12);
    expect(style.gap).toBe(THEME.spacing.sm);
  });

  it('paints nothing with a literal — every colour traces to a compiled token', () => {
    const { root } = renderThemed(
      <SearchHeaderV4
        value="ada"
        onChangeText={noop}
        divided
        leading={<RNText>Back</RNText>}
        actions={<RNText>Filter</RNText>}
      />,
      SEED_LIGHT
    );
    const allowed = tokenHexSet(SEED_LIGHT);
    renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));
  });
});
