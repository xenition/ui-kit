/** @jest-environment jsdom */
/**
 * Alternate realestate designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of AgentCard, ComparableRow, ListingGallery, PropertyCard. Each
 * variant keeps the base props; these specs prove they (a) mount, (b) stay
 * token-pure (no literal hex beyond geometric heights/widths), and (c) honor a
 * key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AgentCardV2 } from './AgentCardV2';
import { AgentCardV3 } from './AgentCardV3';
import { ComparableRowV2 } from './ComparableRowV2';
import { ComparableRowV3 } from './ComparableRowV3';
import { ListingGalleryV2 } from './ListingGalleryV2';
import { ListingGalleryV3 } from './ListingGalleryV3';
import { PropertyCardV2 } from './PropertyCardV2';
import { PropertyCardV3 } from './PropertyCardV3';
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

const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');
// height/width geometry is allowed; only *color* hex is forbidden.
const COLOR_HEX = /(?:color|background|border|fill|stroke)[^;]*#[0-9a-fA-F]{3,8}/;

const IMAGES = ['a.jpg', 'b.jpg', 'c.jpg'];

describe('AgentCard alternates (web)', () => {
  it('V2 fires onContact', () => {
    const onContact = jest.fn();
    const { getByText, container } = render(<AgentCardV2 name="Ada Realtor" title="Listing Agent" rating={4.8} onContact={onContact} />);
    expect(getByText('Ada Realtor')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<AgentCardV3 name="Leo Agent" agency="Acme" rating={4.2} />);
    expect(getByText('Leo Agent')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('ComparableRow alternates (web)', () => {
  it('V2 renders comp stats', () => {
    const { getByText, container } = render(<ComparableRowV2 address="12 Oak St" priceCents={45000000} sqft={1500} beds={3} baths={2} status="sold" />);
    expect(getByText('12 Oak St')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<ComparableRowV3 address="9 Elm Ave" priceCents={38000000} beds={2} status="active" />);
    expect(getByText('9 Elm Ave')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('ListingGallery alternates (web)', () => {
  it('V2 navigates via thumbnails', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText, container } = render(<ListingGalleryV2 images={IMAGES} onIndexChange={onIndexChange} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Go to photo 3'));
    expect(onIndexChange).toHaveBeenCalledWith(2);
  });
  it('V3 advances on next', () => {
    const onIndexChange = jest.fn();
    const { getByLabelText, container } = render(<ListingGalleryV3 images={IMAGES} onIndexChange={onIndexChange} />);
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByLabelText('Next photo'));
    expect(onIndexChange).toHaveBeenCalledWith(1);
  });
});

describe('PropertyCard alternates (web)', () => {
  it('V2 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<PropertyCardV2 address="5 Pine Rd" locality="Brooklyn" priceCents={72000000} beds={4} baths={3} status="new" onClick={onClick} />);
    expect(getByText('5 Pine Rd')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
    fireEvent.click(getByText('5 Pine Rd'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('V3 renders rent suffix', () => {
    const { getByText, container } = render(<PropertyCardV3 address="7 Bay St" priceCents={250000} variant="rent" beds={1} />);
    expect(getByText('7 Bay St')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });
});

describe('realestate V4 "listing" line (web)', () => {
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

  it('mounts all 13 V4 variants token-pure', () => {
    const { container, getByText } = render(
      <>
        <PropertyCardV4 address="123 Elm St" locality="Brooklyn, NY" priceCents={72500000} beds={3} baths={2} sqft={1450} status="new" imageUrl="hero.jpg" />
        <AgentCardV4 name="Dana Reyes" title="Listing Agent" agency="Xen Realty" rating={4.8} reviewCount={87} onContact={() => {}} />
        <ComparableRowV4 address="10 Oak Ave" priceCents={68000000} sqft={1400} beds={3} baths={2} distance="0.3 mi" status="sold" />
        <ListingGalleryV4 images={IMAGES} />
        <AmenityGridV4 amenities={[{ label: 'In-unit laundry', glyph: '🧺' }, { label: 'Parking', available: false }]} />
        <FloorPlanViewV4 title="Floor 1" rooms={[{ label: 'Bedroom', x: 0.05, y: 0.05, w: 0.4, h: 0.4 }, { label: 'Kitchen', x: 0.5, y: 0.5, w: 0.4, h: 0.4 }]} />
        <MapPinCardV4 address="88 Map Pl" caption="Brooklyn, NY" pin={{ x: 0.4, y: 0.6 }} />
        <MortgageCalcV4 priceCents={72500000} downPercent={20} ratePercent={6.5} termYears={30} />
        <NeighborhoodStatV4 label="Walk Score" value="92" suffix="/100" delta={4} glyph="🚶" caption="Very walkable" />
        <PriceHistoryV4 points={PRICE_POINTS} />
        <OpenHouseBadgeV4 dateLabel="Sat, Aug 24" startTime="1:00 PM" endTime="3:00 PM" status="upcoming" />
        <SavedSearchRowV4 name="2BR under $600k" summary="Brooklyn · 2+ bd" newCount={3} alertsOn onToggleAlerts={() => {}} />
        <TourSchedulerV4 dateLabel="Sat, Aug 24" slots={TOUR_SLOTS} />
      </>
    );
    expect(getByText('123 Elm St')).toBeTruthy();
    expect(getByText('Dana Reyes')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });

  it('PropertyCardV4 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText } = render(<PropertyCardV4 address="5 Pine Rd" locality="Brooklyn" priceCents={72000000} beds={4} baths={3} status="new" onClick={onClick} />);
    fireEvent.click(getByText('5 Pine Rd'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('TourSchedulerV4 fires onSelectSlot', () => {
    const onSelectSlot = jest.fn();
    const { getByText } = render(<TourSchedulerV4 dateLabel="Sat, Aug 24" slots={TOUR_SLOTS} onSelectSlot={onSelectSlot} />);
    fireEvent.click(getByText('11:30 AM'));
    expect(onSelectSlot).toHaveBeenCalledTimes(1);
    expect(onSelectSlot).toHaveBeenCalledWith(expect.objectContaining({ id: 's2' }));
  });
});

describe('realestate V4 new blocks (web)', () => {
  it('mounts all 6 new components token-pure', () => {
    const { container, getByText } = render(
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
          saved={false}
          onSave={() => {}}
          onShare={() => {}}
          onTour={() => {}}
        />
        <AgentProfileHeader
          name="Dana Reyes"
          title="Listing Agent"
          agency="Xen Realty"
          rating={4.8}
          verified
          stats={[{ label: 'Sales', value: '128' }, { label: 'Years', value: '9' }, { label: 'Reviews', value: '87' }]}
          onCall={() => {}}
          onMessage={() => {}}
        />
        <MortgageSummary
          monthlyCents={358000}
          breakdown={[
            { label: 'Principal & interest', cents: 290000, tone: 'primary' },
            { label: 'Property tax', cents: 45000, tone: 'accent' },
            { label: 'Insurance', cents: 23000, tone: 'warn' },
          ]}
          downLabel="20% down · $145,000"
          rateLabel="6.5% APR"
          termLabel="30-yr fixed"
        />
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
      </>
    );
    expect(getByText('123 Elm St')).toBeTruthy();
    expect(getByText('Lincoln Elementary')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(COLOR_HEX);
  });

  it('ContactAgentBar fires onTour', () => {
    const onTour = jest.fn();
    const { getByLabelText } = render(<ContactAgentBar agentName="Dana Reyes" onTour={onTour} />);
    fireEvent.click(getByLabelText('Tour'));
    expect(onTour).toHaveBeenCalledTimes(1);
  });

  it('ListingHero fires onSave', () => {
    const onSave = jest.fn();
    const { getByLabelText } = render(<ListingHero priceCents={72500000} address="123 Elm St" onSave={onSave} />);
    fireEvent.click(getByLabelText('Save listing'));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('SchoolCard fires onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(<SchoolCard name="Lincoln Elementary" rating={8} level="Elementary" onPress={onPress} />);
    fireEvent.click(getByText('Lincoln Elementary'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
