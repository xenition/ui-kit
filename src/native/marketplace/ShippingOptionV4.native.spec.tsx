import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { resolveIconGlyph } from '../../primitives/icon-names';
import { ShippingOptionV4 } from './ShippingOptionV4';

const theme = compileTheme(SEED_LIGHT);
const ONE_LINE = theme.spacing['2xl'] + theme.spacing.sm;
const TWO_LINE = theme.spacing['2xl'] + theme.spacing.lg;

function flat(style: unknown): Record<string, unknown> {
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

/** The option's own box, at rest or with a finger on it. */
function optionStyle(root: ReactTestInstance, pressed = false): Record<string, unknown> {
  const node = root.findAll(
    (n) => typeof n.props?.style === 'function' && n.props?.accessibilityRole === 'radio'
  )[0];
  return flat((node?.props.style as (s: { pressed: boolean }) => unknown)({ pressed }));
}

describe('ShippingOptionV4 (native) — props', () => {
  it('keeps every base prop working and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByText } = renderThemed(
      <ShippingOptionV4 label="Express" priceCents={1299} eta="1–2 business days" onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(getByText('Express')).toBeTruthy();
    expect(getByText('$12.99')).toBeTruthy();
    expect(getByText('1–2 business days')).toBeTruthy();

    fireEvent.press(getByText('Express'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('is inert when disabled or when nothing is listening', () => {
    const onSelect = jest.fn();
    const disabled = renderThemed(
      <ShippingOptionV4 label="Express" onSelect={onSelect} disabled />,
      SEED_LIGHT
    );
    fireEvent.press(disabled.getByText('Express'));
    expect(onSelect).not.toHaveBeenCalled();
    expect(disabled.getByLabelText('Express').props.accessibilityState.disabled).toBe(true);

    const inert = renderThemed(<ShippingOptionV4 label="Pickup" />, SEED_LIGHT);
    expect(inert.getByLabelText('Pickup').props.accessibilityState.disabled).toBe(true);
  });

  it('freeLabel (new) is what a zero price says, and is not run through formatMoney', () => {
    const dflt = renderThemed(<ShippingOptionV4 label="Standard" priceCents={0} />, SEED_LIGHT);
    expect(dflt.getByText('Free')).toBeTruthy();

    const localized = renderThemed(
      <ShippingOptionV4 label="Standard" priceCents={0} freeLabel="Kostenlos" />,
      SEED_LIGHT
    );
    expect(localized.getByText('Kostenlos')).toBeTruthy();
    expect(localized.queryByText('$0.00')).toBeNull();
  });

  it('icon (new) draws a named glyph in the leading slot, and wins over glyph', () => {
    const named = renderThemed(<ShippingOptionV4 label="Express" icon="bolt" />, SEED_LIGHT);
    expect(named.getByText(resolveIconGlyph('bolt'), { includeHiddenElements: true })).toBeTruthy();

    const both = renderThemed(
      <ShippingOptionV4 label="Express" icon="bolt" glyph="🚚" />,
      SEED_LIGHT
    );
    expect(both.queryByText('🚚', { includeHiddenElements: true })).toBeNull();
  });
});

describe('ShippingOptionV4 (native) — selection is a highlight AND a mark', () => {
  it('draws no checkmark and no highlight until it is selected', () => {
    const { UNSAFE_root, queryByTestId, getByLabelText } = renderThemed(
      <ShippingOptionV4 label="Express" onSelect={jest.fn()} />,
      SEED_LIGHT
    );
    expect(queryByTestId('xen-shipping-check')).toBeNull();
    expect(optionStyle(UNSAFE_root).backgroundColor).toBe('transparent');
    expect(getByLabelText('Express').props.accessibilityState.selected).toBe(false);
  });

  it('draws both once it is — never colour alone (HIG option list, rule 6)', () => {
    const { UNSAFE_root, getByTestId, getByLabelText } = renderThemed(
      <ShippingOptionV4 label="Express" onSelect={jest.fn()} selected />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-shipping-check')).toBeTruthy();
    expect(optionStyle(UNSAFE_root).backgroundColor).toBe(theme.light.selected);
    expect(getByLabelText('Express').props.accessibilityState.selected).toBe(true);
  });

  it('answers a press with the state layer, not a fade', () => {
    const { UNSAFE_root } = renderThemed(
      <ShippingOptionV4 label="Express" onSelect={jest.fn()} />,
      SEED_LIGHT
    );
    const pressed = optionStyle(UNSAFE_root, true);
    expect(pressed.backgroundColor).not.toBe('transparent');
    expect(pressed.opacity).toBeUndefined();
  });

  it('disables at M3 content opacity rather than a round fifty', () => {
    const { UNSAFE_root } = renderThemed(<ShippingOptionV4 label="Express" disabled />, SEED_LIGHT);
    expect(optionStyle(UNSAFE_root).opacity).toBe(theme.state.disabledContent);
    expect(optionStyle(UNSAFE_root).opacity).not.toBe(0.5);
  });

  it('takes the row metric and tabular money', () => {
    const one = renderThemed(<ShippingOptionV4 label="Pickup" priceCents={0} />, SEED_LIGHT);
    expect(optionStyle(one.UNSAFE_root).minHeight).toBe(ONE_LINE);
    expect(optionStyle(one.UNSAFE_root).paddingHorizontal).toBe(theme.spacing.md);

    const two = renderThemed(
      <ShippingOptionV4 label="Express" priceCents={1299} eta="1–2 days" />,
      SEED_LIGHT
    );
    expect(optionStyle(two.UNSAFE_root).minHeight).toBe(TWO_LINE);
    expect(flat(two.getByText('$12.99').props.style).fontVariant).toEqual(['tabular-nums']);
  });
});

describe('ShippingOptionV4 (native) — the empty case and the label', () => {
  it('renders nothing for an option with no name', () => {
    const { toJSON } = renderThemed(<ShippingOptionV4 label="   " priceCents={0} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('survives having no price, no eta and no glyph', () => {
    const { getByText, getByLabelText } = renderThemed(
      <ShippingOptionV4 label="Local pickup" />,
      SEED_LIGHT
    );
    expect(getByText('Local pickup')).toBeTruthy();
    expect(getByLabelText('Local pickup')).toBeTruthy();
  });

  it('announces the method, its price and its estimate as one thing', () => {
    const { getByLabelText } = renderThemed(
      <ShippingOptionV4 label="Express" priceCents={1299} eta="1–2 days" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Express, $12.99, 1–2 days')).toBeTruthy();
  });
});
