/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import type { ThemeSeed } from '../theme/types';
import { MakeOfferFormV4 } from './MakeOfferFormV4';

const SEED: ThemeSeed = {
  primary: '#7C3AED',
  neutral: 'cool',
  font: { heading: 'Inter', body: 'Inter' },
  shape: 'rounded',
  mode: 'both',
};

function renderThemed(ui: ReactElement): ReturnType<typeof render> {
  return render(<XenitionUIProvider theme={SEED}>{ui}</XenitionUIProvider>);
}

function amountField(container: HTMLElement): HTMLInputElement {
  return container.querySelector('[data-testid="xen-mkt-offer-amount"]') as HTMLInputElement;
}

describe('MakeOfferFormV4 (web) — props', () => {
  it('keeps every base prop working and submits parsed cents', () => {
    const onSubmit = jest.fn();
    const { container, getByText } = renderThemed(
      <MakeOfferFormV4
        listPriceCents={12500}
        withMessage
        submitLabel="Offer it"
        onSubmit={onSubmit}
        className="custom"
      />
    );
    expect(getByText('Asking $125.00')).toBeTruthy();

    fireEvent.change(amountField(container), { target: { value: '99.50' } });
    fireEvent.change(container.querySelector('[data-testid="xen-mkt-offer-message"]') as HTMLInputElement, {
      target: { value: '  please  ' },
    });
    fireEvent.click(getByText('Offer it'));
    expect(onSubmit).toHaveBeenCalledWith(9950, 'please');

    expect(container.querySelector('[data-xen-offer-form]')?.className).toContain('custom');
  });

  it('honours testId, loading and forwards its ref', () => {
    const ref = createRef<HTMLDivElement>();
    const onSubmit = jest.fn();
    const { container, getByText } = renderThemed(
      <MakeOfferFormV4 ref={ref} testId="offer-box" loading onSubmit={onSubmit} />
    );
    expect(container.querySelector('[data-testid="offer-box"]')).toBeTruthy();
    expect(ref.current?.getAttribute('data-xen-offer-form')).toBe('');
    fireEvent.click(getByText('Sending…'));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

describe('MakeOfferFormV4 (web) — the error exception', () => {
  it('says a below-minimum offer out loud, in words, with the figure', () => {
    const onSubmit = jest.fn();
    const { container, getByRole, getByText } = renderThemed(
      <MakeOfferFormV4 minOfferCents={4000} onSubmit={onSubmit} />
    );
    fireEvent.change(amountField(container), { target: { value: '10' } });

    // The message is TEXT, not a tint — the whole point of the exception.
    const alert = getByRole('alert');
    expect(alert.textContent).toBe('Offer must be at least $40.00');
    expect(getByText('Offer must be at least $40.00')).toBeTruthy();

    // And it is wired to the field, so a screen reader hears it there.
    expect(amountField(container).getAttribute('aria-describedby')).toBe(alert.id);
    expect(amountField(container).getAttribute('aria-invalid')).toBe('true');

    fireEvent.click(getByText('Send offer'));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('says an unparseable amount out loud too', () => {
    const { container, getByRole } = renderThemed(<MakeOfferFormV4 />);
    fireEvent.change(amountField(container), { target: { value: 'abc' } });
    expect(getByRole('alert').textContent).toBe('Enter a valid amount');
  });

  it('error (new) renders a rejection the form could not have known about', () => {
    const { getByRole } = renderThemed(<MakeOfferFormV4 error="This listing has ended." />);
    expect(getByRole('alert').textContent).toBe('This listing has ended.');
  });

  it('lets the form own validation outrank the caller while it applies', () => {
    const { container, getByRole } = renderThemed(
      <MakeOfferFormV4 minOfferCents={4000} error="This listing has ended." />
    );
    fireEvent.change(amountField(container), { target: { value: '1' } });
    expect(getByRole('alert').textContent).toBe('Offer must be at least $40.00');
  });
});

describe('MakeOfferFormV4 (web) — the empty case and the label', () => {
  it('survives having no asking price, no minimum and no message field', () => {
    const { container, queryByText, queryByRole } = renderThemed(<MakeOfferFormV4 />);
    expect(amountField(container)).toBeTruthy();
    expect(queryByText(/Asking/)).toBeNull();
    expect(container.querySelector('[data-testid="xen-mkt-offer-message"]')).toBeNull();
    // An untouched field is not an invalid one.
    expect(queryByRole('alert')).toBeNull();
  });

  it('names the field with the words the user can see (WCAG 2.5.3)', () => {
    const { getByLabelText, container } = renderThemed(<MakeOfferFormV4 />);
    expect(getByLabelText('Your offer')).toBe(amountField(container));
    expect(amountField(container).getAttribute('aria-label')).toBeNull();
  });

  it('takes the V4 field metric and the card ground', () => {
    const { container } = renderThemed(<MakeOfferFormV4 />);
    expect(amountField(container).className).toContain('min-h-[var(--xen-space-2xl)]');
    expect(amountField(container).className).toContain('rounded-[var(--xen-radius-md)]');
    // The ground is NOT a class, and asserting that it is was how this shipped
    // wrong. `cn()` has no `tailwind-merge`, so `bg-card` and `CardV4`'s own
    // `bg-surface` both landed on the element and the sheet's ordering picked
    // `bg-surface` — the panel painted the page colour while every card around
    // it was lifted. It comes from the shared specificity rule now.
    const panel = container.querySelector('[data-xen-offer-form]');
    expect(panel?.getAttribute('data-xen-v4-ground')).toBe('card');
    expect(panel?.className).not.toContain('bg-card');
  });
});
