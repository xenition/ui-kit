/** @jest-environment jsdom */
/**
 * Web-parity beauty blocks: render smoke, token-class purity (semantic `--xen-*`
 * classes, never literal colors), and the core interactions — booking a slot,
 * adding a recommended product, nudging a compare slider, and the empty state.
 * Plain `expect` under jsdom (mirrors `Button.spec.tsx`); no provider needed
 * because every color is a token class string.
 */
import { fireEvent, render } from '@testing-library/react';
import { createRef } from 'react';
import {
  ServiceMenuItem,
  StylistCard,
  AppointmentSlot,
  BeforeAfter,
  TreatmentCard,
  LoyaltyCard,
  ProductRecommendation,
  SalonBookingBar,
  ReviewCard,
  LookbookGrid,
  PriceListRow,
  GiftCardRow,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;

describe('beauty (web) — render + token purity', () => {
  it('renders the full composition and stays free of hex literals in inline styles', () => {
    const { container, getByText } = render(
      <main>
        <ServiceMenuItem name="Balayage & tone" priceCents={16500} category="hair" durationMin={120} popular />
        <StylistCard name="Ana Rivera" role="Senior Colorist" rating={4.8} reviewCount={212} priceFromCents={9000} specialties={['Balayage', 'Bridal']} onBook={() => undefined} />
        <TreatmentCard name="Hot-stone massage" priceCents={12000} variant="massage" durationMin={60} onBook={() => undefined} />
        <LoyaltyCard memberName="Jordan Lee" points={820} tier="gold" nextTierAt={1000} nextTierLabel="Platinum" />
        <ReviewCard author="Sam T." rating={5} text="Loved it." service="Balayage" verified />
        <PriceListRow label="Cut & finish" priceCents={7500} durationMin={45} compareAtCents={9000} />
        <GiftCardRow amountCents={10000} balanceCents={4000} status="active" code="•••• 1234" />
      </main>
    );

    expect(getByText('Balayage & tone')).toBeTruthy();
    expect(getByText('Ana Rivera')).toBeTruthy();
    expect(container.querySelector('[data-xen-service-menu-item]')).not.toBeNull();
    expect(container.querySelector('[data-xen-loyalty-card="gold"]')).not.toBeNull();
    expect(container.querySelector('[data-xen-gift-card-row="active"]')).not.toBeNull();

    const inlineStyles = Array.from(container.querySelectorAll<HTMLElement>('[style]'))
      .map((el) => el.getAttribute('style') ?? '')
      .join('\n');
    expect(inlineStyles).not.toMatch(HEX_LITERAL);
  });

  it('binds surfaces to the semantic token classes (no literal colors)', () => {
    const { container } = render(<ServiceMenuItem name="Facial" priceCents={9000} category="skin" />);
    const row = container.querySelector('[data-xen-service-menu-item]')!;
    expect(row.className).toContain('bg-surface');
    expect(row.className).toContain('border-border');
  });

  it('forwards the ref to the DOM root', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<AppointmentSlot ref={ref} time="9:30 AM" />);
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});

describe('AppointmentSlot — book a slot', () => {
  it('fires onClick for an available slot and marks selected via aria-pressed', () => {
    const onClick = jest.fn();
    const { getByRole, rerender } = render(
      <AppointmentSlot time="10:00 AM" status="available" onClick={onClick} />
    );
    const btn = getByRole('button');
    expect(btn.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<AppointmentSlot time="10:00 AM" status="selected" onClick={onClick} />);
    expect(getByRole('button').getAttribute('aria-pressed')).toBe('true');
  });

  it('disables a booked slot and does not fire onClick', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<AppointmentSlot time="11:00 AM" status="booked" onClick={onClick} />);
    const btn = getByRole('button') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('ProductRecommendation — add to bag', () => {
  it('fires onAdd from the CTA and shows the price', () => {
    const onAdd = jest.fn();
    const { getByText } = render(
      <ProductRecommendation name="Bond repair" brand="Olaplex" priceCents={2800} rating={4.9} onAdd={onAdd} reason="Pairs with your color service" />
    );
    expect(getByText('$28.00')).toBeTruthy();
    fireEvent.click(getByText('Add'));
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('disables the CTA when sold out', () => {
    const onAdd = jest.fn();
    const { getByText } = render(
      <ProductRecommendation name="Serum" priceCents={4000} soldOut onAdd={onAdd} />
    );
    const cta = getByText('Sold out') as HTMLButtonElement;
    expect(cta.disabled).toBe(true);
    fireEvent.click(cta);
    expect(onAdd).not.toHaveBeenCalled();
  });
});

describe('BeforeAfter — dep-free compare', () => {
  it('toggle mode swaps the shown side on click', () => {
    const { getByRole } = render(
      <BeforeAfter variant="toggle" beforeUrl="/b.jpg" afterUrl="/a.jpg" />
    );
    const btn = getByRole('button');
    expect(btn.getAttribute('aria-label')).toContain('Before');
    fireEvent.click(btn);
    expect(btn.getAttribute('aria-label')).toContain('After');
  });

  it('split mode nudges the position through onPositionChange', () => {
    const onPositionChange = jest.fn();
    const { getByLabelText } = render(
      <BeforeAfter variant="split" position={50} onPositionChange={onPositionChange} />
    );
    fireEvent.click(getByLabelText('Show more after'));
    expect(onPositionChange).toHaveBeenCalledWith(60);
    fireEvent.click(getByLabelText('Show less after'));
    expect(onPositionChange).toHaveBeenCalledWith(40);
  });
});

describe('StylistCard — book CTA', () => {
  it('fires onBook and disables the CTA when fully booked', () => {
    const onBook = jest.fn();
    const { getByText, rerender } = render(
      <StylistCard name="Ana" rating={4.7} onBook={onBook} />
    );
    fireEvent.click(getByText('Book'));
    expect(onBook).toHaveBeenCalledTimes(1);

    rerender(<StylistCard name="Ana" rating={4.7} fullyBooked onBook={onBook} />);
    expect((getByText('Fully booked') as HTMLButtonElement).disabled).toBe(true);
  });

  it('renders a busy skeleton when loading', () => {
    const { container } = render(<StylistCard name="Ana" loading />);
    expect(container.querySelector('[aria-busy="true"]')).not.toBeNull();
  });
});

describe('SalonBookingBar — empty vs selected', () => {
  it('disables the CTA with no selection and enables + fires when selected', () => {
    const onBook = jest.fn();
    const { getByText, rerender } = render(<SalonBookingBar onBook={onBook} />);
    expect((getByText('Book now') as HTMLButtonElement).disabled).toBe(true);

    rerender(<SalonBookingBar serviceName="Cut & color" totalCents={13500} onBook={onBook} />);
    const cta = getByText('Book now') as HTMLButtonElement;
    expect(cta.disabled).toBe(false);
    fireEvent.click(cta);
    expect(onBook).toHaveBeenCalledTimes(1);
  });
});

describe('LookbookGrid — grid + empty state', () => {
  it('selects a look by id', () => {
    const onSelect = jest.fn();
    const { getByLabelText } = render(
      <LookbookGrid
        items={[{ id: 'a', label: 'Soft curls', imageUrl: '/a.jpg' }]}
        onSelect={onSelect}
      />
    );
    fireEvent.click(getByLabelText('Soft curls'));
    expect(onSelect).toHaveBeenCalledWith('a');
  });

  it('renders the shared empty state when there are no items', () => {
    const { container, getByText } = render(<LookbookGrid items={[]} emptyLabel="No looks yet" />);
    expect(container.querySelector('[data-xen-empty-state]')).not.toBeNull();
    expect(getByText('No looks yet')).toBeTruthy();
  });
});
