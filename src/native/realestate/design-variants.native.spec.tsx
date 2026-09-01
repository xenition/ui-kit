import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { PropertyCardV2 } from './PropertyCardV2';
import { PropertyCardV3 } from './PropertyCardV3';
import { AgentCardV2 } from './AgentCardV2';
import { AgentCardV3 } from './AgentCardV3';
import { ListingGalleryV2 } from './ListingGalleryV2';
import { ListingGalleryV3 } from './ListingGalleryV3';
import { ComparableRowV2 } from './ComparableRowV2';
import { ComparableRowV3 } from './ComparableRowV3';
import {
  PropertyCardV4,
  AgentCardV4,
  ComparableRowV4,
  ListingGalleryV4,
  AmenityGridV4,
  FloorPlanViewV4,
  MapPinCardV4,
  MortgageCalcV4,
  NeighborhoodStatV4,
  PriceHistoryV4,
  OpenHouseBadgeV4,
  SavedSearchRowV4,
  TourSchedulerV4,
  ListingHero,
  AgentProfileHeader,
  MortgageSummary,
  PropertyFactsBar,
  SchoolCard,
  ContactAgentBar,
} from './index';

describe('PropertyCard design variants (native)', () => {
  it('V2 renders full-bleed price/address and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PropertyCardV2
        address="123 Elm St"
        locality="Brooklyn, NY"
        priceCents={72500000}
        beds={3}
        baths={2}
        sqft={1450}
        status="new"
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('123 Elm St')).toBeTruthy();
    expect(getByText('3 bd')).toBeTruthy();
    fireEvent.press(getByLabelText(/123 Elm St/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the price rail row and appends /mo for rentals', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <PropertyCardV3 address="9 Rent Rd" priceCents={320000} variant="rent" beds={1} onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('9 Rent Rd')).toBeTruthy();
    expect(getByText('/mo')).toBeTruthy();
    fireEvent.press(getByLabelText(/9 Rent Rd/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('AgentCard design variants (native)', () => {
  it('V2 renders a centered hero and fires the contact action', () => {
    const onContact = jest.fn();
    const { getByText } = renderThemed(
      <AgentCardV2 name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4} reviewCount={87} onContact={onContact} />,
      SEED_LIGHT
    );
    expect(getByText('Dana Reyes')).toBeTruthy();
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the compact row and fires the contact action', () => {
    const onContact = jest.fn();
    const { getByText } = renderThemed(
      <AgentCardV3 name="Dana Reyes" agency="Xen Realty" rating={4.2} reviewCount={87} onContact={onContact} />,
      SEED_DARK
    );
    expect(getByText('Dana Reyes')).toBeTruthy();
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
});

describe('ListingGallery design variants (native)', () => {
  const IMAGES = ['a.jpg', 'b.jpg', 'c.jpg'];

  it('V2 selects a thumbnail and reports the new index', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <ListingGalleryV2 images={IMAGES} onIndexChange={onIndexChange} />,
      SEED_LIGHT
    );
    expect(getByText('1 / 3')).toBeTruthy();
    fireEvent.press(getByLabelText('Show photo 2'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
    expect(getByText('2 / 3')).toBeTruthy();
  });

  it('V3 selects a grid tile and reports the new index', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <ListingGalleryV3 images={IMAGES} onIndexChange={onIndexChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Photo 3 of 3'));
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });

  it('both variants render an empty state with no images', () => {
    const v2 = renderThemed(<ListingGalleryV2 images={[]} />, SEED_DARK);
    expect(v2.getByText('No photos yet')).toBeTruthy();
    const v3 = renderThemed(<ListingGalleryV3 images={[]} />, SEED_DARK);
    expect(v3.getByText('No photos yet')).toBeTruthy();
  });
});

describe('ComparableRow design variants (native)', () => {
  it('V2 renders the stat strip and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ComparableRowV2 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="sold" onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('10 Oak Ave')).toBeTruthy();
    expect(getByText('Price')).toBeTruthy();
    expect(getByText('$/sq ft')).toBeTruthy();
    fireEvent.press(getByLabelText(/10 Oak Ave/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the compact leaderboard line and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ComparableRowV3 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="active" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('10 Oak Ave')).toBeTruthy();
    fireEvent.press(getByLabelText(/10 Oak Ave/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native realestate design variants, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <PropertyCardV2 address="123 Elm St" locality="Brooklyn, NY" priceCents={72500000} beds={3} baths={2} sqft={1450} status="active" imageUrl="x.jpg" />
          <PropertyCardV2 address="No Photo Rd" priceCents={500000} variant="rent" loading />
          <PropertyCardV3 address="123 Elm St" priceCents={72500000} beds={3} baths={2} sqft={1450} status="new" variant="rent" />
          <AgentCardV2 name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4} reviewCount={87} onContact={() => {}} />
          <AgentCardV3 name="Dana Reyes" agency="Xen Realty" rating={4.2} reviewCount={87} onContact={() => {}} onPress={() => {}} />
          <ListingGalleryV2 images={['a.jpg', 'b.jpg']} />
          <ListingGalleryV2 images={[]} />
          <ListingGalleryV3 images={['a.jpg', 'b.jpg', 'c.jpg']} />
          <ListingGalleryV3 images={[]} />
          <ComparableRowV2 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="sold" />
          <ComparableRowV3 address="12 Oak Ave" priceCents={70000000} sqft={1500} beds={4} baths={3} status="pending" />
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

const TOUR_SLOTS = [
  { id: 's1', label: '10:00 AM' },
  { id: 's2', label: '11:30 AM' },
  { id: 's3', label: '2:00 PM', available: false },
];
const PRICE_POINTS = [
  { label: 'Jan', cents: 68000000 },
  { label: 'Apr', cents: 70500000 },
  { label: 'Jul', cents: 72000000 },
];
const BREAKDOWN = [
  { label: 'Principal & interest', cents: 290000, tone: 'primary' as const },
  { label: 'Property tax', cents: 45000, tone: 'accent' as const },
  { label: 'Insurance', cents: 23000, tone: 'warn' as const },
];
const AGENT_STATS = [
  { label: 'Sales', value: '128' },
  { label: 'Years', value: '9' },
  { label: 'Reviews', value: '87' },
];

describe('realestate V4 "listing" line (native)', () => {
  it('mounts all 13 V4 variants and reports beds', () => {
    const { getByText } = renderThemed(
      <>
        <PropertyCardV4 address="123 Elm St" locality="Brooklyn, NY" priceCents={72500000} beds={3} baths={2} sqft={1450} status="new" imageUrl="hero.jpg" />
        <AgentCardV4 name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4.8} reviewCount={87} onContact={() => {}} />
        <ComparableRowV4 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="sold" />
        <ListingGalleryV4 images={['a.jpg', 'b.jpg', 'c.jpg']} />
        <AmenityGridV4 amenities={[{ label: 'In-unit laundry', glyph: '🧺' }, { label: 'Parking', available: false }]} />
        <FloorPlanViewV4 title="Floor 1" rooms={[{ label: 'Bedroom', x: 0.05, y: 0.05, w: 0.4, h: 0.4 }, { label: 'Kitchen', x: 0.5, y: 0.5, w: 0.4, h: 0.4 }]} />
        <MapPinCardV4 address="88 Map Pl" caption="Brooklyn, NY" pin={{ x: 0.4, y: 0.6 }} />
        <MortgageCalcV4 priceCents={72500000} downPercent={20} ratePercent={6.5} termYears={30} />
        <NeighborhoodStatV4 label="Walk Score" value="92" suffix="/100" delta={4} glyph="🚶" caption="Very walkable" />
        <PriceHistoryV4 points={PRICE_POINTS} />
        <OpenHouseBadgeV4 dateLabel="Sat, Aug 24" startTime="1:00 PM" endTime="3:00 PM" status="upcoming" />
        <SavedSearchRowV4 name="2BR under $600k" summary="Brooklyn · 2+ bd" newCount={3} alertsOn onToggleAlerts={() => {}} />
        <TourSchedulerV4 dateLabel="Sat, Aug 24" slots={TOUR_SLOTS} />
      </>,
      SEED_LIGHT
    );
    expect(getByText('123 Elm St')).toBeTruthy();
    expect(getByText('Walk Score')).toBeTruthy();
  });

  it('PropertyCardV4 fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <PropertyCardV4 address="5 Pine Rd" locality="Brooklyn" priceCents={72000000} beds={4} baths={3} status="new" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/5 Pine Rd/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('TourSchedulerV4 fires onSelectSlot', () => {
    const onSelectSlot = jest.fn();
    const { getByText } = renderThemed(
      <TourSchedulerV4 dateLabel="Sat, Aug 24" slots={TOUR_SLOTS} onSelectSlot={onSelectSlot} />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('11:30 AM'));
    expect(onSelectSlot).toHaveBeenCalledTimes(1);
    expect(onSelectSlot).toHaveBeenCalledWith(expect.objectContaining({ id: 's2' }));
  });
});

describe('realestate V4 new blocks (native)', () => {
  it('mounts all 6 new components', () => {
    const { getByText } = renderThemed(
      <>
        <ListingHero
          imageUrl="hero.jpg"
          priceCents={72500000}
          address="123 Elm St"
          locality="Brooklyn, NY"
          status="new"
          beds={3}
          baths={2}
          sqft={1450}
          photoCount={24}
          onSave={() => {}}
          onShare={() => {}}
          onTour={() => {}}
        />
        <AgentProfileHeader name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4.8} verified stats={AGENT_STATS} onCall={() => {}} onMessage={() => {}} />
        <MortgageSummary monthlyCents={358000} breakdown={BREAKDOWN} downLabel="20% down · $145,000" rateLabel="6.5% APR" termLabel="30-yr fixed" />
        <PropertyFactsBar
          facts={[
            { glyph: '🛏', label: 'Beds', value: '3' },
            { glyph: '🛁', label: 'Baths', value: '2' },
            { glyph: '📐', label: 'Sqft', value: '1,450' },
            { glyph: '🏠', label: 'Type', value: 'Condo' },
          ]}
        />
        <SchoolCard name="Lincoln Elementary" rating={8} level="Elementary" distanceLabel="0.4 mi" gradesLabel="K–5" />
        <ContactAgentBar agentName="Dana Reyes" agentSubtitle="Listing agent · Xen Realty" onCall={() => {}} onMessage={() => {}} onTour={() => {}} />
      </>,
      SEED_DARK
    );
    expect(getByText('Lincoln Elementary')).toBeTruthy();
    expect(getByText('Listing agent · Xen Realty')).toBeTruthy();
  });

  it('ContactAgentBar fires onTour', () => {
    const onTour = jest.fn();
    const { getByLabelText } = renderThemed(
      <ContactAgentBar agentName="Dana Reyes" onTour={onTour} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Tour'));
    expect(onTour).toHaveBeenCalledTimes(1);
  });

  it('ListingHero fires onSave', () => {
    const onSave = jest.fn();
    const { getByLabelText } = renderThemed(
      <ListingHero priceCents={72500000} address="123 Elm St" onSave={onSave} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Save listing'));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('SchoolCard fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <SchoolCard name="Lincoln Elementary" rating={8} level="Elementary" onPress={onPress} />,
      SEED_DARK
    );
    fireEvent.press(getByLabelText(/Lincoln Elementary/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('token purity (native realestate V4 line + new blocks, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          {/* All 13 V4 variants — the gradient pieces (ListingGalleryV4 scrim,
              any AgentCard/MapPin/FloorPlan gradient) render across both seeds. */}
          <PropertyCardV4 address="123 Elm St" locality="Brooklyn, NY" priceCents={72500000} beds={3} baths={2} sqft={1450} status="active" imageUrl="x.jpg" />
          <PropertyCardV4 address="No Photo Rd" priceCents={500000} variant="rent" loading />
          <AgentCardV4 name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4} reviewCount={87} onContact={() => {}} />
          <ComparableRowV4 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="sold" />
          <ListingGalleryV4 images={['a.jpg', 'b.jpg', 'c.jpg']} />
          <ListingGalleryV4 images={[]} />
          <AmenityGridV4 amenities={[{ label: 'In-unit laundry', glyph: '🧺' }, { label: 'Parking', available: false }]} />
          <AmenityGridV4 amenities={[]} />
          <FloorPlanViewV4 title="Floor 1" rooms={[{ label: 'Bedroom', x: 0.05, y: 0.05, w: 0.4, h: 0.4 }]} />
          <FloorPlanViewV4 title="Empty" rooms={[]} />
          <MapPinCardV4 address="123 Elm St" caption="Brooklyn, NY" pin={{ x: 0.4, y: 0.6 }} />
          <MortgageCalcV4 priceCents={72500000} downPercent={20} ratePercent={6.5} termYears={30} />
          <NeighborhoodStatV4 label="Walk Score" value="92" suffix="/100" delta={4} glyph="🚶" caption="Very walkable" />
          <PriceHistoryV4 points={PRICE_POINTS} />
          <PriceHistoryV4 points={[]} />
          <OpenHouseBadgeV4 dateLabel="Sat, Aug 24" startTime="1:00 PM" endTime="3:00 PM" status="live" />
          <SavedSearchRowV4 name="2BR under $600k" summary="Brooklyn · 2+ bd" newCount={3} alertsOn onToggleAlerts={() => {}} />
          <TourSchedulerV4 dateLabel="Sat, Aug 24" slots={TOUR_SLOTS} selectedId="s1" />
          <TourSchedulerV4 dateLabel="Sat, Aug 24" slots={[]} />
          {/* New blocks — the brand-gradient heroes (ListingHero, AgentProfileHeader,
              MortgageSummary) render across both seeds. */}
          <ListingHero imageUrl="hero.jpg" priceCents={72500000} address="123 Elm St" locality="Brooklyn, NY" status="new" beds={3} baths={2} sqft={1450} photoCount={24} onSave={() => {}} onShare={() => {}} onTour={() => {}} />
          <ListingHero priceCents={500000} variant="rent" address="No Photo Rd" />
          <AgentProfileHeader name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4.8} verified stats={AGENT_STATS} onCall={() => {}} onMessage={() => {}} />
          <MortgageSummary monthlyCents={358000} breakdown={BREAKDOWN} downLabel="20% down · $145,000" rateLabel="6.5% APR" termLabel="30-yr fixed" />
          <PropertyFactsBar facts={[{ glyph: '🛏', label: 'Beds', value: '3' }, { glyph: '📐', label: 'Sqft', value: '1,450' }]} />
          <SchoolCard name="Lincoln Elementary" rating={8} level="Elementary" distanceLabel="0.4 mi" gradesLabel="K–5" onPress={() => {}} />
          <SchoolCard name="Mid School" rating={5} />
          <SchoolCard name="Low School" rating={2} />
          <ContactAgentBar agentName="Dana Reyes" agentSubtitle="Listing agent · Xen Realty" onCall={() => {}} onMessage={() => {}} onTour={() => {}} />
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
