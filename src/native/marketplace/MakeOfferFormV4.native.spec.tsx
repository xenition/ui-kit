import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { MakeOfferFormV4 } from './MakeOfferFormV4';

const theme = compileTheme(SEED_LIGHT);

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

describe('MakeOfferFormV4 (native) — props', () => {
  it('keeps every base prop working and submits parsed cents', () => {
    const onSubmit = jest.fn();
    const { getByText, getByTestId } = renderThemed(
      <MakeOfferFormV4 listPriceCents={12500} withMessage submitLabel="Offer it" onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    expect(getByText('Asking $125.00')).toBeTruthy();

    fireEvent.changeText(getByTestId('xen-mkt-offer-amount'), '99.50');
    fireEvent.changeText(getByTestId('xen-mkt-offer-message'), '  please  ');
    fireEvent.press(getByText('Offer it'));
    expect(onSubmit).toHaveBeenCalledWith(9950, 'please');
  });

  it('honours testID and blocks submission while loading', () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByText } = renderThemed(
      <MakeOfferFormV4 testID="offer-box" loading onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByTestId('offer-box'), '20');
    fireEvent.press(getByText('Send offer'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('MakeOfferFormV4 (native) — the error exception', () => {
  it('says a below-minimum offer out loud, in words, with the figure', () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByText } = renderThemed(
      <MakeOfferFormV4 minOfferCents={4000} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByTestId('xen-mkt-offer-amount'), '10');

    // The message is TEXT, not a tint — the whole point of the exception.
    expect(getByText('Offer must be at least $40.00')).toBeTruthy();

    fireEvent.press(getByText('Send offer'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('says an unparseable amount out loud too', () => {
    const { getByTestId, getByText } = renderThemed(<MakeOfferFormV4 />, SEED_LIGHT);
    fireEvent.changeText(getByTestId('xen-mkt-offer-amount'), 'abc');
    expect(getByText('Enter a valid amount')).toBeTruthy();
  });

  it('error (new) renders a rejection the form could not have known about', () => {
    const { getByText } = renderThemed(
      <MakeOfferFormV4 error="This listing has ended." />,
      SEED_LIGHT
    );
    expect(getByText('This listing has ended.')).toBeTruthy();
  });

  it('lets the form own validation outrank the caller while it applies', () => {
    const { getByTestId, getByText, queryByText } = renderThemed(
      <MakeOfferFormV4 minOfferCents={4000} error="This listing has ended." />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByTestId('xen-mkt-offer-amount'), '1');
    expect(getByText('Offer must be at least $40.00')).toBeTruthy();
    expect(queryByText('This listing has ended.')).toBeNull();
  });
});

describe('MakeOfferFormV4 (native) — the empty case and the label', () => {
  it('survives having no asking price, no minimum and no message field', () => {
    const { getByTestId, queryByTestId, queryByText } = renderThemed(
      <MakeOfferFormV4 />,
      SEED_LIGHT
    );
    expect(getByTestId('xen-mkt-offer-amount')).toBeTruthy();
    expect(queryByTestId('xen-mkt-offer-message')).toBeNull();
    expect(queryByText(/Asking/)).toBeNull();
    expect(queryByText('Enter a valid amount')).toBeNull();
  });

  it('names the field with the words the user can see (WCAG 2.5.3)', () => {
    const { getByText, getByTestId } = renderThemed(<MakeOfferFormV4 />, SEED_LIGHT);
    expect(getByText('Your offer')).toBeTruthy();
    expect(getByTestId('xen-mkt-offer-amount').props.accessibilityLabel).toBeUndefined();
  });

  it('takes the V4 field metric and the card ground', () => {
    const { getByTestId, UNSAFE_root } = renderThemed(<MakeOfferFormV4 />, SEED_LIGHT);
    const field = flat(getByTestId('xen-mkt-offer-amount').props.style);
    expect(field.minHeight).toBe(theme.spacing['2xl']);
    expect(field.borderRadius).toBe(theme.radius.md);

    // Rule 4: the panel's ground is `card`, not `surface`.
    const grounds = UNSAFE_root
      .findAll((n) => typeof n.props?.style === 'object' && n.props?.style !== null)
      .map((n) => flat(n.props.style).backgroundColor);
    expect(grounds).toContain(theme.light.card);
  });
});
