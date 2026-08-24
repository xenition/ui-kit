import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { ServiceMenuItemV2 } from './ServiceMenuItemV2';
import { ServiceMenuItemV3 } from './ServiceMenuItemV3';
import { StylistCardV2 } from './StylistCardV2';
import { StylistCardV3 } from './StylistCardV3';
import { TreatmentCardV2 } from './TreatmentCardV2';
import { TreatmentCardV3 } from './TreatmentCardV3';
import { LoyaltyCardV2 } from './LoyaltyCardV2';
import { LoyaltyCardV3 } from './LoyaltyCardV3';

const SEEDS = [SEED_LIGHT, SEED_DARK] as const;

describe('beauty design variants — mount + core content', () => {
  it('ServiceMenuItem V2 / V3 render name and price', () => {
    const v2 = renderThemed(
      <ServiceMenuItemV2 name="Balayage & tone" priceCents={12000} category="hair" durationMin={90} popular onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Balayage & tone')).toBeTruthy();
    expect(v2.getByText('$120.00')).toBeTruthy();

    const v3 = renderThemed(
      <ServiceMenuItemV3 name="Gel manicure" priceCents={4500} category="nails" durationMin={45} onPress={() => undefined} />,
      SEED_DARK
    );
    expect(v3.getByText('Gel manicure')).toBeTruthy();
    expect(v3.getByText('$45.00')).toBeTruthy();
  });

  it('StylistCard V2 / V3 render name, rating and price (plus loading skeletons)', () => {
    const v2 = renderThemed(
      <StylistCardV2 name="Ava Rowe" role="Senior Colorist" rating={4.8} reviewCount={132} specialties={['Balayage', 'Bridal']} priceFromCents={9000} availability="Next: Today 3pm" onBook={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Ava Rowe')).toBeTruthy();
    expect(v2.getByText('from $90.00')).toBeTruthy();

    const v3 = renderThemed(
      <StylistCardV3 name="Mila Chen" role="Nail Artist" rating={4.9} reviewCount={88} priceFromCents={3500} onBook={() => undefined} />,
      SEED_DARK
    );
    expect(v3.getByText(/Mila Chen/)).toBeTruthy();

    // Loading states render without data.
    expect(renderThemed(<StylistCardV2 name="x" loading />, SEED_LIGHT).getByLabelText('Loading stylist')).toBeTruthy();
    expect(renderThemed(<StylistCardV3 name="x" loading />, SEED_DARK).getByLabelText('Loading stylist')).toBeTruthy();
  });

  it('TreatmentCard V2 / V3 render name, price and duration (incl. no-image fallback)', () => {
    const v2 = renderThemed(
      <TreatmentCardV2 name="Deep-tissue massage" priceCents={11000} variant="massage" durationMin={60} description="Firm, targeted work." onBook={() => undefined} onPress={() => undefined} />,
      SEED_LIGHT
    );
    expect(v2.getByText('Deep-tissue massage')).toBeTruthy();
    expect(v2.getByText('$110.00')).toBeTruthy();

    // No image → glyph fallback still renders name + price.
    const v3 = renderThemed(
      <TreatmentCardV3 name="Signature facial" priceCents={9500} variant="facial" durationMin={50} onBook={() => undefined} />,
      SEED_DARK
    );
    expect(v3.getByText('Signature facial')).toBeTruthy();
    expect(v3.getByText('· $95.00')).toBeTruthy();
  });

  it('LoyaltyCard V2 / V3 render member, points and progress (incl. top-tier state)', () => {
    const v2 = renderThemed(
      <LoyaltyCardV2 memberName="Jordan Blake" memberId="XN-4821-0093" points={1840} tier="gold" nextTierAt={2500} nextTierLabel="Platinum" />,
      SEED_LIGHT
    );
    expect(v2.getByText('Jordan Blake')).toBeTruthy();
    expect(v2.getByText('1840')).toBeTruthy();
    expect(v2.getByText('660 points to Platinum')).toBeTruthy();

    // Top tier (no target) → "Top tier reached".
    const top = renderThemed(<LoyaltyCardV2 memberName="Sky" points={9000} tier="platinum" />, SEED_DARK);
    expect(top.getByText('Top tier reached')).toBeTruthy();

    const v3 = renderThemed(
      <LoyaltyCardV3 memberName="Rae Kim" points={420} tier="silver" nextTierAt={1000} nextTierLabel="Gold" />,
      SEED_DARK
    );
    expect(v3.getByText('Rae Kim')).toBeTruthy();
    expect(v3.getByText('420')).toBeTruthy();
    expect(v3.getByText('580 to Gold')).toBeTruthy();
  });
});

describe('beauty design variants — interaction (book)', () => {
  it('ServiceMenuItem V2 book chip and V3 row fire onPress', () => {
    const v2Book = jest.fn();
    const v2 = renderThemed(<ServiceMenuItemV2 name="Cut & finish" priceCents={6000} onPress={v2Book} />, SEED_LIGHT);
    fireEvent.press(v2.getByText('Book'));
    expect(v2Book).toHaveBeenCalledTimes(1);

    const v3Press = jest.fn();
    const v3 = renderThemed(<ServiceMenuItemV3 name="Cut & finish" priceCents={6000} onPress={v3Press} />, SEED_DARK);
    fireEvent.press(v3.getByLabelText(/Cut & finish/));
    expect(v3Press).toHaveBeenCalledTimes(1);
  });

  it('StylistCard V2 / V3 fire onBook', () => {
    const v2Book = jest.fn();
    const v2 = renderThemed(<StylistCardV2 name="Ava Rowe" onBook={v2Book} bookLabel="Book" />, SEED_LIGHT);
    fireEvent.press(v2.getByText('Book'));
    expect(v2Book).toHaveBeenCalledTimes(1);

    const v3Book = jest.fn();
    const v3 = renderThemed(<StylistCardV3 name="Mila Chen" onBook={v3Book} bookLabel="Book" />, SEED_DARK);
    fireEvent.press(v3.getByText('Book'));
    expect(v3Book).toHaveBeenCalledTimes(1);
  });

  it('TreatmentCard V2 / V3 fire onBook', () => {
    const v2Book = jest.fn();
    const v2 = renderThemed(<TreatmentCardV2 name="Facial" priceCents={9000} onBook={v2Book} bookLabel="Book" />, SEED_LIGHT);
    fireEvent.press(v2.getByText('Book'));
    expect(v2Book).toHaveBeenCalledTimes(1);

    const v3Book = jest.fn();
    const v3 = renderThemed(<TreatmentCardV3 name="Facial" priceCents={9000} onBook={v3Book} bookLabel="Book" />, SEED_DARK);
    fireEvent.press(v3.getByText('Book'));
    expect(v3Book).toHaveBeenCalledTimes(1);
  });
});

describe('beauty design variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    SEEDS.forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ServiceMenuItemV2 name="Balayage" priceCents={12000} category="hair" durationMin={90} popular description="Full head" onPress={() => undefined} />
          <ServiceMenuItemV2 name="Unavailable svc" priceCents={5000} unavailable />
          <ServiceMenuItemV3 name="Gel manicure" priceCents={4500} category="nails" durationMin={45} popular description="Long-wear" onPress={() => undefined} />
          <ServiceMenuItemV3 name="Booked svc" priceCents={5000} unavailable />
          <StylistCardV2 name="Ava Rowe" role="Colorist" rating={4.8} reviewCount={132} specialties={['Balayage', 'Bridal']} priceFromCents={9000} availability="Today 3pm" onBook={() => undefined} />
          <StylistCardV2 name="Loading" loading />
          <StylistCardV3 name="Mila Chen" role="Nail Artist" rating={4.9} reviewCount={88} priceFromCents={3500} availability="Tomorrow" fullyBooked onBook={() => undefined} onPress={() => undefined} />
          <StylistCardV3 name="Loading" loading />
          <TreatmentCardV2 name="Deep-tissue massage" priceCents={11000} variant="massage" durationMin={60} description="Firm work." onBook={() => undefined} onPress={() => undefined} />
          <TreatmentCardV2 name="No image" priceCents={8000} variant="facial" />
          <TreatmentCardV3 name="Signature facial" priceCents={9500} variant="facial" durationMin={50} description="Glow." onBook={() => undefined} onPress={() => undefined} />
          <LoyaltyCardV2 memberName="Jordan Blake" memberId="XN-4821" points={1840} tier="gold" nextTierAt={2500} nextTierLabel="Platinum" />
          <LoyaltyCardV2 memberName="Sky" points={9000} tier="platinum" />
          <LoyaltyCardV3 memberName="Rae Kim" points={420} tier="silver" nextTierAt={1000} nextTierLabel="Gold" />
          <LoyaltyCardV3 memberName="Bronze" points={10} tier="bronze" memberId="XN-1" />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
