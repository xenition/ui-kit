/** @jest-environment jsdom */
import { fireEvent, render } from '@testing-library/react';
import { createRef, type ReactElement } from 'react';
import { XenitionUIProvider } from '../provider';
import { resolveIconGlyph } from '../primitives/icon-names';
import type { ThemeSeed } from '../theme/types';
import { ShippingOptionV4 } from './ShippingOptionV4';
import { rowHeightClass } from '../dashboard/internal/row-v4';

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

function option(container: HTMLElement): HTMLButtonElement | null {
  return container.querySelector('[data-xen-shipping-option]');
}

const CHECK = resolveIconGlyph('check');

function checks(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll('[data-xen-v4-icon]')).filter(
    (el): el is HTMLElement => el.textContent === CHECK
  );
}

describe('ShippingOptionV4 (web) — props', () => {
  it('keeps every base prop working and fires onSelect', () => {
    const onSelect = jest.fn();
    const { container, getByText } = renderThemed(
      <ShippingOptionV4
        label="Express"
        priceCents={1299}
        eta="1–2 business days"
        onSelect={onSelect}
        className="custom"
      />
    );
    expect(getByText('Express')).toBeTruthy();
    expect(getByText('$12.99')).toBeTruthy();
    expect(getByText('1–2 business days')).toBeTruthy();
    expect(option(container)?.className).toContain('custom');

    fireEvent.click(getByText('Express'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('is inert when disabled or when nothing is listening, and forwards its ref', () => {
    const ref = createRef<HTMLButtonElement>();
    const onSelect = jest.fn();
    const disabled = renderThemed(
      <ShippingOptionV4 ref={ref} label="Express" onSelect={onSelect} disabled />
    );
    expect(option(disabled.container)?.disabled).toBe(true);
    expect(ref.current?.tagName).toBe('BUTTON');

    const inert = renderThemed(<ShippingOptionV4 label="Pickup" />);
    expect(option(inert.container)?.disabled).toBe(true);
  });

  it('freeLabel (new) is what a zero price says, and is not run through formatMoney', () => {
    const dflt = renderThemed(<ShippingOptionV4 label="Standard" priceCents={0} />);
    expect(dflt.getByText('Free')).toBeTruthy();

    const localized = renderThemed(
      <ShippingOptionV4 label="Standard" priceCents={0} freeLabel="Kostenlos" />
    );
    expect(localized.getByText('Kostenlos')).toBeTruthy();
    expect(localized.queryByText('$0.00')).toBeNull();
  });

  it('icon (new) draws a named glyph in the leading slot, and wins over glyph', () => {
    const named = renderThemed(<ShippingOptionV4 label="Express" icon="bolt" />);
    const glyphs = Array.from(named.container.querySelectorAll('[data-xen-v4-icon]')).map(
      (el) => el.textContent
    );
    expect(glyphs).toContain(resolveIconGlyph('bolt'));

    const both = renderThemed(<ShippingOptionV4 label="Express" icon="bolt" glyph="🚚" />);
    expect(both.container.textContent).not.toContain('🚚');
  });
});

describe('ShippingOptionV4 (web) — selection is a highlight AND a mark', () => {
  it('draws no checkmark and no highlight until it is selected', () => {
    const { container } = renderThemed(<ShippingOptionV4 label="Express" onSelect={jest.fn()} />);
    expect(checks(container)).toHaveLength(0);
    expect(option(container)?.className).toContain('bg-transparent');
    expect(option(container)?.getAttribute('aria-checked')).toBe('false');
  });

  it('draws both once it is — never colour alone (HIG option list, rule 6)', () => {
    const { container } = renderThemed(
      <ShippingOptionV4 label="Express" onSelect={jest.fn()} selected />
    );
    expect(checks(container)).toHaveLength(1);
    expect(option(container)?.className).toContain('bg-selected');
    expect(option(container)?.getAttribute('aria-checked')).toBe('true');
    expect(option(container)?.getAttribute('role')).toBe('radio');
  });

  it('takes the row metric and tabular money, not a card of its own', () => {
    const oneLine = renderThemed(<ShippingOptionV4 label="Pickup" priceCents={0} />);
    expect(option(oneLine.container)?.className).toContain(rowHeightClass(false));

    const twoLine = renderThemed(
      <ShippingOptionV4 label="Express" priceCents={1299} eta="1–2 days" />
    );
    expect(option(twoLine.container)?.className).toContain(rowHeightClass(true));
    expect(twoLine.getByText('$12.99').className).toContain('[font-variant-numeric:tabular-nums]');
  });

  it('disables at M3 content opacity rather than a round fifty', () => {
    const { container } = renderThemed(<ShippingOptionV4 label="Express" disabled />);
    expect(option(container)?.className).toContain('disabled:opacity-[0.38]');
    expect(option(container)?.className).not.toContain('opacity-50');
  });
});

describe('ShippingOptionV4 (web) — the empty case and the label', () => {
  it('renders nothing for an option with no name', () => {
    const { container } = renderThemed(<ShippingOptionV4 label="   " priceCents={0} />);
    expect(option(container)).toBeNull();
  });

  it('survives having no price, no eta and no glyph', () => {
    const { container, getByText } = renderThemed(<ShippingOptionV4 label="Local pickup" />);
    expect(getByText('Local pickup')).toBeTruthy();
    expect(option(container)?.getAttribute('aria-label')).toBe('Local pickup');
  });

  it('announces the method, its price and its estimate as one thing', () => {
    const { container } = renderThemed(
      <ShippingOptionV4 label="Express" priceCents={1299} eta="1–2 days" />
    );
    expect(option(container)?.getAttribute('aria-label')).toBe('Express, $12.99, 1–2 days');
  });
});
